import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const fetchRate = createAsyncThunk('rate/fetchRate', async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get('/api/v1.5/rate_plans', {
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

export const fetchMyRate = createAsyncThunk('rate/fetchMyRate', async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get('/api/v1.5/rate_plans/current', {
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

export const changeRate = createAsyncThunk(
  'rate/changeRate',
  async (id: string) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        '/api/v1.5/rate_plans/change',
        {
          // rate_plan_id: id
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-User-Agent': 'ucell/android/1.4.3',
            'X-Authorization': token,
            'Accept-Language': 'ru'
          },

          responseType: 'json'
          // data: JSON.stringify({})
        }
      );
      console.log(response.data);

      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error };
    }
  }
);

export const fetchDetailRate = createAsyncThunk(
  'rate/fetchDetailRate',
  async ({ rateId }: { rateId: string | null }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        '/api/v1.5/rate_plans/change/initialize',
        { rate_plan_id: rateId },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-User-Agent': 'ucell/android/1.4.3',
            'X-Authorization': token,
            'Accept-Language': 'ru'
          }
        }
      );
      console.log('response', response.data);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// export const fetchSpecificRate = createAsyncThunk(
//   'rate/fetchSpecificRate',
//   async ({ rateId }: { rateId: string | null }) => {
//     console.log('rateId', rateId);

//     const token = localStorage.getItem('token');
//     try {
//       const response = await axios.get(
//         `/api/v1.5/rate_plans/${rateId}`,

//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'X-User-Agent': 'ucell/android/1.4.3',
//             'X-Authorization': token,
//             'Accept-Language': 'ru'
//           },
//           responseType: 'json',
//           data: JSON.stringify({})
//         }
//       );

//       return response.data.rate_plan;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );
