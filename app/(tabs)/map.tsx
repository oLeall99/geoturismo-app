// import CustomIconButton from '@/components/ui/CustomIconButton';
// import LocalModal from '@/components/ui/modals/LocalModal';
// import NewLocalModal from '@/components/ui/modals/NewLocalModal';
// import { Local, LocalService, LocalUnique } from '@/services/api/local';
// import * as Location from 'expo-location';
// import { useFocusEffect } from 'expo-router';
// import { useCallback, useEffect, useRef, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   StyleSheet,
//   View,
// } from 'react-native';
// import MapView, { Marker, Region } from 'react-native-maps';

// export default function MapScreen() {
//   const [newLocalModalVisible, setNewLocalModalVisible] = useState(false);
//   const [localModalVisible, setLocalModalVisible] = useState(false);
//   const [selectedLocal, setSelectedLocal] = useState<LocalUnique | null>(null);

//   const [region, setRegion] = useState<Region | null>(null);
//   const [locals, setLocals] = useState<Local[]>([]);

//   const [loadingInicial, setLoadingInicial] = useState(true);
//   const [loadingLocais, setLoadingLocais] = useState(false);

//   const mapRef = useRef<MapView>(null);

//   // 🔹 Carrega apenas os locais (usado no focus effect)
//   const loadLocals = useCallback(async () => {
//     try {
//       setLoadingLocais(true);
//       const data = await LocalService.getAll();
//       setLocals(data);
//     } catch (error) {
//       console.error('Erro ao carregar locais:', error);
//       Alert.alert('Erro', 'Não foi possível carregar os locais.');
//     } finally {
//       setLoadingLocais(false);
//     }
//   }, []);

//   // 🔹 Carregamento inicial (localização + locais)
//   useEffect(() => {
//     (async () => {
//       try {
//         const { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== 'granted') {
//           Alert.alert(
//             'Permissão negada',
//             'Não é possível mostrar o mapa sem acesso à localização.'
//           );
//           setLoadingInicial(false);
//           return;
//         }

//         const { coords } = await Location.getCurrentPositionAsync({
//           accuracy: Location.Accuracy.Highest,
//         });

//         const newRegion: Region = {
//           latitude: coords.latitude,
//           longitude: coords.longitude,
//           latitudeDelta: 0.01,
//           longitudeDelta: 0.01,
//         };

//         setRegion(newRegion);
//         mapRef.current?.animateToRegion(newRegion, 1000);

//         await loadLocals();
//       } catch (error) {
//         console.error('Erro ao carregar mapa:', error);
//         Alert.alert('Erro', 'Não foi possível carregar os locais.');
//       } finally {
//         setLoadingInicial(false);
//       }
//     })();
//   }, [loadLocals]);

//   // 🔹 Sempre que a tela voltar ao foco → recarrega locais
//   useFocusEffect(
//     useCallback(() => {
//       loadLocals();
//     }, [loadLocals])
//   );

//   // 🔹 Recarregar após criar ou deletar local
//   const handleRefresh = () => loadLocals();

//   // 🔹 Abrir modal do local ao tocar no marcador
//   const handleMarkerPress = async (local: Local) => {
//     try {
//       const detailedLocal = await LocalService.getById(local.id_locais);
//       setSelectedLocal(detailedLocal);
//       setLocalModalVisible(true);
//     } catch (error) {
//       console.error('Erro ao buscar detalhes do local:', error);
//       Alert.alert('Erro', 'Não foi possível carregar os detalhes do local.');
//     }
//   };

//   // 🔹 Loader apenas na inicialização
//   if (loadingInicial) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#0077B6" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {region ? (
//         <MapView
//           ref={mapRef}
//           style={styles.map}
//           initialRegion={region}
//           showsCompass={false}
//           toolbarEnabled={false}
//           showsTraffic={false}
//           showsPointsOfInterest={false}
//           customMapStyle={mapStyle}
//           showsBuildings
//           showsUserLocation
//           showsMyLocationButton
//         >
//           {/* Marcador do usuário */}
//           <Marker coordinate={region} title="Você está aqui" pinColor="blue" />

//           {/* Marcadores dos locais */}
//           {locals.map((local) => (
//             <Marker
//               key={local.id_locais}
//               coordinate={{
//                 latitude: local.latitude,
//                 longitude: local.longitude,
//               }}
//               title={local.nome}
//               description={local.descricao}
//               onPress={() => handleMarkerPress(local)}
//               pinColor="red"
//             />
//           ))}
//         </MapView>
//       ) : (
//         <ActivityIndicator size="large" style={{ flex: 1 }} />
//       )}

//       {/* Botão para adicionar novo local */}
//       <View style={styles.button}>
//         <CustomIconButton
//           icon="plus"
//           color="black"
//           onPress={() => setNewLocalModalVisible(true)}
//         />
//       </View>

//       {/* Modal de adicionar novo local */}
//       <NewLocalModal
//         visible={newLocalModalVisible}
//         onClose={() => setNewLocalModalVisible(false)}
//         onLocalAdded={handleRefresh}
//       />

//       {/* Modal de detalhes */}
//       {selectedLocal && (
//         <LocalModal
//           visible={localModalVisible}
//           onClose={() => setLocalModalVisible(false)}
//           onLocalDeleted={handleRefresh}
//           local={{
//             id_locais: selectedLocal.id_locais,
//             nome: selectedLocal.nome,
//             descricao: selectedLocal.descricao,
//             categorias: selectedLocal.categorias,
//             media_avaliacao: selectedLocal.media_avaliacao,
//           }}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   map: { flex: 1, width: '100%', height: '100%' },
//   button: { position: 'absolute', bottom: 25, right: 25 },
// });

