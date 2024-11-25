import axios from 'axios';
import { Alert } from 'react-native';
import * as SecureStore from "expo-secure-store";
import { CLIENT_ID, CLIENT_SECRET } from "@env";

const TOKEN_URL = "https://api.intra.42.fr/oauth/token";
const USER_URL = "https://api.intra.42.fr/v2/users/";

export const getAccessToken = async () => {
	const response = await axios.post(TOKEN_URL, {
		grant_type: "client_credentials",
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
	});

  	return response.data.access_token;
};

let accessToken = null;

async function initializeAccessToken() {
  accessToken = await getAccessToken();
}

initializeAccessToken();

export const searchUsers = async (login) => {
  if (!accessToken) {
    Alert.alert('Info', 'Initializing access token');
    await initializeAccessToken();
  }

  try {
    const response = await axios.get(`${USER_URL}/${login}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

   if (response.status === 200) {
     const data = response.data;
      const user = {
                    login: data.login,
                    user_id: data.id,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    email: data.email,
                    profilePicture: data.image.link,
                    wallet: data.wallet,
                    evalPoints: data.correction_point,
                    campus: data.campus[0].name,
                    cursus_users: data.cursus_users,
                    projects_users: data.projects_users,
      };
    return user;
    }
  } catch (error) {
    console.error('User does not exist', error);

    // Check if the error is a 401 Unauthorized, indicating token expiration
    if (error.response && error.response.status === 401) {
      Alert.alert('Info', 'Access token expired. Refreshing token.');
      
      // Refresh the token and retry the request
      await initializeAccessToken();

      try {
        const retryResponse = await axios.get(`${USER_URL}/${login}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return retryResponse.data;
      } catch (retryError) {
        console.error('Retry failed', retryError);
        throw new Error('Failed to fetch user data after retry');
      }
    }

    throw new Error('User does not exist');
  }
};

export const getCoalition = async (login) => {
  if (!accessToken) {
    Alert.alert('Info', 'Initializing access token');
    await initializeAccessToken();
  }

 try {
    const response = await axios.get(`${USER_URL}/${login}/coalitions`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching user coalition");
  }
}
