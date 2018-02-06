import { Restaurant } from "./connectors";

const ZOOM_DISTANCE = 0.003;

const resolvers = {
  Query: {
    restaurants(_, { longitude, latitude }) {
      if (longitude && latitude) {
        return Restaurant.where("position.longitude")
          .lte(longitude + ZOOM_DISTANCE)
          .gte(longitude - ZOOM_DISTANCE)
          .where("position.latitude")
          .lte(latitude + ZOOM_DISTANCE)
          .gte(latitude - ZOOM_DISTANCE);
      }
      return Restaurant.find({});
    }
  }
};

export default resolvers;
