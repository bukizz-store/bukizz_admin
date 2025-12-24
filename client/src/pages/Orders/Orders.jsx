import { Button, Img, Text } from "components";
import Model from "components/Model/Model";
import Pagination from "components/Pagination/Pagination";
import SearchBar from "components/SearchBar/SearchBar";
import TableViewer from "components/TableViewer/TableViewer";
import AddCategories from "pages/Categories/AddCategories";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchApi } from "utils/fetchApi";
import { Toast } from "utils/swal";
// import UpdateSchools from './UpdateSchools';

function Orders() {
  const [showAddSchoolsForm, setShowAddSchoolForm] = useState(false);
  const [ordersData, setOrdersData] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");
  const [retailerId, setRetailerId] = useState("");
  const [totalPages, setTotalPage] = useState(0);
  const handleSort = () => {};
  

  useEffect(() => {
    if (!showAddSchoolsForm) {
      getData();
    }
  }, [showAddSchoolsForm, limit, page,city,status,retailerId]);

  const getData = async () => {
    try {
      const query = `page=${page}&limit=${limit}&city=${city}&status=${status}&retailerId=${retailerId}`;
      // const query = `page=${page}&limit=${limit}`;
      const resp = await fetchApi(`/v1/admin/orders?${query}`);
      console.log(resp);
      if (resp.success ) {
        setTotalPage(resp.totalPages);
        if( resp.message === "Data sent successfully"){

          setOrdersData(resp.data);
        }
        else {
          setOrdersData([]);
        }
        // Toast.fire({
        //     icon: "success",
        //     title: "Data fetched successfully",
        // });
        setLoading(false);
      }
    } catch (error) {
      console.log("error in fetching data", error);
      Toast.fire({
        icon: "error",
        title: "Mobile already linked with other account",
      });
    }
  };

  if (showAddSchoolsForm) {
    // return <UpdateSchools data={schoolData} showModel={setShowAddSchoolForm} />
  }
  return (
    <div className="bg-gray-50_01 flex sm:flex-col md:flex-col flex-row font-gilroy gap-[30px] items-start mx-auto w-full">
      <div className="flex-1 sm:h-[1056px]  md:mt-0 mt-6 md:px-5 relative w-full">
        <div className="absolute flex flex-col gap-6 inset-x-[0] items-center justify-start mx-auto top-[1%] w-full">
          <div className="flex flex-row md:gap-10 items-end justify-between w-full">
            <Text
              className="mb-[5px] mt-4 sm:text-2xl md:text-[26px] text-[28px] text-blue_gray-900"
              size="txtGilroySemiBold28"
            >
              Orders
            </Text>
            <div className="    ">
              <Button
                className="cursor-pointer font-medium min-w-[161px] rounded-md text-base text-center"
                color="blue_A700_01"
                size="lg"
                variant="fill"
                onClick={() => {
                  setShowAddSchoolForm(true);
                }}
              >
                Add Schools
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-[30px] items-start justify-start w-[98%] md:w-full">
            <SearchBar
              setQuery={setQuery}
              query={query}
              placeholder="Type something to search"
              setCityOpt={setCity}
              handleSort={handleSort}
            />
            <TableViewer
              heading={[
                "Sr.No",
                "Order Date",
                "Name of the school",
                "Customer Name",
                "Retailer Name",
                "orderName",
                "saleAmount",
                "status",
                "cartLength",
              ]}
              loading={loading}
            >
              {(ordersData != {}) ?(
                <Row
                  data={ordersData}
                  setSingleSchool={setOrdersData}
                  setShowAddSchoolForm={setShowAddSchoolForm}
                  page={page}
                  limit={limit}
                  //   fetchData={fetchData}
                />
              ):(
                <></>)}

            </TableViewer>
            <Pagination
              page={page}
              setPage={setPage}
              totalPage={totalPages}
              limit={limit}
              setLimit={setLimit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;

const Row = ({
  data = [],
  setSingleSchool = () => {},
  setShowAddSchoolForm = () => {},
  page = 1,
  limit = 1,
}) => {
  const navigate = useNavigate();
  const handleClick = (el) => {
    setSingleSchool(el);
    setShowAddSchoolForm(true);
  };
  console.log("data", data);

  const getDate = (timestamp) => {
    const date = new Date(timestamp);

    // Get the day, month, and year
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month starts from 0
    const year = date.getFullYear();

    // Concatenate day, month, and year with the desired format
    return `${day}-${month}-${year}`;
  };
  return (
    <>
      { data.map((el, index) => (
        <tr
          key={index}
          onClick={() => {
            navigate(`/orderDetails`, { state: el });
          }}
        >
          <td key={"sl.no"}>{(page - 1) * limit + index + 1}</td>
          {/* <td> <Img
                        className="h-[60px] md:h-auto object-cover rounded-[3px] w-[60px]"
                        src={el.logo || el.image}
                        alt={`${el.name}'s Logo`}
                    />
                    </td> */}
          <td key={"orderDate"}>{getDate(el.orderDate)}</td>
          <td key={"SchoolName"}>
            {el.cartData && Object.keys(el.cartData)[0]}
          </td>

          <td key={"CustomerName"}>{el.address?.name}</td>
          <td key={"RetailerName"}>{el.retailerDetails?.name}</td>
          <td key={"orderName"}>{el.orderName}</td>
          <td key={"saleAmount"}>{el.saleAmount}</td>
          <td key={"status"}>{el.status}</td>
          <td key={"cartlength"}>{el.cartLength}</td>
        </tr>
      ))}
    </>
  );
};
