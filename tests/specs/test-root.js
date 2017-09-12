/* global expect, __dirname, it, xit */
const path = require('path');

const helpers = path.resolve('./tests/helpers');
const prepare = require(path.resolve(helpers,'prepare.js'));
const paths = require(path.resolve(helpers,'paths.js'));
const should = require(path.resolve(helpers,'should.js'));
const testingModule = require(path.resolve('./index.js'));

const absoluteToDir = path.resolve(paths.rootDir,paths.toDir);

describe("When the module function is executed",function(){

  describe("with the root path folder that already exists as a folder",function(){

    beforeEach(function(done){
      prepare.remove()
      .then(()=>prepare.resetFrom())
      .then(()=>prepare.resetTo())
      .then(done)
      .catch(done.fail);
    });

    it.apply(this,should.not.throwError({
      $function:testingModule,
      $arguments:[absoluteToDir]
    }));

    it.apply(this,should.runCallbackWithObject({
      $function:testingModule,
      $arguments:[absoluteToDir],
      $callback:'done',
      $properties:{
        error:null
      }
    }));

    it.apply(this,should.runCallbackTimes({
      $function:testingModule,
      $arguments:[absoluteToDir],
      $callback:'done',
      $times:1
    }));

    describe("if the existing root folder has got some content",function(){

      beforeEach(function(done){
        prepare.addTo('styles/scss/main.scss')
        .then(()=>prepare.addTo('styles/css/style.css'))
        .then(()=>prepare.addTo('styles/css/extra.css'))
        .then(()=>prepare.addTo('prod.css'))
        .then(done)
        .catch(done.fail);
      });

      it.apply(this,should.keepPreviousContents({
        $function:testingModule,
        $arguments:[absoluteToDir],
        $directory:absoluteToDir
      }));

    });

  });

  describe("with the root path folder that does not exist",function(){
      beforeEach(function(done){
        prepare.remove()
        .then(()=>prepare.resetFrom())
        .then(done)
        .catch(done.fail);
      });

      it.apply(this,should.not.throwError({
        $function:testingModule,
        $arguments:[absoluteToDir]
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:[absoluteToDir],
        $callback:'done',
        $properties:{
          error:null
        }
      }));

      it.apply(this,should.runCallbackTimes({
        $function:testingModule,
        $arguments:[absoluteToDir],
        $callback:'done',
        $times:1
      }));

      it.apply(this,should.createNewFolder({
        $function:testingModule,
        $arguments:[absoluteToDir],
        $folder:absoluteToDir
      }));

  });

  describe("with the root path folder that is inaccessible",function(){
      beforeEach(function(done){
        prepare.remove()
        .then(done)
        .catch(done.fail);
      });

      it.apply(this,should.not.throwError({
        $function:testingModule,
        $arguments:['X:/a/b']
      }));

      it.apply(this,should.runCallbackError({
        $function:testingModule,
        $arguments:['X:/a/b'],
        $callback:'done',
        $propertyName:'error',
        $errorObject:Error,
        $message:/Could not create the folder/i
      }));

      it.apply(this,should.not.createNewFolder({
        $function:testingModule,
        $arguments:['X:/a/b'],
        $folder:'X:/a/b'
      }));

      it.apply(this,should.runCallbackTimes({
        $function:testingModule,
        $arguments:['X:/a/b'],
        $callback:'done',
        $times:1
      }));

      it.apply(this,should.not.runCallback({
        $function:testingModule,
        $arguments:['X:/a/b'],
        $callback:'each'
      }));

  });

  describe("with the root path folder that already exists as a file",function(){
      beforeEach(function(done){
        prepare.remove()
        .then(()=>prepare.addFile('prod'))
        .then(done)
        .catch(done.fail);
      });

      it.apply(this,should.not.throwError({
        $function:testingModule,
        $arguments:[absoluteToDir]
      }));

      it.apply(this,should.runCallbackError({
        $function:testingModule,
        $arguments:[absoluteToDir],
        $callback:'done',
        $propertyName:'error',
        $errorObject:Error,
        $message:/The file of the same name already exists in this path/i
      }));

      it.apply(this,should.not.createNewFolder({
        $function:testingModule,
        $arguments:[absoluteToDir],
        $folder:absoluteToDir
      }));

      it.apply(this,should.runCallbackTimes({
        $function:testingModule,
        $arguments:[absoluteToDir],
        $callback:'done',
        $times:1
      }));

  });

});


