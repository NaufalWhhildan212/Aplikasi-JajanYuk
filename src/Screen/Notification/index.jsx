import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

// Ganti dengan path yang sesuai lokasi file panahmu
import backArrow from '../../assets/icon/arrows.png'; // pastikan nama file sesuai

export default function Notification({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header dengan panah kembali */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
          <Image source={backArrow} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Notification</Text>
      </View>

      {/* Konten notifikasi kosong atau bisa diisi nanti */}
      <View style={styles.content}>
        <Text style={styles.placeholderText}>Belum ada notifikasi</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA500',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  backIcon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#fff',
  },
});
