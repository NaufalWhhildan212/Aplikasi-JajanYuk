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
import { categories, favoriteFoods } from '../../data'; // import dari data.jsx

export default function Home() {
  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Jajan Yukk !!</Text>
        </View>

        {/* Banner */}
        <Image
          source={require('../../assets/image/Banner.jpg')}
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
          {categories.map((item) => (
            <View key={item.id} style={styles.categoryItem}>
              <Image source={item.icon} style={styles.icon} />
              <Text style={styles.categoryText}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* Favorit */}
        <Text style={styles.subTitle}>Favorit</Text>

        {/* Render 2 per baris */}
        <View style={styles.favoritesContainer}>
          {favoriteFoods.map((item, index) => (
            <View key={item.id} style={styles.favoriteItem}>
              <Image source={item.image} style={styles.favoriteImage} />
              <Text style={styles.favoriteText}>{item.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Menu */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity>
          <Image
            source={require('../../assets/icon/notif.jpg')}
            style={styles.bottomIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../../assets/icon/Home.png')}
            style={styles.bottomIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../../assets/icon/User.png')}
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
  favoritesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 80,
  },
  favoriteItem: {
    width: '48%',
    marginBottom: 16,
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
