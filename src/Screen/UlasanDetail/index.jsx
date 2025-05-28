import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import backIcon from '../../assets/icon/arrows.png';

export default function UlasanDetail({ route, navigation }) {
  const { review } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={backIcon} style={styles.backIcon} />
      </TouchableOpacity>

      <Text style={styles.title}>Detail Ulasan</Text>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.label}>👤 Nama Pengulas</Text>
          <Text style={styles.value}>{review?.Nama || 'Tanpa Nama'}</Text>

          <Text style={styles.label}>💬 Komentar</Text>
          <Text style={styles.value}>{review?.Ulasan || 'Tidak ada komentar'}</Text>

          {review?.Image && (
            <>
              <Text style={styles.label}>🖼️ Gambar</Text>
              <Image source={{ uri: review.Image }} style={styles.image} />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA500',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 10,
  },
  backIcon: {
    width: 28,
    height: 28,
    tintColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
    marginVertical: 20,
  },
  scroll: {
    paddingBottom: 50,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FF6600',
    marginTop: 16,
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginTop: 6,
    lineHeight: 22,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginTop: 10,
    backgroundColor: '#eee',
  },
});
