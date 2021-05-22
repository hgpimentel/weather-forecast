import React, { useContext } from "react";
import styled from "styled-components";
import CenteredContainer from "../Container/CenteredContainer";
import ColumnContainer from "../Container/ColumnContainer";
import LocationContext, { Location } from "../../store/location-context";

const CustomCenteredContainer = styled(CenteredContainer)`
  align-items: center;
  justify-content: space-evenly;
  padding: 1rem;
  border-bottom: 2px solid teal;

  & > * {
    flex-grow: 1;
    max-width: 100px;
    display: flex;
    justify-content: center;
  }

  button {
    width: 75px;
    text-align: center;
    margin-top: 0.5rem;
    background-color: teal;
    color: white;
    display: inline-block;
    border-radius: 5px;
    padding: 5px;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 128, 128, 0.75);
    }
  }
`;

const SelectLocation: React.FC<{ closeModal: () => void }> = ({
  closeModal,
}) => {
  const lsItem = localStorage.getItem("locations");
  const locations = lsItem ? (JSON.parse(lsItem) as Location[]) : null;
  const { onLocationChange } = useContext(LocationContext);

  const onSelect = (location: Location) => {
    onLocationChange(location);
    closeModal();
  };

  return (
    <ColumnContainer>
      <div>
        <h3>Saved locations</h3>
      </div>
      {locations ? (
        <>
          {locations.map((location, index) => {
            return (
              <CustomCenteredContainer key={index}>
                <div>{location.city}</div>
                <div>{location.country}</div>
                <div>{location.lat}</div>
                <div>{location.long}</div>
                <div>
                  <button onClick={() => onSelect(locations[index])}>
                    Select
                  </button>
                </div>
              </CustomCenteredContainer>
            );
          })}
        </>
      ) : (
        <div>
          <h3>No locations found!</h3>
        </div>
      )}
    </ColumnContainer>
  );
};

export default SelectLocation;
