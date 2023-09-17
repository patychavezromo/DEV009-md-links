//importar modulo path de node
const path = require('node:path'); 
//importar 
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
    return fs.existsSync(route);
}



module.exports = {theRouteIsAbsolute,
    getRouteAbsolute,
    existsTheRoute
};
