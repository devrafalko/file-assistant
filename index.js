/* global Promise, __dirname, Function */
const fs = require('fs');
const path = require('path');
const args = require('typeof-arguments');
const prop = require('typeof-properties');
const type = require('of-type');
const moveOn = require('move-on');
const emptyFolder = require('empty-folder');
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
      p.response.prepareDoneObject,
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
        deep:true,
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
        if(o.error) reject(new Error(`Could not get the access to the given folder '${this.model}'.`));
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
      var validOk = args(this.args,[String,[Array,String],Function,[Function,undefined]],(o)=>{
        reject(new TypeError(`${o.message}`));
      });
      if(validOk) resolve();
  },
  validateStructureJSON: function(resolve,reject){
    if(!type(this.structure,String)) return resolve();
    this.utils.jsonExists(this.structure,(err)=>{
      if(err) return reject(new Error(`Invalid structure argument. ${err}`));
      if(!err) resolve();
    });
  },
  validStructure: function(resolve,reject){
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
      isOverwriteOfCorrectType,
      isLeadingToCorrectPath,
      this.prepare.addItemData
    ];

    this.abstractStructure = [];
    iterator.call(this,validateList,this.structure,this.abstractStructure,0,[],null,null,()=>{
      resolve();
    });

     function iterator(validateList,list,abstract,index,parentIndex,parentAction,parentOverwrite,whenDone){
        const isNext = index<list.length;
        if(!isNext) whenDone();
        if(isNext){
          this.itemData = {};
          this.itemData.item = list[index];
          this.itemData.index = index;
          this.itemData.from = null;
          this.itemData.overwritten = false;
          this.itemData.parentIndices = parentIndex;
          this.itemData.parentOverwrite = parentOverwrite;
          moveOn(validateList,this,
            function(context,reject,item){
              abstract.push(item);

              const binded = iterator.bind(this,validateList,list,abstract,index+1,parentIndex,parentAction,parentOverwrite,whenDone);
              const hasContent = item.folder&&item.action === 'contents';
              const hasJsonContent = type(item.json,Array);
              const hasOuterContent = item.folder&&this.utils.orEqual(item.action,'move','copy','merge');
              const overwriteForbidden = item.folder&&item.alreadyDirExists&&!item.overwrite&&(item.action==='copy'||item.action==='move');
              const newParentOverwrite = item.action==='merge' ? false:!!item.overwrite;
              if(parentAction!==null&&item.folder) item.action = parentAction;
              if(hasOuterContent&&!overwriteForbidden){
                const config = {
                  from:item.from,
                  action:item.action,
                  deep:false,
                  overwrite:!!item.overwrite,
                  utils:this.utils
                };
                this.prepare.generateContent(config,(gen)=>{
                  const newParent = parentIndex.slice();
                  list[index].contents = gen;
                  newParent.push(index);
                  iterator.call(this,validateList,gen,item.children,0,newParent,item.action,newParentOverwrite,binded);
                },reject);
              } else if(hasContent){
                  const newParent = parentIndex.slice();
                  if(hasJsonContent) list[index].contents = item.json;
                  newParent.push(index);
                  iterator.call(this,validateList,list[index].contents,item.children,0,newParent,parentAction,newParentOverwrite,binded);
              } else binded();
            },
            function(context,err){
              reject(err);
            });
        }
      }

      function isItemObject(resolve,reject){
        this.printMsg = `Invalid structure argument ${this.utils.indexPath.call(this)}.`;
        const cond = type(this.itemData.item,Object);
        if(cond) resolve();
        if(!cond) reject(new TypeError(`${this.printMsg} Each item of [Array] structure argument must be of [Object] type.`));
      }

      function isFileOrDirDefined(resolve,reject){
        const cond = this.utils.hasAtLeastItems(this.itemData.item,['file','dir'],1);
        if(cond) resolve();
        if(!cond) reject(new Error(`${this.printMsg} Each item of [Array] structure argument must contain either ['file'] or ['dir'] property.`));
      }

      function isBothFileAndDirDefined(resolve,reject){
        const cond = this.utils.hasAtLeastItems(this.itemData.item,['file','dir'],2);
        if(!cond) resolve();
        if(cond) reject(new Error(`${this.printMsg} Each item of [Array] structure argument must contain either ['file'] or ['dir'] property.`));
      }

      function isFileDirString(resolve,reject){
        const fileOrDir = this.utils.whichPropertyDefined(this.itemData.item,['file','dir'])[0];
        this.itemData.itemType = fileOrDir;
        this.itemData.itemMessage = fileOrDir === 'file' ? 'file':'folder';
        this.itemData.file = fileOrDir === 'file';
        this.itemData.folder = fileOrDir === 'dir';
        if(prop(this.itemData.item,{[fileOrDir]:String},(o)=>{
          reject(new TypeError(`${this.printMsg} ${o.message}`));
        })){
          this.itemData.name = this.itemData.item[fileOrDir];
          resolve();
        }
      }

      function isFileDirEmpty(resolve,reject){
        const cond = this.itemData.item[this.itemData.itemType].length;
        if(cond) resolve();
        if(!cond){
          reject(new Error(`${this.printMsg} The ["${this.itemData.itemType}"] property is empty, while it should define the ${this.itemData.itemMessage} name.`));
        }
      }

      function hasFileDirSlashes(resolve,reject){
        const cond = (/[\\\/]/).test(this.itemData.item[this.itemData.itemType]);
        if(!cond) resolve();
        if(cond){
          reject(new Error(`${this.printMsg} The ["${this.itemData.itemType}"] property should define the ${this.itemData.itemMessage} name rather than ${this.itemData.itemMessage} path. It cannot contain backslashes and forwardslashes.`));
        }
      }

      function hasIncorrectButValidProps(resolve,reject){
        var content = this.utils.hasAtLeastItems(this.itemData.item,['content'],1);
        var writefrom = this.utils.hasAtLeastItems(this.itemData.item,['writefrom'],1);
        if(content){
          this.itemData.item.contents = this.itemData.item.content;
          delete this.itemData.item.content;
        }
        if(writefrom){
          this.itemData.item.writeFrom = this.itemData.item.writefrom;
          delete this.itemData.item.writefrom;
        }
        resolve();
      }

      function hasMutualExclusiveProps(resolve,reject){
        var cond = this.utils.hasAtLeastItems(this.itemData.item,['move', 'copy', 'merge', 'contents', 'write', 'writeFrom'],2);
        if(!cond) resolve();
        if(cond) reject(new Error(`${this.printMsg} The [Object] items cannot contain ["move"], ["copy"], ["merge"], ["contents"], ["write"] or ["writeFrom"] properties at the same time.`));
      }

      function isUsedWithWrongFileDir(resolve,reject){
        this.itemData.action = this.utils.whichPropertyDefined(this.itemData.item, ['move', 'copy', 'merge', 'contents', 'write', 'writeFrom'])[0];
        if(!type(this.itemData.action,String)) this.itemData.action = 'create';
        const a = this.utils.orEqual(this.itemData.action,'merge','contents') && this.itemData.file;
        const b = this.utils.orEqual(this.itemData.action,'write','writeFrom') && this.itemData.folder;
        if(!(a||b)) resolve();
        if(a||b){
          var msgProp = this.itemData.itemType==='file'?'dir':'file';
          reject(new Error(`${this.printMsg} The ["${this.itemData.action}"] property can be defined only with ["${msgProp}"] property.`));
        }
      }

      function hasAddonPropOfCorrectType(resolve,reject){
        if(this.itemData.action === 'create') return resolve();
        const isContent = this.itemData.action === 'contents';
        const setType = isContent ? [Array,String]:String;
        const expected = {};
        expected[this.itemData.action] = setType;
        if(prop(this.itemData.item,expected,(o)=>{
          reject(new TypeError(`${this.printMsg} ${o.message}`));
        })) {
          resolve();
        }
      }

      function isAddonPropEmpty(resolve,reject){
        if(this.itemData.action === 'create') return resolve();
        if(this.utils.orEqual(this.itemData.action,'contents','write')) return resolve();
        const cond = this.itemData.item[this.itemData.action].length;
        if(cond) resolve();
        if(!cond){
          reject(new Error(`${this.printMsg} The ["${this.itemData.action}"] property is empty, while it should indicate the ${this.itemData.itemMessage}.`));
        }
      }

      function isContentsLeadingToJSON(resolve,reject){
        const contents = this.itemData.item.contents;
        if(!(this.itemData.action==='contents'&&type(contents,String))) return resolve();
        this.utils.jsonExists(contents,(err)=>{
          if(err){
            var msgInfo = `${this.printMsg} Invalid property ["${this.itemData.action}"].`;
            return reject(new Error(`${msgInfo} ${err}`));
          } else {
            this.itemData.json = contents;
            resolve();
          }
        });
      }

      function hasJsonValidSyntax(resolve,reject){
        if(!this.itemData.json) return resolve();
        this.utils.convertJSON(this.itemData.json,(err,data)=>{
          if(err) {
            var msgInfo = `${this.printMsg} Invalid property ["${this.itemData.action}"].`;
            return reject(new Error(`${msgInfo} ${err}`));
          } else {
            this.itemData.json = data;
            return resolve();
          }
        });
      }

      function isOverwriteOfCorrectType(resolve,reject){
        const hasOverwrite = this.utils.hasAtLeastItems(this.itemData.item,['overwrite'],1);
        if(!hasOverwrite) return resolve();
        if(prop(this.itemData.item,{overwrite:Boolean},(o)=>{
          reject(new TypeError(`${this.printMsg} ${o.message}`));
        })) {
          this.itemData.overwrite = !!this.itemData.item.overwrite;
          resolve();
        }
      }

      function isLeadingToCorrectPath(resolve,reject){
        if(this.itemData.action === 'create') return resolve();
        if(this.utils.orEqual(this.itemData.action,'contents','write')) return resolve();
        const setPath = this.itemData.item[this.itemData.action];
        this.utils.itemExists(setPath,(o)=>{
          var file = this.itemData.file,
              which = ['folder','file'],
              msgInfo = `${this.printMsg} Invalid property ["${this.itemData.action}"].`,
              msgExist = `The ${which[+file]} of the specified path does not exist.`,
              msgFileDir = `The path leads to the ${which[+!file]}, while it should indicate the ${which[+file]}.`;
          if(!o.exists) return reject(new Error(`${msgInfo} ${msgExist}`));
          if((!file&&o.file)||(file&&o.dir)) return reject(new Error(`${msgInfo} ${msgFileDir}`));
          this.itemData.from = path.normalize(setPath);
          resolve();
        });
      }

  },
  createRootFolder: function(resolve,reject){
      this.root = path.resolve(this.root);
      this.doneObject.root = this.root;
      this.utils.createDirs(this.root,resolve,reject);
  }
};

