import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Image, Alert, ActivityIndicator, ScrollView
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import notifee, { AndroidImportance } from '@notifee/react-native';
import firestore from '@react-native-firebase/firestore';

export default function EditUlasan({ route, navigation }) {
  const { review } = route.params;

  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [delay, setDelay] = useState(5); // detik

  useEffect(() => {
    if (review) {
      setName(review.Nama || '');
      setComment(review.Ulasan || '');
      setImageUrl(review.Image || '');
    }
  }, [review]);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      maxHeight: 800,
      maxWidth: 800,
    });

    if (result.didCancel || !result.assets) return;

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
  };

  const handleSubmit = async () => {
    if (!name.trim() || !comment.trim()) {
      Alert.alert('Peringatan', 'Nama dan komentar harus diisi.');
      return;
    }

    navigation.navigate('Ulasan'); // Navigasi dulu

    setTimeout(async () => {
      try {
        await firestore().collection('reviews').doc(review.id).update({
          Nama: name,
          Ulasan: comment,
          Image: imageUrl || null,
          timestamp: firestore.FieldValue.serverTimestamp(),
        });

        await notifee.displayNotification({
          title: 'Ulasan berhasil diperbarui!',
          body: 'Terima kasih atas perubahannya.',
          android: {
            channelId: 'default',
            importance: AndroidImportance.HIGH,
          },
        });

      } catch (error) {
        console.error('Gagal update ulasan:', error);
      }
    }, delay * 1000);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.title}>Edit Ulasan</Text>

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
      />

      <TouchableOpacity style={styles.uploadButton} onPress={handleImagePick} disabled={loading}>
        <Text style={styles.uploadText}>{imageUrl ? 'Ganti Gambar' : 'Unggah Gambar'}</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#FF6600" />}
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.previewImage} />}

      <Text style={styles.delayLabel}>Delay Notifikasi & Simpan Ulasan:</Text>
      <View style={styles.delayOptions}>
        {[5, 10, 15].map((d) => (
          <TouchableOpacity
            key={d}
            style={[
              styles.delayButton,
              delay === d && styles.delayButtonSelected,
            ]}
            onPress={() => setDelay(d)}
          >
            <Text style={{ color: delay === d ? '#fff' : '#333' }}>{d} detik</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.submitButton, loading && { backgroundColor: '#ccc' }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitText}>Simpan Perubahan</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFA500' },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#fff', 
    marginBottom: 20, 
    textAlign: 'center', 
    marginTop: 10 
  },
  input: { 
    backgroundColor: '#fff', 
    borderRadius: 8, 
    padding: 12,
    marginBottom: 16, 
    fontSize: 16, 
    color: '#333' 
  },
  uploadButton: { 
  backgroundColor: '#fff',
  borderRadius: 8, 
  padding: 12, 
  alignItems: 'center', 
  marginBottom: 16 
},
  uploadText: { 
  fontSize: 16, 
  color: '#333' 
},
  previewImage: { 
  width: '100%', 
  height: 200, 
  borderRadius: 8, 
  marginBottom: 20 
},
  delayLabel: { 
  color: '#fff',
  fontSize: 16, 
  fontWeight: 'bold', 
  marginBottom: 8 
},
  delayOptions: { 
  flexDirection: 'row', 
  justifyContent: 'space-around', 
  marginBottom: 20 
},
  delayButton: { 
  backgroundColor: '#fff', 
  paddingHorizontal: 16, 
  paddingVertical: 10, 
  borderRadius: 8 
},
  delayButtonSelected: { 
  backgroundColor: '#FF6600' 
},
  submitButton: { 
  backgroundColor: '#FF6600',
  paddingVertical: 14, 
  borderRadius: 8, 
  alignItems: 'center' 
},
  submitText: { 
  color: '#fff', 
  fontSize: 16, 
  fontWeight: 'bold' 
},
});
