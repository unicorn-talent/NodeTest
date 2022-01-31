const MarketPriceModel = require("../models/marketprice.model");
const HttpException = require("../utils/HttpException.utils");
const serviceController = require("./service.controller");

const analyzePrice = (res, fsyms, tsyms) => {
    const parsedData = JSON.parse(res.data);
    const fsyms_arr = fsyms.split(",");
    const tsyms_arr = tsyms.split(",");

    const fmarketInfo = {};

    for (const [fsymsKey, fsymsValue] of Object.entries(parsedData)) {
        const tmarketInfo = {};
        if (fsyms_arr.includes(fsymsKey)) {

            for (const [tsymsKey, tsymsValue] of Object.entries(fsymsValue)) {
                if (tsyms_arr.includes(tsymsKey)) {

                    tmarketInfo[tsymsKey] = tsymsValue;
                }    
            }    
            fmarketInfo[fsymsKey] = tmarketInfo;
        }
    }
    
    return fmarketInfo;
}

const getMarketPrice = async(req, res, next) => {
    const fsyms = req.query.fsyms;
    const tsyms = req.query.tsyms;

    const result = await MarketPriceModel.getPrice();
    if (!result.state) {
        res.status(500).send("no recent data");
        return;
    }

    const data = analyzePrice(result, fsyms, tsyms);
    
    res.send(data);
}

/***********************************Export*******************************************/
module.exports = {
    getMarketPrice
}