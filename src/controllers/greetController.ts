import type { FastifyReply, FastifyRequest } from "fastify";

/* the controler object */
const GreetController = (req: FastifyRequest, res: FastifyReply) =>
{
    res.send(
        {
            message: `Hello ${req.params.name}`
        }
    )
};

export default GreetController;