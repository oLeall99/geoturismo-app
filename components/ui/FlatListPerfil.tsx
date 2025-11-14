// import { Local } from '@/services/api/local';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
// import { Card, Text } from 'react-native-paper';
// interface FlatListPerfilProps {
//   data: Local[];
//   onPress: (item: Local) => void;
// }

// export default function FlatListPerfil({ data, onPress }: FlatListPerfilProps) {
//   return (
//     <Card style={styles.card}>
//       <Card.Content style={styles.list}>
//         <FlatList
//           data={data}
//           keyExtractor={(_, index) => index.toString()} // usa o índice como chave
//           renderItem={({ item, index }) => (
//             <Item
//             title={`${item.nome}`} // exibe o índice visivelmente, se quiser
//             onPress={() => onPress(item)}
//             />
//           )}
//           ItemSeparatorComponent={() => <View style={styles.separator} />}
//         />
//       </Card.Content>
//     </Card>
//   );
// }

// const Item = ({ title, onPress }: { title: string; onPress: () => void }) => (
//   <View style={styles.item}>
//     <Text style={styles.text}>{title}</Text>
//     <TouchableOpacity onPress={() => {onPress()}}>
//       <MaterialCommunityIcons name="trash-can-outline" size={20} color="#2B2D42" />
//     </TouchableOpacity>
//   </View>
// );

// const styles = StyleSheet.create({
//   card: {
//     width: '90%',
//     alignSelf: 'center',
//     backgroundColor: 'white',
//     borderRadius: 8,
//     elevation: 2,
//   },
//   list: {
//     paddingVertical: 4,
//   },
//   item: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 8,
//     marginBottom: 4,
//   },
//   text: {
//     fontSize: 16,
//     color: '#2B2D42',
//   },
//   separator: {
//     height: 1,
//     backgroundColor: '#999999',
//   },
// });


import { Local } from '@/services/api/local';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Card, Text } from 'react-native-paper';

interface FlatListPerfilProps {
  data: Local[];
  onPress: (item: Local) => void;
}

export default function FlatListPerfil({ data, onPress }: FlatListPerfilProps) {
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.list}>
        <FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <Item title={item.nome} onPress={() => onPress(item)} />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </Card.Content>
    </Card>
  );
}

const Item = ({ title, onPress }: { title: string; onPress: () => void }) => (
  <View style={styles.item}>
    <Text
      style={styles.text}
      numberOfLines={1} // ✅ evita quebra de linha
      ellipsizeMode="tail" // ✅ adiciona "..." no final
    >
      {title}
    </Text>

    <TouchableOpacity onPress={onPress} style={styles.iconButton}>
      <MaterialCommunityIcons
        name="trash-can-outline"
        size={22}
        color="#2B2D42"
      />
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
    paddingVertical: 10,
    paddingHorizontal: 6,
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    color: '#2B2D42',
    flexShrink: 1, // ✅ faz o texto encolher se necessário
    maxWidth: '90%', // ✅ evita empurrar o ícone
  },
  iconButton: {
    marginLeft: 8,
    padding: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#D9D9D9',
  },
});
