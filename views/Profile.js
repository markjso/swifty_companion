import { Text, View, StyleSheet, Image, TouchableOpacity, Alert, ScrollView  } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Progress from 'react-native-progress';

export default function ProfileScreen({ route, navigation }) {
  const { user } = route.params;

  const displaySkills = (skills) => {
    return skills
      .sort((a, b) => b.level - a.level)
      .map((skill) => (
        <View key={skill.id} style={styles.row}>
          <View style={styles.skill_level}>
            <Text style={styles.text}>{skill.name}: {skill.level}</Text>
            <View style={styles.progressBar}>
              <Progress.Bar 
                progress={skill.level / 10}
                width={200} 
                color='blue'
                borderWidth={0}
              />
             </View> 
          </View>
        </View>
      ));
  };

  const cursus = user.cursus_users && user.cursus_users.length > 1 ? user.cursus_users[1] : null;
  const skills = cursus ? cursus.skills : [];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color="white" />
      </TouchableOpacity>
      <Image style={styles.userImage} source={{ uri: user.profilePicture }} />
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
      <ScrollView>
        <View style={styles.skillContainer}>
          <Text style={styles.text}>Skills</Text>
          {skills.length > 0 ? (
            displaySkills(skills)
          ) : (
            <Text style={styles.text}>No skills found</Text>
          )}
        </View>
      </ScrollView>  
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
    marginBottom: 20,
    textAlign: 'center',
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
  skillContainer: {
    alignItems: 'left',
    justifyContent: 'center',
    backgroundColor: '#1e1d1d',
    paddingTop: 20,
  },
  skill_level: {
    flexDirection: 'row',
    textAlign: 'left',
  },
  progressBar: {
    marginTop: 5,
    width: '80%',
  },
});
