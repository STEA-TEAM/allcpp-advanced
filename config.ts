import Ajv from 'ajv';
import { readFileSync } from 'fs';
import fastifyPlugin from 'fastify-plugin';
import { join, resolve } from 'path';
import { parse } from 'toml';

const ajv = new Ajv();

type ConfigType = {
  server: {
    host: string;
    port: number;
  };
};

const validate = ajv.compile({
  type: 'object',
  required: ['server'],
  properties: {
    server: {
      type: 'object',
      properties: {
        host: {
          type: 'string',
          default: 'localhost',
        },
        port: {
          type: 'number',
          default: 3000,
          minimum: 0,
          maximum: 65535,
        },
      },
    },
  },
});

export default fastifyPlugin(async (fastify) => {
  const config = parse(
    readFileSync(resolve(join(process.cwd(), 'config.toml'))).toString()
  );

  if (validate(config)) {
    fastify.config = config as ConfigType;
  } else {
    throw validate.errors;
  }
});

declare module 'fastify' {
  // noinspection JSUnusedGlobalSymbols
  interface FastifyInstance {
    config: ConfigType;
  }
}
