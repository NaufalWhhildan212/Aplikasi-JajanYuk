import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import avatarImage from '../../assets/icon/Avatar.png'; // Pastikan path-nya benar

export default function Profile({ navigation }) {

  const handleLogout = () => {
    Alert.alert(
      'Konfirmasi',
      'Apakah Anda yakin ingin logout?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Logout',
          onPress: () => {
            // Logika logout, bisa diarahkan ke halaman login atau Home
            navigation.navigate('Home');
          },
        },
      ],
      { cancelable: true }
    );
  };

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
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Text style={styles.menuText}>Edit profile information</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('History')}
        >
          <Text style={styles.menuText}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Ulasan')}
        >
          <Text style={styles.menuText}>Ulasan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleLogout}
        >
          <Text style={styles.menuText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA500',
    padding: 16,
  },
  backButton: {
    marginTop: 20,
    marginBottom: 20,
  },
  backText: {
    fontSize: 50,
    color: '#fff',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 40,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#FFA500',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#FFA500',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFA500',
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  menu: {
    marginTop: 20,
  },
  menuItem: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFA500',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
});
