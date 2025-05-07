import API from './api';

export const getTasksByBoard = async (boardId, token) => {
  const res = await API.get(`/tasks/${boardId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateTaskStatus = async (taskId, status, token) => {
  const res = await API.put(
    `/tasks/${taskId}/status`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const createTask = async (task, token) => {
  const res = await API.post('/tasks', task, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
