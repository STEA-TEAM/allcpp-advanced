export interface UserInfo {
  id: number;
  nickname: string;
  face: {
    picId: number;
    picUrl: string;
  };
  description: string;
}

export interface User {
  id: number;
  token: string;
  nickname: string;
  avatar: string;
  description: string;
}