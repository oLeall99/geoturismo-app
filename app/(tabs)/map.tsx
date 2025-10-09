import CustomIconButton from '@/components/CustomIconButton';
import { StyleSheet, Text, View } from 'react-native';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <Text>Mapa</Text>
      <View style={styles.button}>
        <CustomIconButton icon="plus" color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 25,
    right: 25,
  },
});
