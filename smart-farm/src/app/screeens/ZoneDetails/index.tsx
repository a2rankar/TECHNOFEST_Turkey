//screens/ZoneDetails.tsx
import { View, Text, Button, Pressable } from "react-native";
import { useRoute } from "@react-navigation/native";
import { irrigateZone } from "../../services/zone.service";
import { useState } from "react";
import { useZone } from "../../hooks/useZone";

export default function ZoneDetails() {
  const route = useRoute<any>();
  const { id } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useZone();
  const zone = data?.find((z) => z.id === id);
  const handleIrrigate = async () => {
    setIsLoading(true);
    try {
      await irrigateZone(id);
      alert(`Success irrigation started in zone ${id}!`);
    } catch (error) {
      alert(`Failed to start irrigation in zosne ${id}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Zone {id} Details
      </Text>
      <Pressable
        style={({ pressed }) => ({
          marginTop: 20,
          backgroundColor: pressed ? "#005500" : "#229B11",
          width: 160,
          height: 70,
          borderRadius: 10,
          justifyContent: "center", // вертикально
          alignItems: "center", // горизонтально
          opacity: pressed ? 0.7 : 0.9,
        })}
        onPress={handleIrrigate}
      >
        <Text style={{ color: "white" }}>Start Irrigation</Text>
      </Pressable>
      {/* {data?.map((zone) => {
        if (zone.id === id) {
          return ( */}
      {zone && (
        <View
          key={zone.id}
          style={{
            marginTop: 70,
            padding: 20,
            backgroundColor: "#e0e0e0",
            borderRadius: 10,
            gap: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Text style={{ fontSize: 18 }}>
            Soil Moisture: {zone.soil_moisture}%
          </Text>
          <Text style={{ fontSize: 18 }}>
            Temperature: {zone.temperature}°C
          </Text>
        </View>
      )}
      {/* );
        }
      })} */}
      <Pressable
        style={{
          marginTop: 20,
          padding: 30,
          width: 160,
          backgroundColor: "#202020",
          borderRadius: 10,
        }}
        onPress={() => {
          alert("Auto mode acivated for zone " + id);
        }}
      >
        <Text style={{ color: "white" }}>Auto mode</Text>
      </Pressable>
      ;
    </View>
  );
}
