import Mongoose from "mongoose";
import casual from "casual";
import R from "ramda";

Mongoose.Promise = global.Promise;

const mongo = Mongoose.connect("mongodb://localhost/lunch-master", {
  useMongoClient: true
});

const RestaurantSchema = Mongoose.Schema({
  name: String,
  position: {
    longitude: Number,
    latitude: Number
  },
  lastWeekMenu: [
    {
      date: Date,
      food: [
        {
          name: String,
          price: Number
        }
      ]
    }
  ]
});

const MenuArchiveSchema = Mongoose.Schema({
  weekMenus: [
    {
      firstDayDate: Date,
      menus: [
        {
          date: Date,
          food: [
            {
              name: String,
              price: Number
            }
          ]
        }
      ]
    }
  ]
});

const Restaurant = Mongoose.model("restaurant", RestaurantSchema);
const MenuArchive = Mongoose.model("menuArchive", MenuArchiveSchema);

export { Restaurant, MenuArchive };
