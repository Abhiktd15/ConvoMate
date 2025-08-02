import { TryCatch } from "../middlewares/error.js";
import FriendRequest from "../models/friendRequest.model.js";
import User from "../models/User.model.js";

const getRecommendedUsers = TryCatch(async (req, res) => {
  const currentUserId = req.user.id;
  const currentUser = req.user;

  const recommendedUsers = await User.find({
    $and: [
      { _id: { $ne: currentUserId } },
      { _id: { $nin: currentUser.friends } },
      { isOnboarded: true },
    ],
  });
  return res.status(200).json({
    success: true,
    recommendedUsers,
  });
});

const getMyFriends = TryCatch(async (req, res) => {
  const user = await User.findById(req.user.id)
    .select("friends")
    .populate("friends", "fullName profilePic nativeLanguage learningLanguage");

  return res.status(200).json({ success: true, friends: user.friends });
});

const sendFriendRequest = TryCatch(async (req, res) => {
  const myId = req.user.id;
  const { id: recipientId } = req.params;

  if (myId === recipientId) {
    return res.status(400).json({
      success: false,
      message: "You Can't send friend request to yourself!",
    });
  }
  const recipient = await User.findById(recipientId);
  if (!recipient) {
    return res.status(404).json({
      success: false,
      message: "Recipient not found!",
    });
  }

  if (recipient.friends.includes(myId)) {
    return res.status(400).json({
      success: false,
      message: "You're already friend with this user",
    });
  }

  const existingRequest = await FriendRequest.findOne({
    $or: [
      { sender: myId, recipient: recipientId },
      { sender: recipientId, recipient: myId },
    ],
  });
  if (existingRequest) {
    return res.status(400).json({
      success: false,
      message: "Already sent the friend Request!",
    });
  }
  const friendRequest = await FriendRequest.create({
    sender: myId,
    recipient: recipientId,
  });

  return res.status(200).json({
    success: true,
    message: "Friend Request sent Successfully !",
    friendRequest,
  });
});

const acceptFriendRequest = TryCatch(async (req, res) => {
  const { id: requestId } = req.params;

  const friendRequest = await FriendRequest.findById(requestId);
  if (!friendRequest) {
    return res.status(400).json({
      success: false,
      message: "No Friend Request Found!",
    });
  }

  //Check if the logged in user is the recipient
  if (friendRequest.recipient.toString() !== req.user.id) {
    return res.status(400).json({
      success: false,
      message: "You are not authorized to accept the request!",
    });
  }

  friendRequest.status = "accepted";
  await friendRequest.save();

  //add each users in  sender and  reciever friends
  await User.findByIdAndUpdate(friendRequest.sender, {
    $addToSet: { friends: friendRequest.recipient },
  });

  await User.findByIdAndUpdate(friendRequest.recipient, {
    $addToSet: { friends: friendRequest.sender },
  });

  return res.status(200).json({
    success: true,
    message: "Friend Request Accepted Successfully !",
  });
});

const getFriendRequest = TryCatch(async (req, res) => {
  const incomingReqs = await FriendRequest.find({
    recipient: req.user.id,
    status: "pending",
  }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");

  const acceptedReqs = await FriendRequest.find({
    sender: req.user.id,
    status: "accepted",
  }).populate("recipient", "fullName profilePic");
  return res.status(200).json({
    success: true,
    incomingReqs,
    acceptedReqs,
  });
});

const getOutgoingRequests = TryCatch(async (req, res) => {
  const outGoingReqs = await FriendRequest.find({
    sender: req.user.id,
    status: "pending",
  }).populate(
    "recipient",
    "fullName profilePic learningLanguage nativeLanguage"
  );

  return res.status(200).json({
    success: true,
    outGoingReqs,
  });
});

export {
  getRecommendedUsers,
  getMyFriends,
  sendFriendRequest,
  acceptFriendRequest,
  getFriendRequest,
  getOutgoingRequests
};
