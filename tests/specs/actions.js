/* global expect, __dirname, it */

const fs = require('fs-extra');
const path = require('path');

const helpers = path.resolve('./tests/helpers');
const prepare = require(path.resolve(helpers,'prepare.js'));
const paths = require(path.resolve(helpers,'paths.js'));
const should = require(path.resolve(helpers,'should.js'));
const testingModule = require(path.resolve('./index.js'));
const data = require(path.resolve(helpers,'structures.json'));

const contentStructure = [
  {file:paths.name('styles/mixins.scss'), data:paths.from('dist.css'), overwrite:false},
  {file:paths.name('styles/imports.scss'), copy:paths.from('styles/imports.scss'), overwrite:true},
  {dir:paths.name('styles/css'),overwrite:true,content:[
      {file:paths.name('styles/css/main.css')},
      {file:paths.name('styles/css/extra.css')}
  ]},
  {dir:paths.name('styles/scss'),overwrite:false,content:[
      {file:paths.name('styles/scss/main.scss'),overwrite:false}
  ]}
];

const newContent = '#new{color:black;}\n';

describe(`When the '${paths.name('prod.css')}' file does not exist in the '${paths.toDir}' folder\n`+
         `and create('${paths.toDir}',structure,(done)=>{},(each)=>{}) is fired\n`+
         `and the structure contains an item with file:'${paths.name('prod.css')}' property`,function(){

  describe(`regardless the 'overwrite' property is true, false or undefined`,function(){
    
      it(`it should create '${name('prod.css')}' file in '${paths.toDir}' folder`,function(){
        expect(true).toBe(true);
      });
      
      xit(`the created '${paths.name('prod.css')}' file should have empty content`,function(){
        expect(true).toBe(false);
      });
      xit(`the creating process of subsequent item on the structure list should not be aborted`,function(){
        expect(true).toBe(false);
      });
      describe(`the each callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`msg, that is a [String] and informs about successful action`,function(){
          expect(true).toBe(false);
        });
        it(`success:true`,function(){
          expect(true).toBe(false);
        });
        it(`item:'file'`,function(){
          expect(true).toBe(false);
        });
        it(`from:'null'`,function(){
          expect(true).toBe(false);
        });
        it(`action:'create'`,function(){
          expect(true).toBe(false);
        });
        it(`overwrite:false`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
        it(`absolute, that is a [String] and ends with '${paths.to('prod.css')}'`,function(){
          expect(true).toBe(false);
        });
        it(`relative, that is a [String] equal to '${paths.to('prod.css')}'`,function(){
          expect(true).toBe(false);
        });
      });
      describe(`the done callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`files:[], that contains succeeded file path`,function(){
          expect(true).toBe(false);
        });
        it(`dirs:[], that is empty`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
      });
  });

  describe(`and copy:'${paths.from('dist.css')}' property, regardless 'overwrite' property is true, false or undefined`,function(){
      it(`it should copy the file from '${paths.from('dist.css')}' and paste it to '${paths.to('prod.css')}'`,function(){
        expect(true).toBe(false);
      });
      it(`the new file should have '${paths.name('prod.css')}' name`,function(){
        expect(true).toBe(false);
      });
      it(`the file in '${paths.from('dist.css')}' should be still there`,function(){
        expect(true).toBe(false);
      });
      it(`the copied '${paths.name('dist.css')}' and pasted '${paths.name('prod.css')}' files should have the same content`,function(){
        expect(true).toBe(false);
      });
      it(`the creating process of subsequent item on the structure list should not be aborted`,function(){
        expect(true).toBe(false);
      });
      describe(`the each callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`msg, that is a [String] and informs about successful action`,function(){
          expect(true).toBe(false);
        });
        it(`success:true`,function(){
          expect(true).toBe(false);
        });
        it(`item:'file'`,function(){
          expect(true).toBe(false);
        });
        it(`from:'${paths.from('dist.css')}'`,function(){
          expect(true).toBe(false);
        });
        it(`action:'copy'`,function(){
          expect(true).toBe(false);
        });
        it(`overwrite:false`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
        it(`absolute, that is a [String] and ends with '${paths.to('prod.css')}'`,function(){
          expect(true).toBe(false);
        });
        it(`relative, that is a [String] equal to '${paths.to('prod.css')}'`,function(){
          expect(true).toBe(false);
        });
      });      
      describe(`the done callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`files:[], that contains succeeded file path`,function(){
          expect(true).toBe(false);
        });
        it(`dirs:[], that is empty`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
      });
  });

  describe(`and move:'${paths.from('dist.css')}' property, regardless 'overwrite' property is true, false or undefined`,function(){
      it(`it should cut the file from '${paths.from('dist.css')}' and paste it to '${paths.to('prod.css')}'`,function(){
        expect(true).toBe(false);
      });
      it(`the new file should have '${paths.name('prod.css')}' name`,function(){
        expect(true).toBe(false);
      });
      it(`the file in '${paths.from('dist.css')}' should not exist there`,function(){
        expect(true).toBe(false);
      });
      it(`the moved '${paths.name('dist.css')}' and pasted '${paths.name('prod.css')}' files should have the same content`,function(){
        expect(true).toBe(false);
      });
      it(`the creating process of subsequent item on the structure list should not be aborted`,function(){
        expect(true).toBe(false);
      });
      describe(`the each callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`msg, that is a [String] and informs about successful action`,function(){
          expect(true).toBe(false);
        });
        it(`success:true`,function(){
          expect(true).toBe(false);
        });
        it(`item:'file'`,function(){
          expect(true).toBe(false);
        });
        it(`from:'${paths.from('dist.css')}'`,function(){
          expect(true).toBe(false);
        });
        it(`action:'move'`,function(){
          expect(true).toBe(false);
        });
        it(`overwrite:false`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
        it(`absolute, that is a [String] and ends with '${paths.to('prod.css')}'`,function(){
          expect(true).toBe(false);
        });
        it(`relative, that is a [String] equal to '${paths.to('prod.css')}'`,function(){
          expect(true).toBe(false);
        });
      });      
      describe(`the done callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`files:[], that contains succeeded file path`,function(){
          expect(true).toBe(false);
        });
        it(`dirs:[], that is empty`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
      });
  });

  describe(`and content:'${newContent}' property, regardless 'overwrite' property is true, false or undefined`,function(){
      it(`it should create '${paths.to('prod.css')}' file`,function(){
        expect(true).toBe(false);
      });
      it(`the created '${paths.to('prod.css')}' file should have the following '${newContent}' content`,function(){
        expect(true).toBe(false);
      });
      it(`the creating process of subsequent item on the structure list should not be aborted`,function(){
        expect(true).toBe(false);
      });
      describe(`the each callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`msg, that is a [String] and informs about successful action`,function(){
          expect(true).toBe(false);
        });
        it(`success:true`,function(){
          expect(true).toBe(false);
        });
        it(`item:'file'`,function(){
          expect(true).toBe(false);
        });
        it(`from:null`,function(){
          expect(true).toBe(false);
        });
        it(`action:'write'`,function(){
          expect(true).toBe(false);
        });
        it(`overwrite:false`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
        it(`absolute, that is a [String] and ends with '${paths.to('prod.css')}'`,function(){
          expect(true).toBe(false);
        });
        it(`relative, that is a [String] equal to '${paths.to('prod.css')}'`,function(){
          expect(true).toBe(false);
        });
      });      
      describe(`the done callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`files:[], that contains succeeded file path`,function(){
          expect(true).toBe(false);
        });
        it(`dirs:[], that is empty`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
      });
  });

  describe(`and data:'${paths.from('dist.css')}' property, regardless 'overwrite' property is true, false or undefined`,function(){
      it(`it should create '${paths.to('prod.css')}' file`,function(){
        expect(true).toBe(false);
      });
      it(`the data '${paths.name('dist.css')}' file and the created '${paths.name('prod.css')}' file should have the same content`,function(){
        expect(true).toBe(false);
      });
      it(`the file in '${paths.from('dist.css')}' should still exist there`,function(){
        expect(true).toBe(false);
      });
      it(`the creating process of subsequent item on the structure list should not be aborted`,function(){
        expect(true).toBe(false);
      });
      describe(`the each callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`msg, that is a [String] and informs about successful action`,function(){
          expect(true).toBe(false);
        });
        it(`success:true`,function(){
          expect(true).toBe(false);
        });
        it(`item:'file'`,function(){
          expect(true).toBe(false);
        });
        it(`from:'${paths.from('dist.css')}'`,function(){
          expect(true).toBe(false);
        });
        it(`action:'write'`,function(){
          expect(true).toBe(false);
        });
        it(`overwrite:false`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
        it(`absolute, that is a [String] and ends with '${paths.to('prod.css')}'`,function(){
          expect(true).toBe(false);
        });
        it(`relative, that is a [String] equal to '${paths.to('prod.css')}'`,function(){
          expect(true).toBe(false);
        });
      });      
      describe(`the done callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`files:[], that contains succeeded file path`,function(){
          expect(true).toBe(false);
        });
        it(`dirs:[], that is empty`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
      });
  });
});

