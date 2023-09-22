const {mdLinks} = require("../index.js");

const route = '../filesMdTest/MdLinksDocTest.md';
const route2FileWithExtPng = '../filesMdTest/MdLinksDocTest2.png';

describe('mdLinks', () => {

  it('Debería validar que la promesa devuelva un array de objetos con los links encontrados', () => {
    return mdLinks(route).then(data => {
      expect(data).toEqual(
        [
          {
            href: 'https://docs.github.com/es/issues/using-labels-and-milestones-to-track-work/about-milestones',
            text: 'milestones',
            fileName: 'MdLinksDocTest.md'
          },
          { href: 'https://jestjs.io/', text: 'Jest', fileName: 'MdLinksDocTest.md' },
          {
            href: './docs/01-milestone.md',
            text: 'Hito 1',
            fileName: 'MdLinksDocTest.md'
          }
        ]
      )
    }); 
  });

  it('Debería rechazar la promesa si la ruta no existe', () => {
    return expect(mdLinks('./the/route/dont/exists')).rejects.toThrow('la ruta no existe');
  });

  it('Debería rechazar la promesa si la extensión del archivo no es de tipo Markdown', () =>{
    return expect(mdLinks(route2FileWithExtPng)).rejects.toThrow('la extensión del archivo no es de tipo MarkDown')
  });

});
