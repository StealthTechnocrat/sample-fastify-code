/* sample hook code 
read about them here
https://fastify.dev/docs/latest/Reference/Hooks/#hooks
*/
const customHooks = {
    preHander: (req, res, done) =>
    {
        /* some random variable */
        req.otherName = 'Harpreet';

        /* the code here can be used to check
            - sessio/token
            - add extra values to request
            - ban users/ request
            - etc
        */

        done();
    }
};

export default customHooks;