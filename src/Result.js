import React, { useEffect, useState } from 'react';
import Hotel from './Hotel';
import axios from 'axios';
import moment from 'moment';

const Result = () => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [hotels, setHotels] = useState([]);
  const [chosenDestinationId, setChosenDestinationId] = useState('');

  function datePlus(days) {
    let date = new Date().toISOString();
    return moment(date).add(days, 'days').format('YYYY-MM-DD');
  }

  // use effect to extract the city
  // and country values
  useEffect(() => {
    let query = window.location.search.split('&');
    let cntry = query[0].split('=')[1].replaceAll('%20', ' ');
    let cty = query[1].split('=')[1].replaceAll('%20', ' ');
    setCity(cty);
    setCountry(cntry);
  }, []);

  // use effect that calls the api to
  // retrieve the destinationId of the
  // hotels in the chosen city
  useEffect(() => {
    setHotels([]);
    axios
      .get(`https://hotels4.p.rapidapi.com/locations/search?query=${city}`, {
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_HOTEL_API_KEY,
        },
      })
      .then((response) => {
        let cities = response.data.suggestions[0].entities;
        let suggestedCities = cities.filter((c) => {
          let caption = c.caption.split(',');
          let suggestionCountry = caption[caption.length - 1];
          suggestionCountry = suggestionCountry.replace(' ', '');
          return country === suggestionCountry;
        });

        if (suggestedCities.length <= 0) return;
        let chosenCity = suggestedCities[0];
        setChosenDestinationId(chosenCity.destinationId);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [city, country]);

  // use effect to retrieve hotels
  // in destinationId
  useEffect(() => {
    const url = `https://hotels4.p.rapidapi.com/properties/list?destinationId=${chosenDestinationId}&pageNumber=1&checkIn=${datePlus(
      0
    )}&checkOut=${datePlus(
      12
    )}&pageSize=25&adults1=1&currency=USD&locale=en_US&sortOrder=PRICE`;
    const config = {
      headers: {
        'x-rapidapi-key': process.env.REACT_APP_HOTEL_API_KEY,
        'x-rapidapi-host': 'hotels4.p.rapidapi.com',
      },
    };

    axios
      .get(url, config)
      .then((response) => {
        let results = response.data.data.body.searchResults.results;
        setHotels(results);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [chosenDestinationId]);

  return (
    <div className="results__wrapper">
      <div className="results__header">
        <h3>
          Showing Hotels in {city}, {country}
        </h3>

        <div className="results__hotels">
          <Hotel listings={hotels} />
        </div>
      </div>
    </div>
  );
};

export default Result;
