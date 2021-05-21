import React, { useEffect, useState } from "react";

interface Location {
  city: string;
  country: string;
  lat: number;
  long: number;
}

type LocationType = Location | null;

const DefaultLocation: LocationType = {
  country: "Portugal",
  city: "Lisbon",
  lat: 38.7259284,
  long: -9.137382,
};

const LocationContext = React.createContext<{
  currentLocation: LocationType;
  onLocationChange: (location: LocationType) => void;
}>({
  currentLocation: null,
  onLocationChange: () => {},
});

export const LocationContextProvider: React.FC = ({ children }) => {
  const [location, setLocation] = useState<LocationType>(null);

  useEffect(() => {
    setLocation(DefaultLocation);
  }, []);

  return (
    <LocationContext.Provider
      value={{ currentLocation: location, onLocationChange: setLocation }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
