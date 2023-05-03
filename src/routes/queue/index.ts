import { FastifyPluginAsync } from 'fastify';

export default (async (fastify): Promise<void> => {
  fastify.post<{
    Body: {
      account: string;
      password: string;
    };
  }>('/', async function (request) {
    const { account, password } = request.body;
    return await fastify.allcpp.addUser(account, password);
  });
}) as FastifyPluginAsync;
