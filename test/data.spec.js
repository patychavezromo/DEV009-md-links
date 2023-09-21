const data = require('../data');

//ruta para prueba de los test
const route = '/Users/patri/Desktop/proyectos_laboratoria/proyecto4/mdlinks/DEV009-md-links/filesMdLinks/mdFile.md';
const route2 = '/Users/patri/Desktop/proyectos_laboratoria/proyecto4/mdlinks/DEV009-md-links/filesMdLinks/test.md'

describe('Suite de Pruebas para las funciones puras de MdLinks', () => {

    it('debería validar si la ruta es absoluta', () => {        
        expect(data.theRouteIsAbsolute(route)).toBe(true);
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
    
});

  
  
  