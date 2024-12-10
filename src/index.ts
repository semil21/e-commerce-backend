import connectDB from "./database/database";

import Express from "express";
import bodyParser from "body-parser";

import adminRouter from "./routes/admin/admin.route";
import categoryRouter from "./routes/admin/category.route";

import dotenv from "dotenv";
import productRouter from "./routes/admin/product.route";
import sizeRouter from "./routes/admin/size.route";
import imageRouter from "./routes/admin/image.route";
dotenv.config();

const cors = require("cors");

const app = Express();
connectDB();

app.use(Express.json());
// app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  next();
});

// app.use(notFound);

app.use("/admin", adminRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/size", sizeRouter);
app.use("/image", imageRouter);

app.listen(process.env.PORT_NUMBER, () => {
  console.log("server running");
});
