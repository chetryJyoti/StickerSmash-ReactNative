import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

const ImageViewer = ({ placeHolderImg,selectedImg }) => {
  const imgSrc = selectedImg ? {uri:selectedImg}:placeHolderImg
  return (
    <View>
      <Image source={imgSrc} style={styles.image} />
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 480,
    borderRadius: 18,
  },
});
export default ImageViewer;
