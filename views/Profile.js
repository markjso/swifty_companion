import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const INTRA_CLIENT_ID = "u-s4t2ud-f38935f9680154b391f5f4f4540a392546731f574fbd3502235239a7f754be59";
const INTRA_CLIENT_SECRET = "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";
const TOKEN_URL = "https://api.intra.42.fr/oauth/token";
const USER_URL = "https://api.intra.42.fr/v2/users/";

export const getAccessToken = async () => {
	const response = await axios.post(TOKEN_URL, {
		grant_type: "client_credentials",
		client_id: INTRA_CLIENT_ID,
		client_secret: INTRA_CLIENT_SECRET,
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
                    firstName: data.first_name,
                    lastName: data.last_name,
                    email: data.email,
                    profilePicture: data.image.link,
                    wallet: data.wallet,
                    evalPoints: data.correction_point,
                    campus: data.campus[0].name,
                    cursus: data.cursus_users[0],
      };
    return user;
    }
  } catch (error) {
    console.error('Error fetching users', error);

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
        Alert.alert('Info', 'User data fetched successfully after retry');
        return retryResponse.data;
      } catch (retryError) {
        console.error('Retry failed', retryError);
        throw new Error('Failed to fetch user data after retry');
      }
    }

    Alert.alert('Error', 'User does not exist');
    throw new Error('Failed to fetch user data');
  }
};
