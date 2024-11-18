import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export default function ProfileScreen({ route, navigation }) {
  const { user } = route.params;
  
  const displaySkills = (skills) => {
    return skills
      .sort((a, b) => b.level - a.level)
      .map((skill) => (
        <View key={skill.id} style={styles.container}>
          <Text
            style={[
              styles.text,
              {
                fontSize: skill.name.length > 30 ? 12 : 14,
              },
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {skill.name}
          </Text>

          <View style={styles.skill_level}>
            <Text style={styles.text}>lvl {skill.level}</Text>
          </View>
        </View>
      ));
  };

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
      <View style={styles.container}>
        <Text style={styles.text}>Skills</Text>
        {user.cursus_users[1].skills.length > 0 && (
        <Text style={styles.text}>Skills:</Text>
      )}
        {displaySkills(user.cursus_users[1].skills)}
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
  skill_level: {
    flexDirection: "row",
    alignItems: "center",
  },
});
