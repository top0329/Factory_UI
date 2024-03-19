import { ethers } from 'ethers';
import { defaultRPC } from '../constants';
import useWeb3 from '../hooks/useWeb3';

export default async function getBlueprintList() {
  const provider = new ethers.JsonRpcProvider(defaultRPC);
  const { blueprintContract } = useWeb3();
  const blueprintTokenlist = [];

  try {
    const blueprintTokenIds = await blueprintContract.getBlueprintIds();
    blueprintTokenIds.map((id: number) => {
      const blueprintToken = await blueprintContract.getBlueprintNFTData(id);
    })
  }

}
