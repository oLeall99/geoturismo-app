import FlatListPerfil from '@/components/ui/FlatListPerfil';
import { AuthService } from '@/services/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// @ts-ignore
import ProfileIcon from '@/assets/icons/profile-icon.svg';
import PrefeituraModal from '@/components/ui/modals/PrefeituraModal';
import { Local, LocalService } from '@/services/api/local';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';


export default function ProfileScreen() {
  const [data, setData] = useState<Local[]>([]);

  useEffect(() => {
    (async () => {
      try{
        const res = await LocalService.getByUser();
        setData(res)
      } catch (error) {
        console.error('Erro ao carregar mapa:', error);
        Alert.alert('Erro', 'Não foi possível carregar os locais.');
      }
    })();
  }, []);
  const [visible, setVisible] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <ProfileIcon width={200} height={200} style={styles.profileIcon} />
        <Text style={styles.name}>Nome Turista</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => { AuthService.logout(); router.replace('/login'); }}
        >
          <MaterialCommunityIcons name="exit-to-app" size={24} color="red" />
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
        <FlatListPerfil 
          data={data} 
          onPress={async (item) => {
            Alert.alert(
              'Confirmar exclusão',
              `Deseja excluir o local "${item.nome}"?`,
              [
                { text: 'Cancelar', style: 'cancel' },
                {
                  text: 'Excluir',
                  style: 'destructive',
                  onPress: async () => {
                    try {
                      await LocalService.delete(item.id_locais);
                      setData((prev) => prev.filter((local) => local.id_locais !== item.id_locais));
                      Alert.alert('Sucesso', 'Local excluído com sucesso.');
                    } catch (error) {
                      console.error('Erro ao deletar local:', error);
                      Alert.alert('Erro', 'Não foi possível excluir o local.');
                    }
                  },
                },
              ]
            );
          }}
        />
      </View>
      {/*
        <TouchableOpacity style={styles.oficialButton} onPress={() => setVisible(true)}>
        <Text style={styles.oficialButtonText}>Oficializar</Text>
      </TouchableOpacity>
      */}
      <PrefeituraModal visible={visible} onClose={() => setVisible(false)} />
    </SafeAreaView>
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
    marginBottom: 24,
  },
  profileIcon: {
    marginBottom: 16,
  },
  name: {
    fontSize: 17,
    color: '#2B2D42',
    marginBottom: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 15,
    color: 'red',
  },
  oficialButton: {
    alignItems: 'center',
    backgroundColor: '#D3AF37',
    padding: 10,
    borderRadius: 8,
    position: 'absolute',
    bottom: 20,
    width: '90%',
  },
  oficialButtonText: {
    fontSize: 17,
    color: 'white',
  },
});
