# Sample Backend for Node.js

This repository contains a sample backend code that fetch/store the price using CRYPTOCOMPARE api and provide price api for users

## Set up and run 

### Clone

Clone the repository from GitHub.

```
git clone https://github.com/unicorn-talent/NodeTest
cd NodeTest
npm install
npm start
```

### Get Cryptocompare api key

If you don't have an api-key yet, [sign up for one](https://www.cryptocompare.com/) using your e-mail. And get api-key from cryptocompare


### Set the parameters in .env:

| Variable Name                     | Description                    |
|-----------------------------------|--------------------------------|
| DB_HOST                   | localhost |
| DB_PORT                  | 3306 |
| DB_USER               | root |
| DB_PASS                  |  |
| DB_BASE                  | test_db |
| SERVERPORT                   | 3001 |
| API_KEY                   | 895f8cd7e48043b3ecf65e1d3bfc0dfc72f5aff4e6b2dc08cbee8943ae9a0866 |
| FSYMS                   | BTC,XRP,ETH,BCH,EOS,LTC,XMR,DASH |
| TSYMS                   | USD,EUR,GBP,JPY,RUR |

