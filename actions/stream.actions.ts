'use server'

import { currentUser } from "@clerk/nextjs/server"
import { StreamClient } from "@stream-io/node-sdk";
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const secretKey = process.env.STREAM_SECRET_KEY;

const tokenProvider = async() =>{
    //currentUser function provided by the clerk which will give us the current logged in user
    const user = await currentUser();

    //couple of checks
    if(!user) throw new Error("User Not Logged In");
    if(!apiKey) throw new Error("No Api Key Found");
    if(!secretKey) throw new Error("No Secret Key Found")
    
    // we have to create the sever side StreamClient which is comming from the node.js. why we have to do that?

    // Authentication: The server-side client creates a token for each user when they log in,
    // allowing them to join streams without exposing the API key.

    // Managing Video Rooms: If you're building a multi-user video call application, the server-side client will handle
    // creating rooms, adding participants, and managing session lifecycles.

    // Messaging: For chat features in a stream, the server-side client manages the creation of chat rooms, 
    // sending and receiving messages securely.

    const client = new StreamClient(apiKey,secretKey);
    const exp = Math.round(new Date().getTime() / 1000) + 60*60;
    const issued = Math.floor(Date.now() / 1000) - 60;
    const token = client.createToken(user?.id , exp, issued);
    return token;
}

export default tokenProvider;