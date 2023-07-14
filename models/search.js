import axios from 'axios'

export class Search {

    history = ['Madrid','Barcelona', 'Quilmes', 'Buenos Aires', 'Corea del Norte']

    constructor(){}

    get paramsMapbox(){
        return {
        'access_token': process.env.MAPBOX_KEY,
        'limit': 5
    }
}

    async city(place = ''){

        try {
            // http request
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ place }.json`,
                params: this.paramsMapbox
            })

            const resp = await instance.get();
            return resp.data.features.map( place =>({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1]
            }))

        } catch (error){
            return [];
        }
    } 

    get paramsOpenWeather(){
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric'
        }
        }
    

    async placeWeather ( lat, lon ) {

        try {  

            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsOpenWeather, lat, lon }
        })

            const resp = await instance.get();
            const {weather, main } = resp.data
            return {
                description: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp


            }

    } catch (error){
        console.log(error);
    }
}
}