export interface EventInfo {
  id: number;
  name: string;
  enterAddress: string;
  enterTime: number;
  endTime: number;
  tag: string;
  logoPicUrl: string;
}
export interface EventInfoList {
  list: EventInfo[];
  pages: number;
  size: number;
  total: number;
}

export interface PurchaserInfo {
  id: number;
  realname: string;
  idcard: string;
  mobile: string;
  validType: 0;
}

export interface Purchaser {
  id: number;
  name: string;
}

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
