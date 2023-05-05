import { FastifyPluginAsync } from 'fastify';
import { rootGetSchema, rootGetType } from '@routes/event/schema';

export default (async (fastify): Promise<void> => {
  fastify.get<rootGetType>(
    '/',
    { schema: rootGetSchema },
    async function (request) {
      const { index, size } = request.query;
      return fastify.allcpp.getEvents(index, size);
    }
  );
}) as FastifyPluginAsync;
