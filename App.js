import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, FlatList } from 'react-native';
import { searchUsers } from './api/api';

export default function App() {
  const [message, setMessage] = useState('Welcome to 42!');
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      const result = await searchUsers(query);
      setUsers(result);
    } catch (error) {
      console.error('Search error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
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
      <Button title="Search User" onPress={handleSearch} />

      {loading && <Text style={styles.loadingText}>Loading ..</Text>}

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text style={styles.userText}>{item.login}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1d1d',
  },
  logo: {
    width: 66,
    height: 58,
  },
  message: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    margin: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    padding: 10,
  },
  loadingText: {
    color: 'white',
  },
  userItem: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  userText: {
    color: 'white',
  },
});