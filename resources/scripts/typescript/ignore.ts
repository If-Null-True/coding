/*
  ignore.ts

  This file is used to bypass TypeScript compilation errors caused by external script imports.
  Some third-party script files require some accompanying node-js modules. Unfortunately, 
  imports for these modules are compiled into node-js specific syntax. As such, trying to use 
  the complied files in a browser results in a *very* difficult to avoid error. Removing 
  these imports causes a TypeScript error. So as to not have to use @ts-ignore everywhere, 
  this file defines any such modules.
*/

let marked: any;
let hljs: any;