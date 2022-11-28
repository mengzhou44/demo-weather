import { useState } from 'react';
import styles from './form.module.css'
import {toast, ToastContainer} from 'react-toastify'

function FormAddress({ data, onNext, onPrev }) {

  const [address, setAddress] = useState(data.address ?? '');
  const [city, setCity] = useState(data.city ?? '');
  const [state, setState] = useState(data.state ?? '');
  const [zipCode, setZipCode] = useState(data.zipCode ?? '');
  const [country, setCountry] = useState(data.country ?? '');

  const validateInputs = () => {
  
    if (!address) {
      toast.error('Address is required')
      return false
    }
    else if (!city) {
      toast.error('City is required')
      return false
    }
    else if (!state) {
      toast.error('State is required')
      return false
    }
    else if (!zipCode) {
      toast.error('Zip code is required')
      return false
    }
    else if (country === '') {
      toast.error('Country is required!')
      return false
    }

    else if (country.length < 3) {
      toast.error('Country is invalid')
      return false
    }

    return true;
  };

  const handleAddressTextChange = (e) => {
    setAddress(e.target.value);
  };

  const handleCityTextChange = (e) => {
    setCity(e.target.value);
  };

  const handleStateTextChange = (e) => {
    setState(e.target.value);
  };

  const handleZipCodeTextChange = (e) => {
    setZipCode(e.target.value);
  };

  const handleCountryTextChange = (e) => {
    setCountry(e.target.value);
  };

  return <>
    <div className={styles.inputs}>

      <div className={styles.field}>
        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          value={address}
          onChange={handleAddressTextChange}
        ></input>
      </div>

      <div className={styles.field}>
        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          value={city}
          onChange={handleCityTextChange}
        ></input>
      </div>

      <div className={styles.field}>
        <label htmlFor="state">State</label>
        <input
          id="state"
          type="text"
          value={state}
          onChange={handleStateTextChange}
        ></input>
      </div>

      <div className={styles.field}>
        <label htmlFor="zipCode">Zip Code</label>
        <input
          id="zipCode"
          type="text"
          value={zipCode}
          onChange={handleZipCodeTextChange}
        ></input>
      </div>

      <div className={styles.field}>
        <label htmlFor="country">Country</label>
        <input
          id="country"
          type="text"
          value={country}
          onChange={handleCountryTextChange}
        ></input>
      </div>
    
      <div className={styles.buttons}>
        <button onClick={() => onPrev()}>Prev</button>
        <button onClick={() => {
          if (validateInputs()) {
            onNext({ address, city, state, zipCode, country })
          }
        }}>Next</button>
      </div>
      <ToastContainer />
    </div>
  </>
}

export default FormAddress 