import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { ProfileList } from "../../constants";
import axios from "axios";
import { list } from "../../constants";
import { status_order_List } from "../../constants";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const Purchase_history = () => {
  const [history, setHistory] = useState([]);
  const [productShop, setProduct] = useState([]);
  const showDetail = useRef();
  const handleDetail = () => {
    console.log();
  };

  var total = [];
  let price = 0;
  let id = localStorage.getItem("id_customer");
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://matkinhcaolo.io.vn/api/customer/${id}/order-history`
      );
      console.log(response);
      setHistory(response.data.orders);
      history.forEach((item) =>
        console.log(
          parseInt(item.total_order),
          total.push(parseInt(item.total_order))
          //total+=parseInt(item.total)
        )
      );

      //   console.log(history)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  total.forEach((item) => (price += item));
  console.log(price);
  const fetchData2 = async () => {
    try {
      const response = await axios.get(
        "https://matkinhcaolo.io.vn/api/product"
      );
      console.log(response);
      setProduct(response.data.results);

      //console.log("product" + productShop)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
    //fetchData2();
  }, []);
  return (
    <div className="w-full flex px-8 py-8 gap-5">
      <div className="w-1/5 ">
        <ul>
          {ProfileList.map(({ id, title, link }) => (
            <NavLink
              key={id}
              to={`/profile/${link}`}
              //state={{ data: location.pathname.split("/")[1] }}
            >
              <li className=" py-5 font-normal hover:font-bold text-center px-4 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect ">
                {title}
              </li>
            </NavLink>
          ))}
        </ul>
      </div>
      <div className="w-4/5 items-center px-8">
        <div className="flex px-8 py-4   bg-[#F5F5F3] rounded-md">
          {list.map((item) => (
            <label className="w-52 py-4  text-center">{item}</label>
          ))}
          <label className="invisible  w-52 py-4 ">hidden</label>
        </div>
        <div className=" ">
          {history.map((item) => (
            <div className=" rounded-md w-full border-b  px-8 items-center ">
              <Menu>
                <div className=" items-center flex justify-between">
                <div className="w-full flex justify-between ">
                <MenuButton className="w-full">
                    <div className="flex py-4 rounded-md  items-center text-center hover:underline underline-offset-[4px] ">
                      <div className="w-52 px-4 py-2 ">{item.id_order}</div>
                      <div className="w-52 px-4 py-2 ">{item.date_order}</div>
                      <div className="w-52 px-4 py-2 ">{item.total_order}</div>
                      {status_order_List.map((items) =>
                        items.id === item.status_order ? (
                          <>
                            <div className="w-52 px-4 py-2 ">{items.desc} </div>
                          </>
                        ) : null
                      )}
                    
                    </div>
                    
                  </MenuButton>
                </div>
                  
                  {item.status_order === 4 ? (
                    <>
                      <div
                        onClick={handleDetail}
                        className="text-center  w-52 hover:bg-[#F5F5F3]"
                      >
                        Đánh giá
                      </div>
                    </>
                  ) : (
                    <div className="invisible w-52">hidden</div>
                  )}
                </div>

                <div className="w-full">
                  <MenuItems
                    anchor="bottom"
                    className="  items-center flex-1   "
                  >
                    <MenuItem className="w-full bg-white">
                      <div className=" ">
                        <>
                          <div className="flex w-full rounded-md justify-between items-center text-center bg-[#F5F5F3]">
                            <div className="invisible w-12 ">a</div>
                            <div className="w-56 border ">Tên sản phẩm</div>
                            <div className="w-44 border ">Màu</div>
                            <div className="w-44 border ">Kích cỡ</div>
                            <div className="w-44 border ">Số lượng</div>
                            <div className="w-44 border ">Giá</div>
                          </div>

                          {item.order_details?.map((item) => (
                            <div
                              id={item.id_order}
                              className="w-full flex justify-between rounded-md items-center text-center border-b px- py-2	"
                            >
                              <img
                                className="w-12 h-12 border"
                                src={item.product.avt_product}
                                alt="productImage"
                              />
                              <div className="align-center px- w-56 border">
                                {item.product.name_product}
                              </div>
                              <div className="px- w-44 border">
                                {item.colors?.map((item) => item.desc_color)}
                              </div>
                              <div className="px- w-44 border">
                                {item.sizes?.map((item) => item.desc_size)}
                              </div>
                              
                              <div className="px- w-44 border">{item.quantity}</div>
                              <div className="px- w-44 border">{item.totalprice}</div>
                            </div>
                          ))}
                        </>
                      </div>
                    </MenuItem>
                  </MenuItems>
                </div>
              </Menu>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Purchase_history;
