/* global Promise, __dirname, Function */
const fs = require('fs');
const path = require('path');
const args = require('typeof-arguments');
const prop = require('typeof-properties');
const type = require('of-type');
const moveOn = require('move-on');
const listContent = require('list-contents');
const moduleName = require('./package.json').name;
const clc = require('cli-color');
const warn = clc.bgYellow.blue;
module.exports = new StructureDirs().init;

function StructureDirs(){
  const proto = this.constructor.prototype;
  
  this.init = initStructure.bind(this.constructor);
  this.init.structurize = (path,json,callback)=>proto.methods.structurize.call(proto,path,json,callback);
  this.init.compare = (model,compared,callback)=>proto.methods.compare.call(proto,model,compared,callback);
  
  function initStructure(){
    const p = this.prototype;
    const validation = [
      p.validation.isDoneFunction,
      p.validation.validArgs,
      p.validation.createRootFolder,
      p.preparations.prepareCurrentContentsList,
      p.validation.validateStructureJSON,
      p.preparations.convertStructureJSON,
      p.validation.validStructure,
      p.appenders.initActions
    ];
    const userContext = {
      args:arguments,
      root:arguments[0],
      structure:arguments[1],
      done:arguments[2],
      each:arguments[3],
      response:p.response,
      prepare:p.preparations,
      appenders:p.appenders,
      utils:p.utils
    };

    moveOn(validation,userContext,p.response.onDone,p.response.onDoneError);

  };

}

StructureDirs.prototype.methods = {
  structurize:function(dirPath,json,clb){
    args(arguments,[String,[String,Function],[Function]],(o)=>{
      if(o.index===2&&type(json,Function)) return;
      throw new TypeError(`${warn(moduleName+'.structurize')}: ${o.message}`);
    });
    const jsonPath = type(json,String) ? json:undefined;
    const callback = type(json,Function) ? json:type(clb,Function) ? clb:undefined;
    
    const funList = [
      isPathValid,
      generateStructure,
      ensureDirJSON,
      validPathJSON,
      writeFileJSON
    ];
    const userContext = {
      root:dirPath,
      json:jsonPath,
      utils:this.utils,
      prepare:this.preparations
    };

    moveOn(funList, userContext, onDone, onReject);

    function onDone(){
      callback(null,this.structure);
    }

    function onReject(c,err){
      callback(err);
    }

    function isPathValid(resolve,reject){
      this.utils.folderExists(this.root,(err)=>{
        if(err) return reject(err);
        if(!err) resolve();
      });
    }

    function generateStructure(resolve,reject){
      const config = {
        from:this.root,
        action:null,
        overwrite:null,
        utils:this.utils
      };
      this.prepare.generateContent(config,(gen)=>{
        this.structure = gen;
        resolve();
      },reject);
    }

    function ensureDirJSON(resolve,reject){
      if(!this.json) return resolve();
      const dirPath = path.dirname(path.resolve(this.json));
      this.utils.createDirs(dirPath,resolve,reject);
    }

    function validPathJSON(resolve,reject){
      if(!this.json) return resolve();
      if(!(/^\.json$/i).test(path.extname(this.json))) this.json += '.json';
      try{
        this.data = JSON.stringify(this.structure,null,2);
        resolve();
      } catch(err){
        reject(new Error('Could not generate the JSON content.'));
      }
    }

    function writeFileJSON(resolve,reject){
      if(!this.json) return resolve();
      fs.writeFile(this.json,this.data,(err)=>{
        if(err) return reject(new Error(`Could not create JSON file in the '${this.json}' path.`));
        if(!err) resolve();
      });
    }

  },
  compare:function(model,compared,callback){
    args(arguments,[String,String,Function],(o)=>{
      throw new TypeError(`${warn(moduleName+'.compare')}: ${o.message}`);
    });

    const funList = [
      isModelValid,
      isComparedValid,
      getModelContents,
      getComparedContents,
      compareContents,
      returnObject
    ];

    const userContext = {
      modelPath:model,
      comparedPath:compared,
      utils:this.utils
    };

    moveOn(funList,userContext,onDone,onReject);

    function onDone(){
      callback(null,this.callbackObject);
    }

    function onReject(c,err){
      callback(err);
    }

    function isModelValid(resolve,reject){
      this.utils.folderExists(this.modelPath,(err)=>{
        if(err) return reject(err);
        if(!err) resolve();
      });
    }

    function isComparedValid(resolve,reject){
      this.utils.folderExists(this.comparedPath,(err)=>{
        if(err) return reject(err);
        if(!err) resolve();
      });
    }

    function getModelContents(resolve,reject){
      listContent(this.modelPath,(o)=>{
        if(o.error) reject(new Error(`Couldaaaa not get the access to the given folder '${this.model}'.`));
        if(!o.error){
          this.model = {path:o.path,dirs:o.dirs,files:o.files};
          resolve();
        }
      });
    }
    
    function getComparedContents(resolve,reject){
      listContent(this.comparedPath,(o)=>{
        if(o.error) reject(new Error(`Could not get the access to the given folder '${this.compared}'.`));
        if(!o.error){
          this.compared = {path:o.path,dirs:o.dirs,files:o.files};
          resolve();
        }
      });
    }
    
    function compareContents(resolve,reject){
      this.dirs = {};
      this.files = {};
      compare(this.model.dirs,this.compared.dirs,this.dirs);
      compare(this.model.files,this.compared.files,this.files);
      resolve();
      function compare(model,compared,result){
        result.missing = [];
        result.existing = [];
        result.extraneous = [];
        whileLabel:
        while(model.length){
          var m = model.shift();
          for(var y in compared){
            if(compared[y]===m){
              result.existing.push(compared.splice(y,1)[0]);
              continue whileLabel;
            }
          }
          result.missing.push(m);
        }
        result.extraneous = compared.slice();
      }
    }
    
    function returnObject(resolve,reject){
      this.callbackObject = {
        model:this.model.path,
        compared:this.compared.path,
        dirs:this.dirs,
        files:this.files
      };
      resolve();
    }

  }
};

