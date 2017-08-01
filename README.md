# Description
`structure-dirs` is a module that creates the folders and files contents in the specified path according to the given [Array] structure.

* Any bugs found? Give me to know on **dev.rafalko@gmail.com**
* Also check out [**`list-contents`**](https://www.npmjs.com/package/list-contents) package that returns a list of paths to the subfolders and subfiles of the specified location.

# Installation
`npm install structure-dirs`

```javascript
const create = require('structure-dirs');
```

# Usage
### `create(root,structure,done[,each])`

```javascript
const create = require('structure-dirs');
const structure = [
  {file:'hello.js'},
  {file:'world.js'}
];

create('./dist',structure,(done)=>{
  console.log(done.files);
},(each)=>{
  console.log(each.msg);
});
```


#### `root` **[String]**
* It should indicate the path *(directory)* where to generate the folders and the files specified in `structure` argument.
* If the `root` directory does not exist, it is created

#### `structure` **[Array]**
* the [Array] object that contains the list of files and folders *(and their subfiles and subfolders)* that should be created in the `root` path.
* [See below]() how to create the valid structure object.

#### `done` **[Function]**
* This is the **callback** function
* It is fired **once** when all folders and files are successfully created or if some error occured.
* The one [Object] argument is passed through `done` callback function with the following properties:
  * **`error`**  
  Returns `false` if all files and foldes have been succesfully created.  
  Returns [Error] if something went wrong and the continuation of creating folders and files was aborted.
  * **`dirs`**  
  Returns the [Array] list of the absolute paths of all created folders.
  * **`files`**  
  Returns the [Array] list of the absolute paths of all created files.
  * **`root`**  
  Returns the `root` path argument passed through the module function [see above]()

#### `each` **[Function]** *(optional)*
* This is the **callback** function
* It is fired **for each** file and folder separately when the file or folder is successfully created or if some error occured combined with this file or folder.
* The one [Object] argument is passed through `each` callback function with the following properties:
  * **`error`**  
  Returns `false` if the file or folder has been succesfully created.  
  Returns [Error] if something went wrong with the file or folder.
  * **`msg`**  
  Returns the [String] default message with the details of the operation done or failed.
  * **`item`**  
  Returns [String] `file` value when the file was created or `dir` value when the folder was created.
  * **`from`**  
  Returns the [String] path to the file (or folder) from which the content(s) was copied, moved or merged.
  * **`root`**  
  Returns the [String] `root` path argument passed through the module function [see above]()
  * **`action`**  
  If `item:file`, it returns the [String] action undertaken for the file: `'move'`, `'copy'`, `'append'`, `'write'`, `create`  
  If `item:dir`, it returns the [String] action undertaken for the folder: `'move'`, `'copy'`, `'merge'`, `'create'`
  * **`overwrite`**  
  Returns [Boolean] `true` if the file or folder has been overwritten, otherwise returns `false`.
  * **`absolute`**  
  Returns [String] absolute path of the created file or folder.
  * **`relative`**  
  Returns [String] relative (to the `root` path) path of the created file or folder.

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
const structure = [
  {dir:'scripts', content:[
    {file:'index.js'},
    {file:'ajax.js'}
  ]},
  {dir:'styles', content:[
    {dir:'css', content:[
      {file:'layout.css'},
      {file:'media.css'}
    ]},
    {dir:'scss', content:[
      {file:'mixins.scss'}
    ]}
  ]},
  {dir:'templates', content:[
    {file:'header.html'},
    {file:'navbar.html'}
  ]}
];
```

### Properties:
Each [Object] **Item** can contain the following properties:

#### `file`
**Type:** [String]  
**Default:** *undefined*  
**Description:**
* Indicates the **name** and **extension** of new file, eg. `'index.html'`, `'ajax.js'`.
* Each **Item** must contain at least either `file` or `dir` property.
* **Item** cannot contain both `dir` and `file` property. They exclude each other. Use `dir` to create folder or `file` to create a file.
* Avoid using slashes in the value of `dir` and `file` properties. In order to create subfolders, use `content` property as in the [sample above]().

#### `dir`
**Type:** [String]  
**Default:** *undefined*  
**Description:**
* Indicates the **name** of new folder, eg. `'styles'`, `'modules'`
* Each **Item** must contain at least either `file` or `dir` property.
* **Item** cannot contain both `dir` and `file` property. They exclude each other. Use `dir` to create folder or `file` to create a file.
* Avoid using slashes in the value of `dir` and `file` properties. In order to create subfolders, use `content` property as in the [sample above]().

#### `move`
**Type:** [String]  
**Default:** *undefined*  
**Target:** `file`|`dir`
**Description:**
* When the `file` property is specified in the Item, it indicates the **path** to the file that should be **moved** to the path of the defined `file` property.
* When the `dir` property is specified in the Item, it indicates the **path** to the folder that should be **moved** *(with its all contents)* to the path of the defined `dir` property.
* The **path** value of the `move` property is relative to `__dirname` and not to the `root` first parameter of the module function [see above]().
* **Item** cannot contain `move`, `copy`, `merge`, `content` and `data` properties at the same time. They exclude each other.

#### `copy`
**Type:** [String]  
**Default:** *undefined*  
**Target:** `file`|`dir`
**Description:**
* When the `file` property is specified in the Item, it indicates the **path** to the **file** that should be **copied** to the path of defined `file` property.
* When the `dir` property is specified in the Item, it indicates the **path** to the folder that should be **copied** to the path of defined `dir` property.
* The **path** value of the `move` property is relative to `__dirname` and not to the `root` first parameter of the module function [see above]().
* **Item** cannot contain `move`, `copy`, `merge`, `content` and `data` properties at the same time. They exclude each other.

#### `merge`
**Type:** [String]  
**Default:** *undefined*  
**Target:** `dir`
**Description:**
* When the `dir` property is specified in the Item and `dir` folder **already exists**, it indicates the **path** to the **folder** which contents should be **merged** with the contents of the existing `dir` folder. *(if `dir` folder does not exist, the contents are just **copied**)*
* **Item** cannot contain `move`, `copy`, `merge`, `content` and `data` properties at the same time. They exclude each other.

#### `content`
**Type:** [String] for `file`; [Array] for `dir`  
**Default:** *undefined*  
**Target:** `file`|`dir`
**Description:**
* When the `file` property is specified in the Item, the `content` property indicates the [String] **content** that should be used as the content of the new `file`.
* When the `dir` property is specified in the Item, the `content` property indicates the [Array] **list** of [Object] **subfolders** and [Object] **subfiles** that should be also created in the new `dir` folder. Consider the [\[sample above\]]().
* **Item** cannot contain `move`, `copy`, `merge`, `content` and `data` properties at the same time. They exclude each other.

#### `data`
**Type:** [String]  
**Default:** *undefined*  
**Target:** `file`
**Description:**
* When the `file` property is specified in the Item, the `data` property indicates the **path** to the file, which content should be used as the content of the new `file`.
* **Item** cannot contain `move`, `copy`, `merge`, `content` and `data` properties at the same time. They exclude each other.

#### `overwrite`
**Type:** [Boolean]  
**Default:** *\*\*depends of properties combinations - see in the samples below\*\**  
**Target:** `file`|`dir`
**Description:** It is useful, if the file or folder that you are about to create **already exists** in the specified path.

**This is how it behaves in words of its syllable:**

###### `{file:'style.css', overwrite:true}`
* It creates a new `style.css` file with empty content in the specified path.
* If the `style.css` file already exists, its content is **emptied**.


###### `{file:'style.css', overwrite:false}` *(this is default - you can ommit `overwrite` property)*
* It creates a new `style.css` file with empty content in the specified path.
* If the `style.css` file already exists, the action *(for this file)* is aborted. The new `style.css` is not created and the Error is passed through the `each` callback function [see above]() that warns you of failed action *(the Error **does not abort** creating subsequent files and folders)*


###### `{file:'style.css', copy:'./dist/main.css', overwrite:true}`
* It copies the `./dist/main.css` file and pastes it into the specified path as `style.css` file.
* If the `style.css` file already exists, it is **replaced** by the `./dist/main.css` file.


###### `{file:'style.css', copy:'./dist/main.css', overwrite:false}` *(this is default - you can ommit `overwrite` property)*
* It copies the `./dist/main.css` file and pastes it into the specified path as `style.css` file.
* If the `style.css` file already exists, the action *(for this file)* is aborted. The `./dist/main.css` is not copied/pasted and the Error is passed through the `each` callback function [see above]() that warns you of failed action *(the Error **does not abort** creating subsequent files and folders)*


###### `{file:'style.css', move:'./dist/main.css', overwrite:true}`
* It cuts the `./dist/main.css` file and pastes it into the specified path as `style.css` file.
* If the `style.css` file already exists, it is replaced by the `./dist/main.css` file.


###### `{file:'style.css', move:'./dist/main.css', overwrite:false}` *(this is default - you can ommit `overwrite` property)*
* It cuts the `./dist/main.css` file and pastes it into the specified path as `style.css` file.
* If the `style.css` file already exists, the action *(for this file)* is aborted. The `./dist/main.css` is not cutted/pasted and the Error is passed through the `each` callback function [see above]() that warns you of failed action *(the Error **does not abort** creating subsequent files and folders)*


###### `{file:'style.css', content:'body{margin:0px}', overwrite:true}` *(this is default - you can ommit `overwrite` property)*
* It creates a new `style.css` file with `body{margin:0px}` content in the specified path.
* If the `style.css` file already exists, it **replaces** its content with the new `body{margin:0px}` content.


###### `{file:'style.css', content:'', overwrite:false}`
* It creates a new `style.css` file with `body{margin:0px}` content in the specified path.
* If the `style.css` file already exists, it **appends** the new `body{margin:0px}` content at the end of the content of `style.css` file.


###### `{file:'style.css', data:'./dist/main.css', overwrite:true}` *(this is default - you can ommit `overwrite` property)*
* It creates a new `style.css` file in the specified path with a content read from the `./dist/main.css` file.
* If the `style.css` file already exists, it **replaces** its content with the content read from the `./dist/main.css` file.

###### `{file:'style.css', data:'./dist/main.css', overwrite:false}`
* It creates a new `style.css` file in the specified path with a content read from the `./dist/main.css` file.
* If the `style.css` file already exists, it **appends** the content read from the `./dist/main.css` file.

###### `{dir:'prod', overwrite:true}`
* It creates a new empty `prod` folder.
* If the `prod` folder already exists, it is **replaced** by the new empty `prod` folder.
* If the `content` property is defined in the **Item** with subfolders and subfiles specified, it also creates all of them inside of the new `prod` folder.

###### `{dir:'prod', overwrite:false}`
* It creates a new empty `prod` folder.
* If the `prod` folder already exists, it is **not replaced** by the new empty `prod` folder.
* If the `content` property is defined in the **Item** with subfolders and subfiles specified, it also creates all of them inside of the new `prod` folder. The subfolders and subfiles **Items** can take their own `overwrite` properties *(in case of some of the subfolders or subfiles already exist inside `prod` folder)*


###### `{dir:'prod', copy:'./dist', overwrite:true}`
* It copies a `dist` folder with its all contents and pastes it into the specified path as `prod` folder.
* If the `prod` folder already exists, it is **replaced** by the copied `dist` folder with all its contents.

###### `{dir:'prod', copy:'./dist', overwrite:false}`
* It copies a `dist` folder with its all contents and pastes it into the specified path as `prod` folder.
* If the `prod` folder already exists, the action *(for this folder)* is aborted. The `dist` folder is not copied/pasted and the Error is passed through the `each` callback function [see above]() that warns you of failed action *(the Error **does not abort** creating subsequent files and folders)*

###### `{dir:'prod', move:'./dist', overwrite:true}`
* It cuts a `dist` folder with its all contents and pastes it into the specified path as `prod` folder.
* If the `prod` folder already exists, it is **replaced** by the cut `dist` folder with all its contents.

###### `{dir:'prod', move:'./dist', overwrite:false}`
* It cuts a `dist` folder with its all contents and pastes it into the specified path as `prod` folder.
* If the `prod` folder already exists, the action *(for this folder)* is aborted. The `dist` folder is not cutted/pasted and the Error is passed through the `each` callback function [see above]() that warns you of failed action *(the Error **does not abort** creating subsequent files and folders)*

###### `{dir:'prod', merge:'./dist', overwrite:true}`
* It copies a `dist` folder with its all contents and pastes it into the specified path as `prod` folder.
* If the `prod` folder already exists, the `dist` subfolders and subfiles are copied into the `prod` folder.
* If any subfolders or subfiles already exist in `prod` folder, they are **replaced** by the copied subfolders and subfiles of the same paths and names.

###### `{dir:'prod', merge:'./dist', overwrite:false}`
* It copies a `dist` folder with its all contents and pastes it into the specified path as `prod` folder.
* If the `prod` folder already exists, the `dist` subfolders and subfiles are copied into the `prod` folder.
* If any subfolders or subfiles already exist in `prod` folder, the action *(for each of those subfolders and subfiles)* is aborted. The existing subfolders and subfiles are **not replaced** by the ones from `dist` folder and the Error is passed through the `each` callback function [see above]() that warns you of failed action *(the Error **does not abort** creating subsequent files and folders)*


# Tips
###### 1. How to use both `data` and `content` property for the one file?
```javascript
const structure = {
  {file:'index.js', copy:'./prod/scripts/index.js'},
  {file:'index.js', content:'\nconsole.log("extra line!")', overwrite:false},
}
```
