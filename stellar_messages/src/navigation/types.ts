export type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  MessageBoard: undefined;
};

export interface Post {
  id: number;
  content: string;
  tags: string[];
  likes: number;
  created_at: string;
  isLiked?: boolean;
  author?: {
    id: number;
    username: string;
  };
}

export interface User {
  id: number;
  username: string;
  email: string;
}
