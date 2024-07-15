import type { FastifyInstance } from "fastify";
import Users from '../models/seed.users';


const MongoConnect = {
    init: (
        fastify: FastifyInstance,
        options: Object,
        done: Function
    ) =>
    {      

        // Use onReady hook to log a message once MongoDB is connected
        fastify.after(async (err) =>
        {
            if (err)
            {
                fastify.log.error(err);
                process.exit(1);
            }

            try
            {
                /* try to ping */
                await fastify.mongo.client.db().admin().ping();
                fastify.log.info('MongoDB connected successfully');

                /* try to make collection */
                await Users.makeCollection(fastify);

            } catch (err)
            {
                fastify.log.error('MongoDB connection failed:', err);
                process.exit(1);
            }
        });
        
        done();
    }
}

export default MongoConnect;