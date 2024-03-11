import { useState } from 'react';
import { useAtom } from 'jotai';
import SearchBar from '../../components/SearchBar';
import productData from '../../../own-blueprint-data.json';
import { selectedOwnBlueprintAtom } from '../../jotai/atoms';
import ProductCard from '../../components/Cards/BlueprintCard/ProductCard';
import ProductDetailsDrawer from '../../components/Drawers/ProductDetailsDrawer';

const DecomposePage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [, setSelectedBlueprint] = useAtom(selectedOwnBlueprintAtom);

  // FUNCTION TO HANDLE OPEN ACTION ON SIDEDRAWER/MODAL
  const showSidebar = () => {
    setIsDrawerOpen(true);

    // Disables Background Scrolling whilst the SideDrawer/Modal is open
    if (typeof window != 'undefined' && window.document) {
      document.body.style.overflow = 'hidden';
    }
  };
  const handleBlueprintCardClicked = (blueprint: any) => {
    setSelectedBlueprint(blueprint);
    showSidebar();
  };

  return (
    <div className="text-white">
      <div className="flex flex-col min-w-[320px] gap-2 text-white">
        <h1 className="text-xl text-white 2xl:text-4xl lg:text-3xl md:text-2xl pt-3">
          My Decompose
        </h1>
        <div>
          <SearchBar placeholders="Search for Proudct ID, Name and Creator" />
        </div>
        <div className="grid grid-cols-2 pt-8 pb-16 xs:grid-cols-2 sm:grid-cols-3 md:gap-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2  xl:grid-cols-4">
          {productData.length > 0 &&
            productData.map((product) => {
              return (
                <div className="flex justify-center" key={product.id}>
                  <ProductCard
                    blueprintId={product.id}
                    name={product.name}
                    uri={product.uri}
                    balance={product.balance}
                    address={product.blueprintAddress}
                    onClick={() => handleBlueprintCardClicked(product)}
                  />
                </div>
              );
            })}
        </div>
        <ProductDetailsDrawer
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />
      </div>
    </div>
  );
};

export default DecomposePage;
