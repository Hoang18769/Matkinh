import React,{useState,useEffect} from "react"
import { Link, NavLink, useParams } from "react-router-dom";
import { ProfileList } from "../../constants";
import axios from "axios";
import { list } from "../../constants";
const Purchase_history =()=>{
    const [history, setHistory] =useState([])
    const {id}=useParams()
    const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://matkinhcaolo.io.vn/api/customer/${34}/order-history`
          );
          console.log(response);
          setHistory(response.data.orders);
        //   console.log(history)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      useEffect(()=>{
        fetchData();
      },[])
      return(
        <div className="w-full flex px-8 py-8 gap-5">
        <div className="w-1/5">
            <ul>
            {ProfileList.map(({id,title,link})=>(
                <NavLink
                key={id}
                to={`/profile/${link}`}
                //state={{ data: location.pathname.split("/")[1] }}
                >
                    <li className="px-3 py-5 border rounded-lg"
                        >{title}</li>
            </NavLink >
            ))}
            </ul>
        </div>
        <div className="w-4/5 item-center">
                <div className="flex px-8 py-8 justify-between">
                {list.map((item)=>(
                    <label className="flex px-4 py-4">{item}</label>
                ))}

                </div>
            {history.map((item)=>(
                <div className="flex px-8 py-8 justiy-between">
                    <div className=" px-4 py-4">{item.id_order}</div>
                    <div className=" px-4 py-4">{item.date_order}</div>
                    <div className=" px-4 py-4">{item.total_order}</div>

                </div>
               
            ))}
        </div>
        
    </div>
      )
}
export default Purchase_history