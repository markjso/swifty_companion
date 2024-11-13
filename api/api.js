import axios from 'axios';
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
    Alert.alert('Info', `Searching for user: ${user}`);
    const response = await axios.get(`${USER_URL}${login}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    Alert.alert('Info', 'User data fetched successfully');
    return response.data;
  } catch (error) {
    Alert.alert('Error', 'Error fetching users');
    console.error('Error fetching users', error);
    throw new Error('Failed to fetch user data');
  }
};