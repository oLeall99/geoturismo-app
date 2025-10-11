import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
// @ts-ignore
import Logo from '@/assets/images/logo.svg';

export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confSenha, setConfSenha] = useState('');

  return (
    <SafeAreaView style={style.container}>
      <Logo />
      <Card style={style.formulario}>
        <Card.Title
          title="Cadastro"
          titleStyle={{ textAlign: 'center', fontSize: 17, padding: 0, margin: 0 }}
        />
        <Card.Content style={style.cardContent}>
          <View style={style.boxFormulario}>
            <Text style={style.campos}>Nome:</Text>
            <TextInput style={style.input} value={nome} onChangeText={setNome} />
          </View>

          <View style={style.boxFormulario}>
            <Text style={style.campos}>Email:</Text>
            <TextInput
              keyboardType="email-address"
              textContentType="emailAddress"
              style={style.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={style.boxFormulario}>
            <Text style={style.campos}>Senha:</Text>
            <TextInput
              textContentType="password"
              secureTextEntry
              style={style.input}
              value={senha}
              onChangeText={setSenha}
            />
          </View>

          <View style={style.boxFormulario}>
            <Text style={style.campos}>Confirmar Senha:</Text>
            <TextInput
              textContentType="password"
              secureTextEntry
              style={style.input}
              value={confSenha}
              onChangeText={setConfSenha}
            />
          </View>
        </Card.Content>

        <Card.Actions style={style.actions}>
          <Button mode="contained" style={style.button}>
            Entrar
          </Button>
        </Card.Actions>

        <Text onPress={() => alert('Você clicou no texto!')} style={style.redirect}>
          Já possui Login? <Text style={{ fontWeight: 'bold' }}>entrar</Text>
        </Text>
      </Card>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#0077B6',
  },

  formulario: {
    width: '85%',
    paddingVertical: 20,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },

  cardContent: {
    width: '100%',
    justifyContent: 'space-evenly',
  },

  campos: {
    fontSize: 17,
    color: '#2B2D42',
    alignSelf: 'flex-start',
    marginLeft: '5%',
    marginBottom: 3,
  },

  boxFormulario: {
    width: '100%',
    marginVertical: 5,
    alignItems: 'center',
  },

  input: {
    borderColor: '#2B2D42',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 40,
    width: '90%',
  },

  actions: {
    justifyContent: 'center',
    marginTop: 10,
  },

  button: {
    width: '90%',
    backgroundColor: '#2B2D42',
    borderRadius: 6,
  },

  redirect: {
    width: '100%',
    textAlign: 'center',
    color: '#2B2D42',
    marginTop: 10,
    fontSize: 13,
  },
});
