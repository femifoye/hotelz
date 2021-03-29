const SingleHotel = ({ name, address, starRating, rate }) => {
  return (
    <div className="single__hotel">
      <div className="single__hotel__inner">
        <div className="single__hotel__header">
          <h3>{name}</h3>
        </div>
        <div className="single__hotel__address">
          <h5>{address.streetAddress}</h5>
        </div>
        <div className="single__hotel__rating">
          <h5>Rating: {starRating}</h5>
        </div>
        <div className="single__hotel__price">
          <h5>Price: ${rate.price.exactCurrent} / night</h5>
        </div>
      </div>
    </div>
  );
};

export default SingleHotel;