describe(`When the '${paths.name('prod.css')}' file already exists in the '${paths.toDir}' folder\n`+
         `and create('${paths.toDir}',structure,(done)=>{},(each)=>{}) is fired\n`+
         `and the structure contains an item with file:'${paths.name('prod.css')}' property`,function(){
  describe("and overwrite:true property",function(){
      it(`it should replace existing '${paths.to('prod.css')}' file with the new '${paths.to('prod.css')}' file`,function(){
        expect(true).toBe(false);
      });
      it(`the new file should have '${paths.name('prod.css')}' name`,function(){
        expect(true).toBe(false);
      });
      it(`the created '${paths.to('prod.css')}' file should have empty content`,function(){
        expect(true).toBe(false);
      });
      it(`the creating process of subsequent item on the structure list should not be aborted`,function(){
        expect(true).toBe(false);
      });
      describe(`the each callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`msg, that is a [String] and informs about successful action`,function(){
          expect(true).toBe(false);
        });
        it(`success:true`,function(){
          expect(true).toBe(false);
        });
        it(`item:'file'`,function(){
          expect(true).toBe(false);
        });
        it(`from:'null'`,function(){
          expect(true).toBe(false);
        });
        it(`action:'create'`,function(){
          expect(true).toBe(false);
        });
        it(`overwrite:true`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
        it(`absolute, that is a [String] and ends with '${paths.to('prod.css')}'`,function(){
          expect(true).toBe(false);
        });
        it(`relative, that is a [String] equal to '${paths.to('prod.css')}'`,function(){
          expect(true).toBe(false);
        });
      });
      describe(`the done callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`files:[], that contains succeeded file path`,function(){
          expect(true).toBe(false);
        });
        it(`dirs:[], that is empty`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
      });
  });

  describe(`and overwrite:false property\n(or not overwrite property at all - because false is default)`,function(){
      it(`the action should be aborted, the new file should not be created`,function(){
        expect(true).toBe(false);
      });
      it(`the existing '${paths.to('prod.css')}' file should keep its former content`,function(){
        expect(true).toBe(false);
      });
      it(`the creating process of subsequent item on the structure list should not be aborted`,function(){
        expect(true).toBe(false);
      });
      describe(`the each callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`msg, that is a [String] and warns about failed action`,function(){
          expect(true).toBe(false);
        });
        it(`success:false`,function(){
          expect(true).toBe(false);
        });
        it(`item:'file'`,function(){
          expect(true).toBe(false);
        });
        it(`from:'null'`,function(){
          expect(true).toBe(false);
        });
        it(`action:'create'`,function(){
          expect(true).toBe(false);
        });
        it(`overwrite:false`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
        it(`absolute, that is a [String] and ends with '${paths.to('prod.css')}'`,function(){
          expect(true).toBe(false);
        });
        it(`relative, that is a [String] equal to '${paths.to('prod.css')}'`,function(){
          expect(true).toBe(false);
        });
      });
      describe(`the done callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`files:[], that does not contain failed file path (that is empty)`,function(){
          expect(true).toBe(false);
        });
        it(`dirs:[], that is empty`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
      });
  });

  describe(`and copy:'${paths.from('dist.css')}' and overwrite:true property`,function(){
      it(`it should replace existing '${paths.to('prod.css')}' file with the copied '${paths.from('dist.css')}' file`,function(){
        expect(true).toBe(false);
      });
      it(`the new file should have '${paths.name('prod.css')}' name`,function(){
        expect(true).toBe(false);
      });
      it(`the file in '${paths.from('dist.css')}' should be still there`,function(){
        expect(true).toBe(false);
      });
      it(`the copied '${paths.name('dist.css')}' and pasted '${paths.name('prod.css')}' files should have the same content`,function(){
        expect(true).toBe(false);
      });
      it(`the creating process of subsequent item on the structure list should not be aborted`,function(){
        expect(true).toBe(false);
      });
      describe(`the each callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`msg, that is a [String] and informs about successful action`,function(){
          expect(true).toBe(false);
        });
        it(`success:true`,function(){
          expect(true).toBe(false);
        });
        it(`item:'file'`,function(){
          expect(true).toBe(false);
        });
        it(`from:'${paths.from('dist.css')}'`,function(){
          expect(true).toBe(false);
        });
        it(`action:'copy'`,function(){
          expect(true).toBe(false);
        });
        it(`overwrite:true`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
        it(`absolute, that is a [String] and ends with '${paths.to('prod.css')}'`,function(){
          expect(true).toBe(false);
        });
        it(`relative, that is a [String] equal to '${paths.to('prod.css')}'`,function(){
          expect(true).toBe(false);
        });
      });
      describe(`the done callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`files:[], that contains succeeded file path`,function(){
          expect(true).toBe(false);
        });
        it(`dirs:[], that is empty`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
      });
  });

  describe(`and copy:'${paths.from('dist.css')}' and overwrite:false property\n(or not overwrite property at all - because false is default)`,function(){
      it(`the action should be aborted, the new file should not be copied`,function(){
        expect(true).toBe(false);
      });
      it(`the existing '${paths.to('prod.css')}' file should keep its former content`,function(){
        expect(true).toBe(false);
      });
      it(`the file in '${paths.from('dist.css')}' should be still there`,function(){
        expect(true).toBe(false);
      });
      it(`the copy '${paths.name('dist.css')}' file and the existing '${paths.name('prod.css')}' file should not have the same content`,function(){
        expect(true).toBe(false);
      });
      it(`the creating process of subsequent item on the structure list should not be aborted`,function(){
        expect(true).toBe(false);
      });

      describe(`the each callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`msg, that is a [String] and warns about failed action`,function(){
          expect(true).toBe(false);
        });
        it(`success:false`,function(){
          expect(true).toBe(false);
        });
        it(`item:'file'`,function(){
          expect(true).toBe(false);
        });
        it(`from:'${paths.from('dist.css')}'`,function(){
          expect(true).toBe(false);
        });
        it(`action:'copy'`,function(){
          expect(true).toBe(false);
        });
        it(`overwrite:false`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
        it(`absolute, that is a [String] and ends with '${paths.to('prod.css')}'`,function(){
          expect(true).toBe(false);
        });
        it(`relative, that is a [String] equal to '${paths.to('prod.css')}'`,function(){
          expect(true).toBe(false);
        });
      });
      describe(`the done callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`files:[], that does not contain failed file path (that is empty)`,function(){
          expect(true).toBe(false);
        });
        it(`dirs:[], that is empty`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
      });
  });

  describe(`and move:'${paths.from('dist.css')}' and overwrite:true property`,function(){
      it(`it should replace existing '${paths.to('prod.css')}' file with the moved '${paths.from('dist.css')}' file`,function(){
        expect(true).toBe(false);
      });
      it(`the new file should have '${paths.name('prod.css')}' name`,function(){
        expect(true).toBe(false);
      });
      it(`the file in '${paths.from('dist.css')}' should not exist there`,function(){
        expect(true).toBe(false);
      });
      it(`the moved '${paths.name('dist.css')}' and pasted '${paths.name('prod.css')}' files should have the same content`,function(){
        expect(true).toBe(false);
      });
      it(`the creating process of subsequent item on the structure list should not be aborted`,function(){
        expect(true).toBe(false);
      });

      describe(`the each callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`msg, that is a [String] and informs about successful action`,function(){
          expect(true).toBe(false);
        });
        it(`success:true`,function(){
          expect(true).toBe(false);
        });
        it(`item:'file'`,function(){
          expect(true).toBe(false);
        });
        it(`from:'${paths.from('dist.css')}'`,function(){
          expect(true).toBe(false);
        });
        it(`action:'move'`,function(){
          expect(true).toBe(false);
        });
        it(`overwrite:true`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
        it(`absolute, that is a [String] and ends with '${paths.to('prod.css')}'`,function(){
          expect(true).toBe(false);
        });
        it(`relative, that is a [String] equal to '${paths.to('prod.css')}'`,function(){
          expect(true).toBe(false);
        });
      });      
      describe(`the done callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`files:[], that contains succeeded file path`,function(){
          expect(true).toBe(false);
        });
        it(`dirs:[], that is empty`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
      });
  });

  describe(`and move:'${paths.from('dist.css')}' and overwrite:false property\n(or not overwrite property at all - because false is default)`,function(){
      it(`the action should be aborted, the new file should not be moved`,function(){
        expect(true).toBe(false);
      });
      it(`the existing '${paths.to('prod.css')}' file should keep its former content`,function(){
        expect(true).toBe(false);
      });
      it(`the file in '${paths.from('dist.css')}' should be still there`,function(){
        expect(true).toBe(false);
      });
      it(`the move '${paths.name('dist.css')}' file and the existing '${paths.name('prod.css')}' file should not have the same content`,function(){
        expect(true).toBe(false);
      });
      it(`the creating process of subsequent item on the structure list should not be aborted`,function(){
        expect(true).toBe(false);
      });
      describe(`the each callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`msg, that is a [String] and warns about failed action`,function(){
          expect(true).toBe(false);
        });
        it(`success:false`,function(){
          expect(true).toBe(false);
        });
        it(`item:'file'`,function(){
          expect(true).toBe(false);
        });
        it(`from:'${paths.from('dist.css')}'`,function(){
          expect(true).toBe(false);
        });
        it(`action:'move'`,function(){
          expect(true).toBe(false);
        });
        it(`overwrite:false`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
        it(`absolute, that is a [String] and ends with '${paths.to('prod.css')}'`,function(){
          expect(true).toBe(false);
        });
        it(`relative, that is a [String] equal to '${paths.to('prod.css')}'`,function(){
          expect(true).toBe(false);
        });
      });
      describe(`the done callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`files:[], that does not contain failed file path (that is empty)`,function(){
          expect(true).toBe(false);
        });
        it(`dirs:[], that is empty`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
      });    
  });

  describe(`and content:'${newContent}' property and overwrite:true property`,function(){
      it(`it should replace existing '${paths.to('prod.css')}' file content with the following '${newContent}' content`,function(){
        expect(true).toBe(false);
      });
      it(`the creating process of subsequent item on the structure list should not be aborted`,function(){
        expect(true).toBe(false);
      });
      describe(`the each callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`msg, that is a [String] and informs about successful action`,function(){
          expect(true).toBe(false);
        });
        it(`success:true`,function(){
          expect(true).toBe(false);
        });
        it(`item:'file'`,function(){
          expect(true).toBe(false);
        });
        it(`from:null`,function(){
          expect(true).toBe(false);
        });
        it(`action:'write'`,function(){
          expect(true).toBe(false);
        });
        it(`overwrite:true`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
        it(`absolute, that is a [String] and ends with '${paths.to('prod.css')}'`,function(){
          expect(true).toBe(false);
        });
        it(`relative, that is a [String] equal to '${paths.to('prod.css')}'`,function(){
          expect(true).toBe(false);
        });
      });      
      describe(`the done callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`files:[], that contains succeeded file path`,function(){
          expect(true).toBe(false);
        });
        it(`dirs:[], that is empty`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
      });
  });

  describe(`and content:'${newContent}' property and overwrite:false property\n(or not overwrite property at all - because false is default)`,function(){
      it(`the action should not be aborted`,function(){
        expect(true).toBe(false);
      });
      it(`the content '${newContent}' should be appended into the existing '${paths.to('prod.css')}' file at the end of its content`,function(){
        expect(true).toBe(false);
      });
      it(`the creating process of subsequent item on the structure list should not be aborted`,function(){
        expect(true).toBe(false);
      });
      describe(`the each callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`msg, that is a [String] and informs about successful action`,function(){
          expect(true).toBe(false);
        });
        it(`success:true`,function(){
          expect(true).toBe(false);
        });
        it(`item:'file'`,function(){
          expect(true).toBe(false);
        });
        it(`from:null`,function(){
          expect(true).toBe(false);
        });
        it(`action:'append'`,function(){
          expect(true).toBe(false);
        });
        it(`overwrite:false`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
        it(`absolute, that is a [String] and ends with '${paths.to('prod.css')}'`,function(){
          expect(true).toBe(false);
        });
        it(`relative, that is a [String] equal to '${paths.to('prod.css')}'`,function(){
          expect(true).toBe(false);
        });
      });      
      describe(`the done callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`files:[], that contains succeeded file path`,function(){
          expect(true).toBe(false);
        });
        it(`dirs:[], that is empty`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
      });
  });

  describe(`and data:'${paths.from('dist.css')}' property and overwrite:true property`,function(){
      it(`it should replace existing '${paths.to('prod.css')}' file content with the content of '${paths.from('dist.css')}' file`,function(){
        expect(true).toBe(false);
      });
      it(`the modified file should have '${paths.name('prod.css')}' name`,function(){
        expect(true).toBe(false);
      });
      it(`the data '${paths.name('dist.css')}' file and the modified '${paths.name('prod.css')}' file should have the same content`,function(){
        expect(true).toBe(false);
      });
      it(`the file in '${paths.from('dist.css')}' should still exist there`,function(){
        expect(true).toBe(false);
      });
      it(`the creating process of subsequent item on the structure list should not be aborted`,function(){
        expect(true).toBe(false);
      });
      describe(`the each callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`msg, that is a [String] and informs about successful action`,function(){
          expect(true).toBe(false);
        });
        it(`success:true`,function(){
          expect(true).toBe(false);
        });
        it(`item:'file'`,function(){
          expect(true).toBe(false);
        });
        it(`from:'${paths.from('dist.css')}'`,function(){
          expect(true).toBe(false);
        });
        it(`action:'write'`,function(){
          expect(true).toBe(false);
        });
        it(`overwrite:true`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
        it(`absolute, that is a [String] and ends with '${paths.to('prod.css')}'`,function(){
          expect(true).toBe(false);
        });
        it(`relative, that is a [String] equal to '${paths.to('prod.css')}'`,function(){
          expect(true).toBe(false);
        });
      });      
      describe(`the done callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`files:[], that contains succeeded file path`,function(){
          expect(true).toBe(false);
        });
        it(`dirs:[], that is empty`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
      });        
  });

  describe(`and data:'${paths.from('dist.css')}' property and overwrite:false property\n(or not overwrite property at all - because false is default)`,function(){
      it(`the action should not be aborted`,function(){
        expect(true).toBe(false);
      });
      it(`the content of '${paths.from('dist.css')}' file should be appended into the existing '${paths.to('prod.css')}' file at the end of its content`,function(){
        expect(true).toBe(false);
      });
      it(`the modified file should have '${paths.name('prod.css')}' name`,function(){
        expect(true).toBe(false);
      });
      it(`the creating process of subsequent item on the structure list should not be aborted`,function(){
        expect(true).toBe(false);
      });
      describe(`the each callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`msg, that is a [String] and informs about successful action`,function(){
          expect(true).toBe(false);
        });
        it(`success:true`,function(){
          expect(true).toBe(false);
        });
        it(`item:'file'`,function(){
          expect(true).toBe(false);
        });
        it(`from:'${paths.from('dist.css')}'`,function(){
          expect(true).toBe(false);
        });
        it(`action:'append'`,function(){
          expect(true).toBe(false);
        });
        it(`overwrite:false`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
        it(`absolute, that is a [String] and ends with '${paths.to('prod.css')}'`,function(){
          expect(true).toBe(false);
        });
        it(`relative, that is a [String] equal to '${paths.to('prod.css')}'`,function(){
          expect(true).toBe(false);
        });
      });      
      describe(`the done callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`files:[], that contains succeeded file path`,function(){
          expect(true).toBe(false);
        });
        it(`dirs:[], that is empty`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
      });
  });
});

