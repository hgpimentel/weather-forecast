import React, { useState, useContext } from "react";
import { ColumnContainer } from "../../components";
import LocationContext, { Location } from "../../store/location-context";
import styled from "styled-components";

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;

  span {
    width: 100px;
  }

  & > * {
    margin-bottom: 0.5rem;
    display: flex;
  }

  button {
    width: 100px;
    text-align: center;
    margin-top: 0.5rem;
    background-color: teal;
    color: white;
    display: inline-block;
    padding: 5px;
    border-radius: 5px;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 128, 128, 0.75);
    }
  }
`;

const AddLocation: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [lat, setLat] = useState<number>(0.0);
  const [long, setLong] = useState<number>(0.0);
  const { onLocationChange } = useContext(LocationContext);

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const lsItem = localStorage.getItem("locations");
    const locations = lsItem ? (JSON.parse(lsItem) as Location[]) : null;
    const location: Location = {
      city,
      country,
      lat,
      long,
    };

    if (locations) {
      locations.push(location);
      localStorage.setItem("locations", JSON.stringify(locations));
    } else {
      localStorage.setItem("locations", JSON.stringify([location]));
    }

    onLocationChange(location);
    closeModal();
  };

  const canSubmit = city && country && lat && long;

  return (
    <ColumnContainer>
      <div>
        <h3>New location</h3>
      </div>
      <Form>
        <div>
          <span>City</span>
          <input
            type="text"
            id="city"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <span>Country</span>
          <input
            type="text"
            id="country"
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div>
          <span>Latitude</span>
          <input
            type="number"
            id="lat"
            name="lat"
            value={lat}
            onChange={(e) => setLat(e.target.valueAsNumber)}
          />
        </div>
        <div>
          <span>Longitude</span>
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
      </Form>
    </ColumnContainer>
  );
};

export default AddLocation;
