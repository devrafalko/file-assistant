/* global expect, __dirname, it, xit, fit */

const fs = require('fs-extra');
const path = require('path');

const helpers = path.resolve('./tests/helpers');
const prepare = require(path.resolve(helpers,'prepare.js'));
const paths = require(path.resolve(helpers,'paths.js'));
const should = require(path.resolve(helpers,'should.js'));
const testingModule = require(path.resolve('./index.js'));
const data = require(path.resolve(helpers,'structures.json'));

describe(`When the file does not exist in the root folder\n`+
         `and the structure contains an item with that file`,function(){

  describe(`regardless the 'overwrite' property is true, false or undefined`,function(){

      beforeEach(function(done){
        this.structure = [{file:paths.name('prod.css')}];
        prepare.remove()
        .then(()=>prepare.resetFrom())
        .then(()=>prepare.resetTo())
        .then(done)
        .catch(done.fail);
      });

      it.apply(this,should.createNewFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css')
      }));

      it.apply(this,should.haveContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css'),
        $content:''
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1,
        $properties:{
          fail: null,
          warning: null,
          success: `The file "${paths.name('prod.css')}" was successfully created.`,
          item: 'file',
          from: null,
          action: 'create',
          overwritten: false,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('prod.css'),
          absolute:paths.to('prod.css')
        }
      }));

      it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $callbackTimes:1,
          $properties:{
            error:null,
            files:{
              success:[paths.to('prod.css')],
              warning:[],
              fail:[]
            },
            dirs:{
              success:[],
              warning:[],
              fail:[]
            },
            root:path.join(paths.rootDir,paths.toDir)
          }
        }));
  });

  describe(`and 'copy' property, regardless 'overwrite' property is true, false or undefined`,function(){
    
      beforeEach(function(done){
        this.structure = [{file:paths.name('prod.css'),copy:paths.from('dist.css')}];
        prepare.remove()
        .then(()=>prepare.resetFrom())
        .then(()=>prepare.resetTo())
        .then(done)
        .catch(done.fail);
      });
    
      it.apply(this,should.createNewFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css')
      }));
      
      it.apply(this,should.not.removeFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.from('dist.css')
      }));
      
      it.apply(this,should.haveContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css'),
        $content:data['dist.css'].content
      }));
      
      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1
      }));
      
      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1,
        $properties:{
          fail: null,
          warning: null,
          success: `The file "${paths.name('prod.css')}" was successfully copied from the "${paths.from('dist.css')}" path.`,
          item: 'file',
          from: paths.from('dist.css'),
          action: 'copy',
          overwritten: false,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('prod.css'),
          absolute:paths.to('prod.css')
        }
      }));
    
      it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $callbackTimes:1,
          $properties:{
            error:null,
            files:{
              success:[paths.to('prod.css')],
              warning:[],
              fail:[]
            },
            dirs:{
              success:[],
              warning:[],
              fail:[]
            },
            root:path.join(paths.rootDir,paths.toDir)
          }
        }));
    
  });

  describe(`and 'move' property, regardless 'overwrite' property is true, false or undefined`,function(){
    
      beforeEach(function(done){
        this.structure = [{file:paths.name('prod.css'),move:paths.from('dist.css')}];
        prepare.remove()
        .then(()=>prepare.resetFrom())
        .then(()=>prepare.resetTo())
        .then(done)
        .catch(done.fail);
      });
    
      it.apply(this,should.createNewFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css')
      }));
    
      it.apply(this,should.removeFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.from('dist.css')
      }));
      
      it.apply(this,should.haveContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css'),
        $content:data['dist.css'].content
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1,
        $properties:{
          fail: null,
          warning: null,
          success: `The file "${paths.name('prod.css')}" was successfully moved from the "${paths.from('dist.css')}" path.`,
          item: 'file',
          from: paths.from('dist.css'),
          action: 'move',
          overwritten: false,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('prod.css'),
          absolute:paths.to('prod.css')
        }
      }));
    
      it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $callbackTimes:1,
          $properties:{
            error:null,
            files:{
              success:[paths.to('prod.css')],
              warning:[],
              fail:[]
            },
            dirs:{
              success:[],
              warning:[],
              fail:[]
            },
            root:path.join(paths.rootDir,paths.toDir)
          }
        }));
  });

  describe(`and 'write' property, regardless 'overwrite' property is true, false or undefined`,function(){
    
      beforeEach(function(done){
        this.content = '#new{color:black;}\n';
        this.structure = [{file:paths.name('prod.css'),write:this.content}];
        prepare.remove()
        .then(()=>prepare.resetFrom())
        .then(()=>prepare.resetTo())
        .then(done)
        .catch(done.fail);
      });
    
      it.apply(this,should.createNewFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css')
      }));
      
      it.apply(this,should.haveContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css'),
        $content:should.context('content')
      }));
      
      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1,
        $properties:{
          fail: null,
          warning: null,
          success: `The file "${paths.name('prod.css')}" was successfully created with the given content.`,
          item: 'file',
          from: null,
          action: 'write',
          overwritten: false,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('prod.css'),
          absolute:paths.to('prod.css')
        }
      }));
    
      it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $callbackTimes:1,
          $properties:{
            error:null,
            files:{
              success:[paths.to('prod.css')],
              warning:[],
              fail:[]
            },
            dirs:{
              success:[],
              warning:[],
              fail:[]
            },
            root:path.join(paths.rootDir,paths.toDir)
          }
        }));
  });

  describe(`and 'writeFrom' property, regardless 'overwrite' property is true, false or undefined`,function(){

      beforeEach(function(done){
        this.structure = [{file:paths.name('prod.css'),writeFrom:paths.from('dist.css')}];
        prepare.remove()
        .then(()=>prepare.resetFrom())
        .then(()=>prepare.resetTo())
        .then(done)
        .catch(done.fail);
      });
    
      it.apply(this,should.createNewFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css')
      }));
    
      it.apply(this,should.not.removeFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.from('dist.css')
      }));
      
      it.apply(this,should.haveContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css'),
        $content:data['dist.css'].content
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1,
        $properties:{
          fail: null,
          warning: null,
          success: `The file "${paths.name('prod.css')}" was successfully created with the content from the "${paths.from('dist.css')}" file.`,
          item: 'file',
          from: paths.from('dist.css'),
          action: 'writeFrom',
          overwritten: false,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('prod.css'),
          absolute:paths.to('prod.css')
        }
      }));
    
      it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $callbackTimes:1,
          $properties:{
            error:null,
            files:{
              success:[paths.to('prod.css')],
              warning:[],
              fail:[]
            },
            dirs:{
              success:[],
              warning:[],
              fail:[]
            },
            root:path.join(paths.rootDir,paths.toDir)
          }
        }));
  });
});

