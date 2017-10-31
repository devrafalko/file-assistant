/* global Promise, __dirname, Function, module */
const fs = require('fs-extra');
const path = require('path');
const data = require('./structures.json');
const paths = require('./paths.js');
const type = require('of-type');
const args = require('typeof-arguments');

module.exports = {
  remove:function(done){
    return this.utils.remove(done);
  },
  resetFrom:function(done){
    return this.utils.reset('from',done);
  },
  resetTo:function(done){
    return this.utils.reset('to',done);
  },
  emptyFrom:function(done){
    return this.utils.emptyDirs('from',done);
  },
  emptyTo:function(done){
    return this.utils.emptyDirs('to',done);
  },
  addFrom:function(item,done){
    args(arguments,[String]);
    return this.utils.add(item,'from',done);
  },
  addTo:function(item,done){
    args(arguments,[String]);
    return this.utils.add(item,'to',done);
  },
  addFile:function(item,done){
    args(arguments,[String]);
    return this.utils.add(item,'file',done);
  },
  addDir:function(item,done){
    args(arguments,[String]);
    return this.utils.add(item,'dir',done);
  },
  writeJSON:function(item,obj,done){
    args(arguments,[String,[Object,Array,String,Number]]);
    return this.utils.writeJson(item,obj,done);
  },
  writeFile:function(item,data,done){
    args(arguments,[String,String]);
    return this.utils.writeFile(item,data,done);
  },
  utils:{
    remove:function(done){
      return new Promise((resolve,reject)=>{
        const re = this.response(done,resolve,reject);
        fs.remove(paths.rootDir,(err)=>{
          if(err) re.ject(new Error("Could not remove the testing directory."));
          if(!err) re.solve(null);
        });
      });
    },
    reset:function(getDir,done){
      return new Promise((resolve,reject)=>{
        const re = this.response(done,resolve,reject);
        this.emptyDirs(getDir)
        .then(()=>this.addTemplates(getDir))
        .then(()=>re.solve(null))
        .catch((err)=>re.ject(new Error(err)));
      });
    },
    add:function(item,getDir,done){
      return new Promise((resolve,reject)=>{
        const re = this.response(done,resolve,reject);
        if(getDir==='file'){
          fs.ensureFile(path.join(paths.rootDir,item),(err)=>{
            if(err) re.ject(new Error(`Could not add '${item}' file.`));
            if(!err) re.solve(null);
          });
          return;
        }
        if(getDir==='dir'){
          fs.ensureDir(path.join(paths.rootDir,item),(err)=>{
            if(err) re.ject(new Error(`Could not add '${item}' folder.`));
            if(!err) re.solve(null);
          });
          return;
        }
        
        var dir = paths[getDir+'Dir'];
        var p = data[item];
        if(!p) {
          re.ject(new Error(`Could not find '${item}' on the list of templates.`));
          return;
        }
        if(p.type==='dir'){
          fs.ensureDir(path.join(dir,p.path))
          .then(()=>{
            re.solve(null);
            return;
          })
          .catch(()=>{
            var err = new Error(`Could not add '${p.name}' ${p.type}.`);
            re.ject(err); 
            return;
          });
          } else if(p.type==='file'){
            var content = p.content&&typeof p.content === 'string' ? p.content:"";
            var newPath = path.join(dir,p.path);
            fs.ensureFile(newPath)
            .then(()=>fs.writeFile(newPath,content))
            .then(()=>{
              re.solve(null);
            })
            .catch(()=>{
              var err = new Error(`Could not add '${p.name}' ${p.type}.`);
              re.ject(err);
            });
            }
      });
    },
    writeJson:function(item,obj,done){
      return new Promise((resolve,reject)=>{
        const re = this.response(done,resolve,reject);
        const pth = path.resolve(paths.rootDir,item);
        fs.ensureFile(pth,(err)=>{
          if(err) re.ject(new Error(`Could not write '${item}' file.`));
          if(!err){
            fs.writeJson(pth,obj,{spaces:2},(err)=>{
              if(err) re.ject(new Error(`Could not write '${item}' file.`));
              if(!err) re.solve(null);
            });
          }
        });
      });
    },
    writeFile:function(item,data,done){
      return new Promise((resolve,reject)=>{
        const re = this.response(done,resolve,reject);
        const pth = path.resolve(paths.rootDir,item);
        fs.ensureFile(pth,(err)=>{
          if(err) re.ject(new Error(`Could not write '${item}' file.`));
          if(!err){
            fs.writeFile(pth,data,(err)=>{
              if(err) re.ject(new Error(`Could not write '${item}' file.`));
              if(!err) re.solve(null);
            });
          }
        });
      });
    },
    response:function(done,resolve,reject){
      var clb = type(done,Function);
      return {solve:clb ? done:resolve,ject:clb ? done:reject};
    },
    emptyDirs:function(getDir,done){
      return new Promise((resolve,reject)=>{
        const re = this.response(done,resolve,reject);
        fs.emptyDir(paths[getDir+'Dir'])
        .then(()=>re.solve(null))
        .catch(()=>re.ject(new Error(`Could not empty testing folders.`)));
      });
    },
    addTemplates:function(getDir){
      return new Promise((resolve,reject)=>{
        if(getDir==='to') resolve();
        if(getDir==='from'){
          const promises = [];
          for(let i in data){
            promises.push(new Promise((resolve,reject)=>{
              let pth = path.join(paths.fromDir,data[i].path);
              if(data[i].type==='dir') this.addFolder(pth,i,resolve,reject);
              if(data[i].type==='file') this.addFile(pth,i,resolve,reject);
              if(data[i].type!=='dir'&&data[i].type!=='file') resolve();
            }));
          }
          Promise.all(promises).then(resolve).catch(reject); 
        }
      });
    },
    addFolder:function(getPath,i,resolve,reject){
      fs.ensureDir(getPath,(err)=>{
        if(err) reject(new Error(`Could not add '${data[i].name}' ${data[i].type}.`));
        if(!err) resolve();
      });
    },
    addFile:function(getPath,i,resolve,reject){
      let content = data[i].content&&typeof data[i].content === 'string' ? data[i].content:"";
      fs.ensureFile(getPath)
      .then(()=>fs.writeFile(getPath,content))
      .then(()=>resolve())
      .catch(()=>reject(new Error(`Could not add '${data[i].name}' ${data[i].type}.`)));
    }
  }
};