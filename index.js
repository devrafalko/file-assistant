/* global Promise, __dirname, Function, this */
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
  this.init.compare = (model,compared,config,callback)=>proto.methods.compare.call(proto,model,compared,config,callback);
  this.init.ensureDir = (path,callback)=>proto.methods.ensureDir.call(proto,path,callback);

  function initStructure(){
    const p = this.prototype;
    const validation = [
      p.validation.isDoneFunction,
      p.preparations.prepareDoneObject,
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
      validation:p.validation,
      response:p.response,
      prepare:p.preparations,
      appenders:p.appenders,
      utils:p.utils
    };

    moveOn(validation,userContext,p.response.onDone,p.response.onDoneError);

  };

}

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
  createRootFolder: function(resolve,reject){
    this.root = path.resolve(this.root);
    this.doneObject.root = this.root;
    this.utils.createDirs(this.root,resolve,reject);
  },
  validateStructureJSON: function(resolve,reject){
    if(!type(this.structure,String)) return resolve();
    this.utils.jsonExists(this.structure,(err)=>{
      if(err) return reject(new Error(`Invalid structure argument. ${err}`));
      if(!err) resolve();
    });
  },
  validStructure: function(resolve,reject){
    const methodsList = Object.getOwnPropertyNames(this.validation.methods);
    const functionList = [];
    
    for(var method of methodsList){
      functionList.push(this.validation.methods[method]);
    }

    this.abstractStructure = {};
    const globalData = {
      execution:true,
      root:this.root,
      invalidMessage:(indeces)=>`Invalid structure argument ${indeces}.`
    };

    exploreStructure.call(this,{
      currentLevel:this.structure,
      abstract:this.abstractStructure,
      parent:null,
      siblings:this.firstLevelSiblings,
      indeces:'',
      whenDone:resolve
    });

    function exploreStructure(o){
      if(!o.currentLevel.length) o.whenDone.call(this.globalData);
      
      const levelData = {
        iterator:0,
        abstract:o.abstract,
        elementsNumber:o.currentLevel.length,
        parent:o.parent,
        siblings:o.siblings,
        whenDone:o.whenDone,
        reservedNames:{}
      };

      for(var i in o.currentLevel){
        const userContext = {
          utils:this.utils,
          prepare:this.prepare,
          globalData:globalData,
          levelData:levelData,
          itemData:{
            item:o.currentLevel[i],
            indeces:`${o.indeces}[${i}]`
          }
        };
        moveOn(functionList,userContext,onItemDone,onItemFail);
      }
    }

      function onItemDone(){
        if(this.globalData.execution === false) return;
        if(!type(this.levelData.abstract[this.itemData.name],Array)) this.levelData.abstract[this.itemData.name] = [];
        this.levelData.abstract[this.itemData.name].push(this.itemData);

        const hasAbstractStructure = type(this.itemData.item.contents,Array);
        if(!hasAbstractStructure) return moveIterator.call(this);

        exploreStructure.call(this,{
          currentLevel:this.itemData.item.contents,
          abstract:this.itemData.abstractScope,
          parent:this.itemData,
          siblings:this.itemData.childrenList,
          indeces:this.itemData.indeces,
          whenDone:()=>{
            moveIterator.call(this);
          }
        });

        function moveIterator(){
          this.levelData.iterator++;
          if(this.levelData.iterator>=this.levelData.elementsNumber){
            const parent = this.levelData.parent;
            if(parent&&parent.folder&&(Object.keys(parent.abstractScope).length)) parent.tidyUp = true;
            return this.levelData.whenDone.call(this.globalData);
          }
        }
      }

      function onItemFail(userContext,err){
        if(this.globalData.execution === false) return;
        this.globalData.execution = false;
        reject(err);
      }
    
  },
  methods:{
    defineInvalidMessage:function(resolve){
      this.itemData.invalidMessage = this.globalData.invalidMessage(this.itemData.indeces);
      resolve();
    },
    isItemObject:function(resolve,reject){
      const condition = type(this.itemData.item,Object);
      if(condition) return resolve();
      reject(new TypeError(`${this.itemData.invalidMessage} Each item of [Array] structure argument must be of [Object] type.`));
    },
    isFileOrDirDefined:function(resolve,reject){
      const condition = this.utils.hasAtLeastItems(this.itemData.item,['file','dir','unrecognized'],1);
      if(condition) return resolve();
      reject(new Error(`${this.itemData.invalidMessage} Each item of [Array] structure argument must contain either ['file'] or ['dir'] property.`));
    },
    isBothFileAndDirDefined:function(resolve,reject){
      const condition = this.utils.hasAtLeastItems(this.itemData.item,['file','dir'],2);
      if(!condition) return resolve();
      reject(new Error(`${this.itemData.invalidMessage} Each item of [Array] structure argument must contain either ['file'] or ['dir'] property.`));
    },
    defineItemType:function(resolve){
      const fileOrDir = this.utils.whichPropertyDefined(this.itemData.item,['file','dir','unrecognized'])[0];
      this.itemData.itemType = fileOrDir;
      this.itemData.itemMessage = fileOrDir === 'file' ? 'file':fileOrDir === 'dir' ? 'folder':'unrecognized';
      this.itemData.file = fileOrDir === 'file';
      this.itemData.folder = fileOrDir === 'dir';
      this.itemData.unrecognized = fileOrDir === 'unrecognized';
      resolve();
    },
    isFileDirString:function(resolve,reject){
      if(prop(this.itemData.item,{[this.itemData.itemType]:String},(o)=>{
        reject(new TypeError(`${this.itemData.invalidMessage} ${o.message}`));
      })) resolve();
    },
    defineItemName:function(resolve){
      this.itemData.name = this.itemData.item[this.itemData.itemType];
      resolve();
    },
    isFileDirEmpty:function(resolve,reject){
      const condition = this.itemData.name.length;
      if(condition) return resolve();
      reject(new Error(`${this.itemData.invalidMessage} The ["${this.itemData.itemType}"] property is empty, while it should define the ${this.itemData.itemMessage} name.`));
    },
    hasFileDirSlashes:function(resolve,reject){
      const condition = (/[\\\/]/).test(this.itemData.name);
      if(!condition) return resolve();
      reject(new Error(`${this.itemData.invalidMessage} The ["${this.itemData.itemType}"] property should define the ${this.itemData.itemMessage} name rather than ${this.itemData.itemMessage} path. It cannot contain backslashes and forwardslashes.`));
    },
    hasSiblingsOfTheSameName:function(resolve,reject){
      const levelList = this.levelData.reservedNames;
      const isNameDuplicated = levelList.hasOwnProperty(this.itemData.name);
      if(isNameDuplicated&&((this.itemData.file&&levelList[this.itemData.name].folder)||(this.itemData.folder&&levelList[this.itemData.name].file))){
        return reject(new Error(`${this.itemData.invalidMessage} The ${levelList[this.itemData.name].indeces} ${levelList[this.itemData.name].file ? 'file':'folder'} item has already got the same name.`));
      }
      levelList[this.itemData.name] = {indeces:this.itemData.indeces,file:this.itemData.file,folder:this.itemData.folder};
      resolve();
    },
    defineCorrectProperties:function(resolve){
      var content = this.utils.hasAtLeastItems(this.itemData.item,['content'],1);
      var writefrom = this.utils.hasAtLeastItems(this.itemData.item,['writefrom'],1);
      var beforewrite = this.utils.hasAtLeastItems(this.itemData.item,['beforewrite'],1);
      if(content){
        this.itemData.item.contents = this.itemData.item.content;
        delete this.itemData.item.content;
      }
      if(writefrom){
        this.itemData.item.writeFrom = this.itemData.item.writefrom;
        delete this.itemData.item.writefrom;
      }
      if(beforewrite){
        this.itemData.item.beforeWrite = this.itemData.item.beforewrite;
        delete this.itemData.item.beforewrite;
      }
      resolve();
    },
    hasMutualExclusiveProps:function(resolve,reject){
      var condition = this.utils.hasAtLeastItems(this.itemData.item,['move', 'copy', 'merge', 'contents', 'write', 'writeFrom'],2);
      if(!condition) return resolve();
      reject(new Error(`${this.itemData.invalidMessage} The [Object] items cannot contain ["move"], ["copy"], ["merge"], ["contents"], ["write"] or ["writeFrom"] properties at the same time.`));
    },
    defineAction:function(resolve){
      const action = this.utils.whichPropertyDefined(this.itemData.item, ['move', 'copy', 'merge', 'contents', 'write', 'writeFrom'])[0];
      this.itemData.action = type(action,String) ? action:'create';
      resolve();
    },
    isUsedWithWrongFileDir:function(resolve,reject){
      const nonFile = this.utils.orEqual(this.itemData.action,'merge','contents') && this.itemData.file;
      const nonDir = this.utils.orEqual(this.itemData.action,'write','writeFrom') && this.itemData.folder;
      if(!nonFile&&!nonDir) return resolve();
      var msgProp = this.itemData.itemType==='file'?'dir':'file';
      reject(new Error(`${this.itemData.invalidMessage} The ["${this.itemData.action}"] property can be defined only with ["${msgProp}"] property.`));
    },
    isContentsLeadingToJSON:function(resolve,reject){
      const contents = this.itemData.item.contents;
      if(this.itemData.action!=='contents'||!type(contents,String)) return resolve();
      this.utils.jsonExists(contents,(err)=>{
        if(!err) return resolve();
        var msgInfo = `${this.itemData.invalidMessage} Invalid property ["${this.itemData.action}"].`;
        reject(new Error(`${msgInfo} ${err}`));
      });
    },
    hasJsonValidSyntax:function(resolve,reject){
      const contents = this.itemData.item.contents;
      if(this.itemData.action!=='contents'||!type(contents,String)) return resolve();
      this.utils.convertJSON(contents,(err,data)=>{
        if(err) {
          var msgInfo = `${this.itemData.invalidMessage} Invalid property ["${this.itemData.action}"].`;
          return reject(new Error(`${msgInfo} ${err}`));
        } else {
          this.itemData.item.contents = data;
          return resolve();
        }
      });
    },
    hasAddonPropOfCorrectType:function(resolve,reject){
      if(this.itemData.action === 'create') return resolve();
      const isContent = this.itemData.action === 'contents';
      const expected = {};
      expected[this.itemData.action] = isContent ? Array:String;
      if(prop(this.itemData.item, expected, (o)=>{
        reject(new TypeError(`${this.itemData.invalidMessage} ${o.message}`));
      })) resolve();
    },
    isAddonPropEmpty:function(resolve,reject){
      if(this.itemData.action === 'create') return resolve();
      if(this.utils.orEqual(this.itemData.action,'contents','write')) return resolve();
      const condition = this.itemData.item[this.itemData.action].length;
      if(condition) return resolve();
      reject(new Error(`${this.itemData.invalidMessage} The ["${this.itemData.action}"] property is empty, while it should indicate the ${this.itemData.itemMessage}.`));
    },
    isOverwriteOfCorrectType:function(resolve,reject){
      if(!this.utils.hasAtLeastItems(this.itemData.item,['overwrite'],1)){
        this.itemData.overwrite = false;
        return resolve();
      }
      if(prop(this.itemData.item,{overwrite:Boolean},(o)=>{
        reject(new TypeError(`${this.itemData.invalidMessage} ${o.message}`));
      })) {
        this.itemData.overwrite = !!this.itemData.item.overwrite;
        resolve();
      }
    },
    isLeadingToCorrectPath:function(resolve,reject){
      if(this.utils.orEqual(this.itemData.action,'create','contents','write')){
        this.itemData.from = null;
        return resolve();
      }
      const setPath = this.itemData.item[this.itemData.action];
      if(this.itemData.itemType==='unrecognized'){
        this.itemData.from = path.normalize(setPath);
        return resolve();
      }
      this.utils.itemExists(setPath,(o)=>{
        var file = this.itemData.file,
            which = ['folder','file'],
            msgInfo = `${this.itemData.invalidMessage} Invalid property ["${this.itemData.action}"].`,
            msgExist = `The ${which[+file]} of the specified path does not exist or is inaccessible.`,
            msgFileDir = `The path leads to the ${which[+!file]}, while it should indicate the ${which[+file]}.`;
        if(!o.exists) return reject(new Error(`${msgInfo} ${msgExist}`));
        if((!file&&o.file)||(file&&o.dir)) return reject(new Error(`${msgInfo} ${msgFileDir}`));
        this.itemData.from = path.normalize(setPath);
        resolve();
      });
    },
    defineIfAlreadyExists:function(resolve){
      this.itemData.alreadyUnrecognized = this.levelData.siblings.inaccessible.some((x)=>x===this.itemData.name);
      const file = this.levelData.siblings.files.some((x)=>x===this.itemData.name);
      const dir = this.levelData.siblings.dirs.some((x)=>x===this.itemData.name);
      const parentOverwrite = this.itemData.action === 'merge' ? false:this.levelData.parent && this.levelData.parent.overwrite;
      this.itemData.usedToExist = this.itemData.folder ? dir:file;
      this.itemData.alreadyFileExists = parentOverwrite ? false:file;
      this.itemData.alreadyDirExists = parentOverwrite ? false:dir;
      resolve();
    },
    isLeadingToOuterStructure:function(resolve,reject){
      const hasNotAbstractStructure = this.itemData.folder && this.utils.orEqual(this.itemData.action,'move','copy','merge');
      const forbideOverwriteFolder = this.itemData.folder && this.itemData.alreadyDirExists && !this.itemData.overwrite && (this.itemData.action === 'copy' || this.itemData.action === 'move');
      if(!hasNotAbstractStructure || forbideOverwriteFolder) return resolve();

      const config = {
        from:this.itemData.from,
        action:this.itemData.action,
        deep:false,
        overwrite:this.itemData.overwrite,
        utils:this.utils
      };

      this.prepare.generateContent(config,(generatedStructure)=>{
        this.itemData.item.contents = generatedStructure;
        delete this.itemData.item[this.itemData.action];
        resolve();
      },(err)=>{
        reject(new Error(`${this.itemData.invalidMessage} ${err}`));
      });
    },
    isBeforeWriteOfCorrectType:function(resolve,reject){
      if(!this.utils.hasAtLeastItems(this.itemData.item,['beforeWrite'],1)) return resolve();
      if(prop(this.itemData.item,{beforeWrite:Function},(o)=>{
        reject(new TypeError(`${this.itemData.invalidMessage} ${o.message}`));
      })) resolve();
    },
    isBeforeWriteWithCorrectActionProperty:function(resolve,reject){
      if(!this.utils.hasAtLeastItems(this.itemData.item,['beforeWrite'],1)) return resolve();
      if(this.itemData.folder) return reject(new Error(`${this.itemData.invalidMessage} The ["beforeWrite"] property can be defined only with ["file"] property.`));
      if(this.itemData.action === 'create') return reject(new Error(`${this.itemData.invalidMessage} The ["beforeWrite"] property can be defined only with ["copy"], ["move"], ["write"] or ["writeFrom"] property.`));
      this.itemData.beforeWrite = this.itemData.item.beforeWrite;
      resolve();
    },
    defineItemPaths:function(resolve){
      const hasParentPath = this.levelData.parent&&type(this.levelData.parent.relative,String);
      this.itemData.relative = hasParentPath ? path.join(this.levelData.parent.relative,this.itemData.name):this.itemData.name;
      this.itemData.absolute = path.resolve(this.globalData.root,this.itemData.relative);
      this.itemData.root = this.globalData.root;
      resolve();
    },
    defineParentPath:function(resolve){
      this.itemData.parentPath = this.levelData.parent ? this.levelData.parent.absolute:this.globalData.root;
      resolve();
    },
    defineChildrenPaths:function(resolve){
      if(!this.itemData.folder){
        this.itemData.childrenList = null;
        return resolve();
      }
      listContent(this.itemData.absolute,{depth: 1},(o)=>{
        this.itemData.childrenList = o;
        resolve();
      });
    },
    defineAbstractScope:function(resolve){
      this.itemData.abstractScope = {};
      resolve();
    },
    defineTidyUpFolder:function(resolve){
      this.itemData.tidyUp = this.itemData.folder && this.itemData.action==='move';
      resolve();
    }
  }
};

