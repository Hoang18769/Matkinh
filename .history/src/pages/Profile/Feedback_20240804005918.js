import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useParams, useLocation } from "react-router-dom";
import { ProfileList } from "../../constants";
import axios from "axios";

const Feedback=({state})=>{

    let location=useLocation(state);
    const item=location.state;
    console.log(item)
    const id_customer=location.state.id

    return (
        <>
 <p>"feed back"</p>
 <div>{item.id_order}</div>
 <div>ss{id_customer}</div>
 {/* <div>{items.id_product}</div> */}

        </>
       
    )
}
export default Feedback