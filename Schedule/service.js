const rm = require('../module/util/responseMessage');
const utils = require('../module/util/utils');
const sc = require('../module/util/statusCode');

const {
    Schedule
} = require('../models');

module.exports = {
    create: ({
        array,
        TripId
    }) => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(array);
                for(var n in array){
                    await Schedule.create({
                        day: array[n].day, // 좌측 = 디비필드, 우측 = 위의 파라미터.
                        cost: array[n].cost, // 좌측의 디비에 파라미터 값을 넣는다.
                        category: array[n].category,
                        TripId: TripId
                        });
                }
            } catch (error) {
                reject({ // 실패시 json 반환.
                    code: sc.INTERNAL_SERVER_ERROR,
                    json: utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.SCHEDULE_CREATE_FAIL)
                });
            }
            resolve({ // 성공시 json 반환.
                code: sc.SUCCESS,
                json: utils.successTrue(sc.SUCCESS, rm.SCHEDULE_CREATE_SUCCESS)
            });
        });
    },
    read: ({
        TripId // TripId를 받아야한다!
    }) => {
        return new Promise(async (resolve, reject) => {
            const schedule = await Schedule.findAll({
                where: {
                    TripId: TripId,
                }
            });
            if (schedule.length == 0) {
                resolve({
                    code: sc.NO_CONTENT,
                    json: utils.successFalse(sc.NO_CONTENT, rm.TRIP_EMPTY)
                });
                return;
            }
            if (!schedule) {
                resolve({
                    code: sc.INTERNAL_SERVER_ERROR,
                    json: utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.SCHEDULE_READ_TRIPID_FAIL)
                });
                return;
            }
            resolve({
                code: sc.SUCCESS,
                json: utils.successTrue(sc.SUCCESS, rm.SCHEDULE_READ_TRIPID_SUCCESS, schedule)
            });
        });
    },
    readByDay: ({
        inputParam
    }) => {
        return new Promise(async (resolve, reject) => {
            const TripId = inputParam.TripIdAndDay.TripId;
            const day = inputParam.TripIdAndDay.day;
            const scheduleByDay = await Schedule.findAll({
                where: {
                    TripId: TripId,
                    day: day
                }
            });
            if (scheduleByDay.length == 0) {
                resolve({
                    code: sc.NO_CONTENT,
                    json: utils.successFalse(sc.NO_CONTENT, rm.TRIP_AND_DAY_EMPTY)
                });
                return;
            }
            if (!scheduleByDay) {
                resolve({
                    code: sc.INTERNAL_SERVER_ERROR,
                    json: utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.SCHEDULE_READ_DAY_FAIL)
                });
                return;
            }
            resolve({
                code: sc.SUCCESS,
                json: utils.successTrue(sc.SUCCESS, rm.SCHEDULE_READ_DAY_SUCCESS, scheduleByDay)
            });
        });
    },
    // update: ({
    //     id,
    //     cost,
    //     CityId
    // }) => {
    //     return new Promise(async (resolve, reject) => {
    //         const shopping = await Shopping.update({
    //             cost: cost,
    //             CityId: CityId
    //         }, {
    //             where: {
    //                 id: id
    //             },
    //         });
    //         if (!shopping) {
    //             resolve({
    //                 json: utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.SHOPPING_UPDATE_FAIL)
    //             });
    //             return;
    //         }
    //         resolve({
    //             json: utils.successTrue(sc.SUCCESS, rm.SHOPPING_UPDATE_SUCCESS)
    //         });
    //     });
    // },
    // delete: ({
    //     id
    // }) => {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             schedule = await Schedule.findAll({
    //                 where: {
    //                     id: id
    //                 }
    //             })
    //             if (schedule.length == 0) {
    //                 resolve({
    //                     json: utils.successFalse(sc.NO_CONTENT, rm.SCHEDULE_EMPTY)
    //                 });
    //                 return;
    //             }
    //             console.log(schedule.length);
    //             schedule = await Schedule.destroy({
    //                 where: {
    //                     id: id
    //                 }
    //             });
    //         } catch (error) {
    //             reject({
    //                 json: utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.SCHEDULE_DELETE_FAIL)
    //             });
    //         }
    //         resolve({
    //             json: utils.successTrue(sc.SUCCESS, rm.SCHEDULE_DELETE_SUCCESS)
    //         });
    //     });
    // },
};