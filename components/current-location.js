import { useGeolocated } from "react-geolocated";
import {useState} from 'react'

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


    const [located, setLocated] = useState(false)

    if (located === false) {
        if (!isGeolocationAvailable) {
            onError("Your browser does not support Geolocation");
        } else if (!isGeolocationEnabled) {
            onError("Geolocation is not allowed!")
        } else {
            if (coords) {
                onLocated(coords)
                setLocated(true)
            }
        }
    }

    return <></>
}
