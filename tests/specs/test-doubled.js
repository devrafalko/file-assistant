/* global expect */


const path = require('path');
const helpers = path.resolve('./tests/helpers');

const prepare = require(path.resolve(helpers,'prepare.js'));
const paths = require(path.resolve(helpers,'paths.js'));

xdescribe(`When the structure contains more than one items`,function(){

  describe(`that have the 'file' property of the same value`,function(){
    describe(`and any action property`,function(){
      describe(`and 'overwrite:true'`,function(){
        beforeEach(function(done){
          this.structure = [{file:paths.name('prod.css')}];
          prepare.remove()
          .then(()=>prepare.resetFrom())
          .then(()=>prepare.resetTo())
          .then(()=>prepare.addTo('prod.css'))
          .then(done)
          .catch(done.fail);
        });
        
        it('test',function(){
          expect(true).toBe(true);
        });
        
      });
      describe(`and 'overwrite:false'`,function(){
        
      });
    });
    describe(`and 'move' property`,function(){
      describe(`and 'overwrite:true'`,function(){

      });
      describe(`and 'overwrite:false'`,function(){

      });
      
    });
    describe(`and 'copy' property`,function(){
      describe(`and 'overwrite:true'`,function(){

      });
      describe(`and 'overwrite:false'`,function(){

      });
      
    });
    describe(`and one has 'copy' and other one has 'move' property`,function(){
      describe(`and 'overwrite:true'`,function(){

      });
      describe(`and 'overwrite:false'`,function(){

      });
      
    });
    describe(`and one has 'move' and other one has 'copy' property`,function(){
      describe(`and 'overwrite:true'`,function(){

      });
      describe(`and 'overwrite:false'`,function(){

      });
      
    });
    describe(`and 'write' property`,function(){
      describe(`and 'overwrite:true'`,function(){

      });
      describe(`and 'overwrite:false'`,function(){

      });
      
    });
    describe(`and 'writeFrom' property`,function(){
      describe(`and 'overwrite:true'`,function(){

      });
      describe(`and 'overwrite:false'`,function(){

      });
      
    });
  });

  describe(`that have the 'file' property of the same value and 'beforeWrite' property`,function(){
    describe(`and 'move' property`,function(){
      describe(`and 'overwrite:true'`,function(){

      });
      describe(`and 'overwrite:false'`,function(){

      });
      
    });
    describe(`and 'copy' property`,function(){
      describe(`and 'overwrite:true'`,function(){

      });
      describe(`and 'overwrite:false'`,function(){

      });
      
    });
    describe(`and 'write' property`,function(){
      describe(`and 'overwrite:true'`,function(){

      });
      describe(`and 'overwrite:false'`,function(){

      });
      
    });
    describe(`and 'writeFrom' property`,function(){
      describe(`and 'overwrite:true'`,function(){

      });
      describe(`and 'overwrite:false'`,function(){

      });
      
    });
  });

  describe(`that have the 'dir' property of the same value`,function(){
    describe(`and any action property`,function(){
      describe(`and 'overwrite:true'`,function(){

      });
      describe(`and 'overwrite:false'`,function(){

      });
      
    });
    describe(`and 'move' property`,function(){
      describe(`and 'overwrite:true'`,function(){

      });
      describe(`and 'overwrite:false'`,function(){

      });
      
    });
    describe(`and 'copy' property`,function(){
      describe(`and 'overwrite:true'`,function(){

      });
      describe(`and 'overwrite:false'`,function(){

      });
      
    });
    describe(`and one has 'copy' and other one has 'move' property`,function(){
      describe(`and 'overwrite:true'`,function(){

      });
      describe(`and 'overwrite:false'`,function(){

      });
      
    });
    describe(`and one has 'move' and other one has 'copy' property`,function(){
      describe(`and 'overwrite:true'`,function(){

      });
      describe(`and 'overwrite:false'`,function(){

      });
      
    });
    describe(`and 'merge' property`,function(){
      describe(`and 'overwrite:true'`,function(){

      });
      describe(`and 'overwrite:false'`,function(){

      });
      
    });
  });

  describe(`that have the 'dir' property of the same value and 'content' property, and 'content' scope contains`,function(){
    describe(`items with 'file' of the same value`,function(){
      describe(`and any action property`,function(){
        describe(`and 'overwrite:true'`,function(){

        });
        describe(`and 'overwrite:false'`,function(){

        });
        
      });
      describe(`and 'move' property`,function(){
        describe(`and 'overwrite:true'`,function(){

        });
        describe(`and 'overwrite:false'`,function(){

        });
        
      });
      describe(`and 'copy' property`,function(){
        describe(`and 'overwrite:true'`,function(){

        });
        describe(`and 'overwrite:false'`,function(){

        });
        
      });
      describe(`and 'write' property`,function(){
        describe(`and 'overwrite:true'`,function(){

        });
        describe(`and 'overwrite:false'`,function(){

        });
        
      });
      describe(`and 'writeFrom' property`,function(){
        describe(`and 'overwrite:true'`,function(){

        });
        describe(`and 'overwrite:false'`,function(){

        });
        
      });
    });
    describe(`items with 'dir' of the same value`,function(){
      describe(`and any action property`,function(){
        describe(`and 'overwrite:true'`,function(){

        });
        describe(`and 'overwrite:false'`,function(){

        });
        
      });
      describe(`and 'move' property`,function(){
        describe(`and 'overwrite:true'`,function(){

        });
        describe(`and 'overwrite:false'`,function(){

        });
        
      });
      describe(`and 'copy' property`,function(){
        describe(`and 'overwrite:true'`,function(){

        });
        describe(`and 'overwrite:false'`,function(){

        });
        
      });
      describe(`and 'merge' property`,function(){
        describe(`and 'overwrite:true'`,function(){

        });
        describe(`and 'overwrite:false'`,function(){

        });
        
      });
      describe(`and 'contents' property`,function(){
        describe(`and 'overwrite:true'`,function(){

        });
        describe(`and 'overwrite:false'`,function(){

        });
      });
    });
  });

});
