import UserModel from "../model/UserModel";

let userModel = new UserModel();
/**
 * login - function to login the user 
 *
 * @param {*} req 
 * @param {*} res 
 */
export async function login ( req, res ) {
    try {
        const userInfo = req.body;
        const userLoginStatus = await userModel.findUserByCredentials(userInfo);
        if (!userLoginStatus) {
            return userLoginStatus;
        }
        res.status(200).json(userLoginStatus);
    } catch (err) {
        return err;
    }
}

/**
 * register - function to register a user
 * 
 * @param {*} req 
 * @param {*} res 
 */
export async function register ( req, res ) {
    try {
        const userCreateStatus =  await userModel.createUser( req.body );
        res.status(201).json(userCreateStatus);
    } catch (err) {
        res.status(500).json( { err } );
    }
}

/**
 * updateProfile - function to update the user profile information
 * 
 * @param {*} req 
 * @param {*} res 
 */
export async function updateProfile ( req, res ) {
    try {
        const user =  req.user;
        const userUpdateInfo = req.body; 
        const userUpdateStatus = await userModel.updateUser(user, userUpdateInfo);
        console.log(userUpdateStatus);
        if (!userUpdateStatus)  {
            res.status(404).json({
                msg: "Data not updated"
            });
        }
        res.status(200).json({
            msg: "Data Updated",
            user: userUpdateStatus
        });
    } catch (err) {
        console.log("------")
        console.log(err);
        res.status(500).json({
            err
        });
    }
}