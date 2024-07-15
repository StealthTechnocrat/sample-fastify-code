import type { FastifyInstance } from "fastify";
/* response schema */
const schemaValidation = {
    schema: {
        response: {
            /* code */
            200: {
                /* properties of response */
                properties: {
                    /* message key should be part of response*/
                    message: {
                        type: 'string'
                    }
                },
                required: ['message']
            }
        },

        /* SAMPLE CODE: validation on query strings */
        // querystring: {
        //     properties: {
        //         name: { type: 'string' },
        //         age: { type: 'integer' },
        //     },
        //     required: [
        //         'name'
        //     ]
        // },

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
        }
    }
};


/* the controler object */
const greetingsController = (
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
    fastify.get(
        '/hello/:name',
        schemaValidation,
        (req, res) =>
        {
            res.send(
                {
                    messages: `Hello ${req.otherName}`
                }
            )
        }
    );


    /* call this always */
    done();
}

export default greetingsController;