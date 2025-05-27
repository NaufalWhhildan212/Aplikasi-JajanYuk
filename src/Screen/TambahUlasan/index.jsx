import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

import backIcon from '../../assets/icon/arrows.png'; // Ikon kembali manual

export default function TambahUlasan({ navigation }) {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleChoosePhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Gagal memilih gambar.');
        return;
      }

      if (response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0]);
      }
    });
  };

  const handleSubmit = () => {
    if (name.trim() === '' || comment.trim() === '') {
      Alert.alert('Peringatan', 'Nama dan komentar harus diisi.');
      return;
    }

    const reviewData = {
      name,
      comment,
      photo: photo ? photo.uri : null, // Jika ada foto, kirimkan foto tersebut
    };

    // Kirim data ulasan ke halaman Ulasan
    navigation.navigate('Ulasan', { newReview: reviewData });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambah Ulasan</Text>

      {/* Tombol Kembali */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={backIcon} style={styles.backIcon} />
      </TouchableOpacity>

      {/* Form */}
      <TextInput
        placeholder="Nama Anda"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Komentar Anda"
        placeholderTextColor="#999"
        value={comment}
        onChangeText={setComment}
        style={[styles.input, styles.textArea]}
        multiline
        numberOfLines={4}
      />

      {/* Tombol Pilih Gambar */}
      <TouchableOpacity style={styles.photoButton} onPress={handleChoosePhoto}>
        <Text style={styles.photoButtonText}>Pilih Gambar</Text>
      </TouchableOpacity>

      {/* Preview Gambar */}
      {photo && (
        <Image source={{ uri: photo.uri }} style={styles.previewImage} />
      )}

      {/* Tombol Kirim */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Kirim Ulasan</Text>
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
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  photoButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  photoButtonText: {
    color: '#FFA500',
    fontWeight: 'bold',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#FF6600',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
