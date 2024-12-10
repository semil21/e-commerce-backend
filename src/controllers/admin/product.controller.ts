import expressAsyncHandler from "express-async-handler";
import { Product } from "../../schemas/admin/product.schema";
import { Request, Response } from "express";

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

export default {
  addNewProduct,
  getAllProducts,
  editProduct,
};
