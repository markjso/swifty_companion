import { Text, View, StyleSheet, Image, FlatList } from 'react-native';

export default function ProfileScreen({route, navigation }) {
  const {user} = route.params; 
  return (
    <View style={styles.container}>
      <Image
        style={styles.userImage}
        source={{ uri:user.image.link }}
        />
      <Text style={styles.text}>{user.firstName} - {user.login}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  userImage: {
    height: 100,
    width: 100,
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
});
