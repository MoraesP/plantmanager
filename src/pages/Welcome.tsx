import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import wateringImg from "../assets/watering.png";
import { Button } from "../components/Button";
import colors from "../styles/colors";

export function Welcome() {
  const [visible, setVisible] = useState(false);

  function handleVisibility() {
    setVisible(true);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Gerencie{"\n"}
        suas plantas{"\n"}
        de forma fácil
      </Text>
      {visible && <Image source={wateringImg} style={styles.image} />}

      <Text style={styles.subtitle}>
        Não esqueça mais de regas suas plantas. Nós cuidamos de lembrar você
        sempre que precisar.
      </Text>

      <Button title=">" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.heading,
    marginTop: 38,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 20,
    color: colors.heading,
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56,
  },
  image: {
    width: 292,
    height: 284,
  },
  buttontext: {
    color: colors.white,
    fontSize: 24,
  },
});
