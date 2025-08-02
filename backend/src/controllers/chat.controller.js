import { generateStreamToken } from "../lib/stream.js";
import { TryCatch } from "../middlewares/error.js";

const getStreamToken = TryCatch(async(req,res) => {
    const token = generateStreamToken(req.user.id);

    return res.status(200).json({token})
})

export {getStreamToken}