//importar modulo path de node
const path = require('node:path'); 
//importar FS
const { existsSync } = require('node:fs');
const { readFile } = require('node:fs/promises');

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
const getDataFromFile = (route) => {
    const fileName = path.basename(route);
    return readFile(route, 'utf8').then(data => {
        const markdownLinks = data.match(regexMarkdownLinks);
        return markdownLinks.map(markdownLink => getAllData(markdownLink, fileName));
    }); 
}

//función que devuelve array con objetos {href, text, file}
const getAllData = (markdownLink, fileName) => {
    const linkWithoutFirstAndLast = markdownLink.substring(1, markdownLink.length - 1);
    const textAndLink = linkWithoutFirstAndLast.split('](');
    const text = textAndLink[0];
    const href = textAndLink[1];
    return { href, text, fileName }
}


module.exports = {theRouteIsAbsolute,
    getRouteAbsolute,
    existsTheRoute,
    isMarkdownTheFileExtension,
    getDataFromFile,
    getAllData,
    toAbsolute
};
