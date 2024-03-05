import React, { useState } from 'react';
import { useAtom } from 'jotai';

import SearchBar from '../../components/SearchBar';
import BlueprintDetailDrawer from '../../components/Drawers/BlueprintDetailsDrawer';
import BlueprintCard from '../../components/Cards/BlueprintCard/BlueprintCard';
import { isCreatorModeAtom, selectedBlueprintAtom } from '../../jotai/atoms';

import blueprintData from '../../../blueprint-data.json';

const BlueprintPage = () => {
  const [, setSelectedBlueprint] = useAtom(selectedBlueprintAtom);
  const [isCreatorMode, setIsCreatorMode] = useAtom<boolean>(isCreatorModeAtom);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // FUNCTION TO HANDLE OPEN ACTION ON SIDEDRAWER/MODAL
  const showSidebar = () => {
    setIsDrawerOpen(true);

    // Disables Background Scrolling whilst the SideDrawer/Modal is open
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

  return (
    <React.Fragment>
      <div className="flex justify-between items-center py-3">
        <h1 className="text-xl text-white 2xl:text-4xl lg:text-3xl md:text-2xl">
          Blueprint
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
      <SearchBar isNewButton />
      <div className="grid grid-cols-5 pt-8 pb-20 gap-8">
        {blueprintData.length > 0 &&
          blueprintData.map((blueprint) => {
            return (
              <div className="col-span-1" key={blueprint.id}>
                <BlueprintCard
                  blueprintId={blueprint.id}
                  name={blueprint.name}
                  uri={blueprint.uri}
                  mintUnit={blueprint.mintPriceUnit}
                  totalSupply={blueprint.totalSupply}
                  mintPrice={blueprint.mintPrice}
                  mintLimit={blueprint.mintLimit}
                  myCardBadge={blueprint.myBlueprint}
                  button={!isCreatorMode}
                  onClick={() => handleBlueprintCardClicked(blueprint)}
                />
              </div>
            );
          })}
      </div>
      <BlueprintDetailDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </React.Fragment>
  );
};

export default BlueprintPage;
