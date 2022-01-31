const cron = require('node-cron');
const express = require('express');
const dotenv = require('dotenv');
const service = require('./controllers/service.controller');
const HttpException = require("./utils/HttpException.utils");

dotenv.config();

// import user router
const serviceRouter = require("./routes/service.route");
// Init express
const app = express();

// Init schedule
cron.schedule('* * * * *', function() { // every minute
    
    const fsyms = process.env.FSYMS;
    const tsyms = process.env.TSYMS;
    
    service.setMarketPrice({fsyms, tsyms});
});


app.use("/service", serviceRouter);

app.all("*", (req, res, next) => {
    const error = new HttpException(404, "Endpoint Not Found.");
    next(error);
});

const PORT = process.env.SERVERPORT;
app.listen(PORT | 3000, () => {
    console.log(`Server is running on port ${PORT}`)
});
