import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

// Import ikon gambar lokal
import plusIcon from '../../assets/icon/plus.png';
import backIcon from '../../assets/icon/arrows.png';

export default function Ulasan({ navigation, route }) {
  const [reviews, setReviews] = useState([]); // Data ulasan kosong

  // Mengambil data ulasan baru yang dikirim dari halaman sebelumnya
  useEffect(() => {
    if (route.params?.newReview) {
      setReviews((prevReviews) => [...prevReviews, route.params.newReview]); // Menambahkan ulasan baru
    }
  }, [route.params?.newReview]);

  const renderItem = ({ item }) => (
    <View style={styles.reviewCard}>
      <Text style={styles.reviewer}>{item.name}</Text>
      <Text style={styles.comment}>{item.comment}</Text>
      {item.photo && <Image source={{ uri: item.photo }} style={styles.image} />} {/* Menampilkan gambar jika ada */}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Judul */}
      <Text style={styles.title}>Ulasan Pengguna</Text>

      {/* Tombol Kembali di Bawah Judul */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={backIcon} style={styles.backIcon} />
      </TouchableOpacity>

      {/* Daftar Ulasan */}
      {reviews.length === 0 ? (
        <Text style={styles.emptyText}>Belum ada ulasan.</Text>
      ) : (
        <FlatList
          data={reviews}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      {/* Tombol Tambah Ulasan */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('TambahUlasan')}
      >
        <Image source={plusIcon} style={styles.fabIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA500',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 25,
    marginBottom: 10,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    width: 40,
    height: 40,
  },
  backIcon: {
    width: 40,
    height: 40,
    tintColor: '#fff',
  },
  reviewCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  reviewer: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFA500',
  },
  comment: {
    marginTop: 4,
    fontSize: 14,
    color: '#333',
  },
  image: {
    marginTop: 10,
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#FF6600',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  fabIcon: {
    width: 28,
    height: 28,
    tintColor: '#fff',
  },
});
