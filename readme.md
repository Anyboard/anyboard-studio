# Installation
It is recommended to use Yarn to install and run the project because of it's deterministic approach to packaging. It builds a yarn.lock file which force versions of node modules. This avoids possible errors based on installation. Two separate installations should then be completely identical. NPM on the other hand allows you to install with different versions of the modules in package.json, which can introduce minor changes and bugs, and subsequently breaking errors. 

Read more about Yarn here: https://yarnpkg.com/en/

## Steps
1. Clone the repository
```shell
cd my/prefered/project/folder
git clone git@github.com:bronlund/anyboard-studio.git
# Creates my/prefered/project/folder/anyboard-studio
```
2. Cd into folder and install using Yarn `yarn install`
3. Initiate server using Yarn `yarn run dev`

## Server requirements
The current build of Anyboard Studio has succesfully been run on the following environments.