import express from "express";
import adminController from "../../controllers/admin/admin-login.controller";
const adminRouter = express.Router();

adminRouter.post("/create", adminController.createNewAdmin);
adminRouter.post("/login", adminController.adminLogin);

export default adminRouter;
