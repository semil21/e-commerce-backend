import categoryController from "../../controllers/admin/category.controller";
import express from "express";

const categoryRouter = express.Router();

categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.post("/create", categoryController.createNewCategory);
categoryRouter.put("/edit/:id", categoryController.editCategory);
categoryRouter.put(
  "/update-status/:id",
  categoryController.updateCategoryStatus,
);
categoryRouter.delete("/delete/:id", categoryController.deleteCategory);

export default categoryRouter;
