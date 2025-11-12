import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import axios from "axios";

const BACKEND_URL = "http://172.20.10.2:8000";

export default function CameraScanScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const cameraRef = useRef(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ textAlign: "center" }}>We need your permission to use the camera</Text>
        <TouchableOpacity onPress={requestPermission} style={{ marginTop: 10, padding: 10, backgroundColor: "#4CAF50" }}>
          <Text style={{ color: "white" }}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const captureImage = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: false });
      setImage(photo.uri);
      setLoading(true);

      try {
        const formData = new FormData();
        formData.append("image", {
          uri: photo.uri,
          type: "image/jpeg",
          name: "photo.jpg",
        });

        const res = await axios.post(`${BACKEND_URL}/detect`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setResult(res.data.detections);
        setLoading(false);

        navigation.navigate("Inventory", { detections: res.data.detections });
      } catch (err) {
        console.error(err);
        alert("Error sending image to backend.");
        setLoading(false);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {!image && !loading && (
        <>
          <CameraView ref={cameraRef} style={{ flex: 1 }} />
          <TouchableOpacity
            onPress={captureImage}
            style={{
              position: "absolute",
              bottom: 40,
              alignSelf: "center",
              backgroundColor: "#4CAF50",
              padding: 15,
              borderRadius: 50,
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Capture</Text>
          </TouchableOpacity>
        </>
      )}

      {loading && (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text>Processing image...</Text>
        </View>
      )}

      {image && !loading && (
        <View style={{ flex: 1 }}>
          <Image source={{ uri: image }} style={{ flex: 1 }} resizeMode="cover" />
          <TouchableOpacity
            onPress={() => {
              setImage(null);
              setResult(null);
            }}
            style={{
              position: "absolute",
              bottom: 40,
              alignSelf: "center",
              backgroundColor: "gray",
              padding: 15,
              borderRadius: 50,
            }}
          >
            <Text style={{ color: "white" }}>Retake</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
