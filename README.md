# Description
`file-assistant` is a module that creates, copies or moves the folders and files into the specified path or modifies the files' content according to the given [Array] `structure object` *(or `.json` file path)* instructions.

* Any bugs found? Give me to know on dev.rafalko@gmail.com or on [Github](https://github.com/devrafalko/file-assistant/issues)

## The Idea
* Create the [abstract `structure object`](#structure-object) of the folders and files, that you want to create or use to modify the existing folders and files structure.
* Pass your `structure object` as the [argument](#fileassistantrootstructuredoneeach) through `file-assistant` function
* It will execute all the instructions *(create, copy, move, remove, merge, modify, overwrite files and folders and overwrite or append content to the files)*.

## Features
```javascript
const fileAssistant = require('file-assistant');
```
The `fileAssistant` contains 3 methods:
* `fileAssistant` to handle the folders and files due to the `structure object` [\[see below\]](#fileassistantrootstructuredoneeach)
* `fileAssistant.structurize` to automatically generate the `structure object` for the elements of the given folder path [\[see below\]](#fileassistantstructurizepathjsoncallback)
* `fileAssistant.compare` to compare the differences between two folders *(which elements are **extraneous**, **missing** and already **existing**)* [\[see below\]](#fileassistantcomparemodelcomparedcallback)



## List of contents:
1. [Common tips](#omg-list)
2. [Installation](#installation)
3. [Tests](#tests)
4. [Usage](#usage)
5. Parameters
   1. [`root`](#root-string)
   2. [`structure`](#structure-arraystring)
   3. [`done`](#done-function)
   4. [`each`](#each-function-optional)
6. [Errors](#handling-errors)
7. [`Structure object`](#structure-object)
   1. [JSON `structure object`](#json-structure-object)
   2. [`structure object` properties](#structure-object-properties)
      1. [`file`](#file)
      2. [`dir`](#dir)
      3. [`contents`](#contents)
      4. [`move`](#move)
      5. [`copy`](#copy)
      6. [`merge`](#merge)
      7. [`write`](#write)
      8. [`writeFrom`](#writefrom)
      9. [`beforeWrite`](#beforewrite)
      10. [`overwrite`](#overwrite)
8. [`fileAssistant.structurize` method](#fileassistantstructurizepathjsoncallback)
9. [`fileAssistant.compare` method](#fileassistantcomparemodelcomparedcallback)
10. [Samples](#samples)


## OMG list

If you are confused by the excess of the description, there is a list of common tips:
###### Files handling:
1. I just want to create some empty files [\[tip\]](#create-empty-file-but-prevent-creating-the-file-if-it-already-exists)
2. I just want to create some empty file *(or replace the existing file with the new empty one)* [\[tip\]](#overwrite-the-existing-file-with-the-new-empty-one)
3. I want to copy the file and paste it in the destination folder [\[tip\]](#copy-the-file-but-prevent-copying-the-file-if-it-already-exists)
4. I want to copy the file and paste it in the destination folder *(or replace the file if it already exists there)* [\[tip\]](#overwrite-the-existing-file-with-the-copied-one)
6. I want to cut the file and paste it in the destination folder [\[tip\]](#move-the-file-but-prevent-moving-the-file-if-it-already-exists)
7. I want to cut the file and paste it in the destination folder *(or replace the file if it already exists there)* [\[tip\]](#overwrite-the-existing-file-with-the-moved-one)
8. I want to append some extra content to the existing file [\[tip\]](#create-the-new-file-with-the-given-content-or-append-a-new-content-to-the-existing-file)
9. I want to overwrite the content of the existing file with the new content [\[tip\]](#create-the-new-file-with-the-given-content-or-overwrite-the-existing-files-content-with-the-given-one)
10. I want to take the content from one file and append it to another file [\[tip\]](#append-a-new-content-given-from-another-file-to-the-existing-file)
11. I want to take the content from one file and overwrite another file's content with it [\[tip\]](#overwrite-the-existing-files-content-with-the-new-one-given-from-another-file)

###### Folders handling:
1. I just want to create empty folder [\[tip\]](#create-empty-folder)
2. I want to create the folder with some files and subfolders  [\[tip\]](#create-folder-with-contents)
3. I want to empty the existing folder  [\[tip\]](#replace-the-existing-folder-with-the-new-empty-folder)
4. I want to empty the existing folder and then add new files and folders there  [\[tip\]](#replace-the-existing-folder-with-the-new-folder-with-some-contents)
5. I want to add some extra files and folders to the existing folder  [\[tip\]](#add-some-files-to-the-existing-folder-but-prevent-replacing-the-existing-files)
6. I want to replace some files in the existing folder  [\[tip\]](#add-some-files-to-the-existing-folder-and-replace-already-existing-files-there)
7. I want to copy the folder with its contents and paste it in the destination folder  [\[tip\]](#copy-the-folder-with-its-contents-but-prevent-replacing-the-existing-folder)
8. I want to copy the folder with its contents and paste it in the destination folder *(or replace the folder with its all contents if it already exists there)* [\[tip\]](#copy-the-folder-and-replace-the-existing-folder-with-all-its-contents)
9. I want to cut the folder with its contents and paste it in the destination folder  [\[tip\]](#move-the-folder-with-its-contents-but-prevent-replacing-the-existing-folder)
10. I want to cut the folder with its contents and paste it in the destination folder *(or replace the folder with its all contents if it already exists there)* [\[tip\]](#move-the-folder-and-replace-the-existing-folder-with-all-its-contents)
11. I want to copy only the missing files and subfolders from one folder to another [\[tip\]](#merge-the-files-but-prevent-replacing-the-existing-files)
12. I want to copy the missing files and subfolders from one folder to another *(and replace the already existing files there)* [\[tip\]](#merge-the-files-and-replace-the-already-existing-files)

# Installation
`npm install file-assistant`

# Tests
```
> git clone https://github.com/devrafalko/file-assistant
> cd file-assistant
> npm install
> npm test
# or
> npm test deep
```

# Usage

### `fileAssistant(root,structure,done[,each])`

```javascript
const fileAssistant = require('file-assistant');

const root = './dist',
const structure = [
  {file:'index.html'},
  {file:'styles.css', copy:'./styles/main.css'}
];

fileAssistant(root, structure, done, each);

function done(o){
  console.log(o.error);
  console.log(o.files);
  console.log(o.dirs);
}
function each(o){
  console.log(o.success);
  console.log(o.item);
  console.log(o.relative);
  console.log(o.from);
}

```

#### `root` **[String]**
* It should indicate the [String] **folder** path where the elements specified in the `structure` object should be handled.
* If the `root` directory does not exist, it is created.
* If there is some problem with the `root`, the Error is passed through [`done`](#done-function) callback.

#### `structure` **[Array|String]**
* The [Array] `structure` argument should contain the list of files and folders and specify the actions that should be undertaken for them in the `root` folder. [\[See below\]](#structure-object)
* The [String] `structure` argument should indicate the path to the `.json` file that contain the list of files and folders and specify the actions that should be undertaken for them in the `root` folder. [\[See below\]](#json-structure-object)
* [See](#structure-object) how to **create** the **valid** `structure object` or just follow the [instructions](#handling-errors) passed through [`done`](#done-function) callback `error` property.

> You can also generate the `structure object` *(and `.json` file containing that structure)* for the chosen folder with [`fileAssistant.structurize` method](#fileassistantstructurizepathjsoncallback).

#### `done` **[Function]**
* This is the **callback** function
* It is fired **once** when all folders and files are (un)successfully created or if some error has occured.
* The one [Object] argument is passed through `done` callback function with the following properties:
  * **`root`** Returns the [String] [`root`](#root-string) path argument passed through the module function
  * **`error`** Returns [Error] if something went wrong and the continuation of creating folders and files was aborted, *eg. if the `structure` argument is invalid*. Otherwise returns `null`. [See also](#handling-errors) how the errors are handled.
  * **`dirs`** Returns the [Object] object of the following properties:
    * `success` [Array] list of the absolute paths of all created/copied/moved/merged/overwritten folders.
    * `warning` [Array] list of the absolute paths of all intentionally aborted actions on folders *(eg. if the folder was not overwritten, as intended)*
    * `failure` [Array] list of the absolute paths of all unsuccessful actions on folders *(eg. if the folder was inaccessible)*
  * **`files`** Returns the [Object] object of the following properties:
    * `success` [Array] list of the absolute paths of all created/copied/moved/overwritten/modified files.
    * `warning` [Array] list of the absolute paths of all intentionally aborted actions on files *(eg. if the file was not overwritten, as intended)*
    * `failure` [Array] list of the absolute paths of all unsuccessful actions on files *(eg. if the file was inaccessible)*
  * **`unrecognized`** Returns the [Object] object of the following properties:
    * `failure` [Array] list of the absolute paths of all elements that the access was denied for

#### `each` **[Function]** *(optional)*
* This is the **callback** function
* It is fired **for each** file and folder separately when the action for the file or folder is (un)successfully done.
* The one [Object] argument is passed through `each` callback function with the following properties:
  * **`success`**  
    Returns [String] message, about the successful action. Otherwise returns `null`.  
    *eg.* `'The given content was successfully appended to the "script.js" file.'`. 
  * **`warning`**  
    Returns [String] message, about the aborted or not-fully-done action. Otherwise returns `null`.  
    *eg.* `'The already existing folder "components/footer" could not be overwritten by the newly created folder, due to the "overwrite" property settings.'`. 
  * **`failure`**  
    Returns [String] message, about the failed action. Otherwise returns `null`.  
    *eg.* `'The item of the path "modules/locked.js" is inaccessible and could not be moved into the "dist/script.js" path.'`. 
  * **`item`**  
  Returns [String] `'file'` for file element, `'dir'` for folder element or `'unrecognized'` when the access to the element was denied.
  * **`action`**  
  Returns the [String] action undertaken:
    * for the **file**: [`'create'`](#file), [`'move'`](#move), [`'copy'`](#copy), [`'write'`](#write), [`'writeFrom'`](#writefrom)
    * for the **folder**: [`'create'`](#dir), [`contents`](#contents), [`'move'`](#move), [`'copy'`](#copy), [`'merge'`](#merge)
  * **`overwritten`**  
  Returns [Boolean] `true` if the file or folder has been overwritten. Otherwise returns `false`.
  * **`modified`**  
  Returns [Boolean] `true` if the [`beforeWrite`](#beforewrite) property was used and the [`file`](#file) was created/overwritten with the modified content. Otherwise returns `false.`
  * **`from`**  
  Returns the [String] path to the element from which the file, folder or content was copied, moved or merged *(when the property [`copy`](#copy), [`move`](#move), [`merge`](#merge) or [`writeFrom`](#writefrom) was defined in the [`structure object`](#structure-object))*.
  Returns `null` if the file or folder was created or modified *(when the property [`contents`](#contents), [`write`](#write) or **none** property was defined in the [`structure object`](#structure-object))*.
  * **`absolute`**  
  Returns [String] absolute path to the current element.
  * **`relative`**  
  Returns [String] relative path to the current element.
  * **`root`**  
  Returns the [String] [`root`](#root-string) path argument passed through the module function.

# Handling errors
* The one and only rule that you have to respect is to keep the [`done`](#done-function) callback function as a third parameter in the `fileAssistant` module function execution, otherwise the `TypeError` will be **thrown**.
* Any other errors will be then passed through the [`done`](#done-function) callback function, so your app would not collapse.
* If you run the `fileAssistant` module function with an incorrect [`root`](#root-string) or [`structure`](#structure-arraystring) arguments, you are informed in the [`done`](#done-function) callback function about that, so you can follow these instructions to create a valid [`structure object`](#structure-object).
* Any failures of files and folders handling are passed through the [`done`](#done-function) and [`each`](#each-function-optional) callback functions as `warning` and `failure` properties.
* The failed action of one element **does not abort** the actions for subsequent files and folders. The `fileAssistant` module tries to execute as many actions as possible, then returns results in [`done`](#done-function) callback function *(and each single time in [`each`](#each-function-optional) callback function as well)*.

# Structure object

##### Comparison of `structure object` and the final folders and files structure

Assuming that you want to generate the following folders and files structure in the `./dist` path:
```
dist
 ├ scripts
 │  ├ index.js
 │  └ ajax.js
 ├ styles
 │  ├ css   
 │  │  ├ layout.css
 │  │  └ media.css
 │  └ scss
 │     └ mixins.scss
 └ templates
    ├ main.html
    ├ menubar.html
    ├ login.html
    └ contact.html
```
use this javascript syntax:
```javascript
const fileAssistant = require('file-assistant');
const destination = './dist';
const structure = [
  {dir:'scripts', contents:[
    {file:'index.js'},
    {file:'ajax.js'}
  ]},
  {dir:'styles', contents:[
    {dir:'css', contents:[
      {file:'layout.css'},
      {file:'media.css'}
    ]},
    {dir:'scss', contents:[
      {file:'mixins.scss'}
    ]}
  ]},
  {dir:'templates', contents:[
    {file:'header.html'},
    {file:'navbar.html'}
  ]}
];

fileAssistant(destination, structure, (done)=>{/*...*/}, (each)=>{/*...*/});
```

##### JSON `structure object`
The `structure object` can be stored in the **JSON** file.
```json
[
  {"dir":"scripts", "contents":[
    {"file":"index.js"},
    {"file":"ajax.js"}
  ]}
]
```
and then loaded in the `structure` parameter:
```javascript
const fileAssistant = require('file-assistant');
const destination = './dist';
const structure = './templates/structure.json';

fileAssistant(destination, structure, (done)=>{/*...*/}, (each)=>{/*...*/});
```

or in the [`contents`](#contents) property inside of the `structure` object:
```javascript
const fileAssistant = require('file-assistant');
const destination = './dist';
const structure = [
 {dir:'styles'},
 {dir:'scripts', contents:'./templates/structure.json'}
];

fileAssistant(destination, structure, (done)=>{/*...*/}, (each)=>{/*...*/});
```

or even loaded in another `.json` file:
```json
[
  {"dir":"scripts", "contents":[
    {"file":"index.js"},
    {"file":"ajax.js"}
  ]},
  {"dir":"scripts", "contents":"./templates/scripts.json"}
]
```

> You can also generate the `structure object` *(and `.json` file containing that structure)* for the chosen folder with [`fileAssistant.structurize` method](#fileassistantstructurizepathjsoncallback).

### `structure object` Properties:
Each [Object] **Item** of [Array] scope can contain the following properties:

#### `file`
**Type:** [String]  
**Default:** *undefined*  
**Description:**
* Indicates the **name** *(and extension)* of new file, eg. `'index.html'`, `'ajax.js'`.
* If you want to overwrite the existing file with the new one, use [`overwrite`](#filestylecss-overwritetrue) property.
* Each **Item** must contain at least either [`file`](#file) or [`dir`](#dir) property. **Item** cannot contain both [`dir`](#dir) and [`file`](#file) property. They exclude each other. Use [`dir`](#dir) to create folder or [`file`](#file) to create a file.
* Avoid using slashes in the value of [`dir`](#dir) and [`file`](#file) properties. In order to create subfolders, use [`contents`](#contents) property. *(See how the [`structure object`](#structure-object) tree should be built)*

**Sample:**  
* **`{file:'style.css'}`**
It creates a new `style.css` file with empty content in the specified [`root`](#root-string) path. 
* See also the [samples list](#samples)

#### `dir`
**Type:** [String]  
**Default:** *undefined*  
**Description:**
* Indicates the **name** of new folder, eg. `'styles'`, `'modules'`
* If you want to overwrite the existing folder with the new one, use [`overwrite`](#dirprod-overwritetrue) property.
* Each **Item** must contain at least either [`file`](#file) or [`dir`](#dir) property. **Item** cannot contain both [`dir`](#dir) and [`file`](#file) property. They exclude each other. Use [`dir`](#dir) to create folder or [`file`](#file) to create a file.
* Avoid using slashes in the value of [`dir`](#dir) and [`file`](#file) properties. In order to create subfolders, use [`contents`](#contents) property. *(See how the [`structure object`](#structure-object) tree should be built)*

**Sample:**
* **`{dir:'prod'}`**  
It creates a new empty `prod` folder in the specified [`root`](#root-string) path. 
* See also the [samples list](#samples)

#### `contents`
###### `content` is also valid
**Type:** [Array|String]  
**Default:** *undefined*  
**Target:** `dir`  
**Description:**
* The `contents` property defines the [`dir`](#dir) *(local)* [`structure object`](#structure-object), that should be created in the [`dir`](#dir) folder.
* The `contents` property can indicate the [Array] object that contains the [`structure object`](#structure-object) that should be created in the defined [`dir`](#dir) folder.
* The `contents` property can also indicate the [String] path to the [`.json` file](#json-structure-object) that contains the `structure object` that should be created in the defined [`dir`](#dir) folder.
* If you want to overwrite the existing folder with the new one *(and its `contents` elements)*, use [`overwrite`](#dirprod-overwritetrue) property.
* **Item** cannot contain [`move`](#move), [`copy`](#copy), [`merge`](#merge), [`contents`](#contents), [`write`](#write) and [`writeFrom`](#writefrom) properties at the same time. They exclude each other.
 
> You can also generate the `structure object` *(and `.json` file containing that structure)* for the chosen folder with [`fileAssistant.structurize` method](#fileassistantstructurizepathjsoncallback).

#### `move`
**Type:** [String]  
**Default:** *undefined*  
**Target:** `file`|`dir`  
**Description:**
* When the [`file`](#file) property is specified in the Item, the `move` property indicates the **path** to the file that should be **moved** to the path of the defined `file` property.
* When the [`dir`](#dir) property is specified in the Item, the `move` property indicates the **path** to the folder that should be **moved** *(with its all contents)* to the path of the defined `dir` property.
* If you want to overwrite the existing [file](#filestylecss-movedistmaincss-overwritetrue) or [folder](#dirprod-movedist-overwritetrue) by the `move` one, use `overwrite` property.
* Mind, that the **path** value of the `move` property is **not relative** to the [`root`](#root-string). *It is recommended to use the paths related to the `__dirname` or the absolute paths*.
* **Item** cannot contain [`move`](#move), [`copy`](#copy), [`merge`](#merge), [`contents`](#contents), [`write`](#write) and [`writeFrom`](#writefrom) properties at the same time. They exclude each other.

**Sample**
* **`{file:'style.css', move:'./dist/main.css'}`**  
It cuts the `./dist/main.css` file and pastes it into the specified [`root`](#root-string) path as `style.css` file.
* **`{dir:'prod', move:'./dist'}`**
It cuts the `dist` folder with its all contents and pastes it into the specified [`root`](#root-string) path as `prod` folder.
* See also the [samples list](#samples)

#### `copy`
**Type:** [String]  
**Default:** *undefined*  
**Target:** `file`|`dir`
**Description:**
* When the [`file`](#file) property is specified in the Item, the `copy` property indicates the **path** to the file that should be **copied** to the path of the defined `file` property.
* When the [`dir`](#dir) property is specified in the Item, the `copy` property indicates the **path** to the folder that should be **copied** *(with its all contents)* to the path of the defined `dir` property.
* If you want to overwrite the existing [file](#filestylecss-copydistmaincss-overwritetrue) or [folder](#dirprod-copydist-overwritetrue) by the `copy` one, use `overwrite` property.
* Mind, that the **path** value of the `copy` property is **not relative** to the [`root`](#root-string) path. *It is recommended to use the paths related to the `__dirname` or the absolute paths*.
* **Item** cannot contain [`move`](#move), [`copy`](#copy), [`merge`](#merge), [`contents`](#contents), [`write`](#write) and [`writeFrom`](#writefrom) properties at the same time. They exclude each other.

**Sample:**  
* **`{file:'style.css', copy:'./dist/main.css'}`**  
It copies the `./dist/main.css` file and pastes it into the specified [`root`](#root-string) path as `style.css` file.
* **`{dir:'prod', copy:'./dist'}`**  
It copies a `dist` folder with its all contents and pastes it into the specified [`root`](#root-string) path as `prod` folder.
* See also the [samples list](#samples)

#### `merge`
**Type:** [String]  
**Default:** *undefined*  
**Target:** `dir`  
**Description:**
* It indicates the [String] **path** to the **folder** which contents should be **merged** with the contents of the existing [`dir`](#dir) folder.
* If the [`dir`](#dir) folder does not exist, the contents are just **copied** to the path of the defined [`dir`](#dir) property.
* If you want to overwrite the existing files by the `merge` ones, use [`overwrite`](#dirprod-mergedist-overwritetrue) property.
* **Item** cannot contain [`move`](#move), [`copy`](#copy), [`merge`](#merge), [`contents`](#contents), [`write`](#write) and [`writeFrom`](#writefrom) properties at the same time. They exclude each other.

**Sample:**
* **`{dir:'prod', merge:'./dist'}`**
* It copies a `dist` folder with its all contents and pastes it into the specified [`root`](#root-string) path as `prod` folder. If `prod` folder already exists, its contents are merged with the contents of `./dist` folder.
* See also the [samples list](#samples)

#### `write`
**Type:** [String]  
**Default:** *undefined*  
**Target:** `file`  
**Description:**
* The `write` property indicates the [String] **content** that should be used as the content of the new [`file`](#file).
* If you want to [**overwrite**](#filestylecss-writebodymargin0px-overwritetrue) the already existing file's content rather than [**append**](#filestylecss-writefromdistmaincss-overwritefalse) this content, use [`overwrite`](#filestylecss-writebodymargin0px-overwritetrue) property.
* **Item** cannot contain [`move`](#move), [`copy`](#copy), [`merge`](#merge), [`contents`](#contents), [`write`](#write) and [`writeFrom`](#writefrom) properties at the same time. They exclude each other.

**Sample:**
* **`{file:'style.css', write:'body{margin:0px}'}`**  
It creates a new `style.css` file in the specified [`root`](#root-string) path with the `body{margin:0px}` content.
* See also the [samples list](#samples)

#### `writeFrom`
###### `writefrom` is also valid
**Type:** [String]  
**Default:** *undefined*  
**Target:** `file`  
**Description:**
* The `data` property indicates the [String] **path** to the file, which content should be used as the content of the new [`file`](#file).
* If you want to [**overwrite**](#filestylecss-writefromdistmaincss-overwritetrue) the already existing file's content rather than [**append**](#filestylecss-writefromdistmaincss-overwritefalse) this content, use [`overwrite`](#filestylecss-writefromdistmaincss-overwritetrue) property.
* **Item** cannot contain [`move`](#move), [`copy`](#copy), [`merge`](#merge), [`contents`](#contents), [`write`](#write) and [`writeFrom`](#writefrom) properties at the same time. They exclude each other.

**Sample:**
* **`{file:'style.css', writeFrom:'./dist/main.css'}`**  
It creates a new `style.css` file in the specified [`root`](#root-string) path with the content read from the `./dist/main.css` file.
* See also the [samples list](#samples)

#### `beforeWrite`
###### `beforewrite` is also valid
**Type:** [Function]  
**Default:** *undefined*  
**Target:** `file`  
**Description:**
  * This property allows to modify the **content** for the [`file`](#file) before this file is created/overwritten.
  * This property can be used in combination with the following properties:
    * [**`write`**](#write): the value content is taken and passed through the `beforeWrite` function
    * [**`writeFrom`**](#writefrom), [**`copy`**](#copy), [**`move`**](#move): the content is read from the file and passed through the `beforeWrite` function
    * **Mind** that if the `beforeWrite` property is used in combination with [`write`](#write) or [`writeFrom`](#writefrom) and [`overwrite`](#overwrite):`true` properties, the new modified content is appended to the [`file`](#file) rather than overwrite the current content.
  * If the [Function] `beforeWrite` is defined, this function is executed with the following arguments:
    * [0] **`content`**: It gives the access to the *(utf8)* content taken from [`write`](#write), [`writeFrom`](#writefrom), [`move`](#move) or [`copy`](#copy)
    * [1] **`resolve`** This is callback function. When the new content is already modified, call `resolve` to continue the process of handling files and folder by the `file-assistant` package. **Remember** to pass [String|Buffer] `modified` data through `resolve` callback function: `resolve(modified)`, othwerwise the action will be failed for this file.
    * [2] **`reject`** This is callback function. If something went wrong with modifying the content and you want to abort the action of creating the file with the new modified content, call `reject` callback function. Then the [`each`](#each-function-optional) callback will be called with [`failure`](#each-function-optional) message. The additional [String] `message` can be passed through `reject` callback function. It will be appended to the [`each`](#each-function-optional) callback [`failure`](#each-function-optional) message: `reject(message)`
  * The origin [`write`](#write), [`writeFrom`](#writefrom), [`move`](#move) or [`copy`](#copy) file's content **is not affected** by this function. The modified content is used only to modify the [`file`](#file) content.
```javascript
const fileAssistant = require('file-assistant');
const destination = './prod';
const structure = [
  {file:'data.txt', writeFrom:'./dist/data.txt', beforeWrite:parseData}
];

fileAssistant(destination, structure, (done)=>{/*...*/}, (each)=>{/*...*/});

function parseData(getData, resolve, reject){
  //getData is the utf-8 content taken from './dist/data.txt' file
  if(getData.length>100) {
    reject('The text is too long!');
  } else {
    const modifiedData = getData.toUpperCase();
    resolve(modifiedData);
  }
}
```

#### `overwrite`
**Type:** [Boolean]  
**Default:** `false`  
**Target:** `file`|`dir`  
**Description:** It is useful, if the file or folder that you are about to create, move, copy, merge or modify **already exists** in the specified path. If the file or folder does not exist, the effect will be the same regardless the `overwrite` property is used with `true` or `false` value *(or undefined)*.

* if `overwrite` is `true`, it removes the existing file or folder and creates the **new one**, according to the [`structure`](#structure-arraystring) options
* if `overwrite` is `false` *(default)*, it does not remove the existing file or folder, instead of that:
  * it does nothing and [warns](#each-function-optional) you about aborted action ([`copy`](#copy) or [`move`](#move))
  * it creates only missing subfolders or subfiles in the folder that already exists ([`merge`](#merge))
  * it appends the new content to the existing file ([`write`](#write) or [`writeFrom`](#writefrom))

##### This is how it behaves in words of its syllable:

##### 1. Assume that the `style.css` file already exists in the destination `root` path:

###### `{file:'style.css', overwrite:true}`
* It removes the existing `style.css` file and replaces it with the new empty `style.css` file.

###### `{file:'style.css', overwrite:false}`
* The action for this existing file is aborted. The existing `style.css` file is not removed and the new `style.css` is not created.
* The [`each`](#each-function-optional) `warning` property will warn you about aborted action and the `success` property will be `null`.

###### `{file:'style.css', copy:'./dist/main.css', overwrite:true}`
* It removes the existing `style.css` file and replaces it with the copied `./dist/main.css` file.

###### `{file:'style.css', copy:'./dist/main.css', overwrite:false}`
* The action for this existing file is aborted. The existing `style.css` file is not removed and the `./dist/main.css` file is not copied/pasted.
* The [`each`](#each-function-optional) `warning` property will warn you about aborted action and the `success` property will be `null`.

###### `{file:'style.css', move:'./dist/main.css', overwrite:true}`
* It removes the existing `style.css` file and replaces it with the cut `./dist/main.css` file.

###### `{file:'style.css', move:'./dist/main.css', overwrite:false}`
* The action for this existing file is aborted. The existing `style.css` file is not removed and the `./dist/main.css` file is not cut/pasted.
* The [`each`](#each-function-optional) `warning` property will warn you about aborted action and the `success` property will be `null`.

###### `{file:'style.css', write:'body{margin:0px}', overwrite:true}`
* It **replaces** the content of the existing `style.css` file with the new `body{margin:0px}` content.

###### `{file:'style.css', write:'body{margin:0px}', overwrite:false}`
* It **appends** the new `body{margin:0px}` content at the end of the content of the existing `style.css` file.

###### `{file:'style.css', writeFrom:'./dist/main.css', overwrite:true}`
* It **replaces** the content of the existing `style.css` file with the content read from the `./dist/main.css` file.

###### `{file:'style.css', writeFrom:'./dist/main.css', overwrite:false}`
* It **appends** the content read from the `./dist/main.css` file at the end of the content of the existing `style.css` file.

##### 2. Assume that the `prod` folder already exists in the destination `root` path:

###### `{dir:'prod', overwrite:true}`
* It removes the existing `prod` folder and replaces it with the new empty `prod` folder.
* If the [`contents`](#contents) property is defined in the **Item** with subfolders and subfiles specified, it also creates all of them inside of the new `prod` folder.

###### `{dir:'prod', overwrite:false}`
* The action for this existing folder is aborted. The existing `prod` folder is not removed and the new `prod` folder is not created.
* The [`each`](#each-function-optional) `warning` property will warn you about aborted action and the `success` property will be `null`.
* If the [`contents`](#contents) property is defined in the **Item** with subfolders and subfiles specified, the action for them is undertaken according to **their own** [`overwrite`](#overwrite) setting.

In the following sample, if the `prod` folder already exists, it is not removed and replaced by the new `prod` folder with all its contents *(it keeps its all current contents)*. The `styles.css` and `index.html` have their own `overwrite` property. If the `styles.css` file already exists, it is replaced by the new `styles.css` file. If the `index.html` file already exists, it is not replaced by the new `index.html` file.
```javascript
const structure = [
  {dir:'prod', overwrite:false, contents:[
    {file:'styles.css', overwrite:true},
    {file:'index.html', overwrite:false}
  ]}
];
```


###### `{dir:'prod', copy:'./dist', overwrite:true}`
* It removes the existing `prod` folder and replaces it with the copied `dist` folder with all its contents.

###### `{dir:'prod', copy:'./dist', overwrite:false}`
* The action for this existing folder is aborted. The existing `prod` folder is not removed and the `dist` folder is not copied/pasted.
* The [`each`](#each-function-optional) `warning` property will warn you about aborted action and the `success` property will be `null`.

###### `{dir:'prod', move:'./dist', overwrite:true}`
* It removes the existing `prod` folder, and replaces it by the cut `dist` folder with all its contents.

###### `{dir:'prod', move:'./dist', overwrite:false}`
* The action for this existing folder is aborted. The existing `prod` folder is not removed and the `dist` folder is not cut/pasted.
* The [`each`](#each-function-optional) `warning` property will warn you about aborted action and the `success` property will be `null`.


###### `{dir:'prod', merge:'./dist', overwrite:true}`
* The following steps are taken:
  * it compares the structure of `dist` folder and the structure of `prod` folder
  * all the **files** and **folders** that do not exist in the `prod` folder are copied from `dist` folder into it
  * all the **folders** that already exist in the `prod` folder **are not removed** and **are not replaced** by their `dist` equivalents
  * only the **files** that already exist in the `prod` folder *(and all its subfolders)* **are removed** and **are replaced** by their `dist` equivalents *(of the same relative path)*.

```
#The './dist' folder to be merged:
dist
 ├ scripts
 │  ├ index.js
 │  └ ajax.js
 └ styles
     └ sayout.css

#Already existed 'prod' folder:
prod
 ├ scripts
 │  ├ index.js
 │  └ utils.js
 └ templates
     └ login.html
     
#After merge process:
prod
 ├ scripts
 │  ├ index.js //this file had already existed and was replaced by './dist/scripts/index.js'
 │  ├ ajax.js 
 │  └ utils.js
 ├ templates
 │  └ login.html
 └ styles
     └ sayout.css
```


###### `{dir:'prod', merge:'./dist', overwrite:false}`
* The following steps are taken:
  * it compares the structure of `dist` folder and the structure of `prod` folder
  * all the **files** and **folders** that do not exist in the `prod` folder are copied from `dist` folder into it
  * all the **folders** that already exist in the `prod` folder **are not removed** and **are not replaced** by their `dist` equivalents
  * the **files** that already exist in the `prod` folder *(and all its subfolders)* **are not removed** and **are not replaced** by their `dist` equivalents *(of the same relative path)*. Instead of that:
    * The [`each`](#each-function-optional) `warning` property will warn you about aborted action
    * The [`each`](#each-function-optional) `success` property will be `null`



```
#The './dist' folder to be merged:
dist
 ├ scripts
 │  ├ index.js
 │  └ ajax.js
 └ styles
     └ sayout.css
     
#Already existed 'prod' folder:
prod
 ├ scripts
 │  ├ index.js
 │  └ utils.js
 └ templates
     └ login.html

#After merge process:
prod
 ├ scripts
 │  ├ index.js //this file had already existed and the action was aborted
 │  ├ ajax.js 
 │  └ utils.js
 ├ templates
 │  └ login.html
 └ styles
     └ sayout.css
```


### `fileAssistant.structurize(path[,json],callback)`
##### Description
It converts the given `path` folder's contents into the abstract [Array] [`structure object`](#structure-object) representation of it. You can for example modify the returned object and/or use it as the [`structure`](#structure-arraystring) parameter, to create the files and folders due to this returned `structure object`.
##### Parameters
##### `path` **[String]**
* It indicates the [String] path to the folder, which content will be structurized into the [Array] `structure object` representation.

##### `json` **[String]** *(optional)*
* If specified, it should indicate the [String] path, where the `.json` file with the returned [Array] `structure object` should be **created**.
* If the specified path does not exist, it is created.
* If the specified file name extension is omitted or is not `.json`, the correct extension is automatically appended.
* If the specified file already exists, it is replaced by the new one.

##### `callback` **[Function]**
* The `callback` function is executed after the operation is done.
* The two arguments are passed through the `callback` function:
  * `[0]` [Error] object, if the `path` or `json` paths are invalid, inaccessible, etc. Otherwise it returns `null`.
  * `[1]` [Array] `structure object` representing the structure of the given `path` folder.

The ./dist folder to be structurized:
```
dist
 ├ scripts
 │  ├ index.js
 │  └ ajax.js
 └ styles
     └ layout.css
```
The returned [Array] object representation of the given `./dist` folder's contents:
```javascript
const folder = './dist';
const json = './dist/structure.json';
fileAssistant.structurize(folder,json,(err,data)=>{
  console.log(data);
/*
[
  {dir:'scripts', contents:[
    {file:'index.js'},
    {file:'ajax.js'}
  ]},
  {dir:'styles', contents:[
    {file:'layout.css'}
  ]}
]
*/
});
```

### `fileAssistant.compare(model,compared,[config,]callback)`
##### Description
It compares the paths of `model` and `compared` folders contents and returns the information about the differences.
> According to the given information, you can generate the [`structure object`](#structure-object) and use it to create, copy, move or modify files or folders.
##### Parameters
##### `model` **[String]**
* It indicates the [String] path to the folder, which contents will be used as the model, that `compared` folder should match.

##### `compared` **[String]**
* It indicates the [String] path to the folder, which elements are compared with the elements of the `model` folder.

##### `config` **[Object]**
* if **omitted**, the parameters are set to their default values; *All the elements of all levels are compared*.
* You can configure the `compare` method with the following [Object] `config`'s properties:
  * **`depth`** [Number|null] *(default:null)*  
    It indicates how deep the `compare` function should explore the folders in the given `model` and `compared` directories.  
    If set to `null` *(default)* - it compares all subfiles and subfolders of all levels of the `model` and `compared` directories.  
    If set to 1 - it compares only the one level of `model` and `compared` elements; eg. `./styles`, `./index.html`.  
    If set to 2 - it compares two levels of `model` and `compared` elements; eg. `./styles/css`, `./scripts/ajax.js`.  
    etc.
  * **`exclude`** [Array|String] *(default:[])*  
    It indicates the folders' and files' paths that should be ignored and not compared.  
    If the folder is indicated, neither the folder nor its contents will be compared.  
    When [String], it can indicate the one path to ignore, eg `"./bin"`.  
    When [Array], it can indicate more than one path to ignore, eg. `["./node_modules", "./bin"]`.  
    The given paths **must be relative** to the `model` and `compared` paths, otherwise they will be not recognized.  
    You can ignore needless paths, eg. `'./node_modules'` or `'./.git'` to make the `compare` module faster.

##### `callback` **[Function]**
* The `callback` function is executed after the operation is done.
* The two arguments are passed through the `callback` function:  
  `[0]` [Error] object, if the `model` or `compared` paths are invalid, inaccessible, etc. Otherwise it returns `null`.  
  `[1]` [Object] object with the following properties:
  * **`model`** Returns the [String] absolute path to the `model` folder
  * **`compared`** Returns the [String] absolute path to the `compared` folder
  * **`dirs`**
    * **`missing`** Returns the [Array] list of the relative paths to the folders that exist in the `model` folder, but **do not exist** in the `compared` folder
    * **`existing`** Returns the [Array] list of the relative paths to the  folders that exist **both** in the `model` folder and `compared` folder
    * **`extraneous`** Returns the [Array] list of the relative paths to the folders that exist in the `compared` folder, but **do not exist** in the `model` folder
  * **`files`**
    * **`missing`** Returns the [Array] list of the relative paths to the files that exist in the `model` folder, but **do not exist** in the `compared` folder
    * **`existing`** Returns the [Array] list of the relative paths to the files that exist **both** in the `model` folder and `compared` folder
    * **`extraneous`** Returns the [Array] list of the relative paths to the files that exist in the `compared` folder, but **do not exist** in the `model` folder
  * **`inaccessible`** Returns the [Array] list of all elements that the access was denied for.

```javascript
const model = './dist';
const compared = './prod';
fileAssistant.structurize(model,compared,(err,data)=>{
  console.log(err);
  console.log(data.dirs.missing);
  console.log(data.files.extraneous);
});
```

# Samples

###### Create empty file, but prevent creating the file, if it already exists
```javascript
const fileAssistant = require('file-assistant');
const destination = './prod';
const structure = [
  {file:'styles.css', overwrite:false},
  {file:'index.html'} //overwrite:false is default, it can be omitted
];

fileAssistant(destination, structure, (done)=>{/*...*/}, (each)=>{/*...*/});
```

###### Overwrite the existing file with the new (empty) one
```javascript
const fileAssistant = require('file-assistant');
const destination = './prod';
const structure = [
  {file:'styles.css', overwrite:true},
  {file:'index.html', overwrite:true}
];

fileAssistant(destination, structure, (done)=>{/*...*/}, (each)=>{/*...*/});
```
###### Copy the file, but prevent copying the file, if it already exists
```javascript
const fileAssistant = require('file-assistant');
const destination = './prod';
const structure = [
  {file:'readme.md', copy:'./templates/docs.txt', overwrite:false}
  {file:'LICENSE', copy:'./templates/mit-license.txt'} //overwrite:false is default, it can be omitted
];

fileAssistant(destination, structure, (done)=>{/*...*/}, (each)=>{/*...*/});
```
###### Overwrite the existing file with the copied one
```javascript
const fileAssistant = require('file-assistant');
const destination = './prod';
const structure = [
  {file:'styles.css', overwrite:true},
  {file:'index.html', overwrite:true}
];

fileAssistant(destination, structure, (done)=>{/*...*/}, (each)=>{/*...*/});
```
###### Move the file, but prevent moving the file, if it already exists
```javascript
const fileAssistant = require('file-assistant');
const destination = './prod';
const structure = [
  {file:'styles.css', move:'./dist/bundled.css', overwrite:false},
  {file:'main.js', move:'./dist/bundled.js'} //overwrite:false is default, it can be omitted
];

fileAssistant(destination, structure, (done)=>{/*...*/}, (each)=>{/*...*/});
```
###### Overwrite the existing file with the moved one
```javascript
const fileAssistant = require('file-assistant');
const destination = './prod';
const structure = [
  {file:'styles.css', move:'./dist/bundled.css', overwrite:true},
  {file:'main.js', move:'./dist/bundled.js', overwrite:true}
];

fileAssistant(destination, structure, (done)=>{/*...*/}, (each)=>{/*...*/});
```

###### Create the new file with the given content or append a new content to the existing file
```javascript
const fileAssistant = require('file-assistant');
const destination = './prod';
const structure = [
  {file:'styles.css', write:'body:{box-sizing:border-box}', overwrite:false}
];

fileAssistant(destination, structure, (done)=>{/*...*/}, (each)=>{/*...*/});
```

###### Create the new file with the given content or overwrite the existing file's content with the given one
```javascript
const fileAssistant = require('file-assistant');
const destination = './prod';
const htmlTemplate =
`<html>
 <head></head>
 <body></body>
</html>`;
const structure = [
  {file:'index.html', write:htmlTemplate, overwrite:true}
];

fileAssistant(destination, structure, (done)=>{/*...*/}, (each)=>{/*...*/});
```

###### Append a new content given from another file to the existing file
```javascript
const fileAssistant = require('file-assistant');
const destination = './prod';
const structure = [
  {file:'styles.css', writeFrom:'./templates/reset.css', overwrite:false}
];

fileAssistant(destination, structure, (done)=>{/*...*/}, (each)=>{/*...*/});
```

###### Overwrite the existing file's content with the new one, given from another file
```javascript
const fileAssistant = require('file-assistant');
const destination = './prod';
const structure = [
  {file:'index.html', writeFrom:'./templates/html-template.html', overwrite:true}
];

fileAssistant(destination, structure, (done)=>{/*...*/}, (each)=>{/*...*/});
```

###### Create empty folder
```javascript
const fileAssistant = require('file-assistant');
const destination = './prod';
const structure = [
  {dir:'lib', overwrite:false},
  {dir:'src'} //overwrite:false is default, it can be omitted
];

fileAssistant(destination, structure, (done)=>{/*...*/}, (each)=>{/*...*/});
```

###### Create folder with contents
```javascript
const fileAssistant = require('file-assistant');
const destination = './prod';
const structure = [
  {dir:'lib', overwrite:false},
  {dir:'src', contents:[
    {dir:'styles'},
    {dir:'scripts'},
    {dir:'tests'}
  ]} //overwrite:false is default, it can be omitted
];

fileAssistant(destination, structure, (done)=>{/*...*/}, (each)=>{/*...*/});
```

###### Replace the existing folder with the new empty folder
```javascript
const fileAssistant = require('file-assistant');
const destination = './prod';
const structure = [
  {dir:'temp', overwrite:true}
];

fileAssistant(destination, structure, (done)=>{/*...*/}, (each)=>{/*...*/});
```
###### Replace the existing folder with the new folder with some contents
```javascript
const fileAssistant = require('file-assistant');
const destination = './prod';
const structure = [
  {dir:'src', contents:[
    {dir:'styles', contents:[
      {file:'styles.css'}
    ]},
    {dir:'scripts'},
    {dir:'tests'}
  ], overwrite:true}
];

fileAssistant(destination, structure, (done)=>{/*...*/}, (each)=>{/*...*/});
```
###### Add some files to the existing folder, but prevent replacing the existing files
```javascript
const fileAssistant = require('file-assistant');
const destination = './prod';
const structure = [
  {dir:'styles', contents:[
      {file:'styles.css', overwrite:false},
      {file:'reset.css', overwrite:false}
    ]},
  ], overwrite:false}
];

fileAssistant(destination, structure, (done)=>{/*...*/}, (each)=>{/*...*/});
```
###### Add some files to the existing folder and replace already existing files there
```javascript
const fileAssistant = require('file-assistant');
const destination = './prod';
const structure = [
  {dir:'styles', contents:[
      {file:'styles.css', overwrite:true},
      {file:'reset.css', overwrite:true}
    ]},
  ], overwrite:false}
];

fileAssistant(destination, structure, (done)=>{/*...*/}, (each)=>{/*...*/});
```

###### Copy the folder with its contents, but prevent replacing the existing folder
```javascript
const fileAssistant = require('file-assistant');
const destination = './prod';
const structure = [
  {dir:'styles', copy:'./dist/styles', overwrite:false}
];

fileAssistant(destination, structure, (done)=>{/*...*/}, (each)=>{/*...*/});
```

###### Copy the folder and replace the existing folder with all its contents
```javascript
const fileAssistant = require('file-assistant');
const destination = './prod';
const structure = [
  {dir:'styles', copy:'./dist/styles', overwrite:true}
];

fileAssistant(destination, structure, (done)=>{/*...*/}, (each)=>{/*...*/});
```

###### Move the folder with its contents, but prevent replacing the existing folder
```javascript
const fileAssistant = require('file-assistant');
const destination = './prod';
const structure = [
  {dir:'styles', move:'./dist/styles', overwrite:false}
];

fileAssistant(destination, structure, (done)=>{/*...*/}, (each)=>{/*...*/});
```

###### Move the folder and replace the existing folder with all its contents
```javascript
const fileAssistant = require('file-assistant');
const destination = './prod';
const structure = [
  {dir:'styles', move:'./dist/styles', overwrite:true}
];

fileAssistant(destination, structure, (done)=>{/*...*/}, (each)=>{/*...*/});
```


###### Merge the files, but prevent replacing the existing files
```javascript
const fileAssistant = require('file-assistant');
const destination = './dist';
const structure = [
  {dir:'lib', merge:'./project/modules', overwrite:false}
];

fileAssistant(destination, structure, (done)=>{/*...*/}, (each)=>{/*...*/});
```

###### Merge the files and replace the already existing files
```javascript
const fileAssistant = require('file-assistant');
const destination = './project';
const structure = [
  {dir:'prod', merge:'./project/dist', overwrite:true}
];

fileAssistant(destination, structure, (done)=>{/*...*/}, (each)=>{/*...*/});
```