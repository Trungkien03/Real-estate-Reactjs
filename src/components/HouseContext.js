import { click } from "@testing-library/user-event/dist/click";
import React, { createContext, useEffect, useState } from "react";

//import data
import { housesData } from "../data";
//create context
export const HouseContext = createContext();
const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState("Location (any) ");
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState("Property type (any)");
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState("Price range (any)");
  const [loading, setLoading] = useState(false);

  //return all countries and properties
  useEffect(() => {
    //for countries
    const allContries = houses.map((house) => {
      return house.country;
    });
    const uniqueCountries = ["Location (any)", ...new Set(allContries)];
    setCountries(uniqueCountries);

    //for properties
    const allProperties = houses.map((house) => {
      return house.type;
    });
    const uniqueProperties = ["Property type (any)", ...new Set(allProperties)];
    setProperties(uniqueProperties);
  }, []);

  const handleClick = () => {
    setLoading(true);
    //create a function that check if the  string includes '(any)'
    const isDefault = (str) => {
      return str.split(" ").includes('(any)');
    };

    //get first value of price and parse it to number
    const minPrice = parseInt(price.split(" ")[0]);
    //get the second value of price which is the maximum
    const maxPrice = parseInt(price.split(" ")[2]);

    const newHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price);

      //if all values are selected
      if (
        house.country === country &&
        house.type === property &&
        housePrice >= minPrice &&
        housePrice <= maxPrice
      ) {
        return house;
      }

      //if all are default
      if(isDefault(country) && isDefault(property) && isDefault(price)){
        return house;
      }
      //if country is not default
      if(!isDefault(country) && isDefault(property) && isDefault(price)){
        return house.country === country;
      }
      //if property is not default
      if(isDefault(country) && !isDefault(property) && isDefault(price)){
        return house.type === property;
      }
      //if price is not default
      if(isDefault(country) && isDefault(property) && !isDefault(price)){
        if(housePrice >= minPrice && housePrice <= maxPrice){
          return house;
        }
      }

      //if country and property are not default
      if(!isDefault(country) && !isDefault(property) && isDefault(price)){
        return house.type === property && house.country === country;
      }
      //if country and price are not default
      if(!isDefault(country) && !isDefault(price) && isDefault(property)){
        if(housePrice >= minPrice && housePrice <= maxPrice){
          return house.country === country;
        }
      }
      //if property and price are not default
      if(isDefault(country) && !isDefault(property) && !isDefault(price)){
        if(housePrice >= minPrice && housePrice <= maxPrice){
          return house.type === property;
        }
      }
      
    });
    setTimeout(()=>{
      return newHouses.length < 1 ? setHouses([]) : setHouses(newHouses),
      setLoading(false);
    },500);

    console.log(newHouses);
  };

  return (
    <HouseContext.Provider
      value={{
        country,
        setCountry,
        countries,
        setCountries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        houses,
        loading,
        handleClick,
        loading
      }}
    >
      {" "}
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
