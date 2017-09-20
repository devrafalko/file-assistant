# Description
`file-assistant` is a module that creates, copies or moves the folders and files into the specified path or modifies the files' content according to the given [Array] object *(or `.json` file path)* instructions.

* Any bugs found? Give me to know on **dev.rafalko@gmail.com** or on [Github](https://github.com/devrafalko/file-assistant)

## The Idea
* Create the abstract `structure object` of the folders and files, that you want to create or use to modify the existing folders and files structure. [\[see how to create the valid structure object\]]()
* Pass your `structure object` as the argument through `file-assistant` function [\[see below\]]()
* It will execute all the instructions *(create, copy, move, modify, overwrite files and folders and append data to the files)*.

## Features
The `file-assistant` contains 3 methods:
* to handle the folders and files due to the `structure object`. [\[see below\]]()
* to automatically generate the `structure object` for the contents of the given folder path. [\[see below\]]()
* to compare the differences between two folders *(which files and subfolders are **extraneous**, **missing** and already **existing**)*. [\[see below\]]()

## List of contents:
1. Common tips
1. Installation
2. Tests
3. Usage
4. Parameters
    a. `root`
    b. `structure`
    c. `done`
    d. `each`
5. Errors
6. Structure object
   1. JSON structure object
   2. items properties
      a. `file`
      b. `dir`
      c. `contents`
      d. `move`
      e. `copy`
      f. `merge`
      g. `write`
      h. `writeFrom`
      i. `overwrite`
7. fileAssistant.structurize method
8. fileAssistant.compare method
9. Samples
      


## OMG list

If you are confused by the excess of the description, there is a list of common tips:
###### Files handling:
1. I just want to create some empty files [\[tip\]]()
2. I just want to create some empty file but only if it does not exist in the destination folder [\[tip\]]()
3. I want to empty the content of existing file  [\[tip\]]()
4. I want to copy the file and paste it in the destination folder [\[tip\]]()
5. I want to copy the file and paste it in the destination folder *(or replace the file if it already exists there)* [\[tip\]]()
6. I want to cut the file and paste it in the destination folder [\[tip\]]()
7. I want to cut the file and paste it in the destination folder *(or replace the file if it already exists there)* [\[tip\]]()
8. I want to append some extra content to the existing file [\[tip\]]()
9. I want to overwrite the content of the existing file with the new content [\[tip\]]()
10. I want to append some extra content given from one file to another existing file [\[tip\]]()
11. I want to overwrite the existing file's content with the content from another file [\[tip\]]()

###### Folders handling:
1. I just want to create empty folder [\[tip\]]()
2. I want to create the folder with some files and subfolders  [\[tip\]]()
3. I want to empty the existing folder  [\[tip\]]()
4. I want to empty the existing folder and then add new files and folders there  [\[tip\]]()
5. I want to add some extra files and folders to the existing folder  [\[tip\]]()
6. I want to replace some files in the existing folder  [\[tip\]]()
7. I want to copy the folder with its contents and paste it in the destination folder
8. I want to copy the folder with its contents and paste it in the destination folder *(or replace the folder with its all contents if it already exists there)* [\[tip\]]()
9. I want to cut the folder with its contents and paste it in the destination folder
10. I want to cut the folder with its contents and paste it in the destination folder *(or replace the folder with its all contents if it already exists there)* [\[tip\]]()
11. I want to copy only the missing files and subfolders from one folder to another [\[tip\]]()
12. I want to copy the missing files and subfolders from one folder to another *(and replace the already existing files there)* [\[tip\]]()

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
  console.log(o.files);
  // > ['./dist/index.html', './dist/styles.css']
}
function each(o){
  console.log(o.message);
  // > The file 'index.html' was created in the './dist' folder.
  // > The file './styles/main.css' was copied as the 'styles.css' to the './dist/' folder.
}

