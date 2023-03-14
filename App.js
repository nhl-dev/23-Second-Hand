import { useFonts } from "expo-font"
import { NavigationContainer, DarkTheme } from "@react-navigation/native"
import MainNavigation from "./src/navigation"
import { Provider } from "react-redux"

import store from "./src/store"

import { init } from "./src/db";

init()
  .then(() => console.log("Database initialized"))
  .catch((err) => {
    console.log("Data base fail connect");
    console.log(err.message);
  });

export default function App() {
  const [fontsLoaded] = useFonts({
    DancingSCript: require("./src/assets/fonts/DancingScript-Regular.ttf"),
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <Provider store={store}>
      <NavigationContainer theme={DarkTheme}>
        <MainNavigation />
      </NavigationContainer>
    </Provider>
      
  )
}
