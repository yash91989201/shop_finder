import cookieParser from "cookie-parser";
import * as path from "path";
import express, { Express } from "express";
import cors from "cors";
import shopRouter from "./routers/shop";
import sellerRouter from "./routers/seller";
// import configurations
import { PORT } from "./config";
import connectToDB from "./db/connect";

connectToDB();
const app: Express = express();
app.use(
  cors({
    origin: "http://127.0.0.1:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/shop", shopRouter);
app.use("/api/v1/seller", sellerRouter);
app.use(express.static(path.join(__dirname, "../../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://127.0.0.1:${PORT}`);
});
