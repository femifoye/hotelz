import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const HotelForm = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState('');
  const countriesAndCities = useRef(null);

  // get a list of countries from API the setCountries
  useEffect(() => {
    setCities([]);
    fetch(
      'https://raw.githubusercontent.com/russ666/all-countries-and-cities-json/master/countries.min.json',
      {
        method: 'GET',
      }
    )
      .then((res) => res.json())
      .then((data) => {
        countriesAndCities.current = data;
        let countries = Object.keys(data).map((c) => c);
        setCountries(countries);
      })
      .catch((e) => console.log(e));
  }, []);

  // useEffect that fires when country value changes
  // retrieve cities from chosen countries then setCities
  useEffect(() => {
    setCities([]);
    if (country && country !== 'Select') {
      let countries = countriesAndCities.current;
      setCities(countries[country]);
    } else {
      setCities([]);
    }
  }, [country]);

  return (
    <div className="hotel-form">
      <div className="form-group">
        <label htmlFor="select_country">
          Country
          <select
            name="select_country"
            id="select_country"
            onChange={(e) => setCountry(e.target.value)}
            onBlur={(e) => setCountry(e.target.value)}
          >
            <option value="Select">Select</option>
            {countries.map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="select_city">
          City
          <select
            name="select_city"
            id="select_city"
            onChange={(e) => setCity(e.target.value)}
            onBlur={(e) => setCity(e.target.value)}
          >
            <option value="Select City">Select City</option>
            {cities.map((city) => (
              <option value={city}>{city}</option>
            ))}
          </select>
        </label>

        <div className="form-group">
          <Link to={`/result?country=${country}&city=${city}`}>
            <button className="btn">Find Hotelz</button>
          </Link>
        </div>
      </div>
    </div> // end form
  );
};

export default HotelForm;
