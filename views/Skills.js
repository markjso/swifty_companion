import { Text, View, StyleSheet, ScrollView  } from 'react-native';
import * as Progress from 'react-native-progress';

export default function SkillsScreen({ route }) {
  const { user } = route.params;
 
  const displaySkills = (skills) => {
    return skills
      .sort((a, b) => b.level - a.level)
      .map((skill) => (
        <View key={skill.id} style={styles.skillItem}>
          <View style={styles.skillRow}>
            <Text style={styles.text}>{skill.name}: {skill.level}</Text>
          </View>
          <Progress.Bar 
            progress={skill.level / 20}
            width={200} 
            color="blue"
            borderWidth={0}
            style={styles.progressBar}
          />
        </View>
      ));
  };

  const cursus = user.cursus_users && user.cursus_users.length > 1 ? user.cursus_users[1] : null;
  const skills = cursus ? cursus.skills : [];

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.skillContainer}>
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
    flex: 1,
  },
  text: {
    fontSize: 20,
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
  },
  skillContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#36454F',
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  skillItem: {
    marginBottom: 10,
  },
  skillRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  progressBar: {
    marginTop: 10,
  },
});
