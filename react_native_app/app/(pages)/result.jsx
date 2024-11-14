import { useRef, useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ScrollView,
  View,
  Text,
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as Speech from 'expo-speech';

import { useResponseModelState } from '../../zustand-store/store';
import PlayButton from '../../assets/images/play_button.png';
import PauseButton from '../../assets/images/pause_button.png';
import RestartButton from '../../assets/images/restart_button.png';


const Result = () => {


  const { responseFromModel } = useResponseModelState((state) => state);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const slideAnim = useRef(new Animated.Value(50)).current;

  const [isPlaying, setIsPlaying] = useState(false);


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


  const startAudioPlay = () => {


    setIsPlaying(true);

    Speech.speak(responseFromModel, {

      onDone: () => setIsPlaying(false),

      onStopped: () => setIsPlaying(false),

    });

  };
  

  const pauseAudioPlay = () => {

    Speech.stop();

    setIsPlaying(false);

  };


  const restartAudioPlay = () => {

    Speech.stop();

    startAudioPlay();

  };


  return (
    <>
      <LinearGradient
        colors={['#9F6421FF', '#221407FF']}
        className="absolute h-full w-full"
      />

      <SafeAreaView className="h-full">


        <ScrollView
          contentContainerStyle={{ minHeight: '100%' }}
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full min-h-full justify-center items-center px-6 py-8 gap-8">


            <Animated.View style={{ opacity: fadeAnim }}>


              <View className="items-center justify-center flex-row gap-3">

                <Text className="text-orange-300 font-pbold text-5xl tracking-wider pt-2">
                  Snap
                </Text>

                <Text className="text-white font-pbold text-5xl tracking-wider pt-2">
                  Story
                </Text>

              </View>


            </Animated.View>
            

            <Animated.View
              style={{ opacity: fadeAnim }}
              className="flex-row items-center justify-center gap-6"
            >
              {isPlaying ? (
                <TouchableOpacity activeOpacity={0.7} onPress={pauseAudioPlay}>
                  
                  
                  <View className="aspect-square rounded-3xl overflow-hidden shadow-2xl w-24 h-24">
                    
                    <Image
                      source={PauseButton}
                      className="w-full h-full"
                      resizeMode="cover"
                    />

                  </View>


                </TouchableOpacity>
              ) : (
                <TouchableOpacity activeOpacity={0.7} onPress={startAudioPlay}>
                  
                  
                  <View className="aspect-square rounded-3xl overflow-hidden shadow-2xl w-24 h-24">
                    
                    <Image
                      source={PlayButton}
                      className="w-full h-full"
                      resizeMode="cover"
                    />

                  </View>


                </TouchableOpacity>
              )}

              {!isPlaying && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={restartAudioPlay}
                >


                  <View className="aspect-square rounded-3xl overflow-hidden shadow-2xl w-24 h-24">
                    
                    <Image
                      source={RestartButton}
                      className="w-full h-full"
                      resizeMode="cover"
                    />

                  </View>


                </TouchableOpacity>
              )}
              
            </Animated.View>


            <Animated.View style={{ opacity: fadeAnim }}>

              <Text className="font-pblack text-center text-orange-300 text-lg">

                Tap the <Text className='font-pitalics'>Play Button</Text> to start the story

              </Text>

            </Animated.View>


          </View>


        </ScrollView>


      </SafeAreaView>
    </>
  );
};

export default Result;
