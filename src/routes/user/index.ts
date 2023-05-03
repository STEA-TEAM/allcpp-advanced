import { FastifyPluginAsync } from 'fastify';
import * as console from "console";

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
  fastify.get<{
    Querystring: {
      id?: number;
    };
  }>('/', async function (request) {
    const { id } = request.query;
    console.log(id);
    return fastify.allcpp.getUser(id);
  });
  fastify.get<{
    Querystring: {
      id: number;
    };
  }>('/purchasers', async function (request) {
    const { id } = request.query;
    return await fastify.allcpp.getPurchasers(id);
  });
}) as FastifyPluginAsync;
