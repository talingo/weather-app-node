require("colors");

const { inquirerMenu, pause, readInput } = require("./helpers/inquirer");

console.clear();

const main = async () => {
  
  let opt = "";
  
  do {
    // prints the menu
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const description = await readInput("Description:");
        tasks.createTask(description);
        console.log(description);
        break;

      case "2":
        
      break;

      case "3":
        
        break;
    }

    saveDB( tasks.arrList )

    await pause();
  } while (opt !== "0");
  //   pause();
};

main();
