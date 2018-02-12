import mongoose from "mongoose";

import { Restaurant } from "../data/connectors";

import * as Buddha from "./buddha";
import * as Stopkova from "./stopkova";
import * as JednaBasen from "./jednaBasen";
import * as Noknok from "./noknok";
import * as Gusto from "./gusto";
import * as PivniOpice from "./pivniOpice";

const RESTAURANTS = [Buddha, Stopkova, JednaBasen, Noknok, Gusto, PivniOpice];

const ObjectId = mongoose.Schema.Types.ObjectId;

export default async () => {
  RESTAURANTS.forEach(async restaurant => {
    Restaurant.findByIdAndUpdate(
      restaurant.RESTAURANT_ID,
      {
        lastWeekMenu: await restaurant.getWeekMenu()
      },
      () => {}
    );
  });
};
