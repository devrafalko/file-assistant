/* global expect, __dirname, it, xit */

const path = require('path');
const should = require(path.resolve('./tests/helpers/should.js'));
const testingModule = require(path.resolve('./index.js'));

describe("When the module function is executed",function(){
  describe("without any arguments passed through it",function(){
    it.apply(this,should.throwError({
      $function:testingModule,
      $arguments:{
        root:undefined,
        structure:undefined,
        done:undefined,
        each:undefined
      },
      $errorObject:TypeError,
      $message:/Invalid argument \[2\]. The \[undefined\] argument has been passed, while the argument of type \[Function\] is expected\./i
    }));
  });

  describe("with [String] root argument and",function(){
    describe("with [Array] structure, but [Non-Function] done-callback arguments",function(){
      
      it.apply(this,should.throwError({
        $function:testingModule,
        $exclude:'Function',
        $testParameter:'done',
        $errorObject:TypeError,
        $message:/Invalid argument \[2\]. The \[.+\] argument has been passed, while the argument of type \[Function\] is expected\./i
      }));

    });
    describe("with [Function] done-callback, but [Non-Array] structure arguments",function(){
      
      it.apply(this,should.not.throwError({
        $function:testingModule,
        $exclude:'Array',
        $testParameter:'structure'
      }));

      it.apply(this,should.runCallbackTimes({
        $function:testingModule,
        $exclude:'Array',
        $testParameter:'structure',
        $callback:'done',
        $times:1
      }));

      it.apply(this,should.runCallbackError({
        $function:testingModule,
        $exclude:'Array',
        $testParameter:'structure',
        $callback:'done',
        $propertyName:'error',
        $errorObject:TypeError,
        $message:/Invalid argument \[1\]. The \[.+\] argument has been passed, while the argument of type \[Array\] is expected\./i
      }));

      it.apply(this,should.not.runCallback({
        $function:testingModule,
        $exclude:'Array',
        $testParameter:'structure',
        $callback:'each'
      }));
      
    });
  });

  describe("with [Array] structure argument and",function(){
    describe("with [Function] done-callback, but [Non-String] root arguments",function(){

      it.apply(this,should.not.throwError({
        $function:testingModule,
        $exclude:'String',
        $testParameter:'root'
      }));

      it.apply(this,should.runCallbackTimes({
        $function:testingModule,
        $exclude:'String',
        $testParameter:'root',
        $callback:'done',
        $times:1
      }));

      it.apply(this,should.runCallbackError({
        $function:testingModule,
        $exclude:'String',
        $testParameter:'root',
        $callback:'done',
        $propertyName:'error',
        $errorObject:TypeError,
        $message:/Invalid argument \[0\]. The \[.+\] argument has been passed, while the argument of type \[String\] is expected\./i
      }));

      it.apply(this,should.not.runCallback({
        $function:testingModule,
        $exclude:'String',
        $testParameter:'root',
        $callback:'each'
      }));
    });
  });

  describe("with [Function] done-callback,[Array] structure and [String] root arguments and",function(){
    describe("without each-callback argument",function(){

      it.apply(this,should.not.throwError({
        $function:testingModule,
        $include:'undefined',
        $testParameter:'each'
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $include:'undefined',
        $testParameter:'each',
        $callback:'done',
        $properties:{
          error:null
        }
      }));

    });
    describe("with incorrect [Non-Function|non-undefined] each-callback argument",function(){
      
      it.apply(this,should.not.throwError({
        $function:testingModule,
        $exclude:['Function','undefined'],
        $testParameter:'each'
      }));
      
      it.apply(this,should.runCallbackError({
        $function:testingModule,
        $exclude:['Function','undefined'],
        $testParameter:'each',
        $callback:'done',
        $propertyName:'error',
        $errorObject:TypeError,
        $message:/Invalid argument \[3\]. The \[.+\] argument has been passed, while the argument of type \[Function\|undefined\] is expected\./i
      }));
      
    });
    describe("with [Function] each-callback argument",function(){

      it.apply(this,should.not.throwError({
        $function:testingModule,
        $include:'Function',
        $testParameter:'each'
      }));

      it.apply(this,should.runCallbackWithObject({
        $function:testingModule,
        $include:'Function',
        $testParameter:'each',
        $callback:'done',
        $properties:{
          error:null
        }
      }));
      
    });
  });
});