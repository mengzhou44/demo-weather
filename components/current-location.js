import { useGeolocated } from "react-geolocated";

export default function CurrentLocation({
    onLocated,
    onError
}) {

    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

    if (!isGeolocationAvailable) {
        onError("Your browser does not support Geolocation");
    } else if (!isGeolocationEnabled) {
        onError("Geolocation is not allowed!")
    } else {
        if (coords) {
          onLocated(coords)
        }
    }

    return <></>
}
