import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView  } from 'react-native';
import { useState } from 'react';

const getProjectColor = (project) => {
  if (project["validated?"] === true) {
    return "green";
  }
  if (project["validated?"] === false) {
    return "red";
  }
  if (project["final_mark"] === 0) {
    return "red";
  }
  switch (project.status) {
    case "in_progress":
      return "orange";
    case "finished":
      return "green";
    case "parent":
      return "red";
    default:
      return "white";
  }
};

export default function ProfileScreen({ route, navigation }) {
  const { user, coalition } = route.params;
  const projects_users = user.projects_users;
  const [imageLoaded, setImageLoaded] = useState(false);
  const profilePlaceholderImg = require("./../assets/headshot_placeholder.png")
 
  const listProjects = (projects_users) => {
    return projects_users
    .filter((project_user) => {
      return (
        project_user.status === 'in_progress' ||
     project_user.status == 'finished'
     );
    })
      .map((project_user) => (
        <View key={project_user.id} style={styles.projectContainer}>
          <View style={styles.projectRow}>
            <Text style={[styles.projectName, { color: getProjectColor(project_user) }]}>
              {project_user.project.name}
            </Text>
            <Text style={styles.projectScore}> 
            {project_user.final_mark !== null ? `Grade: ${project_user.final_mark}` : project_user.status}
            </Text>
          </View>
        </View>
      ))
  };

  const dynamicLabelStyle = {
    ...styles.label,
    color: coalition?.color || 'white', 
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skillsLink} onPress={() => navigation.navigate('Skills', {user})}>
        <Text style={styles.link}>Skills ></Text>
      </TouchableOpacity>
      <Image style={styles.userImage}
        source={imageLoaded ? { uri: user.profilePicture } : profilePlaceholderImg} 
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageLoaded(false)}
        />
      <View style={styles.row}>
        <Text style={dynamicLabelStyle}>Name</Text>
        <Text style={styles.value}>{user.firstName} {user.lastName}</Text>
      </View>
      <View style={styles.row}>
        <Text style={dynamicLabelStyle}>Campus</Text>
        <Text style={styles.value}>{user.campus}</Text>
      </View>
      <View style={styles.row}>
        <Text style={dynamicLabelStyle}>Wallet</Text>
        <Text style={styles.value}>{user.wallet} ₳</Text>
      </View>
      <View style={styles.row}>
        <Text style={dynamicLabelStyle}>Evaluation Points</Text>
        <Text style={styles.value}>{user.evalPoints}</Text>
      </View>
      <Text style={styles.title}>Projects</Text>
      <ScrollView>
        <View style={[styles.projectContainer, { alignItems: 'center' }]}>
        {projects_users.length > 0 ? (
          listProjects(projects_users)
        ) : (
          <Text style={styles.text}>No projects found</Text>
        )}
        </View>
      </ScrollView>   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f6f6f6',
    paddingTop: 30,
  },
  userImage: {
    height: 120,
    width: 120,
    borderRadius: 85,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
  },
  text: {
    fontSize: 20,
    color: 'white',
    marginTop: 10,
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
    fontSize: 19,
    paddingLeft: 20,
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
    textAlign: 'right',
    fontSize: 20,
    color: 'black',
    paddingRight: 20,
  },
  link: {
    fontSize: 18,
    color: 'blue',
    textAlign: 'right',
  },
  skillsLink: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  projectContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#1e1d1d',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  projectRow: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    width: '100%',
  },
  projectName: {
    flex: 1, 
    textAlign: 'left', 
    fontSize: 20,
    color: 'white',
  },
  projectScore: {
    textAlign: 'right', 
    fontSize: 20,
    color: 'white',
  },
});