```

#### `root` **[String]**
* It should indicate the [String] **folder** path where to generate the folders and the files specified in the `structure` object.
* If the `root` directory does not exist, it is created.
* If there is some problem with the `root`, the Error is passed through `done` callback. [\[See below\]]()

#### `structure` **[Array|String]**
* The [String] path to the `.json` file that contains the list of files and folders *(and their subfiles and subfolders)* that should be created, copied or moved to the `root` path. [\[See below\]]()
* The [Array] object that contains the list of files and folders *(and their subfiles and subfolders)* that should be created, copied or moved to the `root` path. [\[See below\]]()
* If there is some problem with `structure`, the Error is passed through `done` callback [\[See below\]]()
* [\[See below\]]() **how to create** the valid `structure object`.

> You can also generate the `structure object` *(and `.json` file of that structure)* for the chosen folder with `fileAssistant.structurize` method. [\[see below\]]()

#### `done` **[Function]**
* This is the **callback** function
* It is fired **once** when all folders and files are successfully created or if some error has occured.
* The one [Object] argument is passed through `done` callback function with the following properties:
  * **`error`**  
  Returns `null` if all files and foldes have been succesfully created.  
  Returns [Error] if something went wrong and the continuation of creating folders and files was aborted.
  * **`dirs`**  
  Returns the [Array] list of the absolute paths of all created/moved/merged/copied folders.
  * **`files`**  
  Returns the [Array] list of the absolute paths of all created/moved/copied/modified files.
  * **`root`**  
  Returns the `root` path argument passed through the module function [see above]()

#### `each` **[Function]** *(optional)*
* This is the **callback** function
* It is fired **for each** file and folder separately when the file or folder is successfully created or if some error has occured, combined with this file or folder.
* The one [Object] argument is passed through `each` callback function with the following properties:
  * **`success`**  
    Returns [String] message, about the successfull *(create, copy, move, write, append, etc.)* action, eg. `"The file './prod/styles.css' was successfully copied from the './dist/styles.css' path."`.  
    Otherwise returns `null`.
  * **`warning`**  
    Returns [String] message, if the action was abandoned due to the `overwrite:false` settings, eg. `"The already existing file './prod/styles.css' was not overwritten by the './dist/styles.css' as intended."`.  
    Otherwise returns `null`.
  * **`fail`**  
    Returns [String] message, if the action was failed and the file or folder could not be created, copied, moved, etc, eg. `"Could not move the file from the './dist/styles.css' path into the path './prod/styles.css'."`.  
    Otherwise returns `null`.
  * **`item`**  
  Returns [String] `'file'` value when the file was created or `'dir'` value when the folder was created.
  * **`action`**  
  For `item:file` returns the [String] action undertaken for the file: `'create'`, `'move'`, `'copy'`, `'write'`, `'writeFrom'`, 
  For `item:dir` returns the [String] action undertaken for the folder: `'create'`, `'move'`, `'copy'`, `'merge'`
  * **`from`**  
  Returns the [String] path to the file (or folder) from which the content(s) was copied, moved or merged.  
  Returns `null` if the file or folder was created or modified.
  * **`overwritten`**  
  Returns [Boolean] `true` if the file or folder has been overwritten, otherwise returns `false`.
  * **`absolute`**
  Returns [String] absolute path of the created file or folder.
  * **`relative`**  
  Returns [String] relative *(to the `root` path)* path of the created file or folder.
  * **`root`**  
  Returns the [String] `root` path argument passed through the module function [see above]()

# Handling errors
* The one and only rule that you have to respect is to keep the `done` callback function as a third parameter in the module function execution, otherwise the TypeError will be **thrown**.
* Any other errors will be then passed through the `done`callback function, so your app will not collapse.
* You can run the module function with an incorrect `root` or `structure` arguments, and you will be informed in the `done` callback function about that.
* Any errors of files and folders handling will also be passed through the `done` and `each` callback functions.
* The failure of any file's or folder's action **does not abort** creating subsequent files and folders.

**This will not collapse your app:**
```javascript
const create = require('file-assistant');

create(null,null,(done)=>{
  console.log(done.error); //TypeError with a message of invalid 0th and 1st arguments types
});
```


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
const root = './dist';
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
const fileAssistant = require('file-assistang');
const destination = './dist';
const structure = './templates/structure.json';

fileAssistant(destination,structure,onDone,onEach); //onDone and onEach defined somewhere below...
```

