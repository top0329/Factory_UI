// import { ethers } from 'ethers';
import { useAtom } from 'jotai';

import { blueprintTokenListAtom } from '../jotai/atoms';
import useWeb3 from '../hooks/useWeb3';
import { BlueprintNFT } from '../types';

export default async function getBlueprintList() {
  const { blueprintContract } = useWeb3();
  const [, setBlueprintTokenList] = useAtom(blueprintTokenListAtom);

  try {
    const tempTokenList: Array<BlueprintNFT> = [];
    const blueprintTokenIds: Array<number> =
      await blueprintContract.getBlueprintIds();
    blueprintTokenIds.map(async (id: number) => {
      const blueprintToken: BlueprintNFT =
        await blueprintContract.getBlueprintNFTData(id);
      tempTokenList.push(blueprintToken);
    });

    setBlueprintTokenList(tempTokenList);
  } catch (error) {
    console.log(error);
  }
}
