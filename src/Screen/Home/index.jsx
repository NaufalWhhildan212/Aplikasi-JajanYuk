import React, { useRef } from 'react';
import {View,Text,TextInput,Image,StyleSheet,ScrollView,TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { categories, favoriteFoods } from '../../data'; // import dari data.jsx

export default function Home({ navigation }) {
  const headerRef = useRef(null);
  const bannerRef = useRef(null);
  const categoryRef = useRef(null);
  const favoriteRef = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      // Trigger animasi saat halaman difokuskan
      headerRef.current?.fadeInDown(800);
      bannerRef.current?.fadeIn(1000);
      categoryRef.current?.fadeInUp(1000);
      favoriteRef.current?.fadeInUp(1000);
    }, [])
  );

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animatable.View ref={headerRef}>
          <Text style={styles.headerText}>Jajan Yukk !!</Text>
        </Animatable.View>

        {/* Banner */}
        <Animatable.Image
          ref={bannerRef}
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
        <Animatable.View ref={categoryRef} style={styles.categories}>
          {categories.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.categoryItem}
              onPress={() => navigation.navigate('Restoran', { categoryId: item.id })}
            >
              <Image source={item.icon} style={styles.icon} />
              <Text style={styles.categoryText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </Animatable.View>

        {/* Favorit */}
        <Text style={styles.subTitle}>Favorit</Text>

        <Animatable.View ref={favoriteRef} style={styles.favoritesContainer}>
          {favoriteFoods.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.favoriteItem}
              onPress={() => navigation.navigate('BlogDetail', { foodId: item.id })}
            >
              <Image source={item.image} style={styles.favoriteImage} />
              <Text style={styles.favoriteText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </Animatable.View>
      </ScrollView>
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
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
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
});
