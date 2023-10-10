const data = require("./data");

const mdLinks = (path, validate) => {
    if(data.isDir(path)) {
        return mdLinksWithDirectory(path, validate);
    } else {
        return mdLinksWithSingleFile(path, validate);
    }
}

const mdLinksWithDirectory = (dirPath, validate) => {
    const filesNames = data.allNamesFiles(dirPath);
    const allFilePaths = data.allRoutesOfFiles(filesNames, dirPath);
    const allFilePromises = allFilePaths.map(filePath => mdLinksWithSingleFile(filePath, validate));
    return Promise.allSettled(allFilePromises).then(results => {
        return results.filter(result => result.status === 'fulfilled').map(result => result.value).flat();
    })
}

const mdLinksWithSingleFile = (path, validate) =>{
    return new Promise((resolve, reject) => {
        const absoluteRoute = data.toAbsolute(path);
        const routeExists = data.existsTheRoute(absoluteRoute);
        if(!routeExists){
            reject(new Error('la ruta no existe'));
            return;
        }
        const isMarkdownTheFileExtension = data.isMarkdownTheFileExtension(path);
        if(!isMarkdownTheFileExtension){
            reject(new Error('la extensión del archivo no es de tipo MarkDown'));
            return;
        }
        return data.getDataFromFile(path, validate)
            .then(data => resolve(data))
            .catch(error => reject(error));             
    });
}

// mdLinks('/Users/patri/Desktop/proyectos_laboratoria/proyecto4/mdlinks/DEV009-md-links/filesMdLinks/mdFile.md')
//'./filesMdLinks',true
// mdLinks('./filesMdLinks',true)
//     .then(result => {
//         console.log(result);
//     }).catch ((error) => {
//         console.log(error.message);
//     });


module.exports = {
   mdLinks
};