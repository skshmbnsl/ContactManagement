//@ts-ignore
import { FC } from "react";
import { Marker, Popup } from "react-leaflet";
import L, { Icon } from "leaflet";
import markerIcon from "../utils/marker_icon.png";

interface CountryData {
  country: string;
  countryInfo: {
    lat: number;
    long: number;
    _id: string;
  };
  lat: number;
  long: number;
  _id: string;
  active: number;
  recovered: number;
  deaths: number;
}

interface WorldMapProps {
  countriesData: CountryData[];
}

const WorldMap: FC<WorldMapProps> = ({ countriesData }) => {
  const customMarker = new Icon({
    iconUrl: markerIcon,
    iconSize: [20, 25],
    iconAnchor: [15, 30],
  });

  return (
    <div>
      {countriesData?.map((country) => (
        <Marker
          icon={customMarker}
          key={country.countryInfo._id}
          position={[country.countryInfo.lat, country.countryInfo.long]}
        >
          <Popup>
            <div>
              <h2>{country.country}</h2>
              <p>
                Active Cases: {country.active} <br />
                Recovered Cases: {country.recovered} <br />
                Deaths: {country.deaths}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </div>
  );
};

export default WorldMap;
