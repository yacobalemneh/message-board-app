import api from '../../../services/api';

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export async function registerUser(data: RegisterData) {
  if (!data.username || !data.email || !data.password) {
    throw new Error('All fields are required');
  }

  try {
    const res = await api.post('/users/register/', data);
    if (!res.data) {
      throw new Error('Invalid server response');
    }
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || 'Registration failed',
    );
  }
}

export async function loginUser(data: LoginData) {
  if (!data.email || !data.password) {
    throw new Error('Email and password are required');
  }

  try {
    const res = await api.post('/users/login/', data);

    if (!res.data?.access || !res.data?.user) {
      throw new Error('Invalid server response');
    }

    const {access, refresh, user} = res.data;
    return {user, access, refresh};
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || 'Authentication failed',
    );
  }
}
