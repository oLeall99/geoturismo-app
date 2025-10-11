import NewLocalModal from '@/components/modals/NewLocalModal';
import CustomIconButton from '@/components/ui/CustomIconButton';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MapScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <MapView style={styles.map} />
      <View style={styles.button}>
        <CustomIconButton icon="plus" color="black" onPress={() => setModalVisible(true)} />
      </View>
      <NewLocalModal visible={modalVisible} onClose={() => setModalVisible(false)} />
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
