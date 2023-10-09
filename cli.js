#!/usr/bin/env node
const {mdLinks} = require("./index.js");


const path = process.argv[2];
const validate = process.argv.includes('--validate');
const stats = process.argv.includes('--stats');


mdLinks(path, validate).then((data)=>{
    if(!stats){
        data.forEach((objeto) =>{
            const text = objeto.text.substr(0,50);
            console.log('\n'+
            'link encontrado: '+objeto.href + '\n'+ 
            'texto del link: '+ text + '\n'+ 
            'ruta del archivo: '+ objeto.fileName);
            const includeStatus = objeto.status;
            if( includeStatus ){
                console.log('status: '+objeto.status+'\n'+
                'status OK: '+ objeto.statusOk);
            }
        }); 
    } else if(!validate){
        console.log('\nTotal links: '+data.length);
        const nonRepeatingObjects= new Set();
        data.forEach((objeto) =>{
            nonRepeatingObjects.add(objeto.href);
        });
        const totalNonRepeatingObjects= nonRepeatingObjects.size;
        console.log('Links únicos: '+totalNonRepeatingObjects);
    } else if(validate && stats){
        console.log('\nTotal links: '+data.length);
        const nonRepeatingObjects= new Set();
        data.forEach((objeto) =>{
            nonRepeatingObjects.add(objeto.href);
        });
        const totalNonRepeatingObjects= nonRepeatingObjects.size;
        console.log('links únicos: '+totalNonRepeatingObjects);
        let linksBroken=0;
        data.forEach(objeto=>{
            const includeStatus = objeto.status;
            if(includeStatus && objeto.statusOk === 'fail'){
                linksBroken ++;
            }
        });
        console.log('Links rotos: '+linksBroken);
    }
});





