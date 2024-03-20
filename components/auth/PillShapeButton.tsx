import * as React from 'react';
import { View, Image, Text } from 'react-native';

const PillShapeButton = ({ imageLocationOfLogo, textToBeDisplayed  }) => {

  return (
    <View className="flex-row m-2 rounded-full h-14 w-40 items-center justify-center border border-black">
      <Image
        source={imageLocationOfLogo}
        className="h-8 w-8 mr-3"
      />
      <Text className="text-lg font-bold">{textToBeDisplayed}</Text>
    </View>
  );
};

export default PillShapeButton;