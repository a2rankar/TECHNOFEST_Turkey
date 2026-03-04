import { View, Text, ActivityIndicator } from "react-native";
import { useZone } from "../../hooks/useZone";
import { ZoneCard } from "../../components/ZoneCard";
import { useNavigation } from "@react-navigation/native";

export default function Dashboard() {
  const { data, isLoading } = useZone();
  const navigation = useNavigation<any>();

  if (isLoading) {
    return <ActivityIndicator style={{ marginTop: 40 }} />;
  }

  return (
    <View style={{ padding: 20 }}>
           <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
             Smart Farm Dashboard
           </Text>

      {data?.map((zone) => (
        <ZoneCard
          key={zone.id}
          zone={zone}
          onPress={() => navigation.navigate("ZoneDetails", { id: zone.id })}
        />
      ))}
    </View>
  );
}