// const mapStyle = [
//   { featureType: 'administrative', elementType: 'geometry', stylers: [{ visibility: 'off' }] },
//   { featureType: 'poi', stylers: [{ visibility: 'off' }] },
//   { featureType: 'road', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
//   { featureType: 'transit', stylers: [{ visibility: 'off' }] },
// ];


import CustomIconButton from '@/components/ui/CustomIconButton';
import LocalModal from '@/components/ui/modals/LocalModal';
import NewLocalModal from '@/components/ui/modals/NewLocalModal';
import { Local, LocalService, LocalUnique } from '@/services/api/local';
import * as Location from 'expo-location';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  View,
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';

export default function MapScreen() {
  const [newLocalModalVisible, setNewLocalModalVisible] = useState(false);
  const [localModalVisible, setLocalModalVisible] = useState(false);
  const [selectedLocal, setSelectedLocal] = useState<LocalUnique | null>(null);

  const [region, setRegion] = useState<Region | null>(null);
  const [locals, setLocals] = useState<Local[]>([]);

  const [loadingInicial, setLoadingInicial] = useState(true);
  const [loadingLocais, setLoadingLocais] = useState(false);

  const [mapReady, setMapReady] = useState(false); // <-- novo
  const mapRef = useRef<MapView>(null);

  // 🔹 Carrega apenas os locais (usado no focus effect)
  const loadLocals = useCallback(async () => {
    try {
      setLoadingLocais(true);
      const data = await LocalService.getAll();
      setLocals(data);
    } catch (error) {
      console.error('Erro ao carregar locais:', error);
      Alert.alert('Erro', 'Não foi possível carregar os locais.');
    } finally {
      setLoadingLocais(false);
    }
  }, []);

  // 🔹 Carregamento inicial (localização + locais)
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permissão negada',
            'Não é possível mostrar o mapa sem acesso à localização.'
          );
          setLoadingInicial(false);
          return;
        }

        const { coords } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });

        const newRegion: Region = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.01,   // ajuste de zoom inicial
          longitudeDelta: 0.01,  // ajuste de zoom inicial
        };

        setRegion(newRegion);

        // NÃO chamar animateToRegion aqui: pode rodar antes do MapView estar pronto.
        // Em vez disso, iremos animar no onMapReady (ou quando mapReady === true).
        await loadLocals();
      } catch (error) {
        console.error('Erro ao carregar mapa:', error);
        Alert.alert('Erro', 'Não foi possível carregar os locais.');
      } finally {
        setLoadingInicial(false);
      }
    })();
  }, [loadLocals]);

  // 🔹 Sempre que a tela voltar ao foco → recarrega locais
  useFocusEffect(
    useCallback(() => {
      loadLocals();
    }, [loadLocals])
  );

  // 🔹 Recarregar após criar ou deletar local
  const handleRefresh = () => loadLocals();

  // 🔹 Abrir modal do local ao tocar no marcador
  const handleMarkerPress = async (local: Local) => {
    try {
      const detailedLocal = await LocalService.getById(local.id_locais);
      setSelectedLocal(detailedLocal);
      setLocalModalVisible(true);
    } catch (error) {
      console.error('Erro ao buscar detalhes do local:', error);
      Alert.alert('Erro', 'Não foi possível carregar os detalhes do local.');
    }
  };

  // Chamado quando o MapView estiver pronto
  const onMapReady = () => {
    setMapReady(true);

    // Se já temos a região (pega da localização), aplica o zoom/centro
    if (region) {
      // animar para a região com duração 700ms (ou 0 para salto instantâneo)
      mapRef.current?.animateToRegion(region, 700);
    }
  };

  // Caso a região seja definida depois que o mapa ficou pronto,
  // animamos também (ex: se a permissão demorou e a posição veio depois)
  useEffect(() => {
    if (mapReady && region) {
      mapRef.current?.animateToRegion(region, 700);
    }
  }, [mapReady, region]);

  // 🔹 Loader apenas na inicialização
  if (loadingInicial) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0077B6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {region ? (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={region}     // ainda útil como fallback
          onMapReady={onMapReady}    // <-- garanto que animo após o mapa estar pronto
          showsCompass={false}
          toolbarEnabled={false}
          showsTraffic={false}
          showsPointsOfInterest={false}
          customMapStyle={mapStyle}
          showsBuildings
          showsUserLocation
          showsMyLocationButton
        >
          {/* Marcador do usuário */}
          <Marker coordinate={region} title="Você está aqui" pinColor="blue" />

          {/* Marcadores dos locais */}
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

      {/* Modal de adicionar novo local */}
      <NewLocalModal
        visible={newLocalModalVisible}
        onClose={() => setNewLocalModalVisible(false)}
        onLocalAdded={handleRefresh}
      />

      {/* Modal de detalhes */}
      {selectedLocal && (
        <LocalModal
          visible={localModalVisible}
          onClose={() => setLocalModalVisible(false)}
          onLocalDeleted={handleRefresh}
          local={{
            id_locais: selectedLocal.id_locais,
            nome: selectedLocal.nome,
            descricao: selectedLocal.descricao,
            categorias: selectedLocal.categorias,
            media_avaliacao: selectedLocal.media_avaliacao,
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  map: { flex: 1, width: '100%', height: '100%' },
  button: { position: 'absolute', bottom: 25, right: 25 },
});

const mapStyle = [
  { featureType: 'administrative', elementType: 'geometry', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
];
