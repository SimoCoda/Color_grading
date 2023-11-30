import React, {useState, useEffect} from "react";
import {rgbToHex} from "../utils/helpers";

const SingleColor = ({rgb, type, weight}) => {
  const [message, setMessage] = useState(false)
  const copiaColore = () => {
    navigator.clipboard.writeText(rgbToHex(...rgb))
    .then(() => setMessage(true))
    .catch((err) => console.log(err))
  }

    useEffect(() =>{
      const timer = setTimeout(() => {
        setMessage(false)
      }, 1500);
      return () => clearTimeout(timer)
    }, [message])

  console.log(rgbToHex(...rgb));
  console.log(rgb);
  return <article className= {`single-color ${type}`} style={{backgroundColor: rgbToHex(...rgb)}}>
    <h5 onClick={copiaColore}>{rgbToHex(...rgb)}</h5>
    {
      message && <p className="coloreCopiato">Colore copiato</p>
    }
  </article>;
};

export default SingleColor;
