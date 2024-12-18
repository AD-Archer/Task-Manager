import express from "express";
import bcrypt from "bcrypt";
import {User,Task} from '../models/task'
import { ensureGuest } from "../middleware/auth";

const router = express.Router();

router.get('/guest-login', ensureGuest, (req, res, next) => {

    res.render('/all-task-sandbox', {message: req.flash()});
});


router.get('/login', ensureGuest, (req, res, next) => {

    const {username, email, password} = req.body

    //query the databse for the user email

    try{
        const user = User.findOne({
            where: {email}, 
            attributes: ['id', 'username', 'password_hash', 'email']
        })

        const validpwd = bcrypt.compare(password, username.password_hash)
        // if the password doesn't match return easier


        if (!validpwd) {
            return flash({message: 'try again, your username or password is incorrect'})
        } else{
            res.redirect({task_dashboard}, {all_task});
        }

    } catch(e){
        console.error("ERROR::",e)
        return res.status(400).json({error: "Invalid username or password"})
    }





})