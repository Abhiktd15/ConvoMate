import {StreamChat} from 'stream-chat'
import "dotenv/config"

const apiKey = process.env.STREAM_API_KEY
const apiSecret = process.env.STREAM_SECRET_KEY

if(!apiKey || !apiSecret){
    console.error("Stream API key or Secret is Missing")
}

const streamClient = StreamChat.getInstance