or in the `contents` property inside of the `structure` object:
```javascript
const fileAssistant = require('file-assistang');
const destination = './dist';
const structure = [
 {dir:'styles'},
 {dir:'scripts', contents:'./templates/structure.json'}
];
fileAssistant(destination,structure,onDone,onEach); //onDone and onEach defined somewhere below...
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

> You can also generate the `structure object` *(and `.json` file of that structure)* for the chosen folder with `fileAssistant.structurize` method. [\[see below\]]()

### Properties:
Each [Object] **Item** can contain the following properties:

#### `file`
**Type:** [String]  
**Default:** *undefined*  

**Description:**
* Indicates the **name** and **extension** of new file, eg. `'index.html'`, `'ajax.js'`.
* If you want to overwrite the existing file with the new one, use `overwrite` property. [\[sample below\]]()
* Each **Item** must contain at least either `file` or `dir` property.
* **Item** cannot contain both `dir` and `file` property. They exclude each other. Use `dir` to create folder or `file` to create a file.
* Avoid using slashes in the value of `dir` and `file` properties. In order to create subfolders, use `contents` property as in the [sample above]().

**Sample:**  
* **`{file:'style.css'}`**
It creates a new `style.css` file with empty content in the specified path. 

#### `dir`
**Type:** [String]  
**Default:** *undefined*  
**Description:**
* Indicates the **name** of new folder, eg. `'styles'`, `'modules'`
* If you want to overwrite the existing folder with the new one, use `overwrite` property. [\[sample below\]]()
* Each **Item** must contain at least either `file` or `dir` property.
* **Item** cannot contain both `dir` and `file` property. They exclude each other. Use `dir` to create folder or `file` to create a file.
* Avoid using slashes in the value of `dir` and `file` properties. In order to create subfolders, use `contents` property as in the [sample above]().

**Sample:**
* **`{dir:'prod'}`**  
It creates a new empty `prod` folder.

#### `contents`
###### `content` is also valid
**Type:** [Array|String] 
**Default:** *undefined* 
**Target:** `dir`
**Description:**
* The `contents` property indicates the `dir` `structure object`, that should be created in the `dir` folder. [\[see above\]]()
* The `contents` property can indicate the [String] path to the `.json` file that contains the list of files and folders *(and their subfiles and subfolders)* that should be created, copied or moved to the specified `dir` folder. [\[see below\]]()
* The `contents` property can indicate the [Array] object that contains the list of files and folders *(and their subfiles and subfolders)* that should be created, copied or moved to the specified `dir` folder. [\[see below\]]()
* If you want to overwrite the existing folder with the new one *(with its the `contents`)*, use `overwrite` property. [\[sample below\]]()
* **Item** cannot contain `move`, `copy`, `merge`, `contents`, `write` and `writeFrom` properties at the same time. They exclude each other.

> You can also generate the `structure object` *(and `.json` file of that structure)* for the chosen folder with `fileAssistant.structurize` method. [\[see below\]]()

#### `move`
**Type:** [String]
**Default:** *undefined*
**Target:** `file`|`dir`
**Description:**
* When the `file` property is specified in the Item, it indicates the **path** to the file that should be **moved** to the path of the defined `file` property.
* If you want to overwrite the existing file or folder by the `move` one, use `overwrite` property. [\[sample below\]]()
* When the `dir` property is specified in the Item, it indicates the **path** to the folder that should be **moved** *(with its all contents)* to the path of the defined `dir` property.
* The **path** value of the `move` property is **not relative** to the `root` parameter [see above](). It is recommended to use absolute paths.
* **Item** cannot contain `move`, `copy`, `merge`, `contents`, `write` and `writeFrom` properties at the same time. They exclude each other.

**Sample**
* **`{file:'style.css', move:'./dist/main.css'}`**  
It cuts the `./dist/main.css` file and pastes it into the specified path as `style.css` file.
* **`{dir:'prod', move:'./dist'}`**
It cuts a `dist` folder with its all contents and pastes it into the specified path as `prod` folder.

#### `copy`
**Type:** [String]  
**Default:** *undefined*  
**Target:** `file`|`dir`
**Description:**
* When the `file` property is specified in the Item, it indicates the **path** to the **file** that should be **copied** to the path of defined `file` property.
* If you want to overwrite the existing file or folder by the `copy` one, use `overwrite` property. [\[sample below\]]()
* When the `dir` property is specified in the Item, it indicates the **path** to the folder that should be **copied** to the path of defined `dir` property.
* The **path** value of the `copy` property is **not relative** to the `root` parameter [see above](). It is recommended to use absolute paths.
* **Item** cannot contain `move`, `copy`, `merge`, `contents`, `write` and `writeFrom` properties at the same time. They exclude each other.

**Sample:**  
* **`{file:'style.css', copy:'./dist/main.css'}`**  
It copies the `./dist/main.css` file and pastes it into the specified path as `style.css` file.
* **`{dir:'prod', copy:'./dist'}`**  
It copies a `dist` folder with its all contents and pastes it into the specified path as `prod` folder.

#### `merge`
**Type:** [String]  
**Default:** *undefined*  
**Target:** `dir`
**Description:**
* It indicates the [String] **path** to the **folder** which contents should be **merged** with the contents of the existing `dir` folder.
* If the `dir` folder does not exist, the contents are just **copied**.
* If you want to overwrite the existing files by the `merge` ones, use `overwrite` property. [\[sample below\]]()
* **Item** cannot contain `move`, `copy`, `merge`, `contents`, `write` and `writeFrom` properties at the same time. They exclude each other.

**Sample:**
* **`{dir:'prod', merge:'./dist'}`**
* It copies a `dist` folder with its all contents and pastes it into the specified path as `prod` folder. If `prod` folder already exists, its contents are merged with the contents of `./dist` folder.

#### `write`
**Type:** [String]
**Default:** *undefined*  
**Target:** `file`
**Description:**
* The `write` property indicates the [String] **content** that should be used as the content of the new `file`.
* If you want to overwrite the file's content, rather than append it, use `overwrite` property. [\[sample below\]]()
* **Item** cannot contain `move`, `copy`, `merge`, `contents`, `write` and `writeFrom` properties at the same time. They exclude each other.

**Sample:**
* **`{file:'style.css', write:'body{margin:0px}'}`**  
It creates a new `style.css` file in the specified path with the `body{margin:0px}` content.

#### `writeFrom`
###### `writefrom` is also valid
**Type:** [String]  
**Default:** *undefined*  
**Target:** `file`
**Description:**
* The `data` property indicates the [String] **path** to the file, which content should be used as the content of the new `file`.
* If you want to overwrite the file's content, rather than append it, use `overwrite` property. [\[sample below\]]()
* **Item** cannot contain `move`, `copy`, `merge`, `contents`, `write` and `writeFrom` properties at the same time. They exclude each other.

**Sample:**
* **`{file:'style.css', writeFrom:'./dist/main.css'}`**  
It creates a new `style.css` file in the specified path with the content read from the `./dist/main.css` file.

#### `overwrite`
**Type:** [Boolean]  
**Default:** `false`
**Target:** `file`|`dir`
**Description:** It is useful, if the file or folder that you are about to create, move, copy, merge or modify **already exists** in the specified path. If the file or dir does not exist, the effect will be the same regardless the `overwrite` property is used with `true` or `false` value *(or undefined)*.

* if `overwrite` is `true`, it removes the existing file or folder and creates the **new one**, according to the `structure` options
* if `overwrite` is `false` *(default)*, it does not remove the existing file or folder, instead of that:
  * it does nothing and warns you about failure ([`copy`]() or [`move`]())
  * it creates only missing subfolders or subfiles in the folder that already exists ([`merge`]())
  * it appends the new content to the existing file ([`write`]() or [`writeFrom`]())

##### This is how it behaves in words of its syllable:

##### 1. Assume that the `style.css` file already exists in the destination path:

###### `{file:'style.css', overwrite:true}`
* It removes the existing `style.css` file, and replaces it with the new empty `style.css` file.

###### `{file:'style.css', overwrite:false}`
* The action for this existing file is aborted.
* The existing `style.css` file is not removed and the new `style.css` is not created.
* The `each` `message` property [see above]() will warn you of failed action
* The `each` `success` property [see above]() will be `false`
* The failure of this action **does not abort** creating subsequent files and folders, so the `done` callback function will not return error when all actions are done.

###### `{file:'style.css', copy:'./dist/main.css', overwrite:true}`
* It removes the existing `style.css` file, and replaces it by the copied `./dist/main.css` file.

###### `{file:'style.css', copy:'./dist/main.css', overwrite:false}`
* The action for this existing file is aborted.
* The existing `style.css` file is not removed and the `./dist/main.css` file is not copied/pasted.
* The `each` `message` property [see above]() will warn you of failed action
* The `each` `success` property [see above]() will be `false`
* The failure of this action **does not abort** creating subsequent files and folders, so the `done` callback function will not return error when all actions are done.

###### `{file:'style.css', move:'./dist/main.css', overwrite:true}`
* It removes the existing `style.css` file, and replaces it by the cut `./dist/main.css` file.

###### `{file:'style.css', move:'./dist/main.css', overwrite:false}`
* The action for this existing file is aborted.
* The existing `style.css` file is not removed and the `./dist/main.css` file is not cut/pasted.
* The `each` `message` property [see above]() will warn you of failed action
* The `each` `success` property [see above]() will be `false`
* The failure of this action **does not abort** creating subsequent files and folders, so the `done` callback function will not return error when all actions are done.

###### `{file:'style.css', write:'body{margin:0px}', overwrite:true}`
* It **replaces** the content of the existing `style.css` file with the new `body{margin:0px}` content.

###### `{file:'style.css', write:'body{margin:0px}', overwrite:false}`
* It **appends** the new `body{margin:0px}` content at the end of the content of the existing `style.css` file.

###### `{file:'style.css', writeFrom:'./dist/main.css', overwrite:true}`
* It **replaces** the content of the existing `style.css` file with the content read from the `./dist/main.css` file.

###### `{file:'style.css', writeFrom:'./dist/main.css', overwrite:false}`
* It **appends** the content read from the `./dist/main.css` file at the end of the content of the existing `style.css` file.

##### 2. Assume that the `prod` folder already exists in the destination path:

###### `{dir:'prod', overwrite:true}`
* It removes the existing `prod` folder, and replaces it with the new empty `prod` folder.
* If the `contents` property is defined in the **Item** with subfolders and subfiles specified, it also creates all of them inside of the new `prod` folder.

###### `{dir:'prod', overwrite:false}`
* The action for this existing folder is aborted.
* The existing `prod` folder is not removed and the new `prod` folder is not created.
* The `each` `message` property [see above]() will warn you of failed action
* The `each` `success` property [see above]() will be `false`
* The failure of this action **does not abort** creating subsequent files and folders, so the `done` callback function will not return error when all actions are done.


* If the `contents` property is defined in the **Item** with subfolders and subfiles specified, the action for them is undertaken according to **their own** `overwrite` setting.

In this sample, if the `prod` folder already exists, it is not removed and replaced by the new `prod` folder with all its contents *(it keeps its all current contents)*. The `styles.css` and `index.html` have their own `overwrite` property. If the `styles.css` file already exists, it is replaced by the new `styles.css` file. If the `index.html` file already exists, it is not replaced by the new `index.html` file.
```javascript
const structure = [
  {dir:'prod', overwrite:false, contents:[
    {file:'styles.css', overwrite:true},
    {file:'index.html', overwrite:false}
  ]}
];
```


###### `{dir:'prod', copy:'./dist', overwrite:true}`
* It removes the existing `prod` folder, and replaces it by the copied `dist` folder with all its contents.

###### `{dir:'prod', copy:'./dist', overwrite:false}`
* The action for this existing folder is aborted.
* The existing `prod` folder is not removed and the `dist` folder is not copied/pasted.
* The `each` `message` property [see above]() will warn you of failed action
* The `each` `success` property [see above]() will be `false`
* The failure of this action **does not abort** creating subsequent files and folders, so the `done` callback function will not return error when all actions are done.

###### `{dir:'prod', move:'./dist', overwrite:true}`
* It removes the existing `prod` folder, and replaces it by the cut `dist` folder with all its contents.

###### `{dir:'prod', move:'./dist', overwrite:false}`
* The action for this existing folder is aborted.
* The existing `prod` folder is not removed and the `dist` folder is not cut/pasted.
* The `each` `message` property [see above]() will warn you of failed action
* The `each` `success` property [see above]() will be `false`
* The failure of this action **does not abort** creating subsequent files and folders, so the `done` callback function will not return error when all actions are done.


###### `{dir:'prod', merge:'./dist', overwrite:true}`
* The following steps are taken:
  * it compares the structure of `dist` folder and the structure of `prod` folder
  * all the **files** and **folders** that do not exist in the `prod` folder are copied from `dist` folder into it
  * all the **folders** that already exist in the `prod` folder **are not removed** and **are not replaced** by their `dist` equivalents
  * only the **files** that already exist in the `prod` folder *(and all its subfolders)* **are removed** and **are replaced** by their `dist` equivalents *(of the same relative path)*.

**The `./dist` folder to be merged:**
```
dist
 ├ scripts
 │  ├ index.js
 │  └ ajax.js
 └ styles
     └ sayout.css