describe(`When the '${paths.name('styles')}' folder does not exist in the '${paths.toDir}' folder\n`+
         `and create('${paths.toDir}',structure,(done)=>{},(each)=>{}) is fired\n`+
         `and the structure contains an item with dir:'${paths.name('styles')}' property`,function(){
           
  describe("regardless the 'overwrite' property is true, false or undefined",function(){
      it(`it should create '${paths.name('styles')}' dir in '${paths.to('styles')}' folder`,function(){
        expect(true).toBe(false);
      });
      it(`the created '${paths.name('styles')}' dir should have empty content`,function(){
        expect(true).toBe(false);
      });
      it("the creating process of subsequent item on the structure list should not be aborted",function(){
        expect(true).toBe(false);
      });
      describe(`the each callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`msg, that is a [String] and informs about successful action`,function(){
          expect(true).toBe(false);
        });
        it(`success:true`,function(){
          expect(true).toBe(false);
        });
        it(`item:'dir'`,function(){
          expect(true).toBe(false);
        });
        it(`from:'null'`,function(){
          expect(true).toBe(false);
        });
        it(`action:'create'`,function(){
          expect(true).toBe(false);
        });
        it(`overwrite:false`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
        it(`absolute, that is a [String] and ends with '${paths.to('styles')}'`,function(){
          expect(true).toBe(false);
        });
        it(`relative, that is a [String] equal to '${paths.to('styles')}'`,function(){
          expect(true).toBe(false);
        });

      });
      describe(`the done callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`files:[], that is empty`,function(){
          expect(true).toBe(false);
        });
        it(`dirs:[], that contains succeeded dir path`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
      });
  });
  
  describe(`and the property content:[ {file:'${paths.name('styles/mixins.scss')}'}, {dir:'${paths.name('styles/css')}'} ]\n`+
            `regardless 'overwrite' property is true, false or undefined`,function(){
             
      it(`it should create '${paths.name('styles')}' folder in '${paths.to('styles')}' folder`,function(){
        expect(true).toBe(false);
      });
      it(`the new created '${paths.name('styles')}' folder should contain '${paths.name('styles/mixins.scss')}' file and '${paths.name('styles/css')}' folder`,function(){
        expect(true).toBe(false);
      });
      it("the creating process of subsequent item on the structure list should not be aborted",function(){
        expect(true).toBe(false);
      });
      describe(`the each callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`msg, that is a [String] and informs about successful action`,function(){
          expect(true).toBe(false);
        });
        it(`success:true`,function(){
          expect(true).toBe(false);
        });
        it(`item:'dir'`,function(){
          expect(true).toBe(false);
        });
        it(`from:'null'`,function(){
          expect(true).toBe(false);
        });
        it(`action:'create'`,function(){
          expect(true).toBe(false);
        });
        it(`overwrite:false`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
        it(`absolute, that is a [String] and ends with '${paths.to('styles')}'`,function(){
          expect(true).toBe(false);
        });
        it(`relative, that is a [String] equal to '${paths.to('styles')}'`,function(){
          expect(true).toBe(false);
        });
      });
      describe(`the done callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`files:[], that contains '${paths.name('styles/mixins.scss')}' file path`,function(){
          expect(true).toBe(false);
        });
        it(`dirs:[], that contains succeeded dir path and '${paths.name('styles/css')}' path`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
      });    
  });

  describe(`and copy:'${paths.from('styles')}' property, regardless 'overwrite' property is true, false or undefined`,function(){
      it(`it should copy the folder from '${paths.from('styles')}' and paste it to '${paths.to('styles')}'`,function(){
        expect(true).toBe(false);
      });
      it(`all contents of the copied folder should be copied as well with the same relative paths, names and contents (when file)`,function(){
        expect(true).toBe(false);
      });
      it(`the copied folder in '${paths.from('styles')}' should be still there with all its contents`,function(){
        expect(true).toBe(false);
      });
      it("the creating process of subsequent item on the structure list should not be aborted",function(){
        expect(true).toBe(false);
      });
      describe(`the each callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`msg, that is a [String] and informs about successful action`,function(){
          expect(true).toBe(false);
        });
        it(`success:true`,function(){
          expect(true).toBe(false);
        });
        it(`item:'dir'`,function(){
          expect(true).toBe(false);
        });
        it(`from:'${paths.from('styles')}'`,function(){
          expect(true).toBe(false);
        });
        it(`action:'copy'`,function(){
          expect(true).toBe(false);
        });
        it(`overwrite:false`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
        it(`absolute, that is a [String] and ends with '${paths.to('styles')}'`,function(){
          expect(true).toBe(false);
        });
        it(`relative, that is a [String] equal to '${paths.to('styles')}'`,function(){
          expect(true).toBe(false);
        });

      });
      describe(`the done callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`files:[], that contains paths of the files that are the contents of the copied folder`,function(){
          expect(true).toBe(false);
        });
        it(`dirs:[], that contains succeeded dir path and the paths of the folders that are the contents of the copied folder`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
      });
  });

  describe(`and move:'${paths.from('styles')}' property, regardless 'overwrite' property is true, false or undefined`,function(){
      it(`it should cut the folder from '${paths.from('styles')}' and paste it to '${paths.to('styles')}'`,function(){
        expect(true).toBe(false);
      });
      it(`all contents of the moved folder should be moved as well with the same relative paths, names and contents (when file)`,function(){
        expect(true).toBe(false);
      });
      it(`the folder in '${paths.from('styles')}' should not exist there`,function(){
        expect(true).toBe(false);
      });
      it("the creating process of subsequent item on the structure list should not be aborted",function(){
        expect(true).toBe(false);
      });
      describe(`the each callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`msg, that is a [String] and informs about successful action`,function(){
          expect(true).toBe(false);
        });
        it(`success:true`,function(){
          expect(true).toBe(false);
        });
        it(`item:'dir'`,function(){
          expect(true).toBe(false);
        });
        it(`from:'${paths.from('styles')}'`,function(){
          expect(true).toBe(false);
        });
        it(`action:'move'`,function(){
          expect(true).toBe(false);
        });
        it(`overwrite:false`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
        it(`absolute, that is a [String] and ends with '${paths.to('styles')}'`,function(){
          expect(true).toBe(false);
        });
        it(`relative, that is a [String] equal to '${paths.to('styles')}'`,function(){
          expect(true).toBe(false);
        });
      });
      describe(`the done callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`files:[], that contains paths of the files that are the contents of the moved folder`,function(){
          expect(true).toBe(false);
        });
        it(`dirs:[], that contains succeeded dir path and the paths of the folders that are the contents of the moved folder`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
      });
  });

  describe(`and merge:'${paths.from('styles')}' property, regardless 'overwrite' property is true, false or undefined`,function(){
      it(`it should copy the folder from '${paths.from('styles')}' and paste it to '${paths.to('styles')}'`,function(){
        expect(true).toBe(false);
      });
      it(`all contents of the copied folder should be copied as well with the same relative paths, names and contents (when file)`,function(){
        expect(true).toBe(false);
      });
      it(`the copied folder in '${paths.from('styles')}' should be still there with all its contents`,function(){
        expect(true).toBe(false);
      });
      it("the creating process of subsequent item on the structure list should not be aborted",function(){
        expect(true).toBe(false);
      });
      describe(`the each callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`msg, that is a [String] and informs about successful action`,function(){
          expect(true).toBe(false);
        });
        it(`success:true`,function(){
          expect(true).toBe(false);
        });
        it(`item:'dir'`,function(){
          expect(true).toBe(false);
        });
        it(`from:'${paths.from('styles')}'`,function(){
          expect(true).toBe(false);
        });
        it(`action:'merge'`,function(){
          expect(true).toBe(false);
        });
        it(`overwrite:false`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
        it(`absolute, that is a [String] and ends with '${paths.to('styles')}'`,function(){
          expect(true).toBe(false);
        });
        it(`relative, that is a [String] equal to '${paths.to('styles')}'`,function(){
          expect(true).toBe(false);
        });
      });
      describe(`the done callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`files:[], that contains paths of the files that are the contents of the moved folder`,function(){
          expect(true).toBe(false);
        });
        it(`dirs:[], that contains succeeded dir path and the paths of the folders that are the contents of the moved folder`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
      });
  });
});

