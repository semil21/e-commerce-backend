import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { Category } from "../../schemas/admin/category.schema";

const createNewCategory = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { name } = req.body;

      const checkIfCategoryExist = await Category.findOne({
        name: name,
      });

      if (checkIfCategoryExist) {
        res.status(200).send({ response: "Category Already Exists" });
      }

      if (!checkIfCategoryExist) {
        const saveNewCategory = await Category.create({ name });
        if (saveNewCategory) {
          res.status(200).send({ response: saveNewCategory });
        } else {
          res.status(400).send({ response: "Failed To Add Aew Category" });
        }
      }
    } catch (error) {
      console.log("error -", error);
      res.status(500).send({
        response: "Server error, failed to add new category",
        error: error,
      });
    }
  },
);

const getAllCategories = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const fetchCategories = await Category.find();

      if (fetchCategories) {
        res.status(200).send({ response: fetchCategories });
      } else {
        res.status(400).send({ response: "Error In Getting All Categories" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server error, failed to get all categories " });
    }
  },
);

const editCategory = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const editCategoryRecord = await Category.findByIdAndUpdate(
        { _id: id },
        { name: name },
        { new: true },
      );

      if (editCategoryRecord) {
        res.status(200).send({ response: editCategoryRecord });
      } else {
        res.status(400).send({ response: "Failed To Edit Category Record" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server Error, Failed To Edit Category" });
    }
  },
);

const deleteCategory = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const deleteCategoryRecord = await Category.findByIdAndDelete(id);

      if (deleteCategoryRecord) {
        res.status(200).send({ response: "Category Deleted Successfully" });
      } else {
        res.status(500).send({ response: " Failed To Delete Category" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server Error, Failed To Delete Category" });
    }
  },
);

const updateCategoryStatus = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updatedStatus = status == true ? false : true;

      const updateStatusRecord = await Category.findOneAndUpdate(
        { _id: id },
        { status: updatedStatus },
        { new: true },
      );

      if (updateStatusRecord) {
        res.status(200).send({ response: updateStatusRecord });
      } else {
        res.status(400).send({ response: "Failed to update category status" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server Error, Failed To Update Category Status" });
    }
  },
);

export default {
  createNewCategory,
  getAllCategories,
  editCategory,
  deleteCategory,
  updateCategoryStatus,
};
