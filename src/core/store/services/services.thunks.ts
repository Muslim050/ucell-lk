import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("/api/v1.5/services", {
        headers: {
          "Content-Type": "application/json",
          "X-User-Agent": "ucell/android/1.4.3",
          "X-Authorization": token,
          "Accept-Language": "ru",
        },

        responseType: "json",
        data: JSON.stringify({}),
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
// export const getServicesInfo = createAsyncThunk(
//   'services/getServicesInfo',
//   async ({ id }: { id: string }) => {
//     console.log('iddididid', id);

//     const token = localStorage.getItem('token');
//     try {
//       const response = await axios.post(
//         `services/${id}`,

//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'X-User-Agent': 'ucell/android/1.4.3',
//             'X-Authorization': token
//           },
//           responseType: 'json'
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

export const changeServices = createAsyncThunk(
  "services/changeServices",
  async ({ id, enabled }: { id: string; enabled: string }) => {
    console.log("id, enabledid, enabled", id, enabled);

    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "/api/v1.5/services/change",
        {
          service_id: id,
          action: enabled,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-User-Agent": "ucell/android/1.4.3",
            "X-Authorization": token,
          },
          responseType: "json",
        }
      );
    } catch (error: any) {
      return Promise.reject(error.response.data);
    }
  }
);
