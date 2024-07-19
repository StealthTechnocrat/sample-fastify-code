/* load fasttify */
import Fastify from 'fastify';

/* load dotenv */
import dotenv from "dotenv";

import GreetRoute from './routes/greetRoute';

import UserRoute from './routes/userRoute';

import fastifyMongodb from '@fastify/mongodb';


/* import hooks 
 hooks are syste events in fastify:
 https://fastify.dev/docs/latest/Reference/Hooks/#hooks
*/
// import customHooks from './hooks/CustomHooks';



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
const fastify = await Fastify(
    {
        logger: loggerSettings[process.env.ENVIRONMENT]
    }
);

;


/* register server */
const start = async () =>
{
    try
    {

        await fastify.register(fastifyMongodb, {
            url: process.env.MONGO_CONN_STRING
        });

        if (fastify.mongo)
        {
            fastify.log.info('MongoDB plugin is registered');
        }
        else 
        {
            /* let us exit when there is NO DB connection */
            fastify.log.error('MongoDB plugin is not registered');
            process.exit(1);
        }

        /* start routes here */
        fastify.register(
            GreetRoute,
            {
                prefix: '/greetings'
            }
        );

        fastify.register(UserRoute.saveUser);


        /* start listeing */
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