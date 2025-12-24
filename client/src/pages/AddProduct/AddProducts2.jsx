import React, { useEffect, useState } from "react";
import { Button, Img, Input, SelectBox, Text } from "components";

import { CloseSVG } from "../../assets/images";
import ImageUpload from "components/ImageUpload/ImageUpload";
import ArrayInput from "components/ArrayInput/ArrayInput";
import { Toast } from "utils/swal";
import { axiosApi, fetchApi, fetchApi2 } from "utils/fetchApi";
import { useLocation } from "react-router-dom";

function AddProduct({}) {
  const { state } = useLocation();
  console.log("state ", state);
  const [category, setCategory] = useState([]);
  const [retailers, setRetailers] = useState([]);
    const [variants, setVariants] = useState({});
  const [formData, setFormData] = useState({
    city: state?.city || [],
    productId: state?.productId || "",
    name: state?.name || "",
    description: state?.description || "",
    categoryId: state?.categoryId || "",
    classId: state?.classId || "",
    board: state?.board || "CBSE",
    retailerId: state?.retailerId || "",
    stream: state?.stream ? state.stream.map((element) => element.name) : [],
    set: state?.set ? state.set.map((element) => element.name) : [],
    reviewList: state?.reviewList || [],
    variation: state?.variation || {},
    deliveryCharge: 0,
  });
  const fetchRetailers = async () => {
    try {
      const resp = await fetchApi("/v1/admin/getretailer");
      if (resp.success) {
        console.log(resp.data);
        setRetailers(resp.data);
      } else {
        console.error("Error fetching retailers:", resp.error);
        Toast.fire({
          icon: "error",
          title: "Failed to fetch retailers",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Toast.fire({
        icon: "error",
        title: "An error occurred",
      });
    }
  };

  const fetchCategory = async () => {
    try {
      const resp = await fetchApi("/v1/admin/category");
      if (resp.success) {
        // console.log(resp.data);
        setCategory(resp.data);
      } else {
        console.error("Error fetching category:", resp.error);
        Toast.fire({
          icon: "error",
          title: "Failed to fetch category",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Toast.fire({
        icon: "error",
        title: "An error occurred",
      });
    }
  };
  useEffect(() => {
    fetchCategory();
    fetchRetailers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    
    console.log(formData);
  };
  const handleSubmit = async () => {
    // Basic form validation
    if (
      !formData.productId ||
      !formData.name ||
      !formData.categoryId ||
      !formData.classId ||
      !formData.retailerId
    ) {
      Toast.fire({
        icon: "error",
        title: "Please fill all fields",
      });
      return;
    }

    try {
      // Make API call to add the product
      const resp = await fetchApi2("/v1/admin/addproduct2", formData);
      if (resp.success) {
        // Product added successfully
        console.log("Product added successfully:", resp.data);
        Toast.fire({
          icon: "success",
          title: "Product added successfully",
        });

        // Optionally update the UI with the new product data
        // Update the UI optimistically
        // For example, you can reset the form fields or show a success message
        // setFormData({
        //     city: [],
        //     productId: "",
        //     name: "",
        //     description: "",
        //     categoryId: "",
        //     classId: "",
        //     board: "cbse",
        //     retailerId: "",
        //     stream: [],
        //     set: [],
        //     reviewList: [],
        //     variation: "",
        // });
      } else {
        // Handle API errors
        console.error("Error adding product:", resp.error);
        Toast.fire({
          icon: "error",
          title: "Failed to add product",
        });
      }
    } catch (error) {
      // Handle fetch API errors
      console.error("Error:", error);
      Toast.fire({
        icon: "error",
        title: "An error occurred",
      });
    }
  };

  return (
    <>
      <div className="flex flex-1 flex-col gap-[34px] items-center justify-start md:mt-0 mt-[59px] w-full py-8">
        <Text
          className="md:text-3xl sm:text-[28px] text-[32px] text-blue_gray-900"
          size="txtGilroySemiBold32"
        >
          Add Product
        </Text>
        <div className="flex flex-col gap-4 items-center justify-start w-[50%]">
          <div className="flex flex-col gap-1 items-start justify-start w-full sm:w-full">
            <div className="flex flex-col items-start justify-end pr-1 py-1 w-full">
              <Text
                className="text-blue_gray-900 text-lg"
                size="txtGilroyMedium18"
              >
                Product Name :
              </Text>
            </div>
            <Input
              name="name"
              placeholder="Enter Your Product Name"
              className="font-medium md:h-auto p-0 placeholder:text-blue_gray-300 sm:h-auto text-base text-left w-full"
              wrapClassName="border border-blue_gray-100 border-solid rounded-lg w-full"
              type="text"
              value={formData?.name}
              onChange={handleChange}
            ></Input>
          </div>
          <div className="flex flex-col items-center justify-start w-full">
            <div className="flex flex-col items-start justify-end pr-1 py-1 w-full">
              <Text
                className="text-blue_gray-900 text-lg"
                size="txtGilroyMedium18"
              >
                Product Id :
              </Text>
            </div>
            <Input
              name="productId"
              placeholder="Enter Product Id"
              className="font-medium md:h-auto p-0 placeholder:text-blue_gray-300 sm:h-auto text-base text-left w-full"
              wrapClassName="border border-blue_gray-100 border-solid mt-1 rounded-lg w-full"
              type="text"
              value={formData.productId}
              onChange={handleChange}
            ></Input>
          </div>
          <div className="flex flex-col items-center justify-start w-full">
            <div className="flex flex-col items-start justify-end pr-1 py-1 w-full">
              <Text
                className="text-blue_gray-900 text-lg"
                size="txtGilroyMedium18"
              >
                City :
              </Text>
            </div>
            <ArrayInput
              name="city"
              placeholder="Add city"
              className="font-medium md:h-auto p-0 placeholder:text-blue_gray-300 sm:h-auto text-base text-left w-full"
              wrapClassName="border border-blue_gray-100 border-solid mt-1 rounded-lg w-full"
              type="text"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col items-center justify-start w-full">
            <div className="flex flex-col items-start justify-end pr-1 py-1 w-full">
              <Text
                className="text-blue_gray-900 text-lg"
                size="txtGilroyMedium18"
              >
                Class Id :
              </Text>
            </div>
            <Input
              name="classId"
              placeholder="Enter Class Id"
              className="font-medium md:h-auto p-0 placeholder:text-blue_gray-300 sm:h-auto text-base text-left w-full"
              wrapClassName="border border-blue_gray-100 border-solid mt-1 rounded-lg w-full"
              type="text"
              value={formData.classId}
              onChange={handleChange}
            ></Input>
          </div>
          <div className="flex flex-col items-center justify-start w-full">
            <div className="flex flex-col items-start justify-end pr-1 py-1 w-full">
              <Text
                className="text-blue_gray-900 text-lg"
                size="txtGilroyMedium18"
              >
                Delivery Charge:
              </Text>
            </div>
            <Input
              name="deliveryCharge"
              placeholder="Enter deliveryCharge"
              className="font-medium md:h-auto p-0 placeholder:text-blue_gray-300 sm:h-auto text-base text-left w-full"
              wrapClassName="border border-blue_gray-100 border-solid mt-1 rounded-lg w-full"
              type="number"
              value={formData.deliveryCharge}
              onChange={handleChange}
            ></Input>
          </div>
          <div className="flex flex-col items-center justify-start w-full">
            <div className="flex flex-col items-start justify-end pr-1 py-1 w-full">
              <Text
                className="text-blue_gray-900 text-lg"
                size="txtGilroyMedium18"
              >
                Board
              </Text>
              <SelectBox
                className="font-bold   text-blue-A700_01 text-left text-lg sm:w-full"
                placeholderClassName="text-blue-A700_01"
                indicator={
                  <Img
                    className="h-6 mr-[0] w-6"
                    src="images/img_arrowdown_blue_A701.svg"
                    alt="arrow_down"
                  />
                }
                isMulti={false}
                name="board"
                options={[
                  { label: "CBSE", value: "CBSE" },
                  { label: "ICSE", value: "ICSE" },
                ]}
                isSearchable={false}
                placeholder="Select board"
                value={formData.board}
                onChange={(data) => {
                  handleChange({ target: { name: "board", value: data } });
                }}
                size="xs"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-start w-full">
            <div className="flex flex-col items-start justify-end pr-1 py-1 w-full">
              <Text
                className="text-blue_gray-900 text-lg"
                size="txtGilroyMedium18"
              >
                Category Id
              </Text>
              <SelectBox
                className="font-bold   text-blue-A700_01 text-left text-lg w-[50%]"
                placeholderClassName="text-blue-A700_01"
                indicator={
                  <Img
                    className="h-6 mr-[0] w-6"
                    src="images/img_arrowdown_blue_A701.svg"
                    alt="arrow_down"
                  />
                }
                isMulti={false}
                name="categoryId"
                options={category.map((cat) => {
                  return {
                    label: cat.name + " : " + cat.categoryId,
                    value: cat.categoryId,
                  };
                })}
                isSearchable={false}
                placeholder="Select Category Id"
                value={formData.categoryId}
                onChange={(data) => {
                  handleChange({ target: { name: "categoryId", value: data } });
                }}
                size="xs"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-start w-full">
            <div className="flex flex-col items-start justify-end pr-1 py-1 w-full">
              <Text
                className="text-blue_gray-900 text-lg"
                size="txtGilroyMedium18"
              >
                Retailer Id
              </Text>
              <SelectBox
                className="font-bold   text-blue-A700_01 text-left text-lg w-[50%]"
                placeholderClassName="text-blue-A700_01"
                indicator={
                  <Img
                    className="h-6 mr-[0] w-6"
                    src="images/img_arrowdown_blue_A701.svg"
                    alt="arrow_down"
                  />
                }
                isMulti={false}
                name="retailerId"
                options={
                  retailers &&
                  retailers.map((retailer) => {
                    return {
                      label: retailer.name + " : ( " + retailer.schools + " )",
                      value: retailer.id,
                    };
                  })
                }
                isSearchable={false}
                placeholder="Select RetailerId"
                value={formData.retailerId}
                onChange={(data) => {
                  handleChange({ target: { name: "retailerId", value: data } });
                }}
                size="xs"
              />
            </div>
          </div>
          {/* <div className="flex flex-col items-center justify-start w-full">
            <div className="flex flex-col items-start justify-end pr-1 py-1 w-full">
              <Text
                className="text-blue_gray-900 text-lg"
                size="txtGilroyMedium18"
              >
                Set :
              </Text>
            </div>
            <ArrayInput
              name="set"
              placeholder="Add set"
              className="font-medium md:h-auto p-0 placeholder:text-blue_gray-300 sm:h-auto text-base text-left w-full"
              wrapClassName="border border-blue_gray-100 border-solid mt-1 rounded-lg w-full"
              type="text"
              value={formData.set}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col items-center justify-start w-full">
            <div className="flex flex-col items-start justify-end pr-1 py-1 w-full">
              <Text
                className="text-blue_gray-900 text-lg"
                size="txtGilroyMedium18"
              >
                Stream :
              </Text>
            </div>
            <ArrayInput
              name="stream"
              placeholder="Add stream"
              className="font-medium md:h-auto p-0 placeholder:text-blue_gray-300 sm:h-auto text-base text-left w-full"
              wrapClassName="border border-blue_gray-100 border-solid mt-1 rounded-lg w-full"
              type="text"
              value={formData.stream}
              onChange={handleChange}
            />
          </div> */}

          <div className="flex flex-col items-center justify-start w-full">
            <div className="flex flex-col items-start justify-end pr-1 py-1 w-full">
                <Text
                    className="text-blue_gray-900 text-lg"
                    size="txtGilroyMedium18"
                >
                    Variants :
                </Text>

            </div>
            <Variants
                name="variation"
                value={formData.variation}
                set={formData.set}
                stream={formData.stream}
                onChange={handleChange}
                className="font-medium md:h-auto p-0 placeholder:text-blue_gray-300 sm:h-auto text-base text-left w-full"
                wrapClassName="border border-blue_gray-100 border-solid mt-1 rounded-lg w-full"
            />

            </div>
          <div className="flex flex-col items-center justify-start w-full">
            <div className="flex flex-col items-start justify-end pr-1 py-1 w-full">
              <Text
                className="text-blue_gray-900 text-lg"
                size="txtGilroyMedium18"
              >
                Variation :
              </Text>
            </div>
            <Variatiion
              name="variation"
              value={formData.variation}
              onChange={handleChange}
              className="font-medium md:h-auto p-0 placeholder:text-blue_gray-300 sm:h-auto text-base text-left w-full"
              wrapClassName="border border-blue_gray-100 border-solid mt-1 rounded-lg w-full"
            />
          </div>

          <div className="flex flex-col items-center justify-start w-full">
            <div className="flex flex-col items-start justify-end pr-1 py-1 w-full">
              <Text
                className="text-blue_gray-900 text-lg"
                size="txtGilroyMedium18"
              >
                description :
              </Text>
            </div>
            <div className="border border-blue_gray-100 border-solid mt-1 rounded-lg w-full">
              <textarea
                name="description"
                placeholder="Enter aboutUs"
                className="font-medium md:h-auto p-0 placeholder:text-blue_gray-300 sm:h-auto text-base text-left w-full border-0"
                rows={4}
                type="textarea"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <Button
            className="cursor-pointer font-medium min-w-[161px] rounded-md text-base text-center"
            color="blue_A700_01"
            size="lg"
            variant="fill"
            onClick={() => handleSubmit()}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}

export default AddProduct;

const Variants = ({wrapClassName,value,onChange=()=>{},  ...props }) => {
    
    const [variation, setVariation] = useState(value || {});
    const [variants, setVariants] = useState([]);
    const [showAddVariant, setShowAddVariant] = useState(false);
    const [tempVariants, setTempVariants] = useState({name:"",value:[]});

    const handletempVariants = (e) => {

        const { name, value } = e.target;
        setTempVariants((prevData) => ({ ...prevData, [name]: value }));
    }

    const handleAddVariant = () => {
        console.log(tempVariants);
        setShowAddVariant(false);
        variants.push(tempVariants);
        var tempJson = {};
        if(tempVariants.value.length==0 || tempVariants.name==""){
            return;
        }
        tempVariants.value.forEach((element) => {
            tempJson[`${tempVariants.name}-${element}`] = defaultVariationData();
        });
        // console.log(tempJson);
        var tvariation =addInVariation(variation,tempJson);
        console.log("tvariation : " ,tvariation);
        setVariation(tvariation);
        setVariants(variants);
        setTempVariants({name:"",value:[]});
        onChange({ target: { name: "variation", value: tvariation } });
    }

    const addInVariation = (tempvar, tempJson) => {
      
      if (
        !tempvar ||
        Object.keys(tempvar).length === 0 ||
        isDefaultVariationData(tempvar)
      ) {
        return tempJson;
      }

      
      const updatedObject = {};
      console.log("temp var : ",tempvar);
      
      Object.keys(tempvar).forEach((key) => {
        
        const updatedValue = addInVariation(tempvar[key], tempJson);
        
        updatedObject[key] = updatedValue;
      });

      return updatedObject;
    };



    return (
      <div className={`${wrapClassName} px-3.5`}>
        <div className="flex flex-col  justify-start w-full">
          {variants.map((variant, index) => (
            <div key={index}>
              <Text
                className="text-blue_gray-900 font-bold"
                size="txtGilroyMedium18"
              >
                {variant.name} :
              </Text>
              <div className="flex items-center gap-3">
                {variant.value.map((value, index) => (
                  <div
                    key={index}
                    className="flex rounded shadow-sm border-2
                "
                  >
                    <Text
                      className="text-blue_gray-900 text-lg"
                      size="txtGilroyMedium18"
                    >
                      {value}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <hr />
        {showAddVariant ? (
          <div
            className={`${wrapClassName} ${
              showAddVariant ? "flex" : "hidden"
            } flex-row px-7`}
          >
            <div className={`flex  flex-col items-center justify-start w-full`}>
              <div
                className={`flex  flex-col items-center justify-start w-full`}
              >
                <div className="flex flex-col items-start justify-end pr-1 py-1 w-full">
                  <Text
                    className="text-blue_gray-900 text-lg"
                    size="txtGilroyMedium18"
                  >
                    Name :
                  </Text>
                </div>
                <Input
                  name="name"
                  placeholder="Enter Class Id"
                  className="font-medium md:h-auto p-0 placeholder:text-blue_gray-300 sm:h-auto text-base text-left w-full"
                  wrapClassName="border border-blue_gray-100 border-solid mt-1 rounded-lg w-full"
                  type="text"
                  value={tempVariants.name}
                  onChange={handletempVariants}
                ></Input>
              </div>
              <div className="flex flex-col items-center justify-start w-full">
                <div className="flex flex-col items-start justify-end pr-1 py-1 w-full">
                  <Text
                    className="text-blue_gray-900 text-lg"
                    size="txtGilroyMedium18"
                  >
                    Value :
                  </Text>
                </div>
                <ArrayInput
                  name="value"
                  placeholder="Add value"
                  className="font-medium md:h-auto p-0 placeholder:text-blue_gray-300 sm:h-auto text-base text-left w-full"
                  wrapClassName="border border-blue_gray-100 border-solid mt-1 rounded-lg w-full"
                  type="text"
                  value={tempVariants.value}
                  onChange={handletempVariants}
                />
              </div>
              <Button
                className="cursor-pointer font-medium min-w-[100px] rounded-md text-base text-center"
                color="blue_A700_01"
                size="lg"
                variant="fill"
                onClick={handleAddVariant}
              >
                Add
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            {variants.length < 3 ? (
              <Text
                className="text-lg cursor-pointer text-blue-600"
                size="txtGilroyMedium18"
                onClick={() => setShowAddVariant(true)}
              >
                + Add Variant
              </Text>
            ) : null}
          </div>
        )}
      </div>
    );
};

const Variatiion = ({ name,value , wrapClassName, onChange = () => {}, ...props }) => {
    const handleVariationChange = (updatedValue) => {
        onChange({ target: { name, value: updatedValue } });
    };

    return (
        <div className={`${wrapClassName} px-3.5`}>
            <div className="flex flex-col  justify-start w-full">
            {Object.keys(value).map((key1) => {
                
                
                return (
                  <div key={key1} >
                    <Text
                      className="text-blue_gray-900 font-bold"
                      size="txtGilroyMedium18"
                    >
                      {key1.split("-")[1]} :
                    </Text>
                    {
                    isDefaultVariationData(value[key1])? (
                      <VariationDataInput
                      value={value[key1]}
                                    onChange={(updatedData) => {
                                        handleVariationChange({ ...value, [key1]: updatedData });
                                    }} />
                    ) : (
                      <div className={`${wrapClassName} px-3.5`}>
                        {Object.keys(value[key1]).map((key2) => {
                          return (
                            <div key={key2}>
                              <Text
                                className="text-blue_gray-900 font-bold"
                                size="txtGilroyMedium18"
                              >
                                {key2.split("-")[1]} :
                              </Text>
                              {isDefaultVariationData(value[key1][key2]) ? (
                                <VariationDataInput
                                  value={value[key1][key2]}
                                  onChange={(updatedData) => {
                                    handleVariationChange({
                                      ...value,
                                      [key1]: {
                                        ...value[key1],
                                        [key2]: updatedData,
                                      },
                                    });
                                  }}
                                />
                              ) : (
                                <div className={`${wrapClassName} px-3.5`}>
                                  {Object.keys(value[key1][key2]).map(
                                    (key3) => {
                                      return (
                                        <div key={key3}>
                                          <Text
                                            className="text-blue_gray-900 font-bold"
                                            size="txtGilroyMedium18"
                                          >
                                            {key3.split("-")[1]} :
                                          </Text>
                                          <VariationDataInput
                                            value={value[key1][key2][key3]}
                                            onChange={(updatedData) => {
                                              handleVariationChange({
                                                ...value,
                                                [key1]: {
                                                  ...value[key1],
                                                  [key2]: {
                                                    ...value[key1][key2],
                                                    [key3]: updatedData,
                                                  },
                                                },
                                              });
                                            }}
                                          />
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );})// first level
            }
            </div>
        </div>
        );
    
};

const VariationDataInput =( {value,onChange=()=>{}})=>{
    const handleInputChange = (name, newValue) => {
      const updatedData = { ...value, [name]: newValue };
      onChange(updatedData);
    };
    return (
      <div>
        <div className="flex items-center gap-3">
          <Input
            name="price"
            placeholder="Enter Price"
            className="font-medium md:h-auto p-0 placeholder:text-blue_gray-300 sm:h-auto text-base text-left w-full"
            wrapClassName="border border-blue_gray-100 border-solid mt-1 rounded-lg w-60"
            type="number"
            value={value.price || 0}
            onChange={(e) => handleInputChange("price", e.target.value)}
          />
          <Input
            name="salePrice"
            placeholder="Enter Sale Price"
            className="font-medium md:h-auto p-0 placeholder:text-blue_gray-300 sm:h-auto text-base text-left w-full"
            wrapClassName="border border-blue_gray-100 border-solid mt-1 rounded-lg w-60"
            type="number"
            value={value.salePrice || 0}
            onChange={(e) => handleInputChange("salePrice", e.target.value)}
          />
          <Input
            name="sku"
            placeholder="Enter sku"
            className="font-medium md:h-auto p-0 placeholder:text-blue_gray-300 sm:h-auto text-base text-left w-full"
            wrapClassName="border border-blue_gray-100 border-solid mt-1 rounded-lg w-60"
            type="number"
            value={value.sku || 0}
            onChange={(e) => handleInputChange("sku", e.target.value)}
          />
          <Input
            name="costPerItem"
            placeholder="Enter cost Per Item"
            className="font-medium md:h-auto p-0 placeholder:text-blue_gray-300 sm:h-auto text-base text-left w-full"
            wrapClassName="border border-blue_gray-100 border-solid mt-1 rounded-lg w-60"
            type="number"
            isFloat={true}
            value={value.costPerItem || 0.0}
            onChange={(e) => {
              // const floatValue = parseInt(e.target.value, 10) + 0.01;
              // if (!isNaN(floatValue)) {
                handleInputChange("costPerItem", e.target.value);
              // } else {
              //   handleInputChange("costPerItem", 0.0);
              // }
            }}
          />
          <ImageUpload
            name="images"
            placeholder="Enter image"
            className="font-medium md:h-auto p-0 placeholder:text-blue_gray-300 sm:h-auto text-base text-left w-60"
            wrapClassName="border border-blue_gray-100 border-solid mt-1 rounded-lg w-full"
            type="file"
            allowMultiple={true}
            value={value.images || []}
            onChange={(e) => handleInputChange("images", e.target.value)}
            uploadPath={`product_image/variation/`}
          />
        </div>
      </div>
    );
}

const defaultVariationData = () => {
  return {
    images: [],
    sku: 0,
    salePrice: 0,
    price: 0,
    costPerItem: 0.0,
  };
};


const isDefaultVariationData = (obj) => {
  return (
    obj &&
    typeof obj === "object" &&
    "images" in obj &&
    "sku" in obj &&
    "salePrice" in obj &&
    "price" in obj &&
    "costPerItem" in obj &&
    Array.isArray(obj.images) &&
    typeof obj.sku === "number" &&
    typeof obj.salePrice === "number" &&
    typeof obj.price === "number" &&
    typeof obj.costPerItem === "number"
  );
};
