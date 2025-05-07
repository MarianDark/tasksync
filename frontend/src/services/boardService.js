import API from './api';

export const getBoards = async (token) => {
  const res = await API.get('/boards', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createBoard = async (title, token) => {
  const res = await API.post(
    '/boards',
    { title },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};
