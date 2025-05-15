import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

// Map kategori ke ikon gambar
const categoryIcons = {
  restoran: require('./assets/image/Restoran.png'),
  tren: require('./assets/image/Tren.png'),
  Rekomendasi: require('./assets/image/Rekomendasi.png'),
  cemilan: require('./assets/image/Snack.png'),
};

export default function App() {
  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Jajan Yukk !!</Text>
        </View>

        {/* Banner */}
        <Image source={require('./assets/image/Banner.jpg')} style={styles.banner} />

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

        {/* Favorit */}
        <Text style={styles.subTitle}>Favorit</Text>
        <View style={styles.favorites}>
          <Image source={require('./assets/image/Favorit1.jpeg')} style={styles.favoriteImage} />
          <Image source={require('./assets/image/Favorit2.jpeg')} style={styles.favoriteImage} />
        </View>
      </ScrollView>

      {/* Bottom Menu */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity>
          <Image source={require('./assets/icon/notif.jpg')} style={styles.bottomIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('./assets/icon/Home.png')} style={styles.bottomIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FFA500', // Orange background
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginBottom: 80,
  },
  favoriteImage: {
    width: '48%',
    height: 120,
    borderRadius: 12,
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
