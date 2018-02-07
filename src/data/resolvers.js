import { Restaurant } from "./connectors";

const resolvers = {
  Query: {
    restaurants(_, { longitudeFrom, longitudeTo, latitudeFrom, latitudeTo }) {
      if (longitudeFrom && longitudeTo && latitudeFrom && latitudeTo) {
        return Restaurant.where("position.longitude")
          .gte(longitudeFrom)
          .lte(longitudeTo)
          .where("position.latitude")
          .gte(latitudeFrom)
          .lte(latitudeTo);
      }
      return Restaurant.find({});
    }
  }
};

export default resolvers;
