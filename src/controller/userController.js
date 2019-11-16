import UserModel from "../model/UserModel";

let userModel = new UserModel();
/**
 * login - function to login the user 
 *
 * @param {*} req 
 * @param {*} res 
 */
export async function login (req, res)  {
    try {
        const userInfo = req.body;
        const userLoginStatus = await userModel.findUserByCredentials(userInfo);
        if (!userLoginStatus) {
            return userLoginStatus;
        }

    } catch (err) {
        return err;
    }
}

export async function register ( req, res ) {
console.log(req.body);
    await userModel.createUser( req.body );
    res.send("ok");
}