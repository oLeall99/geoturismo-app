import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

export interface ItemProps {
  id: string;
  title: string;
}

interface FlatListPerfilProps {
  data: ItemProps[];
  onPress: (item: ItemProps) => void;
}

export default function FlatListPerfil({ data, onPress }: FlatListPerfilProps) {
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.list}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Item title={item.title} onPress={() => onPress(item)} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </Card.Content>
    </Card>
  );
}

const Item = ({ title, onPress }: { title: string; onPress: () => void }) => (
  <View style={styles.item}>
    <Text style={styles.text}>{title}</Text>
    <TouchableOpacity onPress={onPress}>
      <MaterialCommunityIcons name="trash-can-outline" size={20} color="#1E1E1E" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
  },
  list: {
    paddingVertical: 4,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  text: {
    fontSize: 16,
    color: '#1E1E1E',
  },
  firstItemText: {
    textDecorationLine: 'underline',
    color: '#1E1E1E',
  },
  separator: {
    height: 1,
    backgroundColor: '#D9D9D9',
  },
});
