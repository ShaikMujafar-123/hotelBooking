import "./featured.css";
import { TrendingDestinations } from "../../config";

const Featured = () => {
  return (
    <div className="featured">
        {TrendingDestinations.map((place,i) => 
      <div className="featuredItem">
        <img
          src={place.placeImg}
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>{place.placeName}</h1>
        </div>
      </div>
      )}
      
      
      
    </div>
  );
};

export default Featured;