```
**Already existed `prod` folder:**
```
prod
 ├ scripts
 │  ├ index.js
 │  └ utils.js
 └ templates
     └ login.html
```

**After merge process:**
```
prod
 ├ scripts
 │  ├ index.js //this file already exists and is replaced by ./dist/scripts/index.js
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
    * The `each` `message` property [see above]() will warn you of failed action
    * The `each` `success` property [see above]() will be `false`
    * The failure of this action **does not abort** creating subsequent files and folders, so the `done` callback function will not return error when all actions are done.


**The `./dist` folder to be merged:**
```
dist
 ├ scripts
 │  ├ index.js
 │  └ ajax.js
 └ styles
     └ sayout.css
```
**Already existed `prod` folder:**
```
prod
 ├ scripts
 │  ├ index.js
 │  └ utils.js
 └ templates
     └ login.html
```

**After merge process:**
```
prod
 ├ scripts
 │  ├ index.js //this file already exists and the action is aborted
 │  ├ ajax.js 
 │  └ utils.js
 ├ templates
 │  └ login.html
 └ styles
     └ sayout.css
```


### `fileAssistant.structurize(path[,json],callback)`
##### Description
It converts the given `path` folder's contents into the abstract [Array] `structure object` representation of it. You can for example modify the returned object and/or use it as `structure` parameter [\[see below\]](), to create the files and folders due to this returned structure object.
##### Parameters
##### `path` **[String]**
* It indicates the [String] path to the folder, which content will be structurized into [Array] contents representation.

