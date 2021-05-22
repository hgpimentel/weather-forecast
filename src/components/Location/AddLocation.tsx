import React, { useState, useContext } from "react";
import { ColumnContainer } from "../../components";
import LocationContext from "../../store/location-context";

const AddLocation: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [lat, setLat] = useState<number>(0.0);
  const [long, setLong] = useState<number>(0.0);
  const { onLocationChange } = useContext(LocationContext);

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onLocationChange({
      city,
      country,
      lat,
      long,
    });
    closeModal();
  };

  const canSubmit = city && country && lat && long;

  return (
    <ColumnContainer>
      <div>
        <h3>Add location</h3>
      </div>
      <form>
        <div>
          <label>City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div>
          <label>Latitude:</label>
          <input
            type="number"
            id="lat"
            name="lat"
            value={lat}
            onChange={(e) => setLat(e.target.valueAsNumber)}
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="number"
            id="long"
            name="long"
            value={long}
            onChange={(e) => setLong(e.target.valueAsNumber)}
          />
        </div>
        <button type="submit" disabled={!canSubmit} onClick={onSubmit}>
          Add
        </button>
      </form>
    </ColumnContainer>
  );
};

export default AddLocation;
