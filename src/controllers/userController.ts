import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

/* the controler object */
const userController =
{
    save: async (
        fastify: FastifyInstance, 
        req: FastifyRequest, 
        res: FastifyReply
    ) =>
    {
        const { name, email, age } = req.body;
        try
        {
            console.log(fastify.mongo);
            
            const result = await fastify.mongo.db.collection('users').insertOne({ name, email, age });
            res.send(
                {
                    message: "user has been created",
                    id: result.insertedId
                }
            );
        } catch (err)
        {
            fastify.log.error(err);
            fastify.log.error('Error inserting user:', err);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }
}

export default userController;