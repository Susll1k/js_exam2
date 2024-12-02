const apiKey = '8618365c7dbef979f3b5ed8425fdc297';

async function getWeather(city) {

  try {

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);

    const data = await response.json();

    const weatherElement = document.getElementById('weather');
    weatherElement.innerHTML=''

    const box = document.createElement("div");
    box.classList.add('box')
    const content = document.createElement("div");
    content.classList.add('content')

    const temp = document.createElement("h4");
    temp.innerHTML = `Temp ${(Number(data.main.temp)/10).toFixed(2)}°C.<br>Real Feel ${(Number(data.main.feels_like)/10).toFixed(2)}°C.`

    const name = document.createElement("h1");
    name.innerHTML = data.name

    const speed = document.createElement("h4");
    speed.innerHTML = `Wind speed: ${data.wind.speed} m/s.`

    content.append(temp,speed)
    box.append(name,content)


    weatherElement.append(box)

} catch (error) {
    console.error('Ошибка при получении данных о погоде:', error);
    const box = document.getElementById('weather');

    const name = document.createElement("h1");
    name.innerHTML = '404'

    const er = document.createElement("h4");
    er.innerHTML = `Ошибка при получении данных о погоде` 
    box.append(name,er)

    weatherElement.append(box)
  }
}

async function getWeatherForecast(city){
    try {
        const weatherElement = document.getElementById('weather');
        weatherElement.innerHTML=''
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);
        const json = await response.json();

        for(let i =0; i<5;i++){
            const data = json.list[i];
    


            const box = document.createElement("div");
            box.classList.add('box')

            const boxname = document.createElement("div");
            boxname.classList.add('content')

            const content = document.createElement("div");
            content.classList.add('content')
        
            const temp = document.createElement("h4");
            temp.innerHTML = `Temp ${(Number(data.main.temp)/10).toFixed(2)}°C.<br>Real Feel ${(Number(data.main.feels_like)/10).toFixed(2)}°C.`

        
            const name = document.createElement("h1");
            name.innerHTML = json.city.name

            
            const dt_txt = document.createElement("h2");
            dt_txt.innerHTML = data.dt_txt
        
            const speed = document.createElement("h4");
            speed.innerHTML = `Wind speed: ${data.wind.speed} m/s.`
        
            content.append(temp,speed)
            boxname.append(name,dt_txt)

            box.append(boxname,content)
        
        
            weatherElement.append(box)
        }
    
    } catch (error) {
        console.error('Ошибка при получении данных о погоде:', error);
        const box = document.getElementById('weather');

        const name = document.createElement("h1");
        name.innerHTML = '404'

        const er = document.createElement("h4");
        er.innerHTML = `Ошибка при получении данных о погоде` 
        box.append(name,er)

        weatherElement.append(box)
    }
}




const btn = document.querySelector('.btn')

btn.addEventListener('click', ()=>{
  const city_name = document.getElementsByClassName('city')[0].value
  getWeather(city_name);
})


const forecastbtn = document.querySelector('.forecastbtn')

forecastbtn.addEventListener('click', ()=>{
    const city_name = document.getElementsByClassName('city')[0].value
    getWeatherForecast(city_name);
  })