import CustomIconButton from '@/components/ui/CustomIconButton';
import LocalModal from '@/components/ui/modals/LocalModal';
import NewLocalModal from '@/components/ui/modals/NewLocalModal';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  View,
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

 export type Place = {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  categories: { id: string; label: string; color: string }[];
};

export default function MapScreen() {
  const [newLocalModalVisible, setNewLocalModalVisible] = useState(false);
  const [localModalVisible, setLocalModalVisible] = useState(false);
  const [local, setLocal] = useState<Place | null>(null);
  const [region, setRegion] = useState<Region | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão negada',
          'Não é possível mostrar o mapa sem acesso à localização.'
        );
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      const newRegion: Region = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.007,
        longitudeDelta: 0.007,
      };

      setRegion(newRegion);
      mapRef.current?.animateToRegion(newRegion, 1000);

      // Mock de locais
      const mockPlaces: Place[] = [
        {
          id: '1',
          title: 'Praça Central',
          description: 'Um ótimo lugar para relaxar e aproveitar o ar livre.',
          latitude: coords.latitude + 0.001,
          longitude: coords.longitude - 0.001,
          categories: [
            { id: '1', label: 'Parque', color: '#00B4D8' },
            { id: '2', label: 'Família', color: '#90BE6D' },
            { id: '3', label: 'Lazer', color: '#F9C74F' },
            { id: '4', label: 'Lazer', color: '#F9C74F' },
          ],
        },
        {
          id: '2',
          title: 'Museu Local',
          description: 'Conheça a história da cidade e veja exposições únicas.',
          latitude: coords.latitude - 0.0008,
          longitude: coords.longitude + 0.0015,
          categories: [
            { id: '3', label: 'Lazer', color: '#F9C74F' },
            { id: '1', label: 'Cultura', color: '#F94144' },
            { id: '2', label: 'História', color: '#F3722C' },
            { id: '4', label: 'Lazer', color: '#F9C74F' },
            { id: '2', label: 'Educação', color: '#90BE6D' },
          ],
        },
        {
          id: '3',
          title: 'Restaurante Vista Azul',
          description: 'Culinária regional e vista incrível do pôr do sol.',
          latitude: coords.latitude + 0.0012,
          longitude: coords.longitude + 0.001,
          categories: [
            { id: '1', label: 'Restaurante', color: '#F9C74F' },
            { id: '2', label: 'Romântico', color: '#577590' },
            { id: '3', label: 'Lazer', color: '#F9C74F' },
            { id: '4', label: 'Lazer', color: '#F9C74F' },
          ],
        },
      ];

      setPlaces(mockPlaces);
    })();
  }, []);

  // 🔹 Ao clicar em um marcador
  const handleMarkerPress = (place: Place) => {
    setLocal(place);
    setLocalModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {region ? (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={region}
          showsCompass={false}
          toolbarEnabled={false} 
          showsPointsOfInterest={false}
          showsBuildings={true} 
          showsUserLocation
          showsMyLocationButton
        >
          <Marker coordinate={region} title="Você está aqui" pinColor="blue" />
          {places.map((place) => (
            <Marker
              key={place.id}
              coordinate={{
                latitude: place.latitude,
                longitude: place.longitude,
              }}
              title={place.title}
              description={place.description}
              onPress={() => handleMarkerPress(place)}
              pinColor="red"
            />
          ))}
        </MapView>
      ) : (
        <ActivityIndicator size="large" style={{ flex: 1 }} />
      )}

      {/* Botão para adicionar novo local */}
      <View style={styles.button}>
        <CustomIconButton
          icon="plus"
          color="black"
          onPress={() => setNewLocalModalVisible(true)}
        />
      </View>

      {/* Modal para adicionar novo local */}
      <NewLocalModal
        visible={newLocalModalVisible}
        onClose={() => setNewLocalModalVisible(false)}
      />

      {/* Modal do local selecionado */}
      {local && (
        <LocalModal
          visible={localModalVisible}
          onClose={() => setLocalModalVisible(false)}
          local={local}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  button: {
    position: 'absolute',
    bottom: 25,
    right: 25,
  },
});
