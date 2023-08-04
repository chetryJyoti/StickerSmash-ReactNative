import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Modal, Pressable, Text, Alert } from "react-native";
import { useState, useRef } from "react";
import Button from "./components/Button";
import ImageViewer from "./components/ImageViewer";
import * as ImagePicker from "expo-image-picker";
import CircularBtn from "./components/CircularBtn";
import IconButton from "./components/IconBtn";
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from "./components/EmojiList";
import EmojiSticker from "./components/EmojiSticker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";

import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 1000);

const PlaceholderImage = require("./assets/images/background-image.png");

export default function App() {
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [selectedImg, setSelectedImg] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModelVisible, setIsModelVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const imgRef = useRef();
  if (status === null) {
    requestPermission();
  }
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      // console.log(result);
      setSelectedImg(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("You didnot select any Image");
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
    setPickedEmoji(null);
  };

  const onAddSticker = () => {
    setIsModelVisible(true);
  };

  const onSaveImgAsync = async () => {
    try {
      const localUri = await captureRef(imgRef, {
        height: 440,
        quality: 1,
      });
      console.log(localUri);
      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Saved!");
        onReset();
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const onModalClose = () => {
    setIsModelVisible(false);
    // console.log(pickedEmoji);
  };
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imgRef} collapsable={false}>
          <ImageViewer
            placeHolderImg={PlaceholderImage}
            selectedImg={selectedImg}
          />
          {pickedEmoji != null ? (
            <EmojiSticker imageSize={40} stickerSrc={pickedEmoji} />
          ) : null}
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircularBtn onPress={onAddSticker} />
            <IconButton icon="save-alt" label="save" onPress={onSaveImgAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            label="Choose a photo"
            btnType="primary"
            onPress={pickImageAsync}
          />
          <Button
            label="Use this photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <EmojiPicker isVisible={isModelVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
    gap: 3,
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
