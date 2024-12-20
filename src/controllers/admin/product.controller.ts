import expressAsyncHandler from "express-async-handler";
import { Product } from "../../schemas/admin/product.schema";

import { Request, Response } from "express";
import { Image } from "../../schemas/admin/image.schema";
import { Size } from "../../schemas/admin/size.schema";

const addNewProduct = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const saveProduct = await Product.create(req.body);

      if (saveProduct) {
        res.status(200).send({ response: saveProduct });
      } else {
        res.status(400).send({ response: "Failed To Add New Product" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server Error, Failed To Add New Product" });
    }
  },
);

const getAllProducts = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const fetchPRoducts = await Product.find();

      if (fetchPRoducts) {
        res.status(200).send({ response: fetchPRoducts });
      } else {
        res.status(400).send({ response: "Failed To Fetch All Products" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server Error, Failed To Fetch All Product" });
    }
  },
);

const editProduct = expressAsyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateRecord = await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (updateRecord) {
      res.status(200).send({ response: updateRecord });
    } else {
      res.status(400).send({ response: "Failed to Edit Product." });
    }
  } catch (error) {
    res.status(500).send({
      response: "Server Error, Failed To Edit Products. ",
    });
  }
});

const updateProductStatus = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const { status } = req.body;

      const updatedStatus = status === true ? false : true;

      const updateRecord = await Product.findByIdAndUpdate(
        { _id: productId },
        { status: updatedStatus },
        { new: true },
      );

      if (updateRecord) {
        res.status(200).send({ response: updateRecord.status });
      } else {
        res.status(200).send({ response: "Failed To Update Product Status" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server Error, Failed yto Update Product Status" });
    }
  },
);

const deleteProduct = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;

      const [deleteProductImage, deleteProductSize, deleteProduct] =
        await Promise.all([
          Image.findOneAndDelete({ product: productId }),
          Size.findOneAndDelete({ product: productId }),
          Product.findByIdAndDelete({ _id: productId }),
        ]);

      if (deleteProductImage && deleteProductSize && deleteProduct) {
        res.status(200).send({
          response: "Product Deleted Successfully With Its Images and Sizes.",
        });
      } else {
        res.status(400).send({ response: "Failed To Delete Product" });
      }
    } catch (error) {
      res.status(500).send({
        response: "Server Error, Failed To Delete Product",
        error: error,
      });
    }
  },
);

export default {
  addNewProduct,
  getAllProducts,
  editProduct,
  updateProductStatus,
  deleteProduct,
};
