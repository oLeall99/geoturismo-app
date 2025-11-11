import CustomIconButton from '@/components/CustomIconButton';
import PlaceInfoCard from '@/components/ui/PlaceInfoCard';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { IconButton } from 'react-native-paper';

type Place = {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  categories: { id: string; label: string; color: string }[];
};

export default function MapScreen() {
  const [region, setRegion] = useState<Region | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
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

      const mockPlaces: Place[] = [
        {
          id: '1',
          title: 'Praça Central',
          description:
            'Um ótimo lugar para relaxar e aproveitar o ar livre no coração da cidade.',
          latitude: coords.latitude + 0.001,
          longitude: coords.longitude - 0.001,
          categories: [
            { id: '1', label: 'Parque', color: '#00B4D8' },
            { id: '2', label: 'Família', color: '#90BE6D' },
            { id: '3', label: 'Lazer', color: '#F9C74F' },
          ],
        },
        {
          id: '2',
          title: 'Museu Local',
          description:
            'Conheça a história da cidade e veja exposições únicas sobre sua fundação.',
          latitude: coords.latitude - 0.0008,
          longitude: coords.longitude + 0.0015,
          categories: [
            { id: '3', label: 'Lazer', color: '#F9C74F' },
            { id: '1', label: 'Cultura', color: '#F94144' },
            { id: '2', label: 'História', color: '#F3722C' },
          ],
        },
        {
          id: '3',
          title: 'Restaurante Vista Azul',
          description:
            'Culinária regional e vista incrível do pôr do sol — uma parada obrigatória.',
          latitude: coords.latitude + 0.0012,
          longitude: coords.longitude + 0.001,
          categories: [
            { id: '1', label: 'Restaurante', color: '#F9C74F' },
            { id: '2', label: 'Romântico', color: '#577590' },
            { id: '3', label: 'Lazer', color: '#F9C74F' },
          ],
        },
      ];

      setPlaces(mockPlaces);
    })();
  }, []);

  const handleMarkerPress = (place: Place) => {
    setSelectedPlace(place);
  };

  const closeModal = () => setSelectedPlace(null);

  return (
    <View style={styles.container}>
      {region ? (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={region}
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

      <View style={styles.button}>
        <CustomIconButton icon="plus" color="black" />
      </View>

      {/* Modal com overlay escuro */}
      <Modal
        animationType="slide"
        transparent
        visible={!!selectedPlace}
        onRequestClose={closeModal}
      >

        <TouchableWithoutFeedback onPress={closeModal}>
         <View style={styles.modalOverlay}>

            <TouchableWithoutFeedback>
                {selectedPlace && (
              <View style={styles.modalContent}>
                  <View style={styles.closeButtonContainer}>
                   <IconButton
                     icon="close"
                     iconColor="#1E1E1E"
                     size={24}
                     style={styles.closeButton}
                     onPress={closeModal}
                     />
                  </View>
                  <PlaceInfoCard
                    title={selectedPlace.title}
                    description={selectedPlace.description}
                    categories={selectedPlace.categories}
                    onClose={closeModal}
                  />
              </View>
                )}
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1, width: '100%', height: '100%' },
  button: {
    position: 'absolute',
    bottom: 25,
    right: 25,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // mais escuro
  },
  closeButtonContainer: {
    alignItems: 'flex-start',
    paddingTop: 4,
    paddingRight: 4,
  },
  closeButton: {
    margin: 4,
    backgroundColor: '#EAEAEA',
    color:'#9CA3AF',
  },
  modalContent: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
    borderTopLeftRadius: 20,
    gap: 200,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
});