StructureDirs.prototype.preparations = {
  prepareCurrentContentsList:function(resolve){
    this.firstLevelSiblings = {};
    listContent(this.root,{depth: 1},(o)=>{
      this.firstLevelSiblings = o;
      resolve();
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
  },
  generateContent:function(config,resolve,reject){
    run(null,null,[],resolve,reject);
    function run(getPath,newItem,getStructure,resolve,reject){
      const resPath = !getPath ? config.from:getPath;
      const errMsg = `Could not get the access to the '${resPath}' contents.`;
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
            const newItem = {};
            if(config.overwrite!==null) newItem.overwrite = config.overwrite;

            if(!o.dir&&!o.file){
              newItem.unrecognized = getItems[i];
              newItem[config.action] = resolvePath;
              getStructure.push(newItem);
              isFinish();
            }

            if(o.dir){
              newItem.dir = getItems[i];
              getStructure.push(newItem);
              if(config.deep){
                run(resolvePath,newItem,[],isFinish);
              } else {
                if(config.action!==null) newItem[config.action] = resolvePath;
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
          if(++iter===getItems.length){
            done(getStructure);
          }
        }
      }
    }
  },
  prepareDoneObject:function(resolve){
    this.doneObject = {
      error:null,
      files:{
        failure:[],
        success:[],
        warning:[]
      },
      dirs:{
        failure:[],
        success:[],
        warning:[]
      },
      unrecognized:{
        failure:[]
      },
      root:this.root
    };
    resolve();
  }
};

StructureDirs.prototype.appenders = {
  initActions:function(resolve){
    run.call(this,{
      abstractScope:this.abstractStructure,
      parent:null,
      onDone:resolve
    });

    function run(o){
      var iterator = 0;

      if(!Object.keys(o.abstractScope).length) return increase.call(this);
      for(let item in o.abstractScope){
        const itemList = o.abstractScope[item];
        const multiple = itemList.length>1;
        if(multiple){
          const functionList = [];
          const doubledData = {
            //alreadyExist
          };
          for(let itemData of itemList){
            functionList.push(function(resolve){
              const nextRun = run.bind(this,{
                abstractScope:itemData.abstractScope,
                parent:itemData,
                onDone:increase.bind(this)
              });
              const nextAction = itemData.tidyUp ? nextRun:resolve;
              this.appenders.createItem.call(this,itemData,nextAction);
            });
          }
          moveOn(functionList,this,increase.bind(this),()=>{});
        }

        if(!multiple){
          const itemData = itemList[0];
          const nextRun = run.bind(this,{
            abstractScope:itemData.abstractScope,
            parent:itemData,
            onDone:increase.bind(this)
          });
          const nextAction = itemData.tidyUp ? nextRun:increase.bind(this);
          this.appenders.createItem.call(this,itemData,nextAction);
        }

      }
      function increase(){
        if(++iterator>=Object.keys(o.abstractScope).length){
          if(o.parent) this.appenders.tidyUpFolder.call(this,o.parent,o.onDone);
          if(!o.parent) o.onDone();
        }
      }
    }
  },
  tidyUpFolder:function(itemData,resolve){
    const functionList = [
      checkActionSuccess,
      removeMovedFolder,
      checkIfChildrenFailed,
      computeFolderSummaryMessage
    ];

    const userContext = {
      itemData:itemData,
      each:this.each,
      doneObject:this.doneObject,
      response:this.response,
      utils:this.utils,
      messages:this.response.messages,
      computeMessage:this.response.computeMessage
    };

    moveOn(functionList,userContext,resolve,function(){
      this.response.onEach.call(this);
      return resolve();
    });

      function checkActionSuccess(resolve,reject){
        type(this.itemData.result.warning,null)&&type(this.itemData.result.failure,null) ? resolve():reject();
      }

      function removeMovedFolder(resolve,reject){
        if(this.itemData.action!=='move') return resolve();
        const addMsg = '. The folder was successfully copied to the target location, but could not be removed from its origin location.';
        emptyFolder(this.itemData.from,true,(o)=>{
          if(!o.error) return resolve();
          if(o.error){
            this.computeMessage('failure',false,addMsg);
            reject();
          };
        });
      }

      function checkIfChildrenFailed(resolve){
        const countResult = {};
        const siblings = this.itemData.abstractScope;
        for(var doubled in siblings){
          for(var singleItem of siblings[doubled]){
            for(var x in singleItem.result){
              countResult[x] = singleItem.result[x]!==null ? true:countResult[x] ? countResult[x]:false;
            }
          }
        }

        this.itemData.childResults = countResult;
        resolve();
      }

      function computeFolderSummaryMessage(resolve){

        switch(true){
          case (this.itemData.childResults.failure):
            this.computeMessage('warning',true,', but at least one of its child items failed.');
            break;
          case (this.itemData.childResults.warning):
            this.computeMessage('warning',true,', but at least one of its child items gave warning.');
            break;
          default:
            this.computeMessage('success',true);
            break;
        }
        this.response.onEach.call(this);
        resolve();
      }
  },
  createItem:function(itemData,done){
    const ap = this.appenders.methods;

    const fileList = [
      ap.abortIfDirExists,
      ap.abortIfPathInaccessible,
      ap.abortIfTheSamePaths,
      ap.abortIfFileOverwrite,
      ap.readContent,
      ap.modifyContent,
      ap.writeFile,
      ap.removeFile
    ];

    const dirList = [
      ap.abortIfFileExists,
      ap.abortIfPathInaccessible,
      ap.abortIfTheSamePaths,
      ap.abortIfDirOverwrite,
      ap.createFolder,
      ap.emptyContent
    ];

    const unrecognizedList = [
      ap.handleUnrecognized
    ];

    itemData.result = {
      success:null,
      failure:null,
      warning:null
    };
    
    const userContext = {
      itemData:itemData,
      doneObject:this.doneObject,
      each:this.each,
      response:this.response,
      utils:this.utils,
      messages:this.response.messages,
      computeMessage:this.response.computeMessage,
      methods:ap
    };

    if(itemData.file) moveOn(fileList,userContext,onFileDone,onFileDone);
    if(itemData.folder) moveOn(dirList,userContext,onDirDone,onDirDone);
    if(itemData.unrecognized) moveOn(unrecognizedList,userContext,onUnrecognizeDone,onUnrecognizeDone);

      function onFileDone(){
        this.response.onEach.call(this);
        done();
      }

      function onDirDone(){
        if(this.itemData.action==='move') return done();
        if(Object.keys(this.itemData.abstractScope).length) return done();
        this.response.onEach.call(this);
        done();
      }

      function onUnrecognizeDone(){
        this.response.onEach.call(this);
        done();
      }
  },
  methods:{
    abortIfDirExists:function(resolve,reject){
      if((this.itemData.alreadyDirExists)){
        this.computeMessage('failure',false,', because the folder of the same name already exists in this path.');
        return reject();
      }
      resolve();
    },
    abortIfPathInaccessible:function(resolve,reject){
      if(this.itemData.alreadyUnrecognized){
        this.computeMessage('failure',false,`, because the "${this.itemData.absolute}" path is inaccessible.`);
        return reject();
      }
      resolve();
    },
    abortIfTheSamePaths:function(resolve,reject){
      if(type(this.itemData.from,null)) return resolve();
      if(!path.relative(this.itemData.absolute,this.itemData.from).length){
        this.computeMessage('failure',false,`, because both given paths are equal.`);
        return reject();
      }
      resolve();
    },
    abortIfFileOverwrite:function(resolve,reject){
      if(this.itemData.alreadyFileExists&&!this.itemData.overwrite&&this.itemData.action!=='writeFrom'&&this.itemData.action!=='write'){
        this.computeMessage('warning',false,', due to the "overwrite" property settings.',true);
        return reject();
      }
      resolve();
    },
    readContent:function(resolve,reject){
       if(type(this.itemData.from,String)){
        fs.readFile(this.itemData.from,(err,data)=>{
          if(err){
            this.computeMessage('failure',false,`. Could not read the content of the '${this.itemData.from}' file.`);
            return reject();
          }
          if(!err){
            this.itemData.content = data;
            return resolve();
          }
        });
      } else if(this.itemData.action==='write'){
        this.itemData.content = this.itemData.item.write;
        return resolve();
      } else resolve();
    },
    modifyContent:function(resolve,reject){
      if(!this.itemData.beforeWrite) return resolve();
      if(type(this.itemData.content,Buffer)) this.itemData.content = this.itemData.content.toString('utf8');
      var callbackIter = 0;

      this.itemData.beforeWrite(this.itemData.content,onResolve.bind(this),onReject.bind(this));

        function onResolve(data){
          if(++callbackIter>1) return;
          if(args(arguments,[[Buffer,String]],(o)=>{
            callbackIter++;
            this.computeMessage('failure',false,`. Could not read the ${this.itemData.from? `modified data of the '${this.itemData.from}' file`:'given modified data'}. The [${o.expected}] type of data is expected, while the [${o.actual}] data has been passed.`);
            return reject();
          })){
            this.itemData.content = data;
            this.itemData.modified = true;
            resolve();
          }
        }

        function onReject(getErr){
          if(++callbackIter>1) return;
          this.computeMessage('failure',false,`.${type(getErr,String) ? ' '+getErr:''}`);
          return reject();
        }
    },
    writeFile:function(resolve,reject){
      var nonExist = !this.itemData.alreadyFileExists;
      var overwrite = this.itemData.alreadyFileExists&&this.itemData.overwrite;
      var append = this.itemData.alreadyFileExists&&!this.itemData.overwrite;
      const setMethod = append ? 'appendFile':(nonExist||overwrite) ? 'writeFile':null;
      if(!setMethod) return resolve();
      const stringifyContent = this.itemData.content || '';
      fs[setMethod](this.itemData.absolute,stringifyContent,(err)=>{
        if(!err) return resolve();
        this.computeMessage('failure',false);
        return reject();
      });
    },
    removeFile:function(resolve,reject){
      if(this.itemData.action!=='move'){
        this.computeMessage('success',true);
        return resolve();
      }
      fs.unlink(this.itemData.from,(err)=>{
        if(err){
          this.computeMessage('failure',false,'. The file was successfully copied to the target location, but could not be removed from its origin location.');
          return reject();
        }
        if(!err){
          this.computeMessage('success',true);
          resolve();
        }
      });
    },
    abortIfFileExists:function(resolve,reject){
      if((this.itemData.folder&&this.itemData.alreadyFileExists)){
        this.computeMessage('failure',false,', because the file of the same name already exists in this path.');
        return reject();
      }
      resolve();
    },
    abortIfDirOverwrite:function(resolve,reject){
      if(this.itemData.alreadyDirExists&&!this.itemData.overwrite&&this.itemData.action!=='merge'){
        this.computeMessage('warning',false,', due to the "overwrite" property settings.',true);
        return reject();
      }
      resolve();
    },
    createFolder:function(resolve,reject){
      if(this.itemData.alreadyDirExists) return resolve();
      fs.mkdir(this.itemData.absolute,(err)=>{
        if(err){
          listContent(this.itemData.parentPath,{depth:1},(o)=>{
            if(o.dirs.some((d)=>d===this.itemData.name)){
              this.itemData.alreadyDirExists = true;
              this.methods.abortIfDirOverwrite.call(this,resolve,reject);
            } else {
              this.computeMessage('failure',false);
              return reject();
            }
          });
        }
        if(!err){
          if(!this.itemData.tidyUp) this.computeMessage('success',true);
          return resolve();
        }
      });
    },
    emptyContent:function(resolve,reject){
      if(this.itemData.alreadyDirExists && this.itemData.overwrite && this.itemData.action!=='merge'){
        emptyFolder(this.itemData.absolute,false,(o)=>{
          if(o.error){
            this.computeMessage('failure',false);
            return reject();
          }
          if(!o.error){
            if(!this.itemData.tidyUp) this.computeMessage('success',true);
            return resolve();
          }
        });
      } else {
        if(!this.itemData.tidyUp) this.computeMessage('success',true);
        return resolve();
      }
    },
    handleUnrecognized:function(resolve){
      this.computeMessage('failure',false);
      return resolve();
    }
  }
};

StructureDirs.prototype.response = {
  onDone:function(){
    this.done(this.doneObject);
  },
  onDoneError:function(context,err){
    this.doneObject.error = err;
    this.done(this.doneObject);
  },
  passDonePath: function(){
    const type = this.itemData.result.success!==null ? 'success':this.itemData.result.warning!==null ? 'warning':'failure';
    const defineProperty = this.itemData.file ? 'files':this.itemData.folder ? 'dirs':'unrecognized';
    this.doneObject[defineProperty][type].push(this.itemData.absolute);
  },
  onEach:function(){
    this.response.passDonePath.call(this);
    if(!this.each) return;
    const eachObject = {
      failure:this.itemData.result.failure,
      warning:this.itemData.result.warning,
      success:this.itemData.result.success,
      item:this.itemData.itemType,
      from:this.itemData.from,
      action:this.itemData.action,
      modified:!!this.itemData.modified,
      overwritten:!!this.itemData.overwritten,
      root:this.itemData.root,
      relative:this.itemData.relative,
      absolute:this.itemData.absolute
    };
    this.each(eachObject);
  },
  messages:{
    fileNonExist:function(success){
      const message = {
        create:`created`,
        copy:`copied${this.itemData.beforeWrite?' with modified content ':' '}from the "${this.itemData.from}" path`,
        move:`moved${this.itemData.beforeWrite?' with modified content ':' '}from the "${this.itemData.from}" path`,
        write:`created with the given${this.itemData.beforeWrite?' modified ':' '}content`,
        writeFrom:`created with the${this.itemData.beforeWrite?' modified ':' '}content from the "${this.itemData.from}" file`
      };
      return `The file "${this.itemData.relative}" ${success?'was successfully':'could not be'} ${message[this.itemData.action]}`;
    },
    fileOverwrite:function(success){
      const actionMsg = type(this.itemData.content,String) ?
        `The content of "${this.itemData.relative}" file`:
        `The already existing file "${this.itemData.relative}"`;
      const message = {
        create:`by the newly created file`,
        copy:`by the file copied${this.itemData.beforeWrite?' with modified content ':' '}from the "${this.itemData.from}" path`,
        move:`by the file moved${this.itemData.beforeWrite?' with modified content ':' '}from the "${this.itemData.from}" path`,
        write:`with the given${this.itemData.beforeWrite?' modified ':' '}content`,
        writeFrom:`with the${this.itemData.beforeWrite?' modified ':' '}content from the "${this.itemData.from}" file`
      };
      return `${actionMsg} ${success?'was successfully':'could not be'} overwritten ${message[this.itemData.action]}`;
    },
    fileAppend:function(success){
      const message = {
        write:`The given${this.itemData.beforeWrite?' modified ':' '}content`,
        writeFrom:`The${this.itemData.beforeWrite?' modified ':' '}content from the "${this.itemData.from}" file`
      };
      return `${message[this.itemData.action]} ${success?'was successfully':'could not be'} appended to the "${this.itemData.relative}" file`;
    },
    dirNonExist:function(success){
      const message = {
        create:'created',
        contents:'created with its contents',
        copy:`copied from the "${this.itemData.from}" path`,
        move:`moved from the "${this.itemData.from}" path`,
        merge:`merged with the "${this.itemData.from}" folder`
      };
      return `The folder "${this.itemData.relative}" ${success?'was successfully':'could not be'} ${message[this.itemData.action]}`;
    },
    dirOverwrite:function(success){
      const message = {
        create:'overwritten by the newly created folder',
        contents:'overwritten by the newly created folder and its contents',
        copy:`overwritten by the folder copied from the "${this.itemData.from}" path`,
        move:`overwritten by the folder moved from the "${this.itemData.from}" path`,
        merge:`merged with the "${this.itemData.from}" folder`
      };
      return `The already existing folder "${this.itemData.relative}" ${success?'was successfully':'could not be'} ${message[this.itemData.action]}`;
    },
    unrecognized:function(){
      const message = {
        copy:`copied into the "${this.itemData.relative}" path`,
        move:`moved into the "${this.itemData.relative}" path`,
        merge:`merged with the "${this.itemData.relative}"`
      };
      return `The item of the path "${this.itemData.from}" is inaccessible and could not be ${message[this.itemData.action]}`;
    }
  },
  computeMessage:function(type,isSuccess,additional,doubled){
    additional = additional ? additional:'.';
    var msg;
    if(this.itemData.file){
      switch(true){
        case (this.itemData.alreadyFileExists&&!this.itemData.overwrite&&(this.itemData.action==='write'||this.itemData.action==='writeFrom')):
          msg = 'fileAppend';
          break;
        case (doubled||this.itemData.alreadyFileExists||this.itemData.usedToExist):
          if(isSuccess) this.itemData.overwritten = true;
          msg = 'fileOverwrite';
          break;
        case (!this.itemData.alreadyFileExists):
          msg = 'fileNonExist';
          break;
      }
    }
    if(this.itemData.folder){
      switch(true){
        case (this.itemData.usedToExist||doubled||this.itemData.alreadyDirExists):
          if(isSuccess&&this.itemData.action!=='merge') this.itemData.overwritten = true;
          msg = 'dirOverwrite';
          break;
        case (!this.itemData.alreadyDirExists):
          msg = 'dirNonExist';
          break;
      }
    }
    if(this.itemData.unrecognized){
      msg = 'unrecognized';
    }
    if(msg) this.itemData.result[type] = this.messages[msg].call(this,isSuccess)+additional;
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
      if(!o.exists) return callback('The file of the specified path does not exist or is inaccessible.');
      var jsonExt = !(/^\.json$/i).test(path.extname(getPath));
      if(o.exists&&o.file&&jsonExt) return callback('The path should indicate the JSON file.');
      if(o.exists&&!o.file&&o.dir) return callback('The path leads to the folder, while it should indicate the JSON file.');
      if(o.exists&&o.file) callback(null);   
    });
  },
  folderExists:function(getPath,callback){
    this.itemExists(getPath,(o)=>{
      if(!o.exists) return callback(new Error(`The given path '${getPath}' does not exist or is inaccessible.`));
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
      fs.mkdir(elemPath,(err)=>{
        if(err){
          utils.itemExists(elemPath,(o)=>{
            if(o.exists&&o.dir) return next();
            if(o.exists&&o.file) return reject(new Error(`Could not create the folder in the path '${getPath}', because the file of the same name already exists in this path.`));
            return reject(new Error(`Could not create the folder in the path '${getPath}'. The access was denied.`));
          });
        }
        if(!err) next();
      });

      function next(){
        mkIter++;
        if(mkIter<pathList.length) createNext(pathList[mkIter],eachDone);
        if(mkIter>=pathList.length) eachDone();
      }
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
      prepare:this.preparations,
      structure:[]
    };

    moveOn(funList, userContext, onDone, onReject);

    function onDone(){
      callback(null,this.structure);
    }

    function onReject(c,err){
      callback(err,this.structure);
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
  compare:function(model,compared,a,b){
    const types = type(b,Function) ? [String,String,Object,Function]:type(a,Function) ? [String,String,Function]:type(a,Object) ? [String,String,Object,Function]:[String,String,[Object,Function],[Function,undefined]];
    args(arguments,types,(o)=>{
      throw new TypeError(`${warn(moduleName+'.compare')}: ${o.message}`);
    });

    const config = type(a,Object) ? a:{};
    const callback = type(a,Function) ? a:b;
    const depth = config.depth;
    const exclude = config.exclude;
    
    const funList = [
      isModelValid,
      isComparedValid,
      getModelContents,
      getComparedContents,
      addInnaccessiblePaths,
      compareContents
    ];

    const userContext = {
      modelPath:model,
      comparedPath:compared,
      utils:this.utils,
      compareObject:{
        model:{},
        compared:{}
      },
      returnObject:{
        model:model,
        compared:compared,
        dirs:{missing:[],existing:[],extraneous:[]},
        files:{missing:[],existing:[],extraneous:[]},
        inaccessible:[]
      }
    };

    moveOn(funList,userContext,onDone,onReject);

    function onDone(){
      callback(null,this.returnObject);
    }

    function onReject(c,err){
      callback(err,this.returnObject);
    }

    function isModelValid(resolve,reject){
      this.utils.folderExists(this.modelPath,(err)=>{
        if(err) return reject(err);
        this.returnObject.model = path.resolve(this.modelPath);
        resolve();
      });
    }

    function isComparedValid(resolve,reject){
      this.utils.folderExists(this.comparedPath,(err)=>{
        if(err) return reject(err);
        this.returnObject.compared = path.resolve(this.comparedPath);
        resolve();
      });
    }

    function getModelContents(resolve,reject){
      listContent(this.modelPath,{depth:depth,exclude:exclude},(o)=>{
        if(o.error) return reject(new Error(`Could not get the access to the given folder '${this.modelPath}'.`));
        this.compareObject.model = {path:o.path,dirs:o.dirs,files:o.files,inaccessible:o.inaccessible};
        resolve();
      });
    }

    function getComparedContents(resolve,reject){
      listContent(this.comparedPath,{depth:depth,exclude:exclude},(o)=>{
        if(o.error) return reject(new Error(`Could not get the access to the given folder '${this.comparedPath}'.`));
        this.compareObject.compared = {path:o.path,dirs:o.dirs,files:o.files,inaccessible:o.inaccessible};
        resolve();
      });
    }

    function addInnaccessiblePaths(resolve){
      for(var pth of this.compareObject.model.inaccessible){
        this.returnObject.inaccessible.push(path.resolve(this.modelPath,pth));
      }
      for(var pth of this.compareObject.compared.inaccessible){
        this.returnObject.inaccessible.push(path.resolve(this.comparedPath,pth));
      }
      resolve();
    }

    function compareContents(resolve){
      const c = this.compareObject;
      const r = this.returnObject;
      compare(c.model.dirs,c.compared.dirs,r.dirs);
      compare(c.model.files,c.compared.files,r.files);
      resolve();

      function compare(model,compared,result){
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
  },
  ensureDir:function(path,callback){
    args(arguments,[String,Function],(o)=>{
      throw new TypeError(`${warn(moduleName+'.ensureDir')}: ${o.message}`);
    });
    this.utils.createDirs(path,callback.bind(null,null),callback);
  }
};