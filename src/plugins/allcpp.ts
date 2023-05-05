import plugin from 'fastify-plugin';
import {
  getEvents,
  getPurchaserList,
  getUserInfo,
  login,
} from '@utils/network';
import { EventInfoList, Purchaser, User } from '@utils/network.model';
import * as console from 'console';

// noinspection JSUnusedGlobalSymbols
export default plugin(async (fastify) => {
  const userMap = new Map<number, User>();
  fastify.decorate('allcpp', {
    getEvents: async (
      index: number = 1,
      size: number = 10
    ): Promise<EventInfoList> => {
      return await getEvents(index, size);
    },
    addUser: async (
      account: string,
      password: string
    ): Promise<{ isNew: boolean; user: User }> => {
      let isNew = true;
      const token = await login(account, password);
      const userInfo = await getUserInfo(token);
      const user = {
        id: userInfo.id,
        token: token,
        nickname: userInfo.nickname,
        avatar: userInfo.face.picUrl,
        description: userInfo.description,
      };
      if (userMap.has(user.id)) {
        isNew = false;
      } else {
        userMap.set(user.id, user);
      }
      return { isNew, user };
    },
    getUser: (id?: number) => {
      if (id !== undefined) {
        console.log(userMap);
        console.log(userMap.get(id));
        return userMap.get(id);
      } else {
        return Array.from(userMap.values());
      }
    },
    getPurchasers: async (id: number): Promise<Purchaser[]> => {
      const token = userMap.get(id)?.token;
      if (token !== undefined) {
        const purchaserInfo = await getPurchaserList(token);
        return purchaserInfo.map((purchaser) => ({
          id: purchaser.id,
          name: purchaser.realname,
        }));
      } else {
        return [];
      }
    },
  });
});

declare module 'fastify' {
  // noinspection JSUnusedGlobalSymbols
  export interface FastifyInstance {
    allcpp: {
      getEvents: (index?: number, size?: number) => Promise<EventInfoList>;
      addUser: (account: string, password: string) => Promise<string>;
      getUser: (id?: number) => User | User[] | undefined;
      getPurchasers: (id: number) => Promise<Purchaser[]>;
    };
  }
}