StructureDirs.prototype.validation = {
  isDoneFunction: function(resolve) {
    args(this.args,['any','any',Function,'any'],(o)=>{
      throw new TypeError(`${warn(moduleName)}: ${o.message}`);
    });
    resolve();
  },
  validArgs: function(resolve,reject) {
      var err = args(this.args,[String,[Array,String],Function,[Function,undefined]],(o)=>{
        reject(new TypeError(`${o.message}`));
      });
      if(err) resolve();
  },
  validateStructureJSON: function(resolve,reject){
    if(!type(this.structure,String)) return resolve();
    this.utils.jsonExists(this.structure,(err)=>{
      if(err) return reject(new Error(`Invalid structure argument. ${err}`));
      if(!err) resolve();
    });
  },
  validStructure: function(resolve,reject) {
    const validateList = [
      isItemObject,
      isFileOrDirDefined,
      isBothFileAndDirDefined,
      isFileDirString,
      isFileDirEmpty,
      hasFileDirSlashes,
      hasIncorrectButValidProps,
      hasMutualExclusiveProps,
      isUsedWithWrongFileDir,
      hasAddonPropOfCorrectType,
      isAddonPropEmpty,
      isContentsLeadingToJSON,
      hasJsonValidSyntax,
      isLeadingToCorrectPath,
      isOverwriteOfCorrectType,
      this.prepare.addItemData
    ];

    this.abstractStructure = [];
    iterator.call(this,validateList,this.structure,this.abstractStructure,0,[],()=>{
      resolve();
    });

     function iterator(validateList,list,abstract,index,parentIndex,whenDone){
        const isNext = index<list.length;
        delete this.structureData;
        if(!isNext) whenDone();
        if(isNext){
          this.structureData = {};
          this.structureData.item = list[index];
          this.structureData.index = index;
          this.structureData.parentIndices = parentIndex;

          moveOn(validateList,this,
            function(context,reject,item){
              abstract.push(item);
              
              const binded = iterator.bind(this,validateList,list,abstract,index+1,parentIndex,whenDone);
              const hasContent = item.folder&&item.action === 'contents';
              const hasJsonContent = type(item.json,Array);
              const hasOuterContent = item.folder&&this.utils.orEqual(item.action,'move','copy','merge');
              
              if(hasOuterContent){
                const config = {
                  from:item.from,
                  action:item.action,
                  overwrite:item.overwrite,
                  utils:this.utils
                };
                this.prepare.generateContent(config,(gen)=>{
                  const newParent = parentIndex.slice();
                  list[index].contents = gen;
                  newParent.push(index);
                  iterator.call(this,validateList,list[index].contents,item.children,0,newParent,binded);
                },reject);
              } else if(hasContent){
                  const newParent = parentIndex.slice();
                  if(hasJsonContent) list[index].contents = item.json;
                  newParent.push(index);
                  iterator.call(this,validateList,list[index].contents,item.children,0,newParent,binded);
              } else binded();
            },
            function(context,err){
              reject(err);
            });
        }
      }

      function isItemObject(resolve,reject){
        this.printMsg = `Invalid structure argument ${this.utils.indexPath.call(this)}.`;
        const cond = type(this.structureData.item,Object);
        if(cond) resolve();
        if(!cond) reject(new TypeError(`${this.printMsg} Each item of [Array] structure argument must be of [Object] type.`));
      }

      function isFileOrDirDefined(resolve,reject){
        const cond = this.utils.hasAtLeastItems(this.structureData.item,['file','dir'],1);
        if(cond) resolve();
        if(!cond) reject(new Error(`${this.printMsg} Each item of [Array] structure argument must contain either ['file'] or ['dir'] property.`));
      }

      function isBothFileAndDirDefined(resolve,reject){
        const cond = this.utils.hasAtLeastItems(this.structureData.item,['file','dir'],2);
        if(!cond) resolve();
        if(cond) reject(new Error(`${this.printMsg} Each item of [Array] structure argument must contain either ['file'] or ['dir'] property.`));
      }

      function isFileDirString(resolve,reject){
        this.structureData.fileDir = this.utils.whichPropertyDefined(this.structureData.item,['file','dir'])[0];
        if(prop(this.structureData.item,{[this.structureData.fileDir]:String},(o)=>{
          reject(new TypeError(`${this.printMsg} ${o.message}`));
        })){
          this.structureData.name = this.structureData.item[this.structureData.fileDir];
          resolve();
        }
      }

      function isFileDirEmpty(resolve,reject){
        const cond = this.structureData.item[this.structureData.fileDir].length;
        if(cond) resolve();
        if(!cond){
          const msgProp = this.structureData.fileDir==='file'?'file':'folder';
          reject(new Error(`${this.printMsg} The ["${this.structureData.fileDir}"] property is empty, while it should define the ${msgProp} name.`));
        }
      }

      function hasFileDirSlashes(resolve,reject){
        const cond = (/[\\\/]/).test(this.structureData.item[this.structureData.fileDir]);
        if(!cond) resolve();
        if(cond){
          const msgProp = this.structureData.fileDir==='file'?'file':'folder';
          reject(new Error(`${this.printMsg} The ["${this.structureData.fileDir}"] property should define the ${msgProp} name rather than ${msgProp} path. It cannot contain backslashes and forwardslashes.`));
        }
      }
      
      function hasIncorrectButValidProps(resolve,reject){
        var content = this.utils.hasAtLeastItems(this.structureData.item,['content'],1);
        var writefrom = this.utils.hasAtLeastItems(this.structureData.item,['writefrom'],1);
        if(content){
          this.structureData.item.contents = this.structureData.item.content;
          delete this.structureData.item.content;
        }
        if(writefrom){
          this.structureData.item.writeFrom = this.structureData.item.writefrom;
          delete this.structureData.item.writefrom;
        }
        resolve();
      }
      
      function hasMutualExclusiveProps(resolve,reject){
        var cond = this.utils.hasAtLeastItems(this.structureData.item,['move', 'copy', 'merge', 'contents', 'write', 'writeFrom'],2);
        if(!cond) resolve();
        if(cond) reject(new Error(`${this.printMsg} The [Object] items cannot contain ["move"], ["copy"], ["merge"], ["contents"], ["write"] or ["writeFrom"] properties at the same time.`));
      }

      function isUsedWithWrongFileDir(resolve,reject){
        this.structureData.addonProperty = this.utils.whichPropertyDefined(this.structureData.item, ['move', 'copy', 'merge', 'contents', 'write', 'writeFrom'])[0];
        const a = this.utils.orEqual(this.structureData.addonProperty,'merge','contents') && this.structureData.fileDir === 'file';
        const b = this.utils.orEqual(this.structureData.addonProperty,'write','writeFrom') && this.structureData.fileDir === 'dir';
        if(!(a||b)) resolve();
        if(a||b){
          var msgProp = this.structureData.fileDir==='file'?'dir':'file';
          reject(new Error(`${this.printMsg} The ["${this.structureData.addonProperty}"] property can be defined only with ["${msgProp}"] property.`));
        }
      }

      function hasAddonPropOfCorrectType(resolve,reject){
        if(!type(this.structureData.addonProperty,String)) return resolve();
        const isContent = this.structureData.addonProperty === 'contents';
        const isDir = this.structureData.fileDir === 'dir';
        const setType = isContent ? [Array,String]:String;
        const expected = {};
        expected[this.structureData.addonProperty] = setType;
        if(prop(this.structureData.item,expected,(o)=>{
          reject(new TypeError(`${this.printMsg} ${o.message}`));
        })) {
          this.structureData.contents = isContent && !isDir ? this.structureData.item.contents:null;
          resolve();
        }
      }

      function isAddonPropEmpty(resolve,reject){
        if(!type(this.structureData.addonProperty,String)) return resolve();
        if(this.utils.orEqual(this.structureData.addonProperty,'contents','write')) return resolve();
        const cond = this.structureData.item[this.structureData.addonProperty].length;
        if(cond) resolve();
        if(!cond){
          var msgProp = this.structureData.fileDir === 'file' ? 'file':'folder';
          reject(new Error(`${this.printMsg} The ["${this.structureData.addonProperty}"] property is empty, while it should indicate the ${msgProp}.`));
        }
      }

      function isContentsLeadingToJSON(resolve,reject){
        const addon = this.structureData.addonProperty;
        const contents = this.structureData.item.contents;
        if(!(addon==='contents'&&type(contents,String))) return resolve();
        this.utils.jsonExists(contents,(err)=>{
          if(err){
            var msgInfo = `${this.printMsg} Invalid property ["${addon}"].`;
            return reject(new Error(`${msgInfo} ${err}`));
          } else {
            this.structureData.json = contents;
            resolve();
          }
        });
      }

      function hasJsonValidSyntax(resolve,reject){
        if(!this.structureData.json) return resolve();
        this.utils.convertJSON(this.structureData.json,(err,data)=>{
          if(err) {
            var msgInfo = `${this.printMsg} Invalid property ["${this.structureData.addonProperty}"].`;
            return reject(new Error(`${msgInfo} ${err}`));
          } else {
            this.structureData.json = data;
            return resolve();
          }
        });
      }

      function isLeadingToCorrectPath(resolve,reject){
        if(!type(this.structureData.addonProperty,String)) return resolve();
        if(this.utils.orEqual(this.structureData.addonProperty,'contents','write')) return resolve();
        const setPath = this.structureData.item[this.structureData.addonProperty];
        this.utils.itemExists(setPath,(o)=>{
          var file = this.structureData.fileDir==='file',
              which = ['folder','file'],
              msgInfo = `${this.printMsg} Invalid property ["${this.structureData.addonProperty}"].`,
              msgExist = `The ${which[+file]} of the specified path does not exist.`,
              msgFileDir = `The path leads to the ${which[+!file]}, while it should indicate the ${which[+file]}.`;
          if(!o.exists) return reject(new Error(`${msgInfo} ${msgExist}`));
          if((!file&&o.file)||(file&&o.dir)) return reject(new Error(`${msgInfo} ${msgFileDir}`));
          this.structureData.from = setPath;
          resolve();
        });
      }

      function isOverwriteOfCorrectType(resolve,reject){
        const hasOverwrite = this.utils.hasAtLeastItems(this.structureData.item,['overwrite'],1);
        if(!hasOverwrite) return resolve();
        if(prop(this.structureData.item,{overwrite:Boolean},(o)=>{
          reject(new TypeError(`${this.printMsg} ${o.message}`));
        })) {
          this.structureData.overwrite = this.structureData.item.overwrite;
          resolve();
        }
      }
  },
  createRootFolder: function(resolve,reject){
      const root = path.resolve(this.root);
      this.rootAbsolute = root;
      this.utils.createDirs(root,resolve,reject);
  }
};

