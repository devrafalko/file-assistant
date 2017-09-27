/* global __dirname */

const path = require('path');
const data = require('./structures.json');
const args = require('typeof-arguments');
const mainPath = path.resolve(__dirname,'./../../');

module.exports.name = getPath.bind(null,'name');
module.exports.rel = getPath.bind(null,'rel');
module.exports.to = getPath.bind(null,'to');
module.exports.from = getPath.bind(null,'from');
module.exports.toDir = getPath.call(null,'toDir','to-dir');
module.exports.fromDir = getPath.call(null,'fromDir','from-dir');
module.exports.rootDir = getPath.call(null,'rootDir','root-dir');

function getPath(which,p){
  args(arguments,['string','string']);
  if(data[p]){
    switch(which){
      case 'name':
        return data[p].name;
        break;
      case 'rel':
        return path.normalize(data[p].path);
        break;
      case 'to':
        return path.resolve(mainPath,data['root-dir'].path,data['to-dir'].path,data[p].path);
        break;
      case 'from':
        return path.resolve(mainPath,data['root-dir'].path,data['from-dir'].path,data[p].path);
        break;
      case 'toDir':
        return path.normalize(data['to-dir'].path);
        break;
      case 'fromDir':
        return path.normalize(data['from-dir'].path);
        break;
      case 'rootDir':
        return path.resolve(mainPath,data['root-dir'].path);
        break;
    }
  } else {
    throw new ReferenceError (`Could not find '${p}' file in the JSON files structure.`);
  }
}