##### `json` **[String]** *(optional)*
* If specified, it should indicate the [String] path, where the `.json` file with the returned [Array] `structure object` should be **created**.
* If the specified path does not exist, it is created.
* If the specified file name extension is omitted or is not `.json` it is automatically appended.
* If the specified file already exists, it is replaced by the new one.

##### `callback` **[Function]**
* The `callback` function is executed after the operation is done.
* The two arguments are passed through the `callback` function:
  `[0]` `Error` object, if the `path` or `json` paths are invalid, inaccessible, etc. Otherwise `null`
  `[1]` [Array] `structure object` representing the structure of the given `path` folder

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
/*[
   {dir:'scripts', contents:[
     {file:'index.js'},
     {file:'ajax.js'}
   ]},
   {dir:'styles', contents:[
     {file:'layout.css'}
   ]}
  ] */
});
```

### `fileAssistant.compare(model,compared,callback)`
##### Description
It compares the relative paths of `model` and `compared` folders contents *(all files and subfolders of all levels)* and returns the information about the differences. According to the given information, you can generate the `structure object` [\[see below\]]() and use it to create, copy, move or modify files or folders. [\[see below\]]()
##### Parameters
##### `model` **[String]**
* It indicates the [String] path to the folder, which contents will be used as the model, that `compared` folder should match

##### `compared` **[String]**
* It indicates the [String] path to the folder, which contents is matched with the `model` folder's contents.

##### `callback` **[Function]**
* The `callback` function is executed after the operation is done.
* The two arguments are passed through the `callback` function:
  `[0]` `Error` object, if the `model` or `compared` paths are invalid, inaccessible, etc. Otherwise `null`
  `[1]` [Object] object with the following properties:
  * `model` Returns the [String] absolute path to the `model` folder
  * `compared` Returns the [String] absolute path to the `compared` folder
  * `dirs`
    * **`missing`** Returns the [Array] list of the relative paths to the folders that exist in the `model` folder, but **do not exist** in the `compared` folder
    * **`existing`** Returns the [Array] list of the relative paths to the  folders that exist **both** in the `model` folder and `compared` folder
    * **`extraneous`** Returns the [Array] list of the relative paths to the folders that exist in the `compared` folder, but **do not exist** in the `model` folder
  * `files`
    * **`missing`** Returns the [Array] list of the relative paths to the files that exist in the `model` folder, but **do not exist** in the `compared` folder
    * **`existing`** Returns the [Array] list of the relative paths to the files that exist **both** in the `model` folder and `compared` folder
    * **`extraneous`** Returns the [Array] list of the relative paths to the files that exist in the `compared` folder, but **do not exist** in the `model` folder
    * 
# Samples

###### Create empty file, but prevent creating the file, if it already exists
```javascript
const fileAssistant = require('file-assistang');
const destination = './prod';
const structure = [
  {file:'styles.css', overwrite:false},
  {file:'index.html'} //overwrite:false is default, it can be omitted
];

