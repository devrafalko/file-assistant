/* global expect, __dirname, it, xit */

const path = require('path');

const helpers = path.resolve('./tests/helpers');
const should = require(path.resolve(helpers,'should.js'));
const prepare = require(path.resolve(helpers,'prepare.js'));
const paths = require(path.resolve(helpers,'paths.js'));
const testingModule = require(path.resolve('./index.js'));

describe('When the module function is executed with the [Array] structure argument that',function(){
  
  describe('is empty',function(){
    beforeAll(function(done){
      this.structure = [];
      prepare.remove()
      .then(()=>prepare.resetFrom())
      .then(()=>prepare.resetTo())
      .then(done)
      .catch(done.fail);
    });
    
    it.apply(this,should.not.throwError({
      $function:testingModule,
      $arguments:{structure:should.context('structure')}
    }));

    it.apply(this,should.runCallbackWithObject({
      $function:testingModule,
      $arguments:{structure:should.context('structure')},
      $callback:'done',
      $properties:{
        error:null
      }
    }));

    it.apply(this,should.runCallbackTimes({
      $function:testingModule,
      $arguments:{structure:should.context('structure')},
      $callback:'done',
      $times:1
    }));

  });

  describe('contains at least one item that is not of [Object] type',function(){
    beforeAll(function(){
      this.structure = [1];
    });
    
    it.apply(this,should.not.throwError({
      $function:testingModule,
      $arguments:{structure:should.context('structure')}
    }));

    it.apply(this,should.runCallbackError({
      $function:testingModule,
      $arguments:{structure:should.context('structure')},
      $callback:'done',
      $propertyName:'error',
      $errorObject:TypeError,
      $message:/Invalid structure argument \[0\]\. Each item of \[Array\] structure argument must be of \[Object\] type\./i
    }));

    it.apply(this,should.runCallbackTimes({
      $function:testingModule,
      $arguments:{structure:should.context('structure')},
      $callback:'done',
      $times:1
    }));

  });

  describe('contains [Object] type item',function(){

    describe('that is empty',function(){
      beforeAll(function(){
        this.structure = [{}];
      });

      it.apply(this,should.not.throwError({
        $function:testingModule,
        $arguments:{structure:should.context('structure')}
      }));

      it.apply(this,should.runCallbackError({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $propertyName:'error',
        $errorObject:Error,
        $message:/Invalid structure argument \[0\]\. Each item of \[Array\] structure argument must contain either \['file'\] or \['dir'\] property\./i
      }));

      it.apply(this,should.runCallbackTimes({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $times:1
      }));

    });
    
    describe(`that has some properties but neither 'file' nor 'dir' property`,function(){
      beforeAll(function(){
        this.structure = [{move:'',content:2}];
      });

      it.apply(this,should.not.throwError({
        $function:testingModule,
        $arguments:{structure:should.context('structure')}
      }));

      it.apply(this,should.runCallbackError({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $propertyName:'error',
        $errorObject:Error,
        $message:/Invalid structure argument \[0\]\. Each item of \[Array\] structure argument must contain either \['file'\] or \['dir'\] property\./i
      }));

      it.apply(this,should.runCallbackTimes({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $times:1
      }));
      
    });
    

    describe(`that has both 'file' and 'dir' property of incorrect type`,function(){
      beforeAll(function(){
        this.structure = [{dir:2,file:null}];
      });
      
      it.apply(this,should.not.throwError({
        $function:testingModule,
        $arguments:{structure:should.context('structure')}
      }));

      it.apply(this,should.runCallbackError({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $propertyName:'error',
        $errorObject:Error,
        $message:/Invalid structure argument \[0\]\. Each item of \[Array\] structure argument must contain either \['file'\] or \['dir'\] property\./i
      }));

      it.apply(this,should.runCallbackTimes({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $times:1
      }));
    });
    
    describe(`that has both 'file' and 'dir' property of correct [String] type`,function(){
      beforeAll(function(){
        this.structure = [{file:'',dir:''}];
      });
      
      it.apply(this,should.not.throwError({
        $function:testingModule,
        $arguments:{structure:should.context('structure')}
      }));

      it.apply(this,should.runCallbackError({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $propertyName:'error',
        $errorObject:Error,
        $message:/Invalid structure argument \[0\]\. Each item of \[Array\] structure argument must contain either \['file'\] or \['dir'\] property\./i
      }));

      it.apply(this,should.runCallbackTimes({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $times:1
      }));
    });
    
    describe(`that has 'file' property`,function(){
      describe(`but of incorrect type`,function(){

        beforeAll(function(){
          this.structure = [{file:null}];
        });

        it.apply(this,should.not.throwError({
          $function:testingModule,
          $arguments:{structure:should.context('structure')}
        }));

        it.apply(this,should.runCallbackError({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $propertyName:'error',
          $errorObject:TypeError,
          $message:/Invalid structure argument \[0\]\. Invalid property \["file"\]\. The \[.+\] value has been assigned, while the value of type \[String\] is expected\./i
        }));

        it.apply(this,should.runCallbackTimes({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $times:1
        }));

      });
      
      describe(`of correct [String] type`,function(){
        describe(`but containing some backslashes or forwardslashes`,function(){

          beforeAll(function(){
            this.structure = [{file:'./dist/styles.css'}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:Error,
            $message:/Invalid structure argument \[0\]\. The \["file"\] property should define the file name rather than file path\. It cannot contain backslashes and forwardslashes\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));

        });
        describe(`but empty`,function(){

          beforeAll(function(){
            this.structure = [{file:''}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:Error,
            $message:/Invalid structure argument \[0\]\. The \["file"\] property is empty, while it should define the file name\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));

        });
        
        describe(`and also has some unrecognized properties`,function(){
          
          beforeAll(function(){
            this.structure = [{file:'styles.css',a:'',b:null,c:false}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackWithObject({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $properties:{
              error:null
            }
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));
          
        });

      });

    });
    
    describe(`that has 'dir' property`,function(){
      describe(`but of incorrect type`,function(){

        beforeAll(function(){
          this.structure = [{dir:null}];
        });

        it.apply(this,should.not.throwError({
          $function:testingModule,
          $arguments:{structure:should.context('structure')}
        }));

        it.apply(this,should.runCallbackError({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $propertyName:'error',
          $errorObject:TypeError,
          $message:/Invalid structure argument \[0\]\. Invalid property \["dir"\]\. The \[.+\] value has been assigned, while the value of type \[String\] is expected\./i
        }));

        it.apply(this,should.runCallbackTimes({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $times:1
        }));
      });

      describe(`of correct [String] type`,function(){
        describe(`but containing some backslashes and forwardslashes`,function(){

          beforeAll(function(){
            this.structure = [{dir:'./dist/styles'}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:Error,
            $message:/Invalid structure argument \[0\]\. The \["dir"\] property should define the folder name rather than folder path\. It cannot contain backslashes and forwardslashes\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));

        });
        
        describe(`but empty`,function(){

          beforeAll(function(){
            this.structure = [{dir:''}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:Error,
            $message:/Invalid structure argument \[0\]\. The \["dir"\] property is empty, while it should define the folder name\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));

        });
        
        describe(`and also has some unrecognized properties`,function(){

          beforeAll(function(){
            this.structure = [{dir:'styles',a:'',b:null,c:false}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackWithObject({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $properties:{
              error:null
            }
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));

        });

      });

    });

    describe(`that has 'move' property`,function(){

        describe(`but also has 'copy' property`,function(){
          
          beforeAll(function(){
            this.structure = [{file:'styles.css',move:'',copy:''}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:Error,
            $message:/Invalid structure argument \[0\]\. The \[Object\] items cannot contain \["move"], \["copy"\], \["merge"\], \["content"\] or \["data"\] properties at the same time\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));

        });
        describe(`but also has 'merge' property`,function(){
          
          beforeAll(function(){
            this.structure = [{file:'styles.css',move:'',merge:''}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:Error,
            $message:/Invalid structure argument \[0\]\. The \[Object\] items cannot contain \["move"], \["copy"\], \["merge"\], \["content"\] or \["data"\] properties at the same time\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));
          
        });
        describe(`but also has 'content' property`,function(){

          beforeAll(function(){
            this.structure = [{file:'styles.css',move:'',content:''}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:Error,
            $message:/Invalid structure argument \[0\]\. The \[Object\] items cannot contain \["move"], \["copy"\], \["merge"\], \["content"\] or \["data"\] properties at the same time\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));

        });
        describe(`but also has 'data' property`,function(){

          beforeAll(function(){
            this.structure = [{file:'styles.css',move:'',data:''}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:Error,
            $message:/Invalid structure argument \[0\]\. The \[Object\] items cannot contain \["move"], \["copy"\], \["merge"\], \["content"\] or \["data"\] properties at the same time\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));


        });
        describe(`but of incorrect type`,function(){

          beforeAll(function(){
            this.structure = [{file:'styles.css',move:null}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:TypeError,
            $message:/Invalid structure argument \[0\]\. Invalid property \["move"\]\. The \[.+\] value has been assigned, while the value of type \[String\] is expected\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));


        });
       describe(`of correct [String] type`,function(){
          
          describe(`but empty, while it should indicate file`,function(){

            beforeAll(function(){
              this.structure = [{file:'styles.css',move:''}];
            });

            it.apply(this,should.not.throwError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')}
            }));

            it.apply(this,should.runCallbackError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $propertyName:'error',
              $errorObject:Error,
              $message:/Invalid structure argument \[0\]\. The \["move"\] property is empty, while it should indicate the file\./i
            }));

            it.apply(this,should.runCallbackTimes({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $times:1
            }));

          });

          describe(`but empty, while it should indicate folder`,function(){

            beforeAll(function(){
              this.structure = [{dir:'styles',move:''}];
            });

            it.apply(this,should.not.throwError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')}
            }));

            it.apply(this,should.runCallbackError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $propertyName:'error',
              $errorObject:Error,
              $message:/Invalid structure argument \[0\]\. The \["move"\] property is empty, while it should indicate the folder\./i
            }));

            it.apply(this,should.runCallbackTimes({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $times:1
            }));

          });

          describe(`but it leads to the file, while the item has the 'dir' property`,function(){

            beforeAll(function(){
              this.structure = [{dir:'styles',move:paths.from('variables.scss')}];
            });

            beforeEach(function(done){
              prepare.remove()
              .then(()=>prepare.resetFrom())
              .then(()=>prepare.resetTo())
              .then(done)
              .catch(done.fail);
            });

            it.apply(this,should.not.throwError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')}
            }));

            it.apply(this,should.runCallbackError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $propertyName:'error',
              $errorObject:Error,
              $message:/Invalid structure argument \[0\]\. Invalid property \["move"\]\. The path leads to the file, while it should indicate the folder\./i
            }));

            it.apply(this,should.runCallbackTimes({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $times:1
            }));


          });
          describe(`but it leads to the folder, while the item has the 'file' property`,function(){

            beforeAll(function(){
              this.structure = [{file:'variables.scss',move:paths.from('styles')}];
            });

            beforeEach(function(done){
              prepare.remove()
              .then(()=>prepare.resetFrom())
              .then(()=>prepare.resetTo())
              .then(done)
              .catch(done.fail);
            });

            it.apply(this,should.not.throwError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')}
            }));

            it.apply(this,should.runCallbackError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $propertyName:'error',
              $errorObject:Error,
              $message:/Invalid structure argument \[0\]\. Invalid property \["move"\]\. The path leads to the folder, while it should indicate the file\./i
            }));

            it.apply(this,should.runCallbackTimes({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $times:1
            }));

          });
          describe(`but it leads to the non existing folder, while the item has the 'dir' property`,function(){
            
            beforeAll(function(){
              this.structure = [{dir:'styles',move:'./a/b/c'}];
            });

            it.apply(this,should.not.throwError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')}
            }));

            it.apply(this,should.runCallbackError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $propertyName:'error',
              $errorObject:Error,
              $message:/Invalid structure argument \[0\]\. Invalid property \["move"\]\. The folder of the specified path does not exist\./i
            }));

            it.apply(this,should.runCallbackTimes({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $times:1
            }));
            
          });
          describe(`but it leads to the non existing file, while the item has the 'file' property`,function(){

            beforeAll(function(){
              this.structure = [{file:'styles.css',move:'./a/b/c.css'}];
            });

            it.apply(this,should.not.throwError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')}
            }));

            it.apply(this,should.runCallbackError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $propertyName:'error',
              $errorObject:Error,
              $message:/Invalid structure argument \[0\]\. Invalid property \["move"\]\. The file of the specified path does not exist\./i
            }));

            it.apply(this,should.runCallbackTimes({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $times:1
            }));

          });

        });


    });

    describe(`that has 'copy' property`,function(){

        describe(`but also has 'merge' property`,function(){
          beforeAll(function(){
            this.structure = [{file:'styles.css',copy:'',merge:''}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:Error,
            $message:/Invalid structure argument \[0\]\. The \[Object\] items cannot contain \["move"], \["copy"\], \["merge"\], \["content"\] or \["data"\] properties at the same time\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));
        });
        describe(`but also has 'content' property`,function(){

          beforeAll(function(){
            this.structure = [{file:'styles.css',copy:'',content:''}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:Error,
            $message:/Invalid structure argument \[0\]\. The \[Object\] items cannot contain \["move"], \["copy"\], \["merge"\], \["content"\] or \["data"\] properties at the same time\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));

        });
        describe(`but also has 'data' property`,function(){
          
          beforeAll(function(){
            this.structure = [{file:'styles.css',copy:'',data:''}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:Error,
            $message:/Invalid structure argument \[0\]\. The \[Object\] items cannot contain \["move"], \["copy"\], \["merge"\], \["content"\] or \["data"\] properties at the same time\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));
          
        });
        
        describe(`but of incorrect type`,function(){
          beforeAll(function(){
            this.structure = [{file:'styles.css',copy:null}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:TypeError,
            $message:/Invalid structure argument \[0\]\. Invalid property \["copy"\]\. The \[.+\] value has been assigned, while the value of type \[String\] is expected\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));
        });
        describe(`of correct [String] type`,function(){
          
          describe(`but empty, while it should indicate file`,function(){

            beforeAll(function(){
              this.structure = [{file:'styles.css',copy:''}];
            });

            it.apply(this,should.not.throwError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')}
            }));

            it.apply(this,should.runCallbackError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $propertyName:'error',
              $errorObject:Error,
              $message:/Invalid structure argument \[0\]\. The \["copy"\] property is empty, while it should indicate the file\./i
            }));

            it.apply(this,should.runCallbackTimes({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $times:1
            }));

          });

          describe(`but empty, while it should indicate folder`,function(){

            beforeAll(function(){
              this.structure = [{dir:'styles',copy:''}];
            });

            it.apply(this,should.not.throwError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')}
            }));

            it.apply(this,should.runCallbackError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $propertyName:'error',
              $errorObject:Error,
              $message:/Invalid structure argument \[0\]\. The \["copy"\] property is empty, while it should indicate the folder\./i
            }));

            it.apply(this,should.runCallbackTimes({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $times:1
            }));

          });          
          
          describe(`but it leads to the file, while the item has the 'dir' property`,function(){

            beforeAll(function(){
              this.structure = [{dir:'styles',copy:paths.from('variables.scss')}];
            });

            beforeEach(function(done){
              prepare.remove()
              .then(()=>prepare.resetFrom())
              .then(()=>prepare.resetTo())
              .then(done)
              .catch(done.fail);
            });

            it.apply(this,should.not.throwError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')}
            }));

            it.apply(this,should.runCallbackError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $propertyName:'error',
              $errorObject:Error,
              $message:/Invalid structure argument \[0\]\. Invalid property \["copy"\]\. The path leads to the file, while it should indicate the folder\./i
            }));

            it.apply(this,should.runCallbackTimes({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $times:1
            }));


          });
          describe(`but it leads to the folder, while the item has the 'file' property`,function(){

            beforeAll(function(){
              this.structure = [{file:'variables.scss',copy:paths.from('styles')}];
            });

            beforeEach(function(done){
              prepare.remove()
              .then(()=>prepare.resetFrom())
              .then(()=>prepare.resetTo())
              .then(done)
              .catch(done.fail);
            });

            it.apply(this,should.not.throwError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')}
            }));

            it.apply(this,should.runCallbackError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $propertyName:'error',
              $errorObject:Error,
              $message:/Invalid structure argument \[0\]\. Invalid property \["copy"\]\. The path leads to the folder, while it should indicate the file\./i
            }));

            it.apply(this,should.runCallbackTimes({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $times:1
            }));

          });
          describe(`but it leads to the non existing folder, while the item has the 'dir' property`,function(){

            beforeAll(function(){
              this.structure = [{dir:'styles',copy:'./a/b/c'}];
            });

            it.apply(this,should.not.throwError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')}
            }));

            it.apply(this,should.runCallbackError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $propertyName:'error',
              $errorObject:Error,
              $message:/Invalid structure argument \[0\]\. Invalid property \["copy"\]\. The folder of the specified path does not exist\./i
            }));

            it.apply(this,should.runCallbackTimes({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $times:1
            }));
            

          });
          describe(`but it leads to the non existing file, while the item has the 'file' property`,function(){

            beforeAll(function(){
              this.structure = [{file:'styles.css',copy:'./a/b/c.css'}];
            });

            it.apply(this,should.not.throwError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')}
            }));

            it.apply(this,should.runCallbackError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $propertyName:'error',
              $errorObject:Error,
              $message:/Invalid structure argument \[0\]\. Invalid property \["copy"\]\. The file of the specified path does not exist\./i
            }));

            it.apply(this,should.runCallbackTimes({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $times:1
            }));

          });
          
        });
    
    });
    describe(`that has 'merge' property`,function(){
      
        describe(`but also has 'content' property`,function(){
          
          beforeAll(function(){
            this.structure = [{dir:'styles',merge:'',content:''}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:Error,
            $message:/Invalid structure argument \[0\]\. The \[Object\] items cannot contain \["move"], \["copy"\], \["merge"\], \["content"\] or \["data"\] properties at the same time\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));
          
        });
        describe(`but also has 'data' property`,function(){
          beforeAll(function(){
            this.structure = [{dir:'styles',merge:'',data:''}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:Error,
            $message:/Invalid structure argument \[0\]\. The \[Object\] items cannot contain \["move"], \["copy"\], \["merge"\], \["content"\] or \["data"\] properties at the same time\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));
        });
        describe(`but also has 'file' property`,function(){
          
          beforeAll(function(){
            this.structure = [{file:'styles.css',merge:''}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:Error,
            $message:/Invalid structure argument \[0\]\. The \["merge"\] property can be defined only with \["dir"\] property\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));
          
        });
        describe(`but of incorrect type`,function(){
          
          beforeAll(function(){
            this.structure = [{dir:'styles',merge:null}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:TypeError,
            $message:/Invalid structure argument \[0\]\. Invalid property \["merge"\]\. The \[.+\] value has been assigned, while the value of type \[String\] is expected\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));
          
        });
        describe(`of correct [String] type`,function(){

          describe(`but empty, while it should indicate folder`,function(){

            beforeAll(function(){
              this.structure = [{dir:'styles',merge:''}];
            });

            it.apply(this,should.not.throwError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')}
            }));

            it.apply(this,should.runCallbackError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $propertyName:'error',
              $errorObject:Error,
              $message:/Invalid structure argument \[0\]\. The \["merge"\] property is empty, while it should indicate the folder\./i
            }));

            it.apply(this,should.runCallbackTimes({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $times:1
            }));

          });          
          
          describe(`but it leads to the file, while it should lead only to the folder`,function(){


            beforeAll(function(){
              this.structure = [{dir:'styles',merge:paths.from('variables.scss')}];
            });

            beforeEach(function(done){
              prepare.remove()
              .then(()=>prepare.resetFrom())
              .then(()=>prepare.resetTo())
              .then(done)
              .catch(done.fail);
            });

            it.apply(this,should.not.throwError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')}
            }));

            it.apply(this,should.runCallbackError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $propertyName:'error',
              $errorObject:Error,
              $message:/Invalid structure argument \[0\]\. Invalid property \["merge"\]\. The path leads to the file, while it should indicate the folder\./i
            }));

            it.apply(this,should.runCallbackTimes({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $times:1
            }));



          });
          describe(`but it leads to the non existing folder`,function(){

            beforeAll(function(){
              this.structure = [{dir:'styles',merge:'./a/b/c'}];
            });

            it.apply(this,should.not.throwError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')}
            }));

            it.apply(this,should.runCallbackError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $propertyName:'error',
              $errorObject:Error,
              $message:/Invalid structure argument \[0\]\. Invalid property \["merge"\]\. The folder of the specified path does not exist\./i
            }));

            it.apply(this,should.runCallbackTimes({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $times:1
            }));
            

          });
          
        });
    
    });

    describe(`that has 'data' property`,function(){
      
        describe(`but also has 'content' property`,function(){

          beforeAll(function(){
            this.structure = [{file:'styles.css',data:'',content:''}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:Error,
            $message:/Invalid structure argument \[0\]\. The \[Object\] items cannot contain \["move"], \["copy"\], \["merge"\], \["content"\] or \["data"\] properties at the same time\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));

        });
        describe(`but also has 'dir' property`,function(){
          
          beforeAll(function(){
            this.structure = [{dir:'styles',data:''}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:Error,
            $message:/Invalid structure argument \[0\]\. The \["data"\] property can be defined only with \["file"\] property\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));
          
          
        });
        describe(`but of incorrect type`,function(){

          beforeAll(function(){
            this.structure = [{file:'styles.css',data:null}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:TypeError,
            $message:/Invalid structure argument \[0\]\. Invalid property \["data"\]\. The \[.+\] value has been assigned, while the value of type \[String\] is expected\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));

        });
        describe(`of correct [String] type`,function(){

          describe(`but empty, while it should indicate file`,function(){

            beforeAll(function(){
              this.structure = [{file:'variables.scss',data:''}];
            });

            it.apply(this,should.not.throwError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')}
            }));

            it.apply(this,should.runCallbackError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $propertyName:'error',
              $errorObject:Error,
              $message:/Invalid structure argument \[0\]\. The \["data"\] property is empty, while it should indicate the file\./i
            }));

            it.apply(this,should.runCallbackTimes({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $times:1
            }));

          });

          describe(`but it leads to the folder, while it should lead only to the file`,function(){
            beforeAll(function(){
              this.structure = [{file:'variables.scss',data:paths.from('styles')}];
            });

            beforeEach(function(done){
              prepare.remove()
              .then(()=>prepare.resetFrom())
              .then(()=>prepare.resetTo())
              .then(done)
              .catch(done.fail);
            });

            it.apply(this,should.not.throwError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')}
            }));

            it.apply(this,should.runCallbackError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $propertyName:'error',
              $errorObject:Error,
              $message:/Invalid structure argument \[0\]\. Invalid property \["data"\]\. The path leads to the folder, while it should indicate the file\./i
            }));

            it.apply(this,should.runCallbackTimes({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $times:1
            }));
          });
          describe(`but it leads to the non existing file`,function(){
            beforeAll(function(){
              this.structure = [{file:'styles.css',data:'./a/b/c.css'}];
            });

            it.apply(this,should.not.throwError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')}
            }));

            it.apply(this,should.runCallbackError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $propertyName:'error',
              $errorObject:Error,
              $message:/Invalid structure argument \[0\]\. Invalid property \["data"\]\. The file of the specified path does not exist\./i
            }));

            it.apply(this,should.runCallbackTimes({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $times:1
            }));
          });

        });

    });

    describe(`that has 'file' property and 'content' property`,function(){

        describe(`but of incorrect type`,function(){

          beforeAll(function(){
            this.structure = [{file:'styles.css',content:[]}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:TypeError,
            $message:/Invalid structure argument \[0\]\. Invalid property \["content"\]\. The \[.+\] value has been assigned, while the value of type \[String\] is expected\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));

        });

    });

    describe(`that has 'dir' property and 'content' property`,function(){

        describe(`but of incorrect type`,function(){

          beforeAll(function(){
            this.structure = [{dir:'styles',content:''}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:TypeError,
            $message:/Invalid structure argument \[0\]\. Invalid property \["content"\]\. The \[.+\] value has been assigned, while the value of type \[Array\] is expected\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));

        });

    });


    describe(`that has 'overwrite' property`,function(){

      describe(`but of incorrect type`,function(){
        beforeAll(function(){
          this.structure = [{dir:'styles',overwrite:''}];
        });

        it.apply(this,should.not.throwError({
          $function:testingModule,
          $arguments:{structure:should.context('structure')}
        }));

        it.apply(this,should.runCallbackError({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $propertyName:'error',
          $errorObject:TypeError,
          $message:/Invalid structure argument \[0\]\. Invalid property \["overwrite"\]\. The \[.+\] value has been assigned, while the value of type \[Boolean\] is expected\./i
        }));

        it.apply(this,should.runCallbackTimes({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $times:1
        }));
        
      });

    });

  });

});



