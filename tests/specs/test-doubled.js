/* global expect, it */


const path = require('path');
const helpers = path.resolve('./tests/helpers');
const testingModule = require(path.resolve('./index.js'));

const prepare = require(path.resolve(helpers,'prepare.js'));
const paths = require(path.resolve(helpers,'paths.js'));
const data = require(path.resolve(helpers,'structures.json'));
const should = require(path.resolve(helpers,'should.js'));


describe(`When the structure contains more than one items`,function(){
  beforeEach(function(done){
    prepare.remove()
    .then(()=>prepare.resetFrom())
    .then(()=>prepare.resetTo())
    .then(done)
    .catch(done.fail);
  });

  describe(`that have the 'file' property of the same value`,function(){
    describe(`and any action property`,function(){
      beforeEach(function(){
        this.structure = [
          {file:paths.name('prod.css'), overwrite:true},
          {file:paths.name('prod.css'), overwrite:true},
          {file:paths.name('dist.css'), overwrite:false},
          {file:paths.name('dist.css'), overwrite:false}
        ];
      });

      for(var item of ['prod.css','dist.css']){
        it.apply(this,should.createNewFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(item)
        }));
        it.apply(this,should.haveContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(item),
          $content:''
        }));
      }

      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.toDir,
        $files:2,
        $folders:0
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:4
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $callbackTimes:1
      }));

      for(var item of ['prod.css','dist.css']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:4,
          $properties:{
            failure: null,
            warning: null,
            success: `The file "${paths.name(item)}" was successfully created.`,
            item: 'file',
            from: null,
            action: 'create',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel(item),
            absolute:paths.to(item)
          }
        }));
      }

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:4,
        $properties:{
          failure: null,
          warning: null,
          success: `The already existing file "${paths.name('prod.css')}" was successfully overwritten by the newly created file.`,
          item: 'file',
          from: null,
          action: 'create',
          overwritten: true,
          root:paths.toDir,
          relative:paths.rel('prod.css'),
          absolute:paths.to('prod.css')
        }
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:4,
        $properties:{
          failure: null,
          warning: `The already existing file "${paths.name('dist.css')}" could not be overwritten by the newly created file, due to the "overwrite" property settings.`,
          success: null,
          item: 'file',
          from: null,
          action: 'create',
          overwritten: false,
          root:paths.toDir,
          relative:paths.rel('dist.css'),
          absolute:paths.to('dist.css')
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
            warning:[paths.to('dist.css')],
            success:jasmine.arrayContaining([
                paths.to('dist.css'),
                paths.to('prod.css'),
                paths.to('prod.css')
              ]),
            failure:[]
          },
          dirs:{
            success:[],
            warning:[],
            failure:[]
          },
          root:paths.toDir
        }
      }));

    });
    describe(`and 'move' property`,function(){
      beforeEach(function(){
        this.structure = [
          {file:paths.name('prod.css'), move:paths.from('prod.css'), overwrite:true},
          {file:paths.name('prod.css'), move:paths.from('prod.css'), overwrite:true},
          {file:paths.name('dist.css'), move:paths.from('dist.css'), overwrite:false},
          {file:paths.name('dist.css'), move:paths.from('dist.css'), overwrite:false}
        ];
      });

      for(var item of ['prod.css','dist.css']){
        it.apply(this,should.createNewFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(item)
        }));

        it.apply(this,should.removeFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.from(item)
        }));

        it.apply(this,should.haveContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(item),
          $content:data[item].content
        }));
      }

      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.toDir,
        $files:2,
        $folders:0
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:4
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $callbackTimes:1
      }));

      for(var item of ['prod.css','dist.css']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:4,
          $properties:{
            failure: null,
            warning: null,
            success: `The file "${paths.rel(item)}" was successfully moved from the "${paths.from(item)}" path.`,
            item: 'file',
            from: paths.from(item),
            action: 'move',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel(item),
            absolute:paths.to(item)
          }
        }));
        
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:4,
          $properties:{
            success: null,
            warning: null,
            failure: `The already existing file "${paths.rel(item)}" could not be overwritten by the file moved from the "${paths.from(item)}" path, because this file has been already moved.`,
            item: 'file',
            from: paths.from(item),
            action: 'move',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel(item),
            absolute:paths.to(item)
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
              paths.to('prod.css'),
              paths.to('dist.css')
            ]),
            warning:[],
            failure:jasmine.arrayContaining([
              paths.to('prod.css'),
              paths.to('dist.css')
            ])
          },
          dirs:{
            success:[],
            warning:[],
            failure:[]
          },
          root:paths.toDir
        }
      }));


    });
    describe(`and 'copy' property`,function(){
      beforeEach(function(){
        this.structure = [
          {file:paths.name('prod.css'), copy:paths.from('prod.css'), overwrite:true},
          {file:paths.name('prod.css'), copy:paths.from('prod.css'), overwrite:true},
          {file:paths.name('dist.css'), copy:paths.from('dist.css'), overwrite:false},
          {file:paths.name('dist.css'), copy:paths.from('dist.css'), overwrite:false}
        ];
      });

      for(var item of ['prod.css','dist.css']){
        it.apply(this,should.createNewFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(item)
        }));

        it.apply(this,should.not.removeFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.from(item)
        }));

        it.apply(this,should.haveContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(item),
          $content:data[item].content
        }));

        it.apply(this,should.haveTheSameContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $model:paths.from(item),
          $compared:paths.to(item)
        }));
      }

      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.toDir,
        $files:2,
        $folders:0
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:4
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $callbackTimes:1
      }));

      for(var item of ['prod.css','dist.css']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:4,
          $properties:{
            failure: null,
            warning: null,
            success: `The file "${paths.rel(item)}" was successfully copied from the "${paths.from(item)}" path.`,
            item: 'file',
            from: paths.from(item),
            action: 'copy',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel(item),
            absolute:paths.to(item)
          }
        }));
      }

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:4,
        $properties:{
          failure: null,
          warning: null,
          success: `The already existing file "${paths.rel('prod.css')}" was successfully overwritten by the file copied from the "${paths.from('prod.css')}" path.`,
          item: 'file',
          from: paths.from('prod.css'),
          action: 'copy',
          overwritten: true,
          root:paths.toDir,
          relative:paths.rel('prod.css'),
          absolute:paths.to('prod.css')
        }
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:4,
        $properties:{
          failure: null,
          warning: `The already existing file "${paths.rel('dist.css')}" could not be overwritten by the file copied from the "${paths.from('dist.css')}" path, due to the "overwrite" property settings.`,
          success: null,
          item: 'file',
          from: paths.from('dist.css'),
          action: 'copy',
          overwritten: false,
          root:paths.toDir,
          relative:paths.rel('dist.css'),
          absolute:paths.to('dist.css')
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
              paths.to('prod.css'),
              paths.to('prod.css'),
              paths.to('dist.css')
            ]),
            warning:[paths.to('dist.css')],
            failure:[]
          },
          dirs:{
            success:[],
            warning:[],
            failure:[]
          },
          root:paths.toDir
        }
      }));

    });
    describe(`and one has 'copy' and other one has 'move' property`,function(){
      beforeEach(function(){
        this.structure = [
          {file:paths.name('prod.css'), copy:paths.from('prod.css'), overwrite:true},
          {file:paths.name('prod.css'), move:paths.from('prod.css'), overwrite:true},
          {file:paths.name('dist.css'), copy:paths.from('dist.css'), overwrite:false},
          {file:paths.name('dist.css'), move:paths.from('dist.css'), overwrite:false}
        ];
      });

      for(var item of ['prod.css','dist.css']){
        it.apply(this,should.createNewFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(item)
        }));
      }

      it.apply(this,should.removeFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.from('prod.css')
      }));

      it.apply(this,should.not.removeFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.from('dist.css')
      }));

      it.apply(this,should.haveContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to(item),
        $content:data[item].content
      }));

      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.toDir,
        $files:2,
        $folders:0
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:4
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $callbackTimes:1
      }));

      for(var item of ['prod.css','dist.css']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:4,
          $properties:{
            failure: null,
            warning: null,
            success: `The file "${paths.rel(item)}" was successfully copied from the "${paths.from(item)}" path.`,
            item: 'file',
            from: paths.from(item),
            action: 'copy',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel(item),
            absolute:paths.to(item)
          }
        }));
      }

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:4,
        $properties:{
          failure: null,
          warning: null,
          success: `The already existing file "${paths.rel('prod.css')}" was successfully overwritten by the file moved from the "${paths.from('prod.css')}" path.`,
          item: 'file',
          from: paths.from('prod.css'),
          action: 'move',
          overwritten: true,
          root:paths.toDir,
          relative:paths.rel('prod.css'),
          absolute:paths.to('prod.css')
        }
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:4,
        $properties:{
          failure: null,
          warning: `The already existing file "${paths.rel('dist.css')}" could not be overwritten by the file moved from the "${paths.from('dist.css')}" path, due to the "overwrite" property settings.`,
          success: null,
          item: 'file',
          from: paths.from('dist.css'),
          action: 'move',
          overwritten: false,
          root:paths.toDir,
          relative:paths.rel('dist.css'),
          absolute:paths.to('dist.css')
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
                paths.to('prod.css'),
                paths.to('prod.css'),
                paths.to('dist.css')
              ]),
            warning:[paths.to('dist.css')],
            failure:[]
          },
          dirs:{
            success:[],
            warning:[],
            failure:[]
          },
          root:paths.toDir
        }
      }));


    });
    describe(`and one has 'move' and other one has 'copy' property`,function(){
      beforeEach(function(){
        this.structure = [
          {file:paths.name('prod.css'), move:paths.from('prod.css'), overwrite:true},
          {file:paths.name('prod.css'), copy:paths.from('prod.css'), overwrite:true},
          {file:paths.name('dist.css'), move:paths.from('dist.css'), overwrite:false},
          {file:paths.name('dist.css'), copy:paths.from('dist.css'), overwrite:false}
        ];
      });

      for(var item of ['prod.css','dist.css']){
        it.apply(this,should.createNewFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(item)
        }));
        
        it.apply(this,should.removeFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.from(item)
        }));

        it.apply(this,should.haveContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(item),
          $content:data[item].content
        }));
      }

      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.toDir,
        $files:2,
        $folders:0
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:4
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $callbackTimes:1
      }));

      for(var item of ['prod.css','dist.css']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:4,
          $properties:{
            failure: null,
            warning: null,
            success: `The file "${paths.rel(item)}" was successfully moved from the "${paths.from(item)}" path.`,
            item: 'file',
            from: paths.from(item),
            action: 'move',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel(item),
            absolute:paths.to(item)
          }
        }));

        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:4,
          $properties:{
            success: null,
            warning: null,
            failure: `The already existing file "${paths.rel(item)}" could not be overwritten by the file copied from the "${paths.from(item)}" path, because this file has been already moved.`,
            item: 'file',
            from: paths.from(item),
            action: 'copy',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel(item),
            absolute:paths.to(item)
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
              paths.to('prod.css'),
              paths.to('dist.css')
            ]),
            warning:[],
            failure:jasmine.arrayContaining([
              paths.to('prod.css'),
              paths.to('dist.css')
            ])
          },
          dirs:{
            success:[],
            warning:[],
            failure:[]
          },
          root:paths.toDir
        }
      }));

    });
    describe(`and one has 'move' and other one has 'writeFrom' property`,function(){
      beforeEach(function(){
        this.structure = [
          {file:paths.name('prod.css'), move:paths.from('prod.css'), overwrite:true},
          {file:paths.name('prod.css'), writeFrom:paths.from('prod.css'), overwrite:true},
          {file:paths.name('dist.css'), move:paths.from('dist.css'), overwrite:false},
          {file:paths.name('dist.css'), writeFrom:paths.from('dist.css'), overwrite:false}
        ];
      });

      for(var item of ['prod.css','dist.css']){
        it.apply(this,should.createNewFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(item)
        }));
        
        it.apply(this,should.removeFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.from(item)
        }));

        it.apply(this,should.haveContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(item),
          $content:data[item].content
        }));
      }

      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.toDir,
        $files:2,
        $folders:0
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:4
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $callbackTimes:1
      }));


      for(var item of ['prod.css','dist.css']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:4,
          $properties:{
            failure: null,
            warning: null,
            success: `The file "${paths.rel(item)}" was successfully moved from the "${paths.from(item)}" path.`,
            item: 'file',
            from: paths.from(item),
            action: 'move',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel(item),
            absolute:paths.to(item)
          }
        }));
      }

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:4,
        $properties:{
          success: null,
          warning: null,
          failure: `The already existing file "${paths.rel('prod.css')}" could not be overwritten with the content from the "${paths.from('prod.css')}" file, because this file has been already moved.`,
          item: 'file',
          from: paths.from('prod.css'),
          action: 'writeFrom',
          overwritten: false,
          root:paths.toDir,
          relative:paths.rel('prod.css'),
          absolute:paths.to('prod.css')
        }
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:4,
        $properties:{
          success: null,
          warning: null,
          failure: `The content from the "${paths.from('dist.css')}" file could not be appended to the "${paths.rel('dist.css')}" file, because this file has been already moved.`,
          item: 'file',
          from: paths.from('dist.css'),
          action: 'writeFrom',
          overwritten: false,
          root:paths.toDir,
          relative:paths.rel('dist.css'),
          absolute:paths.to('dist.css')
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
              paths.to('prod.css'),
              paths.to('dist.css')
            ]),
            warning:[],
            failure:jasmine.arrayContaining([
              paths.to('prod.css'),
              paths.to('dist.css')
            ])
          },
          dirs:{
            success:[],
            warning:[],
            failure:[]
          },
          root:paths.toDir
        }
      }));

    });
    describe(`and 'write' property`,function(){
      beforeEach(function(){
        this.structure = [
          {file:paths.name('prod.css'), write:data['prod.css'].content, overwrite:true},
          {file:paths.name('prod.css'), write:data['dist.css'].content, overwrite:true},
          {file:paths.name('dist.css'), write:data['prod.css'].content, overwrite:false},
          {file:paths.name('dist.css'), write:data['dist.css'].content, overwrite:false}
        ];
      });

      for(var item of ['prod.css','dist.css']){
        it.apply(this,should.createNewFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(item)
        }));
      }

      it.apply(this,should.haveContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css'),
        $content:data['dist.css'].content
      }));

      it.apply(this,should.haveContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('dist.css'),
        $content:data['prod.css'].content + data['dist.css'].content
      }));

      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.toDir,
        $files:2,
        $folders:0
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:4
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $callbackTimes:1
      }));

      for(var item of ['prod.css','dist.css']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:4,
          $properties:{
            failure: null,
            warning: null,
            success: `The file "${paths.rel(item)}" was successfully created with the given content.`,
            item: 'file',
            from: null,
            action: 'write',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel(item),
            absolute:paths.to(item)
          }
        }));
      }

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:4,
        $properties:{
          failure: null,
          warning: null,
          success: `The content of "${paths.rel('prod.css')}" file was successfully overwritten with the given content.`,
          item: 'file',
          from: null,
          action: 'write',
          overwritten: true,
          root:paths.toDir,
          relative:paths.rel('prod.css'),
          absolute:paths.to('prod.css')
        }
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:4,
        $properties:{
          failure: null,
          warning: null,
          success: `The given content was successfully appended to the "${paths.rel('dist.css')}" file.`,
          item: 'file',
          from: null,
          action: 'write',
          overwritten: false,
          root:paths.toDir,
          relative:paths.rel('dist.css'),
          absolute:paths.to('dist.css')
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
              paths.to('prod.css'),
              paths.to('prod.css'),
              paths.to('dist.css'),
              paths.to('dist.css')
            ]),
            warning:[],
            failure:[]
          },
          dirs:{
            success:[],
            warning:[],
            failure:[]
          },
          root:paths.toDir
        }
      }));

    });
    describe(`and 'writeFrom' property`,function(){
      beforeEach(function(){
        this.structure = [
          {file:paths.name('prod.css'), writeFrom:paths.from('prod.css'), overwrite:true},
          {file:paths.name('prod.css'), writeFrom:paths.from('prod.css'), overwrite:true},
          {file:paths.name('dist.css'), writeFrom:paths.from('dist.css'), overwrite:false},
          {file:paths.name('dist.css'), writeFrom:paths.from('dist.css'), overwrite:false}
        ];
      });

      for(var item of ['prod.css','dist.css']){
        it.apply(this,should.createNewFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(item)
        }));
      }

      it.apply(this,should.haveContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css'),
        $content:data['prod.css'].content
      }));

      it.apply(this,should.haveContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('dist.css'),
        $content:data['dist.css'].content + data['dist.css'].content
      }));

      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.toDir,
        $files:2,
        $folders:0
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:4
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $callbackTimes:1
      }));

      for(var item of ['prod.css','dist.css']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:4,
          $properties:{
            failure: null,
            warning: null,
            success: `The file "${paths.rel(item)}" was successfully created with the content from the "${paths.from(item)}" file.`,
            item: 'file',
            from: paths.from(item),
            action: 'writeFrom',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel(item),
            absolute:paths.to(item)
          }
        }));
      }

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:4,
        $properties:{
          failure: null,
          warning: null,
          success: `The already existing file "${paths.rel('prod.css')}" was successfully overwritten with the content from the "${paths.from('prod.css')}" file.`,
          item: 'file',
          from: paths.from('prod.css'),
          action: 'writeFrom',
          overwritten: true,
          root:paths.toDir,
          relative:paths.rel('prod.css'),
          absolute:paths.to('prod.css')
        }
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:4,
        $properties:{
          failure: null,
          warning: null,
          success: `The content from the "${paths.from('dist.css')}" file was successfully appended to the "${paths.rel('dist.css')}" file.`,
          item: 'file',
          from: paths.from('dist.css'),
          action: 'writeFrom',
          overwritten: false,
          root:paths.toDir,
          relative:paths.rel('dist.css'),
          absolute:paths.to('dist.css')
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
              paths.to('prod.css'),
              paths.to('prod.css'),
              paths.to('dist.css'),
              paths.to('dist.css')
            ]),
            warning:[],
            failure:[]
          },
          dirs:{
            success:[],
            warning:[],
            failure:[]
          },
          root:paths.toDir
        }
      }));

    });
  });

  describe(`that have the 'file' property of the same value and 'beforeWrite' property`,function(){
    describe(`and 'move' property`,function(){
      beforeEach(function(){
        this.structure = [
          {file:paths.name('prod.css'), move:paths.from('prod.css'), overwrite:true, beforeWrite:before},
          {file:paths.name('prod.css'), move:paths.from('prod.css'), overwrite:true, beforeWrite:before},
          {file:paths.name('dist.css'), move:paths.from('dist.css'), overwrite:false, beforeWrite:before},
          {file:paths.name('dist.css'), move:paths.from('dist.css'), overwrite:false, beforeWrite:before}
        ];

        function before(getData,resolve){
          resolve(getData + data['styles/css/main.css'].content);
        }
      });

      for(var item of ['prod.css','dist.css']){
        it.apply(this,should.createNewFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(item)
        }));
        
        it.apply(this,should.removeFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.from(item)
        }));

        it.apply(this,should.haveContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(item),
          $content:data[item].content + data['styles/css/main.css'].content
        }));
      }

      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.toDir,
        $files:2,
        $folders:0
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:4
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $callbackTimes:1
      }));

      for(var item of ['prod.css','dist.css']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:4,
          $properties:{
            failure: null,
            warning: null,
            success: `The file "${paths.rel(item)}" was successfully moved with modified content from the "${paths.from(item)}" path.`,
            item: 'file',
            from: paths.from(item),
            action: 'move',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel(item),
            absolute:paths.to(item)
          }
        }));
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:4,
          $properties:{
            success: null,
            warning: null,
            failure: `The already existing file "${paths.rel(item)}" could not be overwritten by the file moved with modified content from the "${paths.from(item)}" path, because this file has been already moved.`,
            item: 'file',
            from: paths.from(item),
            action: 'move',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel(item),
            absolute:paths.to(item)
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
              paths.to('prod.css'),
              paths.to('dist.css')
            ]),
            warning:[],
            failure:jasmine.arrayContaining([
              paths.to('prod.css'),
              paths.to('dist.css')
            ])
          },
          dirs:{
            success:[],
            warning:[],
            failure:[]
          },
          root:paths.toDir
        }
      }));

    });
    describe(`and 'copy' property`,function(){
      beforeEach(function(){
        this.structure = [
          {file:paths.name('prod.css'), copy:paths.from('prod.css'), overwrite:true, beforeWrite:before},
          {file:paths.name('prod.css'), copy:paths.from('prod.css'), overwrite:true, beforeWrite:before},
          {file:paths.name('dist.css'), copy:paths.from('dist.css'), overwrite:false, beforeWrite:before},
          {file:paths.name('dist.css'), copy:paths.from('dist.css'), overwrite:false, beforeWrite:before}
        ];

        function before(getData,resolve){
          resolve(getData + data['styles/css/main.css'].content);
        }
      });

      for(var item of ['prod.css','dist.css']){
        it.apply(this,should.createNewFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(item)
        }));
        
        it.apply(this,should.not.removeFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.from(item)
        }));
        
        it.apply(this,should.haveContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(item),
          $content:data[item].content + data['styles/css/main.css'].content
        }));
      }

      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.toDir,
        $files:2,
        $folders:0
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:4
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $callbackTimes:1
      }));

      for(var item of ['prod.css','dist.css']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:4,
          $properties:{
            failure: null,
            warning: null,
            success: `The file "${paths.rel(item)}" was successfully copied with modified content from the "${paths.from(item)}" path.`,
            item: 'file',
            from: paths.from(item),
            action: 'copy',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel(item),
            absolute:paths.to(item)
          }
        }));
      }

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:4,
        $properties:{
          failure: null,
          warning: null,
          success: `The already existing file "${paths.rel('prod.css')}" was successfully overwritten by the file copied with modified content from the "${paths.from('prod.css')}" path.`,
          item: 'file',
          from: paths.from('prod.css'),
          action: 'copy',
          overwritten: true,
          root:paths.toDir,
          relative:paths.rel('prod.css'),
          absolute:paths.to('prod.css')
        }
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:4,
        $properties:{
          failure: null,
          warning: `The already existing file "${paths.rel('dist.css')}" could not be overwritten by the file copied with modified content from the "${paths.from('dist.css')}" path, due to the "overwrite" property settings.`,
          success: null,
          item: 'file',
          from: paths.from('dist.css'),
          action: 'copy',
          overwritten: false,
          root:paths.toDir,
          relative:paths.rel('dist.css'),
          absolute:paths.to('dist.css')
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
              paths.to('prod.css'),
              paths.to('prod.css'),
              paths.to('dist.css')
            ]),
            warning:[paths.to('dist.css')],
            failure:[]
          },
          dirs:{
            success:[],
            warning:[],
            failure:[]
          },
          root:paths.toDir
        }
      }));

    });
    describe(`and 'write' property`,function(){
      beforeEach(function(){
        this.structure = [
          {file:paths.name('prod.css'), write:data['prod.css'].content, overwrite:true, beforeWrite:before},
          {file:paths.name('prod.css'), write:data['dist.css'].content, overwrite:true, beforeWrite:before},
          {file:paths.name('dist.css'), write:data['prod.css'].content, overwrite:false, beforeWrite:before},
          {file:paths.name('dist.css'), write:data['dist.css'].content, overwrite:false, beforeWrite:before}
        ];

        function before(getData,resolve){
          resolve(getData + data['styles/css/main.css'].content);
        }
      });

      for(var item of ['prod.css','dist.css']){
        it.apply(this,should.createNewFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(item)
        }));
      }

      it.apply(this,should.haveContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css'),
        $content:data['dist.css'].content + data['styles/css/main.css'].content
      }));

      it.apply(this,should.haveContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('dist.css'),
        $content:data['prod.css'].content + data['styles/css/main.css'].content + data['dist.css'].content + data['styles/css/main.css'].content
      }));

      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.toDir,
        $files:2,
        $folders:0
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:4
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $callbackTimes:1
      }));

      for(var item of ['prod.css','dist.css']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:4,
          $properties:{
            failure: null,
            warning: null,
            success: `The file "${paths.rel(item)}" was successfully created with the given modified content.`,
            item: 'file',
            from: null,
            action: 'write',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel(item),
            absolute:paths.to(item)
          }
        }));
      }

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:4,
        $properties:{
          failure: null,
          warning: null,
          success: `The content of "${paths.rel('prod.css')}" file was successfully overwritten with the given modified content.`,
          item: 'file',
          from: null,
          action: 'write',
          overwritten: true,
          root:paths.toDir,
          relative:paths.rel('prod.css'),
          absolute:paths.to('prod.css')
        }
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:4,
        $properties:{
          failure: null,
          warning: null,
          success: `The given modified content was successfully appended to the "${paths.rel('dist.css')}" file.`,
          item: 'file',
          from: null,
          action: 'write',
          overwritten: false,
          root:paths.toDir,
          relative:paths.rel('dist.css'),
          absolute:paths.to('dist.css')
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
              paths.to('prod.css'),
              paths.to('prod.css'),
              paths.to('dist.css'),
              paths.to('dist.css')
            ]),
            warning:[],
            failure:[]
          },
          dirs:{
            success:[],
            warning:[],
            failure:[]
          },
          root:paths.toDir
        }
      }));

    });
    describe(`and 'writeFrom' property`,function(){
      beforeEach(function(){
        this.structure = [
          {file:paths.name('prod.css'), writeFrom:paths.from('prod.css'), overwrite:true, beforeWrite:before},
          {file:paths.name('prod.css'), writeFrom:paths.from('prod.css'), overwrite:true, beforeWrite:before},
          {file:paths.name('dist.css'), writeFrom:paths.from('dist.css'), overwrite:false, beforeWrite:before},
          {file:paths.name('dist.css'), writeFrom:paths.from('dist.css'), overwrite:false, beforeWrite:before}
        ];

        function before(getData,resolve){
          resolve(getData + data['styles/css/main.css'].content);
        }
      });

      for(var item of ['prod.css','dist.css']){
        it.apply(this,should.createNewFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(item)
        }));
      }

      it.apply(this,should.haveContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('prod.css'),
        $content:data['prod.css'].content + data['styles/css/main.css'].content
      }));

      it.apply(this,should.haveContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('dist.css'),
        $content:data['dist.css'].content + data['styles/css/main.css'].content + data['dist.css'].content + data['styles/css/main.css'].content
      }));

      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.toDir,
        $files:2,
        $folders:0
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:4
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $callbackTimes:1
      }));

      for(var item of ['prod.css','dist.css']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:4,
          $properties:{
            failure: null,
            warning: null,
            success: `The file "${paths.rel(item)}" was successfully created with the modified content from the "${paths.from(item)}" file.`,
            item: 'file',
            from: paths.from(item),
            action: 'writeFrom',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel(item),
            absolute:paths.to(item)
          }
        }));
      }

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:4,
        $properties:{
          failure: null,
          warning: null,
          success: `The already existing file "${paths.rel('prod.css')}" was successfully overwritten with the modified content from the "${paths.from('prod.css')}" file.`,
          item: 'file',
          from: paths.from('prod.css'),
          action: 'writeFrom',
          overwritten: true,
          root:paths.toDir,
          relative:paths.rel('prod.css'),
          absolute:paths.to('prod.css')
        }
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:4,
        $properties:{
          failure: null,
          warning: null,
          success: `The modified content from the "${paths.from('dist.css')}" file was successfully appended to the "${paths.rel('dist.css')}" file.`,
          item: 'file',
          from: paths.from('dist.css'),
          action: 'writeFrom',
          overwritten: false,
          root:paths.toDir,
          relative:paths.rel('dist.css'),
          absolute:paths.to('dist.css')
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
              paths.to('prod.css'),
              paths.to('prod.css'),
              paths.to('dist.css'),
              paths.to('dist.css')
            ]),
            warning:[],
            failure:[]
          },
          dirs:{
            success:[],
            warning:[],
            failure:[]
          },
          root:paths.toDir
        }
      }));

    });
  });

  describe(`that have the 'dir' property of the same value`,function(){
    describe(`and any action property`,function(){
      beforeEach(function(){
        this.structure = [
          {dir:paths.name('styles'), overwrite:true},
          {dir:paths.name('styles'), overwrite:true},
          {dir:paths.name('scripts'), overwrite:false},
          {dir:paths.name('scripts'), overwrite:false}
        ];
      });

      for(var item of ['styles','scripts']){
        it.apply(this,should.createNewFolder({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $folder:paths.to(item)
        }));
      }

      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.toDir,
        $files:0,
        $folders:2
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:4
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $callbackTimes:1
      }));

      for(var item of ['styles','scripts']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:4,
          $properties:{
            failure: null,
            warning: null,
            success: `The folder "${paths.rel(item)}" was successfully created.`,
            item: 'dir',
            from: null,
            action: 'create',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel(item),
            absolute:paths.to(item)
          }
        }));
      }

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:4,
        $properties:{
          failure: null,
          warning: null,
          success: `The already existing folder "${paths.rel('styles')}" was successfully overwritten by the newly created folder.`,
          item: 'dir',
          from: null,
          action: 'create',
          overwritten: true,
          root:paths.toDir,
          relative:paths.rel('styles'),
          absolute:paths.to('styles')
        }
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:4,
        $properties:{
          failure: null,
          warning: `The already existing folder "${paths.rel('scripts')}" could not be overwritten by the newly created folder, due to the "overwrite" property settings.`,
          success: null,
          item: 'dir',
          from: null,
          action: 'create',
          overwritten: false,
          root:paths.toDir,
          relative:paths.rel('scripts'),
          absolute:paths.to('scripts')
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
            failure:[]
          },
          dirs:{
            success:jasmine.arrayContaining([
              paths.to('styles'),
              paths.to('styles'),
              paths.to('scripts')
            ]),
            warning:[paths.to('scripts')],
            failure:[]
          },
          root:paths.toDir
        }
      }));

    });
    describe(`and 'move' property`,function(){
      beforeEach(function(){
        this.structure = [
          {dir:paths.name('styles'), move:paths.from('styles'), overwrite:true},
          {dir:paths.name('styles'), move:paths.from('styles'), overwrite:true},
          {dir:paths.name('scripts'), move:paths.from('scripts'), overwrite:false},
          {dir:paths.name('scripts'), move:paths.from('scripts'), overwrite:false}
        ];
      });

      for(var item of ['styles','scripts','styles/css','styles/scss']){
        it.apply(this,should.createNewFolder({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $folder:paths.to(item)
        }));
        it.apply(this,should.removeFolder({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $folder:paths.from(item)
        }));
      }

      for(var item of ['styles/mixins.scss','styles/imports.scss','styles/css/main.css','styles/css/style.css','styles/css/extra.css','styles/scss/main.scss','scripts/ajax.js']){
        it.apply(this,should.createNewFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(item)
        }));

        it.apply(this,should.removeFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.from(item)
        }));

        it.apply(this,should.haveContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(item),
          $content:data[item].content
        }));
      }

      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.toDir,
        $files:7,
        $folders:4
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:13
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $callbackTimes:1
      }));

      for(var item of ['styles','scripts','styles/css','styles/scss']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:13,
          $properties:{
            failure: null,
            warning: null,
            success: `The folder "${paths.rel(item)}" was successfully moved from the "${paths.from(item)}" path.`,
            item: 'dir',
            from: paths.from(item),
            action: 'move',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel(item),
            absolute:paths.to(item)
          }
        }));
      }

      for(var item of ['styles','scripts']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:13,
          $properties:{
            warning: null,
            failure: `The already existing folder "${paths.rel(item)}" could not be overwritten by the folder moved from the "${paths.from(item)}" path, because this folder has been already moved.`,
            success: null,
            item: 'dir',
            from: paths.from(item),
            action: 'move',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel(item),
            absolute:paths.to(item)
          }
        }));
      }

      for(var item of ['styles/mixins.scss','styles/imports.scss','styles/css/main.css','styles/css/style.css','styles/css/extra.css','styles/scss/main.scss','scripts/ajax.js']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:13,
          $properties:{
            failure: null,
            warning: null,
            success: `The file "${paths.rel(item)}" was successfully moved from the "${paths.from(item)}" path.`,
            item: 'file',
            from: paths.from(item),
            action: 'move',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel(item),
            absolute:paths.to(item)
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
              paths.to('styles/mixins.scss'),
              paths.to('styles/imports.scss'),
              paths.to('styles/css/main.css'),
              paths.to('styles/css/style.css'),
              paths.to('styles/css/extra.css'),
              paths.to('styles/scss/main.scss'),
              paths.to('scripts/ajax.js')
            ]),
            warning:[],
            failure:[]
          },
          dirs:{
            success:jasmine.arrayContaining([
              paths.to('styles'),
              paths.to('scripts'),
              paths.to('styles/css'),
              paths.to('styles/scss')
            ]),
            warning:[],
            failure:jasmine.arrayContaining([
              paths.to('styles'),
              paths.to('scripts')
            ])
          },
          root:paths.toDir
        }
      }));

    });
    describe(`and 'copy' property`,function(){
      beforeEach(function(){
        this.structure = [
          {dir:paths.name('styles'), copy:paths.from('styles'), overwrite:true},
          {dir:paths.name('styles'), copy:paths.from('styles'), overwrite:true},
          {dir:paths.name('scripts'), copy:paths.from('scripts'), overwrite:false},
          {dir:paths.name('scripts'), copy:paths.from('scripts'), overwrite:false}
        ];
      });

      for(var item of ['styles','scripts','styles/css','styles/scss']){
        it.apply(this,should.createNewFolder({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $folder:paths.to(item)
        }));

        it.apply(this,should.not.removeFolder({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $folder:paths.from(item)
        }));

      }

      for(var item of ['styles/mixins.scss','styles/imports.scss','styles/css/main.css','styles/css/style.css','styles/css/extra.css','styles/scss/main.scss','scripts/ajax.js']){
        it.apply(this,should.createNewFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(item)
        }));

        it.apply(this,should.not.removeFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.from(item)
        }));

        it.apply(this,should.haveTheSameContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $model:paths.from(item),
          $compared:paths.to(item)
        }));
      }

      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.toDir,
        $files:7,
        $folders:4
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:21
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $callbackTimes:1
      }));

      for(var item of ['styles/mixins.scss','styles/imports.scss','styles/css/main.css','styles/css/style.css','styles/css/extra.css','styles/scss/main.scss','scripts/ajax.js']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:21,
          $properties:{
            failure: null,
            warning: null,
            success: `The file "${paths.rel(item)}" was successfully copied from the "${paths.from(item)}" path.`,
            item: 'file',
            from: paths.from(item),
            action: 'copy',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel(item),
            absolute:paths.to(item)
          }
        }));
      }

      for(var item of ['styles/mixins.scss','styles/imports.scss','styles/css/main.css','styles/css/style.css','styles/css/extra.css','styles/scss/main.scss']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:21,
          $properties:{
            failure: null,
            warning: null,
            success: `The already existing file "${paths.rel(item)}" was successfully overwritten by the file copied from the "${paths.from(item)}" path.`,
            item: 'file',
            from: paths.from(item),
            action: 'copy',
            overwritten: true,
            root:paths.toDir,
            relative:paths.rel(item),
            absolute:paths.to(item)
          }
        }));
      }

      for(var item of ['styles','scripts','styles/css','styles/scss']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:21,
          $properties:{
            failure: null,
            warning: null,
            success: `The folder "${paths.rel(item)}" was successfully copied from the "${paths.from(item)}" path.`,
            item: 'dir',
            from: paths.from(item),
            action: 'copy',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel(item),
            absolute:paths.to(item)
          }
        }));
      }

      for(var item of ['styles','styles/css','styles/scss']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:21,
          $properties:{
            failure: null,
            warning: null,
            success: `The already existing folder "${paths.rel(item)}" was successfully overwritten by the folder copied from the "${paths.from(item)}" path.`,
            item: 'dir',
            from: paths.from(item),
            action: 'copy',
            overwritten: true,
            root:paths.toDir,
            relative:paths.rel(item),
            absolute:paths.to(item)
          }
        }));
      }

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:21,
        $properties:{
          failure: null,
          warning: `The already existing folder "${paths.rel('scripts')}" could not be overwritten by the folder copied from the "${paths.from('scripts')}" path, due to the "overwrite" property settings.`,
          success: null,
          item: 'dir',
          from: paths.from('scripts'),
          action: 'copy',
          overwritten: false,
          root:paths.toDir,
          relative:paths.rel('scripts'),
          absolute:paths.to('scripts')
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
              paths.to('styles/mixins.scss'),
              paths.to('styles/imports.scss'),
              paths.to('styles/imports.scss'),
              paths.to('styles/css/main.css'),
              paths.to('styles/css/main.css'),
              paths.to('styles/css/style.css'),
              paths.to('styles/css/style.css'),
              paths.to('styles/css/extra.css'),
              paths.to('styles/css/extra.css'),
              paths.to('styles/scss/main.scss'),
              paths.to('styles/scss/main.scss'),
              paths.to('scripts/ajax.js')
            ]),
            warning:[],
            failure:[]
          },
          dirs:{
            success:jasmine.arrayContaining([
              paths.to('styles'),
              paths.to('styles'),
              paths.to('styles/css'),
              paths.to('styles/css'),
              paths.to('styles/scss'),
              paths.to('styles/scss'),
              paths.to('scripts')
            ]),
            warning:[paths.to('scripts')],
            failure:[]
          },
          root:paths.toDir
        }
      }));

    });
    describe(`and one has 'copy' and other one has 'move' property`,function(){
      beforeEach(function(){
        this.structure = [
          {dir:paths.name('styles'), copy:paths.from('styles'), overwrite:true},
          {dir:paths.name('styles'), move:paths.from('styles'), overwrite:true},
          {dir:paths.name('scripts'), copy:paths.from('scripts'), overwrite:false},
          {dir:paths.name('scripts'), move:paths.from('scripts'), overwrite:false}
        ];
      });

      for(var item of ['styles','scripts','styles/css','styles/scss']){
        it.apply(this,should.createNewFolder({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $folder:paths.to(item)
        }));
      }

      for(var item of ['styles','styles/css','styles/scss']){
        it.apply(this,should.removeFolder({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $folder:paths.from(item)
        }));
      }

      it.apply(this,should.not.removeFolder({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $folder:paths.from('scripts')
      }));

      for(var item of ['styles/mixins.scss','styles/imports.scss','styles/css/main.css','styles/css/style.css','styles/css/extra.css','styles/scss/main.scss']){
        it.apply(this,should.createNewFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(item)
        }));

        it.apply(this,should.removeFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.from(item)
        }));

        it.apply(this,should.haveContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(item),
          $content:data[item].content
        }));

      }

      it.apply(this,should.createNewFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.to('scripts/ajax.js')
      }));

      it.apply(this,should.not.removeFile({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $file:paths.from('scripts/ajax.js')
      }));

      it.apply(this,should.haveTheSameContent({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $model:paths.from('scripts/ajax.js'),
        $compared:paths.to('scripts/ajax.js')
      }));


      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.toDir,
        $files:7,
        $folders:4
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:21
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $callbackTimes:1
      }));

      for(var item of ['styles','scripts','styles/css','styles/scss']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:21,
          $properties:{
            failure: null,
            warning: null,
            success: `The folder "${paths.rel(item)}" was successfully copied from the "${paths.from(item)}" path.`,
            item: 'dir',
            from: paths.from(item),
            action: 'copy',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel(item),
            absolute:paths.to(item)
          }
        }));
      }

      for(var item of ['styles','styles/css','styles/scss']){
      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:21,
        $properties:{
          failure: null,
          warning: null,
          success: `The already existing folder "${paths.rel(item)}" was successfully overwritten by the folder moved from the "${paths.from(item)}" path.`,
          item: 'dir',
          from: paths.from(item),
          action: 'move',
          overwritten: true,
          root:paths.toDir,
          relative:paths.rel(item),
          absolute:paths.to(item)
        }
      }));
      }

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:21,
        $properties:{
          failure: null,
          warning: `The already existing folder "${paths.rel('scripts')}" could not be overwritten by the folder moved from the "${paths.from('scripts')}" path, due to the "overwrite" property settings.`,
          success: null,
          item: 'dir',
          from: paths.from('scripts'),
          action: 'move',
          overwritten: false,
          root:paths.toDir,
          relative:paths.rel('scripts'),
          absolute:paths.to('scripts')
        }
      }));

      for(var item of ['styles/mixins.scss','styles/imports.scss','styles/css/main.css','styles/css/style.css','styles/css/extra.css','styles/scss/main.scss', 'scripts/ajax.js']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:21,
          $properties:{
            success: `The file "${paths.rel(item)}" was successfully copied from the "${paths.from(item)}" path.`,
            warning: null,
            failure: null,
            item: 'file',
            from: paths.from(item),
            action: 'copy',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel(item),
            absolute:paths.to(item)
          }
        }));
      }

      for(var item of ['styles/mixins.scss','styles/imports.scss','styles/css/main.css','styles/css/style.css','styles/css/extra.css','styles/scss/main.scss']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:21,
          $properties:{
            success: `The already existing file "${paths.rel(item)}" was successfully overwritten by the file moved from the "${paths.from(item)}" path.`,
            warning: null,
            failure: null,
            item: 'file',
            from: paths.from(item),
            action: 'move',
            overwritten: true,
            root:paths.toDir,
            relative:paths.rel(item),
            absolute:paths.to(item)
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
              paths.to('styles/mixins.scss'),
              paths.to('styles/mixins.scss'),
              paths.to('styles/imports.scss'),
              paths.to('styles/imports.scss'),
              paths.to('styles/css/main.css'),
              paths.to('styles/css/main.css'),
              paths.to('styles/css/style.css'),
              paths.to('styles/css/style.css'),
              paths.to('styles/css/extra.css'),
              paths.to('styles/css/extra.css'),
              paths.to('styles/scss/main.scss'),
              paths.to('styles/scss/main.scss'),
              paths.to('scripts/ajax.js')
            ]),
            warning:[],
            failure:[]
          },
          dirs:{
            success:jasmine.arrayContaining([
              paths.to('styles'),
              paths.to('styles'),
              paths.to('styles/css'),
              paths.to('styles/css'),
              paths.to('styles/scss'),
              paths.to('styles/scss'),
              paths.to('scripts')
            ]),
            warning:[paths.to('scripts')],
            failure:[]
          },
          root:paths.toDir
        }
      }));

    });
    describe(`and one has 'move' and other one has 'copy' property`,function(){
      beforeEach(function(){
        this.structure = [
          {dir:paths.name('styles'), move:paths.from('styles'), overwrite:true},
          {dir:paths.name('styles'), copy:paths.from('styles'), overwrite:true},
          {dir:paths.name('scripts'), move:paths.from('scripts'), overwrite:false},
          {dir:paths.name('scripts'), copy:paths.from('scripts'), overwrite:false}
        ];
      });

      for(var item of ['styles','scripts','styles/css','styles/scss']){
        it.apply(this,should.createNewFolder({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $folder:paths.to(item)
        }));

        it.apply(this,should.removeFolder({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $folder:paths.from(item)
        }));
      }

      for(var item of ['styles/mixins.scss','styles/imports.scss','styles/css/main.css','styles/css/style.css','styles/css/extra.css','styles/scss/main.scss','scripts/ajax.js']){
        it.apply(this,should.createNewFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(item)
        }));

        it.apply(this,should.removeFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.from(item)
        }));

        it.apply(this,should.haveContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(item),
          $content:data[item].content
        }));

      }

      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.toDir,
        $files:7,
        $folders:4
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:13
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $callbackTimes:1
      }));

      for(var item of ['styles','styles/css','styles/scss','scripts']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:13,
          $properties:{
            failure: null,
            warning: null,
            success: `The folder "${paths.rel(item)}" was successfully moved from the "${paths.from(item)}" path.`,
            item: 'dir',
            from: paths.from(item),
            action: 'move',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel(item),
            absolute:paths.to(item)
          }
        }));
      }

      for(var item of ['styles/mixins.scss','styles/imports.scss','styles/css/main.css','styles/css/style.css','styles/css/extra.css','styles/scss/main.scss', 'scripts/ajax.js']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:13,
          $properties:{
            failure: null,
            warning: null,
            success: `The file "${paths.rel(item)}" was successfully moved from the "${paths.from(item)}" path.`,
            item: 'file',
            from: paths.from(item),
            action: 'move',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel(item),
            absolute:paths.to(item)
          }
        }));
      }

      for(var item of ['styles','scripts']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:13,
          $properties:{
            warning: null,
            failure: `The already existing folder "${paths.rel(item)}" could not be overwritten by the folder copied from the "${paths.from(item)}" path, because this folder has been already moved.`,
            success: null,
            item: 'dir',
            from: paths.from(item),
            action: 'copy',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel(item),
            absolute:paths.to(item)
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
              paths.to('styles/mixins.scss'),
              paths.to('styles/imports.scss'),
              paths.to('styles/css/main.css'),
              paths.to('styles/css/style.css'),
              paths.to('styles/css/extra.css'),
              paths.to('styles/scss/main.scss'),
              paths.to('scripts/ajax.js')
            ]),
            warning:[],
            failure:[]
          },
          dirs:{
            success:jasmine.arrayContaining([
              paths.to('styles'),
              paths.to('styles/css'),
              paths.to('styles/scss'),
              paths.to('scripts')
            ]),
            warning:[],
            failure:jasmine.arrayContaining([
              paths.to('styles'),
              paths.to('scripts')
            ])
          },
          root:paths.toDir
        }
      }));

    });
    describe(`and 'merge' property`,function(){
      beforeEach(function(){
        this.structure = [
          {dir:paths.name('styles'), merge:paths.from('styles'), overwrite:true},
          {dir:paths.name('styles'), merge:paths.from('scripts'), overwrite:true},
          {dir:paths.name('scripts'), merge:paths.from('styles'), overwrite:false},
          {dir:paths.name('scripts'), merge:paths.from('scripts'), overwrite:false}
        ];
      });

      for(var item of ['styles','scripts','styles/css','styles/scss']){
        it.apply(this,should.createNewFolder({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $folder:paths.to(item)
        }));
      }

      for(var item of ['styles/mixins.scss','styles/imports.scss','styles/css/main.css','styles/css/style.css','styles/css/extra.css','styles/scss/main.scss','scripts/ajax.js']){
        it.apply(this,should.createNewFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(item)
        }));

        it.apply(this,should.haveTheSameContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $model:paths.from(item),
          $compared:paths.to(item)
        }));
      }

      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.toDir,
        $files:14,
        $folders:6
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:22
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $callbackTimes:1
      }));

      for(var item of ['styles','scripts']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:22,
          $properties:{
            failure: null,
            warning: null,
            success: `The folder "${paths.rel(item)}" was successfully merged with the "${paths.from('styles')}" folder.`,
            item: 'dir',
            from: paths.from('styles'),
            action: 'merge',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel(item),
            absolute:paths.to(item)
          }
        }));

        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:22,
          $properties:{
            success: `The already existing folder "${paths.rel(item)}" was successfully merged with the "${paths.from('scripts')}" folder.`,
            warning: null,
            failure:null,
            item: 'dir',
            from: paths.from('scripts'),
            action: 'merge',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel(item),
            absolute:paths.to(item)
          }
        }));
      }

      for(var item of ['styles/css','styles/scss']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:22,
          $properties:{
            failure: null,
            warning: null,
            success: `The folder "${paths.rel(item)}" was successfully merged with the "${paths.from(item)}" folder.`,
            item: 'dir',
            from: paths.from(item),
            action: 'merge',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel(item),
            absolute:paths.to(item)
          }
        }));
      }

      for(var item of ['styles/mixins.scss','styles/imports.scss','styles/css/main.css','styles/css/style.css','styles/css/extra.css','styles/scss/main.scss','scripts/ajax.js']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:22,
          $properties:{
            failure: null,
            warning: null,
            success: `The file "${paths.rel(item)}" was successfully copied from the "${paths.from(item)}" path.`,
            item: 'file',
            from: paths.from(item),
            action: 'copy',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel(item),
            absolute:paths.to(item)
          }
        }));
      }

      for(var item of ['mixins.scss','imports.scss','css/main.css','css/style.css','css/extra.css','scss/main.scss']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:22,
          $properties:{
            failure: null,
            warning: null,
            success: `The file "${path.join('scripts',item)}" was successfully copied from the "${paths.from(`styles/${item}`)}" path.`,
            item: 'file',
            from: paths.from(`styles/${item}`),
            action: 'copy',
            overwritten: false,
            root:paths.toDir,
            relative:path.join('scripts',item),
            absolute:path.join(paths.toDir,'scripts',item)
          }
        }));
      }

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:22,
        $properties:{
          failure: null,
          warning: null,
          success: `The file "${path.join('styles','ajax.js')}" was successfully copied from the "${paths.from('scripts/ajax.js')}" path.`,
          item: 'file',
          from: paths.from('scripts/ajax.js'),
          action: 'copy',
          overwritten: false,
          root:paths.toDir,
          relative:path.join('styles','ajax.js'),
          absolute:path.join(paths.toDir,'styles','ajax.js')
        }
      }));

      for(var item of ['css','scss']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:22,
          $properties:{
            failure: null,
            warning: null,
            success: `The folder "${path.join('scripts',item)}" was successfully merged with the "${paths.from(`styles/${item}`)}" folder.`,
            item: 'dir',
            from: paths.from(`styles/${item}`),
            action: 'merge',
            overwritten: false,
            root:paths.toDir,
            relative:path.join('scripts',item),
            absolute:path.join(paths.toDir,'scripts',item)
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
              paths.to('styles/mixins.scss'),
              paths.to('styles/imports.scss'),
              paths.to('styles/css/main.css'),
              paths.to('styles/css/style.css'),
              paths.to('styles/css/extra.css'),
              paths.to('styles/scss/main.scss'),
              paths.to('scripts/ajax.js'),
              path.join(paths.toDir,'scripts','mixins.scss'),
              path.join(paths.toDir,'scripts','imports.scss'),
              path.join(paths.toDir,'scripts','css/main.css'),
              path.join(paths.toDir,'scripts','css/style.css'),
              path.join(paths.toDir,'scripts','css/extra.css'),
              path.join(paths.toDir,'scripts','scss/main.scss'),
              path.join(paths.toDir,'styles','ajax.js')
            ]),
            warning:[],
            failure:[]
          },
          dirs:{
            success:jasmine.arrayContaining([
              paths.to('styles'),
              paths.to('styles'),
              paths.to('scripts'),
              paths.to('scripts'),
              paths.to('styles/css'),
              paths.to('styles/scss'),
              path.join(paths.toDir,'scripts','css'),
              path.join(paths.toDir,'scripts','scss')
            ]),
            warning:[],
            failure:[]
          },
          root:paths.toDir
        }
      }));

    });
    describe(`and one has 'move' and other one has 'merge' property`,function(){
      beforeEach(function(){
        this.structure = [
          {dir:paths.name('styles'), move:paths.from('styles'), overwrite:true},
          {dir:paths.name('styles'), merge:paths.from('styles'), overwrite:true},
          {dir:paths.name('scripts'), move:paths.from('scripts'), overwrite:false},
          {dir:paths.name('scripts'), merge:paths.from('scripts'), overwrite:false}
        ];
      });

      for(var item of ['styles','scripts','styles/css','styles/scss']){
        it.apply(this,should.createNewFolder({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $folder:paths.to(item)
        }));
        
        it.apply(this,should.removeFolder({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $folder:paths.from(item)
        }));
      }

      for(var item of ['styles/mixins.scss','styles/imports.scss','styles/css/main.css','styles/css/style.css','styles/css/extra.css','styles/scss/main.scss','scripts/ajax.js']){
        it.apply(this,should.createNewFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(item)
        }));

        it.apply(this,should.removeFile({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.from(item)
        }));

        it.apply(this,should.haveContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to(item),
          $content:data[item].content
        }));

      }

      it.apply(this,should.containItemsNumber({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $directory:paths.toDir,
        $files:7,
        $folders:4
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:13
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $callbackTimes:1
      }));

      for(var item of ['styles','scripts','styles/css','styles/scss']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:13,
          $properties:{
            failure: null,
            warning: null,
            success: `The folder "${paths.rel(item)}" was successfully moved from the "${paths.from(item)}" path.`,
            item: 'dir',
            from: paths.from(item),
            action: 'move',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel(item),
            absolute:paths.to(item)
          }
        }));
      }

      for(var item of ['styles','scripts']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:13,
          $properties:{
            success: null,
            warning: null,
            failure: `The already existing folder "${paths.rel(item)}" could not be merged with the "${paths.from(item)}" folder, because this folder has been already moved.`,
            item: 'dir',
            from: paths.from(item),
            action: 'merge',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel(item),
            absolute:paths.to(item)
          }
        }));
      }

      for(var item of ['styles/mixins.scss','styles/imports.scss','styles/css/main.css','styles/css/style.css','styles/css/extra.css','styles/scss/main.scss','scripts/ajax.js']){
        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:13,
          $properties:{
            failure: null,
            warning: null,
            success: `The file "${paths.rel(item)}" was successfully moved from the "${paths.from(item)}" path.`,
            item: 'file',
            from: paths.from(item),
            action: 'move',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel(item),
            absolute:paths.to(item)
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
              paths.to('styles/mixins.scss'),
              paths.to('styles/imports.scss'),
              paths.to('styles/css/main.css'),
              paths.to('styles/css/style.css'),
              paths.to('styles/css/extra.css'),
              paths.to('styles/scss/main.scss'),
              paths.to('scripts/ajax.js')
            ]),
            warning:[],
            failure:[]
          },
          dirs:{
            success:jasmine.arrayContaining([
              paths.to('styles'),
              paths.to('scripts'),
              paths.to('styles/css'),
              paths.to('styles/scss')
            ]),
            warning:[],
            failure:jasmine.arrayContaining([
              paths.to('styles'),
              paths.to('scripts')
            ])
          },
          root:paths.toDir
        }
      }));

    });

  });

  describe(`that have the 'dir' property of the same value and 'content' property, and 'content' scope contains`,function(){
    describe(`items with 'file' of the same value`,function(){
      describe(`and any action property`,function(){
        beforeEach(function(){
          this.structure = [
            {dir:paths.name('styles'),contents:[
              {file:paths.name('styles/mixins.scss'), overwrite:true},
              {file:paths.name('styles/imports.scss'), overwrite:false}
            ]},
            {dir:paths.name('styles'),contents:[
              {file:paths.name('styles/mixins.scss'), overwrite:true},
              {file:paths.name('styles/imports.scss'), overwrite:false}
            ]}
          ];
        });

        it.apply(this,should.createNewFolder({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $folder:paths.to('styles')
        }));

        for(var item of ['styles/mixins.scss','styles/imports.scss']){
          it.apply(this,should.createNewFile({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $file:paths.to(item)
          }));

          it.apply(this,should.haveContent({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $file:paths.to(item),
            $content:''
          }));
        }

        it.apply(this,should.containItemsNumber({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $directory:paths.toDir,
          $files:2,
          $folders:1
        }));

        it.apply(this,should.runCallback({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:6
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
          $callbackTimes:6,
          $properties:{
            failure: null,
            warning: null,
            success: `The folder "${paths.rel('styles')}" was successfully created with its contents.`,
            item: 'dir',
            from: null,
            action: 'contents',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel('styles'),
            absolute:paths.to('styles')
          }
        }));

        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:6,
          $properties:{
            failure: null,
            warning: `The already existing folder "${paths.rel('styles')}" could not be overwritten by the newly created folder and its contents, due to the "overwrite" property settings.`,
            success: null,
            item: 'dir',
            from: null,
            action: 'contents',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel('styles'),
            absolute:paths.to('styles')
          }
        }));

        for(var item of ['styles/mixins.scss','styles/imports.scss']){
          it.apply(this,should.runCallbackWithObject({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'each',
            $callbackTimes:6,
            $properties:{
              failure: null,
              warning: null,
              success: `The file "${paths.rel(item)}" was successfully created.`,
              item: 'file',
              from: null,
              action: 'create',
              overwritten: false,
              root:paths.toDir,
              relative:paths.rel(item),
              absolute:paths.to(item)
            }
          }));
        }

        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:6,
          $properties:{
            failure: null,
            warning: null,
            success: `The already existing file "${paths.rel('styles/mixins.scss')}" was successfully overwritten by the newly created file.`,
            item: 'file',
            from: null,
            action: 'create',
            overwritten: true,
            root:paths.toDir,
            relative:paths.rel('styles/mixins.scss'),
            absolute:paths.to('styles/mixins.scss')
          }
        }));

        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:6,
          $properties:{
            failure: null,
            warning: `The already existing file "${paths.rel('styles/imports.scss')}" could not be overwritten by the newly created file, due to the "overwrite" property settings.`,
            success: null,
            item: 'file',
            from: null,
            action: 'create',
            overwritten: false,
            root:paths.toDir,
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
                paths.to('styles/mixins.scss'),
                paths.to('styles/mixins.scss'),
                paths.to('styles/imports.scss')
              ]),
              warning:[paths.to('styles/imports.scss')],
              failure:[]
            },
            dirs:{
              success:[paths.to('styles')],
              warning:[paths.to('styles')],
              failure:[]
            },
            root:paths.toDir
          }
        }));

      });
      describe(`and 'move' property`,function(){
        beforeEach(function(){
          this.structure = [
            {dir:paths.name('styles'),contents:[
              {file:paths.name('styles/mixins.scss'), move:paths.from('styles/mixins.scss'), overwrite:true},
              {file:paths.name('styles/imports.scss'), move:paths.from('styles/imports.scss'), overwrite:false}
            ]},
            {dir:paths.name('styles'),contents:[
              {file:paths.name('styles/mixins.scss'), move:paths.from('styles/mixins.scss'), overwrite:true},
              {file:paths.name('styles/imports.scss'), move:paths.from('styles/imports.scss'), overwrite:false}
            ]}
          ];
        });

        it.apply(this,should.createNewFolder({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $folder:paths.to('styles')
        }));

        for(var item of ['styles/mixins.scss','styles/imports.scss']){
          it.apply(this,should.createNewFile({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $file:paths.to(item)
          }));

          it.apply(this,should.removeFile({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $file:paths.from(item)
          }));

          it.apply(this,should.haveContent({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $file:paths.to(item),
            $content:data[item].content
          }));
        }

        it.apply(this,should.containItemsNumber({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $directory:paths.toDir,
          $files:2,
          $folders:1
        }));

        it.apply(this,should.runCallback({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:6
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
          $callbackTimes:6,
          $properties:{
            failure: null,
            warning: null,
            success: `The folder "${paths.rel('styles')}" was successfully created with its contents.`,
            item: 'dir',
            from: null,
            action: 'contents',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel('styles'),
            absolute:paths.to('styles')
          }
        }));

        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:6,
          $properties:{
            failure: null,
            warning: `The already existing folder "${paths.rel('styles')}" could not be overwritten by the newly created folder and its contents, due to the "overwrite" property settings.`,
            success: null,
            item: 'dir',
            from: null,
            action: 'contents',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel('styles'),
            absolute:paths.to('styles')
          }
        }));

        for(var item of ['styles/mixins.scss','styles/imports.scss']){
          it.apply(this,should.runCallbackWithObject({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'each',
            $callbackTimes:6,
            $properties:{
              failure: null,
              warning: null,
              success: `The file "${paths.rel(item)}" was successfully moved from the "${paths.from(item)}" path.`,
              item: 'file',
              from: paths.from(item),
              action: 'move',
              overwritten: false,
              root:paths.toDir,
              relative:paths.rel(item),
              absolute:paths.to(item)
            }
          }));

          it.apply(this,should.runCallbackWithObject({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'each',
            $callbackTimes:6,
            $properties:{
              success: null,
              warning: null,
              failure: `The already existing file "${paths.rel(item)}" could not be overwritten by the file moved from the "${paths.from(item)}" path, because this file has been already moved.`,
              item: 'file',
              from: paths.from(item),
              action: 'move',
              overwritten: false,
              root:paths.toDir,
              relative:paths.rel(item),
              absolute:paths.to(item)
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
                  paths.to('styles/imports.scss')
                ]),
                warning:[],
                failure:jasmine.arrayContaining([
                  paths.to('styles/mixins.scss'),
                  paths.to('styles/imports.scss')
                ])
              },
              dirs:{
                success:[paths.to('styles')],
                warning:[paths.to('styles')],
                failure:[]
              },
              root:paths.toDir
            }
          }));

        }

      });
      describe(`and 'copy' property`,function(){
        beforeEach(function(){
          this.structure = [
            {dir:paths.name('styles'),contents:[
              {file:paths.name('styles/mixins.scss'), copy:paths.from('styles/mixins.scss'), overwrite:true},
              {file:paths.name('styles/imports.scss'), copy:paths.from('styles/imports.scss'), overwrite:false}
            ]},
            {dir:paths.name('styles'),contents:[
              {file:paths.name('styles/mixins.scss'), copy:paths.from('styles/mixins.scss'), overwrite:true},
              {file:paths.name('styles/imports.scss'), copy:paths.from('styles/imports.scss'), overwrite:false}
            ]}
          ];
        });

        it.apply(this,should.createNewFolder({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $folder:paths.to('styles')
        }));

        for(var item of ['styles/mixins.scss','styles/imports.scss']){
          it.apply(this,should.createNewFile({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $file:paths.to(item)
          }));

          it.apply(this,should.not.removeFile({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $file:paths.from(item)
          }));

          it.apply(this,should.haveTheSameContent({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $model:paths.from(item),
            $compared:paths.to(item)
          }));
        }

        it.apply(this,should.containItemsNumber({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $directory:paths.toDir,
          $files:2,
          $folders:1
        }));

        it.apply(this,should.runCallback({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:6
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
          $callbackTimes:6,
          $properties:{
            failure: null,
            warning: null,
            success: `The folder "${paths.rel('styles')}" was successfully created with its contents.`,
            item: 'dir',
            from: null,
            action: 'contents',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel('styles'),
            absolute:paths.to('styles')
          }
        }));

        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:6,
          $properties:{
            failure: null,
            warning: `The already existing folder "${paths.rel('styles')}" could not be overwritten by the newly created folder and its contents, due to the "overwrite" property settings.`,
            success: null,
            item: 'dir',
            from: null,
            action: 'contents',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel('styles'),
            absolute:paths.to('styles')
          }
        }));

        for(var item of ['styles/mixins.scss','styles/imports.scss']){
          it.apply(this,should.runCallbackWithObject({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'each',
            $callbackTimes:6,
            $properties:{
              failure: null,
              warning: null,
              success: `The file "${paths.rel(item)}" was successfully copied from the "${paths.from(item)}" path.`,
              item: 'file',
              from: paths.from(item),
              action: 'copy',
              overwritten: false,
              root:paths.toDir,
              relative:paths.rel(item),
              absolute:paths.to(item)
            }
          }));
        }

        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:6,
          $properties:{
            failure: null,
            warning: null,
            success: `The already existing file "${paths.rel('styles/mixins.scss')}" was successfully overwritten by the file copied from the "${paths.from('styles/mixins.scss')}" path.`,
            item: 'file',
            from: paths.from('styles/mixins.scss'),
            action: 'copy',
            overwritten: true,
            root:paths.toDir,
            relative:paths.rel('styles/mixins.scss'),
            absolute:paths.to('styles/mixins.scss')
          }
        }));

        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:6,
          $properties:{
            success: null,
            warning: `The already existing file "${paths.rel('styles/imports.scss')}" could not be overwritten by the file copied from the "${paths.from('styles/imports.scss')}" path, due to the "overwrite" property settings.`,
            failure: null,
            item: 'file',
            from: paths.from('styles/imports.scss'),
            action: 'copy',
            overwritten: false,
            root:paths.toDir,
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
                paths.to('styles/mixins.scss'),
                paths.to('styles/mixins.scss'),
                paths.to('styles/imports.scss')
              ]),
              warning:[paths.to('styles/imports.scss')],
              failure:[]
            },
            dirs:{
              success:[paths.to('styles')],
              warning:[paths.to('styles')],
              failure:[]
            },
            root:paths.toDir
          }
        }));

      });
      describe(`and 'write' property`,function(){
        beforeEach(function(){
          this.structure = [
            {dir:paths.name('styles'),contents:[
              {file:paths.name('styles/mixins.scss'), write:data['styles/mixins.scss'].content, overwrite:true},
              {file:paths.name('styles/imports.scss'), write:data['styles/imports.scss'].content,overwrite:false}
            ]},
            {dir:paths.name('styles'),contents:[
              {file:paths.name('styles/mixins.scss'), write:data['styles/imports.scss'].content, overwrite:true},
              {file:paths.name('styles/imports.scss'), write:data['styles/mixins.scss'].content,overwrite:false}
            ]}
          ];
        });

        it.apply(this,should.createNewFolder({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $folder:paths.to('styles')
        }));

        for(var item of ['styles/mixins.scss','styles/imports.scss']){
          it.apply(this,should.createNewFile({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $file:paths.to(item)
          }));
        }

        it.apply(this,should.haveContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to('styles/mixins.scss'),
          $content:data['styles/imports.scss'].content
        }));

        it.apply(this,should.haveContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to('styles/imports.scss'),
          $content:data['styles/imports.scss'].content + data['styles/mixins.scss'].content
        }));

        it.apply(this,should.containItemsNumber({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $directory:paths.toDir,
          $files:2,
          $folders:1
        }));

        it.apply(this,should.runCallback({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:6
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
          $callbackTimes:6,
          $properties:{
            failure: null,
            warning: null,
            success: `The folder "${paths.rel('styles')}" was successfully created with its contents.`,
            item: 'dir',
            from: null,
            action: 'contents',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel('styles'),
            absolute:paths.to('styles')
          }
        }));

        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:6,
          $properties:{
            failure: null,
            warning: `The already existing folder "${paths.rel('styles')}" could not be overwritten by the newly created folder and its contents, due to the "overwrite" property settings.`,
            success: null,
            item: 'dir',
            from: null,
            action: 'contents',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel('styles'),
            absolute:paths.to('styles')
          }
        }));

        for(var item of ['styles/mixins.scss','styles/imports.scss']){
          it.apply(this,should.runCallbackWithObject({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'each',
            $callbackTimes:6,
            $properties:{
              failure: null,
              warning: null,
              success: `The file "${paths.rel(item)}" was successfully created with the given content.`,
              item: 'file',
              from: null,
              action: 'write',
              overwritten: false,
              root:paths.toDir,
              relative:paths.rel(item),
              absolute:paths.to(item)
            }
          }));
        }

        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:6,
          $properties:{
            failure: null,
            warning: null,
            success: `The content of "${paths.rel('styles/mixins.scss')}" file was successfully overwritten with the given content.`,
            item: 'file',
            from: null,
            action: 'write',
            overwritten: true,
            root:paths.toDir,
            relative:paths.rel('styles/mixins.scss'),
            absolute:paths.to('styles/mixins.scss')
          }
        }));

        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:6,
          $properties:{
            failure: null,
            warning: null,
            success: `The given content was successfully appended to the "${paths.rel('styles/imports.scss')}" file.`,
            item: 'file',
            from: null,
            action: 'write',
            overwritten: false,
            root:paths.toDir,
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
                paths.to('styles/mixins.scss'),
                paths.to('styles/mixins.scss'),
                paths.to('styles/imports.scss'),
                paths.to('styles/imports.scss')
              ]),
              warning:[],
              failure:[]
            },
            dirs:{
              success:[paths.to('styles')],
              warning:[paths.to('styles')],
              failure:[]
            },
            root:paths.toDir
          }
        }));

      });
      describe(`and 'writeFrom' property`,function(){
        beforeEach(function(){
          this.structure = [
            {dir:paths.name('styles'),contents:[
              {file:paths.name('styles/mixins.scss'), writeFrom:paths.from('styles/mixins.scss'), overwrite:true},
              {file:paths.name('styles/imports.scss'), writeFrom:paths.from('styles/imports.scss'), overwrite:false}
            ]},
            {dir:paths.name('styles'),contents:[
              {file:paths.name('styles/mixins.scss'), writeFrom:paths.from('styles/imports.scss'), overwrite:true},
              {file:paths.name('styles/imports.scss'), writeFrom:paths.from('styles/mixins.scss'), overwrite:false}
            ]}
          ];
        });

        it.apply(this,should.createNewFolder({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $folder:paths.to('styles')
        }));

        for(var item of ['styles/mixins.scss','styles/imports.scss']){
          it.apply(this,should.createNewFile({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $file:paths.to(item)
          }));
        }

        it.apply(this,should.haveTheSameContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $model:paths.from('styles/imports.scss'),
          $compared:paths.to('styles/mixins.scss')
        }));

        it.apply(this,should.haveContent({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $file:paths.to('styles/imports.scss'),
          $content:data['styles/imports.scss'].content + data['styles/mixins.scss'].content
        }));

        it.apply(this,should.containItemsNumber({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $directory:paths.toDir,
          $files:2,
          $folders:1
        }));

        it.apply(this,should.runCallback({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:6
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
          $callbackTimes:6,
          $properties:{
            failure: null,
            warning: null,
            success: `The folder "${paths.rel('styles')}" was successfully created with its contents.`,
            item: 'dir',
            from: null,
            action: 'contents',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel('styles'),
            absolute:paths.to('styles')
          }
        }));

        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:6,
          $properties:{
            failure: null,
            warning: `The already existing folder "${paths.rel('styles')}" could not be overwritten by the newly created folder and its contents, due to the "overwrite" property settings.`,
            success: null,
            item: 'dir',
            from: null,
            action: 'contents',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel('styles'),
            absolute:paths.to('styles')
          }
        }));

        for(var item of ['styles/mixins.scss','styles/imports.scss']){
          it.apply(this,should.runCallbackWithObject({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'each',
            $callbackTimes:6,
            $properties:{
              failure: null,
              warning: null,
              success: `The file "${paths.rel(item)}" was successfully created with the content from the "${paths.from(item)}" file.`,
              item: 'file',
              from: paths.from(item),
              action: 'writeFrom',
              overwritten: false,
              root:paths.toDir,
              relative:paths.rel(item),
              absolute:paths.to(item)
            }
          }));
        }

        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:6,
          $properties:{
            failure: null,
            warning: null,
            success: `The already existing file "${paths.rel('styles/mixins.scss')}" was successfully overwritten with the content from the "${paths.from('styles/imports.scss')}" file.`,
            item: 'file',
            from: paths.from('styles/imports.scss'),
            action: 'writeFrom',
            overwritten: true,
            root:paths.toDir,
            relative:paths.rel('styles/mixins.scss'),
            absolute:paths.to('styles/mixins.scss')
          }
        }));

        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:6,
          $properties:{
            failure: null,
            warning: null,
            success: `The content from the "${paths.from('styles/mixins.scss')}" file was successfully appended to the "${paths.rel('styles/imports.scss')}" file.`,
            item: 'file',
            from: paths.from('styles/mixins.scss'),
            action: 'writeFrom',
            overwritten: false,
            root:paths.toDir,
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
                paths.to('styles/mixins.scss'),
                paths.to('styles/mixins.scss'),
                paths.to('styles/imports.scss'),
                paths.to('styles/imports.scss')
              ]),
              warning:[],
              failure:[]
            },
            dirs:{
              success:[paths.to('styles')],
              warning:[paths.to('styles')],
              failure:[]
            },
            root:paths.toDir
          }
        }));

      });
    });
    describe(`items with 'dir' of the same value`,function(){
      describe(`and any action property`,function(){
        beforeEach(function(){
          this.structure = [
            {dir:paths.name('styles'),contents:[
              {dir:paths.name('styles/css'), overwrite:true},
              {dir:paths.name('styles/scss'), overwrite:false}
            ]},
            {dir:paths.name('styles'),contents:[
              {dir:paths.name('styles/css'), overwrite:true},
              {dir:paths.name('styles/scss'), overwrite:false}
            ]}
          ];
        });

        for(var item of ['styles','styles/css','styles/scss']){
          it.apply(this,should.createNewFolder({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $folder:paths.to(item)
          }));
        }

        it.apply(this,should.containItemsNumber({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $directory:paths.toDir,
          $files:0,
          $folders:3
        }));

        it.apply(this,should.runCallback({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:6
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
          $callbackTimes:6,
          $properties:{
            failure: null,
            warning: null,
            success: `The folder "${paths.rel('styles')}" was successfully created with its contents.`,
            item: 'dir',
            from: null,
            action: 'contents',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel('styles'),
            absolute:paths.to('styles')
          }
        }));

        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:6,
          $properties:{
            failure: null,
            warning: `The already existing folder "${paths.rel('styles')}" could not be overwritten by the newly created folder and its contents, due to the "overwrite" property settings.`,
            success: null,
            item: 'dir',
            from: null,
            action: 'contents',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel('styles'),
            absolute:paths.to('styles')
          }
        }));

        for(var item of ['styles/css','styles/scss']){
          it.apply(this,should.runCallbackWithObject({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'each',
            $callbackTimes:6,
            $properties:{
              failure: null,
              warning: null,
              success: `The folder "${paths.rel(item)}" was successfully created.`,
              item: 'dir',
              from: null,
              action: 'create',
              overwritten: false,
              root:paths.toDir,
              relative:paths.rel(item),
              absolute:paths.to(item)
            }
          }));
        }

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:6,
        $properties:{
          failure: null,
          warning: null,
          success: `The already existing folder "${paths.rel('styles/css')}" was successfully overwritten by the newly created folder.`,
          item: 'dir',
          from: null,
          action: 'create',
          overwritten: true,
          root:paths.toDir,
          relative:paths.rel('styles/css'),
          absolute:paths.to('styles/css')
        }
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'each',
        $callbackTimes:6,
        $properties:{
          failure: null,
          warning: `The already existing folder "${paths.rel('styles/scss')}" could not be overwritten by the newly created folder, due to the "overwrite" property settings.`,
          success: null,
          item: 'dir',
          from: null,
          action: 'create',
          overwritten: false,
          root:paths.toDir,
          relative:paths.rel('styles/scss'),
          absolute:paths.to('styles/scss')
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
            ]),
            warning:[],
            failure:[]
          },
          dirs:{
            success:jasmine.arrayContaining([
              paths.to('styles'),
              paths.to('styles/css'),
              paths.to('styles/css'),
              paths.to('styles/scss')
            ]),
            warning:jasmine.arrayContaining([
              paths.to('styles'),
              paths.to('styles/scss')
            ]),
            failure:[]
          },
          root:paths.toDir
        }
      }));
      
      });
      describe(`and 'move' property`,function(){
        beforeEach(function(){
          this.structure = [
            {dir:paths.name('styles'),contents:[
              {dir:paths.name('styles/css'), move:paths.from('styles/css'), overwrite:true},
              {dir:paths.name('styles/scss'), move:paths.from('styles/scss'), overwrite:false}
            ]},
            {dir:paths.name('styles'),contents:[
              {dir:paths.name('styles/css'), move:paths.from('styles/css'), overwrite:true},
              {dir:paths.name('styles/scss'), move:paths.from('styles/scss'), overwrite:false}
            ]}
          ];
        });

        it.apply(this,should.createNewFolder({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $folder:paths.to('styles')
        }));
        
        for(var item of ['styles/css','styles/scss']){
          it.apply(this,should.createNewFolder({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $folder:paths.to(item)
          }));
          it.apply(this,should.removeFolder({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $folder:paths.from(item)
          }));
        }

        for(var item of ['styles/css/main.css','styles/css/style.css','styles/css/extra.css','styles/scss/main.scss']){
          it.apply(this,should.createNewFile({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $file:paths.to(item)
          }));

          it.apply(this,should.removeFile({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $file:paths.from(item)
          }));

          it.apply(this,should.haveContent({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $file:paths.to(item),
            $content:data[item].content
          }));
        }

        it.apply(this,should.containItemsNumber({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $directory:paths.toDir,
          $files:4,
          $folders:3
        }));

        it.apply(this,should.runCallback({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:10
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
          $callbackTimes:10,
          $properties:{
            failure: null,
            warning: null,
            success: `The folder "${paths.rel('styles')}" was successfully created with its contents.`,
            item: 'dir',
            from: null,
            action: 'contents',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel('styles'),
            absolute:paths.to('styles')
          }
        }));

        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:10,
          $properties:{
            failure: null,
            warning: `The already existing folder "${paths.rel('styles')}" could not be overwritten by the newly created folder and its contents, due to the "overwrite" property settings.`,
            success: null,
            item: 'dir',
            from: null,
            action: 'contents',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel('styles'),
            absolute:paths.to('styles')
          }
        }));

        for(var item of ['styles/css','styles/scss']){
          it.apply(this,should.runCallbackWithObject({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'each',
            $callbackTimes:10,
            $properties:{
              failure: null,
              warning: null,
              success: `The folder "${paths.rel(item)}" was successfully moved from the "${paths.from(item)}" path.`,
              item: 'dir',
              from: paths.from(item),
              action: 'move',
              overwritten: false,
              root:paths.toDir,
              relative:paths.rel(item),
              absolute:paths.to(item)
            }
          }));

          it.apply(this,should.runCallbackWithObject({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'each',
            $callbackTimes:10,
            $properties:{
              warning: null,
              failure: `The already existing folder "${paths.rel(item)}" could not be overwritten by the folder moved from the "${paths.from(item)}" path, because this folder has been already moved.`,
              success: null,
              item: 'dir',
              from: paths.from(item),
              action: 'move',
              overwritten: false,
              root:paths.toDir,
              relative:paths.rel(item),
              absolute:paths.to(item)
            }
          }));
        }

        for(var item of ['styles/css/main.css','styles/css/style.css','styles/css/extra.css','styles/scss/main.scss']){
          it.apply(this,should.runCallbackWithObject({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'each',
            $callbackTimes:10,
            $properties:{
              failure: null,
              warning: null,
              success: `The file "${paths.rel(item)}" was successfully moved from the "${paths.from(item)}" path.`,
              item: 'file',
              from: paths.from(item),
              action: 'move',
              overwritten: false,
              root:paths.toDir,
              relative:paths.rel(item),
              absolute:paths.to(item)
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
                paths.to('styles/css/extra.css'),
                paths.to('styles/scss/main.scss')
              ]),
              warning:[],
              failure:[]
            },
            dirs:{
              success:jasmine.arrayContaining([
                paths.to('styles'),
                paths.to('styles/css'),
                paths.to('styles/scss')
              ]),
              warning:jasmine.arrayContaining([
                paths.to('styles')
              ]),
              failure:jasmine.arrayContaining([
                paths.to('styles/css'),
                paths.to('styles/scss')
              ])
            },
            root:paths.toDir
          }
        }));

      });
      describe(`and 'copy' property`,function(){
        beforeEach(function(){
          this.structure = [
            {dir:paths.name('styles'),contents:[
              {dir:paths.name('styles/css'), copy:paths.from('styles/css'), overwrite:true},
              {dir:paths.name('styles/scss'), copy:paths.from('styles/scss'), overwrite:false}
            ]},
            {dir:paths.name('styles'),contents:[
              {dir:paths.name('styles/css'), copy:paths.from('styles/css'), overwrite:true},
              {dir:paths.name('styles/scss'), copy:paths.from('styles/scss'), overwrite:false}
            ]}
          ];
        });

        it.apply(this,should.createNewFolder({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $folder:paths.to('styles')
        }));

        for(var item of ['styles/css','styles/scss']){
          it.apply(this,should.createNewFolder({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $folder:paths.to(item)
          }));
          it.apply(this,should.not.removeFolder({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $folder:paths.from(item)
          }));
        }

        for(var item of ['styles/css/main.css','styles/css/style.css','styles/css/extra.css','styles/scss/main.scss']){
          it.apply(this,should.createNewFile({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $file:paths.to(item)
          }));

          it.apply(this,should.not.removeFile({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $file:paths.from(item)
          }));

          it.apply(this,should.haveTheSameContent({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $model:paths.from(item),
            $compared:paths.to(item)
          }));

        }

        it.apply(this,should.containItemsNumber({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $directory:paths.toDir,
          $files:4,
          $folders:3
        }));

        it.apply(this,should.runCallback({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:13
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
          $callbackTimes:13,
          $properties:{
            failure: null,
            warning: null,
            success: `The folder "${paths.rel('styles')}" was successfully created with its contents.`,
            item: 'dir',
            from: null,
            action: 'contents',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel('styles'),
            absolute:paths.to('styles')
          }
        }));

        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:13,
          $properties:{
            failure: null,
            warning: `The already existing folder "${paths.rel('styles')}" could not be overwritten by the newly created folder and its contents, due to the "overwrite" property settings.`,
            success: null,
            item: 'dir',
            from: null,
            action: 'contents',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel('styles'),
            absolute:paths.to('styles')
          }
        }));

        for(var item of ['styles/css', 'styles/scss']){
          it.apply(this,should.runCallbackWithObject({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'each',
            $callbackTimes:13,
            $properties:{
              failure: null,
              warning: null,
              success: `The folder "${paths.rel(item)}" was successfully copied from the "${paths.from(item)}" path.`,
              item: 'dir',
              from: paths.from(item),
              action: 'copy',
              overwritten: false,
              root:paths.toDir,
              relative:paths.rel(item),
              absolute:paths.to(item)
            }
          }));
        }

        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:13,
          $properties:{
            failure: null,
            warning: null,
            success: `The already existing folder "${paths.rel('styles/css')}" was successfully overwritten by the folder copied from the "${paths.from('styles/css')}" path.`,
            item: 'dir',
            from: paths.from('styles/css'),
            action: 'copy',
            overwritten: true,
            root:paths.toDir,
            relative:paths.rel('styles/css'),
            absolute:paths.to('styles/css')
          }
        }));

        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:13,
          $properties:{
            failure: null,
            warning: `The already existing folder "${paths.rel('styles/scss')}" could not be overwritten by the folder copied from the "${paths.from('styles/scss')}" path, due to the "overwrite" property settings.`,
            success: null,
            item: 'dir',
            from: paths.from('styles/scss'),
            action: 'copy',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel('styles/scss'),
            absolute:paths.to('styles/scss')
          }
        }));

        for(var item of ['styles/css/main.css','styles/css/style.css','styles/css/extra.css','styles/scss/main.scss']){
          it.apply(this,should.runCallbackWithObject({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'each',
            $callbackTimes:13,
            $properties:{
              success: `The file "${paths.rel(item)}" was successfully copied from the "${paths.from(item)}" path.`,
              warning: null,
              failure: null,
              item: 'file',
              from: paths.from(item),
              action: 'copy',
              overwritten: false,
              root:paths.toDir,
              relative:paths.rel(item),
              absolute:paths.to(item)
            }
          }));
        }

        for(var item of ['styles/css/main.css','styles/css/style.css','styles/css/extra.css']){
          it.apply(this,should.runCallbackWithObject({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'each',
            $callbackTimes:13,
            $properties:{
              success: `The already existing file "${paths.rel(item)}" was successfully overwritten by the file copied from the "${paths.from(item)}" path.`,
              warning: null,
              failure: null,
              item: 'file',
              from: paths.from(item),
              action: 'copy',
              overwritten: true,
              root:paths.toDir,
              relative:paths.rel(item),
              absolute:paths.to(item)
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
                paths.to('styles/css/main.css'),
                paths.to('styles/css/style.css'),
                paths.to('styles/css/style.css'),
                paths.to('styles/css/extra.css'),
                paths.to('styles/css/extra.css'),
                paths.to('styles/scss/main.scss')
              ]),
              warning:[],
              failure:[]
            },
            dirs:{
              success:jasmine.arrayContaining([
                paths.to('styles'),
                paths.to('styles/css'),
                paths.to('styles/css'),
                paths.to('styles/scss')
              ]),
              warning:jasmine.arrayContaining([
                paths.to('styles'),
                paths.to('styles/scss')
              ]),
              failure:[]
            },
            root:paths.toDir
          }
        }));

      });
      describe(`and 'merge' property`,function(){
        beforeEach(function(){
          this.structure = [
            {dir:paths.name('styles'),contents:[
              {dir:paths.name('styles/css'), merge:paths.from('styles/css'), overwrite:true},
              {dir:paths.name('styles/scss'), merge:paths.from('styles/scss'), overwrite:false}
            ]},
            {dir:paths.name('styles'),contents:[
              {dir:paths.name('styles/css'), merge:paths.from('styles/css'), overwrite:true},
              {dir:paths.name('styles/scss'), merge:paths.from('styles/scss'), overwrite:false}
            ]}
          ];
        });

        for(var item of ['styles','styles/css','styles/scss']){
          it.apply(this,should.createNewFolder({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $folder:paths.to(item)
          }));
        }

        for(var item of ['styles/css/main.css','styles/css/style.css','styles/css/extra.css','styles/scss/main.scss']){
          it.apply(this,should.createNewFile({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $file:paths.to(item)
          }));

          it.apply(this,should.haveTheSameContent({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $model:paths.from(item),
            $compared:paths.to(item)
          }));
        }

        it.apply(this,should.containItemsNumber({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $directory:paths.toDir,
          $files:4,
          $folders:3
        }));

        it.apply(this,should.runCallback({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:14
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
          $callbackTimes:14,
          $properties:{
            failure: null,
            warning: null,
            success: `The folder "${paths.rel('styles')}" was successfully created with its contents.`,
            item: 'dir',
            from: null,
            action: 'contents',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel('styles'),
            absolute:paths.to('styles')
          }
        }));

        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:14,
          $properties:{
            failure: null,
            warning: `The already existing folder "${paths.rel('styles')}" could not be overwritten by the newly created folder and its contents, due to the "overwrite" property settings.`,
            success: null,
            item: 'dir',
            from: null,
            action: 'contents',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel('styles'),
            absolute:paths.to('styles')
          }
        }));

        for(var item of ['styles/css','styles/css','styles/scss']){
          it.apply(this,should.runCallbackWithObject({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'each',
            $callbackTimes:14,
            $properties:{
              failure: null,
              warning: null,
              success: `The folder "${paths.rel(item)}" was successfully merged with the "${paths.from(item)}" folder.`,
              item: 'dir',
              from: paths.from(item),
              action: 'merge',
              overwritten: false,
              root:paths.toDir,
              relative:paths.rel(item),
              absolute:paths.to(item)
            }
          }));
        }

        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:14,
          $properties:{
            success: null,
            warning: `The already existing folder "${paths.rel('styles/scss')}" was successfully merged with the "${paths.from('styles/scss')}" folder, but at least one of its child items gave warning.`,
            failure: null,
            item: 'dir',
            from: paths.from('styles/scss'),
            action: 'merge',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel('styles/scss'),
            absolute:paths.to('styles/scss')
          }
        }));

        for(var item of ['styles/css/main.css','styles/css/style.css','styles/css/extra.css','styles/scss/main.scss']){
          it.apply(this,should.runCallbackWithObject({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'each',
            $callbackTimes:14,
            $properties:{
              success: `The file "${paths.rel('styles/scss/main.scss')}" was successfully copied from the "${paths.from('styles/scss/main.scss')}" path.`,
              warning: null,
              failure: null,
              item: 'file',
              from: paths.from('styles/scss/main.scss'),
              action: 'copy',
              overwritten: false,
              root:paths.toDir,
              relative:paths.rel('styles/scss/main.scss'),
              absolute:paths.to('styles/scss/main.scss')
            }
          }));
        }

        for(var item of ['styles/css/main.css','styles/css/style.css','styles/css/extra.css']){
          it.apply(this,should.runCallbackWithObject({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'each',
            $callbackTimes:14,
            $properties:{
              failure: null,
              warning: null,
              success: `The already existing file "${paths.rel(item)}" was successfully overwritten by the file copied from the "${paths.from(item)}" path.`,
              item: 'file',
              from: paths.from(item),
              action: 'copy',
              overwritten: true,
              root:paths.toDir,
              relative:paths.rel(item),
              absolute:paths.to(item)
            }
          }));
        }

        it.apply(this,should.runCallbackWithObject({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:14,
          $properties:{
            failure: null,
            warning: `The already existing file "${paths.rel('styles/scss/main.scss')}" could not be overwritten by the file copied from the "${paths.from('styles/scss/main.scss')}" path, due to the "overwrite" property settings.`,
            success: null,
            item: 'file',
            from: paths.from('styles/scss/main.scss'),
            action: 'copy',
            overwritten: false,
            root:paths.toDir,
            relative:paths.rel('styles/scss/main.scss'),
            absolute:paths.to('styles/scss/main.scss')
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
                paths.to('styles/css/main.css'),
                paths.to('styles/css/style.css'),
                paths.to('styles/css/style.css'),
                paths.to('styles/css/extra.css'),
                paths.to('styles/css/extra.css'),
                paths.to('styles/scss/main.scss')
              ]),
              warning:[paths.to('styles/scss/main.scss')],
              failure:[]
            },
            dirs:{
              success:jasmine.arrayContaining([
                paths.to('styles'),
                paths.to('styles/css'),
                paths.to('styles/css'),
                paths.to('styles/scss')
              ]),
              warning:jasmine.arrayContaining([
                paths.to('styles'),
                paths.to('styles/scss')
              ]),
              failure:[]
            },
            root:paths.toDir
          }
        }));

      });
      describe(`and 'contents' property`,function(){
        beforeEach(function(){
          this.structure = [
            {dir:paths.name('styles'),contents:[
              {file:paths.name('styles/mixins.scss'), overwrite:true},
              {file:paths.name('styles/imports.scss'), overwrite:false},
              {dir:paths.name('styles/css'), contents:[
                  {file:paths.name('styles/css/main.css'), overwrite:true},
                  {file:paths.name('styles/css/style.css'), overwrite:false}
              ]},
              {dir:paths.name('styles/scss'), contents:[
                  {file:paths.name('styles/scss/main.scss')}
              ]}
            ]},
            {dir:paths.name('styles'),contents:[
              {file:paths.name('styles/mixins.scss'), overwrite:true},
              {file:paths.name('styles/imports.scss'), overwrite:false},
              {dir:paths.name('styles/css'), contents:[
                  {file:paths.name('styles/css/main.css'), overwrite:true},
                  {file:paths.name('styles/css/style.css'), overwrite:false},
                  {file:paths.name('styles/css/extra.css')}
              ]},
              {dir:paths.name('styles/scss'), contents:[
                  {file:paths.name('styles/scss/main.scss')}
              ]}
            ]}
          ];
        });

        for(var item of ['styles','styles/css','styles/scss']){
          it.apply(this,should.createNewFolder({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $folder:paths.to(item)
          }));
        }

        for(var item of ['styles/mixins.scss','styles/imports.scss','styles/css/main.css','styles/css/style.css','styles/css/extra.css','styles/scss/main.scss']){
          it.apply(this,should.createNewFile({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $file:paths.to(item)
          }));

          it.apply(this,should.haveContent({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $file:paths.to(item),
            $content:''
          }));

        }

        it.apply(this,should.containItemsNumber({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $directory:paths.toDir,
          $files:6,
          $folders:3
        }));

        it.apply(this,should.runCallback({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'each',
          $callbackTimes:17
        }));

        it.apply(this,should.runCallback({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $callbackTimes:1
        }));

        for(var item of ['styles','styles/css','styles/scss']){
          it.apply(this,should.runCallbackWithObject({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'each',
            $callbackTimes:17,
            $properties:{
              failure: null,
              warning: null,
              success: `The folder "${paths.rel(item)}" was successfully created with its contents.`,
              item: 'dir',
              from: null,
              action: 'contents',
              overwritten: false,
              root:paths.toDir,
              relative:paths.rel(item),
              absolute:paths.to(item)
            }
          }));
        }

        for(var item of ['styles','styles/css','styles/scss']){
          it.apply(this,should.runCallbackWithObject({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'each',
            $callbackTimes:17,
            $properties:{
              failure: null,
              warning: `The already existing folder "${paths.rel(item)}" could not be overwritten by the newly created folder and its contents, due to the "overwrite" property settings.`,
              success: null,
              item: 'dir',
              from: null,
              action: 'contents',
              overwritten: false,
              root:paths.toDir,
              relative:paths.rel(item),
              absolute:paths.to(item)
            }
          }));
        }

        for(var item of ['styles/mixins.scss','styles/imports.scss','styles/css/main.css','styles/css/style.css','styles/scss/main.scss','styles/css/extra.css']){
          it.apply(this,should.runCallbackWithObject({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'each',
            $callbackTimes:17,
            $properties:{
              failure: null,
              warning: null,
              success: `The file "${paths.rel(item)}" was successfully created.`,
              item: 'file',
              from: null,
              action: 'create',
              overwritten: false,
              root:paths.toDir,
              relative:paths.rel(item),
              absolute:paths.to(item)
            }
          }));
        }

        for(var item of ['styles/mixins.scss','styles/css/main.css']){
          it.apply(this,should.runCallbackWithObject({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'each',
            $callbackTimes:17,
            $properties:{
              failure: null,
              warning: null,
              success: `The already existing file "${paths.rel(item)}" was successfully overwritten by the newly created file.`,
              item: 'file',
              from: null,
              action: 'create',
              overwritten: true,
              root:paths.toDir,
              relative:paths.rel(item),
              absolute:paths.to(item)
            }
          }));
        }

        for(var item of ['styles/imports.scss','styles/css/style.css','styles/scss/main.scss']){
          it.apply(this,should.runCallbackWithObject({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'each',
            $callbackTimes:17,
            $properties:{
              failure: null,
              warning: `The already existing file "${paths.rel(item)}" could not be overwritten by the newly created file, due to the "overwrite" property settings.`,
              success: null,
              item: 'file',
              from: null,
              action: 'create',
              overwritten: false,
              root:paths.toDir,
              relative:paths.rel(item),
              absolute:paths.to(item)
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
                paths.to('styles/mixins.scss'),
                paths.to('styles/mixins.scss'),
                paths.to('styles/imports.scss'),
                paths.to('styles/css/main.css'),
                paths.to('styles/css/main.css'),
                paths.to('styles/css/style.css'),
                paths.to('styles/scss/main.scss'),
                paths.to('styles/css/extra.css')
              ]),
              warning:jasmine.arrayContaining([
                paths.to('styles/imports.scss'),
                paths.to('styles/css/style.css'),
                paths.to('styles/scss/main.scss')
              ]),
              failure:[]
            },
            dirs:{
              success:jasmine.arrayContaining([
                paths.to('styles'),
                paths.to('styles/css'),
                paths.to('styles/scss')
              ]),
              warning:jasmine.arrayContaining([
                paths.to('styles'),
                paths.to('styles/css'),
                paths.to('styles/scss')
              ]),
              failure:[]
            },
            root:paths.toDir
          }
        }));
      });
    });
  });
});