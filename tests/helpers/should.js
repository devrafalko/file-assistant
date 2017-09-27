/* global expect, Function */
const path = require('path');
const fs = require('fs-extra');
const of = require('of-type');
const prop = require('typeof-properties');
const listContent = require('list-contents');
const clc = require('cli-color');
const warn = clc.bgYellow.blue;
const paths = require(path.resolve('./tests/helpers/paths.js'));

const protoMethods = {
  context:function(prop){
    return userContext;
    function userContext(){
      return this[prop];
    }
  },
  createNewFolder: function(o){
    o.$name = 'createNewFolder';
    prop(o,{$function:Function,$arguments:[Array,Object,undefined],$exclude:undefined,$include:undefined,$testParameter:undefined,$callback:undefined,$errorObject:undefined,$folder:String},(o)=>{
      throw new TypeError(`${warn(o.$name)} ${o.message}`);
    });
    const u = this.utils;
    const negated = u.negated(this);
    return [`it should ${negated?'not ':''}create new folder`,function(done){
      u.getUserContextData.call(this,o);
      u.compareStates.call(u,{
        userContext:this,
        data:o,
        before:(ok)=>{
          u.isDirExists(o.$folder,ok);
        },
        after:(existBefore)=>{
          u.isDirExists(o.$folder,(existAfter)=>{
            u.expect({
              not:negated,
              actual:!existBefore&&existAfter,
              matcher:'toBe',
              expected:true
            });
            done();
          });
        }
      });
    }];
  },
  removeFolder:function(o){
    o.$name = 'removeFolder';
    prop(o,{$function:Function,$arguments:[Array,Object,undefined],$exclude:undefined,$include:undefined,$testParameter:undefined,$callback:undefined,$errorObject:undefined,$folder:String},(o)=>{
      throw new TypeError(`${warn(o.$name)} ${o.message}`);
    });
    const u = this.utils;
    const negated = u.negated(this);
    return [`it should ${negated?'not ':''}remove the existing folder`,function(done){
      u.getUserContextData.call(this,o);
      u.compareStates.call(u,{
        userContext:this,
        data:o,
        before:(ok)=>{
          u.isDirExists(o.$folder,ok);
        },
        after:(existBefore)=>{
          u.isDirExists(o.$folder,(existAfter)=>{
            u.expect({
              not:false,
              actual:existBefore,
              matcher:'toBe',
              expected:true
            });
            u.expect({
              not:negated,
              actual:!existAfter,
              matcher:'toBe',
              expected:true
            });
            done();
          });
        }
      });
    }];
  },
  createNewFile: function(o){
    o.$name = 'createNewFile';
    prop(o,{$function:Function,$arguments:[Array,Object,undefined],$exclude:undefined,$include:undefined,$testParameter:undefined,$callback:undefined,$errorObject:undefined,$file:[String,Function]},(o)=>{
      throw new TypeError(`${warn(o.$name)} ${o.message}`);
    });
    const u = this.utils;
    const negated = u.negated(this);
    return [`it should ${negated?'not ':''}create new file`,function(done){
      u.getUserContextData.call(this,o);
      u.compareStates.call(u,{
        userContext:this,
        data:o,
        before:(ok)=>{
          u.isFileExists(o.$file,ok);
        },
        after:(existBefore)=>{
          u.isFileExists(o.$file,(existAfter)=>{
            u.expect({
              not:negated,
              actual:!existBefore&&existAfter,
              matcher:'toBe',
              expected:true
            });
            done();
          });
        }
      });
    }];
  },
  removeFile: function(o){
    o.$name = 'removeFile';
    prop(o,{$function:Function,$arguments:[Array,Object,undefined],$exclude:undefined,$include:undefined,$testParameter:undefined,$callback:undefined,$errorObject:undefined,$file:[String,Function]},(o)=>{
      throw new TypeError(`${warn(o.$name)} ${o.message}`);
    });
    const u = this.utils;
    const negated = u.negated(this);
    return [`it should ${negated?'not ':''}remove the existing file`,function(done){
      u.getUserContextData.call(this,o);
      u.compareStates.call(u,{
        userContext:this,
        data:o,
        before:(ok)=>{
          u.isFileExists(o.$file,ok);
        },
        after:(existBefore)=>{
          u.isFileExists(o.$file,(existAfter)=>{
            u.expect({
              not:false,
              actual:existBefore,
              matcher:'toBe',
              expected:true
            });
            u.expect({
              not:negated,
              actual:!existAfter,
              matcher:'toBe',
              expected:true
            });
            done();
          });
        }
      });
    }];
  },
  haveContent: function(o){
    o.$name = 'haveContent';
    prop(o,{$function:Function,$arguments:[Array,Object,undefined],$exclude:undefined,$include:undefined,$testParameter:undefined,$callback:undefined,$errorObject:undefined,$file:[String,Function],$content:[String,RegExp,Function]},(o)=>{
      throw new TypeError(`${warn(o.$name)} ${o.message}`);
    });
    const u = this.utils;
    const negated = u.negated(this);
    return [`the file should ${negated?'not ':''}have the ${o.$content.length||of(o.$content,RegExp) ? 'given':'empty'} content`,function(done){
        u.getUserContextData.call(this,o);
        u.hasTheGivenContent({
          userContext:this,
          utils:u,
          negated:negated,
          data:o,
          done:done
      });
    }];
  },
  haveContentAppended: function(o){
    o.$name = 'haveContentAppended';
    prop(o,{$function:Function,$arguments:[Array,Object,undefined],$exclude:undefined,$include:undefined,$testParameter:undefined,$callback:undefined,$errorObject:undefined,$file:[String,Function],$writeFrom:[String,Function,undefined],$write:[String,Function,undefined]},(o)=>{
      throw new TypeError(`${warn(o.$name)} ${o.message}`);
    });
    if((!o.$writeFrom&&!o.$write)||(o.$writeFrom&&o.$write)) throw new Error(`${warn(o.$name)} Either '$write' or '$writeFrom' property must be declared.`);
    const u = this.utils;
    const negated = u.negated(this);
    return [`the new content should ${negated?'not ':''}be appended into the file`,function(done){
      u.getUserContextData.call(this,o);
      u.compareStates.call(u,{
        userContext:this,
        data:o,
        before:(ok)=>{
          u.resolveFileContent(o.$file)
          .then(ok)
          .catch(done.fail);
        },
        after:(dataBefore)=>{
          u.resolveFileContent(o.$file)
          .then((dataAfter)=>{
            return new Promise((resolve,reject)=>{
              if(o.$write) return resolve({dataAfter:dataAfter,dataAppended:o.$write});
              if(o.$writeFrom){
                fs.readFile(o.$writeFrom,'utf8',(err,getAppended)=>{
                  if(err) return reject(`Could not get the access to the content of '${o.$writeFrom}' file.`);
                  return resolve({dataAfter:dataAfter,dataAppended:getAppended});
                });
              }
            });
          })
          .then((data)=>{
            u.expect({
              not:negated,
              actual:data.dataAfter,
              matcher:'toBe',
              expected:dataBefore+data.dataAppended
            });
            done();
          }).catch(done.fail);
        }
      });
    }];
  },
  haveTheSameContent: function(o){
    o.$name = 'haveTheSameContent';
    prop(o,{$function:Function,$arguments:[Array,Object,undefined],$exclude:undefined,$include:undefined,$testParameter:undefined,$callback:undefined,$errorObject:undefined,$model:[String,Function],$compared:[String,Function]},(o)=>{
      throw new TypeError(`${warn(o.$name)} ${o.message}`);
    });
    const u = this.utils;
    const negated = u.negated(this);
    return [`the two indicated files should ${negated?'not ':''}have the same content`,function(done){
      u.getUserContextData.call(this,o);
      u.hasTheSameContent({
        userContext:this,
        utils:u,
        negated:negated,
        data:o,
        done:done
      });
    }];
    
  },
  keepFileContent: function(o){
    o.$name = 'keepFileContent';
    prop(o,{$function:Function,$arguments:[Array,Object,undefined],$exclude:undefined,$include:undefined,$testParameter:undefined,$callback:undefined,$errorObject:undefined,$file:[String,Function]},(o)=>{
      throw new TypeError(`${warn(o.$name)} ${o.message}`);
    });
    const u = this.utils;
    const negated = u.negated(this);
    return [`the file content should ${negated?'not ':''}be the same before and after the execution.`,function(done){
      u.getUserContextData.call(this,o);
      u.compareStates.call(u,{
        userContext:this,
        data:o,
        before:(ok)=>{
          u.resolveFileContent(o.$file)
          .then(ok)
          .catch(done.fail);
        },
        after:(dataBefore)=>{
          u.resolveFileContent(o.$file)
          .then((dataAfter)=>{
            u.expect({
              not:negated,
              actual:dataBefore,
              matcher:'toBe',
              expected:dataAfter
            });
            done();
          }).catch(done.fail);
        }
      });
    }];
  },
  containItemsNumber: function(o){
    o.$name = 'containItemsNumber';
    prop(o,{$function:Function,$arguments:[Array,Object,undefined],$exclude:undefined,$include:undefined,$testParameter:undefined,$callback:undefined,$errorObject:undefined,$directory:String,$files:[Number,Function,undefined],$folders:[Number,Function,undefined]},(o)=>{
      throw new TypeError(`${warn(o.$name)} ${o.message}`);
    });
    if(of(o.$files,undefined)&&of(o.$folders,undefined)) throw new Error(`${warn(o.$name)} Either '$files' or '$folders' property must be declared.`);
    const u = this.utils;
    const negated = u.negated(this);
    return [`the folder should ${negated?'not ':''}contain the expected number of (sub)files and (sub)folders`,function(done){
      u.getUserContextData.call(this,o);
      u.hasTheItemsNumber({
        userContext:this,
        utils:u,
        negated:negated,
        data:o,
        done:done
      });
    }];
  },
  keepPreviousContents: function(o){
    o.$name = 'keepPreviousContents';
    prop(o,{$function:Function,$arguments:[Array,Object,undefined],$exclude:undefined,$include:undefined,$testParameter:undefined,$callback:undefined,$errorObject:undefined,$directory:String},(o)=>{
      throw new TypeError(`${warn(o.$name)} ${o.message}`);
    });
    const u = this.utils;
    const negated = u.negated(this);
    return [`the folder contents should ${negated?'not ':''}be the same before and after the execution.`,function(done){
      u.getUserContextData.call(this,o);
      u.compareStates.call(u,{
        userContext:this,
        data:o,
        before:(ok)=>{
          u.resolveContents(o.$directory)
          .then(ok)
          .catch(done.fail);
        },
        after:(dataBefore)=>{
          jasmine.addCustomEqualityTester(hasTheSameItems);
          u.resolveContents(o.$directory)
          .then((dataAfter)=>{
            const before = dataBefore.dirs.concat(dataBefore.files);
            const after = dataAfter.dirs.concat(dataAfter.files);
            u.expect({
              not:negated,
              actual:after,
              matcher:'toEqual',
              expected:before
            });
            done();
          }).catch(done.fail);
          
            function hasTheSameItems(actual,expected){
              if(actual.length!==expected.length) return false;
              while(actual.length){
                var index = expected.indexOf(actual.shift());
                if(index>=0) expected.splice(index,1);
              }
              return !expected.length;
            }
        }
      });
    }];
  },
  runCallback: function(o){
    o.$name = 'runCallback';
    prop(o,{$function:Function,$arguments:[Array,Object,undefined],$exclude:[String,Array,undefined],$include:[String,Array,undefined],$testParameter:[String,undefined],$callback:String,$errorObject:undefined},(o)=>{
      throw new TypeError(`${warn(o.$name)} ${o.message}`);
    });
    const u = this.utils;
    const negated = u.negated(this);
    return [`the ${o.$callback}-callback function should ${negated?'not ':''}be called ${o.$callbackTimes} time(s).`,function(done){
      u.getUserContextData.call(this,o);
      var argsScenarios = u.prepareArgs({
        userContext:this,
        data:o,
        beforeStart:(mock)=>{
          setTimeout(()=>{
            u.expect({
              not:negated,
              actual:mock,
              matcher:'toHaveBeenCalledTimes',
              expected:o.$callbackTimes
            });
            done();
          },100);
        }
      });
      for(var loopIterator in argsScenarios) o.$function.apply(this,argsScenarios[loopIterator]);
    }];
  },
  throwError: function(o){
    o.$name = 'throwError';
    prop(o,{$function:Function,$arguments:[Array,Object,undefined],$exclude:[String,Array,undefined],$include:[String,Array,undefined],$testParameter:[String,undefined],$callback:undefined,$errorObject:[Function,undefined],$message:[RegExp,undefined]},(o)=>{
      throw new TypeError(`${warn(o.$name)} ${o.message}`);
    });
    const u = this.utils;
    const negated = u.negated(this);
    var hasErrorDefined = of(o.$errorObject,Function);
    var hasMessageDefined = of(o.$message,RegExp);
    return [`the ${hasErrorDefined ? o.$errorObject.name:'exception'}${hasMessageDefined ? ' of the message matching the regular expression: '+o.$message.toString():''} should ${negated?'not ':''}be thrown.`,function(){
      u.getUserContextData.call(this,o);
      var argsScenarios = u.prepareArgs({userContext:this,data:o});
      for(let loopIterator in argsScenarios){
        let hasBeenErrorThrown = false;
        let getThrownError;
        try{
          o.$function.apply(this,argsScenarios[loopIterator]);
        } catch(err){
          hasBeenErrorThrown = true;
          getThrownError = err;
        }
        let condition = (!hasBeenErrorThrown||(hasBeenErrorThrown&&(hasErrorDefined ? !of(getThrownError,o.$errorObject):false))||(hasBeenErrorThrown&&(hasMessageDefined ? !getThrownError.message.match(o.$message):false)));
        u.fail({
          condition:negated ? !condition:condition,
          message:`Expected function ${negated?'not ':''}to throw ${hasErrorDefined?o.$errorObject.name:'exception'}${hasMessageDefined ? ` with message matching regular expression ${o.$message}`:''}${!hasBeenErrorThrown?`.`:`, but it threw ${getThrownError.name}${hasMessageDefined?` with message '${getThrownError.message}'`:``}.`}`
        });
      }
    }];
  },
  runCallbackWithObject:function(o){
    o.$name = 'runCallbackWithObject';
    prop(o,{$function:Function,$arguments:[Array,Object,undefined],$exclude:[String,Array,undefined],$include:[String,Array,undefined],$testParameter:[String,undefined],$callback:String,$callbackTimes:Number,$errorObject:undefined,$properties:Object},(o)=>{
      throw new TypeError(`${warn(o.$name)} ${o.message}`);
    });
    const u = this.utils;
    const negated = u.negated(this);
    const clbNum = o.$callback==='each'?3:2;
    var props = Object.getOwnPropertyNames(o.$properties).map((a)=>`"${a}"`).join(', ');
    return [`the ${o.$callback}-callback function should ${negated?'not ':''}return object with the following (valid) properties: ${props}`,function(done){
        u.getUserContextData.call(this,o);
        var argsScenarios = u.prepareArgs({
        userContext:this,
        data:o,
        expectation:(mock)=>{
          if(mock.calls.count()===o.$callbackTimes){
            u.expect({
              not:negated,
              actual:mock.calls.allArgs(),
              matcher:'toEqual',
              expected:jasmine.arrayContaining([[jasmine.objectContaining(o.$properties)]])
            });
            done();
          }
        }
      });
      for(var i in argsScenarios){
        o.$function.apply(this,argsScenarios[i]);
      }
    }];
  },
  runCallbackError: function(o){
    o.$name = 'runCallbackError';
    prop(o,{$function:Function,$arguments:[Array,Object,undefined],$exclude:[String,Array,undefined],$include:[String,Array,undefined],$testParameter:[String,undefined],$callback:String,$propertyName:String,$errorObject:Function,$message:RegExp},(o)=>{
      throw new TypeError(`${warn(o.$name)} ${o.message}`);
    });
    const u = this.utils;
    const negated = u.negated(this);
    const clbNum = o.$callback==='each'?3:2;
    return [`the ${o.$callback}-callback function should ${negated?'not ':''}return ${o.$errorObject.name} with the message matching the regular expression: ${o.$message}`,function(done){
        u.getUserContextData.call(this,o);
        var argsScenarios = u.prepareArgs({
        userContext:this,
        data:o,
        expectation:(mock)=>{
          var callbackObject = mock.calls.argsFor(mock.calls.count()-1)[0];
          if(u.fail({
            condition:!of(callbackObject,Object),
            message:'Expected callback returned argument to be of type [Object]'
          })) return;
          if(u.fail({
            condition:!of(callbackObject[o.$propertyName],o.$errorObject),
            message:`Expected callback ["${o.$propertyName}"] property to be of type [${o.$errorObject.name}] while it was ${callbackObject[o.$propertyName]}`
          })) return;

          if(u.fail({
            condition:!(callbackObject[o.$propertyName].message.match(o.$message)),
            message:`Expected callback ["${o.$propertyName}"] ${o.$errorObject.name} to have a message matching the regular expression ${o.$message}, while ${callbackObject.error}`
          })) return;
          done();
        }
      });
      for(let i in argsScenarios) o.$function.apply(this,argsScenarios[i]);
    }];
  },
  utils:{
    expect:function(o){
      var exp = expect(o.actual);
      var parseExpected = [o.expected];
      exp.not[o.matcher].apply(o.not ? exp.not:exp,parseExpected);
    },
    fail:function(o){
      if(o.condition) fail(o.message);
      return o.condition;
    },
    negated:function(t){
      return !(of(t['not'],'object'));
    },
    isDirExists:function(dir,clb){
      fs.stat(dir,(err,stats)=>{
        var exists = of(err,null);
        var isDir = of(stats,'Stats')&&stats.isDirectory();
        clb(exists&&isDir);
      });
    },
    isFileExists:function(dir,clb){
      fs.stat(dir,(err,stats)=>{
        var exists = of(err,null);
        var isFile = of(stats,'Stats')&&stats.isFile();
        clb(exists&&isFile);
      });
    },
    
    hasTheGivenContent:function(obj){
        obj.data.$callback = 'done';
        var argsScenarios = obj.utils.prepareArgs({
          userContext:obj.userContext,
          data:obj.data,
          expectation:()=>{
            fs.readFile(obj.data.$file,'utf8',(err,actual)=>{
              if(err) return obj.done.fail(`Could not get the access to the content of '${obj.data.$file}' file.`);
              var matcher = of(obj.data.$content,String) ? 'toEqual':'toMatch';
              obj.utils.expect({
                not:obj.negated,
                actual:actual,
                matcher:matcher,
                expected:obj.data.$content
              });
              obj.done();
            });
          }
        });
        obj.data.$function.apply(this,argsScenarios[0]);
    },
    hasTheSameContent:function(obj){
        obj.data.$callback = 'done';
        var argsScenarios = obj.utils.prepareArgs({
          userContext:obj.userContext,
          data:obj.data,
          expectation:()=>{
            var iter = 0;
            var model,compared;
            fs.readFile(obj.data.$model,'utf8',(err,getModel)=>{
              if(err) return obj.done.fail(`Could not get the access to the content of '${obj.data.$model}' file.`);
              model = getModel;
              compare();
            });
            fs.readFile(obj.data.$compared,'utf8',(err,getCompared)=>{
              if(err) return obj.done.fail(`Could not get the access to the content of '${obj.data.$compared}' file.`);
              compared = getCompared;
              compare();
            });
            
            function compare(){
              if(++iter!==2) return;
              obj.utils.expect({
                not:obj.negated,
                actual:model===compared,
                matcher:'toBe',
                expected:true
              });
              obj.done();
            }
          }
        });
        obj.data.$function.apply(this,argsScenarios[0]);
    },
    hasTheItemsNumber:function(obj){
        obj.data.$callback = 'done';
        var argsScenarios = obj.utils.prepareArgs({
          userContext:obj.userContext,
          data:obj.data,
          expectation:()=>{
            obj.utils.resolveContents(obj.data.$directory)
            .then((data)=>{
              const files = data.files.length;
              const dirs = data.dirs.length;
              obj.utils.expect({
                not:obj.negated,
                actual:files===obj.data.$files&&dirs===obj.data.$folders,
                matcher:'toBe',
                expected:true
              });
              obj.done();
            }).catch(obj.done.fail);
          }
        });
        obj.data.$function.apply(this,argsScenarios[0]);
    },
    resolveContents:function(directory){
      return new Promise((resolve,reject)=>{
        listContent(directory,(o)=>{
          if(o.error) reject(`Could not get the list of the contents of the '${directory}' directory.`);
          if(!o.error) resolve({files:o.files,dirs:o.dirs});
        });
      });
    },
    resolveFileContent:function(filePath){
      return new Promise((resolve,reject)=>{
        fs.readFile(filePath,'utf8',(err,getContent)=>{
          if(err) return reject(`Could not get the access to the content of '${filePath}' file.`);
          resolve(getContent);
        });
      });
    },
    compareStates:function(obj){
      var that = this;
      obj.before(function(beforeData){
        obj.data.$callback = 'done';
        var argsScenarios = that.prepareArgs({
          userContext:obj.userContext,
          data:obj.data,
          expectation:obj.after.bind(this,beforeData)
        });
        obj.data.$function.apply(this,argsScenarios[0]);
      });
    },
    prepareTypes: function(obj){
      const allTypes = {
        "String":'',
        "Number":1,
        "Array":[],
        "Object":{},
        "null":null,
        "undefined":undefined,
        "Date":new Date(),
        "Boolean":true,
        "RegExp":/regexp/,
        "Function":function(){}
      };
      var isInclude = of(obj.$include,'string|array');
      var newTypes = this.listItemErr(obj,Object.getOwnPropertyNames(allTypes),isInclude?'$include':'$exclude');
      
      if(isInclude){
        var includeTypes = {};
        for(var i in newTypes){
          includeTypes[newTypes[i]] = allTypes[newTypes[i]];
        }
        return includeTypes;
      } else {
        for(var i in newTypes){
          delete allTypes[newTypes[i]];
        }
        return allTypes;
      }
    },
    prepareArgs: function(obj){
      const o = obj.data;
      const argumentNames = ['root','structure','done','each'];
      const absoluteToDir = path.resolve(paths.rootDir,paths.toDir);
      const argumentDefaults = [absoluteToDir,[],()=>{},()=>{}];
      
      const scenarioErr = this.scenarioErr(o);
      const isScenario = scenarioErr === "scenario";
      const isArguments = scenarioErr === "arguments";
      const isDefault = scenarioErr === "default";
      var callback;
      if(of(o.$errorObject,Function)){
        if(!of(new o.$errorObject(),/Error/)) throw new TypeError(`${warn(o.$name)} The ["$errorObject"] property must be defined as the one of *Error objects.`);
      }
      if(of(o.$callback,'string')){
        this.listItemErr(o,['each','done'],'$callback');
        callback = o.$callback.toLowerCase();
      }

      if(isDefault) return [setMocks(argumentDefaults.slice())];

      if(isScenario){
        const types = this.prepareTypes(o);
        this.listItemErr(o,argumentNames,'$testParameter');
        var changeArgIndex = argumentNames.findIndex((a)=>a===o.$testParameter);
        var scenarioList = [];
        for(var i in types){
          var newScenario = argumentDefaults.slice();
          newScenario[changeArgIndex] = types[i];
          scenarioList.push(setMocks(newScenario));
        }
        return scenarioList;
      }

      if(isArguments) {
        var args = o.$arguments;
        if(of(args,'array')){
          if(!args.length) throw new TypeError(`${warn(o.$name)} ["$arguments"] array should not be empty.`);
          var arrayToObject = {};
          for(var i in argumentNames) if(!of(args[i],'undefined')) arrayToObject[argumentNames[i]] = args[i];
          o.$arguments = arrayToObject;
        }
        
        this.listItemErr(o,argumentNames,'$arguments');
        var change = (i)=> Object.getOwnPropertyNames(o.$arguments).some(a=>a===argumentNames[i]);
        var finalArguments = [];
        for(var i in argumentNames){
          finalArguments.push(change(i) ? o.$arguments[argumentNames[i]]:argumentDefaults[i]);
        }
        return [setMocks(finalArguments)];
      }

        function setMocks(args){
          const mock = jasmine.createSpyObj('mock',['each','done']);
          if(of(obj.expectation,Function)){
            mock.each.and.callFake(()=>obj.expectation(mock.each));
            mock.done.and.callFake(()=>obj.expectation(mock.done));
          }
          const done = callback==='done';
          const each = callback==='each';
          const validDone = of(args[2],'function');
          const validEach = of(args[3],'function');
          if(done&&!validDone) throw new TypeError(`${warn(o.$name)} The ["$callback"] done function must be of type [function] in order to be mocked.`);
          if(each&&!validEach) throw new TypeError(`${warn(o.$name)} The ["$callback"] each function must be of type [function] in order to be mocked.`);
          if(done&&validDone) args[2] = mock.done;
          if(each&&validEach) args[3] = mock.each;
          if(of(obj.beforeStart,Function)) obj.beforeStart(mock[done?'done':'each']);
          return args;
        }

    },
    hasAllItems: function(original,compared){ //arguments: Array|Object
      if(of(original,'object')) original = Object.getOwnPropertyNames(original);
      if(of(compared,'object')) compared = Object.getOwnPropertyNames(compared);
      if(!original.length||!compared.length) return false;
      var x = original.slice();
      var y = compared.slice();
      while(y.length){
        var i = x.indexOf(y.shift());
        if(i>=0) x.splice(i,1);
        if(i===-1) return false;
      }
      return true;
    },
    getUserContextData: function(o){
      loop.call(this,o);
      function loop(o){
        for(let prop in o){
          if(of(o[prop],Function)&&o[prop].name==='userContext') o[prop] = o[prop].call(this);
          if(of(o[prop],Object)) loop.call(this,o[prop]);
        }
      }
    },
    scenarioErr: function(o){
      var i = of(o.$include,'string|array');
      var e = of(o.$exclude,'string|array'); 
      var p = of(o.$testParameter,'string');
      var a = of(o.$arguments,'array|object');
      if((!a&&!(i||e||p))) return 'default';
      if((a&&(i||e||p))) throw new TypeError(`${warn(o.$name)} Either ["$arguments"] or ["$exclude"], ["$include"], ["$testParameter"] parameter(s) must be defined.`);
      if(!a&&((!i&&!e)||(i&&e))) throw new TypeError(`${warn(o.$name)} Either ["$include"] or ["$exclude"] parameter must be defined.`);
      if((i||e)&&!p) throw new TypeError(`${warn(o.$name)} The ["$testParameter"] parameter must be defined.`);
      if((i||e)&&p) return 'scenario';
      if(a) return 'arguments';
    },
    listItemErr: function(o,arr,param){
      var listOfParams = of(o[param],'string') ? [o[param]]:o[param];
      if(!this.hasAllItems(arr,listOfParams)) throw new TypeError(`${warn(o.$name)} ["${param}"] item(s) should be the one(s) of the following values: ${arr.map((a)=>`"${a}"`).join(', ')}`);
      return listOfParams;
    }
  }
};

const should = Object.create(protoMethods);
should.not = Object.create(protoMethods);
module.exports = should;