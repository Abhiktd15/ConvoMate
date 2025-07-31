import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { getMyFriends, getRecommendedUsers,acceptFriendRequest,sendFriendRequest } from "../controllers/user.controller.js";

const userRouter = express.Router()

userRouter.use(isAuthenticated)

userRouter.get("/",getRecommendedUsers)
userRouter.get("/friends",getMyFriends)
userRouter.get("/friend-request/:id",sendFriendRequest)
userRouter.get("/accept-request/:id/accept",acceptFriendRequest)


export default userRouter;