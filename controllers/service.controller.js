const marketPriceModel = require("../models/marketprice.model");
const HttpException = require("../utils/HttpException.utils");
const env = require('dotenv');
const axios = require("axios");

env.config();

const requestData = async (params) => {
    const { fsyms, tsyms } = params;
    const api_key = process.env.API_KEY;
    try {
        const response = await axios({url: `https://min-api.cryptocompare.com/data/pricemultifull?api_key=${api_key}&fsyms=${fsyms}&tsyms=${tsyms}`, method: "get"});
        return {
            state: true,
            data: JSON.stringify(response.data["RAW"])
        }
    }
    catch(e) {
        console.log(e);
        return {
            state: false
        }
    }
}

const setMarketPrice = async (params) => {
    const result = await requestData(params);
    if (result.state) {
        const ret = await marketPriceModel.setPrice(result.data);
        if (!ret.state) {
            console.log('data save error');
        }
    }
}

/***********************************Export*******************************************/
module.exports = {
    requestData,
    setMarketPrice
}