import axios from 'axios';

export const tokenUriToName = async (uri: string) => {
  try {
    const {
      data: { name },
    } = await axios.get(`https://ipfs.io/${uri}`);
    return name;
  } catch (err) {
    console.log(err);
  }
};
