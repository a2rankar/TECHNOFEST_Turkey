//components/ZoneCard.tsx
import { View, Text, Pressable } from "react-native";
import { Zone } from "../types/zone.types";

interface Props {
  zone: Zone;
  onPress: () => void;
}

export const ZoneCard = ({ zone, onPress }: Props) => {
  const getColor = () => {
    if (zone.status === "critical") return "#ff4d4d";
    if (zone.status === "warning") return "#ffcc00";
    return "#4dff4d";
  };

  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: 20,
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: getColor(),
      }}
    >
      <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
        {zone.name}
      </Text>
      <Text style={{ color: "#fff" }}>Soil: {zone.soil_moisture}%</Text>
      <Text style={{ color: "#fff" }}>Temp: {zone.temperature}°C</Text>
    </Pressable>
  );
};
