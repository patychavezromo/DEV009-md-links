const data = require("./data");

const mdLinks = (path, validate) =>{
    return new Promise((resolve, reject) => {
        const absoluteRoute = data.toAbsolute(path);
        const routeExists = data.existsTheRoute(absoluteRoute);
        if(!routeExists){
            reject (new Error('la ruta no existe'));
            return;
        }
        const isMarkdownTheFileExtension = data.isMarkdownTheFileExtension(path);
        if(!isMarkdownTheFileExtension){
            reject (new Error('la extensión del archivo no es de tipo MarkDown'));
            return;
        }
        return data.getDataFromFile(path, validate)
            .then(data => resolve(data))
            .catch(error => reject(error));             
    });
}

// mdLinks('/Users/patri/Desktop/proyectos_laboratoria/proyecto4/mdlinks/DEV009-md-links/filesMdLinks/mdFile.md')

mdLinks('./filesMdLinks/1link.md',true)
    .then(result => {
        console.log(result);
    }).catch ((error) => {
        console.log(error.message);
    });


module.exports = {
   mdLinks
};