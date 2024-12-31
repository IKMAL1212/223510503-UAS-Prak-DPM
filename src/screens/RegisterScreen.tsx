import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Portal, Dialog, Paragraph, Button as PaperButton } from 'react-native-paper';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Input from '../components/Input';
import Button from '../components/Button';
import { register } from '../services/api';
import { RootStackParamList } from '../types';


const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const handleRegister = async () => {
    setLoading(true);
    try {
      await register(username, password, email);
      setDialogMessage('Registration successful!');
      setVisible(true);
    } catch (error: any) {
      console.error('Failed to register:', error);

      // Check if there is a specific validation error for username
      if (error?.errors?.username) {
        // This checks if the username already exists
        if (error.errors.username === 'Username already exists') {
          setDialogMessage('This username is already taken. Please choose another one.');
        } else {
          setDialogMessage('There was an error with your username. Please try again.');
        }
      } else {
        setDialogMessage('Registration failed. Please try again.');
      }

      setVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDialogDismiss = () => {
    setVisible(false);
    if (dialogMessage.includes('successful')) {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <Input
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} disabled={loading} />

      <Portal>
        <Dialog visible={visible} onDismiss={handleDialogDismiss}>
          <Dialog.Title>{dialogMessage.includes('successful') ? 'Success' : 'Error'}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{dialogMessage}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <PaperButton onPress={handleDialogDismiss}>OK</PaperButton>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
});

export default RegisterScreen;
