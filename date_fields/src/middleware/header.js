const UserController = require('../controllers/user-controller');

const userController = new UserController();

async function checkHeaders(req, res, next){
    const existingUser = await userController.UserService.userExistsService(req.params.nick);
    let If_Unmodified_Since_value = (req.rawHeaders[req.rawHeaders.indexOf('If-Unmodified-Since')+1])
    

    if (If_Unmodified_Since_value !== existingUser[0].updated_at){
        let err = new Error('bad value for last-modified-since header');
        return next(err)
    }else{
        //match
        next()
    }
}

module.exports = checkHeaders