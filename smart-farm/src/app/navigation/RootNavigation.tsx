import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../screeens/Dashboard";
import ZoneDetails from "../screeens/ZoneDetails";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="ZoneDetails" component={ZoneDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