describe(`When the file already exists in the root folder\n`+
         `and the structure contains an item with that file`,function(){
  describe("and overwrite:true property",function(){

      beforeEach(function(done){
        this.structure = [{file:paths.name('prod.css'),overwrite:true}];
        prepare.remove()
        .then(()=>prepare.resetFrom())
        .then(()=>prepare.resetTo())
        .then(()=>prepare.addTo('prod.css'))
        .then(done)
        .catch(done.fail);
      });
      
      it.apply(this,should.not.createNewFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css')
      }));
      
      it.apply(this,should.not.keepFileContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css')
      }));
      
      it.apply(this,should.haveContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css'),
        $content:''
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1,
        $properties:{
          fail: null,
          warning: null,
          success: `The already existing file "${paths.name('prod.css')}" was successfully overwritten by the newly created file.`,
          item: 'file',
          from: null,
          action: 'create',
          overwritten: true,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('prod.css'),
          absolute:paths.to('prod.css')
        }
      }));
    
      it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $callbackTimes:1,
          $properties:{
            error:null,
            files:{
              warning:[],
              success:[paths.to('prod.css')],
              fail:[]
            },
            dirs:{
              success:[],
              warning:[],
              fail:[]
            },
            root:path.join(paths.rootDir,paths.toDir)
          }
        }));
  });

  describe(`and overwrite:false property`,function(){
 
      beforeEach(function(done){
        this.structure = [{file:paths.name('prod.css'),overwrite:false}];
        prepare.remove()
        .then(()=>prepare.resetFrom())
        .then(()=>prepare.resetTo())
        .then(()=>prepare.addTo('prod.css'))
        .then(done)
        .catch(done.fail);
      });
      
      it.apply(this,should.not.createNewFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css')
      }));
      
      it.apply(this,should.keepFileContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css')
      }));
      
      it.apply(this,should.not.haveContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css'),
        $content:''
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1,
        $properties:{
          fail: null,
          warning: `The already existing file "${paths.name('prod.css')}" could not be overwritten by the newly created file, due to the "overwrite" property settings.`,
          success: null,
          item: 'file',
          from: null,
          action: 'create',
          overwritten: false,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('prod.css'),
          absolute:paths.to('prod.css')
        }
      }));
    
      it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $callbackTimes:1,
          $properties:{
            error:null,
            files:{
              warning:[paths.to('prod.css')],
              success:[],
              fail:[]
            },
            dirs:{
              success:[],
              warning:[],
              fail:[]
            },
            root:path.join(paths.rootDir,paths.toDir)
          }
        }));
  });

  describe(`and 'copy' and overwrite:true property`,function(){

      beforeEach(function(done){
        this.structure = [{file:paths.name('prod.css'),copy:paths.from('dist.css'),overwrite:true}];
        prepare.remove()
        .then(()=>prepare.resetFrom())
        .then(()=>prepare.resetTo())
        .then(()=>prepare.addTo('prod.css'))
        .then(done)
        .catch(done.fail);
      });
    
      it.apply(this,should.not.createNewFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css')
      }));
      
      it.apply(this,should.not.removeFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.from('dist.css')
      }));
      
      it.apply(this,should.not.keepFileContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css')
      }));
      
      it.apply(this,should.haveContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css'),
        $content:data['dist.css'].content
      }));
      
      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1
      }));
      
      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1,
        $properties:{
          fail: null,
          warning: null,
          success: `The already existing file "${paths.name('prod.css')}" was successfully overwritten by the file copied from the "${paths.from('dist.css')}" path.`,
          item: 'file',
          from: paths.from('dist.css'),
          action: 'copy',
          overwritten: true,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('prod.css'),
          absolute:paths.to('prod.css')
        }
      }));
    
      it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $callbackTimes:1,
          $properties:{
            error:null,
            files:{
              success:[paths.to('prod.css')],
              warning:[],
              fail:[]
            },
            dirs:{
              success:[],
              warning:[],
              fail:[]
            },
            root:path.join(paths.rootDir,paths.toDir)
          }
        }));
  });

  describe(`and 'copy' and overwrite:false property`,function(){

      beforeEach(function(done){
        this.structure = [{file:paths.name('prod.css'),copy:paths.from('dist.css'),overwrite:false}];
        prepare.remove()
        .then(()=>prepare.resetFrom())
        .then(()=>prepare.resetTo())
        .then(()=>prepare.addTo('prod.css'))
        .then(done)
        .catch(done.fail);
      });

      it.apply(this,should.not.createNewFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css')
      }));

      it.apply(this,should.not.removeFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.from('dist.css')
      }));

      it.apply(this,should.keepFileContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css')
      }));

      it.apply(this,should.not.haveContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css'),
        $content:data['dist.css'].content
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1,
        $properties:{
          fail: null,
          warning: `The already existing file "${paths.name('prod.css')}" could not be overwritten by the file copied from the "${paths.from('dist.css')}" path, due to the "overwrite" property settings.`,
          success: null,
          item: 'file',
          from: paths.from('dist.css'),
          action: 'copy',
          overwritten: false,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('prod.css'),
          absolute:paths.to('prod.css')
        }
      }));

      it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $callbackTimes:1,
          $properties:{
            error:null,
            files:{
              warning:[paths.to('prod.css')],
              success:[],
              fail:[]
            },
            dirs:{
              success:[],
              warning:[],
              fail:[]
            },
            root:path.join(paths.rootDir,paths.toDir)
          }
        }));
  });

  describe(`and 'move' and overwrite:true property`,function(){
      beforeEach(function(done){
        this.structure = [{file:paths.name('prod.css'),move:paths.from('dist.css'),overwrite:true}];
        prepare.remove()
        .then(()=>prepare.resetFrom())
        .then(()=>prepare.resetTo())
        .then(()=>prepare.addTo('prod.css'))
        .then(done)
        .catch(done.fail);
      });
    
      it.apply(this,should.not.createNewFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css')
      }));
      
      it.apply(this,should.removeFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.from('dist.css')
      }));
      
      it.apply(this,should.not.keepFileContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css')
      }));
      
      it.apply(this,should.haveContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css'),
        $content:data['dist.css'].content
      }));
      
      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1
      }));
      
      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1,
        $properties:{
          fail: null,
          warning: null,
          success: `The already existing file "${paths.name('prod.css')}" was successfully overwritten by the file moved from the "${paths.from('dist.css')}" path.`,
          item: 'file',
          from: paths.from('dist.css'),
          action: 'move',
          overwritten: true,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('prod.css'),
          absolute:paths.to('prod.css')
        }
      }));
    
      it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $callbackTimes:1,
          $properties:{
            error:null,
            files:{
              success:[paths.to('prod.css')],
              warning:[],
              fail:[]
            },
            dirs:{
              success:[],
              warning:[],
              fail:[]
            },
            root:path.join(paths.rootDir,paths.toDir)
          }
        }));
  });

  describe(`and 'move' and overwrite:false property`,function(){

      beforeEach(function(done){
        this.structure = [{file:paths.name('prod.css'),move:paths.from('dist.css'),overwrite:false}];
        prepare.remove()
        .then(()=>prepare.resetFrom())
        .then(()=>prepare.resetTo())
        .then(()=>prepare.addTo('prod.css'))
        .then(done)
        .catch(done.fail);
      });

      it.apply(this,should.not.createNewFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css')
      }));

      it.apply(this,should.not.removeFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.from('dist.css')
      }));

      it.apply(this,should.keepFileContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css')
      }));

      it.apply(this,should.not.haveContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css'),
        $content:data['dist.css'].content
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1,
        $properties:{
          fail: null,
          warning: `The already existing file "${paths.name('prod.css')}" could not be overwritten by the file moved from the "${paths.from('dist.css')}" path, due to the "overwrite" property settings.`,
          success: null,
          item: 'file',
          from: paths.from('dist.css'),
          action: 'move',
          overwritten: false,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('prod.css'),
          absolute:paths.to('prod.css')
        }
      }));

      it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $callbackTimes:1,
          $properties:{
            error:null,
            files:{
              warning:[paths.to('prod.css')],
              success:[],
              fail:[]
            },
            dirs:{
              success:[],
              warning:[],
              fail:[]
            },
            root:path.join(paths.rootDir,paths.toDir)
          }
        }));
  });

  describe(`and 'write' property and overwrite:true property`,function(){
    
      beforeEach(function(done){
        this.content = '#new{color:black;}\n';
        this.structure = [{file:paths.name('prod.css'),write:this.content,overwrite:true}];
        prepare.remove()
        .then(()=>prepare.resetFrom())
        .then(()=>prepare.resetTo())
        .then(()=>prepare.addTo('prod.css'))
        .then(done)
        .catch(done.fail);
      });
    
      it.apply(this,should.not.createNewFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css')
      }));
      
      it.apply(this,should.not.keepFileContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css')
      }));
      
      it.apply(this,should.haveContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css'),
        $content:should.context('content')
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1,
        $properties:{
          fail: null,
          warning: null,
          success: `The content of "${paths.name('prod.css')}" file was successfully overwritten with the given content.`,
          item: 'file',
          from: null,
          action: 'write',
          overwritten: true,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('prod.css'),
          absolute:paths.to('prod.css')
        }
      }));
    
      it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $callbackTimes:1,
          $properties:{
            error:null,
            files:{
              success:[paths.to('prod.css')],
              warning:[],
              fail:[]
            },
            dirs:{
              success:[],
              warning:[],
              fail:[]
            },
            root:path.join(paths.rootDir,paths.toDir)
          }
        }));
  });

  describe(`and 'write' property and overwrite:false property`,function(){

      beforeEach(function(done){
        this.content = '#new{color:black;}\n';
        this.structure = [{file:paths.name('prod.css'),write:this.content,overwrite:false}];
        prepare.remove()
        .then(()=>prepare.resetFrom())
        .then(()=>prepare.resetTo())
        .then(()=>prepare.addTo('prod.css'))
        .then(done)
        .catch(done.fail);
      });
    
      it.apply(this,should.not.createNewFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css')
      }));
      
      it.apply(this,should.haveContentAppended({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css'),
        $write:should.context('content')
      }));
      
      it.apply(this,should.not.keepFileContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css')
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1,
        $properties:{
          fail: null,
          warning: null,
          success: `The given content was successfully appended to the "${paths.name('prod.css')}" file.`,
          item: 'file',
          from: null,
          action: 'write',
          overwritten: false,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('prod.css'),
          absolute:paths.to('prod.css')
        }
      }));
    
      it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $callbackTimes:1,
          $properties:{
            error:null,
            files:{
              success:[paths.to('prod.css')],
              warning:[],
              fail:[]
            },
            dirs:{
              success:[],
              warning:[],
              fail:[]
            },
            root:path.join(paths.rootDir,paths.toDir)
          }
        }));
  });

  describe(`and 'writeFrom' property and overwrite:true property`,function(){

      beforeEach(function(done){
        this.structure = [{file:paths.name('prod.css'),writeFrom:paths.from('dist.css'),overwrite:true}];
        prepare.remove()
        .then(()=>prepare.resetFrom())
        .then(()=>prepare.resetTo())
        .then(()=>prepare.addTo('prod.css'))
        .then(done)
        .catch(done.fail);
      });

      it.apply(this,should.not.createNewFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css')
      }));
      
      it.apply(this,should.not.removeFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.from('dist.css')
      }));
      
      it.apply(this,should.not.keepFileContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css')
      }));

      it.apply(this,should.haveContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css'),
        $content:data['dist.css'].content
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1,
        $properties:{
          fail: null,
          warning: null,
          success: `The already existing file "${paths.rel('prod.css')}" was successfully overwritten with the content from the "${paths.from('dist.css')}" file.`,
          item: 'file',
          from: paths.from('dist.css'),
          action: 'writeFrom',
          overwritten: true,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('prod.css'),
          absolute:paths.to('prod.css')
        }
      }));
    
      it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $callbackTimes:1,
          $properties:{
            error:null,
            files:{
              success:[paths.to('prod.css')],
              warning:[],
              fail:[]
            },
            dirs:{
              success:[],
              warning:[],
              fail:[]
            },
            root:path.join(paths.rootDir,paths.toDir)
          }
        }));
  });

  describe(`and 'writeFrom' property and overwrite:false property`,function(){

      beforeEach(function(done){
        this.structure = [{file:paths.name('prod.css'),writeFrom:paths.from('dist.css'),overwrite:false}];
        prepare.remove()
        .then(()=>prepare.resetFrom())
        .then(()=>prepare.resetTo())
        .then(()=>prepare.addTo('prod.css'))
        .then(done)
        .catch(done.fail);
      });

      it.apply(this,should.not.createNewFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css')
      }));

      it.apply(this,should.not.removeFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.from('dist.css')
      }));

      it.apply(this,should.haveContentAppended({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css'),
        $writeFrom:paths.from('dist.css')
      }));

      it.apply(this,should.not.keepFileContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css')
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1,
        $properties:{
          fail: null,
          warning: null,
          success: `The content from the "${paths.from('dist.css')}" file was successfully appended to the "${paths.rel('prod.css')}" file.`,
          item: 'file',
          from: paths.from('dist.css'),
          action: 'writeFrom',
          overwritten: false,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('prod.css'),
          absolute:paths.to('prod.css')
        }
      }));

      it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $callbackTimes:1,
          $properties:{
            error:null,
            files:{
              success:[paths.to('prod.css')],
              warning:[],
              fail:[]
            },
            dirs:{
              success:[],
              warning:[],
              fail:[]
            },
            root:path.join(paths.rootDir,paths.toDir)
          }
        }));
  });
});

