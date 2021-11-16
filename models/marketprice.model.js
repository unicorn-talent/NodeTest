const DBConnection = require("../db/db-connection");
const Tables = require("../config/tables");

const getPrice = async (params) => {
    const sql = `SELECT * FROM ${Tables.tb_price} ORDER BY updated_at DESC LIMIT 1`;
    try {
        const result = await DBConnection.query(sql, []);
        const now = Date.now();
        const lastPriceTime = new Date(result[0].updated_at);
        if (now - lastPriceTime > 3 * 60 * 1000) {
            return {
                state: false
            }
        }
        return {
            state: true,
            data: result[0].data
        }
    }catch (e) {
        return {
            state: false
        }
    }
}

const setPrice = async (params) => {
    const sql = `INSERT INTO ${Tables.tb_price} (data) VALUES (?)`;
    try {
        const result = await DBConnection.query(sql, [params.data]);
        return {
            state: true
        }
    }catch(e) {
        console.log(e);
        return {
            state: false
        }
    }
}

/***********************************Export*******************************************/
module.exports = {
    getPrice,
    setPrice
};