fileAssistant(destination,structure,onDone,onEach); //onDone and onEach defined somewhere below...
```

###### Overwrite the existing file with the new (empty) one
```javascript
const fileAssistant = require('file-assistang');
const destination = './prod';
const structure = [
  {file:'styles.css', overwrite:true},
  {file:'index.html', overwrite:true}
];

fileAssistant(destination,structure,onDone,onEach); //onDone and onEach defined somewhere below...
```
###### Copy the file, but prevent copying the file, if it already exists
```javascript
const fileAssistant = require('file-assistang');
const destination = './prod';
const structure = [
  {file:'readme.md', copy:'./templates/docs.txt', overwrite:false}
  {file:'LICENSE', copy:'./templates/mit-license.txt'} //overwrite:false is default, it can be omitted
];

fileAssistant(destination,structure,onDone,onEach); //onDone and onEach defined somewhere below...
```
###### Overwrite the existing file with the copied one
```javascript
const fileAssistant = require('file-assistang');
const destination = './prod';
const structure = [
  {file:'styles.css', overwrite:true},
  {file:'index.html', overwrite:true}
];

fileAssistant(destination,structure,onDone,onEach); //onDone and onEach defined somewhere below...
```
###### Move the file, but prevent moving the file, if it already exists
```javascript
const fileAssistant = require('file-assistang');
const destination = './prod';
const structure = [
  {file:'styles.css', move:'./dist/bundled.css', overwrite:false},
  {file:'main.js', move:'./dist/bundled.js'} //overwrite:false is default, it can be omitted
];

