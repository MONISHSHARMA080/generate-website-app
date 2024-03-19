import React from 'react';
import { View, Image, Text } from 'react-native';

const GoogleButton = () => {
  return (
    <View className="flex-row  rounded-full h-14 w-40 items-center justify-center border border-black">
      <Image
        source={require('../../assets/images/google_logo_round.png')}
        className="h-8 w-8 mr-2"
      />
      <Text className="text-lg font-bold">Google</Text>
    </View>
  );
};

export default GoogleButton;