describe(`When the '${paths.name('styles')}' folder already exists in the '${paths.toDir}' folder\n`+
         `and create('${paths.toDir}',structure,(done)=>{},(each)=>{}) is fired\n`+
         `and the structure contains an item with dir:'${paths.name('styles')}' property`,function(){

  describe("and overwrite:true property",function(){
      it(`it should replace existing '${paths.to('styles')}' folder with the new '${paths.from('styles')}' folder`,function(){
        expect(true).toBe(false);
      });
      it(`the created '${paths.to('styles')}' folder should have empty content`,function(){
        expect(true).toBe(false);
      });
      it(`the creating process of subsequent item on the structure list should not be aborted`,function(){
        expect(true).toBe(false);
      });    
      describe(`the each callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`msg, that is a [String] and informs about successful action`,function(){
          expect(true).toBe(false);
        });
        it(`success:true`,function(){
          expect(true).toBe(false);
        });
        it(`item:'dir'`,function(){
          expect(true).toBe(false);
        });
        it(`from:'null'`,function(){
          expect(true).toBe(false);
        });
        it(`action:'create'`,function(){
          expect(true).toBe(false);
        });
        it(`overwrite:true`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
        it(`absolute, that is a [String] and ends with '${paths.to('styles')}'`,function(){
          expect(true).toBe(false);
        });
        it(`relative, that is a [String] equal to '${paths.to('styles')}'`,function(){
          expect(true).toBe(false);
        });
      });
      describe(`the done callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`files:[], that should be empty`,function(){
          expect(true).toBe(false);
        });
        it(`dirs:[], that contains succeeded dir path`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
      });
  });

  describe("and overwrite:false property\n(or not overwrite property at all - because false is default)",function(){
      it(`the action should be aborted, it should not replace existing '${paths.to('styles')}' folder with the new '${paths.to('styles')}' folder`,function(){
        expect(true).toBe(false);
      });
      it(`the existing '${paths.to('styles')}' folder should keep its former contents`,function(){
        expect(true).toBe(false);
      });
      it(`the creating process of subsequent item on the structure list should not be aborted`,function(){
        expect(true).toBe(false);
      }); 
      describe(`the each callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`msg, that is a [String] and warns about failed action`,function(){
          expect(true).toBe(false);
        });
        it(`success:false`,function(){
          expect(true).toBe(false);
        });
        it(`item:'dir'`,function(){
          expect(true).toBe(false);
        });
        it(`from:'null'`,function(){
          expect(true).toBe(false);
        });
        it(`action:'create'`,function(){
          expect(true).toBe(false);
        });
        it(`overwrite:false`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
        it(`absolute, that is a [String] and ends with '${paths.to('styles')}'`,function(){
          expect(true).toBe(false);
        });
        it(`relative, that is a [String] equal to '${paths.to('styles')}'`,function(){
          expect(true).toBe(false);
        });
      });
      describe(`the done callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`files:[], that is empty`,function(){
          expect(true).toBe(false);
        });
        it(`dirs:[], that does not contain failed folder path (that is empty)`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
      }); 
  });

  describe(`and the property content:[ {file:'${paths.name('styles/mixins.scss')}'}, {dir:'${paths.name('styles/css')}'} ]\n`+
            `and overwrite:true property`,function(){

      it(`it should replace existing '${paths.to('styles')}' folder with the new '${paths.to('styles')}' folder`,function(){
        expect(true).toBe(false);
      });
      it(`the replaced '${paths.to('styles')}' folder should not keep its former contents`,function(){
        expect(true).toBe(false);
      });
      it(`the new created '${paths.name('styles')}' folder should contain '${paths.name('styles/mixins.scss')}' file and '${paths.name('styles/css')}' folder`,function(){
        expect(true).toBe(false);
      });
      it("the creating process of subsequent item on the structure list should not be aborted",function(){
        expect(true).toBe(false);
      });              
      describe(`the each callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`msg, that is a [String] and informs about successful action`,function(){
          expect(true).toBe(false);
        });
        it(`success:true`,function(){
          expect(true).toBe(false);
        });
        it(`item:'dir'`,function(){
          expect(true).toBe(false);
        });
        it(`from:'null'`,function(){
          expect(true).toBe(false);
        });
        it(`action:'create'`,function(){
          expect(true).toBe(false);
        });
        it(`overwrite:true`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
        it(`absolute, that is a [String] and ends with '${paths.to('styles')}'`,function(){
          expect(true).toBe(false);
        });
        it(`relative, that is a [String] equal to '${paths.to('styles')}'`,function(){
          expect(true).toBe(false);
        });
      });
      describe(`the done callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`files:[], that contains '${paths.name('styles/mixins.scss')}' file path`,function(){
          expect(true).toBe(false);
        });
        it(`dirs:[], that contains succeeded dir path and '${paths.name('styles/css')}' path`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
      });
  });

  describe(`and the property content:`+
           JSON.stringify(contentStructure,null,2)+
           `\nand overwrite:false property (or not overwrite property at all - because false is default)`,function(){

      it(`the action should be aborted, it should not replace existing '${paths.to('styles')}' folder with the new '${paths.to('styles')}' folder`,function(){
        expect(true).toBe(false);
      });
      it(`the existing '${paths.to('styles')}' folder should keep its former contents`,function(){
        expect(true).toBe(false);
      });
      it(`the creating process of subsequent item on the structure list should not be aborted`,function(){
        expect(true).toBe(false);
      });

      describe(`the each callback for '${paths.to('styles')}' folder should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`msg, that is a [String] and informs about failed action`,function(){
          expect(true).toBe(false);
        });
        it(`success:false`,function(){
          expect(true).toBe(false);
        });
        it(`item:'dir'`,function(){
          expect(true).toBe(false);
        });
        it(`from:'null'`,function(){
          expect(true).toBe(false);
        });
        it(`action:'create'`,function(){
          expect(true).toBe(false);
        });
        it(`overwrite:false`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
        it(`absolute, that is a [String] and ends with '${paths.to('styles')}'`,function(){
          expect(true).toBe(false);
        });
        it(`relative, that is a [String] equal to '${paths.to('styles')}'`,function(){
          expect(true).toBe(false);
        });
      });
      describe("for the 'content' property items - they should behave according to their own 'overwrite' settings, that is",function(){
        describe(`for the content ${paths.name('styles/mixins.scss')} file of ${paths.rel('styles/mixins.scss')} path`,function(){
          it(`the content of '${paths.from('dist.css')}' file should be appended into the existing '${paths.to('styles/mixins.scss')}' file at the end of its content`,function(){
            expect(true).toBe(false);
          });
          it(`the modified ${paths.to('styles/mixins.scss')} file should have '${paths.name('styles/mixins.scss')}' name`,function(){
            expect(true).toBe(false);
          });

          describe(`the each callback for '${paths.to('styles/mixins.scss')}' folder should pass an Object with the property`,function(){
            it(`error:null`,function(){
              expect(true).toBe(false);
            });
            it(`msg, that is a [String] and informs about successful action`,function(){
              expect(true).toBe(false);
            });
            it(`success:true`,function(){
              expect(true).toBe(false);
            });
            it(`item:'file'`,function(){
              expect(true).toBe(false);
            });
            it(`from:'${paths.from('dist.css')}'`,function(){
              expect(true).toBe(false);
            });
            it(`action:'write'`,function(){
              expect(true).toBe(false);
            });
            it(`overwrite:false`,function(){
              expect(true).toBe(false);
            });
            it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
              expect(true).toBe(false);
            });
            it(`absolute, that is a [String] and ends with '${paths.to('styles/mixins.scss')}'`,function(){
              expect(true).toBe(false);
            });
            it(`relative, that is a [String] equal to '${paths.to('styles/mixins.scss')}'`,function(){
              expect(true).toBe(false);
            });
          });
        });
        
        describe(`for the content ${paths.name('styles/imports.scss')} file of ${paths.rel('styles/imports.scss')} path`,function(){
          it(`it should copy the file from '${paths.from('styles/imports.scss')}' and paste it to '${paths.to('styles/imports.scss')}'`,function(){
            expect(true).toBe(false);
          });
          it(`the new file should have '${paths.name('styles/imports.scss')}' name`,function(){
            expect(true).toBe(false);
          });
          it(`the file in '${paths.from('styles/imports.scss')}' should be still there`,function(){
            expect(true).toBe(false);
          });
          it(`the copied '${paths.name('styles/imports.scss')}' and pasted '${paths.name('styles/imports.scss')}' files should have the same content`,function(){
            expect(true).toBe(false);
          });
          describe(`the each callback should pass an Object with the property`,function(){
            it(`error:null`,function(){
              expect(true).toBe(false);
            });
            it(`msg, that is a [String] and informs about successful action`,function(){
              expect(true).toBe(false);
            });
            it(`success:true`,function(){
              expect(true).toBe(false);
            });
            it(`item:'file'`,function(){
              expect(true).toBe(false);
            });
            it(`from:'${paths.from('styles/imports.scss')}'`,function(){
              expect(true).toBe(false);
            });
            it(`action:'copy'`,function(){
              expect(true).toBe(false);
            });
            it(`overwrite:false`,function(){
              expect(true).toBe(false);
            });
            it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
              expect(true).toBe(false);
            });
            it(`absolute, that is a [String] and ends with '${paths.to('styles/imports.scss')}'`,function(){
              expect(true).toBe(false);
            });
            it(`relative, that is a [String] equal to '${paths.to('styles/imports.scss')}'`,function(){
              expect(true).toBe(false);
            });
          });
        });
        
        describe(`for the content ${paths.name('styles/css')} dir of ${paths.rel('styles/css')} path`,function(){
          it(`it should replace existing '${paths.to('styles/css')}' folder with the new '${paths.to('styles/css')}' folder`,function(){
            expect(true).toBe(false);
          });
          it(`the replaced '${paths.name('styles/css')}' folder should not keep its former contents`,function(){
            expect(true).toBe(false);
          });
          it(`the new created '${paths.name('styles/css')}' folder should contain '${paths.name('styles/css/main.css')}' file and '${paths.name('styles/css/extra.css')}' file`,function(){
            expect(true).toBe(false);
          });
          describe(`the each callback for '${paths.name('styles/css')}' folder should pass an Object with the property`,function(){
            it(`error:null`,function(){
              expect(true).toBe(false);
            });
            it(`msg, that is a [String] and informs about successful action`,function(){
              expect(true).toBe(false);
            });
            it(`success:true`,function(){
              expect(true).toBe(false);
            });
            it(`item:'dir'`,function(){
              expect(true).toBe(false);
            });
            it(`from:'null'`,function(){
              expect(true).toBe(false);
            });
            it(`action:'create'`,function(){
              expect(true).toBe(false);
            });
            it(`overwrite:true`,function(){
              expect(true).toBe(false);
            });
            it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
              expect(true).toBe(false);
            });
            it(`absolute, that is a [String] and ends with '${paths.to('styles/css')}'`,function(){
              expect(true).toBe(false);
            });
            it(`relative, that is a [String] equal to '${paths.to('styles/css')}'`,function(){
              expect(true).toBe(false);
            });
          });

          describe(`the each callback for '${paths.name('styles/css/main.css')}' file should pass an Object with the property`,function(){
            it(`error:null`,function(){
              expect(true).toBe(false);
            });
            it(`msg, that is a [String] and informs about successful action`,function(){
              expect(true).toBe(false);
            });
            it(`success:true`,function(){
              expect(true).toBe(false);
            });
            it(`item:'file'`,function(){
              expect(true).toBe(false);
            });
            it(`from:'null'`,function(){
              expect(true).toBe(false);
            });
            it(`action:'create'`,function(){
              expect(true).toBe(false);
            });
            it(`overwrite:false`,function(){
              expect(true).toBe(false);
            });
            it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
              expect(true).toBe(false);
            });
            it(`absolute, that is a [String] and ends with '${paths.to('styles/css/main.css')}'`,function(){
              expect(true).toBe(false);
            });
            it(`relative, that is a [String] equal to '${paths.to('styles/css/main.css')}'`,function(){
              expect(true).toBe(false);
            });
          });
          describe(`the each callback for '${paths.name('styles/css/extra.css')}' file should pass an Object with the property`,function(){
            it(`error:null`,function(){
              expect(true).toBe(false);
            });
            it(`msg, that is a [String] and informs about successful action`,function(){
              expect(true).toBe(false);
            });
            it(`success:true`,function(){
              expect(true).toBe(false);
            });
            it(`item:'file'`,function(){
              expect(true).toBe(false);
            });
            it(`from:'null'`,function(){
              expect(true).toBe(false);
            });
            it(`action:'create'`,function(){
              expect(true).toBe(false);
            });
            it(`overwrite:false`,function(){
              expect(true).toBe(false);
            });
            it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
              expect(true).toBe(false);
            });
            it(`absolute, that is a [String] and ends with '${paths.to('styles/css/extra.css')}'`,function(){
              expect(true).toBe(false);
            });
            it(`relative, that is a [String] equal to '${paths.to('styles/css/extra.css')}'`,function(){
              expect(true).toBe(false);
            });
          });
        });
        
        describe(`for the content ${paths.name('styles/scss')} dir of ${paths.rel('styles/scss')} path`,function(){
          it(`it should create '${paths.name('styles/scss')}' folder in '${paths.to('styles/scss')}' folder`,function(){
            expect(true).toBe(false);
          });
          it(`the new created '${paths.name('styles/scss')}' folder should contain '${paths.name('styles/scss/main.scss')}' file`,function(){
            expect(true).toBe(false);
          });
          describe(`the each callback for '${paths.name('styles/scss')}' folder should pass an Object with the property`,function(){
            it(`error:null`,function(){
              expect(true).toBe(false);
            });
            it(`msg, that is a [String] and informs about successful action`,function(){
              expect(true).toBe(false);
            });
            it(`success:true`,function(){
              expect(true).toBe(false);
            });
            it(`item:'dir'`,function(){
              expect(true).toBe(false);
            });
            it(`from:'null'`,function(){
              expect(true).toBe(false);
            });
            it(`action:'create'`,function(){
              expect(true).toBe(false);
            });
            it(`overwrite:false`,function(){
              expect(true).toBe(false);
            });
            it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
              expect(true).toBe(false);
            });
            it(`absolute, that is a [String] and ends with '${paths.to('styles/scss')}'`,function(){
              expect(true).toBe(false);
            });
            it(`relative, that is a [String] equal to '${paths.to('styles/scss')}'`,function(){
              expect(true).toBe(false);
            });
          });
          
          describe(`the each callback for '${paths.name('styles/scss/main.scss')}' file should pass an Object with the property`,function(){
            it(`error:null`,function(){
              expect(true).toBe(false);
            });
            it(`msg, that is a [String] and informs about successful action`,function(){
              expect(true).toBe(false);
            });
            it(`success:true`,function(){
              expect(true).toBe(false);
            });
            it(`item:'file'`,function(){
              expect(true).toBe(false);
            });
            it(`from:'null'`,function(){
              expect(true).toBe(false);
            });
            it(`action:'create'`,function(){
              expect(true).toBe(false);
            });
            it(`overwrite:false`,function(){
              expect(true).toBe(false);
            });
            it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
              expect(true).toBe(false);
            });
            it(`absolute, that is a [String] and ends with '${paths.to('styles/scss/main.scss')}'`,function(){
              expect(true).toBe(false);
            });
            it(`relative, that is a [String] equal to '${paths.to('styles/scss/main.scss')}'`,function(){
              expect(true).toBe(false);
            });
          });
        });
     
      });  
      describe(`the done callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`dirs:[], that contains '${paths.to('styles/css')}', '${paths.to('styles/scss')}' folders`,function(){
          expect(true).toBe(false);
        });
        it(`dirs:[], that does not contain '${paths.to('styles')}' folder`,function(){
          expect(true).toBe(false);
        });
        it(`files:[], that contains '${paths.to('styles/mixins.scss')}', '${paths.to('styles/imports.scss')}', '${paths.to('styles/css/main.css')}', '${paths.to('styles/css/extra.css')}', '${paths.to('styles/scss/main.scss')}' files`,function(){
          expect(true).toBe(false);
        });
        it(`files:[], that does not contain '${path.join(paths.toDir,data['dir-styles'].path,'scss','main.scss')}' file`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
      });
  });

  describe(`and copy:'${paths.from('styles')}' and overwrite:true property`,function(){
      it(`it should replace existing '${paths.to('styles')}' folder with the copied '${paths.from('styles')}' folder`,function(){
        expect(true).toBe(false);
      });
      it(`the content of the existing '${paths.to('styles')}' folder should be removed`,function(){
        expect(true).toBe(false);
      });
      it(`all contents of the copied folder should be copied as well with the same relative paths, names and contents (when file)`,function(){
        expect(true).toBe(false);
      });
      it(`the copied folder in '${paths.from('styles')}' should be still there with all its contents`,function(){
        expect(true).toBe(false);
      });
      it("the creating process of subsequent item on the structure list should not be aborted",function(){
        expect(true).toBe(false);
      });
      
      describe(`the each callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`msg, that is a [String] and informs about successful action`,function(){
          expect(true).toBe(false);
        });
        it(`success:true`,function(){
          expect(true).toBe(false);
        });
        it(`item:'dir'`,function(){
          expect(true).toBe(false);
        });
        it(`from:'${paths.from('styles')}'`,function(){
          expect(true).toBe(false);
        });
        it(`action:'copy'`,function(){
          expect(true).toBe(false);
        });
        it(`overwrite:true`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
        it(`absolute, that is a [String] and ends with '${paths.to('styles')}'`,function(){
          expect(true).toBe(false);
        });
        it(`relative, that is a [String] equal to '${paths.to('styles')}'`,function(){
          expect(true).toBe(false);
        });
      });
      describe(`the done callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`files:[], that contains paths of the files that are the contents of the copied folder`,function(){
          expect(true).toBe(false);
        });
        it(`dirs:[], that contains succeeded dir path and the paths of the folders that are the contents of the copied folder`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
      });
  });

  describe(`and copy:'${paths.from('styles')}' and 'overwrite:false' property\n(or not overwrite property at all - because false is default)`,function(){
      it(`the action should be aborted, it should not replace existing '${paths.to('styles')}' folder with the new '${paths.from('styles')}' folder`,function(){
        expect(true).toBe(false);
      });  
      it(`the existing '${paths.to('styles')}' folder should keep its former content`,function(){
        expect(true).toBe(false);
      });
      it(`the folder in '${paths.from('styles')}' should be still there`,function(){
        expect(true).toBe(false);
      });
      it(`the copy '${paths.name('styles')}' folder and the existing '${paths.name('styles')}' folder should not have the same content`,function(){
        expect(true).toBe(false);
      });
      it(`the creating process of subsequent item on the structure list should not be aborted`,function(){
        expect(true).toBe(false);
      });    
      describe(`the each callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`msg, that is a [String] and informs about failed action`,function(){
          expect(true).toBe(false);
        });
        it(`success:false`,function(){
          expect(true).toBe(false);
        });
        it(`item:'dir'`,function(){
          expect(true).toBe(false);
        });
        it(`from:'${paths.from('styles')}'`,function(){
          expect(true).toBe(false);
        });
        it(`action:'copy'`,function(){
          expect(true).toBe(false);
        });
        it(`overwrite:false`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
        it(`absolute, that is a [String] and ends with '${paths.to('styles')}'`,function(){
          expect(true).toBe(false);
        });
        it(`relative, that is a [String] equal to '${paths.to('styles')}'`,function(){
          expect(true).toBe(false);
        });
      });
      describe(`the done callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`files:[], that is empty`,function(){
          expect(true).toBe(false);
        });
        it(`dirs:[], that does not contain failed folder path (that is empty)`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
      });
  });

  describe(`and move:'${paths.from('styles')}' and overwrite:true property`,function(){
      it(`it should replace existing '${paths.to('styles')}' folder with the moved '${paths.from('styles')}' folder`,function(){
        expect(true).toBe(false);
      });
      it(`the content of the existing '${paths.to('styles')}' folder should be removed`,function(){
        expect(true).toBe(false);
      });
      it(`all contents of the moved folder should be moved as well with the same relative paths, names and contents (when file)`,function(){
        expect(true).toBe(false);
      });
      it(`the moved folder in '${paths.from('styles')}' should not be still there`,function(){
        expect(true).toBe(false);
      });
      it("the creating process of subsequent item on the structure list should not be aborted",function(){
        expect(true).toBe(false);
      });
      describe(`the each callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`msg, that is a [String] and informs about successful action`,function(){
          expect(true).toBe(false);
        });
        it(`success:true`,function(){
          expect(true).toBe(false);
        });
        it(`item:'dir'`,function(){
          expect(true).toBe(false);
        });
        it(`from:'${paths.from('styles')}'`,function(){
          expect(true).toBe(false);
        });
        it(`action:'move'`,function(){
          expect(true).toBe(false);
        });
        it(`overwrite:true`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
        it(`absolute, that is a [String] and ends with '${paths.to('styles')}'`,function(){
          expect(true).toBe(false);
        });
        it(`relative, that is a [String] equal to '${paths.to('styles')}'`,function(){
          expect(true).toBe(false);
        });
      });
      describe(`the done callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`files:[], that contains paths of the files that are the contents of the moved folder`,function(){
          expect(true).toBe(false);
        });
        it(`dirs:[], that contains succeeded dir path and the paths of the folders that are the contents of the moved folder`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
      });
  });

  describe(`and move:'${paths.from('styles')}' and overwrite:false property\n(or not overwrite property at all - because false is default)`,function(){
      it(`the action should be aborted, it should not replace existing '${paths.to('styles')}' folder with the new '${paths.from('styles')}' folder`,function(){
        expect(true).toBe(false);
      });  
      it(`the existing '${paths.to('styles')}' folder should keep its former content`,function(){
        expect(true).toBe(false);
      });
      it(`the folder in '${paths.from('styles')}' should be still there with all contents`,function(){
        expect(true).toBe(false);
      });
      it(`the move '${paths.name('styles')}' folder and the existing '${paths.name('styles')}' folder should not have the same content`,function(){
        expect(true).toBe(false);
      });
      it("the creating process of subsequent item on the structure list should not be aborted",function(){
        expect(true).toBe(false);
      });
      describe(`the each callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`msg, that is a [String] and informs about failed action`,function(){
          expect(true).toBe(false);
        });
        it(`success:false`,function(){
          expect(true).toBe(false);
        });
        it(`item:'dir'`,function(){
          expect(true).toBe(false);
        });
        it(`from:'${paths.from('styles')}'`,function(){
          expect(true).toBe(false);
        });
        it(`action:'move'`,function(){
          expect(true).toBe(false);
        });
        it(`overwrite:false`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
        it(`absolute, that is a [String] and ends with '${paths.to('styles')}'`,function(){
          expect(true).toBe(false);
        });
        it(`relative, that is a [String] equal to '${paths.to('styles')}'`,function(){
          expect(true).toBe(false);
        });
      });
      describe(`the done callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`files:[], that is empty`,function(){
          expect(true).toBe(false);
        });
        it(`dirs:[], that does not contain failed folder path (that is empty)`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
      });
  });

  describe(`and merge:'${paths.from('styles')}' and overwrite:true property`,function(){
      it(`after the merging process, the merged ${paths.to('styles')} folder should contain the files and folders of both merging ${paths.from('styles')} folder and the merged ${paths.to('styles')} folder before merge process`,function(){
        expect(true).toBe(false);
      });
      
      describe(`for the '${paths.from('styles')}' folder`,function(){
        it(`the folder in '${paths.from('styles')}' should be still there`,function(){
          expect(true).toBe(false);
        });
        describe(`the each callback should pass an Object with the property`,function(){
          it(`error:null`,function(){
            expect(true).toBe(false);
          });
          it(`msg, that is a [String] and informs about successful action`,function(){
            expect(true).toBe(false);
          });
          it(`success:true`,function(){
            expect(true).toBe(false);
          });
          it(`item:'dir'`,function(){
            expect(true).toBe(false);
          });
          it(`from:'${paths.from('styles')}'`,function(){
            expect(true).toBe(false);
          });
          it(`action:'merge'`,function(){
            expect(true).toBe(false);
          });
          it(`overwrite:false`,function(){
            expect(true).toBe(false);
          });
          it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
            expect(true).toBe(false);
          });
          it(`absolute, that is a [String] and ends with '${paths.to('styles')}'`,function(){
            expect(true).toBe(false);
          });
          it(`relative, that is a [String] equal to '${paths.to('styles')}'`,function(){
            expect(true).toBe(false);
          });
        });
      });
      
      describe(`for the '${paths.from('styles/imports.scss')}' file`,function(){
        it(`it should copy the file from '${paths.from('styles/imports.scss')}' and paste it to '${paths.to('styles/imports.scss')}'`,function(){
          expect(true).toBe(false);
        });
        it(`the new file should have '${paths.name('styles/imports.scss')}' name`,function(){
          expect(true).toBe(false);
        });
        it(`the file in '${paths.from('styles/imports.scss')}' should be still there`,function(){
          expect(true).toBe(false);
        });
        it(`the copied '${paths.name('styles/imports.scss')}' and pasted '${paths.name('styles/imports.scss')}' files should have the same content`,function(){
          expect(true).toBe(false);
        });
        describe(`the each callback should pass an Object with the property`,function(){
          it(`error:null`,function(){
            expect(true).toBe(false);
          });
          it(`msg, that is a [String] and informs about successful action`,function(){
            expect(true).toBe(false);
          });
          it(`success:true`,function(){
            expect(true).toBe(false);
          });
          it(`item:'file'`,function(){
            expect(true).toBe(false);
          });
          it(`from:'${paths.from('styles/imports.scss')}'`,function(){
            expect(true).toBe(false);
          });
          it(`action:'copy'`,function(){
            expect(true).toBe(false);
          });
          it(`overwrite:false`,function(){
            expect(true).toBe(false);
          });
          it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
            expect(true).toBe(false);
          });
          it(`absolute, that is a [String] and ends with '${paths.to('styles/imports.scss')}'`,function(){
            expect(true).toBe(false);
          });
          it(`relative, that is a [String] equal to '${paths.to('styles/imports.scss')}'`,function(){
            expect(true).toBe(false);
          });
        });
      });

      describe(`for the '${paths.from('styles/scss')}' folder`,function(){
        it(`it should copy the folder from '${paths.from('styles/scss')}' and paste it to '${paths.to('styles/scss')}'`,function(){
          expect(true).toBe(false);
        });
        it(`all contents of the copied folder should be copied as well with the same relative paths, names and contents (when file)`,function(){
          expect(true).toBe(false);
        });
        it(`the copied folder in '${paths.from('styles/scss')}' should be still there with all its contents`,function(){
          expect(true).toBe(false);
        });        
        describe(`the each callback for '${paths.from('styles/scss')}' folder should pass an Object with the property`,function(){
          it(`error:null`,function(){
            expect(true).toBe(false);
          });
          it(`msg, that is a [String] and informs about successful action`,function(){
            expect(true).toBe(false);
          });
          it(`success:true`,function(){
            expect(true).toBe(false);
          });
          it(`item:'dir'`,function(){     
            expect(true).toBe(false);
          });
          it(`from:'${paths.from('styles/scss')}'`,function(){
            expect(true).toBe(false);
          });
          it(`action:'copy'`,function(){
            expect(true).toBe(false);
          });
          it(`overwrite:false`,function(){
            expect(true).toBe(false);
          });
          it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
            expect(true).toBe(false);
          });
          it(`absolute, that is a [String] and ends with '${paths.to('styles/scss')}'`,function(){
            expect(true).toBe(false);
          });
          it(`relative, that is a [String] equal to '${paths.to('styles/scss')}'`,function(){
            expect(true).toBe(false);
          });
        });
        describe(`the each callback for '${paths.from('styles/scss/main.scss')}' file should pass an Object with the property`,function(){
          it(`error:null`,function(){
            expect(true).toBe(false);
          });
          it(`msg, that is a [String] and informs about successful action`,function(){
            expect(true).toBe(false);
          });
          it(`success:true`,function(){
            expect(true).toBe(false);
          });
          it(`item:'file'`,function(){
            expect(true).toBe(false);
          });
          it(`from:'${paths.from('styles/scss/main.scss')}'`,function(){
            expect(true).toBe(false);
          });
          it(`action:'copy'`,function(){
            expect(true).toBe(false);
          });
          it(`overwrite:false`,function(){
            expect(true).toBe(false);
          });
          it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
            expect(true).toBe(false);
          });
          it(`absolute, that is a [String] and ends with '${paths.to('styles/scss/main.scss')}'`,function(){
            expect(true).toBe(false);
          });
          it(`relative, that is a [String] equal to '${paths.to('styles/scss/main.scss')}'`,function(){
            expect(true).toBe(false);
          });
        });
      });

      describe(`for the '${paths.from('styles/css')}' folder`,function(){
        it(`the folder in '${paths.from('styles/css')}' should be still there`,function(){
          expect(true).toBe(false);
        });
        describe(`the each callback should pass an Object with the property`,function(){
          it(`error:null`,function(){
            expect(true).toBe(false);
          });
          it(`msg, that is a [String] and informs about successful action`,function(){
            expect(true).toBe(false);
          });
          it(`success:true`,function(){
            expect(true).toBe(false);
          });
          it(`item:'dir'`,function(){
            expect(true).toBe(false);
          });
          it(`from:'${paths.from('styles/css')}'`,function(){
            expect(true).toBe(false);
          });
          it(`action:'merge'`,function(){
            expect(true).toBe(false);
          });
          it(`overwrite:false`,function(){
            expect(true).toBe(false);
          });
          it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
            expect(true).toBe(false);
          });
          it(`absolute, that is a [String] and ends with '${paths.to('styles/css')}'`,function(){
            expect(true).toBe(false);
          });
          it(`relative, that is a [String] equal to '${paths.to('styles/css')}'`,function(){
            expect(true).toBe(false);
          });
        });
      });

      describe(`for the '${paths.from('styles/css/extra.css')}' file`,function(){
        it(`it should copy the file from '${paths.from('styles/css/extra.css')}' and paste it to '${paths.to('styles/css/extra.css')}'`,function(){
          expect(true).toBe(false);
        });
        it(`the new file should have '${paths.name('styles/css/extra.css')}' name`,function(){
          expect(true).toBe(false);
        });
        it(`the file in '${paths.from('styles/css/extra.css')}' should be still there`,function(){
          expect(true).toBe(false);
        });
        it(`the copied '${paths.from('styles/css/extra.css')}' and pasted '${paths.to('styles/css/extra.css')}' files should have the same content`,function(){
          expect(true).toBe(false);
        });
        describe(`the each callback should pass an Object with the property`,function(){
          it(`error:null`,function(){
            expect(true).toBe(false);
          });
          it(`msg, that is a [String] and informs about successful action`,function(){
            expect(true).toBe(false);
          });
          it(`success:true`,function(){
            expect(true).toBe(false);
          });
          it(`item:'file'`,function(){
            expect(true).toBe(false);
          });
          it(`from:'${paths.from('styles/css/extra.css')}'`,function(){
            expect(true).toBe(false);
          });
          it(`action:'copy'`,function(){
            expect(true).toBe(false);
          });
          it(`overwrite:false`,function(){
            expect(true).toBe(false);
          });
          it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
            expect(true).toBe(false);
          });
          it(`absolute, that is a [String] and ends with '${paths.to('styles/css/extra.css')}'`,function(){
            expect(true).toBe(false);
          });
          it(`relative, that is a [String] equal to '${paths.to('styles/css/extra.css')}'`,function(){
            expect(true).toBe(false);
          });
        });
      });
      describe(`for the '${paths.to('styles/css/main.css')}' file`,function(){
        it(`it should replace existing '${paths.to('styles/css/main.css')}' file with the copied '${paths.to('styles/css/main.css')}' file`,function(){
          expect(true).toBe(false);
        });
        it(`the new file should have '${paths.name('styles/css/main.css')}' name`,function(){
          expect(true).toBe(false);
        });
        it(`the file in '${paths.to('styles/css/main.css')}' should be still there`,function(){
          expect(true).toBe(false);
        });
        it(`the copied '${paths.name('styles/css/main.css')}' and pasted '${paths.name('styles/css/main.css')}' files should have the same content`,function(){
          expect(true).toBe(false);
        });
        it(`the creating process of subsequent item on the structure list should not be aborted`,function(){
          expect(true).toBe(false);
        });
        describe(`the each callback should pass an Object with the property`,function(){
          it(`error:null`,function(){
            expect(true).toBe(false);
          });
          it(`msg, that is a [String] and informs about successful action`,function(){
            expect(true).toBe(false);
          });
          it(`success:true`,function(){
            expect(true).toBe(false);
          });
          it(`item:'file'`,function(){
            expect(true).toBe(false);
          });
          it(`from:'${paths.to('styles/css/main.css')}'`,function(){
            expect(true).toBe(false);
          });
          it(`action:'copy'`,function(){
            expect(true).toBe(false);
          });
          it(`overwrite:true`,function(){
            expect(true).toBe(false);
          });
          it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
            expect(true).toBe(false);
          });
          it(`absolute, that is a [String] and ends with '${paths.to('styles/css/main.css')}'`,function(){
            expect(true).toBe(false);
          });
          it(`relative, that is a [String] equal to '${paths.to('styles/css/main.css')}'`,function(){
            expect(true).toBe(false);
          });
        });
      });

      describe(`the done callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`files:[], that contains '${paths.from('styles/imports.scss')}', '${paths.from('styles/scss/main.scss')}', '${paths.from('styles/css/extra.css')}', '${paths.to('styles/css/main.css')}' files`,function(){
          expect(true).toBe(false);
        });
        it(`dirs:[], that contains '${paths.from('styles')}', '${paths.from('styles/scss')}', '${paths.from('styles/css')}' folders`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
      });
  });
  describe(`and merge:'${paths.from('styles')}' and overwrite:false property\n(or not overwrite property at all - because false is default)`,function(){
      it(`after the merging process, the merged ${paths.to('styles')} folder should contain the files and folders of both merging ${paths.from('styles')} folder and the merged ${paths.to('styles')} folder before merge process`,function(){
        expect(true).toBe(false);
      });
      
      describe(`for the '${paths.from('styles')}' folder`,function(){
        it(`the folder in '${paths.from('styles')}' should be still there`,function(){
          expect(true).toBe(false);
        });
        describe(`the each callback should pass an Object with the property`,function(){
          it(`error:null`,function(){
            expect(true).toBe(false);
          });
          it(`msg, that is a [String] and informs about successful action`,function(){
            expect(true).toBe(false);
          });
          it(`success:true`,function(){
            expect(true).toBe(false);
          });
          it(`item:'dir'`,function(){
            expect(true).toBe(false);
          });
          it(`from:'${paths.from('styles')}'`,function(){
            expect(true).toBe(false);
          });
          it(`action:'merge'`,function(){
            expect(true).toBe(false);
          });
          it(`overwrite:false`,function(){
            expect(true).toBe(false);
          });
          it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
            expect(true).toBe(false);
          });
          it(`absolute, that is a [String] and ends with '${paths.to('styles')}'`,function(){
            expect(true).toBe(false);
          });
          it(`relative, that is a [String] equal to '${paths.to('styles')}'`,function(){
            expect(true).toBe(false);
          });
        });
      });
      
      describe(`for the '${paths.from('styles/imports.scss')}' file`,function(){
        it(`it should copy the file from '${paths.from('styles/imports.scss')}' and paste it to '${paths.to('styles/imports.scss')}'`,function(){
          expect(true).toBe(false);
        });
        it(`the new file should have '${paths.name('styles/imports.scss')}' name`,function(){
          expect(true).toBe(false);
        });
        it(`the file in '${paths.from('styles/imports.scss')}' should be still there`,function(){
          expect(true).toBe(false);
        });
        it(`the copied '${paths.name('styles/imports.scss')}' and pasted '${paths.name('styles/imports.scss')}' files should have the same content`,function(){
          expect(true).toBe(false);
        });
        describe(`the each callback should pass an Object with the property`,function(){
          it(`error:null`,function(){
            expect(true).toBe(false);
          });
          it(`msg, that is a [String] and informs about successful action`,function(){
            expect(true).toBe(false);
          });
          it(`success:true`,function(){
            expect(true).toBe(false);
          });
          it(`item:'file'`,function(){
            expect(true).toBe(false);
          });
          it(`from:'${paths.from('styles/imports.scss')}'`,function(){
            expect(true).toBe(false);
          });
          it(`action:'copy'`,function(){
            expect(true).toBe(false);
          });
          it(`overwrite:false`,function(){
            expect(true).toBe(false);
          });
          it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
            expect(true).toBe(false);
          });
          it(`absolute, that is a [String] and ends with '${paths.to('styles/imports.scss')}'`,function(){
            expect(true).toBe(false);
          });
          it(`relative, that is a [String] equal to '${paths.to('styles/imports.scss')}'`,function(){
            expect(true).toBe(false);
          });
        });
      });

      describe(`for the '${paths.from('styles/scss')}' folder`,function(){
        it(`it should copy the folder from '${paths.from('styles/scss')}' and paste it to '${paths.to('styles/scss')}'`,function(){
          expect(true).toBe(false);
        });
        it(`all contents of the copied folder should be copied as well with the same relative paths, names and contents (when file)`,function(){
          expect(true).toBe(false);
        });
        it(`the copied folder in '${paths.from('styles/scss')}' should be still there with all its contents`,function(){
          expect(true).toBe(false);
        });        
        describe(`the each callback for '${paths.from('styles/scss')}' folder should pass an Object with the property`,function(){
          it(`error:null`,function(){
            expect(true).toBe(false);
          });
          it(`msg, that is a [String] and informs about successful action`,function(){
            expect(true).toBe(false);
          });
          it(`success:true`,function(){
            expect(true).toBe(false);
          });
          it(`item:'dir'`,function(){     
            expect(true).toBe(false);
          });
          it(`from:'${paths.from('styles/scss')}'`,function(){
            expect(true).toBe(false);
          });
          it(`action:'copy'`,function(){
            expect(true).toBe(false);
          });
          it(`overwrite:false`,function(){
            expect(true).toBe(false);
          });
          it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
            expect(true).toBe(false);
          });
          it(`absolute, that is a [String] and ends with '${paths.to('styles/scss')}'`,function(){
            expect(true).toBe(false);
          });
          it(`relative, that is a [String] equal to '${paths.to('styles/scss')}'`,function(){
            expect(true).toBe(false);
          });
        });
        describe(`the each callback for '${paths.from('styles/scss/main.scss')}' file should pass an Object with the property`,function(){
          it(`error:null`,function(){
            expect(true).toBe(false);
          });
          it(`msg, that is a [String] and informs about successful action`,function(){
            expect(true).toBe(false);
          });
          it(`success:true`,function(){
            expect(true).toBe(false);
          });
          it(`item:'file'`,function(){
            expect(true).toBe(false);
          });
          it(`from:'${paths.from('styles/scss/main.scss')}'`,function(){
            expect(true).toBe(false);
          });
          it(`action:'copy'`,function(){
            expect(true).toBe(false);
          });
          it(`overwrite:false`,function(){
            expect(true).toBe(false);
          });
          it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
            expect(true).toBe(false);
          });
          it(`absolute, that is a [String] and ends with '${paths.to('styles/scss/main.scss')}'`,function(){
            expect(true).toBe(false);
          });
          it(`relative, that is a [String] equal to '${paths.to('styles/scss/main.scss')}'`,function(){
            expect(true).toBe(false);
          });
        });
      });

      describe(`for the '${paths.from('styles/css')}' folder`,function(){
        it(`the folder in '${paths.from('styles/css')}' should be still there`,function(){
          expect(true).toBe(false);
        });
        describe(`the each callback should pass an Object with the property`,function(){
          it(`error:null`,function(){
            expect(true).toBe(false);
          });
          it(`msg, that is a [String] and informs about successful action`,function(){
            expect(true).toBe(false);
          });
          it(`success:true`,function(){
            expect(true).toBe(false);
          });
          it(`item:'dir'`,function(){
            expect(true).toBe(false);
          });
          it(`from:'${paths.from('styles/css')}'`,function(){
            expect(true).toBe(false);
          });
          it(`action:'merge'`,function(){
            expect(true).toBe(false);
          });
          it(`overwrite:false`,function(){
            expect(true).toBe(false);
          });
          it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
            expect(true).toBe(false);
          });
          it(`absolute, that is a [String] and ends with '${paths.to('styles/css')}'`,function(){
            expect(true).toBe(false);
          });
          it(`relative, that is a [String] equal to '${paths.to('styles/css')}'`,function(){
            expect(true).toBe(false);
          });
        });
      });

      describe(`for the '${paths.from('styles/css/extra.css')}' file`,function(){
        it(`it should copy the file from '${paths.from('styles/css/extra.css')}' and paste it to '${paths.to('styles/css/extra.css')}'`,function(){
          expect(true).toBe(false);
        });
        it(`the new file should have '${paths.name('styles/css/extra.css')}' name`,function(){
          expect(true).toBe(false);
        });
        it(`the file in '${paths.from('styles/css/extra.css')}' should be still there`,function(){
          expect(true).toBe(false);
        });
        it(`the copied '${paths.from('styles/css/extra.css')}' and pasted '${paths.to('styles/css/extra.css')}' files should have the same content`,function(){
          expect(true).toBe(false);
        });
        describe(`the each callback should pass an Object with the property`,function(){
          it(`error:null`,function(){
            expect(true).toBe(false);
          });
          it(`msg, that is a [String] and informs about successful action`,function(){
            expect(true).toBe(false);
          });
          it(`success:true`,function(){
            expect(true).toBe(false);
          });
          it(`item:'file'`,function(){
            expect(true).toBe(false);
          });
          it(`from:'${paths.from('styles/css/extra.css')}'`,function(){
            expect(true).toBe(false);
          });
          it(`action:'copy'`,function(){
            expect(true).toBe(false);
          });
          it(`overwrite:false`,function(){
            expect(true).toBe(false);
          });
          it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
            expect(true).toBe(false);
          });
          it(`absolute, that is a [String] and ends with '${paths.to('styles/css/extra.css')}'`,function(){
            expect(true).toBe(false);
          });
          it(`relative, that is a [String] equal to '${paths.to('styles/css/extra.css')}'`,function(){
            expect(true).toBe(false);
          });
        });
      });
      describe(`for the '${paths.to('styles/css/main.css')}' file`,function(){

        it(`the action should be aborted, the '${paths.to('styles/css/main.css')}' file should not be copied`,function(){
          expect(true).toBe(false);
        });
        it(`the existing '${paths.to('styles/css/main.css')}' file should keep its former content`,function(){
          expect(true).toBe(false);
        });
        it(`the file in '${paths.to('styles/css/main.css')}' should be still there`,function(){
          expect(true).toBe(false);
        });
        it(`the copy '${paths.to('styles/css/main.css')}' file and the existing '${paths.to('styles/css/main.css')}' file should not have the same content`,function(){
          expect(true).toBe(false);
        });

        describe(`the each callback should pass an Object with the property`,function(){
          it(`error:null`,function(){
            expect(true).toBe(false);
          });
          it(`msg, that is a [String] and warns about failed action`,function(){
            expect(true).toBe(false);
          });
          it(`success:false`,function(){
            expect(true).toBe(false);
          });
          it(`item:'file'`,function(){
            expect(true).toBe(false);
          });
          it(`from:'${paths.to('styles/css/main.css')}'`,function(){
            expect(true).toBe(false);
          });
          it(`action:'copy'`,function(){
            expect(true).toBe(false);
          });
          it(`overwrite:false`,function(){
            expect(true).toBe(false);
          });
          it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
            expect(true).toBe(false);
          });
          it(`absolute, that is a [String] and ends with '${paths.to('styles/css/main.css')}'`,function(){
            expect(true).toBe(false);
          });
          it(`relative, that is a [String] equal to '${paths.to('styles/css/main.css')}'`,function(){
            expect(true).toBe(false);
          });
        });        
      });

      describe(`the done callback should pass an Object with the property`,function(){
        it(`error:null`,function(){
          expect(true).toBe(false);
        });
        it(`files:[], that contains '${paths.from('styles/imports.scss')}', '${paths.from('styles/scss/main.scss')}', '${paths.from('styles/css/extra.css')}' files`,function(){
          expect(true).toBe(false);
        });
        it(`files:[], that not contain '${paths.to('styles/css/main.css')}' file`,function(){
          expect(true).toBe(false);
        });
        it(`dirs:[], that contains '${paths.from('styles')}', '${paths.from('styles/scss')}', '${paths.from('styles/css')}' folders`,function(){
          expect(true).toBe(false);
        });
        it(`root, that is a [String] equal to '${paths.toDir}'`,function(){
          expect(true).toBe(false);
        });
      });
  });
});