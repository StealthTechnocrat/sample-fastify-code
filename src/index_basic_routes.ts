// src/index.ts
import Fastify from 'fastify';

const fastify = Fastify(
    {
        logger: true
    }
);

/* simple way */
// fastify.get('/', async (request, reply) =>
// {
//     return { hello: 'world' };
// });

/* the way though routes */
fastify.route({
    method: 'GET',
    url: '/',
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    hello: { type: 'string' }
                }
            }
        }
    },
    handler: function (request, reply)
    {
        reply.send({ hellos: 'world' })
    }
});



/* through routes and schema for params and query string */
fastify.route(
    {
        /* method */
        method: 'GET',
        /* route url */
        url: '/hello/:name',
        /* schema */
        schema: {
            /* validation on query strings */
            querystring: {
                properties: {
                    name: { type: 'string' },
                    age: { type: 'integer' },
                },
                required: [
                    'name'
                ]
            },

            /* for params */
            params: {
                properties: {
                    name: {
                        type: 'string'
                    }
                },
                required: [
                    "name"
                ]
            },
            /* schema for response */
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string'
                        }
                    },
                    required: [
                        'message'
                    ]
                }
            }
        },
        handler: (req, res) =>
        {
            res.send(
                { message: req.params.name }
            );
        }
    }
);

/* using simple way with scehma as params */
const options = {
    schema: {
        /* validation on query strings */
        querystring: {
            properties: {
                name: { type: 'string' },
                age: { type: 'integer' },
            },
            required: [
                'name'
            ]
        },

        /* for params */
        params: {
            properties: {
                name: {
                    type: 'string'
                }
            },
            required: [
                "name"
            ]
        },
        /* schema for response */
        response: {
            200: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string'
                    }
                },
                required: [
                    'message'
                ]
            }
        }
    }
};

/* 
    sample route 
    http://localhost:3000/func-route/wow?name=hello
*/
fastify.get('/func-route/:name', options, (req, res)=>{
    res.send(
        {
            message:'all good here'
        }
    )
});

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

start();
