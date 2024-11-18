import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ProfileScreen({route, navigation }) {
  const {user} = route.params; 
  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color='white'/>
        </TouchableOpacity>
      <Image
        style={styles.userImage}
        source={{ uri:user.profilePicture }}
        />
      <View style={styles.row}>
        <Text style={styles.text}>{user.firstName} {user.lastName}</Text>
        <Text style={styles.text}>{user.login}</Text>
        <Text style={styles.label}>Wallet</Text>
        <Text style={styles.value}>{user.wallet} ₳</Text>
        <Text style={styles.text}>Evaluation Points {user.evalPoints}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e1d1d',
    paddingTop: 50,
  },
  userImage: {
    height: 100,
    width: 100,
    borderRadius: 85,
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    flex: 1,
    textAlign: 'left',
    fontSize: 20,
    color: 'yellow',
  },
  value: {
    flex: 1,
    textAlign: 'right',
    fontSize: 20,
    color: 'white',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
});
