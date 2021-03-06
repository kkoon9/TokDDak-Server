const MedianService = require('./service');
const rm = require('../module/util/responseMessage');
const utils = require('../module/util/utils');
const sc = require('../module/util/statusCode');

module.exports = {
    hotelRead: async (req, res) => {
        const {
            CityId
        } = req.params;
        if(!CityId) {
            res.send(utils.successFalse(sc.BAD_REQUEST, rm.NULL_VALUE));
            return;
        }
        MedianService.hotelRead({CityId})
        .then(({
            code,
            json
        }) => 
            res.send(json).status(code)
        ).catch(err => {
            console.log(err);
            res.send(utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
        })
    },
    foodRead: async (req, res) => {
        const {
            CityId
        } = req.params;
        if(!CityId) {
            res.send(utils.successFalse(sc.BAD_REQUEST, rm.NULL_VALUE));
            return;
        }
        MedianService.foodRead({CityId})
        .then(({
            code,
            json
        }) => 
            res.send(json).status(code)
        ).catch(err => {
            console.log(err);
            res.send(utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
        })
    },
    snackRead: async (req, res) => {
        const {
            CityId
        } = req.params;
        if(!CityId) {
            res.send(utils.successFalse(sc.BAD_REQUEST, rm.NULL_VALUE));
            return;
        }
        MedianService.snackRead({CityId})
        .then(({
            code,
            json
        }) => 
            res.send(json).status(code)
        ).catch(err => {
            console.log(err);
            res.send(utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
        })
    },
    hotelReadiOS: async (req, res) => {
        const {
            CityId,
            subCategory
        } = req.params;
        if (!CityId || !subCategory) {
            res.send(utils.successFalse(sc.BAD_REQUEST, rm.NULL_VALUE));
            return;
        }
        console.log("CityId : ",CityId, subCategory);
        MedianService.hotelReadiOS({CityId, subCategory})
        .then(({
            code,
            json
        }) => 
            res.send(json).status(code)
        ).catch(err => {
            console.log(err);
            res.send(utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
        })
    },
}
