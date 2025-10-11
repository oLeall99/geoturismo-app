import CustomIconButton from '@/components/ui/CustomIconButton';
import LocalModal from '@/components/ui/modals/LocalModal';
import NewLocalModal from '@/components/ui/modals/NewLocalModal';
import { Local } from '@/types/local';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MapScreen() {
  const [newLocalModalVisible, setNewLocalModalVisible] = useState(false);
  const [localModalVisible, setLocalModalVisible] = useState(false);
  const [local, setLocal] = useState<Local | null>(null);
  return (
    <SafeAreaView style={styles.container}>
      <MapView style={styles.map} />
      <View style={styles.button}>
        <CustomIconButton icon="plus" color="black" onPress={() => setNewLocalModalVisible(true)} />
        <CustomIconButton icon="plus" color="black" onPress={() => setLocalModalVisible(true)} />
      </View>
      <NewLocalModal
        visible={newLocalModalVisible}
        onClose={() => setNewLocalModalVisible(false)}
      />
      <LocalModal
        visible={localModalVisible}
        onClose={() => setLocalModalVisible(false)}
        local={local!}
      />
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
