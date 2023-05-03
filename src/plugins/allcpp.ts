import plugin from 'fastify-plugin';
import { getPurchaserList, getUser, login } from '@utils/network';
import { User } from '@utils/network.model';
import * as console from "console";

export default plugin(async (fastify) => {
  const userMap = new Map<number, User>();
  fastify.decorate('allcpp', {
    addUser: async (account: string, password: string) => {
      let isNew = true;
      const token = await login(account, password);
      const user = await getUser(token);
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
    getPurchasers: (id: number) => {
      const token = userMap.get(id)?.token;
      if (token !== undefined) {
        return getPurchaserList(token);
      } else {
        return null;
      }
    },
  });
});

declare module 'fastify' {
  export interface FastifyInstance {
    allcpp: {
      addUser: (account: string, password: string) => Promise<string>;
      getUser: (id?: number) => User | User[] | undefined;
      getPurchasers: (id: number) => Promise<any>;
    };
  }
}
