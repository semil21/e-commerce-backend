import express from "express";
import sizeController from "../../controllers/admin/size.controller";

const sizeRouter = express.Router();

sizeRouter.get("/", sizeController.getAllSizes);
sizeRouter.post("/create", sizeController.addNewSize);
sizeRouter.get("/product-size/:productId", sizeController.getProductSizes);

export default sizeRouter;
