import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import FlatListPerfil, { ItemProps } from '@/components/FlatListPerfil';

const data: ItemProps[] = [
  {
    id: '1',
    title: 'Venda do seu Zé',
  },
  {
    id: '2',
    title: 'Cabaré da Lucéia',
  },
  {
    id: '3',
    title: 'Bar do José',
  },
];

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <MaterialCommunityIcons name="account-circle-outline" size={200} color="black" />
        <Text style={styles.name}>Turista</Text>
        <TouchableOpacity style={styles.button}>
          <MaterialCommunityIcons name="exit-to-app" size={24} color="red" />
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>

        <FlatListPerfil data={data} onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profileContainer: {
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    color: 'red',
  },
});