describe(`When the folder does not exist in the root folder\n`+
         `and the structure contains an item with this folder`,function(){

  describe("regardless the 'overwrite' property is true, false or undefined",function(){

      beforeEach(function(done){
        this.structure = [{dir:paths.name('styles')}];
        prepare.remove()
        .then(()=>prepare.resetFrom())
        .then(()=>prepare.resetTo())
        .then(done)
        .catch(done.fail);
      });

      it.apply(this,should.createNewFolder({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $folder:paths.to('styles')
      }));
      
      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.to('styles'),
        $files:0,
        $folders:0
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1,
        $properties:{
          fail: null,
          warning: null,
          success: `The folder "${paths.rel('styles')}" was successfully created.`,
          item: 'dir',
          from: null,
          action: 'create',
          overwritten: false,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('styles'),
          absolute:paths.to('styles')
        }
      }));

      it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $callbackTimes:1,
          $properties:{
            error:null,
            files:{
              success:[],
              warning:[],
              fail:[]
            },
            dirs:{
              success:[paths.to('styles')],
              warning:[],
              fail:[]
            },
            root:path.join(paths.rootDir,paths.toDir)
          }
        }));
  });
  
  describe(`and the property 'contents' with file and folder item\n`+
            `regardless 'overwrite' property is true, false or undefined`,function(){

      beforeEach(function(done){
        this.structure = [
          {dir:paths.name('styles')
            ,contents:[
              {dir:paths.name('styles/css')},
              {file:paths.name('styles/mixins.scss')}
          ]
        }
        ];
        prepare.remove()
        .then(()=>prepare.resetFrom())
        .then(()=>prepare.resetTo())
        .then(done)
        .catch(done.fail);
      });

      it.apply(this,should.createNewFolder({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $folder:paths.to('styles')
      }));

      it.apply(this,should.createNewFolder({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $folder:paths.to('styles/css')
      }));

      it.apply(this,should.createNewFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('styles/mixins.scss')
      }));

      it.apply(this,should.haveContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('styles/mixins.scss'),
        $content:''
      }));

      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.to('styles'),
        $files:1,
        $folders:1
      }));
      
      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:3
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $callbackTimes:1
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:3,
        $properties:{
          fail: null,
          warning: null,
          success: `The folder "${paths.rel('styles')}" was successfully created with its contents.`,
          item: 'dir',
          from: null,
          action: 'contents',
          overwritten: false,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('styles'),
          absolute:paths.to('styles')
        }
      }));
      
      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:3,
        $properties:{
          fail: null,
          warning: null,
          success: `The folder "${paths.rel('styles/css')}" was successfully created.`,
          item: 'dir',
          from: null,
          action: 'create',
          overwritten: false,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('styles/css'),
          absolute:paths.to('styles/css')
        }
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:3,
        $properties:{
          fail: null,
          warning: null,
          success: `The file "${paths.rel('styles/mixins.scss')}" was successfully created.`,
          item: 'file',
          from: null,
          action: 'create',
          overwritten: false,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('styles/mixins.scss'),
          absolute:paths.to('styles/mixins.scss')
        }
      }));

      it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $callbackTimes:1,
          $properties:{
            error:null,
            files:{
              success:[paths.to('styles/mixins.scss')],
              warning:[],
              fail:[]
            },
            dirs:{
              success:jasmine.arrayContaining([
                paths.to('styles'),
                paths.to('styles/css')
              ]),
              warning:[],
              fail:[]
            },
            root:path.join(paths.rootDir,paths.toDir)
          }
        }));
  });



  describe(`and 'copy' property, regardless 'overwrite' property is true, false or undefined`,function(){
    
      beforeEach(function(done){
        this.structure = [
          {dir:paths.name('styles'),copy:paths.from('styles')}
        ];
        prepare.remove()
        .then(()=>prepare.resetFrom())
        .then(()=>prepare.resetTo())
        .then(done)
        .catch(done.fail);
      });

      it.apply(this,should.not.removeFolder({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $folder:paths.from('styles')
      }));
      
      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:9
      }));
      
      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $callbackTimes:1
      }));

      for(var loopPath of ['styles', 'styles/css', 'styles/scss']){
        
        it.apply(this,should.createNewFolder({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $folder:paths.to(loopPath)
        }));
        
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:9,
          $properties:{
            fail: null,
            warning: null,
            success: `The folder "${paths.rel(loopPath)}" was successfully copied from the "${paths.from(loopPath)}" path.`,
            item: 'dir',
            from: paths.from(loopPath),
            action: 'copy',
            overwritten: false,
            root:path.join(paths.rootDir,paths.toDir),
            relative:paths.rel(loopPath),
            absolute:paths.to(loopPath)
          }
        }));
      }
      for(var loopPath of ['styles/css/extra.css', 'styles/css/main.css', 'styles/css/style.css', 'styles/scss/main.scss', 'styles/imports.scss', 'styles/mixins.scss']){

        it.apply(this,should.haveContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(loopPath),
          $content:data[loopPath].content
        }));
        
        it.apply(this,should.createNewFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(loopPath)
        }));
        
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:9,
          $properties:{
            fail: null,
            warning: null,
            success: `The file "${paths.rel(loopPath)}" was successfully copied from the "${paths.from(loopPath)}" path.`,
            item: 'file',
            from: paths.from(loopPath),
            action: 'copy',
            overwritten: false,
            root:path.join(paths.rootDir,paths.toDir),
            relative:paths.rel(loopPath),
            absolute:paths.to(loopPath)
          }
        }));
      }
    
      it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $callbackTimes:1,
          $properties:{
            error:null,
            files:{
              success:jasmine.arrayContaining([
                paths.to('styles/css/extra.css'),
                paths.to('styles/css/main.css'),
                paths.to('styles/css/style.css'),
                paths.to('styles/scss/main.scss'),
                paths.to('styles/imports.scss'),
                paths.to('styles/mixins.scss')
              ]),
              warning:[],
              fail:[]
            },
            dirs:{
              success:jasmine.arrayContaining([
                paths.to('styles'),
                paths.to('styles/css')
              ]),
              warning:[],
              fail:[]
            },
            root:path.join(paths.rootDir,paths.toDir)
          }
        }));
  });

  describe(`and 'move' property, regardless 'overwrite' property is true, false or undefined`,function(){
      beforeEach(function(done){
        this.structure = [
          {dir:paths.name('styles'),move:paths.from('styles')}
        ];
        prepare.remove()
        .then(()=>prepare.resetFrom())
        .then(()=>prepare.resetTo())
        .then(done)
        .catch(done.fail);
      });

      it.apply(this,should.removeFolder({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $folder:paths.from('styles')
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:9
      }));
      
      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $callbackTimes:1
      }));

      for(var loopPath of ['styles', 'styles/css', 'styles/scss']){
        
        it.apply(this,should.createNewFolder({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $folder:paths.to(loopPath)
        }));
        
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:9,
          $properties:{
            fail: null,
            warning: null,
            success: `The folder "${paths.rel(loopPath)}" was successfully moved from the "${paths.from(loopPath)}" path.`,
            item: 'dir',
            from: paths.from(loopPath),
            action: 'move',
            overwritten: false,
            root:path.join(paths.rootDir,paths.toDir),
            relative:paths.rel(loopPath),
            absolute:paths.to(loopPath)
          }
        }));
      }
      for(var loopPath of ['styles/css/extra.css', 'styles/css/main.css', 'styles/css/style.css', 'styles/scss/main.scss', 'styles/imports.scss', 'styles/mixins.scss']){

        it.apply(this,should.haveContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(loopPath),
          $content:data[loopPath].content
        }));
        
        it.apply(this,should.createNewFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(loopPath)
        }));
        
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:9,
          $properties:{
            fail: null,
            warning: null,
            success: `The file "${paths.rel(loopPath)}" was successfully moved from the "${paths.from(loopPath)}" path.`,
            item: 'file',
            from: paths.from(loopPath),
            action: 'move',
            overwritten: false,
            root:path.join(paths.rootDir,paths.toDir),
            relative:paths.rel(loopPath),
            absolute:paths.to(loopPath)
          }
        }));
      }
    
      it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $callbackTimes:1,
          $properties:{
            error:null,
            files:{
              success:jasmine.arrayContaining([
                paths.to('styles/css/extra.css'),
                paths.to('styles/css/main.css'),
                paths.to('styles/css/style.css'),
                paths.to('styles/scss/main.scss'),
                paths.to('styles/imports.scss'),
                paths.to('styles/mixins.scss')
              ]),
              warning:[],
              fail:[]
            },
            dirs:{
              success:jasmine.arrayContaining([
                paths.to('styles'),
                paths.to('styles/css')
              ]),
              warning:[],
              fail:[]
            },
            root:path.join(paths.rootDir,paths.toDir)
          }
        }));
  });

  describe(`and 'merge' property, regardless 'overwrite' property is true, false or undefined`,function(){

      beforeEach(function(done){
        this.structure = [
          {dir:paths.name('styles'),merge:paths.from('styles')}
        ];
        prepare.remove()
        .then(()=>prepare.resetFrom())
        .then(()=>prepare.resetTo())
        .then(done)
        .catch(done.fail);
      });

      it.apply(this,should.not.removeFolder({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $folder:paths.from('styles')
      }));
      
      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:9
      }));
      
      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $callbackTimes:1
      }));

      for(var loopPath of ['styles', 'styles/css', 'styles/scss']){
        
        it.apply(this,should.createNewFolder({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $folder:paths.to(loopPath)
        }));
        
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:9,
          $properties:{
            fail: null,
            warning: null,
            success: `The folder "${paths.rel(loopPath)}" was successfully merged with the "${paths.from(loopPath)}" folder.`,
            item: 'dir',
            from: paths.from(loopPath),
            action: 'merge',
            overwritten: false,
            root:path.join(paths.rootDir,paths.toDir),
            relative:paths.rel(loopPath),
            absolute:paths.to(loopPath)
          }
        }));
      }
      for(var loopPath of ['styles/css/extra.css', 'styles/css/main.css', 'styles/css/style.css', 'styles/scss/main.scss', 'styles/imports.scss', 'styles/mixins.scss']){

        it.apply(this,should.haveContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(loopPath),
          $content:data[loopPath].content
        }));
        
        it.apply(this,should.createNewFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(loopPath)
        }));
        
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:9,
          $properties:{
            fail: null,
            warning: null,
            success: `The file "${paths.rel(loopPath)}" was successfully copied from the "${paths.from(loopPath)}" path.`,
            item: 'file',
            from: paths.from(loopPath),
            action: 'copy',
            overwritten: false,
            root:path.join(paths.rootDir,paths.toDir),
            relative:paths.rel(loopPath),
            absolute:paths.to(loopPath)
          }
        }));
      }

      it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $callbackTimes:1,
          $properties:{
            error:null,
            files:{
              success:jasmine.arrayContaining([
                paths.to('styles/css/extra.css'),
                paths.to('styles/css/main.css'),
                paths.to('styles/css/style.css'),
                paths.to('styles/scss/main.scss'),
                paths.to('styles/imports.scss'),
                paths.to('styles/mixins.scss')
              ]),
              warning:[],
              fail:[]
            },
            dirs:{
              success:jasmine.arrayContaining([
                paths.to('styles'),
                paths.to('styles/css')
              ]),
              warning:[],
              fail:[]
            },
            root:path.join(paths.rootDir,paths.toDir)
          }
        }));
  });
});

