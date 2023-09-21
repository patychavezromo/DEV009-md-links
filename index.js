const data = require("./data");

const mdLinks = (route) =>{
    return new Promise((resolve, reject) => {
        const absoluteRoute = data.toAbsolute(route);
        const routeExists = data.existsTheRoute(absoluteRoute);
        if(!routeExists){
            reject (new Error('la ruta no existe'));
            return;
        }
        const isMarkdownTheFileExtension = data.isMarkdownTheFileExtension(route);
        if(!isMarkdownTheFileExtension){
            reject (new Error('la extensión del archivo no es de tipo MarkDown'));
            return;
        }
        data.getDataFromFile(route)
            .then(data => resolve(data))
            .catch(error => reject(error));             
    });
}

mdLinks('/Users/patri/Desktop/proyectos_laboratoria/proyecto4/mdlinks/DEV009-md-links/filesMdLinks/mdFile.md')
    .then(result => {
        console.log(result);
    }).catch ((error) => {
        console.log(error.message);
    });





// module.exports = () => {
//    mdLinks
// };