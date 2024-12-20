import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, FlatList, Alert, ImageBackground, TouchableOpacity } from 'react-native';
import { searchUsers, getCoalition } from '../api/api';

export default function HomeScreen({ navigation }) {
  const [message, setMessage] = useState('Welcome to Swifty Companion!');
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');
  const [found, setFound] = useState(true);
  const [loading, setLoading] = useState(false);
 
  const image = {uri: 'https://auth.42.fr/auth/resources/yyzrk/login/students/img/bkgrnd.jpg'};

const handleSearch = async () => {
  const userLogin = query.trim().toLowerCase();
  if (!userLogin) {
    Alert.alert('Error', 'Query cannot be empty');
    return;
  }

  setLoading(true);
  try {
    const user = await searchUsers(userLogin);
    if (!user) {
      Alert.alert('No Results', 'No user found with this query.');
      return;
    }

    let coalition = null;

    if (user?.login) {
      const data = await getCoalition(userLogin);
      if (data && data.length > 0) {
        coalition = data[0];
      } else {
        Alert.alert('No Results', 'No coalition found for this user.');
      }
    }
    navigation.navigate('Profile', { user, coalition });
  } catch (error) {
    console.error('Search error:', error);
     Alert.alert('Error', `${error.message}`);
  } finally {
    setLoading(false);
  }
};

  return (
    <View style={styles.container}>
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <Image
        style={styles.logo}
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/1200px-42_Logo.svg.png',
        }}
      />
      <Text style={styles.message}>{message}</Text>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder="Enter 42 username"
        defaultValue={text}
      />
     <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search User</Text>
        </TouchableOpacity>

       {!found && <Text style={styles.loadingText}>User not found</Text>}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center', 
    justifyContent: 'center',
  },
  logo: {
    width: 66,
    height: 58,
    marginBottom: 20,
  },
  message: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: 180,
    margin: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
 });
