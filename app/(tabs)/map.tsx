import CustomIconButton from '@/components/ui/CustomIconButton';
import LocalModal from '@/components/ui/modals/LocalModal';
import NewLocalModal from '@/components/ui/modals/NewLocalModal';
import { Local, LocalService } from '@/services/api/local';
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

export default function MapScreen() {
  const [newLocalModalVisible, setNewLocalModalVisible] = useState(false);
  const [localModalVisible, setLocalModalVisible] = useState(false);
  const [selectedLocal, setSelectedLocal] = useState<Local | null>(null);
  const [region, setRegion] = useState<Region | null>(null);
  const [locals, setLocals] = useState<Local[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingLocalDetails, setLoadingLocalDetails] = useState(false);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      try {
        // 🔹 Pedir permissão de localização
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permissão negada',
            'Não é possível mostrar o mapa sem acesso à localização.'
          );
          setLoading(false);

          return;
        }

        // 🔹 Obter posição atual
        const { coords } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });

        const newRegion: Region = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };

        setRegion(newRegion);
        mapRef.current?.animateToRegion(newRegion, 1000);

        // 🔹 Buscar locais do backend
        await loadLocals();
      } catch (error) {
        console.error('Erro ao carregar mapa:', error);
        Alert.alert('Erro', 'Não foi possível carregar os locais.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const loadLocals = async () => {
    try {
      setLoading(true);
      const data = await LocalService.getAll();
      setLocals(data);
    } catch (error) {
      console.error('Erro ao carregar locais:', error);
      Alert.alert('Erro', 'Não foi possível carregar os locais.');
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Ao clicar em um marcador
  const handleMarkerPress = async (local: Local) => {
    setLoadingLocalDetails(true);
    try {
      const detailedLocal = await LocalService.getById(local.id_locais);
      setSelectedLocal(detailedLocal);
      setLocalModalVisible(true);
    } catch (error) {
      console.error('Erro ao buscar detalhes do local:', error);
      Alert.alert('Erro', 'Não foi possível carregar os detalhes do local.');
    } finally {
      setLoadingLocalDetails(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0077B6" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {region ? (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={region}
          showsCompass={false}
          toolbarEnabled={false}
          showsTraffic={false}
          showsPointsOfInterest={false}
          customMapStyle={mapStyle}
          showsBuildings
          showsUserLocation
          showsMyLocationButton
        >
          {/* Marcador da posição do usuário */}
          <Marker coordinate={region} title="Você está aqui" pinColor="blue" />

          {/* Marcadores de locais de interesse */}
          {locals.map((local) => (
            <Marker
              key={local.id_locais}
              coordinate={{
                latitude: local.latitude,
                longitude: local.longitude,
              }}
              title={local.nome}
              description={local.descricao}
              onPress={() => handleMarkerPress(local)}
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
        onLocalAdded={loadLocals} 
      />

      {/* Modal do local selecionado */}
      {selectedLocal && (
        <LocalModal
          visible={localModalVisible}
          onClose={() => setLocalModalVisible(false)}
          local={{
            id_locais: selectedLocal.id_locais,
            nome: selectedLocal.nome,
            descricao: selectedLocal.descricao,
            endereco: selectedLocal.endereco,
            latitude: selectedLocal.latitude,
            longitude: selectedLocal.longitude,
          }}
          loading={loadingLocalDetails}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
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

const mapStyle= [
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
]