describe(`When the folder already exists in the root folder\n`+
         `and the structure contains an item with that folder`,function(){
  describe("and overwrite:true property",function(){

      beforeEach(function(done){
        this.structure = [{dir:paths.name('styles'),overwrite:true}];
        prepare.remove()
        .then(()=>prepare.resetFrom())
        .then(()=>prepare.resetTo())
        .then(()=>prepare.addTo('styles'))
        .then(()=>prepare.addTo('styles/css'))
        .then(()=>prepare.addTo('styles/scss'))
        .then(()=>prepare.addTo('styles/css/extra.css'))
        .then(()=>prepare.addTo('styles/scss/main.scss'))
        .then(()=>prepare.addTo('styles/imports.scss'))
        .then(done)
        .catch(done.fail);
      });

      it.apply(this,should.not.removeFolder({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $folder:paths.to('styles')
      }));

      it.apply(this,should.removeFolder({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $folder:paths.to('styles/css')
      }));

      it.apply(this,should.removeFolder({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $folder:paths.to('styles/scss')
      }));

      it.apply(this,should.removeFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('styles/css/extra.css')
      }));

      it.apply(this,should.removeFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('styles/scss/main.scss')
      }));

      it.apply(this,should.removeFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('styles/imports.scss')
      }));
      
      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.to('styles'),
        $files:0,
        $folders:0
      }));

      it.apply(this,should.not.keepPreviousContents({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.to('styles')
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1
      }));
      
      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $callbackTimes:1
      }));
    
      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1,
        $properties:{
          fail: null,
          warning: null,
          success: `The already existing folder "${paths.rel('styles')}" was successfully overwritten by the newly created folder.`,
          item: 'dir',
          from: null,
          action: 'create',
          overwritten: true,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('styles'),
          absolute:paths.to('styles')
        }
      }));

      it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $callbackTimes:1,
          $properties:{
            error:null,
            files:{
              success:[],
              warning:[],
              fail:[]
            },
            dirs:{
              success:[paths.to('styles')],
              warning:[],
              fail:[]
            },
            root:path.join(paths.rootDir,paths.toDir)
          }
        }));
  });

  describe("and overwrite:false property",function(){
    
      beforeEach(function(done){
        this.structure = [{dir:paths.name('styles'),overwrite:false}];
        prepare.remove()
        .then(()=>prepare.resetFrom())
        .then(()=>prepare.resetTo())
        .then(()=>prepare.addTo('styles'))
        .then(()=>prepare.addTo('styles/css'))
        .then(()=>prepare.addTo('styles/scss'))
        .then(()=>prepare.addTo('styles/css/extra.css'))
        .then(()=>prepare.addTo('styles/scss/main.scss'))
        .then(()=>prepare.addTo('styles/imports.scss'))
        .then(done)
        .catch(done.fail);
      });


      it.apply(this,should.not.removeFolder({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $folder:paths.to('styles')
      }));

      it.apply(this,should.not.removeFolder({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $folder:paths.to('styles/css')
      }));

      it.apply(this,should.not.removeFolder({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $folder:paths.to('styles/scss')
      }));

      it.apply(this,should.not.removeFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('styles/css/extra.css')
      }));

      it.apply(this,should.not.removeFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('styles/scss/main.scss')
      }));

      it.apply(this,should.not.removeFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('styles/imports.scss')
      }));
      
      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.to('styles'),
        $files:3,
        $folders:2
      }));

      it.apply(this,should.keepPreviousContents({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.to('styles')
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1
      }));
      
      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $callbackTimes:1
      }));
    
      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1,
        $properties:{
          fail: null,
          warning: `The already existing folder "${paths.rel('styles')}" could not be overwritten by the newly created folder, due to the "overwrite" property settings.`,
          success: null,
          item: 'dir',
          from: null,
          action: 'create',
          overwritten: false,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('styles'),
          absolute:paths.to('styles')
        }
      }));

      it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $callbackTimes:1,
          $properties:{
            error:null,
            files:{
              success:[],
              warning:[],
              fail:[]
            },
            dirs:{
              success:[],
              warning:[paths.to('styles')],
              fail:[]
            },
            root:path.join(paths.rootDir,paths.toDir)
          }
        }));

  });

  describe(`and the property 'contents' with file and folder item\n`+
            `and overwrite:true property`,function(){

      beforeEach(function(done){
        this.structure = [{dir:paths.name('styles'),overwrite:true,contents:[
          {dir:paths.name('styles/css')},
          {file:paths.name('styles/mixins.scss')}
        ]}];
        prepare.remove()
        .then(()=>prepare.resetFrom())
        .then(()=>prepare.resetTo())
        .then(()=>prepare.addTo('styles'))
        .then(()=>prepare.addTo('styles/css'))
        .then(()=>prepare.addTo('styles/scss'))
        .then(()=>prepare.addTo('styles/css/extra.css'))
        .then(()=>prepare.addTo('styles/scss/main.scss'))
        .then(()=>prepare.addTo('styles/mixins.scss'))
        .then(done)
        .catch(done.fail);
      });

      it.apply(this,should.not.removeFolder({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $folder:paths.to('styles')
      }));
      
      it.apply(this,should.not.removeFolder({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $folder:paths.to('styles/css')
      }));
      
      it.apply(this,should.removeFolder({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $folder:paths.to('styles/scss')
      }));

      it.apply(this,should.removeFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('styles/css/extra.css')
      }));
      
      it.apply(this,should.removeFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('styles/scss/main.scss')
      }));
      
      it.apply(this,should.not.removeFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('styles/mixins.scss')
      }));

      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.to('styles'),
        $files:1,
        $folders:1
      }));
      
      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.to('styles/css'),
        $files:0,
        $folders:0
      }));

      it.apply(this,should.not.keepPreviousContents({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.to('styles')
      }));
      
      it.apply(this,should.not.keepPreviousContents({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.to('styles/css')
      }));
      
      it.apply(this,should.not.keepFileContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('styles/mixins.scss')
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:3
      }));
      
      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $callbackTimes:1
      }));
      
      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:3,
        $properties:{
          fail: null,
          warning: null,
          success: `The already existing folder "${paths.rel('styles')}" was successfully overwritten by the newly created folder and its contents.`,
          item: 'dir',
          from: null,
          action: 'contents',
          overwritten: true,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('styles'),
          absolute:paths.to('styles')
        }
      }));
      
      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:3,
        $properties:{
          fail: null,
          warning: null,
          success: `The folder "${paths.rel('styles/css')}" was successfully created.`,
          item: 'dir',
          from: null,
          action: 'create',
          overwritten: false,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('styles/css'),
          absolute:paths.to('styles/css')
        }
      }));
      
      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:3,
        $properties:{
          fail: null,
          warning: null,
          success: `The file "${paths.rel('styles/mixins.scss')}" was successfully created.`,
          item: 'file',
          from: null,
          action: 'create',
          overwritten: false,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('styles/mixins.scss'),
          absolute:paths.to('styles/mixins.scss')
        }
      }));
      
      it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $callbackTimes:1,
          $properties:{
            error:null,
            files:{
              success:[paths.to('styles/mixins.scss')],
              warning:[],
              fail:[]
            },
            dirs:{
              success:jasmine.arrayContaining([
                paths.to('styles'),
                paths.to('styles/css')
              ]),
              warning:[],
              fail:[]
            },
            root:path.join(paths.rootDir,paths.toDir)
          }
        }));
      
      
      
  });
  
  describe(`and the property 'contents' with file and folder item and overwrite:false property`,function(){

      beforeEach(function(done){
        this.structure = [{dir:paths.name('styles'),overwrite:false,contents:[
          {dir:paths.name('styles/css'),overwrite:false,contents:[
              {file:paths.name('styles/css/main.css'),overwrite:true},
              {file:paths.name('styles/css/style.css'),overwrite:false}
          ]},
          {dir:paths.name('styles/scss'),overwrite:true,contents:[
              {file:paths.name('styles/scss/main.scss'),overwrite:true}
          ]},
          {file:paths.name('styles/mixins.scss'),overwrite:false},
          {file:paths.name('styles/imports.scss'),overwrite:true}
        ]}];
        prepare.remove()
        .then(()=>prepare.resetFrom())
        .then(()=>prepare.resetTo())
        .then(()=>prepare.addTo('styles'))
        .then(()=>prepare.addTo('styles/mixins.scss'))
        .then(()=>prepare.addTo('styles/imports.scss'))

        .then(()=>prepare.addTo('styles/css'))
        .then(()=>prepare.addTo('styles/css/main.css'))
        .then(()=>prepare.addTo('styles/css/style.css'))
        .then(()=>prepare.addTo('styles/css/extra.css'))

        .then(()=>prepare.addTo('styles/scss'))
        .then(()=>prepare.addTo('styles/scss/main.scss'))
        .then(done)
        .catch(done.fail);
      });

      for(var loopPath of ['styles','styles/css','styles/scss']){
        it.apply(this,should.not.removeFolder({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $folder:paths.to(loopPath)
        }));
        
        it.apply(this,should.keepPreviousContents({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $directory:paths.to(loopPath)
        }));
        
      }

      for(var loopPath of ['styles/css/main.css','styles/css/style.css','styles/css/extra.css','styles/scss/main.scss','styles/mixins.scss','styles/imports.scss']){
        it.apply(this,should.not.removeFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(loopPath)
        }));
      }

      for(var loopPath of ['styles/css/main.css','styles/scss/main.scss','styles/imports.scss']){
        it.apply(this,should.not.keepFileContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(loopPath)
        }));
        
        it.apply(this,should.not.haveContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(loopPath),
          $content:data[loopPath].content
        }));
        
        it.apply(this,should.haveContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(loopPath),
          $content:''
        }));
        
      }

      for(var loopPath of ['styles/css/style.css','styles/css/extra.css','styles/mixins.scss']){
        it.apply(this,should.keepFileContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(loopPath)
        }));
        
        it.apply(this,should.haveContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(loopPath),
          $content:data[loopPath].content
        }));
        
        it.apply(this,should.not.haveContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(loopPath),
          $content:''
        }));
      }

      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.to('styles'),
        $files:6,
        $folders:2
      }));

      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.to('styles/css'),
        $files:3,
        $folders:0
      }));

      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.to('styles/scss'),
        $files:1,
        $folders:0
      }));
      
      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:8
      }));
      
      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $callbackTimes:1
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:8,
        $properties:{
          fail: null,
          warning: `The already existing folder "${paths.rel('styles')}" could not be overwritten by the newly created folder and its contents, due to the "overwrite" property settings.`,
          success: null,
          item: 'dir',
          from: null,
          action: 'contents',
          overwritten: false,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('styles'),
          absolute:paths.to('styles')
        }
      }));
      
      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:8,
        $properties:{
          fail: null,
          warning: `The already existing folder "${paths.rel('styles/css')}" could not be overwritten by the newly created folder and its contents, due to the "overwrite" property settings.`,
          success: null,
          item: 'dir',
          from: null,
          action: 'contents',
          overwritten: false,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('styles/css'),
          absolute:paths.to('styles/css')
        }
      }));
      
      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:8,
        $properties:{
          fail: null,
          warning: null,
          success: `The already existing folder "${paths.rel('styles/scss')}" was successfully overwritten by the newly created folder and its contents.`,
          item: 'dir',
          from: null,
          action: 'contents',
          overwritten: true,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('styles/scss'),
          absolute:paths.to('styles/scss')
        }
      }));
      
      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:8,
        $properties:{
          fail: null,
          warning: null,
          success: `The already existing file "${paths.rel('styles/css/main.css')}" was successfully overwritten by the newly created file.`,
          item: 'file',
          from: null,
          action: 'create',
          overwritten: true,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('styles/css/main.css'),
          absolute:paths.to('styles/css/main.css')
        }
      }));
      
      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:8,
        $properties:{
          fail: null,
          warning: `The already existing file "${paths.rel('styles/css/style.css')}" could not be overwritten by the newly created file, due to the "overwrite" property settings.`,
          success: null,
          item: 'file',
          from: null,
          action: 'create',
          overwritten: false,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('styles/css/style.css'),
          absolute:paths.to('styles/css/style.css')
        }
      }));
      
      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:8,
        $properties:{
          fail: null,
          warning: null,
          success: `The file "${paths.rel('styles/scss/main.scss')}" was successfully created.`,
          item: 'file',
          from: null,
          action: 'create',
          overwritten: false,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('styles/scss/main.scss'),
          absolute:paths.to('styles/scss/main.scss')
        }
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:8,
        $properties:{
          fail: null,
          warning: `The already existing file "${paths.rel('styles/mixins.scss')}" could not be overwritten by the newly created file, due to the "overwrite" property settings.`,
          success: null,
          item: 'file',
          from: null,
          action: 'create',
          overwritten: false,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('styles/mixins.scss'),
          absolute:paths.to('styles/mixins.scss')
        }
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:8,
        $properties:{
          fail: null,
          warning: null,
          success: `The already existing file "${paths.rel('styles/imports.scss')}" was successfully overwritten by the newly created file.`,
          item: 'file',
          from: null,
          action: 'create',
          overwritten: true,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('styles/imports.scss'),
          absolute:paths.to('styles/imports.scss')
        }
      }));

      it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $callbackTimes:1,
          $properties:{
            error:null,
            files:{
              success:jasmine.arrayContaining([
                paths.to('styles/css/main.css'),
                paths.to('styles/scss/main.scss'),
                paths.to('styles/imports.scss')
              ]),
              warning:jasmine.arrayContaining([
                paths.to('styles/css/style.css'),
                paths.to('styles/mixins.scss')
              ]),
              fail:[]
            },
            dirs:{
              success:[paths.to('styles/scss')],
              warning:jasmine.arrayContaining([
                paths.to('styles'),
                paths.to('styles/css')
              ]),
              fail:[]
            },
            root:path.join(paths.rootDir,paths.toDir)
          }
        }));
  });

  describe(`and 'copy' and overwrite:true property`,function(){
    
      beforeEach(function(done){
        this.structure = [
          {dir:paths.name('styles'),copy:paths.from('styles'),overwrite:true},
          {file:paths.name('prod.css'),copy:paths.from('variables.scss'),overwrite:true},
          {file:paths.name('variables.scss'),copy:paths.from('prod.css'),overwrite:true}
        ];
        prepare.remove()
        .then(()=>prepare.resetFrom())
        .then(()=>prepare.resetTo())
        .then(()=>prepare.addTo('styles'))
        .then(()=>prepare.addTo('styles/mixins.scss'))
        .then(()=>prepare.addTo('styles/imports.scss'))
        .then(()=>prepare.addTo('prod.css'))
        .then(()=>prepare.addTo('variables.scss'))
        .then(done)
        .catch(done.fail);
      });
      
      it.apply(this,should.not.removeFolder({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $folder:paths.to('styles')
      }));
      
      it.apply(this,should.not.removeFolder({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $folder:paths.from('styles')
      }));
      
      it.apply(this,should.keepPreviousContents({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.from('styles')
      }));

      for(var loopPath of ['styles/mixins.scss','styles/imports.scss','prod.css','variables.scss']){
        it.apply(this,should.not.removeFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(loopPath)
        }));
      }

      for(var loopPath of ['styles/css','styles/scss']){
        it.apply(this,should.createNewFolder({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $folder:paths.to(loopPath)
        }));
      }

      for(var loopPath of ['styles/css/main.css','styles/css/style.css','styles/css/extra.css','styles/scss/main.scss']){
        it.apply(this,should.createNewFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(loopPath)
        }));
      }
      
      for(var loopPath of ['prod.css','variables.scss','styles/mixins.scss','styles/imports.scss','styles/css/main.css','styles/css/style.css','styles/css/extra.css','styles/scss/main.scss']){
        it.apply(this,should.not.haveContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(loopPath),
          $content:''
        }));
      }

      for(var loopPath of ['prod.css','variables.scss']){
        it.apply(this,should.not.keepFileContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(loopPath)
        }));
      }
      
      for(var loopPath of ['styles/mixins.scss','styles/imports.scss']){
        it.apply(this,should.keepFileContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(loopPath)
        }));
      }

      it.apply(this,should.haveTheSameContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $model:paths.from('variables.scss'),
        $compared:paths.to('prod.css')
      }));
      
      it.apply(this,should.haveTheSameContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $model:paths.from('prod.css'),
        $compared:paths.to('variables.scss')
      }));
      
      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.to('styles'),
        $files:6,
        $folders:2
      }));
    
      it.apply(this,should.not.keepPreviousContents({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.to('styles')
      }));
      
      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:11
      }));
      
      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $callbackTimes:1
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:11,
        $properties:{
          fail: null,
          warning: null,
          success: `The already existing folder "${paths.rel('styles')}" was successfully overwritten by the folder copied from the "${paths.from('styles')}" path.`,
          item: 'dir',
          from: paths.from('styles'),
          action: 'copy',
          overwritten: true,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('styles'),
          absolute:paths.to('styles')
        }
      }));
      
      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:11,
        $properties:{
          fail: null,
          warning: null,
          success: `The folder "${paths.rel('styles/scss')}" was successfully copied from the "${paths.from('styles/scss')}" path.`,
          item: 'dir',
          from: paths.from('styles/scss'),
          action: 'copy',
          overwritten: false,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('styles/scss'),
          absolute:paths.to('styles/scss')
        }
      }));
      
      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:11,
        $properties:{
          fail: null,
          warning: null,
          success: `The folder "${paths.rel('styles/css')}" was successfully copied from the "${paths.from('styles/css')}" path.`,
          item: 'dir',
          from: paths.from('styles/css'),
          action: 'copy',
          overwritten: false,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('styles/css'),
          absolute:paths.to('styles/css')
        }
      }));
      
      for(var loopPath of ['styles/mixins.scss','styles/imports.scss','styles/css/main.css','styles/css/style.css','styles/css/extra.css','styles/scss/main.scss']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:11,
          $properties:{
            fail: null,
            warning: null,
            success: `The file "${paths.rel(loopPath)}" was successfully copied from the "${paths.from(loopPath)}" path.`,
            item: 'file',
            from: paths.from(loopPath),
            action: 'copy',
            overwritten: false,
            root:path.join(paths.rootDir,paths.toDir),
            relative:paths.rel(loopPath),
            absolute:paths.to(loopPath)
          }
        }));
      }

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:11,
        $properties:{
          fail: null,
          warning: null,
          success: `The already existing file "${paths.rel('prod.css')}" was successfully overwritten by the file copied from the "${paths.from('variables.scss')}" path.`,
          item: 'file',
          from: paths.from('variables.scss'),
          action: 'copy',
          overwritten: true,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('prod.css'),
          absolute:paths.to('prod.css')
        }
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:11,
        $properties:{
          fail: null,
          warning: null,
          success: `The already existing file "${paths.rel('variables.scss')}" was successfully overwritten by the file copied from the "${paths.from('prod.css')}" path.`,
          item: 'file',
          from: paths.from('prod.css'),
          action: 'copy',
          overwritten: true,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('variables.scss'),
          absolute:paths.to('variables.scss')
        }
      }));

      it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $callbackTimes:1,
          $properties:{
            error:null,
            files:{
              success:jasmine.arrayContaining([
                paths.to('styles/mixins.scss'),
                paths.to('styles/imports.scss'),
                paths.to('styles/css/main.css'),
                paths.to('styles/css/style.css'),
                paths.to('styles/css/extra.css'),
                paths.to('styles/scss/main.scss'),
                paths.to('prod.css'),
                paths.to('variables.scss')
              ]),
              warning:[],
              fail:[]
            },
            dirs:{
              success:jasmine.arrayContaining([
                paths.to('styles'),
                paths.to('styles/css'),
                paths.to('styles/scss')
              ]),
              warning:[],
              fail:[]
            },
            root:path.join(paths.rootDir,paths.toDir)
          }
        }));
  });

  describe(`and 'copy' and overwrite:false property`,function(){
    
      beforeEach(function(done){
        this.structure = [
          {dir:paths.name('styles'),copy:paths.from('styles'),overwrite:false}
        ];
        prepare.remove()
        .then(()=>prepare.resetFrom())
        .then(()=>prepare.resetTo())
        .then(()=>prepare.addTo('styles'))
        .then(()=>prepare.addTo('styles/mixins.scss'))
        .then(()=>prepare.addTo('styles/imports.scss'))
        .then(()=>prepare.addTo('styles/css'))
        .then(()=>prepare.addTo('styles/css/main.css'))
        .then(()=>prepare.addTo('styles/css/extra.css'))
        .then(done)
        .catch(done.fail);
      });

      it.apply(this,should.not.removeFolder({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $folder:paths.from('styles')
      }));
      it.apply(this,should.not.removeFolder({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $folder:paths.to('styles')
      }));

      it.apply(this,should.keepPreviousContents({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.to('styles')
      }));
      
      for(var loopPath of ['styles/mixins.scss','styles/imports.scss','styles/css/main.css','styles/css/extra.css']){
        it.apply(this,should.keepFileContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(loopPath)
        }));
        
      }
      
      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.to('styles'),
        $files:4,
        $folders:1
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1
      }));
      
      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $callbackTimes:1
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1,
        $properties:{
          fail: null,
          warning: `The already existing folder "${paths.rel('styles')}" could not be overwritten by the folder copied from the "${paths.from('styles')}" path, due to the "overwrite" property settings.`,
          success: null,
          item: 'dir',
          from: paths.from('styles'),
          action: 'copy',
          overwritten: false,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('styles'),
          absolute:paths.to('styles')
        }
      }));

      it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $callbackTimes:1,
          $properties:{
            error:null,
            files:{
              success:[],
              warning:[],
              fail:[]
            },
            dirs:{
              success:[],
              warning:[paths.to('styles')],
              fail:[]
            },
            root:path.join(paths.rootDir,paths.toDir)
          }
        }));
  });

  describe(`and 'move' and overwrite:true property`,function(){
    
      beforeEach(function(done){
        this.structure = [
          {dir:paths.name('styles'),contents:[
              {dir:'css',move:paths.from('styles/css'),overwrite:true}
          ]}
        ];
        prepare.remove()
        .then(()=>prepare.resetFrom())
        .then(()=>prepare.resetTo())
        .then(()=>prepare.addTo('styles'))
        .then(()=>prepare.addTo('styles/mixins.scss'))
        .then(()=>prepare.addTo('styles/imports.scss'))
        .then(()=>prepare.addTo('styles/css'))
        .then(()=>prepare.addTo('styles/css/main.css'))
        .then(done)
        .catch(done.fail);
      });

      it.apply(this,should.not.removeFolder({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $folder:paths.from('styles')
      }));
      
      it.apply(this,should.not.removeFolder({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $folder:paths.to('styles')
      }));
      
      it.apply(this,should.not.removeFolder({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $folder:paths.to('styles/css')
      }));
      
      it.apply(this,should.removeFolder({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $folder:paths.from('styles/css')
      }));

      it.apply(this,should.not.removeFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('styles/mixins.scss')
      }));
      
      it.apply(this,should.not.removeFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('styles/imports.scss')
      }));
      
      it.apply(this,should.not.removeFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('styles/css/main.css')
      }));
      
      it.apply(this,should.createNewFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('styles/css/style.css')
      }));
      
      it.apply(this,should.createNewFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('styles/css/extra.css')
      }));
      
      for(var loopPath of ['styles/css/main.css','styles/css/style.css','styles/css/extra.css']){
        it.apply(this,should.not.haveContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(loopPath),
          $content:''
        }));
      }

      it.apply(this,should.keepFileContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('styles/css/main.css')
      }));

      it.apply(this,should.haveContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('styles/css/style.css'),
        $content:data['styles/css/style.css'].content
      }));
      
      it.apply(this,should.haveContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('styles/css/extra.css'),
        $content:data['styles/css/extra.css'].content
      }));
      
      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.to('styles'),
        $files:5,
        $folders:1
      }));
      
      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.to('styles/css'),
        $files:3,
        $folders:0
      }));
      
      it.apply(this,should.not.keepPreviousContents({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.to('styles')
      }));
      
      it.apply(this,should.not.keepPreviousContents({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.to('styles/css')
      }));
      
      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:5
      }));
      
      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $callbackTimes:1
      }));
      
      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:5,
        $properties:{
          fail: null,
          warning: `The already existing folder "${paths.rel('styles')}" could not be overwritten by the newly created folder and its contents, due to the "overwrite" property settings.`,
          success: null,
          item: 'dir',
          from: null,
          action: 'contents',
          overwritten: false,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('styles'),
          absolute:paths.to('styles')
        }
      }));
      
      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:5,
        $properties:{
          fail: null,
          warning: null,
          success: `The already existing folder "${paths.rel('styles/css')}" was successfully overwritten by the folder moved from the "${paths.from('styles/css')}" path.`,
          item: 'dir',
          from: paths.from('styles/css'),
          action: 'move',
          overwritten: true,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('styles/css'),
          absolute:paths.to('styles/css')
        }
      }));

      for(var loopPath of ['styles/css/main.css','styles/css/style.css','styles/css/extra.css']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:5,
          $properties:{
            fail: null,
            warning: null,
            success: `The file "${paths.rel(loopPath)}" was successfully moved from the "${paths.from(loopPath)}" path.`,
            item: 'file',
            from: paths.from(loopPath),
            action: 'move',
            overwritten: false,
            root:path.join(paths.rootDir,paths.toDir),
            relative:paths.rel(loopPath),
            absolute:paths.to(loopPath)
          }
        }));
      }

      it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $callbackTimes:1,
          $properties:{
            error:null,
            files:{
              success:jasmine.arrayContaining([
                paths.to('styles/css/main.css'),
                paths.to('styles/css/style.css'),
                paths.to('styles/css/extra.css')
              ]),
              warning:[],
              fail:[]
            },
            dirs:{
              success:[paths.to('styles/css')],
              warning:[paths.to('styles')],
              fail:[]
            },
            root:path.join(paths.rootDir,paths.toDir)
          }
        }));
  });

  describe(`and 'move' and overwrite:false property`,function(){

      beforeEach(function(done){
        this.structure = [
          {dir:paths.name('styles'),move:paths.from('styles'),overwrite:false}
        ];
        prepare.remove()
        .then(()=>prepare.resetFrom())
        .then(()=>prepare.resetTo())
        .then(()=>prepare.addTo('styles'))
        .then(()=>prepare.addTo('styles/mixins.scss'))
        .then(()=>prepare.addTo('styles/imports.scss'))
        .then(()=>prepare.addTo('styles/css'))
        .then(()=>prepare.addTo('styles/css/main.css'))
        .then(()=>prepare.addTo('styles/css/extra.css'))
        .then(done)
        .catch(done.fail);
      });

      it.apply(this,should.not.removeFolder({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $folder:paths.from('styles')
      }));
      it.apply(this,should.not.removeFolder({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $folder:paths.to('styles')
      }));

      it.apply(this,should.keepPreviousContents({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.to('styles')
      }));
      
      it.apply(this,should.keepPreviousContents({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.from('styles')
      }));
      
      for(var loopPath of ['styles/mixins.scss','styles/imports.scss','styles/css/main.css','styles/css/extra.css']){
        it.apply(this,should.keepFileContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(loopPath)
        }));
      }
      
      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.to('styles'),
        $files:4,
        $folders:1
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1
      }));
      
      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $callbackTimes:1
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:1,
        $properties:{
          fail: null,
          warning: `The already existing folder "${paths.rel('styles')}" could not be overwritten by the folder moved from the "${paths.from('styles')}" path, due to the "overwrite" property settings.`,
          success: null,
          item: 'dir',
          from: paths.from('styles'),
          action: 'move',
          overwritten: false,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('styles'),
          absolute:paths.to('styles')
        }
      }));

      it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $callbackTimes:1,
          $properties:{
            error:null,
            files:{
              success:[],
              warning:[],
              fail:[]
            },
            dirs:{
              success:[],
              warning:[paths.to('styles')],
              fail:[]
            },
            root:path.join(paths.rootDir,paths.toDir)
          }
        }));
  });

  describe(`and 'merge' and overwrite:true property`,function(){

      beforeEach(function(done){
        this.structure = [
          {dir:paths.name('styles'),merge:paths.from('styles'),overwrite:true}
        ];
        this.contentA = '$vividPink: #ff55aa;';
        this.contentB = '.extra p{font-size:22px;}';
        prepare.remove()
        .then(()=>prepare.resetFrom())
        .then(()=>prepare.resetTo())
        .then(()=>prepare.addTo('styles'))
        .then(()=>prepare.addTo('styles/imports.scss'))
        .then(()=>prepare.writeFile('prod/styles/mixins.scss',this.contentA))
        .then(()=>prepare.addTo('styles/css'))
        .then(()=>prepare.addTo('styles/css/main.css'))
        .then(()=>prepare.addTo('styles/css/style.css'))
        .then(()=>prepare.writeFile('prod/styles/css/extra.css',this.contentB))
        .then(done)
        .catch(done.fail);
      });

      for(var loopPath of ['styles','styles/css','styles/scss']){
        it.apply(this,should.not.removeFolder({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $folder:paths.from(loopPath)
        }));
      }
      for(var loopPath of ['styles','styles/css']){
        it.apply(this,should.not.removeFolder({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $folder:paths.to(loopPath)
        }));
      }
      
      it.apply(this,should.createNewFolder({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $folder:paths.to('styles/scss')
      }));
      
      for(var loopPath of ['styles/scss/main.scss','styles/css/extra.css','styles/css/style.css','styles/css/main.css','styles/imports.scss','styles/mixins.scss']){
        it.apply(this,should.not.removeFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.from(loopPath)
        }));
        
        it.apply(this,should.not.haveContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(loopPath),
          $content:''
        }));
        
        it.apply(this,should.haveTheSameContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $model:paths.from(loopPath),
          $compared:paths.to(loopPath)
        }));
      }
      
      for(var loopPath of ['styles/css/extra.css','styles/css/style.css','styles/css/main.css','styles/imports.scss','styles/mixins.scss']){
        it.apply(this,should.not.removeFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(loopPath)
        }));
        
        it.apply(this,should.not.haveContentAppended({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(loopPath),
          $writeFrom:paths.from(loopPath)
        }));
      }
      
      it.apply(this,should.createNewFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('styles/scss/main.scss')
      }));


      for(var loopPath of ['styles/css/style.css','styles/css/main.css','styles/imports.scss']){
        it.apply(this,should.keepFileContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(loopPath)
        }));
      }
      for(var loopPath of ['styles/css/extra.css','styles/mixins.scss']){
        it.apply(this,should.not.keepFileContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(loopPath)
        }));
      }
      
      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.to('styles'),
        $files:6,
        $folders:2
      }));
      
      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.to('styles/css'),
        $files:3,
        $folders:0
      }));
      
      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.to('styles/scss'),
        $files:1,
        $folders:0
      }));
      
      it.apply(this,should.not.keepPreviousContents({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.to('styles')
      }));
      
      it.apply(this,should.keepPreviousContents({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.to('styles/css')
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:9
      }));
      
      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $callbackTimes:1
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:9,
        $properties:{
          fail: null,
          warning: null,
          success: `The folder "${paths.rel('styles/scss')}" was successfully merged with the "${paths.from('styles/scss')}" folder.`,
          item: 'dir',
          from: paths.from('styles/scss'),
          action: 'merge',
          overwritten: false,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('styles/scss'),
          absolute:paths.to('styles/scss')
        }
      }));
      
      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:9,
        $properties:{
          success: `The already existing folder "${paths.rel('styles/css')}" was successfully merged with the "${paths.from('styles/css')}" folder.`,
          warning: null,
          fail:null,
          item: 'dir',
          from: paths.from('styles/css'),
          action: 'merge',
          overwritten: false,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('styles/css'),
          absolute:paths.to('styles/css')
        }
      }));
      
      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:9,
        $properties:{
          success: `The already existing folder "${paths.rel('styles')}" was successfully merged with the "${paths.from('styles')}" folder.`,
          warning: null,
          fail: null,
          item: 'dir',
          from: paths.from('styles'),
          action: 'merge',
          overwritten: false,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('styles'),
          absolute:paths.to('styles')
        }
      }));
      
      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:9,
        $properties:{
          success: `The file "${paths.rel('styles/scss/main.scss')}" was successfully copied from the "${paths.from('styles/scss/main.scss')}" path.`,
          warning: null,
          fail: null,
          item: 'file',
          from: paths.from('styles/scss/main.scss'),
          action: 'copy',
          overwritten: false,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('styles/scss/main.scss'),
          absolute:paths.to('styles/scss/main.scss')
        }
      }));
      
      for(var loopPath of ['styles/css/style.css','styles/css/main.css','styles/css/extra.css','styles/mixins.scss','styles/imports.scss']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:9,
          $properties:{
            success: `The already existing file "${paths.rel(loopPath)}" was successfully overwritten by the file copied from the "${paths.from(loopPath)}" path.`,
            warning: null,
            fail: null,
            item: 'file',
            from: paths.from(loopPath),
            action: 'copy',
            overwritten: true,
            root:path.join(paths.rootDir,paths.toDir),
            relative:paths.rel(loopPath),
            absolute:paths.to(loopPath)
          }
        }));
      }
      

      it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $callbackTimes:1,
          $properties:{
            error:null,
            files:{
              warning:[],
              success:jasmine.arrayContaining([
                paths.to('styles/css/style.css'),
                paths.to('styles/css/main.css'),
                paths.to('styles/css/extra.css'),
                paths.to('styles/mixins.scss'),
                paths.to('styles/imports.scss'),
                paths.to('styles/scss/main.scss')
              ]),
              fail:[]
            },
            dirs:{
              warning:[],
              success:jasmine.arrayContaining([
                paths.to('styles'),
                paths.to('styles/css'),
                paths.to('styles/scss')
              ]),
              fail:[]
            },
            root:path.join(paths.rootDir,paths.toDir)
          }
        }));
    
  });
  describe(`and 'merge' and overwrite:false property`,function(){

      beforeEach(function(done){
        this.structure = [
          {dir:paths.name('styles'),merge:paths.from('styles'),overwrite:false}
        ];
        this.contentA = '$vividPink: #ff55aa;';
        this.contentB = '.extra p{font-size:22px;}';
        prepare.remove()
        .then(()=>prepare.resetFrom())
        .then(()=>prepare.resetTo())
        .then(()=>prepare.addTo('styles'))
        .then(()=>prepare.addTo('styles/imports.scss'))
        .then(()=>prepare.writeFile('prod/styles/mixins.scss',this.contentA))
        .then(()=>prepare.addTo('styles/css'))
        .then(()=>prepare.addTo('styles/css/main.css'))
        .then(()=>prepare.addTo('styles/css/style.css'))
        .then(()=>prepare.writeFile('prod/styles/css/extra.css',this.contentB))
        .then(done)
        .catch(done.fail);
      });

      for(var loopPath of ['styles','styles/css','styles/scss']){
        it.apply(this,should.not.removeFolder({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $folder:paths.from(loopPath)
        }));
      }
      
      for(var loopPath of ['styles','styles/css']){
        it.apply(this,should.not.removeFolder({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $folder:paths.to(loopPath)
        }));
      }
      
      it.apply(this,should.createNewFolder({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $folder:paths.to('styles/scss')
      }));
      
      for(var loopPath of ['styles/scss/main.scss','styles/css/extra.css','styles/css/style.css','styles/css/main.css','styles/imports.scss','styles/mixins.scss']){
        it.apply(this,should.not.removeFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.from(loopPath)
        }));
        
        it.apply(this,should.not.haveContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(loopPath),
          $content:''
        }));
      }
      
      for(var loopPath of ['styles/scss/main.scss','styles/css/style.css','styles/css/main.css','styles/imports.scss']){
        it.apply(this,should.haveTheSameContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $model:paths.from(loopPath),
          $compared:paths.to(loopPath)
        }));
      }

      for(var loopPath of ['styles/css/extra.css','styles/css/style.css','styles/css/main.css','styles/imports.scss','styles/mixins.scss']){
        it.apply(this,should.not.removeFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(loopPath)
        }));
        
        it.apply(this,should.not.haveContentAppended({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(loopPath),
          $writeFrom:paths.from(loopPath)
        }));
        it.apply(this,should.keepFileContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(loopPath)
        }));
      }

      it.apply(this,should.createNewFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('styles/scss/main.scss')
      }));
      
      for(var loopPath of ['styles/css/extra.css','styles/mixins.scss']){
        it.apply(this,should.not.haveTheSameContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $model:paths.from(loopPath),
          $compared:paths.to(loopPath)
        }));
      }
      
      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.to('styles'),
        $files:6,
        $folders:2
      }));
      
      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.to('styles/css'),
        $files:3,
        $folders:0
      }));
      
      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.to('styles/scss'),
        $files:1,
        $folders:0
      }));
      
      it.apply(this,should.not.keepPreviousContents({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.to('styles')
      }));
      
      it.apply(this,should.keepPreviousContents({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.to('styles/css')
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:9
      }));
      
      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $callbackTimes:1
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:9,
        $properties:{
          success: null,
          warning: `The already existing folder "${paths.rel('styles')}" was successfully merged with the "${paths.from('styles')}" folder, but at least one of its child items gave warning.`,
          fail: null,
          item: 'dir',
          from: paths.from('styles'),
          action: 'merge',
          overwritten: false,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('styles'),
          absolute:paths.to('styles')
        }
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:9,
        $properties:{
          fail: null,
          warning: null,
          success: `The folder "${paths.rel('styles/scss')}" was successfully merged with the "${paths.from('styles/scss')}" folder.`,
          item: 'dir',
          from: paths.from('styles/scss'),
          action: 'merge',
          overwritten: false,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('styles/scss'),
          absolute:paths.to('styles/scss')
        }
      }));
      
      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:9,
        $properties:{
          success: null,
          warning: `The already existing folder "${paths.rel('styles/css')}" was successfully merged with the "${paths.from('styles/css')}" folder, but at least one of its child items gave warning.`,
          fail:null,
          item: 'dir',
          from: paths.from('styles/css'),
          action: 'merge',
          overwritten: false,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('styles/css'),
          absolute:paths.to('styles/css')
        }
      }));

      
      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:9,
        $properties:{
          success: `The file "${paths.rel('styles/scss/main.scss')}" was successfully copied from the "${paths.from('styles/scss/main.scss')}" path.`,
          warning: null,
          fail: null,
          item: 'file',
          from: paths.from('styles/scss/main.scss'),
          action: 'copy',
          overwritten: false,
          root:path.join(paths.rootDir,paths.toDir),
          relative:paths.rel('styles/scss/main.scss'),
          absolute:paths.to('styles/scss/main.scss')
        }
      }));
      
      for(var loopPath of ['styles/css/style.css','styles/css/main.css','styles/css/extra.css','styles/mixins.scss','styles/imports.scss']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:9,
          $properties:{
            success: null,
            warning: `The already existing file "${paths.rel(loopPath)}" could not be overwritten by the file copied from the "${paths.from(loopPath)}" path, due to the "overwrite" property settings.`,
            fail: null,
            item: 'file',
            from: paths.from(loopPath),
            action: 'copy',
            overwritten: false,
            root:path.join(paths.rootDir,paths.toDir),
            relative:paths.rel(loopPath),
            absolute:paths.to(loopPath)
          }
        }));
      }

      it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $callbackTimes:1,
          $properties:{
            error:null,
            files:{
              success:[paths.to('styles/scss/main.scss')],
              warning:jasmine.arrayContaining([
                paths.to('styles/css/style.css'),
                paths.to('styles/css/main.css'),
                paths.to('styles/css/extra.css'),
                paths.to('styles/mixins.scss'),
                paths.to('styles/imports.scss')
              ]),
              fail:[]
            },
            dirs:{
              success:[paths.to('styles/scss')],
              warning:jasmine.arrayContaining([
                paths.to('styles'),
                paths.to('styles/css')
              ]),
              fail:[]
            },
            root:path.join(paths.rootDir,paths.toDir)
          }
        }));
    
  });
});