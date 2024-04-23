import { createUser, getUserByEmail } from "User/userService";
import  express  from "express";

export const register = async (req: express.Request, res: express.Response) => {
    try{
        const {email, password, username} = req.body; 

        if(!email || !password || !username){
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);

        if(existingUser){
            return res.sendStatus(400); 
        }

        const user = await createUser({
            email, 
            username, 
            password
        })

        return res.sendStatus(200).json(user).end();
    }catch(error){
        console.error(error);
        return res.sendStatus(400);
    }
}