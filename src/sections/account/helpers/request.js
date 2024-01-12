import axios from 'axios';

export const getOneUser = async (id, token) => {
  const data = await axios.get(`https://abibiman-api.onrender.com/users/${id}`, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
  return data;
};
