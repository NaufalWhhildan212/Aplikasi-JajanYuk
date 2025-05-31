import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
import backIcon from '../../assets/icon/arrows.png';

export default function EditReview({ route, navigation }) {
  const { review } = route.params;
  const [nama, setNama] = useState('');
  const [ulasan, setUlasan] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setNama(review.Nama || '');
    setUlasan(review.Ulasan || '');
    setImage(review.Image ? { uri: review.Image } : null);
  }, [review]);

  const handleChooseImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel || response.errorCode) return;
      if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0]);
      }
    });
  };

  const handleSubmit = async () => {
    if (!nama.trim() || !ulasan.trim()) {
      Alert.alert('Peringatan', 'Nama dan ulasan harus diisi.');
      return;
    }

    setLoading(true);
    let imageUrl = image?.uri || null;

    // Jika gambar dipilih baru (local file), upload dulu ke server
    if (image && image.fileName) {
      try {
        const formData = new FormData();
        formData.append('file', {
          uri: image.uri,
          name: image.fileName,
          type: image.type || 'image/jpeg',
        });

        const res = await axios.post(
          'https://backend-file-praktikum.vercel.app/upload/',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );

        if (res.data?.url) {
          imageUrl = res.data.url;
        } else {
          throw new Error('Gagal mendapatkan URL gambar');
        }
      } catch (error) {
        setLoading(false);
        Alert.alert('Upload Gagal', error.message);
        return;
      }
    }

    try {
      await firestore().collection('reviews').doc(review.id).update({
        Nama: nama,
        Ulasan: ulasan,
        Image: imageUrl,
      });
      Alert.alert('Sukses', 'Ulasan berhasil diperbarui.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Gagal menyimpan perubahan.');
      console.error('Gagal update:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Ulasan</Text>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={backIcon} style={styles.backIcon} />
      </TouchableOpacity>

      <TextInput
        placeholder="Nama Anda"
        placeholderTextColor="#999"
        value={nama}
        onChangeText={setNama}
        style={styles.input}
      />
      <TextInput
        placeholder="Komentar Anda"
        placeholderTextColor="#999"
        value={ulasan}
        onChangeText={setUlasan}
        style={[styles.input, styles.textArea]}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.photoButton} onPress={handleChooseImage}>
        <Text style={styles.photoButtonText}>{image ? 'Ganti Gambar' : 'Pilih Gambar'}</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator color="#FF6600" />}

      {image && <Image source={{ uri: image.uri }} style={styles.previewImage} />}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.submitText}>Simpan Perubahan</Text>
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
