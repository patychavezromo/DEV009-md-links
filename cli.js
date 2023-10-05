#!/usr/bin/env node
const {mdLinks} = require("./index.js");


const path = process.argv[2];
const validate = process.argv.includes('--validate');

mdLinks(path, validate).then((data)=>{
    console.log(data);
});




