import { Router } from "express";
import {
  order,
  fetchDataByStatus,
  sendToretailer,
  getOrderDetails,
  changeOrderStatus,
} from "../controllers/order.controller.js";
import { schoolAdd, school } from "../controllers/school.controller.js";
import { category, categoryAdd } from "../controllers/category.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { general_products } from "../controllers/general_product.controller.js";
import {
  product,
  productByCategoryId,
  productByproductId,
  productAdd,
  getProductDetails,
  generalProductAdd,
} from "../controllers/product.controller.js";

import {
  ImageUPloader,
  imageDelete,
} from "../controllers/upload.controller.js";
import { getUserDetails } from "../controllers/user.controller.js";
import { notification } from "../controllers/notification.controllers.js";
import { getRetailer } from "../controllers/retailer.controller.js";
import { productAdd2 } from "../controllers/product2.controller.js";

const router = Router();
router.route("/category").post(category);
router.route("/addcategory").post(upload.single("Image"), categoryAdd);

router.route("/school").post(school);
router.route("/addschool").post(schoolAdd);

router.route("/product").post(product);
router.route("/product/categoryId").post(productByCategoryId);
router.route("/product/c/:productId").post(productByproductId);
router.route("/addproduct").post(productAdd);
router.route("/addproduct2").post(productAdd2);

router.route("/addgeneralproduct").post(generalProductAdd);

router.route("/generalPoducts").post(general_products);

router.route("/orders").post(order);
router.route("/orders/readOne").post(getOrderDetails);
router.route("/orders/c/:/status").post(fetchDataByStatus);
router.route("/orders/sendtoretailer").post(sendToretailer);
router.route("/orders/changeOrderStatus").post(changeOrderStatus);

// routes for image upload and delete
router.route("/imageupload").post(upload.single("Image"), ImageUPloader);
router.route("/imageDelete").post(imageDelete);

router.route("/user/readOne").post(getUserDetails);
router.route("/product/readOne").post(getProductDetails);

router.route("/notification").post(notification);

router.route("/getretailer").post(getRetailer);

export default router;
