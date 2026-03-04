import Fastify from "fastify";
import { zoneRoutes } from "./routes/zone";

const fastify = Fastify({ logger: true });

fastify.register(zoneRoutes);

fastify.listen({ port: 3000, host: "0.0.0.0" }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log("Server is running on port 3000");
});
