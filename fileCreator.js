//In this project we will create the file using CLI and will enetr the data in the file using CLI only 
import fs from 'fs';
import readline from 'readline';

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
})
const fileCreation = ()=>{
    rl.question("Enter the file name: ", (fileName) => {
        rl.question("Enter the data to be written in the file: ", (data) => {
            fs.writeFile(fileName, data, (err) => {
                if (err) {
                    console.error("Error writing to file:", err);
                } else {
                    console.log(`File ${fileName} created successfully with data: ${data}`);
                }
                rl.close(); // Close the readline interface after file creation
            });
        });
    });
}
fileCreation(); // Call the function to start the file creation process
