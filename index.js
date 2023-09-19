const data = require("./data");

const mdLinks = (route) =>{
    return new Promise((resolve, reject) => {
        const isAbsolute = data.theRouteIsAbsolute(route);
        absoluteRoute = isAbsolute 
            ? route
            : data.getRouteAbsolute(route);
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

mdLinks('./filesMdLinks/mkdFile.mkd')
    .then(result => {
        console.log(result);
    }).catch ((error) => {
        console.log(error.message);
    });





// module.exports = () => {
//    mdLinks
// };