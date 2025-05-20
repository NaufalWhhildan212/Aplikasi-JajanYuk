
const restoranData = [
    {
      id: '1',
      nama: 'Ayam Penyet Jakarta',
      alamat: 'Jl. Gagak Hitam',
      rating: 4.6,
      jarak: 2.4,
      gambar: require('./assets/image/ayampenyet.jpg'),
    },
    {
      id: '2',
      nama: 'Ayam Geprek COC',
      alamat: 'Jl. Setia Budi',
      rating: 4.3,
      jarak: 3.2,
      gambar: require('./assets/image/Ayamgeprek.png'),
    },
    {
      id: '3',
      nama: 'KFC',
      alamat: 'Jl. Setia Budi Home Centra',
      rating: 4.3,
      jarak: 6.1,
      gambar: require('./assets/image/Kfc.jpg'),
    },
    {
      id: '4',
      nama: 'HokBen',
      alamat: 'Plaza Medan Fair',
      rating: 4.8,
      jarak: 3.5,
      gambar: require('./assets/image/Hokben.jpeg'),
    },
  ];
export default restoranData;
export const categories = [
    { id: 'restoran', label: 'Restoran', icon: require('./assets/image/Restoran.png') },
    { id: 'tren', label: 'Tren', icon: require('./assets/image/Tren.png') },
    { id: 'rekomendasi', label: 'Rekomendasi', icon: require('./assets/image/Rekomendasi.png') },
    { id: 'cemilan', label: 'Cemilan', icon: require('./assets/image/Snack.png') },
  ];
  
  export const favoriteFoods = [
    { id: '1', name: 'Dimsum Mentai', image: require('./assets/image/Favorit1.jpeg') },
    { id: '2', name: 'Bakso', image: require('./assets/image/Favorit2.jpeg') },
    { id: '3', name: 'Pecel', image: require('./assets/image/Favorit3.jpg') },
    { id: '4', name: 'Mie Goreng', image: require('./assets/image/Favorit4.jpg') },
  ];
  