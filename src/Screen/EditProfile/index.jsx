import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

// Ganti dengan path gambar avatar Anda
import avatarImage from '../../assets/icon/Avatar.png';  // Ganti dengan path gambar avatar Anda

export default function EditProfile({ navigation }) {
  const [name, setName] = useState('Naufal');
  const [email, setEmail] = useState('naufalwhildan@gmail.com');

  const handleSave = () => {
    // Logic untuk menyimpan perubahan profil
    console.log('Profile Saved:', { name, email });
    navigation.goBack(); // Kembali ke halaman profil setelah menyimpan
  };

  return (
    <View style={styles.container}>
      {/* Tombol Kembali */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      {/* Form Edit Profile */}
      <View style={styles.profileSection}>
        {/* Avatar */}
        <Image source={avatarImage} style={styles.avatar} />
        <TouchableOpacity style={styles.changeAvatarButton}>
          <Text style={styles.changeAvatarText}>Change Avatar</Text>
        </TouchableOpacity>

        {/* Form Fields */}
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        />
        
        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA500',  // Latar belakang oranye untuk halaman
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
    backgroundColor: '#fff', // Background putih untuk bagian form
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
  changeAvatarButton: {
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  changeAvatarText: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#FFA500',
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
  },
  saveText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
