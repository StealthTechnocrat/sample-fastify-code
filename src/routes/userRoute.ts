import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import UserController from "../controllers/userController";
import userController from "../controllers/userController";

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

const UserRoute = {

    saveUser: async (
        fastify: FastifyInstance,
        options: Object
    ) =>
    {
        fastify.post(
            "/user",
            schemaValidation,
            async(req, res)=>{
                await userController.save(fastify, req, res);
            }
        );
    }
};


export default UserRoute;