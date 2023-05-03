import { ErrorObject } from 'ajv/lib/types';
import * as chalk from 'chalk';
import Fastify from 'fastify';
import cors from '@fastify/cors';

import { Logger } from 'src/classes/Logger';

const fastify = Fastify({
  logger: {
    level: 'warn',
  },
});

async function main() {
  await fastify.register(import('./config'));
  // noinspection HttpUrlsUsage
  Logger.info(
    'Config',
    `Listening on ${chalk.blue(
      `http://${fastify.config.server.host}:${fastify.config.server.port}`
    )}`
  );
  await fastify.register(cors, {});
  fastify.register(import('@app'), fastify.config);

  fastify.listen(
    {
      host: fastify.config.server.host,
      port: fastify.config.server.port,
    },
    (err: any) => {
      if (err) {
        fastify.log.error(err);
        process.exit(1);
      }
    }
  );
}

main().catch((errors) => {
  if (errors instanceof Array<ErrorObject>) {
    errors.forEach((error: ErrorObject) => {
      Logger.error(
        'Config',
        'Invalid config item',
        chalk.yellow(`${error.message}`) +
          (error.instancePath
            ? ' at ' + chalk.blue.underline(error.instancePath)
            : '')
      );
    });
  } else {
    console.log(errors.join('\n'));
  }
  fastify.close().then(
    () => Logger.success('Server', 'Successfully closed'),
    (err) => Logger.error('Server', 'Cannot close', err.message)
  );
});
