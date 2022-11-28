import { useState } from 'react';
import styles from './form-address.module.css'

function FormAddress({ data, onNext, onPrev }) {

  const [address, setAddress] = useState(data.address ?? '');
  const [city, setCity] = useState(data.city ?? '');
  const [state, setState] = useState(data.state ?? '');
  const [zipCode, setZipCode] = useState(data.zipCode ?? '');
  const [country, setCountry] = useState(data.country ?? '');

  const [message, setMessage] = useState('');

  const validateInputs = () => {
    setMessage('');

    if (!address) {
      setMessage('Address is required')
      return false
    }
    else if (!city) {
      setMessage('City is required')
      return false
    }
    else if (!state) {
      setMessage('State is required')
      return false
    }
    else if (!zipCode) {
      setMessage('Zip code is required')
      return false
    }
    else if (country === '') {
      setMessage('Country is required!')
      return false
    }
    else if (country.length < 3) {
      setMessage('Country is invalid')
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
        <label htmlFor="address">Address *</label>
        <input
          id="address"
          type="text"
          value={address}
          onChange={handleAddressTextChange}
        ></input>
      </div>

      <div className={styles.field}>
        <label htmlFor="city">City *</label>
        <input
          id="city"
          type="text"
          value={city}
          onChange={handleCityTextChange}
        ></input>
      </div>

      <div className={styles.field}>
        <label htmlFor="state">State *</label>
        <input
          id="state"
          type="text"
          value={state}
          onChange={handleStateTextChange}
        ></input>
      </div>

      <div className={styles.field}>
        <label htmlFor="country">Country *</label>
        <input
          id="country"
          type="text"
          value={country}
          onChange={handleCountryTextChange}
        ></input>
      </div>
    
      <p>{message}</p>

      <div className={styles.buttons}>
        <button onClick={() => onPrev()}>Prev</button>
        <button onClick={() => {
          if (validateInputs()) {
            onNext({ address, city, state, zipCode, country })
          }
        }}>Next</button>
      </div>
    </div>
  </>
}

export default FormAddress 