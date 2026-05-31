import { FastifyInstance } from "fastify";
import { prisma } from "../prisma";

export const zoneRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/zones", async () => {
    return await prisma.zone.findMany({
      include: {
        sensorData: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });
  });
  fastify.post("/zones/:id/irrigate", async (request, reply) => {
    const { id } = request.params as { id: string };
    const zone = await prisma.zone.findUnique({ where: { id: Number(id) } });

    if (!zone) {
      return reply
        .status(404)
        .send({ message: "error", details: "Zone not found" });
    }

    console.log(`💧 Irrigation started for zone ${id}`);
    return { success: true, message: `Irrigation started for zone ${id}` };
  });

  //Роут для приема данных с ESP32
  type SensorDataBody = {
    soil_moisture: number;
    temperature: number;
    humidity: number;
  };

  type ZoneParams = {
    id: string;
  };
  // POST /zones/:id/data — ESP32 сюда будет слать данные каждые 5 минут
  fastify.post<{ Params: ZoneParams; Body: SensorDataBody }>(
    "/zones/:id/data",
    async (request, reply) => {
      const { id } = request.params;
      const { soil_moisture, temperature, humidity } = request.body;

      const zone = await prisma.zone.findUnique({ where: { id: Number(id) } });
      if (!zone) {
        return reply.status(404).send({ message: "Zone not found" });
      }

      // сохраняем данные сенсора в БД
      const sensorData = await prisma.sensorData.create({
        data: {
          zoneId: Number(id),
          soil_moisture,
          temperature,
          humidity,
        },
      });

      const status =
        soil_moisture > 2000
          ? "critical"
          : soil_moisture > 1000
            ? "warning"
            : "normal";

      await prisma.zone.update({
        where: { id: Number(id) },
        data: { status },
      });

      console.log(`📡 Data received from zone ${id}:`, sensorData);
      return { success: true, data: sensorData };
    },
  );
};
