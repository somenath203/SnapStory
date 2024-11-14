import { ScrollView, View, Text, Image, TouchableOpacity, Animated } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';
import { useRef, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import LandingPageImg from '../assets/images/snapshot_lanfing_page_photo.jpeg';


const LandingApp = () => {

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const slideAnim = useRef(new Animated.Value(50)).current;


  useEffect(() => {

    Animated.parallel([

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),

    ]).start();

  }, []);

  return (
    <>


      <LinearGradient
        colors={['#9F6421FF', '#221407FF']}
        className="absolute h-full w-full"
      />


      <SafeAreaView className="h-full">


        <StatusBar backgroundColor="#9F6421FF" style="light" />

        
        <ScrollView 
          contentContainerStyle={{ minHeight: '100%' }}
          showsVerticalScrollIndicator={false}
        >

          <View className="w-full min-h-full justify-center items-center px-6 py-8">


            <Animated.View 
              style={{ opacity: fadeAnim }}
              className="mb-8"
            >

              <View className="items-center justify-center flex-row gap-3">

                <Text className="text-orange-300 font-pbold text-5xl tracking-wider pt-2">Snap</Text>
                
                <Text className="text-white font-pbold text-5xl tracking-wider pt-2">Story</Text>
              
              </View>

            
            </Animated.View>


            <Animated.View 
              style={{ 
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }}
              className="w-11/12 aspect-square rounded-3xl overflow-hidden shadow-2xl"
            >

              <Image 
                source={LandingPageImg} 
                className="w-full h-full"
                resizeMode="cover"
              />

            </Animated.View>


            <Animated.View 
              style={{ 
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }}
              className="mt-8 w-full"
            >
              <Text className="text-center text-3xl font-pblack tracking-wide leading-tight justify-center items-center">
                
                <Text className="text-orange-300"> Snap &#10139; Create &#10139; Listen </Text>
              
              </Text>

              
              <Text className="text-center text-lg text-orange-200/90 mt-4 tracking-wide font-pitalics px-4 leading-relaxed">
                Transform your photo into a captivating story instantly with the power of Google Gemini AI.
              </Text>


              <TouchableOpacity 
                className="mt-8 bg-orange-400 py-4 px-8 rounded-full mx-auto self-center shadow-xl shadow-black/30"
                activeOpacity={0.7}
                onPress={() => router.push('/image-upload')}
              >

                <Text className="text-orange-950 font-pbold text-lg tracking-wide">
                  Get Started
                </Text>

              </TouchableOpacity>


            </Animated.View>

          </View>

        </ScrollView>

      </SafeAreaView>

    </>
  );
};

export default LandingApp;