import axios from 'axios';

export const tokenUriToImageUri = async (uri: string) => {
  try {
    const {
      data: { image },
    } = await axios.get(`https://ipfs.io/${uri}`);
    return `https://ipfs.io/${image}`;
  } catch (err) {
    console.log(err);
  }
};
