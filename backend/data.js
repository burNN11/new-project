import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Daniel',
      email: 'ciufu7@gmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Radu',
      email: 'radu@gmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      //_id: '1',
      name: '4Formaggi',
      price: 30,
      image: 'pics/4formagi.jpg',
    },
    {
      //_id: '2',
      name: '4Stagioni',
      price: 30,
      image: 'pics/4stagioni.jpg',
    },
    {
      //_id: '3',
      name: 'Boscaiola',
      price: 35,
      image: 'pics/boscaiola.jpg',
    },
    {
      //_id: '4',
      name: 'Capricciosa',
      price: 40,
      image: 'pics/capricciosa.jpg',
    },
    {
      //_id: '5',
      name: 'Frutti di mare',
      price: 40,
      image: 'pics/fruttidimare.jpg',
    },
    {
      //_id: '6',
      name: 'Margherita',
      price: 25,
      image: 'pics/margherita.jpg',
    },
    {
      //_id: '7',
      name: 'Ortolana',
      price: 25,
      image: 'pics/ortolana.jpg',
    },
    {
      //_id: '8',
      name: 'Prosciutto Funghi',
      price: 28,
      image: 'pics/prosciutto_funghi.jpg',
    },
    {
      //_id: '9',
      name: 'Marinara',
      price: 18,
      image: 'pics/marinara.jpg',
    },
  ],
};

export default data;
