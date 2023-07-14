import "colors";
import { inquirerMenu, pause, readInput } from "./helpers/inquirer.js";
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
          const place = await readInput('City: ');
          await search.city( place );
        
        // Search places

        // Select place

        // Weather

        // Show results
        console.log('\n City info \n'.green);
        console.log('City:', );
        console.log('Lat:',);
        console.log('Lng:',);
        console.log('Temp:', );
        console.log('Min:',);
        console.log('Max:',);
        break;

      case 2:
        break;

      case 3:
        break;
    }

    if (opt !== 0) await pause();
  } while (opt !== 0);
};

main();
