import React from "react";
import ReactDOM from "react-dom";
import Img1 from "./DSC_0006.jpg";
import Img2 from "./img_2.jpg";
import Img3 from "./12288_o303.jpg";
import "./compStyles.css";

function Homebody1() {
  return (
    <div
      id="carouselExampleIndicators"
      class="container carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item div-imgshape">
          <img src={Img1} class="d-block w-100" alt="..."></img>
        </div>
        <div class="carousel-item  div-imgshape">
          <img src={Img2} class="d-block w-100" alt="..."></img>
        </div>
        <div class="carousel-item active  div-imgshape">
          <img src={Img3} class="d-block w-100" alt="..."></img>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Homebody1;
