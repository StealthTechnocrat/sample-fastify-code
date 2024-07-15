/* load fasttify */
import Fastify from 'fastify';

/* load dotenv */
import dotenv from "dotenv";

/* load fastify mongo package */
import fastifyMongo from '@fastify/mongodb';

/* load mongo connection resource */
import MongoConnect from './resource/MongoConnect';

/* load user contoller */
import userController from './controllers/User';

/* load greetings controllers */
import greetingsController from './controllers/Greetings';

/* import hooks 
 hooks are syste events in fastify:
 https://fastify.dev/docs/latest/Reference/Hooks/#hooks
*/
import customHooks from './hooks/CustomHooks';



// Load environment variables from .env file
dotenv.config();

/* logger settings 
    this is  default logger from fastify
    https://fastify.dev/docs/latest/Reference/Logging/#logging
*/
const loggerSettings = {
    development: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            },
        },
    },
    production: true
}

/* initiate fastify with logger settings */
const fastify = Fastify(
    {
        logger: loggerSettings[process.env.ENVIRONMENT]
    }
);



/* declare a decorator */
fastify.decorateRequest('otherName', '');

/* register the hook */
fastify.addHook('preHandler', customHooks.preHander);

/* connect to MONGO */
fastify.register(
    fastifyMongo,
    {
        // force to close the mongodb connection when app stopped
        // the default value is false
        forceClose: true,

        url: process.env.MONGO_CONN_STRING
    }
);

/* register a connections here */
fastify.register(MongoConnect.init);


/* resgiter controller */
fastify.register(
    /* controller instance */
    greetingsController,
    {
        /* request prefixes */
        prefix: '/greetings'
    }
);

/* resgister a controller */
fastify.register(userController);



/* register server */
const start = async () =>
{
    try
    {
        await fastify.listen({ port: 3000 });
        console.log('Server is running at http://localhost:3000');
    } catch (err)
    {
        fastify.log.error(err);
        process.exit(1);
    }
};

/* start server */
start()