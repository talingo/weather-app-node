import axios from "axios";
import fs from "fs";

export class Search {


  history = [];
  dbPath = "./db/database.json";

  constructor() {
    this.readDB();
  }

  get capitalizeHistorial() {
    return this.history.map((place) => {
      let words = place.split(" ");
      words = words.map((word) => word[0].toUpperCase() + word.substring(1));

      return words.join(" ");
    });
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
    };
  }
  get paramsOpenWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: "metric",
    };
  }

  async city(place = "") {
    try {
      // http request
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapbox,
      });

      const resp = await instance.get();
      return resp.data.features.map((place) => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  async placeWeather(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsOpenWeather, lat, lon },
      });

      const resp = await instance.get();
      const { weather, main } = resp.data;
      return {
        description: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {
      console.log(error);
    }
  }

  addHistory(place = "") {
    if (this.history.includes(place.toLocaleLowerCase())) {
      return;
    }
    this.history = this.history.splice(0,5);
    this.history.unshift(place.toLocaleLowerCase());
    this.saveDB()
  }

  saveDB() {
    const payload = {
      history: this.history
    };

    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  readDB() {
    if (!fs.existsSync(this.dbPath)) return;

    const info = fs.readFileSync(this.dbPath, { encoding: "utf-8" });
    const data = JSON.parse(info);

    this.history = data.history;
  }
}
