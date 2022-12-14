const API_KEY = 'f53a50618d454bc5b52f3e22c445cb38'

const getLatLon = async cityName => {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}}&appid=${API_KEY}`
  )
  const data = await response.json()
  let { lat, lon, name } = data[0]
  return { lat, lon, name }
}
const getInfo = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  )
  const data = await response.json()
  return data
}

const formEl = document.getElementById('form')
const weatherInfo = document.querySelector('.weather-info')

const onSubmit = async e => {
  e.preventDefault()

  const searchLocation = formEl.location.value
  const { lat, lon, name } = await getLatLon(searchLocation)
  const dataObj = await getInfo(lat, lon)

  const icon = dataObj.weather[0].icon
  const cityName = name
  const conditions = dataObj.weather[0].description
  const tempCelsius = (dataObj.main.temp - 273.15).toFixed(1)
  weatherInfo.innerHTML = `
  <div>
    <img
      class="icon filter-green"
      width="150px"
      src="./svg/${icon}.svg"
      alt=""
    />
    </div>
      <div class="details">
        <div class="city-name">${cityName}</div>
        <div class="conditions">${conditions}</div>
        <div class="temperature">${tempCelsius} &degC</div>
    </div>
  `
  formEl.reset()
}
formEl.addEventListener('submit', onSubmit)
