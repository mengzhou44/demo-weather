const forecast = async (latitude, longitude) => {    
        const apiKey = process.env.WEATHER_API_KEY;
        const url = `https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}?units=si`;
        
        const res = await fetch(url)
        return  await res.json();

};

const Weather = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const  {latitude, longitude} = req.query
      const weatherData= await forecast(latitude, longitude) 
      res.status(200).send(weatherData)
    } catch (err) {
      console.log(`Something wenty wrong ${err.message}`);
      res.status(500).send({message: 'Error occured!'});
    }
  } else {
    res.status(400).send({message: 'Bad Input!'});
  }
};

export default Weather;




 


 