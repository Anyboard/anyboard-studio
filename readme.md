# Installation
The Anyboard Studio project is built on Node.js and requires the Node Package Manager (NPM) to run. For simplicity we recommend using Yarn to handle the packaging as it is deterministic in it's approach and should give identical installations across environments. NPM can sometimes install different versions and introduce minor discrepencies which can subsequently result in build failure.  

* Node.js - https://nodejs.org/en/
* NPM - https://www.npmjs.com/
* Yarn - https://yarnpkg.com/en/

The current build of Anyboard Studio has succesfully been run on the environments listed below. 

### OSX - 10.11.6
|Program	    |Version	|
|---	        |---	    |
|Node.js      |7.10.0   |
|Yarn        	|0.24.4  	|
|NPM        	|4.2.0  	|


### Ubuntu 16.04.1 LTS
|Program	    |Version  |
|---	        |---	    |
|Node.js      |7.8.0    |
|Yarn        	|0.24.4  	|
|NPM        	|4.4.0  	|

### Windows 10 v.1703 build 15063.296
|Program	    |Version  |
|---	        |---	    |
|Node.js      |7.7.1    |
|Yarn        	|0.24.5  	|
|NPM        	|4.1.2  	|

Note: If the machine has less than 1GB of ram available Yarn might run into 'out of memory'-exceptions.

## Installation Steps
1. Clone the repository to your prefered location
```shell
cd my/prefered/project/folder
git clone git@github.com:bronlund/anyboard-studio.git
# Creates my/prefered/project/folder/anyboard-studio
```
2. Navigate into folder and install with `yarn install`
3. Initiate server with `yarn run dev`

While the server is running most changes made to the code should trigger a hot-reload for the served web page. If it isn't, simply shut down the server with `ctrl+c` and rerun it with `yarn run dev`.
