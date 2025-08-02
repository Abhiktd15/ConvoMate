import express, { Router } from 'express'
import { isAuthenticated } from '../middlewares/auth.middleware.js';
import {getStreamToken} from '../controllers/chat.controller.js'

const chatRouter = express.Router();

chatRouter.use(isAuthenticated);

chatRouter.get('/token',getStreamToken)

export default chatRouter;