StructureDirs.prototype.preparations = {
  addItemData:function(resolve,reject){
    const newItem = {};
    newItem.folder = this.structureData.fileDir==='dir';
    newItem.file = this.structureData.fileDir==='file';
    newItem.name = this.structureData.name;
    newItem.overwrite = !!this.structureData.overwrite;
    newItem.action = this.structureData.addonProperty;
    newItem.from = this.structureData.from;
    newItem.contents = this.structureData.contents;
    newItem.path = this.structureData.parentIndices; //check if necessary
    newItem.relative = prepareRelative.call(this);
    newItem.alreadyFileExists = this.currentPaths.files.some((x)=>x===newItem.relative);
    newItem.alreadyDirExists = this.currentPaths.dirs.some((x)=>x===newItem.relative);
    if(newItem.folder) newItem.children = [];
    if(this.structureData.json) newItem.json = this.structureData.json;
    resolve(newItem);
    
      function prepareRelative(){
        const p = this.structureData.parentIndices;
        var chainItems = this.structure;
        var chainPath = [];
        for(var i in p){
          chainPath.push(chainItems[p[i]].dir);
          chainItems = chainItems[p[i]].contents;
        }
        var pathElements = chainPath.slice();
        pathElements.push(newItem.name);
        return path.join.apply(null,pathElements);
      }

  },
  
  generateContent:function(config,resolve,reject){
    run(null,null,[],resolve,reject);
    
    function run(getPath,newItem,getStructure,resolve,reject){
      const resPath = !getPath ? config.from:getPath;
      const errMsg = `Could not get the access to the ${resPath} contents.`;

      fs.readdir(resPath,(err,getItems)=>{
        if(err) return reject(errMsg);
        parseLevel(getItems,resPath,newItem,getStructure,resolve,reject);
      });

          function parseLevel(getItems,getPath,previousItem,getStructure,done){
            var iter = 0;
            if(!getItems.length) done(getStructure);
            if(getItems.length&&previousItem!==null) previousItem.contents = getStructure;
            for(let i in getItems){
              let resolvePath = path.resolve(getPath,getItems[i]);
              config.utils.itemExists(resolvePath,(o)=>{
                if(o.error) return reject(errMsg);
                if(!o.exists||!(o.file||o.dir)) return;
                const newItem = {};
                if(config.overwrite!==null) newItem.overwrite = config.overwrite;
                if(o.dir){
                  newItem.dir = getItems[i];
                  getStructure.push(newItem);
                  run(resolvePath,newItem,[],isFinish);
                }
                if(o.file){
                  newItem.file = getItems[i];
                  if(config.action!==null) newItem[config.action] = resolvePath;
                  getStructure.push(newItem);
                  isFinish();
                };
                
              });
            }
            function isFinish(){
              if(++iter===getItems.length) done(getStructure);
            }
          }
    }
  },
  prepareCurrentContentsList:function(resolve,reject){
    this.currentPaths = {};
    listContent(this.rootAbsolute,(o)=>{
      if(o.error){
        return reject(new Error(`Could not get the access to the contents of the given directory path '${this.root}'.`));
      } else {
        this.currentPaths.files = o.files.sort((a,b)=>a.length-b.length);
        this.currentPaths.dirs = o.dirs.sort((a,b)=>a.length-b.length);
        resolve();
      }
    });
  },
  convertStructureJSON:function(resolve,reject){
    if(!type(this.structure,String)) return resolve();
    this.utils.convertJSON(this.structure,(err,data)=>{
      if(err) return reject(new Error(`Invalid structure argument. ${err}`));
      if(!err){
        this.structure = data;
        return resolve();
      }
    });
  }
};

