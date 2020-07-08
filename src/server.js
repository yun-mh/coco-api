import { GraphQLServer } from "graphql-yoga";
import schema from "./schema";
import logger from "morgan";
import "./env";
import "./passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";
import cors from "cors";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated }),
});

const corsOptions = {
  origin: "http://192.168.0.4:19000",
  credential: true,
};

server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.express.use(cors(corsOptions));

server.start({ port: PORT }, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