StructureDirs.prototype.preparations = {
  addItemData:function(resolve,reject){
    this.itemData.root = this.root;
    this.itemData.relative = prepareRelative.call(this);
    this.itemData.absolute = path.resolve(this.root,this.itemData.relative);
    this.itemData.alreadyFileExists = this.itemData.parentOverwrite===true ? false:this.currentPaths.files.some((x)=>x===this.itemData.relative);
    this.itemData.alreadyDirExists = this.itemData.parentOverwrite===true ? false:this.currentPaths.dirs.some((x)=>x===this.itemData.relative);
    if(this.itemData.folder) this.itemData.children = [];
    if(this.itemData.action==='write') this.itemData.content = this.itemData.item.write;
    if(this.itemData.item.contents) this.itemData.action === 'create';
    
    resolve(this.itemData);
    
      function prepareRelative(){
        const p = this.itemData.parentIndices;
        var chainItems = this.structure;
        var chainPath = [];
        for(var i in p){
          chainPath.push(chainItems[p[i]].dir);
          chainItems = chainItems[p[i]].contents;
        }
        var pathElements = chainPath.slice();
        pathElements.push(this.itemData.name);
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
            if(getItems.length&&previousItem!==null&&config.deep) previousItem.contents = getStructure;
            for(let i in getItems){
              let resolvePath = path.join(getPath,getItems[i]);
              config.utils.itemExists(resolvePath,(o)=>{
                if(o.error) return reject(errMsg);
                if(!o.exists||!(o.file||o.dir)) return;
                const newItem = {};
                if(config.overwrite!==null) newItem.overwrite = config.overwrite;
                if(o.dir){
                  newItem.dir = getItems[i];
                  getStructure.push(newItem);
                  if(config.deep){
                    run(resolvePath,newItem,[],isFinish);
                  } else {
                    if(config.action!==null){
                      newItem[config.action] = resolvePath;
                    }
                    isFinish();
                  }
                }
                if(o.file){
                  newItem.file = getItems[i];
                  if(config.action!==null) newItem[config.action==='merge'?'copy':config.action] = resolvePath;
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
    listContent(this.root,(o)=>{
      if(o.error){
        return reject(o.error);
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
    run.call(this,this.abstractStructure,null,resolve);
    function run(level,parent,done){
      var iter = 0;
      if(!level.length) return done();
      for(let i in level){
        let item = level[i];
        const nextRun = run.bind(this,item.children,item,increase.bind(this));
        const hasContent = item.folder&&item.children.length ? nextRun:increase.bind(this);
        this.appenders.createItem.call(this,item,hasContent);
      }
      function increase(){
        if(++iter===level.length){
          if(parent) this.appenders.tidyUpFolder.call(this,parent,done);
          if(!parent) done();
        }
      }
    }
  },
  tidyUpFolder:function(item,resolve){
    const funList = [
      checkIfItemFailed,
      resultForParent,
      removeMovedFolder,
      computeMessage
    ];
    const userContext = {
      item:item,
      each:this.each,
      doneObject:this.doneObject,
      response:this.response,
      utils:this.utils,
      messages:this.response.messages,
      computeMessage:this.response.computeMessage
    };
    moveOn(funList,userContext,resolve,()=>{});
    
    function checkIfItemFailed(resolve){
      this.wasItemFailed = this.item.result.fail!==null;
      resolve();
    }
    
    function resultForParent(resolve){
      const countResult = {};
      //sumResults(this.item.result);
      for(var x in this.item.children){
        sumResults(this.item.children[x].result);
      }
      this.item.childResults = countResult;
      resolve();
      function sumResults(obj){
        for(var y in obj){
          countResult[y] = obj[y]!==null ? true:countResult[y] ? countResult[y]:false;
        }
      }
    }
    
    function removeMovedFolder(resolve){
      if(this.wasItemFailed||this.item.action!=='move') return resolve();
      emptyFolder(this.item.from,(err)=>{
        if(err) this.wasMoveFailed = true;
        if(!err){
          fs.rmdir(this.item.from,(err)=>{
            if(err) this.wasMoveFailed = true;
            if(!err) resolve();
          });
        }
      });
    }
    
    function computeMessage(resolve){
      if(this.item.result.success!==null||this.item.result.fail!==null||this.item.result.warning!==null){
        this.response.prepareEach.call(this);
        return resolve();
      }
      switch(true){
        case (this.wasItemFailed):
          return resolve();
        case (this.item.action==='move',this.wasMoveFailed):
          this.computeMessage('fail',false,'. The folder was successfully copied to the target location, but could not be removed from its origin location.');
          break;
        case (this.item.childResults.fail):
          this.computeMessage('warning',true,', but at least one of its child items failed.');
          break;
        case (this.item.childResults.warning):
          this.computeMessage('warning',true,', but at least one of its child items gave warning.');
          break;
        case (this.item.childResults.success):
          this.computeMessage('success',true);
          break;
      }
      this.response.prepareEach.call(this);
      resolve();
    }

  },
  createItem:function(item,done){
    const fileList = [
      this.appenders.abortIfDirExists,
      this.appenders.abortIfFileOverwrite,
      this.appenders.readContent,
      this.appenders.writeFile,
      this.appenders.removeFile
    ];
    const dirList = [
      this.appenders.abortIfFileExists,
      this.appenders.abortIfDirOverwrite,
      this.appenders.createFolder,
      this.appenders.emptyContent
    ];

    const userContext = {
      item:item,
      doneObject:this.doneObject,
      each:this.each,
      response:this.response,
      utils:this.utils,
      messages:this.response.messages,
      computeMessage:this.response.computeMessage
    };
    
    item.result = {
      success:null,
      fail:null,
      warning:null
    };
    
    if(item.file) moveOn(fileList,userContext,onFileResolve,onFileResolve);
    if(item.folder) moveOn(dirList,userContext,onDirResolve,onDirResolve);
    
    function onFileResolve(){
      this.response.prepareEach.call(this);
      done();
    }

    function onDirResolve(){
      if(this.item.children.length===0||this.item.result.fail!==null){
        this.response.prepareEach.call(this);
      } 
      done();
    }
  },
  abortIfDirExists:function(resolve,reject){
    if((this.item.file&&this.item.alreadyDirExists)){
      this.computeMessage('fail',false,', because the folder of the same name already exists in this path.');
      return reject();
    }
    resolve();
  },
  abortIfFileOverwrite:function(resolve,reject){
    if(this.item.alreadyFileExists&&!this.item.overwrite&&!this.item.content&&this.item.action!=='writeFrom'){
      this.computeMessage('warning',false,', due to the "overwrite" property settings.',true);
      return reject();
    }
    resolve();
  },
  readContent:function(resolve,reject){
    if(type(this.item.content,String)){
      return resolve();
    } else if(this.item.from){
      fs.readFile(this.item.from,(err,data)=>{
        if(err){
          this.computeMessage('fail',false,`. Could not read the content of the '${this.item.from}' file.`);
          return reject();
        }
        if(!err){
          this.item.content = data;
          return resolve();
        }
      });
    } else {
      return resolve();
    }
  },
  writeFile:function(resolve,reject){
    var nonExist = !this.item.alreadyFileExists;
    var overwrite = this.item.alreadyFileExists&&this.item.overwrite;
    var append = this.item.alreadyFileExists&&!this.item.overwrite;
    
    const meth = append ? 'appendFile':(nonExist||overwrite) ? 'writeFile':null;
    if(!meth) return resolve();
    const stringifyContent = this.item.content || '';
    fs[meth](this.item.absolute,stringifyContent,(err)=>{
      if(err){
        this.computeMessage('fail',false);
        return reject();
      }
      if(!err){
        if(this.item.alreadyFileExists&&this.item.overwrite) this.item.overwritten = true;
        resolve();
      }
    });
  },
  removeFile:function(resolve,reject){
    if(this.item.action!=='move'){
      this.computeMessage('success',true);
      return resolve();
    }
    fs.unlink(this.item.from,(err)=>{
      if(err){
        this.computeMessage('fail',false,'. The file was successfully copied to the target location, but could not be removed from its origin location.');
        return reject();
      }
      if(!err){
        this.computeMessage('success',true);
        resolve();
      }
    });
  },
  
  abortIfFileExists:function(resolve,reject){
    if((this.item.folder&&this.item.alreadyFileExists)){
      this.computeMessage('fail',false,', because the folder of the same name already exists in this path.');
      return reject();
    }
    resolve();
  },
  abortIfDirOverwrite:function(resolve,reject){
    if(this.item.alreadyDirExists&&!this.item.overwrite&&this.item.action!=='merge'){
      this.computeMessage('warning',false,', due to the "overwrite" property settings.',true);
      return reject();
    }
    resolve();
  },
  createFolder:function(resolve,reject){
    if(this.item.alreadyDirExists) return resolve();
    fs.mkdir(this.item.absolute,(err)=>{
      if(err){
        this.computeMessage('fail',false,);
        return reject();
      }
      if(!err){
        this.computeMessage('success',true);
        return resolve();
      }
    });
  },
  emptyContent:function(resolve,reject){
    if(this.item.alreadyDirExists&&this.item.overwrite&&this.item.action!=='merge'){
      emptyFolder(this.item.absolute,(err)=>{
        if(err){
          this.computeMessage('fail',false);
          return reject();
        }
        if(!err){
          this.item.overwritten = true;
          if(!this.item.children.length) this.computeMessage('success',true);
          return resolve();
        }
      });
    } else {
      if(!this.item.children.length) this.computeMessage('success',true);
      return resolve();
    }
  }
};

StructureDirs.prototype.response = {
  onDone:function(context,reject){
    this.done(this.doneObject);
  },
  onDoneError:function(context,err){
    this.doneObject.error = err;
    this.done(this.doneObject);
  },
  prepareDoneObject:function(resolve,reject){
    this.doneObject = {
      error:null,
      files:{
        fail:[],
        success:[],
        warning:[]
      },
      dirs:{
        fail:[],
        success:[],
        warning:[]
      },
      root:this.root
    };
    resolve();
  },
  prepareEach:function(){
    if(!this.each) return;
    const eachObject = {
      fail:this.item.result.fail,
      warning:this.item.result.warning,
      success:this.item.result.success,
      item:this.item.itemType,
      from:this.item.from,
      action:this.item.action,
      overwritten:this.item.overwritten,
      root:this.item.root,
      relative:this.item.relative,
      absolute:this.item.absolute
    };
    this.each(eachObject);
    this.response.passDonePath.call(this);
  },
  passDonePath: function(resolve){
    const type = this.item.result.success!==null ? 'success':this.item.result.warning!==null ? 'warning':'fail';
    this.doneObject[this.item.file ? 'files':'dirs'][type].push(this.item.absolute);
  },
  messages:{
    fileNonExist:function(success){
      const message = {
        create:`created`,
        copy:`copied from the "${this.item.from}" path`,
        move:`moved from the "${this.item.from}" path`,
        write:`created with the given content`,
        writeFrom:`created with the content from the "${this.item.from}" file`
      };
      return `The file "${this.item.relative}" ${success?'was successfully':'could not be'} ${message[this.item.action]}`;
    },
    fileOverwrite:function(success){
      const actionMsg = type(this.item.content,String) ?
        `The content of "${this.item.relative}" file`:
        `The already existing file "${this.item.relative}"`;
      const message = {
        create:`by the newly created file`,
        copy:`by the file copied from the "${this.item.from}" path`,
        move:`by the file moved from the "${this.item.from}" path`,
        write:`with the given content`,
        writeFrom:`with the content from the "${this.item.from}" file`
      };
      return `${actionMsg} ${success?'was successfully':'could not be'} overwritten ${message[this.item.action]}`;
    },
    fileAppend:function(success){
      const message = {
        write:`The given content`,
        writeFrom:`The content from the "${this.item.from}" file`
      };
      return `${message[this.item.action]} ${success?'was successfully':'could not be'} appended to the "${this.item.relative}" file`;
    },
    dirNonExist:function(success){
      const message = {
        create:'created',
        contents:'created with its contents',
        copy:`copied from the "${this.item.from}" path`,
        move:`moved from the "${this.item.from}" path`,
        merge:`merged with the "${this.item.from}" folder`
      };
      return `The folder "${this.item.relative}" ${success?'was successfully':'could not be'} ${message[this.item.action]}`;
    },
    dirOverwrite:function(success){
      const message = {
        create:'overwritten by the newly created folder',
        contents:'overwritten by the newly created folder and its contents',
        copy:`overwritten by the folder copied from the "${this.item.from}" path`,
        move:`overwritten by the folder moved from the "${this.item.from}" path`,
        merge:`merged with the "${this.item.from}" folder`
      };
      return `The already existing folder "${this.item.relative}" ${success?'was successfully':'could not be'} ${message[this.item.action]}`;
    }
  },
  computeMessage:function(type,isSuccess,additional,doubled){
    additional = additional ? additional:'.';
    var msg;
    if(this.item.file){
      switch(true){
        case (doubled||this.item.alreadyFileExists&&this.item.overwrite):
          msg = 'fileOverwrite';
          break;
        case (!this.item.alreadyFileExists):
          msg = 'fileNonExist';
          break;
        case (this.item.alreadyFileExists&&!this.item.overwrite):
          msg = 'fileAppend';
          break;
      }
    }
    if(this.item.folder){
      switch(true){
        case (doubled||this.item.alreadyDirExists):
          msg = 'dirOverwrite';
          break;
        case (!this.item.alreadyDirExists):
          msg = 'dirNonExist';
          break;
      }
    }
    
    if(msg) this.item.result[type] = this.messages[msg].call(this,isSuccess)+additional;
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
    var newArr = this.itemData.parentIndices.slice();
    var indexPath = '';
    newArr.push(this.itemData.index);
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