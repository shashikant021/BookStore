import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import { Link } from "react-router-dom";
import axios from 'axios'
function Course() {

    const host = 'http://localhost:4001';
    // const host = 'https://bookstorebackend-7tkf.onrender.com';

  const [book, setBook] = useState([]);
  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get(`${host}/book`);
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getBook();
  }, [])

  return (
    <>
      <div className="pt-16 max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className=" mt-16 items-center justify-center text-center ">
          <h1 className="text-2xl  md:text-4xl">
            We're delighted to have you{" "}
            <span className="text-pink-500"> Here! :)</span>
          </h1>
          <p className="mt-12">
            A Bookstore Web Application is a digital platform that enables users to explore, purchase,
            and manage books online. The application typically features a user-friendly interface with
            functionalities such as book browsing by categories, authors, or genres, advanced search filters, and
            detailed book descriptions. Users can create personal accounts to manage wishlists, track orders, and leave
            reviews or ratings for books. With responsivedesign, the platform ensures seamless access across devices,
            making it a convenient solution for book enthusiasts.
          </p>
          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {book.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Course;