import React, { useState } from 'react'
import Head from 'next/head';
import { ToastContainer, toast } from 'react-toastify';

import styles from './index.module.css';
import Layout from '../components/layout';
import CurrentLocation from '../components/current-location';

export default function Home() {

  const [enableGeoLocation, setEnableGeoLocation] = useState(false)
  const [temperature, setTemperature] = useState(-1)
  const [summary, setSummary] = useState('')
  const [precipProbability, setPrecipProbability] = useState(-1)
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

  async function fetchWeather(latitude, longitude) {
    try {

      let res = await fetch(`/api/weather?latitude=${latitude}&longitude=${longitude}`)
      const {currently} = await res.json();
      setSummary(currently.summary)
      setTemperature(currently.temperature)
      setPrecipProbability(currently.precipProbability)
    } catch (err) {
      toast.error(res.message)
    }
  }

  function isFetching() {
    if (temperature === -1 || summary === undefined || precipProbability === -1) {
      return true
    }
    return false
  }

  function renderWeather() {
    if (enableGeoLocation === false) {
      return (
        <div
          onClick={() => {
            setEnableGeoLocation(true)
          }}
        >
          <div >Local weather</div>
        </div>
      )
    }

     if (isFetching()) {
      return <div>
        <p>Fetching ... </p>
        <CurrentLocation
          onLocated={async ({ latitude, longitude }) => {

            setLatitude(latitude)
            setLongitude(longitude)
            await fetchWeather(latitude, longitude)
          }}
          onError={error => {
            setEnableGeoLocation(false)
            toast.error(error)
          }}
        />
      </div>
     }

    return <a
      className={styles.content}
      href={`https://darksky.net/forecast/${latitude}, ${longitude}/si12/en`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div>{summary}</div>
      <div>{temperature.toFixed(0)} &#8451; </div>
      <div>{precipProbability.toFixed(0)}% chance of rain</div>
    </a>
  }

  return (
    <div>
      <Head>
        <title>Demo Local Weather</title>
        <meta name="description" content="Easy Express Solutions Inc." />
      </Head>
      <Layout>
        <div className={styles.page}>
          <div className={styles.container}>
            {renderWeather()}
          </div>
          <ToastContainer />
        </div>
      </Layout>
    </div>
  );
}



