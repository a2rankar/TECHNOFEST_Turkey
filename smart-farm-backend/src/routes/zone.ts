
import { FastifyInstance } from "fastify";
import { zones } from "../data/mockZones";

export const zoneRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/zones", async () => {
    return zones;
  });
  fastify.post("/zones/:id/irrigate", async (request, reply) => {
    const {id} = request.params as {id:string};
    const zone = zones.find((z) => z.id === Number(id));

    if (!zone) {
        return reply.status(404).send({message: 'error', details: 'Zone not found' })
    }

    console.log(`💧 Irrigation started for zone ${id}`)
    return {success: true, message: `Irrigation started for zone ${id}`};
  });
};