fileAssistant(destination,structure,onDone,onEach); //onDone and onEach defined somewhere below...
```
###### Overwrite the existing file with the moved one
```javascript
const fileAssistant = require('file-assistang');
const destination = './prod';
const structure = [
  {file:'styles.css', move:'./dist/bundled.css', overwrite:true},
  {file:'main.js', move:'./dist/bundled.js', overwrite:true}
];

fileAssistant(destination,structure,onDone,onEach); //onDone and onEach defined somewhere below...
```

###### Append a new content to the existing file
```javascript
const fileAssistant = require('file-assistang');
const destination = './prod';
const structure = [
  {file:'styles.css', write:'body:{box-sizing:border-box}', overwrite:false}
];

fileAssistant(destination,structure,onDone,onEach); //onDone and onEach defined somewhere below...
```

###### Overwrite the existing file's content with the new one
```javascript
const fileAssistant = require('file-assistang');
const destination = './prod';
const htmlTemplate =
`<html>
 <head></head>
 <body></body>
</html>`;
const structure = [
  {file:'index.html', write:htmlTemplate, overwrite:true}
];

fileAssistant(destination,structure,onDone,onEach); //onDone and onEach defined somewhere below...
```

###### Append a new content given from another file to the existing file
```javascript
const fileAssistant = require('file-assistang');
const destination = './prod';
const structure = [
  {file:'styles.css', writeFrom:'./templates/reset.css', overwrite:false}
];

fileAssistant(destination,structure,onDone,onEach); //onDone and onEach defined somewhere below...
```

###### Overwrite the existing file's content with the new one, given from another file
```javascript
const fileAssistant = require('file-assistang');
const destination = './prod';
const structure = [
  {file:'index.html', writeFrom:'./templates/html-template.html', overwrite:true}
];

