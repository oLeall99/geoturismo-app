import CustomIconButton from '@/components/CustomIconButton';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';

export default function MapScreen() {
  const [region, setRegion] = useState<Region | null>(null);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      // Solicita permissão novamente (boa prática)
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão negada',
          'Não é possível mostrar o mapa sem acesso à localização.'
        );
        return;
      }

      // Obtém posição atual
      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      // Define região inicial com ~700m de raio
      const newRegion: Region = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.007, // quanto menor, mais zoom (~700m aprox)
        longitudeDelta: 0.007,
      };

      setRegion(newRegion);
      mapRef.current?.animateToRegion(newRegion, 1000);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {region ? (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={region}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {/* Opcional: marcador da posição */}
          <Marker coordinate={region} title="Você está aqui" />
        </MapView>
      ) : (
        <ActivityIndicator size="large" style={{ flex: 1 }} />
      )}

      <View style={styles.button}>
        <CustomIconButton icon="plus" color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
