import { apiError } from "../utils/apiError.js";


class productModel {
  constructor({
    city,
    productId,
    name,
    description,
    deliveryCharge,
    categoryId,
    classId,
    board,
    // set = [],
    retailerId = "",
    // stream = [],
    variation = {},
  }) {
    if (!name) {
      throw new apiError(400, "Product name is required");
    }
    if (!productId) {
      throw new apiError(400, "Product Id is required");
    }
    if (!description) {
      throw new apiError(400, "description is required");
    }

    // if(!stockQuantity){
    //     throw new apiError(400,"stock quantity is required");
    // }
    if (!categoryId) {
      throw new apiError(400, "categoryId is required");
    }

    this.city = city;
    this.productId = productId;
    this.name = name;
    this.description = description;
    this.categoryId = categoryId;
    this.classId = classId;
    this.board = board;
    this.retailerId = retailerId;
    this.deliveryCharge = deliveryCharge;
    this.reviewList = [];
    this.variation = variation;
  }
  toJSON() {
    return {
      retailerId: this.retailerId,
      city: this.city,
      productId: this.productId,
      name: this.name,
      description: this.description,
      categoryId: this.categoryId,
      classId: this.classId,
      board: this.board,
      retailerId: this.retailerId,
      reviewIdList: this.reviewList,
      variation: this.variation,
      deliveryCharge: this.deliveryCharge,
    };
  }
  addReviewList(reviewId) {
    this.reviewList.push(reviewId);
  }
  
}
export { productModel };
