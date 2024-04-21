import express from 'express'
import { Login, Register, VerifyToken, getUser, logout } from '../controllers/UserController.js';

const route = express.Router();
//user create
route.post('/register', Register);

//login user
route.post('/login', Login)
route.get('/user', VerifyToken, getUser);
route.get('/logout', logout);


export default route;
