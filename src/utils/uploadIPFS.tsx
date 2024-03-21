import axios from 'axios';
import FormData from 'form-data';
import { PINATA } from '../constants';
import { PINATA_JWT } from '../constants';

export const uploadFileToIPFS = async (
  selectedFile: File | null,
  fileName: string
) => {
  try {
    if (!selectedFile) throw new Error('No file selected');

    console.log('uploading image file to IPFS...');
    const formData = new FormData();
    formData.append('file', selectedFile);

    if (fileName) {
      const pinataMetadata = JSON.stringify({ name: fileName });
      formData.append('pinataMetadata', pinataMetadata);
    }
    const pinataOptions = JSON.stringify({ cidVersion: 1 });
    formData.append('pinataOptions', pinataOptions);

    const uploadResponse = await axios.post(PINATA.FILE_UPLOAD, formData, {
      maxBodyLength: Infinity,
      headers: {
        'Content-Type': `multipart/form-data`,
        Authorization: `Bearer ${PINATA_JWT}`,
      },
    });

    const imageHash = uploadResponse.data.IpfsHash;
    console.log(
      'Image uploaded to IPFS with hash ====================> ',
      `https://ipfs.io/ipfs/${imageHash}`
    );
    return imageHash;
  } catch (error) {
    console.error('Error uploading image file:', error);
    throw error;
  }
};

export const uploadJSONToIPFS = async (fileName: string, json?: any) => {
  // Post JSON with image details
  try {
    if (!json) throw new Error('No json to upload');

    console.log('uploading json to IPFS...');

    const data = JSON.stringify({
      pinataContent: json,
      pinataOptions: { cidVersion: 1 },
      pinataMetadata: {
        name: `${fileName}_metadata.json`,
      },
    });

    // const data = JSON.stringify({
    //   pinataContent: {
    //     name: fileName,
    //     description: 'A nice Blueprint NFT of Pinnie the Pinata',
    //     external_url: 'https://pinata.cloud',
    //     image_uri: `https://ipfs.io/ipfs/${imageHash}`,
    //   },
    //   pinataMetadata: {
    //     name: `${fileName}_metadata.json`,
    //   },
    // });

    const jsonUpload = await axios.post(PINATA.JSON_UPLOAD, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${PINATA_JWT}`,
      },
    });

    const jsonHash = jsonUpload.data.IpfsHash;
    console.log(
      'JSON uploaded to IPFS with hash =====================> ',
      `https://ipfs.io/ipfs/${jsonHash}`
    );
    return `https://ipfs.io/ipfs/${jsonHash}`;
  } catch (error) {
    console.error('Error uploading json file:', error);
    throw error;
  }
};
