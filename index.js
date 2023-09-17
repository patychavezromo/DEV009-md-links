
const data = require("./data");

const mdLinks = (route) =>{
    return new Promise((resolve, reject) => {
        const isAbsolute = data.theRouteIsAbsolute(route);
        let getRouteAbsolute = isAbsolute 
            ? route 
            : data.getRouteAbsolute(route);
            console.log(getRouteAbsolute);               
    });
}

mdLinks('./README.md')
    .then(result => {
    console.log(result);
}).catch ((error) => {
    console.log(error);
});





// module.exports = () => {
//    mdLinks
// };