import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { ProfileList } from "../../constants";
import axios from "axios";

const Feedback=({item})=>{

    const items={item}
    return (
        <>
 <p>"feed back"</p>
 <div>{item.id_order}</div>
 <div>{item.id_product}</div>
 <div>{item.id_product.variants}</div>

        </>
       
    )
}
export default Feedback