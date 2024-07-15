import type { FastifyInstance } from "fastify";
/* response schema */
const schemaValidation = {
    schema: {
        response: {
            /* code */
            200: {
                /* properties of response */
                properties: {
                    /* message */
                    message: {
                        type: 'string'
                    }
                },
                required: ['message']
            }
        },

        /* POST param schema */
        body: {
            properties: {
                name: {
                    type: 'string'
                },
                age: {
                    type: 'number',
                    minimum: 1,
                    maximum: 100
                },
                email: {
                    type: 'string',
                    format: 'email'
                }

            },
            required: [
                'name',
                'age',
                'email'
            ]
        }
    }
};


/* the controler object */
const userController = (
    fastify: FastifyInstance,
    options: object,
    done: Function
) =>
{
    /* put the route here */

    /* 
        sample route 
        http://localhost:3000/func-route/wow?name=hello
    */
    fastify.post(
        '/user',
        schemaValidation,
        async (req, res) =>
        {
            const { name, email, age } = req.body;
            try
            {
                const db = fastify.mongo.client.db(process.env.MONGO_DB_NAME);
                const result = await db.collection('users').insertOne({ name, email, age });
                res.send(
                    { 
                        message: "user has been created" ,
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
    );


    /* call this always */
    done();
}

export default userController;