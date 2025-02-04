import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/orebiSlice";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [productDetail, setProduct] = useState({});
  let [id_variant,setId_variant]=useState('')
  let [id_color,setId_color]=useState('')
  let [id_size,setId_size]=useState('')
  // let vari=productDetail.variants[0].id_product_variants
  //let [id_variant,setId_variant] = useState(productDetail.variants[0].id_product_variants)
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://matkinhcaolo.io.vn/api/product/${id}`
      );
      console.log(response);
      setProduct(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    
    fetchData();
    // productDetail.variants?.map((item)=>(
    //   setId_variant(item.variants.id_product_variants)
    // ))
    //setId_variant(productDetail.variant?.at(0).id_product_variants)
  }, [id]);
  //console.log({ id });
  console.log(productDetail)
  //console.log(productDetail.variants[0])

  return (
    
    <div className="container mx-auto px-4">
    <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center">
      <div className="flex flex-col gap-6 lg:w-2/4">
        <img
          src={productDetail.avt_product}
          alt=""
          className="w-full h-full aspect-square object-cover rounded-xl"
        />     
      </div>
      {/* ABOUT */}
      
      <div className="flex flex-col gap-4 lg:w-2/4">
      <p className="text-[#767676] text-[14px]">
                  {productDetail._category}
                </p>
        <div>
          <span className=" text-violet-600 font-semibold"> </span>
          <h1 className="text-3xl font-bold">{productDetail.name_product}</h1>
        </div>
        <p className="text-gray-700">{productDetail.desc_product}</p>
        <div className="flex item-center">
        <h6 className="text-2xl mr-5  font-semibold">
          {productDetail.sellprice_product} VND
        </h6>
          {/* <p class="mr-2 text-lg font-semibold ">$20.00</p> */}
      <p class="text-base font-medium text-gray-500 line-through dark:text-gray-500">{productDetail.price_product} VND</p>
        </div>
        
        <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
          
          <div class="flex  ml-6 items-center">
            <span class="mr-3">Color & Size</span>
            <div className="relative">
            <select class="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10"
            onChange={(e)=>(
              setId_variant(e.target.value)
            )}
            defaultValue={1}
            >
              {/* <option hidden></option> */}
                {productDetail.variants?.map((variant,index)=>(
                 <option key={index} value={variant.id_product_variants} > {variant.color.desc_color} {variant.size.desc_size}</option>
                ))}

              </select>
              <p>{id_variant}</p>
              <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>       
          </div>
        </div>
        <div className="flex flex-row items-center gap-12">
     
          <button
            onClick={() =>
             {
              let item=productDetail.variants.find((item)=>(
              item.id_product_variants==={id_variant}.id_variant
            ))
            console.log(item)
            // setId_color(item.color.desc_color);
            // setId_size(item.size.desc_size);
            // console.log(`${id_color} ${id_color}`)
            //console.log({id_variant}.id_variant)
              dispatch(
                addToCart({
                  id_product: productDetail.id_product,
                  name_product: productDetail.name_product,
                  quantity: 1,
                  avt_product: productDetail.avt_product,
                  price_product:productDetail.price_product,
                  sellprice_product: productDetail.sellprice_product,
                  id_variant: {id_variant},
                  //color: productDetail.variant.color.desc_color,
                })
              )
            }}
            className="bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full"
          >
            Add to Cart
          </button>
        </div>
       </div>
    </div>
<ProductInfo/>
    </div>
  );
};

export default ProductDetails;
