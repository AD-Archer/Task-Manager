import express from "express";
import bcrypt from "bcrypt";
import {User,Task} from '../models/task'
import { ensureGuest } from "../middleware/auth";

const router = express.Router();

router.get('/guest-login', ensureGuest, (req, res, next) => {

    res.render('/all-task-sandbox', {message: req.flash()});
});

