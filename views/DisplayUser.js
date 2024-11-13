import { Text, View, StyleSheet, Image, FlatList } from 'react-native';

export default function DisplayUser() {
  const [users, setUsers] = useState([]); 
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Local files and assets can be imported by dragging and dropping them into the editor
      </Text>
      <Image
        style={styles.userImage}
        source={{ uri:user.image.link }}
        />
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Text>{item.login}</Text>  
            <Text>{item.email}</Text>
            <Text>{item.first_name} {item.last_name}</Text>
            <Text>{item.correction_point}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userImage: {
    height: 100,
    width: 100,
    marginBottom: 10,
  }
});
