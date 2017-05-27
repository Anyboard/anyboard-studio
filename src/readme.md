# Source

Most of the source code is in this folder. The app is built with these files and structured here.

## /assets

Static graphical elements like logo and pictures are stored here.

## /components

Contains all the vue components.

## /docs

Markdown documentation mirroring the outer folder/file structure. Complete readmes are found within their respective
folders.

## /store

Holds the sub-stores for the vuex store.

## /utilities

Helper files to avoid repetition and complexity within components and stores.

## App.vue

The base vue component for the application. It mainly contains the navigation bar and a wrapper for child components.

## global_store.vue

The root vuex store for the application to import. Imports and namespaces each sub-store. How to use vuex and stores is
documented in `ProjectStructure.md`.

## main.js

The initialization script for our Vue-VM. It imports the particular pieces we want and make them globally
available throughout the app. 

## mouter.js

Where we define what to be injected into the router-views. It reads the addressbar and loads up the correct 
components to show. 
