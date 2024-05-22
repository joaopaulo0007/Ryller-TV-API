require("dotenv").config();
const jwt = require("jsonwebtoken");
import { createUser, getUserByEmail } from "../User/userService";
import  express  from "express";
import brycpt from "bcrypt"


export const register = async (req: express.Request, res: express.Response) => {
    try{
        const {email, password, username} = req.body; 

        if(!username){
            return res.status(422).json({msg: "O nome é obrigatório!"})
        }

        if(!email){
            return res.status(422).json({msg: "O email é obrigatório!"})
        }

        if(!password){
            return res.status(422).json({msg: "A senha é obrigatória!"})
        }

        const existingUser = await getUserByEmail(email);

        if(existingUser){
            return res.status(422).json({msg: "Esse email já está sendo utilizado"})
 
        }

        const salt = await brycpt.genSalt(12); 
        const passwordHash = await brycpt.hash(password, salt); 
 

        const user = await createUser({
            email, 
            username, 
            password: passwordHash
        })

        return res.sendStatus(200).json(user).end();
    }catch(error){
        console.error(error);
        return res.sendStatus(400);
    }

}

export const login = async(req: express.Request, res: express.Response) => {
    try{

        const {email, password} = req.body;

        if(!email){
            return res.status(422).json({msg: "O email é obrigatório!"})
        }

        if(!password){
            return res.status(422).json({msg: "A senha é obrigatória!"})
        }

        const user = await getUserByEmail(email);

        if(!user){
            return res.status(404).json({msg: "Usuário não encontrado!"});
        }

        const checkPassword = await brycpt.compare(password, user.password);

        if(!checkPassword){
            return res.status(422).json({msg: "senha inválida!"});
        }

        const secret = process.env.SECRET

        const token = jwt.sign({
            id: user._id,
        },
        secret,
        )
        return res.status(200).json({msg: "Autenticação realizada com sucesso", token});
    }catch(error){
        console.error(error);
        return res.sendStatus(400);
    }
}

export const getProfile = async(req: express.Request, res: express.Response) => {

    //@ts-ignore
	return res.json(req.user)
	
}   