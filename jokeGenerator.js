import https from 'https';
import chalk from 'chalk'; // it is basically a library that allows you to style your console output with colors and styles.
// import readline from 'readline'; // readline is a built-in Node.js module that allows you to read data from a Readable stream (like process.stdin) one line at a time.
const  getJoke = () =>{
    const url = 'https://official-joke-api.appspot.com/random_joke';
    https.get(url,(res) =>{
        let data = ' ';
        res.on('data',(chunk) =>{
            data += chunk;

        });
        res.on('end', () => {
            const joke = JSON.parse(data);
            console.log(chalk.blue('Here is a random joke for you:'));
            console.log(chalk.green(`Setup: ${joke.setup}`));
            console.log(chalk.yellow(`Punchline: ${joke.punchline}`));
        });
        res.on('error', (err) => {
            console.error(chalk.red('Error fetching joke:', err.message));
        });

    

    })


}

getJoke();