fileAssistant(destination,structure,onDone,onEach); //onDone and onEach defined somewhere below...
```




###### Create empty folder
```javascript
const fileAssistant = require('file-assistang');
const destination = './prod';
const structure = [
  {dir:'lib', overwrite:false},
  {dir:'src'} //overwrite:false is default, it can be omitted
];

fileAssistant(destination,structure,onDone,onEach); //onDone and onEach defined somewhere below...
```

###### Create folder with contents
```javascript
const fileAssistant = require('file-assistang');
const destination = './prod';
const structure = [
  {dir:'lib', overwrite:false},
  {dir:'src', contents:[
    {dir:'styles'},
    {dir:'scripts'},
    {dir:'tests'}
  ]} //overwrite:false is default, it can be omitted
];

fileAssistant(destination,structure,onDone,onEach); //onDone and onEach defined somewhere below...
```

###### Replace the existing folder with the new empty folder
```javascript
const fileAssistant = require('file-assistang');
const destination = './prod';
const structure = [
  {dir:'temp', overwrite:true}
];

fileAssistant(destination,structure,onDone,onEach); //onDone and onEach defined somewhere below...
```
###### Replace the existing folder with the new folder with some contents
```javascript
const fileAssistant = require('file-assistang');
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

fileAssistant(destination,structure,onDone,onEach); //onDone and onEach defined somewhere below...
```
###### Add some files and folders to the existing folder, but prevent replacing the existing files
```javascript
const fileAssistant = require('file-assistang');
const destination = './prod';
const structure = [
  {dir:'styles', contents:[
      {file:'styles.css', overwrite:false},
      {file:'reset.css', overwrite:false}
    ]},
  ], overwrite:false}
];

fileAssistant(destination,structure,onDone,onEach); //onDone and onEach defined somewhere below...
```
###### Add some files and folders to the existing folder and replace already existing files there
```javascript
const fileAssistant = require('file-assistang');
const destination = './prod';
const structure = [
  {dir:'styles', contents:[
      {file:'styles.css', overwrite:true},
      {file:'reset.css', overwrite:true}
    ]},
  ], overwrite:false}
];

fileAssistant(destination,structure,onDone,onEach); //onDone and onEach defined somewhere below...
```

###### Copy the folder with its contents, but prevent replacing the existing folder
```javascript
const fileAssistant = require('file-assistang');
const destination = './prod';
const structure = [
  {dir:'styles', copy:'./dist/styles', overwrite:false}
];

fileAssistant(destination,structure,onDone,onEach); //onDone and onEach defined somewhere below...
```

###### Copy the folder and replace the existing folder with all its contents
```javascript
const fileAssistant = require('file-assistang');
const destination = './prod';
const structure = [
  {dir:'styles', copy:'./dist/styles', overwrite:true}
];

fileAssistant(destination,structure,onDone,onEach); //onDone and onEach defined somewhere below...
```

###### Move the folder with its contents, but prevent replacing the existing folder
```javascript
const fileAssistant = require('file-assistang');
const destination = './prod';
const structure = [
  {dir:'styles', move:'./dist/styles', overwrite:false}
];

fileAssistant(destination,structure,onDone,onEach); //onDone and onEach defined somewhere below...
```

###### Move the folder and replace the existing folder with all its contents
```javascript
const fileAssistant = require('file-assistang');
const destination = './prod';
const structure = [
  {dir:'styles', move:'./dist/styles', overwrite:true}
];

fileAssistant(destination,structure,onDone,onEach); //onDone and onEach defined somewhere below...
```


###### Merge the files, but prevent replacing the existing files
```javascript
const fileAssistant = require('file-assistang');
const destination = './dist';
const structure = [
  {dir:'lib', merge:'./project/modules', overwrite:false}
];

fileAssistant(destination,structure,onDone,onEach); //onDone and onEach defined somewhere below...
```

###### Merge the files and replace the existing files
```javascript
const fileAssistant = require('file-assistang');
const destination = './project';
const structure = [
  {dir:'prod', merge:'./project/dist', overwrite:true}
];

fileAssistant(destination,structure,onDone,onEach); //onDone and onEach defined somewhere below...
```