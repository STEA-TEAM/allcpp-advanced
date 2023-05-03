import { FastifyPluginAsync } from 'fastify';

export default (async (fastify, opts): Promise<void> => {
  fastify.post<{
    Body: {
      account: string;
      password: string;
    };
  }>('/', async function (request, reply) {
    const { account, password } = request.body;
    return await fastify.allcpp.addUser(account, password);
  });
}) as FastifyPluginAsync;
