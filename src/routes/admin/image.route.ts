import imageController from "../../controllers/admin/image.controller";
import express from "express";

const imageRouter = express.Router();

imageRouter.post("/add", imageController.addNewImage);
imageRouter.post("/:productId", imageController.getProductImages);
imageRouter.put("/update-status/:productId", imageController.updateImageStatus);
imageRouter.delete("/:productId", imageController.deleteImage);
export default imageRouter;
