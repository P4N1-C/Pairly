import { StreamChat } from "stream-chat";
import { StreamClient } from "@stream-io/node-sdk";
import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("Missing Environment Variables");
}

export const streamClient = new StreamClient(apiKey, apiSecret); // this is for video calls
export const chatClient = StreamChat.getInstance(apiKey, apiSecret); // this is for chat

// upsert -> we can create and update
export const upsertStreamUser = async (userData) => {
  try {
    await chatClient.upsertUser(userData);
    console.log("Stream user upserted!", userData);
  } catch (err) {
    console.error("Error upserting stream user: ", err);
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await chatClient.deleteUser(userId);
    console.log("Stream user deleted!", userId);
  } catch (err) {
    console.error("Error deleteing stream user: ", err);
  }
};
