import axios from 'axios';
import {Post} from '../navigation/types';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
});

export const setAuthToken = (token: string | null) => {
  console.log('Setting auth token:', token?.substring(0, 10) + '...');
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    console.log('Headers after setting:', api.defaults.headers.common);
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.error('Unauthorized access:', error.config.url);
    }
    return Promise.reject(error);
  },
);

export const postsApi = {
  getPosts: async (page: number, filter: string) => {
    const res = await api.get<{
      results: Post[];
      count: number;
      next: string | null;
    }>(`/posts/?page=${page}&filter=${filter}`);
    return {
      posts: res.data.results,
      hasMore: !!res.data.next,
    };
  },
  createPost: async (content: string, tags: string[]) => {
    console.log('Request headers:', api.defaults.headers);
    console.log('Request payload:', JSON.stringify({content, tags}, null, 2));

    try {
      const res = await api.post<Post>('/posts/', {
        content,
        tags,
      });
      console.log('Response:', res.data);
      return res.data;
    } catch (error: any) {
      console.error('Post creation error:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      });
      throw error;
    }
  },
  likePost: async (postId: number, unlike: boolean = false) => {
    const res = await api.post<Post>(`/posts/${postId}/like/`, {
      unlike,
    });
    return res.data;
  },

  deletePost: async (postId: number) => {
    await api.delete(`/posts/${postId}/delete/`);
  },
};

export default api;
