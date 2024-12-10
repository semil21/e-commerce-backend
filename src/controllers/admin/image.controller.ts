import { Image } from "../../schemas/admin/image.schema";
import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";

const addNewImage = expressAsyncHandler(async (req: Request, res: Response) => {
  try {
    const saveImage = await Image.create(req.body);

    if (saveImage) {
      res.status(200).send({ response: saveImage });
    } else {
      res.status(400).send({ response: "Failed To Add New Image" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ response: "Server Error, Failed to Upload New Image" });
  }
});

const getProductImages = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;

      const getImages = await Image.find({ product: productId });

      if (getImages) {
        res.status(200).send({ response: getImages });
      } else {
        res.status(400).send({ response: "Failed to Get Product Images" });
      }
    } catch (error) {
      res
        .status(200)
        .send({ response: "Server Error, Failed to Get Product Images" });
    }
  },
);

const deleteImage = expressAsyncHandler(async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const deleteRecord = await Image.findByIdAndDelete(
      { _id: productId },
      { new: true },
    );

    if (deleteRecord) {
      res.status(200).send({ response: "Image Deleted Successfully" });
    } else {
      res.status(400).send({ response: "Failed To Delete Image" });
    }
  } catch (error) {
    res.status(500).send({ response: "Server Error, Failed To Delete Image" });
  }
});

const updateImageStatus = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const { status } = req.body;

      const updateStatus = await Image.findByIdAndUpdate(
        { _id: productId },
        { status: status },
        { new: true },
      );

      if (updateStatus) {
        res.status(200).send({ response: "Status Updated Successfuly" });
      } else {
        res.status(400).send({ response: "Failed To Update Status" });
      }
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server Error, Failed to Update Image Status" });
    }
  },
);

export default {
  addNewImage,
  getProductImages,
  deleteImage,
  updateImageStatus,
};
