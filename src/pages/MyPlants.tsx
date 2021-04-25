import { formatDistance } from "date-fns";
import { pt } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, StyleSheet, Text, View } from "react-native";
import waterdrop from "../assets/waterdrop.png";
import { Header } from "../components/Header";
import { Load } from "../components/Load";
import { PlantCardSecundary } from "../components/PlantCardSecundary";
import { loadPlant, PlantProps, removePlant } from "../libs/storage";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

  function handleRemove(plant: PlantProps) {
    Alert.alert("Remover", `Deseja remover a  ${plant.name}?`, [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: async () => {
          try {
            await removePlant(String(plant.id));

            setMyPlants((oldData) =>
              oldData.filter((item) => item.id !== plant.id)
            );
          } catch (error) {
            Alert.alert("Não foi possível remover!");
          }
        },
      },
    ]);
  }

  useEffect(() => {
    async function loadStorageData() {
      const plantsStoraged = await loadPlant();

      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      );

      setNextWatered(
        `Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime}.`
      );

      setMyPlants(plantsStoraged);
      setLoading(false);
    }

    loadStorageData();
  }, []);

  if (loading) {
    return <Load />;
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.spot}>
        <Image source={waterdrop} style={styles.spotImage} />
        <Text style={styles.spotText}> {nextWatered} </Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Próximos regadas</Text>

        <FlatList
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardSecundary
              data={item}
              handleRemove={() => handleRemove(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background,
  },
  spot: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  spotImage: {
    width: 60,
    height: 60,
  },
  spotText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
  },
  plants: {
    flex: 1,
    width: "100%",
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20,
  },
});
