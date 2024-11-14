import { ScrollView, View, Text, Animated, Image, Alert } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRef, useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

import PlusIconImg from '../../assets/images/plus-icon.png';
import { useResponseModelState } from '../../zustand-store/store';


const ImageUpload = () => {


  const fadeAnim = useRef(new Animated.Value(0)).current;

  const slideAnim = useRef(new Animated.Value(50)).current;


  const [ imageInput, setImageInput ] = useState(null);


  const [ uploadedImageUri, setUploadedImageUri ] = useState(null);

  const [ loadingGeneratedAnswerByModel, setLoadingGeneratedAnswerByModel ] = useState(false);


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


  const openImagePicker = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    const uriOfTheUploadedImage = result.assets[0].uri;

    if(!result.canceled) {

      setImageInput(result);

      setUploadedImageUri(uriOfTheUploadedImage);

    }

  }


  const onSubmitResponseToBackend = async () => {

    try {

      setLoadingGeneratedAnswerByModel(true);
      
      if(imageInput && imageInput.assets && imageInput.assets.length > 0) {

        const uriOfTheImage = imageInput.assets[0].uri;

        const fileExtension = uriOfTheImage.split('.').pop();

        let mimeType = '';

        if (fileExtension === 'jpg' || fileExtension === 'jpeg') {

          mimeType = 'image/jpeg';

        } else if (fileExtension === 'png') {

          mimeType = 'image/png';

        } else {
          
          Alert.alert('Unsupported file format!');

          return;

        }


        const formData = new FormData();

        formData.append('imageInputByUser', {
          uri: uriOfTheImage,
          name: `image.${fileExtension}`, 
          type: mimeType 
        });

        const { data } = await axios.post(process.env.EXPO_PUBLIC_FASTAPI_ENDPOINT, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        
        if(data?.success) {

          useResponseModelState.setState({
            responseFromModel: data?.message
          });

          router.replace('/result');

        } else {

          Alert.alert('Something went wrong. Please try again after sometime');

        }
        

      }

    } catch (error) {
      
      console.log(error);

      Alert.alert(error?.message || 'Something went wrong. Please try again after sometime');
      
    } finally {

      setLoadingGeneratedAnswerByModel(false);

    }

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


          <View className="w-full min-h-full justify-center items-center px-6 py-8">


            <Animated.View style={{ opacity: fadeAnim }} className="mb-8">

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
              style={{ 
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }}
            >

              {uploadedImageUri ? <View className="w-11/12 aspect-square rounded-3xl overflow-hidden shadow-2xl">
                
                <Image 
                  source={{ uri: uploadedImageUri }} 
                  className="w-full h-full"
                  resizeMode="cover"
                />

              </View> : <TouchableOpacity 
                className='bg-transparent w-96 h-64 gap-3 items-center justify-center border-4 rounded-2xl border-orange-300'
                activeOpacity={0.7}
                onPress={() => openImagePicker()}
              >

                <Image 
                  source={PlusIconImg}
                  className="w-[60px] h-[60px]"
                  resizeMode="contain"
                />

                <Text className='text-white text-lg text-center'>Only JPG, JPEG and PNG is accepted</Text>

              </TouchableOpacity>}

            </Animated.View>


            <Animated.View style={{ opacity: fadeAnim }} className='w-11/12 mt-10'>

              <TouchableOpacity 
                className={`bg-orange-500 disabled:bg-orange-300 rounded-xl min-h-[62px] w-full justify-center items-center`}
                onPress={onSubmitResponseToBackend}
                activeOpacity={0.7} 
                disabled={imageInput === null || loadingGeneratedAnswerByModel === true}
              >

              <Text className='text-white text-xl font-pbold'>{ loadingGeneratedAnswerByModel ? 'Generating Story...' : 'Submit' }</Text>

              </TouchableOpacity>

            </Animated.View>

          
          </View>

        
        </ScrollView>

      
      </SafeAreaView>
    </>
  );
};


export default ImageUpload;