describe(`contains [Object] item with [Array] 'content' property that`,function(){
  
  describe('is empty',function(){
    beforeAll(function(){
      this.structure = [{dir:'styles',content:[]}];
    });

    it.apply(this,should.not.throwError({
      $function:testingModule,
      $arguments:{structure:should.context('structure')}
    }));

    it.apply(this,should.runCallbackWithObject({
      $function:testingModule,
      $arguments:{structure:should.context('structure')},
      $callback:'done',
      $properties:{
        error:null
      }
    }));

    it.apply(this,should.runCallbackTimes({
      $function:testingModule,
      $arguments:{structure:should.context('structure')},
      $callback:'done',
      $times:1
    }));

  });

  describe('contains at least one item that is not of [Object] type',function(){
    beforeAll(function(){
      this.structure = [{dir:'styles',content:[1]}];
    });
    
    it.apply(this,should.not.throwError({
      $function:testingModule,
      $arguments:{structure:should.context('structure')}
    }));

    it.apply(this,should.runCallbackError({
      $function:testingModule,
      $arguments:{structure:should.context('structure')},
      $callback:'done',
      $propertyName:'error',
      $errorObject:TypeError,
      $message:/Invalid structure argument \[0\]\[0\]\. Each item of \[Array\] structure argument must be of \[Object\] type\./i
    }));

    it.apply(this,should.runCallbackTimes({
      $function:testingModule,
      $arguments:{structure:should.context('structure')},
      $callback:'done',
      $times:1
    }));

  });

  describe('contains [Object] type item',function(){

    describe('that is empty',function(){
      beforeAll(function(){
        this.structure = [{dir:'styles',content:[{}]}];
      });

      it.apply(this,should.not.throwError({
        $function:testingModule,
        $arguments:{structure:should.context('structure')}
      }));

      it.apply(this,should.runCallbackError({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $propertyName:'error',
        $errorObject:Error,
        $message:/Invalid structure argument \[0\]\[0\]\. Each item of \[Array\] structure argument must contain either \['file'\] or \['dir'\] property\./i
      }));

      it.apply(this,should.runCallbackTimes({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $times:1
      }));

    });
    
    describe(`that has some properties but neither 'file' nor 'dir' property`,function(){
      beforeAll(function(){
        this.structure = [{dir:'styles',content:[{move:'',content:2}]}];
      });

      it.apply(this,should.not.throwError({
        $function:testingModule,
        $arguments:{structure:should.context('structure')}
      }));

      it.apply(this,should.runCallbackError({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $propertyName:'error',
        $errorObject:Error,
        $message:/Invalid structure argument \[0\]\[0\]\. Each item of \[Array\] structure argument must contain either \['file'\] or \['dir'\] property\./i
      }));

      it.apply(this,should.runCallbackTimes({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $times:1
      }));
      
    });
    

    describe(`that has both 'file' and 'dir' property of incorrect type`,function(){
      beforeAll(function(){
        this.structure = [{dir:'styles',content:[{file:2,dir:null}]}];
      });
      
      it.apply(this,should.not.throwError({
        $function:testingModule,
        $arguments:{structure:should.context('structure')}
      }));

      it.apply(this,should.runCallbackError({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $propertyName:'error',
        $errorObject:Error,
        $message:/Invalid structure argument \[0\]\[0\]\. Each item of \[Array\] structure argument must contain either \['file'\] or \['dir'\] property\./i
      }));

      it.apply(this,should.runCallbackTimes({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $times:1
      }));
    });
    
    describe(`that has both 'file' and 'dir' property of correct [String] type`,function(){
      beforeAll(function(){
        this.structure = [{dir:'styles',content:[{file:'',dir:''}]}];
      });
      
      it.apply(this,should.not.throwError({
        $function:testingModule,
        $arguments:{structure:should.context('structure')}
      }));

      it.apply(this,should.runCallbackError({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $propertyName:'error',
        $errorObject:Error,
        $message:/Invalid structure argument \[0\]\[0\]\. Each item of \[Array\] structure argument must contain either \['file'\] or \['dir'\] property\./i
      }));

      it.apply(this,should.runCallbackTimes({
        $function:testingModule,
        $arguments:{structure:should.context('structure')},
        $callback:'done',
        $times:1
      }));
    });
    
    describe(`that has 'file' property`,function(){
      describe(`but of incorrect type`,function(){

        beforeAll(function(){
          this.structure = [{dir:'styles',content:[{file:null}]}];
        });

        it.apply(this,should.not.throwError({
          $function:testingModule,
          $arguments:{structure:should.context('structure')}
        }));

        it.apply(this,should.runCallbackError({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $propertyName:'error',
          $errorObject:TypeError,
          $message:/Invalid structure argument \[0\]\[0\]\. Invalid property \["file"\]\. The \[.+\] value has been assigned, while the value of type \[String\] is expected\./i
        }));

        it.apply(this,should.runCallbackTimes({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $times:1
        }));

      });
      
      describe(`of correct [String] type`,function(){
        describe(`but containing some backslashes or forwardslashes`,function(){

          beforeAll(function(){
            this.structure = [{dir:'styles',content:[{file:'./dist/styles.css'}]}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:Error,
            $message:/Invalid structure argument \[0\]\[0\]\. The \["file"\] property should define the file name rather than file path\. It cannot contain backslashes and forwardslashes\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));

        });
        describe(`but empty`,function(){

          beforeAll(function(){
            this.structure = [{dir:'styles',content:[{file:''}]}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:Error,
            $message:/Invalid structure argument \[0\]\[0\]\. The \["file"\] property is empty, while it should define the file name\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));

        });
        
        describe(`and also has some unrecognized properties`,function(){
          
          beforeAll(function(){
            this.structure = [{dir:'styles',content:[{file:'styles.css',a:'',b:null,c:false}]}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackWithObject({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $properties:{
              error:null
            }
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));
          
        });

      });

    });
    
    describe(`that has 'dir' property`,function(){
      describe(`but of incorrect type`,function(){

        beforeAll(function(){
          this.structure = [{dir:'styles',content:[{dir:null}]}];
        });

        it.apply(this,should.not.throwError({
          $function:testingModule,
          $arguments:{structure:should.context('structure')}
        }));

        it.apply(this,should.runCallbackError({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $propertyName:'error',
          $errorObject:TypeError,
          $message:/Invalid structure argument \[0\]\[0\]\. Invalid property \["dir"\]\. The \[.+\] value has been assigned, while the value of type \[String\] is expected\./i
        }));

        it.apply(this,should.runCallbackTimes({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $times:1
        }));
      });

      describe(`of correct [String] type`,function(){
        describe(`but containing some backslashes and forwardslashes`,function(){

          beforeAll(function(){
            this.structure = [{dir:'styles',content:[{dir:'./dist/styles'}]}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:Error,
            $message:/Invalid structure argument \[0\]\[0\]\. The \["dir"\] property should define the folder name rather than folder path\. It cannot contain backslashes and forwardslashes\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));

        });
        
        describe(`but empty`,function(){

          beforeAll(function(){
            this.structure = [{dir:'styles',content:[{dir:''}]}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:Error,
            $message:/Invalid structure argument \[0\]\[0\]\. The \["dir"\] property is empty, while it should define the folder name\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));

        });
        
        describe(`and also has some unrecognized properties`,function(){

          beforeAll(function(){
            this.structure = [{dir:'styles',content:[{dir:'styles',a:'',b:null,c:false}]}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackWithObject({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $properties:{
              error:null
            }
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));

        });

      });

    });

    describe(`that has 'move' property`,function(){

        describe(`but also has 'copy' property`,function(){
          
          beforeAll(function(){
            this.structure = [{dir:'styles',content:[{file:'styles.css',move:'',copy:''}]}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:Error,
            $message:/Invalid structure argument \[0\]\[0\]\. The \[Object\] items cannot contain \["move"], \["copy"\], \["merge"\], \["content"\] or \["data"\] properties at the same time\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));

        });
        describe(`but also has 'merge' property`,function(){
          
          beforeAll(function(){
            this.structure = [{dir:'styles',content:[{file:'styles.css',move:'',merge:''}]}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:Error,
            $message:/Invalid structure argument \[0\]\[0\]\. The \[Object\] items cannot contain \["move"], \["copy"\], \["merge"\], \["content"\] or \["data"\] properties at the same time\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));
          
        });
        describe(`but also has 'content' property`,function(){

          beforeAll(function(){
            this.structure = [{dir:'styles',content:[{file:'styles.css',move:'',content:''}]}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:Error,
            $message:/Invalid structure argument \[0\]\[0\]\. The \[Object\] items cannot contain \["move"], \["copy"\], \["merge"\], \["content"\] or \["data"\] properties at the same time\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));

        });
        describe(`but also has 'data' property`,function(){

          beforeAll(function(){
            this.structure = [{dir:'styles',content:[{file:'styles.css',move:'',data:''}]}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:Error,
            $message:/Invalid structure argument \[0\]\[0\]\. The \[Object\] items cannot contain \["move"], \["copy"\], \["merge"\], \["content"\] or \["data"\] properties at the same time\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));


        });
        describe(`but of incorrect type`,function(){

          beforeAll(function(){
            this.structure = [{dir:'styles',content:[{file:'styles.css',move:null}]}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:TypeError,
            $message:/Invalid structure argument \[0\]\[0\]\. Invalid property \["move"\]\. The \[.+\] value has been assigned, while the value of type \[String\] is expected\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));


        });
        describe(`of correct [String] type`,function(){
          
          describe(`but empty, while it should indicate file`,function(){

            beforeAll(function(){
              this.structure = [{dir:'styles',content:[{file:'styles.css',move:''}]}];
            });

            it.apply(this,should.not.throwError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')}
            }));

            it.apply(this,should.runCallbackError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $propertyName:'error',
              $errorObject:Error,
              $message:/Invalid structure argument \[0\]\[0\]\. The \["move"\] property is empty, while it should indicate the file\./i
            }));

            it.apply(this,should.runCallbackTimes({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $times:1
            }));

          });

          describe(`but empty, while it should indicate folder`,function(){

            beforeAll(function(){
              this.structure = [{dir:'styles',content:[{dir:'styles',move:''}]}];
            });

            it.apply(this,should.not.throwError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')}
            }));

            it.apply(this,should.runCallbackError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $propertyName:'error',
              $errorObject:Error,
              $message:/Invalid structure argument \[0\]\[0\]\. The \["move"\] property is empty, while it should indicate the folder\./i
            }));

            it.apply(this,should.runCallbackTimes({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $times:1
            }));

          });

          describe(`but it leads to the file, while the item has the 'dir' property`,function(){

            beforeAll(function(){
              this.structure = [{dir:'styles',content:[{dir:'styles',move:paths.from('variables.scss')}]}];
            });

            beforeEach(function(done){
              prepare.remove()
              .then(()=>prepare.resetFrom())
              .then(()=>prepare.resetTo())
              .then(done)
              .catch(done.fail);
            });

            it.apply(this,should.not.throwError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')}
            }));

            it.apply(this,should.runCallbackError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $propertyName:'error',
              $errorObject:Error,
              $message:/Invalid structure argument \[0\]\[0\]\. Invalid property \["move"\]\. The path leads to the file, while it should indicate the folder\./i
            }));

            it.apply(this,should.runCallbackTimes({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $times:1
            }));


          });
          describe(`but it leads to the folder, while the item has the 'file' property`,function(){

            beforeAll(function(){
              this.structure = [{dir:'styles',content:[{file:'variables.scss',move:paths.from('styles')}]}];
            });

            beforeEach(function(done){
              prepare.remove()
              .then(()=>prepare.resetFrom())
              .then(()=>prepare.resetTo())
              .then(done)
              .catch(done.fail);
            });

            it.apply(this,should.not.throwError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')}
            }));

            it.apply(this,should.runCallbackError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $propertyName:'error',
              $errorObject:Error,
              $message:/Invalid structure argument \[0\]\[0\]\. Invalid property \["move"\]\. The path leads to the folder, while it should indicate the file\./i
            }));

            it.apply(this,should.runCallbackTimes({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $times:1
            }));

          });
          describe(`but it leads to the non existing folder, while the item has the 'dir' property`,function(){
            
            beforeAll(function(){
              this.structure = [{dir:'styles',content:[{dir:'styles',move:'./a/b/c'}]}];
            });

            it.apply(this,should.not.throwError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')}
            }));

            it.apply(this,should.runCallbackError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $propertyName:'error',
              $errorObject:Error,
              $message:/Invalid structure argument \[0\]\[0\]\. Invalid property \["move"\]\. The folder of the specified path does not exist\./i
            }));

            it.apply(this,should.runCallbackTimes({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $times:1
            }));
            
          });
          describe(`but it leads to the non existing file, while the item has the 'file' property`,function(){

            beforeAll(function(){
              this.structure = [{dir:'styles',content:[{file:'styles.css',move:'./a/b/c.css'}]}];
            });

            it.apply(this,should.not.throwError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')}
            }));

            it.apply(this,should.runCallbackError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $propertyName:'error',
              $errorObject:Error,
              $message:/Invalid structure argument \[0\]\[0\]\. Invalid property \["move"\]\. The file of the specified path does not exist\./i
            }));

            it.apply(this,should.runCallbackTimes({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $times:1
            }));

          });

        });


    });

    describe(`that has 'copy' property`,function(){

        describe(`but also has 'merge' property`,function(){
          beforeAll(function(){
            this.structure = [{dir:'styles',content:[{file:'styles.css',copy:'',merge:''}]}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:Error,
            $message:/Invalid structure argument \[0\]\[0\]\. The \[Object\] items cannot contain \["move"], \["copy"\], \["merge"\], \["content"\] or \["data"\] properties at the same time\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));
        });
        describe(`but also has 'content' property`,function(){

          beforeAll(function(){
            this.structure = [{dir:'styles',content:[{file:'styles.css',copy:'',content:''}]}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:Error,
            $message:/Invalid structure argument \[0\]\[0\]\. The \[Object\] items cannot contain \["move"], \["copy"\], \["merge"\], \["content"\] or \["data"\] properties at the same time\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));

        });
        describe(`but also has 'data' property`,function(){
          
          beforeAll(function(){
            this.structure = [{dir:'styles',content:[{file:'styles.css',copy:'',data:''}]}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:Error,
            $message:/Invalid structure argument \[0\]\[0\]\. The \[Object\] items cannot contain \["move"], \["copy"\], \["merge"\], \["content"\] or \["data"\] properties at the same time\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));
          
        });
        
        describe(`but of incorrect type`,function(){
          beforeAll(function(){
            this.structure = [{dir:'styles',content:[{file:'styles.css',copy:null}]}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:TypeError,
            $message:/Invalid structure argument \[0\]\[0\]\. Invalid property \["copy"\]\. The \[.+\] value has been assigned, while the value of type \[String\] is expected\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));
        });
        describe(`of correct [String] type`,function(){
          
          describe(`but empty, while it should indicate file`,function(){

            beforeAll(function(){
              this.structure = [{dir:'styles',content:[{file:'styles.css',copy:''}]}];
            });

            it.apply(this,should.not.throwError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')}
            }));

            it.apply(this,should.runCallbackError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $propertyName:'error',
              $errorObject:Error,
              $message:/Invalid structure argument \[0\]\[0\]\. The \["copy"\] property is empty, while it should indicate the file\./i
            }));

            it.apply(this,should.runCallbackTimes({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $times:1
            }));

          });

          describe(`but empty, while it should indicate folder`,function(){

            beforeAll(function(){
              this.structure = [{dir:'styles',content:[{dir:'styles',copy:''}]}];
            });

            it.apply(this,should.not.throwError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')}
            }));

            it.apply(this,should.runCallbackError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $propertyName:'error',
              $errorObject:Error,
              $message:/Invalid structure argument \[0\]\[0\]\. The \["copy"\] property is empty, while it should indicate the folder\./i
            }));

            it.apply(this,should.runCallbackTimes({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $times:1
            }));

          });          
          
          describe(`but it leads to the file, while the item has the 'dir' property`,function(){

            beforeAll(function(){
              this.structure = [{dir:'styles',content:[{dir:'styles',copy:paths.from('variables.scss')}]}];
            });

            beforeEach(function(done){
              prepare.remove()
              .then(()=>prepare.resetFrom())
              .then(()=>prepare.resetTo())
              .then(done)
              .catch(done.fail);
            });

            it.apply(this,should.not.throwError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')}
            }));

            it.apply(this,should.runCallbackError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $propertyName:'error',
              $errorObject:Error,
              $message:/Invalid structure argument \[0\]\[0\]\. Invalid property \["copy"\]\. The path leads to the file, while it should indicate the folder\./i
            }));

            it.apply(this,should.runCallbackTimes({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $times:1
            }));


          });
          describe(`but it leads to the folder, while the item has the 'file' property`,function(){

            beforeAll(function(){
              this.structure = [{dir:'styles',content:[{file:'variables.scss',copy:paths.from('styles')}]}];
            });

            beforeEach(function(done){
              prepare.remove()
              .then(()=>prepare.resetFrom())
              .then(()=>prepare.resetTo())
              .then(done)
              .catch(done.fail);
            });

            it.apply(this,should.not.throwError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')}
            }));

            it.apply(this,should.runCallbackError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $propertyName:'error',
              $errorObject:Error,
              $message:/Invalid structure argument \[0\]\[0\]\. Invalid property \["copy"\]\. The path leads to the folder, while it should indicate the file\./i
            }));

            it.apply(this,should.runCallbackTimes({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $times:1
            }));

          });
          describe(`but it leads to the non existing folder, while the item has the 'dir' property`,function(){

            beforeAll(function(){
              this.structure = [{dir:'styles',content:[{dir:'styles',copy:'./a/b/c'}]}];
            });

            it.apply(this,should.not.throwError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')}
            }));

            it.apply(this,should.runCallbackError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $propertyName:'error',
              $errorObject:Error,
              $message:/Invalid structure argument \[0\]\[0\]\. Invalid property \["copy"\]\. The folder of the specified path does not exist\./i
            }));

            it.apply(this,should.runCallbackTimes({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $times:1
            }));
            

          });
          describe(`but it leads to the non existing file, while the item has the 'file' property`,function(){

            beforeAll(function(){
              this.structure = [{dir:'styles',content:[{file:'styles.css',copy:'./a/b/c.css'}]}];
            });

            it.apply(this,should.not.throwError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')}
            }));

            it.apply(this,should.runCallbackError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $propertyName:'error',
              $errorObject:Error,
              $message:/Invalid structure argument \[0\]\[0\]\. Invalid property \["copy"\]\. The file of the specified path does not exist\./i
            }));

            it.apply(this,should.runCallbackTimes({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $times:1
            }));

          });
          
        });
    
    });
    describe(`that has 'merge' property`,function(){
      
        describe(`but also has 'content' property`,function(){
          
          beforeAll(function(){
            this.structure = [{dir:'styles',content:[{dir:'styles',merge:'',content:''}]}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:Error,
            $message:/Invalid structure argument \[0\]\[0\]\. The \[Object\] items cannot contain \["move"], \["copy"\], \["merge"\], \["content"\] or \["data"\] properties at the same time\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));
          
        });
        describe(`but also has 'data' property`,function(){
          beforeAll(function(){
            this.structure = [{dir:'styles',content:[{dir:'styles',merge:'',data:''}]}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:Error,
            $message:/Invalid structure argument \[0\]\[0\]\. The \[Object\] items cannot contain \["move"], \["copy"\], \["merge"\], \["content"\] or \["data"\] properties at the same time\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));
        });
        describe(`but also has 'file' property`,function(){
          
          beforeAll(function(){
            this.structure = [{dir:'styles',content:[{file:'styles.css',merge:''}]}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:Error,
            $message:/Invalid structure argument \[0\]\[0\]\. The \["merge"\] property can be defined only with \["dir"\] property\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));
          
        });
        describe(`but of incorrect type`,function(){
          
          beforeAll(function(){
            this.structure = [{dir:'styles',content:[{dir:'styles',merge:null}]}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:TypeError,
            $message:/Invalid structure argument \[0\]\[0\]\. Invalid property \["merge"\]\. The \[.+\] value has been assigned, while the value of type \[String\] is expected\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));
          
        });
        describe(`of correct [String] type`,function(){

          describe(`but empty, while it should indicate folder`,function(){

            beforeAll(function(){
              this.structure = [{dir:'styles',content:[{dir:'styles',merge:''}]}];
            });

            it.apply(this,should.not.throwError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')}
            }));

            it.apply(this,should.runCallbackError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $propertyName:'error',
              $errorObject:Error,
              $message:/Invalid structure argument \[0\]\[0\]\. The \["merge"\] property is empty, while it should indicate the folder\./i
            }));

            it.apply(this,should.runCallbackTimes({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $times:1
            }));

          });          
          
          describe(`but it leads to the file, while it should lead only to the folder`,function(){


            beforeAll(function(){
              this.structure = [{dir:'styles',content:[{dir:'styles',merge:paths.from('variables.scss')}]}];
            });

            beforeEach(function(done){
              prepare.remove()
              .then(()=>prepare.resetFrom())
              .then(()=>prepare.resetTo())
              .then(done)
              .catch(done.fail);
            });

            it.apply(this,should.not.throwError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')}
            }));

            it.apply(this,should.runCallbackError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $propertyName:'error',
              $errorObject:Error,
              $message:/Invalid structure argument \[0\]\[0\]\. Invalid property \["merge"\]\. The path leads to the file, while it should indicate the folder\./i
            }));

            it.apply(this,should.runCallbackTimes({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $times:1
            }));



          });
          describe(`but it leads to the non existing folder`,function(){

            beforeAll(function(){
              this.structure = [{dir:'styles',content:[{dir:'styles',merge:'./a/b/c'}]}];
            });

            it.apply(this,should.not.throwError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')}
            }));

            it.apply(this,should.runCallbackError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $propertyName:'error',
              $errorObject:Error,
              $message:/Invalid structure argument \[0\]\[0\]\. Invalid property \["merge"\]\. The folder of the specified path does not exist\./i
            }));

            it.apply(this,should.runCallbackTimes({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $times:1
            }));
            

          });
          
        });
    
    });

    describe(`that has 'data' property`,function(){
      
        describe(`but also has 'content' property`,function(){

          beforeAll(function(){
            this.structure = [{dir:'styles',content:[{file:'styles.css',data:'',content:''}]}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:Error,
            $message:/Invalid structure argument \[0\]\[0\]\. The \[Object\] items cannot contain \["move"], \["copy"\], \["merge"\], \["content"\] or \["data"\] properties at the same time\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));

        });
        describe(`but also has 'dir' property`,function(){
          
          beforeAll(function(){
            this.structure = [{dir:'styles',content:[{dir:'styles',data:''}]}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:Error,
            $message:/Invalid structure argument \[0\]\[0\]\. The \["data"\] property can be defined only with \["file"\] property\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));
          
          
        });
        describe(`but of incorrect type`,function(){

          beforeAll(function(){
            this.structure = [{dir:'styles',content:[{file:'styles.css',data:null}]}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:TypeError,
            $message:/Invalid structure argument \[0\]\[0\]\. Invalid property \["data"\]\. The \[.+\] value has been assigned, while the value of type \[String\] is expected\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));

        });
        describe(`of correct [String] type`,function(){

          describe(`but empty, while it should indicate file`,function(){

            beforeAll(function(){
              this.structure = [{dir:'styles',content:[{file:'variables.scss',data:''}]}];
            });

            it.apply(this,should.not.throwError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')}
            }));

            it.apply(this,should.runCallbackError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $propertyName:'error',
              $errorObject:Error,
              $message:/Invalid structure argument \[0\]\[0\]\. The \["data"\] property is empty, while it should indicate the file\./i
            }));

            it.apply(this,should.runCallbackTimes({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $times:1
            }));

          });

          describe(`but it leads to the folder, while it should lead only to the file`,function(){
            beforeAll(function(){
              this.structure = [{dir:'styles',content:[{file:'variables.scss',data:paths.from('styles')}]}];
            });

            beforeEach(function(done){
              prepare.remove()
              .then(()=>prepare.resetFrom())
              .then(()=>prepare.resetTo())
              .then(done)
              .catch(done.fail);
            });

            it.apply(this,should.not.throwError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')}
            }));

            it.apply(this,should.runCallbackError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $propertyName:'error',
              $errorObject:Error,
              $message:/Invalid structure argument \[0\]\[0\]\. Invalid property \["data"\]\. The path leads to the folder, while it should indicate the file\./i
            }));

            it.apply(this,should.runCallbackTimes({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $times:1
            }));
          });
          describe(`but it leads to the non existing file`,function(){
            beforeAll(function(){
              this.structure = [{dir:'styles',content:[{file:'styles.css',data:'./a/b/c.css'}]}];
            });

            it.apply(this,should.not.throwError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')}
            }));

            it.apply(this,should.runCallbackError({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $propertyName:'error',
              $errorObject:Error,
              $message:/Invalid structure argument \[0\]\[0\]\. Invalid property \["data"\]\. The file of the specified path does not exist\./i
            }));

            it.apply(this,should.runCallbackTimes({
              $function:testingModule,
              $arguments:{structure:should.context('structure')},
              $callback:'done',
              $times:1
            }));
          });

        });

    });

    describe(`that has 'file' property and 'content' property`,function(){

        describe(`but of incorrect type`,function(){

          beforeAll(function(){
            this.structure = [{dir:'styles',content:[{file:'styles.css',content:[]}]}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:TypeError,
            $message:/Invalid structure argument \[0\]\[0\]\. Invalid property \["content"\]\. The \[.+\] value has been assigned, while the value of type \[String\] is expected\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));

        });

    });

    describe(`that has 'dir' property and 'content' property`,function(){

        describe(`but of incorrect type`,function(){

          beforeAll(function(){
            this.structure = [{dir:'styles',content:[{dir:'styles',content:''}]}];
          });

          it.apply(this,should.not.throwError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')}
          }));

          it.apply(this,should.runCallbackError({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $propertyName:'error',
            $errorObject:TypeError,
            $message:/Invalid structure argument \[0\]\[0\]\. Invalid property \["content"\]\. The \[.+\] value has been assigned, while the value of type \[Array\] is expected\./i
          }));

          it.apply(this,should.runCallbackTimes({
            $function:testingModule,
            $arguments:{structure:should.context('structure')},
            $callback:'done',
            $times:1
          }));

        });

    });

    describe(`that has 'overwrite' property`,function(){

      describe(`but of incorrect type`,function(){
        beforeAll(function(){
          this.structure = [{dir:'styles',content:[{dir:'styles',overwrite:''}]}];
        });

        it.apply(this,should.not.throwError({
          $function:testingModule,
          $arguments:{structure:should.context('structure')}
        }));

        it.apply(this,should.runCallbackError({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $propertyName:'error',
          $errorObject:TypeError,
          $message:/Invalid structure argument \[0\]\[0\]\. Invalid property \["overwrite"\]\. The \[.+\] value has been assigned, while the value of type \[Boolean\] is expected\./i
        }));

        it.apply(this,should.runCallbackTimes({
          $function:testingModule,
          $arguments:{structure:should.context('structure')},
          $callback:'done',
          $times:1
        }));
        
      });

    });

  });

});


