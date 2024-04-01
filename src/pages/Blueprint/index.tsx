import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { ethers } from 'ethers';

import SearchBar from '../../components/SearchBar';
import BlueprintDetailDrawer from '../../components/Drawers/BlueprintDetailsDrawer';
import BlueprintCard from '../../components/Cards/BlueprintCard/BlueprintCard';
import {
  blueprintSelectionState,
  blueprintTokenListAtom,
  isCreatorModeAtom,
  selectedBlueprintAtom,
} from '../../jotai/atoms';
import useWeb3 from '../../hooks/useWeb3';
import useToast from '../../hooks/useToast';
import { tokenUriToImageUri } from '../../utils/tokenUriToImageUri';

const BlueprintPage = () => {
  const { blueprintContract, account, isConnected } = useWeb3();
  const { showToast } = useToast();

  const navigate = useNavigate();

  const [blueprintTokenList, setBlueprintTokenList] = useAtom(
    blueprintTokenListAtom
  );
  const [, setSelectedBlueprint] = useAtom(selectedBlueprintAtom);
  const [, setBlueprintSelectionState] = useAtom(blueprintSelectionState);
  const [isCreatorMode, setIsCreatorMode] = useAtom<boolean>(isCreatorModeAtom);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    async function getBlueprints() {
      try {
        const blueprintTokenIds: string[] =
          await blueprintContract.getBlueprintIds();
        const blueprints: any[] = await Promise.all(
          blueprintTokenIds.map(async (id: string) => {
            const blueprint = await blueprintContract.getBlueprintNFTData(id);
            const temp = [...blueprint];
            try {
              temp[2] = await tokenUriToImageUri(temp[2]);
              if (Number(temp[6]) === 0) {
                temp[5] = ethers.formatEther(temp[5]);
              } else {
                temp[5] = ethers.formatUnits(temp[5], 6);
              }
            } catch (err) {
              console.log(err);
            }
            return temp;
          })
        );
        const keys = [
          'id',
          'name',
          'uri',
          'creator',
          'totalSupply',
          'mintPrice',
          'mintPriceUnit',
          'mintLimit',
          'mintedAmount',
          'data',
        ];

        const _blueprints = blueprints.map((item: any[]) => {
          return keys.reduce(
            (acc: any, key: string, index: number) => ({
              ...acc,
              [key]: item[index],
            }),
            {}
          );
        });
        for (let i = 0; i < _blueprints.length; i++) {
          const _item = _blueprints[i].data;
          _blueprints[i].data = {
            erc20Data: _item[0].map((params: any) => ({
              tokenAddress: params[0],
              amount: params[1],
            })),
            erc721Data: _item[1].map((params: any) => ({
              tokenAddress: params[0],
              tokenId: params[1],
            })),
            erc1155Data: _item[2].map((params: any) => ({
              tokenAddress: params[0],
              tokenId: params[1],
              amount: params[2],
            })),
          };
        }
        setBlueprintTokenList(_blueprints);
      } catch (err) {
        console.log(err);
      }
    }
    getBlueprints();
  }, [blueprintContract, setBlueprintTokenList]);

  const showSidebar = () => {
    setIsDrawerOpen(true);
    if (typeof window != 'undefined' && window.document) {
      document.body.style.overflow = 'hidden';
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCreatorMode(event.target.checked);
  };

  const handleBlueprintCardClicked = (blueprint: any) => {
    setSelectedBlueprint(blueprint);
    showSidebar();
  };

  const handleMintNowButtonClicked = (blueprint: any) => {
    if (isConnected) {
      setSelectedBlueprint(blueprint);
      setBlueprintSelectionState(blueprint);
      navigate(`/blueprint/mint/${blueprint.id}`);
    } else {
      showToast('warning', 'Please connect your wallet first');
    }
  };

  return (
    <div className="min-w-[320px]">
      <div className="flex justify-between items-center py-3">
        <h1 className="text-xl text-white 2xl:text-4xl lg:text-3xl md:text-2xl">
          Blueprints
        </h1>
        <div className="flex justify-between items-center gap-4">
          <h4 className="text-light-gray text-base">Creator Mode</h4>
          <label className="flex flex-col cursor-pointer select-none items-start gap-2">
            <div className="relative">
              <input
                name="creator-mode"
                type="checkbox"
                checked={isCreatorMode}
                onChange={handleCheckboxChange}
                className="sr-only"
              />
              <div
                className={`box block h-6 w-10 rounded-full ${
                  isCreatorMode ? 'bg-primary' : 'bg-light-gray'
                }`}
              ></div>
              <div
                className={`absolute left-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white transition ${
                  isCreatorMode ? 'translate-x-full' : ''
                }`}
              ></div>
            </div>
          </label>
        </div>
      </div>
      <SearchBar
        pageFilter="normal"
        isNewButton
        advancedFilter
        placeholders="Search for Blueprint ID, Name and Creator"
      />
      <div className="grid grid-cols-2 pt-8 pb-16 gap-2 xs:grid-cols-2 sm:grid-cols-3 md:gap-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
        {blueprintTokenList.length > 0 &&
          blueprintTokenList.map((blueprint) => {
            return (
              <div className="flex justify-center" key={Number(blueprint.id)}>
                <BlueprintCard
                  blueprintId={Number(blueprint.id)}
                  name={blueprint.name}
                  uri={blueprint.uri}
                  myBlueprint={blueprint.creator === account}
                  totalSupply={Number(blueprint.totalSupply)}
                  mintPrice={Number(blueprint.mintPrice)}
                  mintUnit={Number(blueprint.mintPriceUnit)}
                  mintLimit={Number(blueprint.mintLimit)}
                  button={!isCreatorMode}
                  onClick={() => handleBlueprintCardClicked(blueprint)}
                  onClickMint={() => handleMintNowButtonClicked(blueprint)}
                />
              </div>
            );
          })}
      </div>
      <BlueprintDetailDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </div>
  );
};

export default BlueprintPage;
