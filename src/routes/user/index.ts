import { FastifyPluginAsync } from 'fastify';
import {
  rootGetType,
  rootPostType,
  purchasersGet,
  rootGetSchema,
  rootPostSchema,
  purchasersPostSchema,
} from '@routes/user/schema';

export default (async (fastify): Promise<void> => {
  fastify.get<rootGetType>(
    '/',
    { schema: rootGetSchema },
    async function (request) {
      const { id } = request.query;
      return fastify.allcpp.getUser(id ? Number(id) : undefined);
    }
  );
  fastify.post<rootPostType>(
    '/',
    { schema: rootPostSchema },
    async function (request) {
      const { account, password } = request.body;
      return await fastify.allcpp.addUser(account, password);
    }
  );
  fastify.get<purchasersGet>(
    '/purchasers',
    { schema: purchasersPostSchema },
    async function (request) {
      const { id } = request.query;
      return await fastify.allcpp.getPurchasers(Number(id));
    }
  );
}) as FastifyPluginAsync;
