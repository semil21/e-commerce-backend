import expressAsyncHandler from "express-async-handler";
import { Size } from "../../schemas/admin/size.schema";
import { Request, Response } from "express";

const addNewSize = expressAsyncHandler(async (req: Request, res: Response) => {
  try {
    const saveNewSize = await Size.create(req.body);

    if (saveNewSize) {
      res.status(200).send({ response: saveNewSize });
    } else {
      res.status(400).send({ response: "Failed To Add New Size " });
    }
  } catch (error) {
    res.status(500).send({ response: "Server Error, Failed To Add New Size" });
  }
});

const getAllSizes = expressAsyncHandler(async (req: Request, res: Response) => {
  try {
    const fetchAllSizes = await Size.find();

    if (fetchAllSizes) {
      res.status(200).send({ response: fetchAllSizes });
    } else {
      res.status(400).send({ response: "Failed to fetch all sizes" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ response: "Server Error, Failed To Fetch All Sizes" });
  }
});

const getProductSizes = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;

      const fethProductSizes = await Size.find({ product: productId });

      if (fethProductSizes) {
        res.status(200).send({ response: fethProductSizes });
      } else {
        res
          .status(400)
          .send({ response: "Failed To Get All Sizes of A Product." });
      }
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server Error, Failed To Get Product Sizes" });
    }
  },
);

export default { addNewSize, getAllSizes, getProductSizes };