StructureDirs.prototype.appenders = {
  initActions:function(resolve){
    run.call(this,this.abstractStructure,resolve);
    function run(level,done){
      var isSuccessful = true;
      var iter = 0;
      if(!level.length) return done(true);
      for(let i in level){
        let item = level[i];
        let isAction = this.utils.orEqual(item.action,'move','copy','merge');
        let bindEachError = this.response.onEach.bind(this,item,false);
        let bindEach = this.response.onEach.bind(this,item,true);
        if(item.folder&&item.children.length){
          this.appenders.createItem.call(this,item,()=>{
            if(!isAction) bindEachError();
            run.call(this,item.children,(s)=>{
              if(!isAction) isSuccessful = s;
              if(s&&isAction) bindEach();
              if(!s&&isAction) bindEachError();
              increase();
            });
          },()=>{
            isSuccessful = false;
            bindEachError();
            increase();
          });
        } else {
          this.appenders.createItem.call(this,item,()=>{
            bindEach();
            increase();
          },()=>{
            isSuccessful = false;
            bindEachError();
            increase();
          });
        }
      }
      function increase(){
        if(++iter===level.length) done(isSuccessful);
      }
    }
  },
  createItem:function(item,done,fail){
    setTimeout(()=>{ //temporary for async tests
      if(item.relative==='a\\c'){ //temporary for fail test
        fail();
      } else {
        done();
      }
      
    },1);
  }
};

