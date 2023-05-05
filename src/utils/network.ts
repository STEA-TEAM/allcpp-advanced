import axios from 'axios';
import { createHash } from 'crypto';
import { stringify } from 'qs';

import { PurchaserInfo, UserInfo } from '@utils/network.model';

const allcppApi = axios.create({ baseURL: 'https://www.allcpp.cn/allcpp' });
const userApi = axios.create({ baseURL: 'https://user.allcpp.cn' });

const keyStart = atob('MngwNTJBMEExdTIyMg==');
const KeyEnd = atob('MnNGUnM=');

function getCrypto(ticketTypeId: number) {
  const seconds = Math.round(new Date().getTime() / 1e3);
  const randomStr = (() => {
    const stringList = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    let result = '';
    for (let a = 0; a < 32; a++) {
      result += stringList.charAt(
        Math.floor(Math.random() * stringList.length)
      );
    }
    return result;
  })();
  return {
    nonce: randomStr,
    timeStamp: seconds,
    sign: createHash('md5')
      .update(keyStart + seconds + randomStr + ticketTypeId + KeyEnd)
      .digest('hex'),
  };
}

export const getEvents = async (index: number = 1, size: number = 10) => {
  return (
    await allcppApi.post(
      '/event/eventsjin.do',
      {
        enabled: 0,
        index: index,
        size: size,
        city: 0,
        search: '',
        iswannago: 0,
        evmtype: 0,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  ).data;
};

export const login = async (account: string, password: string) => {
  return (
    await userApi.post(
      '/api/login/normal',
      stringify({
        account: account,
        password: password,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
  ).data.token;
};

export const getUserInfo = async (token: string): Promise<UserInfo> => {
  return (
    await userApi.get('/rest/my', {
      headers: { cookie: `token=${token}` },
    })
  ).data;
};

export const buyTicketAlipay = async (
  token: string,
  ticketTypeId: number,
  ticketCount?: number,
  purchaserIds?: number[]
) => {
  const { nonce, timeStamp, sign } = getCrypto(ticketTypeId);
  return (
    await allcppApi.post('/ticket/buyTicketAlipay.do', null, {
      headers: { cookie: `token=${token}` },
      params: {
        count: ticketCount ?? purchaserIds?.length,
        nonce: nonce,
        purchaserIds: purchaserIds?.join(),
        sign: sign,
        ticketTypeId: ticketTypeId,
        timeStamp: timeStamp,
      },
    })
  ).data;
};

export const getPurchaserList = async (
  token: string
): Promise<PurchaserInfo[]> => {
  return (
    await allcppApi.get('/user/purchaser/getList.do', {
      headers: { cookie: `token=${token}` },
    })
  ).data;
};

export const getTicketTypeList = async (token: string, eventMainId: number) => {
  return (
    await allcppApi.get('/ticket/getTicketTypeList.do', {
      headers: { cookie: `token=${token}` },
      params: {
        eventMainId: eventMainId,
      },
    })
  ).data;
};

export const getPayUrl = async (action: string, bizContent: string) => {
  try {
    await axios.post(action, stringify({ biz_content: bizContent }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      maxRedirects: 0,
    });
  } catch (e: any) {
    return e.response.headers.location;
  }
};
