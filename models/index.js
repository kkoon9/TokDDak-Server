const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database, config.username, config.password, config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.City = require('./cityModel')(sequelize, Sequelize);
db.Activity = require('./activityModel')(sequelize, Sequelize);
db.Food = require('./foodModel')(sequelize, Sequelize);
db.Shopping = require('./shoppingModel')(sequelize, Sequelize);
db.Snack = require('./snackModel')(sequelize, Sequelize);
db.Hotel = require('./hotelModel')(sequelize, Sequelize);
db.Transport = require('./transportModel')(sequelize, Sequelize);
db.Trip = require('./tripModel')(sequelize, Sequelize);
db.TripActivity = require('./tripActivityModel')(sequelize, Sequelize);
db.TripFood = require('./tripFoodModel')(sequelize, Sequelize);
db.TripSnack = require('./tripSnackModel')(sequelize, Sequelize);
db.TripHotel = require('./tripHotelModel')(sequelize, Sequelize);
db.Median = require('./medianModel')(sequelize,Sequelize);
db.Schedule = require('./scheduleModel')(sequelize, Sequelize);
db.User = require('./userModel')(sequelize, Sequelize);
db.Timeline = require('./timelineModel')(sequelize, Sequelize);

/** 1:N T : Timeline */
db.Trip.hasMany(db.Timeline);
db.Timeline.belongsTo(db.Trip);

/** 1:N T : Schedule */
db.Trip.hasMany(db.Schedule);
db.Schedule.belongsTo(db.Trip);

/** 1:N City : Activity */
db.City.hasMany(db.Activity);
db.Activity.belongsTo(db.City);

/** 1:N City : Food */
db.City.hasMany(db.Food);
db.Food.belongsTo(db.City);

/** 1:N City : Shopping */
db.City.hasMany(db.Shopping);
db.Shopping.belongsTo(db.City);

/** 1:N City : Snack */
db.City.hasMany(db.Snack);
db.Snack.belongsTo(db.City);

/** 1:N City : Hotel */
db.City.hasMany(db.Hotel);
db.Hotel.belongsTo(db.City);

/** 1:N City : Transport */
db.City.hasMany(db.Transport);
db.Transport.belongsTo(db.City);

/** 1:N Trip : TripActivity */
db.Trip.hasMany(db.TripActivity, {
  onDelete: 'cascade'
});
db.TripActivity.belongsTo(db.Trip);

/** 1:N Trip : TripHotel */
db.Trip.hasMany(db.TripHotel, {
  onDelete: 'cascade'
});
db.TripHotel.belongsTo(db.Trip);

/** 1:N Trip : TripFood */
db.Trip.hasMany(db.TripFood, {
  onDelete: 'cascade'
});
db.TripFood.belongsTo(db.Trip);

/** 1:N Trip : TripSnack */
db.Trip.hasMany(db.TripSnack, {
  onDelete: 'cascade'
});
db.TripSnack.belongsTo(db.Trip);

// Shopping이랑 Transport는 사용자가 금액을 입력하므로 따로 1:N 테이블을 만들지 않는다.

/** 1:N Trip : Schedule */
db.Trip.hasMany(db.Schedule, {
  onDelete: 'cascade'
});
db.Schedule.belongsTo(db.Trip);

/** 1:N User : Trip */
db.User.hasMany(db.Trip);
db.Trip.belongsTo(db.User);

module.exports = db;