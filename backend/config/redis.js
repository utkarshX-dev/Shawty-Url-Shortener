import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = createClient({
    username: "default",
    password: process.env.REDIS_PASSWORD,

    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT)
    }
});

redisClient.on("error", (err) => {
    console.log("Redis Error:", err);
});

(async () => {
    try {

        await redisClient.connect();

        console.log("Redis connected successfully");

    } catch (error) {

        console.log("Redis connection failed:", error.message);
    }
})();

export default redisClient;