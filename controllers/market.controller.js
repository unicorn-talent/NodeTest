const MarketPriceModel = require("../models/marketprice.model");
const HttpException = require("../utils/HttpException.utils");
const serviceController = require("./service.controller");

const analyzePrice = (data) => {
    const parsedData = JSON.parse(data);
    const ret_data = {};

    for (const [key, value] of Object.entries(parsedData)) {
        const marketInfo = {}; 
        for (const [fsymsKey, fsymsValue] of Object.entries(value)) {
            const fmarketInfo = {};
            for (const [tsymsKey, tsymsValue] of Object.entries(fsymsValue)) {
                let tmarketInfo = {};
                tmarketInfo = {...tmarketInfo, "CHANGE24HOUR": tsymsValue["CHANGE24HOUR"]};
                tmarketInfo = {...tmarketInfo, "CHANGEPCT24HOUR": tsymsValue["CHANGEPCT24HOUR"]};
                tmarketInfo = {...tmarketInfo, "OPEN24HOUR": tsymsValue["OPEN24HOUR"]};
                tmarketInfo = {...tmarketInfo, "VOLUME24HOUR": tsymsValue["VOLUME24HOUR"]};
                tmarketInfo = {...tmarketInfo, "VOLUME24HOURTO": tsymsValue["VOLUME24HOURTO"]};
                tmarketInfo = {...tmarketInfo, "LOW24HOUR": tsymsValue["LOW24HOUR"]};
                tmarketInfo = {...tmarketInfo, "HIGH24HOUR": tsymsValue["HIGH24HOUR"]};
                tmarketInfo = {...tmarketInfo, "PRICE": tsymsValue["PRICE"]};
                tmarketInfo = {...tmarketInfo, "SUPPLY": tsymsValue["SUPPLY"]};
                tmarketInfo = {...tmarketInfo, "MKTCAP": tsymsValue["MKTCAP"]};

                fmarketInfo[tsymsKey] = tmarketInfo;
            }    
            marketInfo[fsymsKey] = fmarketInfo;
        }
        ret_data[key] = marketInfo;
    }
    
    return ret_data;
}

const getMarketPrice = async(req, res, next) => {
    const fsyms = req.query.fsyms;
    const tsyms = req.query.tsyms;

    let result = await serviceController.requestData({fsyms, tsyms});
    if (!result.state) {
        result = await MarketPriceModel.getPrice({fsyms, tsyms});
        if (!result.state) {
            res.status(500).send("no recent data");
            return;
        }
    }

    const data = analyzePrice(result.data);
    
    res.send({data});
}

/***********************************Export*******************************************/
module.exports = {
    getMarketPrice
}