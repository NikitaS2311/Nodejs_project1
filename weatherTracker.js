import https from 'https';
import chalk from 'chalk';
import readline from 'readline/promises';
import fs from  'fs';
const apikey = 'a2592160923a59d6330c734b2c3c918c';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
 const getWeather = async (city) =>{
    const url = `${baseUrl}q=${city}&appid=${apikey}`;
    try {
        const weatherData = await  fetch(url);
        if(!weatherData.ok) {
            throw new Error('City not found');
        }
        const data = await weatherData.json();
        console.log(data);
        console.log(chalk.blue('Weather Information:'));
        console.log(chalk.green(`City: ${data.name}`));
        console.log(chalk.green(`Temperature: ${data.main.temp}K`));
        console.log(chalk.green(`Weather: ${data.weather[0].description}`));
        console.log(chalk.green(`Humidity: ${data.main.humidity}%`));
        console.log(chalk.green(`Wind Speed: ${data.wind.speed} m/s`));
        console.log(chalk.green(`Country: ${data.sys.country}`));
        console.log(chalk.green(`Visibility: ${data.visibility} meters`));
        console.log(chalk.green(`Pressure: ${data.main.pressure} hPa`));
        console.log(chalk.green(`Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`));
        console.log(chalk.green(`Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`));


    }catch(error){
        console.log(error);
    }
 }
 const city = await rl.question(chalk.blue('Enter the city name: '));
 await getWeather (city);
 rl.close();