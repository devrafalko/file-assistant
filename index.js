/* global Promise, __dirname, Function */
const fs = require('fs-extra');
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
  this.init = initStructure.bind(this.constructor);
          
  function initStructure(){
    const valid = this.prototype.validation;
    const prepare = this.prototype.preparations;
    const response = this.prototype.response;
    const appenders = this.prototype.appenders;
    const utils = this.prototype.utils;
    const validation = [
      valid.isDoneFunction,
      valid.validArgs,
      valid.validStructure,
      valid.createRootFolder,
      prepare.prepareStructureRelativePaths,
      prepare.sortStructureItems,
      prepare.prepareCurrentContentsList,
      prepare.ifAlreadyExists,
      appenders.addContents
    ];
    const userContext = {
      args:arguments,
      root:arguments[0],
      structure:arguments[1],
      done:arguments[2],
      each:arguments[3],
      response:response,
      appenders:appenders,
      utils:utils
    };
    
    moveOn(validation,userContext,response.onDone,response.onDoneError);

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
      var err = args(this.args,[String,Array,Function,[Function,undefined]],(o)=>{
        reject(new TypeError(`${o.message}`));
      });
      if(err) resolve();
  },
  validStructure: function(resolve,reject) {
    const validateList = [
      isItemObject,
      isFileOrDirDefined,
      isBothFileAndDirDefined,
      isFileDirString,
      isFileDirEmpty,
      hasFileDirSlashes,
      hasMutualExclusiveProps,
      isUsedWithWrongFileDir,
      hasAddonPropOfCorrectType,
      isAddonPropEmpty,
      isLeadingToCorrectPath,
      isOverwriteOfCorrectType,
      addItemData
    ];
    this.structureData = {};
    this.itemData = [];
    iterator.call(this,this.structure,0,[],()=>{
      delete this.structureData;
      resolve();
    });
    
      function iterator(list,index,parentIndex,whenDone){
        const isNext = index<list.length;
        if(!isNext) whenDone();
        if(isNext){
          this.structureData.item = list[index];
          this.structureData.index = index;
          this.structureData.parentIndices = parentIndex;
          moveOn(validateList,this,
            function(){
              const binded = iterator.bind(this,list,index+1,parentIndex,whenDone);
              const isItemObj = type(list[index],Object);
              const hasContent = type(list[index].content,Array);
              if(isItemObj&&hasContent){
                const newParent = parentIndex.slice();
                newParent.push(index);
                iterator.call(this,list[index].content,0,newParent,binded);
              }
              if(!(isItemObj&&hasContent)) binded();
            },
            function(context,err){
              reject(err);
            });
        }
      }

      function isItemObject(resolve,reject){
        const cond = type(this.structureData.item,Object);
        if(cond) resolve();
        if(!cond) reject(new TypeError(`Invalid structure argument ${this.utils.indexPath.call(this)}. Each item of [Array] structure argument must be of [Object] type.`));
      }

      function isFileOrDirDefined(resolve,reject){
        const cond = this.utils.hasAtLeastItems(this.structureData.item,['file','dir'],1);
        if(cond) resolve();
        if(!cond) reject(new Error(`Invalid structure argument ${this.utils.indexPath.call(this)}. Each item of [Array] structure argument must contain either ['file'] or ['dir'] property.`));
      }

      function isBothFileAndDirDefined(resolve,reject){
        const cond = this.utils.hasAtLeastItems(this.structureData.item,['file','dir'],2);
        if(!cond) resolve();
        if(cond) reject(new Error(`Invalid structure argument ${this.utils.indexPath.call(this)}. Each item of [Array] structure argument must contain either ['file'] or ['dir'] property.`));
      }

      function isFileDirString(resolve,reject){
        this.structureData.fileDir = this.utils.whichPropertyDefined(this.structureData.item,['file','dir'])[0];
        if(prop(this.structureData.item,{[this.structureData.fileDir]:String},(o)=>{
          reject(new TypeError(`Invalid structure argument ${this.utils.indexPath.call(this)}. ${o.message}`));
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
          reject(new Error(`Invalid structure argument ${this.utils.indexPath.call(this)}. The ["${this.structureData.fileDir}"] property is empty, while it should define the ${msgProp} name.`));
        }
      }

      function hasFileDirSlashes(resolve,reject){
        const cond = (/[\\\/]/).test(this.structureData.item[this.structureData.fileDir]);
        if(!cond) resolve();
        if(cond){
          const msgProp = this.structureData.fileDir==='file'?'file':'folder';
          reject(new Error(`Invalid structure argument ${this.utils.indexPath.call(this)}. The ["${this.structureData.fileDir}"] property should define the ${msgProp} name rather than ${msgProp} path. It cannot contain backslashes and forwardslashes.`));
        }
      }

      function hasMutualExclusiveProps(resolve,reject){
        var cond = this.utils.hasAtLeastItems(this.structureData.item,['move', 'copy', 'merge', 'content', 'data'],2);
        if(!cond) resolve();
        if(cond) reject(new Error(`Invalid structure argument ${this.utils.indexPath.call(this)}. The [Object] items cannot contain ["move"], ["copy"], ["merge"], ["content"] or ["data"] properties at the same time.`));
      }

      function isUsedWithWrongFileDir(resolve,reject){
        this.structureData.addonProperty = this.utils.whichPropertyDefined(this.structureData.item, ['move', 'copy', 'merge', 'content', 'data'])[0];
        const a = this.structureData.addonProperty === 'merge' && this.structureData.fileDir === 'file';
        const b = this.structureData.addonProperty === 'data' && this.structureData.fileDir === 'dir';
        if(!(a||b)) resolve();
        if(a||b){
          var msgProp = this.structureData.fileDir==='file'?'dir':'file';
          reject(new Error(`Invalid structure argument ${this.utils.indexPath.call(this)}. The ["${this.structureData.addonProperty}"] property can be defined only with ["${msgProp}"] property.`));
        }
      }

      function hasAddonPropOfCorrectType(resolve,reject){
        if(!type(this.structureData.addonProperty,String)) return resolve();
        const isContent = this.structureData.addonProperty === 'content';
        const isDir = this.structureData.fileDir === 'dir';
        const setType = isContent && isDir ? Array:String;
        const expected = {};
        expected[this.structureData.addonProperty] = setType;
        if(prop(this.structureData.item,expected,(o)=>{
          reject(new TypeError(`Invalid structure argument ${this.utils.indexPath.call(this)}. ${o.message}`));
        })) {
          this.structureData.content = isContent && !isDir ? this.structureData.item.content:null;
          resolve();
        }
      }

      function isAddonPropEmpty(resolve,reject){
        if(!type(this.structureData.addonProperty,String)) return resolve();
        if(this.structureData.addonProperty === 'content') return resolve();
        const cond = this.structureData.item[this.structureData.addonProperty].length;
        if(cond) resolve();
        if(!cond){
          var msgProp = this.structureData.fileDir === 'file' ? 'file':'folder';
          reject(new Error(`Invalid structure argument ${this.utils.indexPath.call(this)}. The ["${this.structureData.addonProperty}"] property is empty, while it should indicate the ${msgProp}.`));
        }
      }

      function isLeadingToCorrectPath(resolve,reject){
        if(!type(this.structureData.addonProperty,String)) return resolve();
        if(this.structureData.addonProperty === 'content') return resolve();
        const setPath = path.resolve(__dirname,this.structureData.item[this.structureData.addonProperty]);
        fs.stat(setPath,(err,stats)=>{
          var exists = type(err,null),
              isFile = type(stats,'Stats')&&stats.isFile(),
              isDir = type(stats,'Stats')&&stats.isDirectory(),
              file = this.structureData.fileDir==='file',
              which = ['folder','file'],
              msgInfo = `Invalid structure argument ${this.utils.indexPath.call(this)}. Invalid property ["${this.structureData.addonProperty}"].`;
              msgExist = `The ${which[+file]} of the specified path does not exist.`;
              msgFileDir = `The path leads to the ${which[+!file]}, while it should indicate the ${which[+file]}.`;
          if(!exists) return reject(new Error(`${msgInfo} ${msgExist}`));
          if((!file&&isFile)||(file&&isDir)) return reject(new Error(`${msgInfo} ${msgFileDir}`));
          this.structureData.from = setPath;
          resolve();
        });
      }

      function isOverwriteOfCorrectType(resolve,reject){
        const hasOverwrite = this.utils.hasAtLeastItems(this.structureData.item,['overwrite'],1);
        if(!hasOverwrite) return resolve();
        if(prop(this.structureData.item,{overwrite:Boolean},(o)=>{
          reject(new TypeError(`Invalid structure argument ${this.utils.indexPath.call(this)}. ${o.message}`));
        })) {
          this.structureData.overwrite = this.structureData.item.overwrite;
          resolve();
        }
      }

      function addItemData(resolve,reject){
        const newItem = {
          folder:this.structureData.fileDir==='dir',
          file:this.structureData.fileDir==='file',
          name:this.structureData.name,
          path:getParentPath.call(this),
          overwrite:!!this.structureData.overwrite,
          action:this.structureData.addonProperty,
          from:this.structureData.from,
          content:this.structureData.content
        };
        this.itemData.push(newItem);
        resolve();
        
          function getParentPath(){
            const p = this.structureData.parentIndices;
            var chainItems = this.structure;
            var chainPath = [];
            for(var i in p){
              chainPath.push(chainItems[p[i]].dir);
              chainItems = chainItems[p[i]].content;
            }
            return chainPath;
          }
      }

  },
  createRootFolder: function(resolve,reject){
      const root = path.resolve(this.root);
      this.rootAbsolute = root;
      fs.stat(root,(err,stats)=>{
        var exists = type(err,null);
        var isFile = type(stats,'Stats')&&stats.isFile();
        if(exists&&isFile) return reject(new Error(`The file of the same name already exists in the path '${root}'. The access was denied.`));
        if(!exists){
          fs.ensureDir(root,(err)=>{
            if(err) reject(new Error(`Could not create the root folder in the path ${root}.`));
            if(!err) resolve();
          });
        } else {
          resolve();
        }
      });
  }
};


StructureDirs.prototype.preparations = {
  prepareStructureRelativePaths:function(resolve){
    for(var i in this.itemData){
      var pathElements = this.itemData[i].path.slice();
      pathElements.push(this.itemData[i].name);
      this.itemData[i].relative = path.join.apply(null,pathElements);
    }
    resolve();
  },
  sortStructureItems:function(resolve,reject){
    this.itemData = sort(this.itemData,'folder','file','relative');
    resolve();
      function sort(list,a,b,c){
        return list.sort((x,y)=>{
          if(x[a]&&y[a]||x[b]&&y[b]){
            return x[c].length-y[c].length;
          } else{
            return x[a]&&y[b] ? -1:1;
          }
        });
      }
  },
  prepareCurrentContentsList:function(resolve,reject){
    this.currentPaths = {};
    listContent(this.rootAbsolute,(o)=>{
      if(o.error){
        return reject(new Error(`Could not get the access to the contents of the given directory path ${this.root}`));
      } else {
        this.currentPaths.files = o.files.sort((a,b)=>a.length-b.length);
        this.currentPaths.dirs = o.dirs.sort((a,b)=>a.length-b.length);
        resolve();
      }
    });
  },
  ifAlreadyExists: function(resolve,reject){
    for(var i in this.itemData){
      this.itemData[i].alreadyHasFile = this.currentPaths.files.some((x)=>x===this.itemData[i].relative);
      this.itemData[i].alreadyHasDir = this.currentPaths.dirs.some((x)=>x===this.itemData[i].relative);
    }
    resolve();
  }
};


StructureDirs.prototype.appenders = {
  addContents:function(resolve,reject){
    for(var i in this.itemData){
      if(this.itemData[i].file) continue;
    }
    resolve();
  }
};


StructureDirs.prototype.response = {
  onDone:function(context,reject){
    this.done({error:null});
  },
  onDoneError:function(context,err){
    this.done({error:err});
  }
};


StructureDirs.prototype.utils = {
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
    const name = 'utils.hasAtLeastItems';
    args(arguments,[[Object,Array],[Array],Number],(o)=>{
      throw new TypeError(`${warn(name)} ${o.message}`);
    });
    var actual = type(a,Object) ? Object.getOwnPropertyNames(a):a,
        iter = 0;
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
    const name = 'utils.whichPropertyDefined';
    args(arguments,[[Object,Array],[Array]],(o)=>{
      throw new TypeError(`${warn(name)} ${o.message}`);
    });
    const actual = type(a,Object) ? Object.getOwnPropertyNames(a):a;
    const result = expected.filter((o)=>actual.some((a)=>a===o));
    return type(result,Array) ? result:null;
  }
};