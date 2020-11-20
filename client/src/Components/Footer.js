import React from "react";
import heart from '../images/heart.png'
const Footer = () => {
  return (
    <div className='row align-items-end' style={{height:"30px"}}>
    <div className="col" style={{width:'100vw'}}>
      <h1 className='text-black m-0 p-1 lead text-center footer-fonts'>
         Made with <img src={heart} alt="heart" width='21'/> by Kushtrim Bytyqi
      </h1>
      </div>
    </div>
  );
};

export default Footer;
