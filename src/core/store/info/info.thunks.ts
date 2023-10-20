import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const fetchInfo = createAsyncThunk('info/fetchInfo', async () => {
  const token = localStorage.getItem('token');
  if (!token) return;
  try {
    const response = await axios.get('/api/v1.5/app/mainscreen', {
      headers: {
        'Content-Type': 'application/json',
        'X-User-Agent': 'ucell/android/1.4.3',
        'X-Authorization': token,
        'Accept-Language': 'ru'
      },

      responseType: 'json',
      data: JSON.stringify({})
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchFIO = createAsyncThunk('auth/fetchFIO', async () => {
  const token = localStorage.getItem('token');
  if (!token) return;
  try {
    const { data } = await axios.get('/api/v1.5/user/settings', {
      headers: {
        'Content-Type': 'application/json',
        'X-User-Agent': 'ucell/android/1.4.3',
        'X-Authorization': token
      },
      responseType: 'json',
      data: JSON.stringify({})
    });

    return data;
  } catch (error) {
    console.log(error);
  }
});
