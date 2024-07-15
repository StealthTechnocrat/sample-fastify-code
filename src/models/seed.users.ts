/* this file created to create user schema as soon as it loads/imports 
 we can also add default users to the database if required
*/

const Users = {
    collectionName: 'users',
    db: null,
    makeCollection: async (fastify) =>
    {
        /* initiate connection */
        Users.db = fastify.mongo.client.db(process.env.MONGO_DB_NAME);

        /* define schema */
        const schema = {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    required: ['name', 'email', 'age'],
                    properties: {
                        name: {
                            bsonType: 'string',
                            description: 'must be a string and is required',
                        },
                        email: {
                            bsonType: 'string',
                            pattern: '^.+@.+\..+$',
                            description: 'must be a string and match the regular expression pattern',
                        },
                        age: {
                            bsonType: 'int',
                            minimum: 18,
                            description: 'must be an integer greater than or equal to 18 and is required',
                        },
                    },
                },
            },
        };

        try
        {
            /* let use try to create a collection here */
            await Users.db.createCollection(Users.collectionName, schema);

            /* log messages */
            fastify.log.info(`Collection ${Users.collectionName} created with schema`);
        } catch (e)
        {
            /* if collection already exists */
            if (e.codeName === 'NamespaceExists')
            {
                /* log it */
                fastify.log.info(`Collection ${Users.collectionName} already exists`);
            } else
            {
                fastify.log.error('Error creating collection:', e);
                process.exit(1);
            }
        }
    }
};
export default Users;