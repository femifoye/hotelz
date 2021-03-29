import SingleHotel from './SingleHotel';

const Hotel = ({ listings }) => {
  return (
    <div className="all_hotels">
      {listings.length === 0 ? (
        <h1>No Hotels Found</h1>
      ) : (
        listings.map((list) => (
          <SingleHotel
            name={list.name}
            address={list.address}
            starRating={list.starRating}
            rate={list.ratePlan}
          />
        ))
      )}
    </div>
  );
};

export default Hotel;
