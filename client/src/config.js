// src/config.js
const api = process.env.REACT_APP_API || 'http://127.0.0.1:8000/api';


const config = {
  api,
  header: () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

  },
  formdataheader: () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    };

  },
  blobheader: () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'blob'
    };

  },
};

export default config;