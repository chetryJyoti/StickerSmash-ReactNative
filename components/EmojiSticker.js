import { View, Text, Image } from "react-native";
import React from "react";

const EmojiSticker = ({ imageSize, stickerSrc }) => {
  return (
    <View style={{top:-380}}>
      <Image
        source={stickerSrc}
        resizeMode="contain"
        style={{ width: imageSize, height: imageSize }}
      />
    </View>
  );
};

export default EmojiSticker;
