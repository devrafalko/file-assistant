/* global expect, __dirname, it, xit */
const path = require('path');

const helpers = path.resolve('./tests/helpers');
const prepare = require(path.resolve(helpers,'prepare.js'));
const paths = require(path.resolve(helpers,'paths.js'));
const should = require(path.resolve(helpers,'should.js'));
const testingModule = require(path.resolve('./index.js'));

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
      $arguments:[paths.toDir]
    }));

    it.apply(this,should.runCallbackWithObject({
      $function:testingModule,
      $arguments:[paths.toDir],
      $callback:'done',
      $callbackTimes:1,
      $properties:{
        error:null
      }
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
        $arguments:[paths.toDir],
        $directory:paths.toDir
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
        $arguments:[paths.toDir]
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $arguments:[paths.toDir],
        $callback:'done',
        $callbackTimes:1,
        $properties:{
          error:null
        }
      }));

      it.apply(this,should.createNewFolder({
        $function:testingModule,
        $arguments:[paths.toDir],
        $folder:paths.toDir
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
        $callbackTimes:1,
        $propertyName:'error',
        $errorObject:Error,
        $message:/Could not create the folder/i
      }));

      it.apply(this,should.not.createNewFolder({
        $function:testingModule,
        $arguments:['X:/a/b'],
        $folder:'X:/a/b'
      }));

      it.apply(this,should.runCallback({
        $function:testingModule,
        $arguments:['X:/a/b'],
        $callback:'each',
        $callbackTimes:0
      }));

  });

  describe("with the root path folder that already exists as a file",function(){
      beforeAll(function(done){
        prepare.remove()
        .then(()=>prepare.addFile('prod'))
        .then(done)
        .catch(done.fail);
      });

      it.apply(this,should.not.throwError({
        $function:testingModule,
        $arguments:[paths.toDir]
      }));

      it.apply(this,should.runCallbackError({
        $function:testingModule,
        $arguments:[paths.toDir],
        $callback:'done',
        $callbackTimes:1,
        $propertyName:'error',
        $errorObject:Error,
        $message:/The file of the same name already exists in this path/i
      }));

      it.apply(this,should.not.createNewFolder({
        $function:testingModule,
        $arguments:[paths.toDir],
        $folder:paths.toDir
      }));

  });

});


