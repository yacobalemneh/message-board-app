import api from '../../../services/api';

export async function fetchPosts() {
  const res = await api.get('/posts/');
  return res.data;
}

export async function createPost(content: string) {
  const res = await api.post('/posts/', {content});
  return res.data;
}
