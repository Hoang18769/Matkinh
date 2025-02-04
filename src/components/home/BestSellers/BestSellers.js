import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import { Link } from "react-router-dom";
import axios from "axios";
import SampleNextArrow from "../NewArrivals/SampleNextArrow";
import SamplePrevArrow from "../NewArrivals/SamplePrevArrow";

const Bestseller = ({ props }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  const [productShop, setProduct] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://matkinhcaolo.io.vn/api/product"
      );
      console.log(response);
      setProduct(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div id="best_seller" className="w-full pb-20">
      <Heading heading="Sản phẩm bán chạy" />
      <Slider {...settings}>
        {productShop.map((item, index) => (
          <div
            key={index}
            className="hover:scale-105 transition-all duration-300 px-4 my-2"
          >
            <Link to={`/product/${item.id_product}`}>
              <img
                className="px-4 w-full border border-b-0 rounded-t-lg "
                src={item.avt_product}
                alt="productImage"
              />
            </Link>
            <div className="product-item bg-light mb-4">
              <div className="product-img position-relative overflow-hidden"></div>
              <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
                <div className="flex items-center justify-between font-titleFont">
                  <h2 className="text-lg text-primeColor font-bold">
                    {item.name_product}
                  </h2>
                  <div>
                    {item.price_product === item.sellprice_product ? (
                      <>
                        <p className="text-[#767676] text-[16px]">
                          {item.sellprice_product}VND
                        </p>
                        <p class=" invisible text-[14px]"> hidden</p>
                      </>
                    ) : (
                      <div>
                        <p className="text-[#767676] text-[16px]">
                          {item.sellprice_product}VND
                        </p>
                        <p class=" text-gray-500 line-through dark:text-gray-500 text-[14px]">
                          {item.price_product} VND
                        </p>
                      </div>
                    )}
                  </div>{" "}
                </div>
                <div>
                  <p className="text-[#767676] text-[14px]">
                    {item.category.name_category}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Bestseller;
