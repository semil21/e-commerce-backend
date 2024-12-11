import express from "express";
import productController from "../../controllers/admin/product.controller";

const productRouter = express.Router();

productRouter.get("/", productController.getAllProducts);
productRouter.post("/create", productController.addNewProduct);
productRouter.put("/edit/:id", productController.editProduct);
productRouter.put(
  "/update-status/:productId",
  productController.updateProductStatus,
);
productRouter.delete("/delete/:productId", productController.deleteProduct);

export default productRouter;
