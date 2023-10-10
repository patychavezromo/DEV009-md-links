const axios = require ('axios');
const data = require('../data');
const path = require('path');
const fs = require('fs');


//ruta para prueba de los test
const absoluteRoute='/filesMdLinks/mdFile.md';
const relativeRoute='./filesMdLinks/mdFile.md';
const routeWithOutLinks='./filesMdLinks/withOutLinks.md';
const route = './filesMdLinks/mdFile.md';
const route2 = '/Users/patri/Desktop/proyectos_laboratoria/proyecto4/mdlinks/DEV009-md-links/filesMdLinks/test.md'

jest.mock('axios');

describe('Suite de Pruebas para las funciones puras de MdLinks', () => {

    it('debería validar si la ruta es absoluta', () => {        
        expect(data.theRouteIsAbsolute(absoluteRoute)).toBe(true);
    });
    
    it('debería validar que la ruta no es absoluta', () => {        
        expect(data.theRouteIsAbsolute(relativeRoute)).not.toBe(true);
    }); 

    it('debería validar que recibe una ruta relativa y devuelve una ruta absoluta', () => {
        const expectedRoute='C:\\Users\\patri\\Desktop\\proyectos_laboratoria\\proyecto4\\mdlinks\\DEV009-md-links\\filesMdLinks\\mdFile.md';
        const result = data.getRouteAbsolute(relativeRoute);
        expect(result).toEqual(expectedRoute);          
    });   // 
    
    it('debería validar que devuelve un array vacio si no encuentran enlaces dentro del archivo', async () => {        
        const result = await data.getDataFromFile(routeWithOutLinks);
        expect(result).toEqual([]);
    }); 

    it('debería retornar objetos que encuentre con el status "ok" si el validate es true', async() => {        
        axios.get.mockResolvedValue({status:200});
        const result = await data.getAllData('[Arreglos](https://curriculum.laboratoria.la/es/topics/javascript/04-arrays)', 'status.md', true);
        expect(axios.get).toHaveBeenCalledWith('https://curriculum.laboratoria.la/es/topics/javascript/04-arrays');
        expect(result).toEqual({
            href: 'https://curriculum.laboratoria.la/es/topics/javascript/04-arrays',
            text: 'Arreglos',
            fileName: 'status.md',
            status: 200,
            statusOk: 'ok',
          });
    }); 

    it('debería retornar objetos sin el estatus si el validate es false', async() => {
        const result = await data.getAllData('[Arreglos](https://curriculum.laboratoria.la/es/topics/javascript/04-arrays)', 'status.md', false);
        expect(result).toEqual({
            href: 'https://curriculum.laboratoria.la/es/topics/javascript/04-arrays',
            text: 'Arreglos',
            fileName: 'status.md'
          });
    });

    it('debería retornar objetos que encuentre con el status "fail" si el validate es true', async() => {
        axios.get.mockResolvedValue({status:404});
        const result= await data.getAllData('[Arreglos](https://curriculum.laboratoria.la/es/topics/javascript/04-array)', 'status.md', true);
        expect(axios.get).toHaveBeenCalledWith('https://curriculum.laboratoria.la/es/topics/javascript/04-array');
        expect(result).toEqual({
            href: 'https://curriculum.laboratoria.la/es/topics/javascript/04-array',
            text: 'Arreglos',
            fileName: 'status.md',
            status: 404,
            statusOk: 'fail',
        })
    });


    it('debería validar si la ruta existe', () => {
        expect(data.existsTheRoute(route)).toBe(true);
    });

    it('debería validar si la extensión del archivo es de tipo Markdown', () => {
        expect(data.isMarkdownTheFileExtension(route)).toBe(true);
    });

    it('debería comprobar si la expresión regular valida los links con el texto esperado',() => {
        expect('[milestones](https://docs.github.com/es/issues/using-labels-and-milestones-to-track-work/about-milestones)')
        .toMatch(/\[([^\[]+)\](\(.*\))/gm);
    });

    it ('debería validar si la función getDataFromFile devuelve un array con los MdLinks encontrados en el archivo', () => {
        return data.getDataFromFile(route2).then(data =>
            expect(data).toEqual([
                {
                    href: 'https://docs.github.com/es/issues/using-labels-and-milestones-to-track-work/about-milestones',
                    text: 'milestones',
                    fileName: 'test.md'
                },
                { href: 'https://jestjs.io/', text: 'Jest', fileName: 'test.md' },
                {
                    href: './docs/01-milestone.md',
                    text: 'Hito 1',
                    fileName: 'test.md'
                }
            ])
        );
    });

    it ('debería validar si la funcion regresa un objeto con las propiedades href, text y fileName', () => {
        expect(data.getAllData('[Jest](https://jestjs.io/)','test.md'))
        .toEqual({ href: 'https://jestjs.io/', text: 'Jest', fileName: 'test.md' });
    });

    it('Debería validar si el archivo no contiene links', () =>{
        return data.getDataFromFile('./filesMdTest/withOutLinks.md').catch(error => {
            expect(error.message).toBe('El archivo no contiene links');
        })
    });

    it('Debería retornar el estatus de la respuesta exitosa', async() =>{
        const link = './filesMdLinks/status.md';
        const expectedStatus = 200;
        axios.get.mockResolvedValue({ status: expectedStatus });
        const status = await data.getResponseToAxios(link);
        expect(status).toBe(expectedStatus);       
    });

    it('Debería retornar el estatus de la respuesta de error', async() =>{
        const link = './filesMdLinks/status.md';
        const expectedErrorStatus  = 404;
        axios.get.mockRejectedValue({ response: { status: expectedErrorStatus } });
        const status = await data.getResponseToAxios(link);
        expect(status).toBe(expectedErrorStatus);       
    });

    it('Debería retornar una ruta absoluta solo teniendo el nombre del archivo', () =>{
        const baseDirectory = '/Users/patri/Desktop/proyectos_laboratoria/proyecto4/mdlinks/DEV009-md-links/filesMdLinks/'; 
        const fileName = '1link.md';
        const expectedPath = path.resolve(baseDirectory, fileName);
        const result = data.getAbsolutePathWithBaseDirectory(baseDirectory, fileName);
        expect(result).toBe(expectedPath);
    });

    it('Debería devolver rutas absolutas correctamente', () =>{
        const baseDirectory = '/Users/patri/Desktop/proyectos_laboratoria/proyecto4/mdlinks/DEV009-md-links/filesMdLinks/';
        const fileNames = ['1link.md', 'extFileIncorrect.js', 'linkBreak.md', 'mdFile.md','mkdFile.mkd','status.md','withOutLinks.md'];
        const expectedRoutes = [
            "C:\\Users\\patri\\Desktop\\proyectos_laboratoria\\proyecto4\\mdlinks\\DEV009-md-links\\filesMdLinks\\1link.md",
           "C:\\Users\\patri\\Desktop\\proyectos_laboratoria\\proyecto4\\mdlinks\\DEV009-md-links\\filesMdLinks\\extFileIncorrect.js",
           "C:\\Users\\patri\\Desktop\\proyectos_laboratoria\\proyecto4\\mdlinks\\DEV009-md-links\\filesMdLinks\\linkBreak.md",
           "C:\\Users\\patri\\Desktop\\proyectos_laboratoria\\proyecto4\\mdlinks\\DEV009-md-links\\filesMdLinks\\mdFile.md",
           "C:\\Users\\patri\\Desktop\\proyectos_laboratoria\\proyecto4\\mdlinks\\DEV009-md-links\\filesMdLinks\\mkdFile.mkd",
           "C:\\Users\\patri\\Desktop\\proyectos_laboratoria\\proyecto4\\mdlinks\\DEV009-md-links\\filesMdLinks\\status.md",
           "C:\\Users\\patri\\Desktop\\proyectos_laboratoria\\proyecto4\\mdlinks\\DEV009-md-links\\filesMdLinks\\withOutLinks.md",
        ];

        const result = data.allRoutesOfFiles(fileNames, baseDirectory);
        expect(result).toEqual(expectedRoutes);        
    });
    
});



  
  
  