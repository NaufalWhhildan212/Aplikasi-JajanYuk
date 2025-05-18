import React, { useState } from 'react';

import {View,Text,TextInput,Image,StyleSheet,ScrollView,TouchableOpacity,} from 'react-native';

const categoryIcons = {
  restoran: require('./assets/image/Restoran.png'),
  tren: require('./assets/image/Tren.png'),
  Rekomendasi: require('./assets/image/Rekomendasi.png'),
  cemilan: require('./assets/image/Snack.png'),
};

export default function App() {
  const FavoriteItem = ({ imageSource, title }) => (
    <View style={styles.favoriteItem}>
      <Image source={imageSource} style={styles.favoriteImage} />
      <Text style={styles.favoriteText}>{title}</Text>
    </View>
  );
  const [favorites, setFavorites] = useState([
    { id: 1, title: 'Dimsum Mentai', image: require('./assets/image/Favorit1.jpeg') },
    { id: 2, title: 'Bakso', image: require('./assets/image/Favorit2.jpeg') },
    { id: 3, title: 'Pecel', image: require('./assets/image/Favorit3.jpg') },
    { id: 4, title: 'Mie Goreng', image: require('./assets/image/Favorit4.jpg') },
  ]);
  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Jajan Yukk !!</Text>
        </View>

        {/* Banner */}
        <Image
          source={require('./assets/image/Banner.jpg')}
          style={styles.banner}
        />

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Cari makanan"
            placeholderTextColor="#888"
          />
        </View>

        {/* Kategori */}
        <View style={styles.categories}>
          {['restoran', 'tren', 'Rekomendasi', 'cemilan'].map((item) => (
            <View key={item} style={styles.categoryItem}>
              <Image source={categoryIcons[item]} style={styles.icon} />
              <Text style={styles.categoryText}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.subTitle}>Favorit</Text>

{favorites.reduce((rows, item, idx) => {
  if (idx % 2 === 0) rows.push([item]);
  else rows[rows.length - 1].push(item);
  return rows;
}, []).map((row, i) => (
  <View key={i} style={styles.favorites}>
    {row.map((fav) => (
      <FavoriteItem
        key={fav.id}
        imageSource={fav.image}
        title={fav.title}
      />
    ))}
  </View>
))}
      </ScrollView>

      {/* Bottom Menu */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity>
          <Image
            source={require('./assets/icon/notif.jpg')}
            style={styles.bottomIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('./assets/icon/Home.png')}
            style={styles.bottomIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('./assets/icon/User.png')}
            style={styles.bottomIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FFA500',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  banner: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
    fontSize: 16,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  categoryItem: {
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 6,
  },
  categoryText: {
    fontSize: 13,
    color: '#fff',
    textTransform: 'capitalize',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#fff',
  },
  favorites: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  favoriteItem: {
    width: '48%',
    alignItems: 'center',
  },
  favoriteImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
  },
  favoriteText: {
    marginTop: 6,
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10,
  },
  bottomIcon: {
    width: 28,
    height: 28,
  },
});
