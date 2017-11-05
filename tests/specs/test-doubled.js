/* global expect, it */


const path = require('path');
const helpers = path.resolve('./tests/helpers');
const testingModule = require(path.resolve('./index.js'));

const prepare = require(path.resolve(helpers,'prepare.js'));
const paths = require(path.resolve(helpers,'paths.js'));
const data = require(path.resolve(helpers,'structures.json'));
const should = require(path.resolve(helpers,'should.js'));


fdescribe(`When the structure contains more than one items`,function(){
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
          resolve(getData);
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


    });
    fdescribe(`and 'move' property`,function(){
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




      });
      describe(`and 'merge' property`,function(){
        beforeEach(function(){
          this.structure = [
            {dir:paths.name('styles'),contents:[
              {dir:paths.name('styles/css'), merge:paths.from('styles/css'), overwrite:true},
              {dir:paths.name('styles/scss'), merge:paths.from('styles/scss'), overwrite:false}
            ]},
            {dir:paths.name('styles'),contents:[
              {dir:paths.name('styles/css'), merge:paths.from('styles/scss'), overwrite:true},
              {dir:paths.name('styles/scss'), merge:paths.from('styles/css'), overwrite:false}
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
          $files:8,
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

      });
    });
  });

});