StructureDirs.prototype.response = {
  onDone:function(context,reject){
    this.done({error:null});
  },
  onDoneError:function(context,err){
    this.done({error:err});
  },
  onEach:function(item,success){
    if(!this.each) return;
    
    var obj = {
//    error
//    message
      success:success,
      item:item.folder ? 'dir':'file',
      from:item.from,
      action:printAction(),
      overwrite:item.overwrite,
      root:this.root,
      absolute:path.resolve(this.root,item.relative),
      relative:item.relative
    };
    
    this.each(obj);
    
    function printAction(){
      if(item.action==='contents') return 'create';
      if(!item.action) return 'create';
    }
  }
};

StructureDirs.prototype.utils = {
  itemExists:function(getPath,callback){
    fs.stat(getPath,(err,stats)=>{
      var o = {error:null,exists:false,file:false,dir:false};
      if(err) o.error = err;
      if(!err){
        o.exists = type(err,null);
        o.file = type(stats,'Stats')&&stats.isFile();
        o.dir = type(stats,'Stats')&&stats.isDirectory();
      }
      return callback(o);
    });
  },
  jsonExists:function(getPath,callback){
    this.itemExists(getPath,(o)=>{
      if(!o.exists) return callback('The file of the specified path does not exist.');
      var jsonExt = !(/^\.json$/i).test(path.extname(getPath));
      if(o.exists&&o.file&&jsonExt) return callback('The path should indicate the JSON file.');
      if(o.exists&&!o.file&&o.dir) return callback('The path leads to the folder, while it should indicate the JSON file.');
      if(o.exists&&o.file) callback(null);   
    });
  },
  folderExists:function(getPath,callback){
    this.itemExists(getPath,(o)=>{
      if(!o.exists) return callback(new Error(`The given path '${getPath}' does not exist.`));
      if(o.exists&&o.file) return callback(new Error(`The given path '${getPath}' leads to the file, while it should indicate the folder.`));
      if(!(o.exists&&o.dir)) return callback(new Error(`Could not get the access to the given path '${getPath}'.`));
      if(o.exists&&o.dir) return callback(null);
    });
  },
  orEqual:function(){
    for(var i=1;i<arguments.length;i++){
      if(arguments[0]===arguments[i]) return true;
    }
    return false;
  },
  indexPath:function(){
    var newArr = this.structureData.parentIndices.slice();
    var indexPath = '';
    newArr.push(this.structureData.index);
    newArr.forEach((x)=>{
      indexPath+=`[${x}]`;
    });
    return indexPath;
  },
  hasAtLeastItems:function(a,expected,num){
    const actual = type(a,Object) ? Object.getOwnPropertyNames(a):a;
    var iter = 0;
    expected.forEach((expItem)=>{
      actual.some((actItem,actInd,actArr)=>{
        if(expItem===actItem){
          actArr.splice(actInd,1);
          iter++;
          return true;
        }
      });
    });
    return iter>=num;
  },
  whichPropertyDefined: function(a,expected){
    const actual = type(a,Object) ? Object.getOwnPropertyNames(a):a;
    const result = expected.filter((o)=>actual.some((a)=>a===o));
    return type(result,Array) ? result:null;
  },
  createDirs: function(getPath,resolve,reject){
    const elements = getPath.split(/\\|\//);
    const pathList = [];
    const utils = this;
    for(var x=1;x<=elements.length;x++){
      var nextPath = '';
      for(var i=0;i<x;i++) nextPath+=elements[i]+(i<x-1 ? '/':'');
      pathList.push(nextPath);
    }
    var mkIter = 0;
    createNext(pathList[mkIter],resolve);

    function createNext(elemPath,eachDone){
      utils.itemExists(elemPath,(o)=>{
        if(o.exists&&o.dir) next();
        if(o.exists&&o.file) return reject(new Error(`Could not create the folder in the path '${getPath}', because the file of the same name already exists in this path.`));
        if(!o.exists){
          fs.mkdir(elemPath,(err)=>{
            if(err) return reject(new Error(`Could not create the folder in the path '${getPath}'. The access was denied.`));
            if(!err) next();
          });
        }

        function next(){
          mkIter++;
          if(mkIter<pathList.length) createNext(pathList[mkIter],eachDone);
          if(mkIter>=pathList.length) eachDone();
        }
      });
    }
  },
  convertJSON:function(json,callback){
    fs.readFile(json,(err,data)=>{
      if(err) return callback('Could not read the given JSON file.');
      if(!err){
        try{
          const structure = JSON.parse(data);
          if(!type(structure,Array)) return callback('It must be of [Array] type.');
          callback(null,structure);
        } catch(err){
          return callback('Could not convert the given JSON file content.');
        }
      }
    });    
  }

};