import axios from 'axios';

const INTRA_CLIENT_ID = "u-s4t2ud-f38935f9680154b391f5f4f4540a392546731f574fbd3502235239a7f754be59";
const INTRA_CLIENT_SECRET = "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";

async function getAccessToken() {
try {
	const response = await axios.post('https://api.intra.42.fr/oauth/token', {
		grant_type: 'client_credentials',
		client_id: INTRA_CLIENT_ID,
		client_secret: INTRA_CLIENT_SECRET,
});

  	return response.data.access_token;
	} catch (error) {
		console.error('Error fetching access token', error);
		throw new Error('Failed to fetch access token');
	}
}

let accessToken = null;

async function initializeAccessToken() {
  accessToken = await getAccessToken();
}

initializeAccessToken();

async function searchUsers(query) {
  if (!accessToken) {
    await initializeAccessToken();
  }

  try {
    const response = await axios.get('https://api.intra.42.fr/v2/users', {
      params: {
        search: query,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching users', error);
    throw new Error('Failed to fetch user data');
  }
}
 export {searchUsers};