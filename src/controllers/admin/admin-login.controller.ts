import expressAsyncHandler from "express-async-handler";
import { Admin } from "../../schemas/admin/login.schema";
import { Request, Response } from "express";
import brcypt from "bcrypt";
import jwt from "jsonwebtoken";

const createNewAdmin = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const saltRounds = 10;
      const encryptedPassword = brcypt.hashSync(password, saltRounds);

      if (encryptedPassword) {
        const saveNewAdmin = await Admin.create({
          email,
          password: encryptedPassword,
        });

        if (saveNewAdmin) {
          res.status(200).send({ response: "Admin created successfully" });
        } else {
          res.status(400).send({ response: "Failed to create new admin" });
        }
      }
    } catch (error) {
      res
        .status(500)
        .send({ response: "Server error, failed to create new admin" });
    }
  },
);

const adminLogin = expressAsyncHandler(async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (email) {
      const verifyEmail = await Admin.findOne({ email: email });

      if (!verifyEmail) {
        res.status(400).send({ respoonse: "Email does not exist" });
      } else {
        const hashedPassowrd = verifyEmail?.password || "";

        const isPassordCorrect = await brcypt.compare(password, hashedPassowrd);

        if (isPassordCorrect) {
          const token = jwt.sign(
            { id: verifyEmail?._id, email: verifyEmail?.email },
            "secret-key",
            {
              expiresIn: "1h",
            },
          );

          res
            .status(200)
            .send({ response: "Admin login successfully", token: token });
        } else {
          res.status(400).send({ response: "Incorrect password" });
        }
      }
    }
  } catch (error) {
    res.status(500).send({ response: "Server error, failed to login " });
  }
});

export default { createNewAdmin, adminLogin };
