import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { getMyFriends, getRecommendedUsers,acceptFriendRequest,sendFriendRequest, getFriendRequest, getOutgoingRequests } from "../controllers/user.controller.js";

const userRouter = express.Router()

userRouter.use(isAuthenticated)

userRouter.get("/",getRecommendedUsers)
userRouter.get("/friends",getMyFriends)

userRouter.post("/friend-request/:id",sendFriendRequest)
userRouter.put("/accept-request/:id/accept",acceptFriendRequest)

userRouter.get("/friend-request",getFriendRequest)
userRouter.get("/outgoing-friend-request",getOutgoingRequests)


export default userRouter;