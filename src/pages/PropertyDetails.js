import React, { useState } from "react";
//import data
import { housesData } from "../data";
//import icons
import { BiBed, BiBath, BiArea } from "react-icons/bi";
//import link
import { Link, useParams } from "react-router-dom";

const PropertyDetails = () => {
  //get the house id
  const { id } = useParams();
  //get the house based on the id
  const house = housesData.find((house) => {
    return house.id === parseInt(id);
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [message, setMessage] = useState('Hello I am interested in [Mordern Apartment]');

  const validatePhone = (phone) => {
    const regex = /^(0[0-9]{9,10})$/; // Định dạng số điện thoại Việt Nam (10 hoặc 11 số bắt đầu bằng 0)
    return regex.test(phone);
  };
  
  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    setPhone(inputValue);
    if (inputValue.trim() !== '') {
      if (!validatePhone(inputValue)) {
        setPhoneError('Invalid phone number. Please enter a valid phone number.');
      } else {
        setPhoneError('');
      }
    } else {
      setPhoneError('');
    }
  };
  
  const handleSendMessage = () => {
    alert(`Your Name: ${name}\nYour Email: ${email}\nYour Phone: ${phone}\nYour Message: ${message} \n`);
  };
  

  return (
    <section>
      <div className="container mx-auto min-h-[800px] mb-14">
        <div
          className="flex flex-col lg:flex-row lg:items-center 
    lg:justify-between"
        >
          <div>
            <h2 className="text-2xl font-semibold">{house.name}</h2>
            <h3 className="text-lg mb-4">{house.address}</h3>
          </div>
          <div className="mb-4 lg:mb-0 flex gap-x-2 text-sm">
            <div
              className="bg-green-500 text-white px-3
        rounded-full"
            >
              {house.type}
            </div>
            <div
              className="bg-violet-500 text-white px-3
        rounded-full"
            >
              {house.country}
            </div>
          </div>
          <div>
            <div className="text-3xl font-semibold text-violet-600">
              $ {house.price}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-8 lg:flex-row">
          <div className="max-w-[768px] ">
            <div className="mb-8">
              <img src={house.imageLg} alt="House Image" />
            </div>
            <div className="flex gap-x-6 text-violet-700 mb-6">
              <div className="flex gap-x-2 items-center">
                <BiBed className="text-2xl" />
                <div>{house.bedrooms}</div>
              </div>
              <div className="flex gap-x-2 items-center">
                <BiBath className="text-2xl" />
                <div>{house.bathrooms}</div>
              </div>
              <div className="flex gap-x-2 items-center">
                <BiArea className="text-2xl" />
                <div>{house.surface}</div>
              </div>
            </div>
            <div>{house.description}</div>
          </div>
          <div
            className="flex-1 bg-white w-full mb-8 
          border border-gray-300 rounded-lg px-6 py-8"
          >
            <div className="flex items-center gap-x-4 mb-8">
              <div className="w-20 h-20 p-1 border border-gray-300 rounded-full">
                <img src={house.agent.image} alt="agent-image" />
              </div>
              <div>
                <div className="font-bold text-lg">{house.agent.name}</div>
                <Link to="" className="text-violet-700 text-sm">
                  View Listing
                </Link>
              </div>
            </div>
            {/* form */}
            <form className="flex flex-col gap-y-4">
              <input
              onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 
              focus:border-violet-700 outline-none 
              rounded w-full px-4 h-14 text-sm mb-2"
                type="text"
                placeholder="Name*"
              />
              <input
              onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 
              focus:border-violet-700 outline-none 
              rounded w-full px-4 h-14 text-sm mb-2"
                type="email"
                placeholder="Email*"
              />
              <input
              onChange={handlePhoneChange}
                className="border border-gray-300 
              focus:border-violet-700 outline-none 
              rounded w-full px-4 h-14 text-sm mb-2"
                type="text"
                placeholder="Phone*"
              />
              {phoneError && <span className="text-red-500 text-sm">{phoneError}</span>}
              <textarea
                className="border border-gray-400 
              focus:border-violet-700 outline-none resize-none
              rounded w-full p-4 h-36 text-sm text-gray-400"
                placeholder="Message*"
                defaultValue="Hello I am interested in [Mordern Apartment] "
                onChange={(e) => {setMessage(e.target.value)}}
              ></textarea>
              <div className="flex gap-x-3">
                <button
                onClick={handleSendMessage}
                  className="bg-violet-700 
                hover:bg-violet-800 text-white rounded p-4 text-sm w-full
                transition"
                >
                  Send Message
                </button>
                <button
                  className="border border-violet-700 text-violet-700 
                  hover:border-violet-400 hover:text-violet-400 p-4 text-sm
                  w-full h-15 transition rounded"
                >
                  Call
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetails;
