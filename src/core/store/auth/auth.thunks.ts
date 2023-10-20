import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AuthTypes } from './auth.types';

export const fetchAuth = createAsyncThunk<void, AuthTypes>(
  'auth/fetchAuth',
  async ({ msisdn }) => {
    console.log('msisdnmsisdnmsisdn', msisdn);
    try {
      await axios.post(
        '/api/v1.5/auth/otp/request',
        {
          msisdn
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-User-Agent': 'ucell/android/1.4.3'
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchOTP = createAsyncThunk(
  'auth/fetchOTP',
  async ({ msisdn, code }: AuthTypes) => {
    try {
      const { data } = await axios.post(
        '/api/v1.5/auth/otp/verify',
        {
          msisdn,
          code
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-User-Agent': 'ucell/android/1.4.3'
          }
        }
      );

      return data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
);
