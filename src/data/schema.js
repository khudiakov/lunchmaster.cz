import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";
import resolvers from "./resolvers";

const typeDefs = `
  type Query {
    restaurants(longitude: Float, latitude: Float): [Restaurant]
  }

  type Position {
    longitude: Float
    latitude: Float
  }

  type Food {
    name: String
    price: Float
  }

  type Menu {
    date: String,
    food: [Food]
  }

  type Restaurant {
    id: ID
    name: String
    position: Position
    lastWeekMenu: [Menu]
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
