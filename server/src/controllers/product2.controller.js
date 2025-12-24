import { app } from "../firebase.js";
import {
  doc,
  collection,
  query,
  updateDoc,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { productModel } from "../models/product2.model.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";

const productAdd2 = asyncHandler(async (req, res) => {
  console.log(req.body);
  const {
    productId,
    name,
    retailerId,
    description,
    categoryId,
    classId,
    board,
    city,
    variation,
    deliveryCharge,
  } = req.body;
  if (!(productId, name, description, board)) {
    throw new apiError(400, "All fields required");
  }
  if (!categoryId) {
    throw new apiError(400, "category Id is required");
  }
  if (!classId) {
    throw new apiError(400, "classId is required");
  }

  const new_product1 = new productModel({
    city,
    productId,
    name,
    description,
    categoryId,
    classId,
    board,
    // set,
    retailerId,
    // stream,
    variation,
    deliveryCharge,
  });
  console.log(new_product1);

  const resp = await addDoc(collection(app, "test"), new_product1.toJSON());
  console.log(resp.id);
  // res.status(200).json(new apiResponse(200,"new_product1","data stored successfully"));
  res
    .status(200)
    .json(new apiResponse(200, new_product1, "data stored successfully"));
});

export { productAdd2 };
