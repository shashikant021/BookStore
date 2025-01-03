import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import List from '../../public/list.json'
import Slider from "react-slick";
import Cards from "./Cards";
import axios from 'axios'

function Freebook() {

  // const host = 'http://localhost:4001';
  const host = 'https://bookstore-o02g.onrender.com';

  const [book, setBook] = useState([]);
  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get(`${host}/book`);
        const data = res.data.filter((data) => data.category === "Free")
        setBook(data);
      } catch (error) {
        console.log(error);
      }
    }
    getBook();
  }, [])
  // const filterData = list.filter((data) => data.category === "Free");

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div>
          <h1 className="font-semibold text-xl pb-2">Free Offered Courses</h1>
          <p>
            Free Books provide an incredible opportunity for readers to access knowledge, stories, and information without
            financial barriers. Many platforms and libraries offer free books,
            ranging from classic literature and educational resources to contemporary eBooks and self-published works.
          </p>
        </div>

        <div>
          <Slider {...settings}>
            {book.map((item) => (
              <Cards item={item} key={item.id} />
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
export default Freebook;