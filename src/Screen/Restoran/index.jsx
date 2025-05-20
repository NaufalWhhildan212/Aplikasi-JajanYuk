import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';

// Mengimpor data restoran dari file data.jsx
import restoranData from '../../data';  // Pastikan path ke file data.jsx benar

// Mengimpor gambar ikon hati dan panah
import heartFilled from '../../assets/image/Heart_isi.png';
import heartEmpty from '../../assets/image/Heart_kosong.png';
import backArrow from '../../assets/icon/arrows.png'; // Ganti dengan path gambar panah Anda

export default function RestoranScreen({ navigation }) {
  const [liked, setLiked] = useState({});

  const toggleLike = (id) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Tombol Kembali */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={backArrow} style={styles.backIcon} />
        <Text style={styles.backText}>Restoran</Text>
      </TouchableOpacity>
      
      <Text style={styles.title}>Restoran Populer</Text>

      {restoranData.map((item) => (
        <View key={item.id} style={styles.card}>
          <Image source={item.gambar} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.nama}>{item.nama}</Text>
            <Text style={styles.alamat}>{item.alamat}</Text>
            <Text style={styles.detail}>
              ⭐ {item.rating} | 📍 {item.jarak} km
            </Text>
          </View>
          <TouchableOpacity
            style={styles.heartButton}
            onPress={() => toggleLike(item.id)}
          >
            <Image
              source={liked[item.id] ? heartFilled : heartEmpty}
              style={styles.heartIcon}
            />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFA500',
    padding: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5, // Memberikan jarak lebih pada tombol kembali
    marginTop: 30, // Menambahkan jarak atas agar lebih turun
  },
  backIcon: {
    width: 50, // Memperbesar ikon panah
    height: 35,
    marginRight: 10, // Menambahkan jarak antar ikon dan teks
  },
  backText: {
    fontSize: 30, // Membuat teks lebih besar
    color: 'white',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 160,
  },
  info: {
    padding: 12,
  },
  nama: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  alamat: {
    fontSize: 14,
    color: '#666',
  },
  detail: {
    fontSize: 13,
    color: '#999',
    marginTop: 6,
  },
  heartButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 6,
  },
  heartIcon: {
    width: 24,
    height: 24,
  },
});
