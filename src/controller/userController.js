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
    try {
        const userCreateStatus =  await userModel.createUser( req.body );
        res.status(201).json(userCreateStatus);
    } catch(err) {
        res.status(500).json( { err } );
    }
}