import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState, useEffect } from 'react';

const getCursusArray = (cursus) => {
  return cursus.map((skill) => ({
    key: skill.cursus.id,
    name: skill.cursus.name,
  }));
};

export default function ProfileScreen({route, navigation }) {
  const {user} = route.params; 
  const [selectedCursus, setSelectedCursus] = useState('21');

    const cursusArray = user.cursus_users ? getCursusArray(user.cursus_users) : [];

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
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{user.firstName} {user.lastName}</Text>
      </View>  
      <View style={styles.row}>
        <Text style={styles.label}>Campus</Text>
        <Text style={styles.value}>{user.campus}</Text>
      </View>  
      <View style={styles.row}>
        <Text style={styles.label}>Wallet</Text>
        <Text style={styles.value}>{user.wallet} ₳</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Evaluation Points</Text>
        <Text style={styles.value}>{user.evalPoints}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>Skills</Text>
        {cursusArray.map((skill, index) => (
          <Text key={index} style={styles.text}>{skill.name}</Text>
        ))}
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
    marginBottom: 10,
  },
  label: {
    flex: 1,
    textAlign: 'left',
    fontSize: 20,
    color: 'gold',
    paddingLeft: 30,
  },
  value: {
    flex: 1,
    textAlign: 'right',
    fontSize: 20,
    color: 'white',
    paddingRight: 30,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
});
