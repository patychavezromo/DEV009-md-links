
const data = require("./data");

const mdLinks = (route) =>{
    return new Promise((resolve, reject) => {
        const isAbsolute = data.theRouteIsAbsolute(route);
        console.log(isAbsolute);
        absoluteRoute = isAbsolute 
            ? route
            : data.getRouteAbsolute(route);
        console.log('obtuve ruta absoluta'+absoluteRoute); 
        const existsPath = data.existsTheRoute(absoluteRoute);
        console.log('la ruta existe: '+existsPath);
        
    });
}

mdLinks('/Users/patri/Desktop/proyectos laboratoria/proyecto4/mdlinks/DEV009-md-links')
    .then(result => {
    console.log(result);
}).catch ((error) => {
    console.log(error);
});





// module.exports = () => {
//    mdLinks
// };