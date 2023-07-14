import "colors";
import 'dotenv/config'
import { inquirerMenu, pause, readInput, listPlaces } from "./helpers/inquirer.js";
import { Search } from "./models/search.js";

console.clear();

const main = async () => {
  const search = new Search();

  let opt = "";

  do {
    // prints the menu
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        // Show message
          const searchTerm = await readInput('City: ');
          
          // Search places
          const places = await search.city( searchTerm );
          
          // Select place
          const selectedID = await listPlaces(places);
          if (selectedID === '0') continue;

          const selectedPlace = places.find( p => p.id === selectedID );


          search.addHistory(selectedPlace.name)

          
        // Weather
        const weather = await search.placeWeather(selectedPlace.lat, selectedPlace.lng )

        // Show results
        console.clear()
        console.log('\n City info \n'.green);
        console.log('City:', selectedPlace.name.green );
        console.log('Lat:', selectedPlace.lat);
        console.log('Lng:', selectedPlace.lng);
        console.log('Temp:', weather.temp);
        console.log('Min:', weather.min);
        console.log('Max:', weather.max);
        console.log('Hows the weather:', weather.description.green)

        break;

      case 2:
        search.capitalizeHistorial.forEach( (place, i) =>{
          const idx = `${ i + 1 }.`.green;
          console.log( `${idx} ${place}` ); 
        })
        break;

      case 3:
        break;
    }

    if (opt !== 0) await pause();
  } while (opt !== 0);
};

main();
