import axios from 'axios';


const BASE_URL = 'https://6835edb6664e72d28e3f57a9.mockapi.io/api';


export const getReviews = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/Review`);
    return response.data;
  } catch (error) {
    console.error('Gagal mengambil data ulasan: ', error);
    throw new Error('Gagal mengambil data ulasan dari server');
  }
};


export const getReviewById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/Review/${id}`);
    return response.data;
  } catch (error) {
    console.error('Gagal mengambil data ulasan berdasarkan ID: ', error);
    throw new Error('Gagal mengambil data ulasan berdasarkan ID');
  }
};

export const postReview = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/Review`, data);
    return response.data;
  } catch (error) {
    console.error('Gagal mengirim data ulasan: ', error);
    throw new Error('Gagal mengirim data ulasan ke server');
  }
};

export const putReview = async (id, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/Review/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Gagal mengupdate data ulasan: ', error);
    throw new Error('Gagal mengupdate data ulasan');
  }
};

export const deleteReview = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/Review/${id}`);
    return response.data;
  } catch (error) {
    console.error('Gagal menghapus data ulasan: ', error);
    throw new Error('Gagal menghapus data ulasan');
  }
};
