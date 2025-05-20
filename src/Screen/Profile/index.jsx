import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

// Ganti dengan path gambar avatar Anda
import avatarImage from '../../assets/icon/Avatar.png';  // Ganti dengan path gambar avatar Anda

export default function Profile({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Tombol Kembali */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={avatarImage} style={styles.avatar} />
        <Text style={styles.name}>Naufal</Text>
        <Text style={styles.email}>Naufalwhildan@gmail.com | +6299337283939</Text>
      </View>

      {/* Menu */}
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Edit profile information</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA500',  // Latar belakang oranye untuk seluruh halaman
    padding: 16,
  },
  backButton: {
    marginTop: 20,
    marginBottom: 20,
  },
  backText: {
    fontSize: 50,
    color: '#fff',  // Warna putih untuk tombol kembali
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 40,
    backgroundColor: '#fff', // Background putih untuk bagian profile
    padding: 20,
    borderRadius: 12,
    shadowColor: '#FFA500',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5, // Menambahkan bayangan untuk kesan modern
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#FFA500', // Border oranye pada avatar
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFA500',  // Warna oranye pada nama
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  menu: {
    marginTop: 20,
  },
  menuItem: {
    padding: 15,
    backgroundColor: '#fff',  // Latar belakang putih untuk item menu
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFA500',  // Border oranye pada item menu
  },
  menuText: {
    fontSize: 16,
    color: '#333', // Warna teks menu yang kontras dengan background putih
  },
});
