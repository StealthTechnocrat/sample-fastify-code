import type { FastifyInstance } from "fastify";
import GreetController from "../controllers/greetController";

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

const GreetRoute = (fastify: FastifyInstance, options: Object, done: Function) =>
{
    fastify.get(
        '/hello/:name',
        schemaValidation,
        GreetController
    );

    done();
}
export default GreetRoute;