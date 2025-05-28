import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import backIcon from '../../assets/icon/arrows.png';
import { postReview } from '../../Service/Api';

export default function TambahUlasan({ navigation }) {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const handleSubmit = async () => {
    if (name.trim() === '' || comment.trim() === '') {
      Alert.alert('Peringatan', 'Nama dan komentar harus diisi.');
      return;
    }

    const reviewData = {
      Nama: name,
      Ulasan: comment,
      Image: photoUrl.trim() !== '' ? photoUrl.trim() : null,
    };

    try {
      await postReview(reviewData);
      Alert.alert('Sukses', 'Ulasan berhasil dikirim.');
      navigation.navigate('Ulasan');
    } catch (error) {
      Alert.alert('Gagal', 'Terjadi kesalahan saat mengirim ulasan.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambah Ulasan</Text>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={backIcon} style={styles.backIcon} />
      </TouchableOpacity>
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
      <TextInput
        placeholder="Masukkan URL Gambar (opsional)"
        placeholderTextColor="#999"
        value={photoUrl}
        onChangeText={setPhotoUrl}
        style={styles.input}
      />
      {photoUrl.trim() !== '' && (
        <Image source={{ uri: photoUrl }} style={styles.previewImage} />
      )}
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
