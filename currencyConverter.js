import https from 'https';
import readline from 'readline';
import chalk from 'chalk';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,

});
const apiKey = '8c6af8074e8781ff25bfcb0e';
const baseUrl = 'https://v6.exchangerate-api.com/v6/8c6af8074e8781ff25bfcb0e/latest/';
const currencyConverter = () => {
    rl.question(chalk.blue('Enter the base currency: '), (baseCurrency) => {
        rl.question(chalk.blue('Enter the target currency: '), (targetCurrency) => {
            rl.question(chalk.blue('Enter the amount to convert: '), (amount) => {
                const url = `${baseUrl}${baseCurrency}`;
                https.get(url, (res) => {
                    let data = '';
                    res.on('data', (chunk) => {
                        data += chunk;
                    });
                    res.on('end', () => {
                        const response = JSON.parse(data);
                        if (response.result === 'success') {
                            const rate = response.conversion_rates[targetCurrency];
                            if (rate) {
                                const convertedAmount = amount * rate;
                                console.log(chalk.green(`Converted Amount: ${convertedAmount} ${targetCurrency}`));
                            } else {
                                console.log(chalk.red('Invalid target currency'));
                            }
                        } else {
                            console.log(chalk.red('Error fetching exchange rates'));
                        }
                        rl.close();
                    });
                }).on('error', (err) => {
                    console.error(chalk.red('Error fetching exchange rates:', err.message));
                });
            });
        });
    });
}; 