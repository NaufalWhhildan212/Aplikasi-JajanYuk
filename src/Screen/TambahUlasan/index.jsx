import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image,
  Alert, ActivityIndicator, ScrollView,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';

export default function TambahUlasan({ navigation }) {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      maxHeight: 800,
      maxWidth: 800,
    });

    if (result.didCancel) return;

    if (result.assets && result.assets.length > 0) {
      const image = result.assets[0];
      const formData = new FormData();
      formData.append('file', {
        uri: image.uri,
        name: image.fileName || 'photo.jpg',
        type: image.type || 'image/jpeg',
      });

      try {
        setLoading(true);
        const res = await axios.post(
          'https://backend-file-praktikum.vercel.app/upload/',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        if (res.data && res.data.url) {
          setImageUrl(res.data.url);
        } else {
          Alert.alert('Upload Gagal', 'Gagal mendapatkan URL gambar.');
        }
      } catch (error) {
        Alert.alert('Upload Error', error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async () => {
    if (name.trim() === '' || comment.trim() === '') {
      Alert.alert('Peringatan', 'Nama dan komentar harus diisi.');
      return;
    }

    setLoading(true);
    try {
      await firestore().collection('reviews').add({
        Nama: name,
        Ulasan: comment,
        Image: imageUrl || null,
        timestamp: firestore.FieldValue.serverTimestamp(), // PENTING: pakai 'timestamp'
      });

      Alert.alert('Sukses', 'Ulasan berhasil dikirim.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Gagal', 'Terjadi kesalahan saat mengirim ulasan.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.title}>Tambah Ulasan</Text>

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
        style={[styles.input, { height: 120 }]}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.uploadButton} onPress={handleImagePick} disabled={loading}>
        <Text style={styles.uploadText}>{imageUrl ? 'Ganti Gambar' : 'Unggah Gambar'}</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#FF6600" />}

      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.previewImage} />
      ) : null}

      <TouchableOpacity
        style={[styles.submitButton, loading && { backgroundColor: '#ccc' }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitText}>Kirim Ulasan</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFA500' },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
  },
  uploadButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadText: {
    fontSize: 16,
    color: '#333',
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
