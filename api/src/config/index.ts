import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

// const MONGODB_URI =
//   process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/shop_list";

const SECRET_KEY = process.env.SECRET_KEY as string;

export { PORT, MONGODB_URI, SECRET_KEY };

const MONGO_IP = process.env.MONGO_IP || "mongodb";
const MONGO_PORT = process.env.MONGO_PORT || 27017;
// const MONGO_USER = process.env.MONGO_USER;
// const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

// const MONGODB_URI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/postDb`;
const MONGODB_URI = `mongodb://yash:password@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

// export { MONGODB_URI, REDIS_HOST, REDIS_PORT, SESSION_SECRET };
// export { MONGODB_URI, REDIS_URL, SESSION_SECRET };
