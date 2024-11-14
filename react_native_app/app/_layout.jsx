import { Stack, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import '../global.css';


SplashScreen.preventAutoHideAsync();


const RootLayout = () => {


  const [ fontsLoaded, error ] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Italics": require("../assets/fonts/Poppins-BlackItalic.ttf"),
  });


  useEffect(() => {

    
    if(error) throw error;

    if(fontsLoaded) SplashScreen.hideAsync();


  }, [fontsLoaded, error]);


  if (!fontsLoaded && !error) {

    return null;
    
  }

  return (
    <>

      <Stack>

        <Stack.Screen name='index' options={{ headerShown: false }} />

        <Stack.Screen name='(pages)' options={{ headerShown: false }} />

      </Stack>

      <StatusBar backgroundColor="#9F6421FF" style="light" />

    </>
  )
}


export default RootLayout;