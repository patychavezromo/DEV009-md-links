//importar modulo path de node
const path = require('node:path'); 
//importar FS
const { existsSync } = require('node:fs');
const { readFile } = require('node:fs/promises');
//importar Axios
const axios = require('axios');
const fs = require('node:fs');



//función verifica si la ruta es absoluta (devuelve true o false si la ruta es absoluta)
const theRouteIsAbsolute = (route) => {
    return path.isAbsolute(route);
}

//función para transformar una ruta relativa a una absoluta (devuelve un string con la ruta absoluta)
const getRouteAbsolute = (route) => {
    return path.resolve(__dirname, route);
}


//función que revisa si la ruta existe
const existsTheRoute = (route) => {
    return existsSync(route);
}

const toAbsolute = (route) => {
    const isAbsolute = theRouteIsAbsolute(route);
    return isAbsolute 
        ? route
        : getRouteAbsolute(route);
}

//función que revisa si la extension del archivo es de tipo markdown
const isMarkdownTheFileExtension = (route) => {
    const validExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
    const fileExtension = path.extname(route);
    return validExtensions.includes(fileExtension);
}

const regexMarkdownLinks = /\[([^\[]+)\](\(.*\))/gm;
//función que obtiene un array con todos los links encontrados
const getDataFromFile = (route, validate) => {
    const fileName = path.basename(route);
    return readFile(route, 'utf8').then(data => {
        const markdownLinks = data.match(regexMarkdownLinks);
        if(!markdownLinks){
            return [];
        }
        const promises = markdownLinks.map(markdownLink => getAllData(markdownLink, fileName, validate));
        return Promise.all(promises)
    }).catch((error) => {
        console.log(error.message);
    });
}

//función que devuelve objetos {href, text, file} o {href, text, file, status, statusOk}
const getAllData = (markdownLink, fileName, validate) => {
    const linkWithoutFirstAndLast = markdownLink.substring(1, markdownLink.length - 1);
    const textAndLink = linkWithoutFirstAndLast.split('](');
    const text = textAndLink[0];
    const href = textAndLink[1];
    if(validate){
        return getResponseToAxios(href).then(status => {
            const statusOk = status < 400 
                ? 'ok'
                : 'fail'; 
            return { href, text, fileName, status, statusOk }
        });
    }else if(!validate){
        return Promise.resolve({ href, text, fileName });
    }    
}

//función que devuelve una promesa para obtener el status despues de hacer la solicitud http get al servidor
const getResponseToAxios = (link) => {
    return axios.get(link).then(response => {
        return response.status;
    }).catch((error) => {
        return error.response.status;
    });
}

//función que revisa si el path es directorio
const isDir = (route) => {
    try{
        const stats = fs.statSync(route);
        return stats.isDirectory();
    } catch (error) {
        return false;
    }
};

//función para transformar a ruta absoluta solo teniendo el nombre del archivo
const getAbsolutePathWithBaseDirectory= (baseDirectory,route) => {
    return path.resolve(baseDirectory, route);
}


//función que obtiene todos los archivos de un directorio
const allNamesFiles = (route) => {
    return fs.readdirSync(route); 
}

//funcion que recibe un array de nombre de los archivos y regresa un array con sus rutas absolutas (se pasa la ruta base del archivo donde se encontro el archivo para formar la ruta absoluta)
const allRoutesOfFiles = (allNamesFiles, baseDirectory) =>{
    return allNamesFiles.map((nameFile) =>{
        return getAbsolutePathWithBaseDirectory(baseDirectory, nameFile);
    });
};

// getResponseToAxios('https://es.wikipedia.org/wiki/Markdown/fytdfytdfytdfy');
// const directory = isDir('./filesMdLinks');
// if(directory){
//     console.log('la ruta es de un directorio');
// } else {
//     console.log('no es directorio');
// }

// const files = allNamesFiles('./filesMdLinks');
// console.log(files);

// const allpathabsolute = allRoutesOfFiles(files, './filesMdLinks');

// console.log(allpathabsolute);




module.exports = {theRouteIsAbsolute,
    getRouteAbsolute,
    existsTheRoute,
    isMarkdownTheFileExtension,
    getDataFromFile,
    getAllData,
    toAbsolute,
    isDir,
    getAbsolutePathWithBaseDirectory,
    allRoutesOfFiles,
    allNamesFiles
};
