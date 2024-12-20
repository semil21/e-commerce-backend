import express from "express";
import sizeController from "../../controllers/admin/size.controller";

const sizeRouter = express.Router();

sizeRouter.get("/", sizeController.getAllSizes);
sizeRouter.post("/create", sizeController.addNewSize);
sizeRouter.get("/product-size/:productId", sizeController.getProductSizes);
sizeRouter.put("/update-status/:productId", sizeController.updtateSizeStatus);
sizeRouter.put("/edit-size/:productId", sizeController.editSize);
sizeRouter.delete("/:productId", sizeController.deleteSize);

export default sizeRouter;
