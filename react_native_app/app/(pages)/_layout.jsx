import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';


const PagesLayout = () => {
  return (
    <>

      <Stack>
        
        <Stack.Screen name='image-upload' options={{ headerShown: false }} />

        <Stack.Screen name='result' options={{ headerShown: false }} />

      </Stack>


      <StatusBar backgroundColor="#9F6421FF" style="light" />

    </>
  )
}

export default PagesLayout;