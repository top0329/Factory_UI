export const factoryAddress = {
  sepolia: '0x0300C57Aa0A4E6d70DaB6b861683Adb812A19cDb'.toLocaleLowerCase(),
  polygon: '0x6Aeb5002df026ed10193A1052D76081F5d043d1C'.toLocaleLowerCase(),
  amoy: '0x67a22B86482228b514e55D73931f763418eAaB2a'.toLocaleLowerCase(),
};
export const blueprintAddress = {
  sepolia: '0xD03513A6135FdB9A74a303D9f33c1F872b7Fe454'.toLocaleLowerCase(),
  polygon: '0x2439dc49D0ECABeD01B282B875743768E7c0D458'.toLocaleLowerCase(),
  amoy: '0x5a18EF8096Eb3a5ab331c700336Ff3EDc6157D96'.toLocaleLowerCase(),
};
export const productAddress = {
  sepolia: '0xC4B7826e1275c3058019d7654E13E4058a00Bb08'.toLocaleLowerCase(),
  polygon: '0x4eF7388B30e8f75BC9142218F3f7D3C8f61dFb12'.toLocaleLowerCase(),
  amoy: '0x2a54bC9eBd293D218ccbbB23556067B391B8d568'.toLocaleLowerCase(),
};
export const usdtAddress = {
  sepolia: '0xaa8e23fb1079ea71e0a56f48a2aa51851d8433d0'.toLocaleLowerCase(),
  polygon: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F'.toLocaleLowerCase(),
  amoy: '0xbCF39d8616d15FD146dd5dB4a86b4f244A9Bc772'.toLocaleLowerCase(),
};
export const usdcAddress = {
  sepolia: '0x94a9d9ac8a22534e3faca9f4e7f2e2cf85d5e4c8'.toLocaleLowerCase(),
  polygon: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'.toLocaleLowerCase(),
  amoy: '0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582'.toLocaleLowerCase(),
};

export const defaultRPC = {
  sepolia: 'https://ethereum-sepolia-rpc.publicnode.com',
  polygon: 'https://polygon-rpc.com/',
  amoy: 'https://rpc-amoy.polygon.technology/',
};

export const invalidChars = /['"`\\;%&!@#$%^?~*]/;

export const PINATA = {
  FILE_UPLOAD: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
  JSON_UPLOAD: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
};

export const DefaultErc20ImageUri =
  'https://ipfs.io/ipfs/bafybeigzqwt7uavnlrj3nq44hyoicf3jcbfxi2iih6uaguj3za5t3aqxoi';
export const DefaultErc721ImageUri =
  'https://ipfs.io/ipfs/bafybeic6vxo3n4qxahvviwqayc4byweqfhiufijs6yxxruvwq452xdg56e';
export const DefaultErc1155ImageUri =
  'https://ipfs.io/ipfs/bafybeiep2v3wglztuqecw5ieggxaswirc2qrptss6auq6geoewy6risbqm';

export const CHAIN_EXPLORER = {
  main: 'https://etherscan.io',
  sepolia: 'https://sepolia.etherscan.io',
  polygon: 'https://polygonscan.com',
  amoy: 'https://www.oklink.com/amoy',
};

export const TOKEN_DETAIL_DATA_URL = {
  main: 'https://api.coingecko.com/api/v3/coins/ethereum/contract',
  polygon: 'https://api.coingecko.com/api/v3/coins/polygon/contract',
};
