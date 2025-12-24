import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiQuueryResponse, apiResponse } from "../utils/apiResponse.js";
import { app } from "../firebase.js";
import {
  collection,
  query,
  doc,
  getDocs,
  where,
  updateDoc,
  orderBy,
  getDoc,
  and,
} from "firebase/firestore";
import { notification } from "../utils/notifications.js";

const order = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;

    const startAt = (page - 1) * pageSize;
    const endAt = startAt + pageSize;

    const city = req.query.city || null;
    const status = req.query.status || null;
    const retailerId = req.query.retailerId || null;
    
    console.log("city",city, "status :", status,"retailerId : ", retailerId);
   let q = query(
     collection(app, "orderDetails"),
    //  and(
      ...(city ? [where("address.city", "==", city)] : []),
     ...(status ? [where("status", "==", status)] : []),
     ...(retailerId ? [where("retailerId", "==", retailerId)] : []),
    //  ),
     orderBy("orderDate", "desc")
   );


   console.log("q", q);

    const snapshot = await getDocs(
      q
    );

    const totalItems = snapshot.docs.length;

    const data = snapshot.docs.slice(startAt, endAt).map((doc) => doc.data());

    // for each data in the array, get the user details from "userDetails" table and append it to the data

    // for (let i = 0; i < data.length; i++) {
      // const userSnapshot = await getDocs(
      //   query(collection(app, "userDetails"), where("uid", "==", data[i].userId))
      // );
      // data[i].userDetails = userSnapshot.docs.map((doc) => doc.data())[0];
      // const retailerSnapshot = await getDocs(
      //   query(
      //     collection(app, "retailer"),
      //     where("id", "==", data[i].retailerId)
      //   )
      // );
      //   data[i].retailerDetails = retailerSnapshot.docs.map((doc) => doc.data())[0];
    // }

    if (data.length > 0) {
      res
        .status(200)
        .json(
          new apiQuueryResponse(
            200,
            page,
            pageSize,
            totalItems,
            Math.ceil(totalItems / pageSize),
            data,
            "Data sent successfully"
          )
        );
    } else {
      res.status(200).json(new apiResponse(200, {}, "No data found"));
    }
  } catch (error) {
    throw new apiError(400, error);
  }
});

const fetchDataByStatus = asyncHandler(async (req, res) => {
  const { status } = req.params;
  try {
    const q = query(
      collection(app, "orderDetails"),
      where("status", "==", status)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      res
        .status(200)
        .json(new apiResponse(200, {}, "No data found for this status"));
    } else {
      const data = snapshot.docs.map((doc) => doc.data());
      res
        .status(200)
        .json(new apiResponse(200, data, "Data sent successfully"));
    }
  } catch (error) {
    throw new apiError(400, error);
  }
});

const updateOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.param;
  if (orderId) {
    throw new apiError(400, "Order id is required");
  }
  try {
    const docRef = doc(app, "orderDetail", orderId);
    const updated_data = await updateDoc(docRef, {
      satus: "Cancelled",
    });
    res
      .status(200)
      .json(new apiResponse(200, updated_data, "data send succesfully"));
  } catch (error) {
    throw new apiError(400, "Error:", error);
  }
});

const sendToretailer = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { orderId, retailerId ,productId,set,stream } = req.body;
  if (!orderId || !retailerId) {
    throw new apiError(400, "Order id and retailerId is required");
  }
  try {
    const docRef = doc(app, "orderDetails", orderId)
    const updated_data = await updateDoc(docRef, {
        retailerId:retailerId ,
        status:"Processed",
    });

    const productRef = doc(app, "product", productId)
    //update the product such that productRef[set][stream].sku-=1;
    const productSnapshot = await getDoc(productRef);
    const productData = productSnapshot.data();
    const updatedVariation = productData[set][stream].sku -= 1;

    const updated_product = await updateDoc(productRef, {
      variation: updatedVariation,
    });

    // notification("testing notificatin", "juTtklcvlVOr3qr1dWGfP6yA7Y23");
    res
      .status(200)
      .json(new apiResponse(200, updated_data, "data send succesfully"));
    // res.status(200).json(new apiResponse(200, updated_data, "data send succesfully"));
  } catch (error) {
    throw new apiError(400, "Error:", error);
  }
});

const getOrderDetails = asyncHandler(async (req, res) => {
  const { orderId } = req.body;
  const snapshot = await getDocs(
    query(collection(app, "orderDetails"), where("orderId", "==", orderId))
  );
  if (!snapshot) {
    new apiError(404, "No Product found with this id");
  }
  const data = snapshot.docs.map((doc) => doc.data());
  res.status(200).json(new apiResponse(200, data, "data send successfully"));
});

const changeOrderStatus = asyncHandler(async (req, res) => {
    const { orderId, status } = req.body;
    if (!orderId || !status) {
        throw new apiError(400, "Order id and status is required");
    }
    try {
        const docRef = doc(app, "orderDetails", orderId);
        const updated_data = await updateDoc(docRef, {
        status: status,
        });
        res
        .status(200)
        .json(new apiResponse(200, updated_data, "data send succesfully"));
    } catch (error) {
        throw new apiError(400, "Error:", error);
    }
    });


export {
  order,
  fetchDataByStatus,
  updateOrder,
  sendToretailer,
  getOrderDetails,
  changeOrderStatus,
};
