const ScheduleService = require('./service');
const rm = require('../module/util/responseMessage');
const utils = require('../module/util/utils');
const sc = require('../module/util/statusCode');

module.exports = {
    create: async (req, res) => {
        const {
            array,
            TripId
        } = req.body;
        if (!TripId) {
            res.status(sc.BAD_REQUEST).send(utils.successFalse(sc.BAD_REQUEST, rm.NULL_VALUE));
            return;
        }
        ScheduleService.create({
                array,
                TripId
            })
            .then(({
                    code,
                    json
                }) =>
                res.status(code).send(json)
            ).catch(err => {
                res.status(sc.INTERNAL_SERVER_ERROR).send(err);
            })
    },
    read: async (req, res) => {
        const {
            TripId
        } = req.params;
        console.log(TripId);
        if (!TripId) {
            res.send(utils.successFalse(sc.BAD_REQUEST, rm.NULL_VALUE));
            return;
        }
        ScheduleService.read({
                TripId
            })
            .then(({
                    code,
                    json
                }) =>
                res.status(code).send(json)
            ).catch(err => {
                console.log(err);
                res.send(utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
            })
    },
    readByDay: async (req, res) => {
        const inputParam = {
            "TripIdAndDay": {
                "TripId": req.params.TripId,
                "day": req.params.day
            }
        }
        if (!inputParam.TripIdAndDay.TripId || !inputParam.TripIdAndDay.day) {
            res.send(utils.successFalse(sc.BAD_REQUEST, rm.NULL_VALUE));
            return;
        }
        ScheduleService.readByDay({
                inputParam
            })
            .then(({
                    code,
                    json
                }) =>
                res.status(code).send(json)
            ).catch(err => {
                console.log(err);
                res.send(utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
            })
    },
    // update: async (req, res) => {
    //     const {
    //         id,
    //         cost
    //     } = req.body;
    //     const {
    //         CityId
    //     } = req.params;
    //     if (!id || !cost) {
    //         const missParameters = Object.entries({
    //                 id,
    //                 cost,
    //                 CityId
    //             })
    //             .filter(it => it[1] == undefined).map(it => it[0]).join(',');
    //         res.send(utils.successFalse(sc.BAD_REQUEST, `${rm.NULL_VALUE}, ${missParameters}`));
    //         return;
    //     }
    //     ShopService.update({id, cost, CityId})
    //     .then(({
    //         json
    //     }) => 
    //         res.send(json)
    //     ).catch(err => {
    //         console.log(err);
    //         res.send(utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
    //     })
    // },
    // delete: async (req, res) => {
    //     const {
    //         id
    //     } = req.body;
    //     if (!id) {
    //         res.send(utils.successFalse(sc.BAD_REQUEST, rm.NULL_VALUE));
    //         return;
    //     }
    //     ScheduleService.delete({
    //             id
    //         })
    //         .then(({
    //             json
    //         }) => res.send(json)).catch(err => {
    //             console.log(err);
    //             res.send(utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR)); // 여기서 걸리는데,,,(?)

    //         })
    // },
}