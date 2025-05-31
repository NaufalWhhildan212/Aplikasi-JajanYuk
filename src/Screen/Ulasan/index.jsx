import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
  Image, Alert
} from 'react-native';
import plusIcon from '../../assets/icon/plus.png';
import backIcon from '../../assets/icon/arrows.png';
import menuIcon from '../../assets/icon/More.png';
import firestore from '@react-native-firebase/firestore';

export default function Ulasan({ navigation }) {
  const [reviews, setReviews] = useState([]);
  const [selectedMenuId, setSelectedMenuId] = useState(null);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('reviews')
      .orderBy('timestamp', 'desc') // PASTIKAN pakai 'timestamp' yang sama
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReviews(data);
      }, error => {
        console.error('Gagal memuat ulasan:', error);
      });

    return () => unsubscribe();
  }, []);

  const handleEdit = (item) => {
    navigation.navigate('EditUlasan', { review: item });
  };

  const handleDelete = (id) => {
    Alert.alert('Konfirmasi', 'Yakin ingin menghapus ulasan ini?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Hapus',
        onPress: async () => {
          try {
            await firestore().collection('reviews').doc(id).delete();
            setSelectedMenuId(null);
          } catch (error) {
            Alert.alert('Gagal', 'Terjadi kesalahan saat menghapus ulasan.');
            console.error('Gagal hapus:', error);
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }) => {
    const isMenuOpen = selectedMenuId === item.id;

    return (
      <TouchableOpacity
        style={styles.reviewCard}
        onPress={() => navigation.navigate('UlasanDetail', { review: item })}
      >
        <View style={styles.headerRow}>
          <Text style={styles.reviewer}>{item?.Nama ?? 'Tanpa Nama'}</Text>
          <TouchableOpacity onPress={() => setSelectedMenuId(isMenuOpen ? null : item.id)}>
            <Image source={menuIcon} style={styles.menuIcon} />
          </TouchableOpacity>
        </View>

        <Text style={styles.comment} numberOfLines={2}>
          {item?.Ulasan ?? 'Tidak ada komentar'}
        </Text>

        {item?.Image && (
          <Image
            source={{ uri: item.Image }}
            style={styles.image}
            resizeMode="cover"
          />
        )}

        {isMenuOpen && (
          <View style={styles.menuDropdown}>
            <TouchableOpacity onPress={() => handleEdit(item)}>
              <Text style={styles.menuText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={styles.menuText}>Hapus</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ulasan Pengguna</Text>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={backIcon} style={styles.backIcon} />
      </TouchableOpacity>

      {reviews.length === 0 ? (
        <Text style={styles.emptyText}>Belum ada ulasan.</Text>
      ) : (
        <FlatList
          data={reviews}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('TambahUlasan')}
      >
        <Image source={plusIcon} style={styles.fabIcon} />
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
  reviewCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewer: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFA500',
  },
  comment: {
    marginTop: 4,
    fontSize: 14,
    color: '#333',
  },
  image: {
    marginTop: 10,
    width: '100%',
    height: 180,
    borderRadius: 8,
  },
  menuIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFA500',
  },
  menuDropdown: {
    marginTop: 10,
    backgroundColor: '#FFEBCC',
    borderRadius: 6,
    padding: 10,
  },
  menuText: {
    fontSize: 14,
    color: '#333',
    paddingVertical: 4,
  },
  emptyText: {
    marginTop: 50,
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    backgroundColor: '#FF6600',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabIcon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
});
