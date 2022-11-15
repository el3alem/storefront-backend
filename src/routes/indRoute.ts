import express from "express";
import userRoute from "./userRoute";
import prodRoute from "./prodRoute";
import orderRoute from "./orderRoute";

const router = express.Router();

router.use("/users", userRoute);
router.use("/products", prodRoute);
router.use("/orders", orderRoute);

export default router;
