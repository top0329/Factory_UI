import { useState } from "react";
import { useAtom } from "jotai";
import OwnBlueprintCard from "../../components/Cards/BlueprintCard/OwnBlueprintCard";
import SearchBar from "../../components/SearchBar";
import OwnBlueprintDetailsDrawer from "../../components/Drawers/OwnBlueprintDetailsDrawer";
// import BlueprintCard from "../../components/Cards/BlueprintCard/BlueprintCard";
import BlueprintInfoCard from "../../components/Cards/BlueprintInfoCard/BlueprintInfoCard";
import productData from "../../../own-blueprint-data.json";
import { selectedOwnBlueprintAtom } from "../../jotai/atoms";

const ProductPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [, setSelectedBlueprint] = useAtom(selectedOwnBlueprintAtom);

  // FUNCTION TO HANDLE OPEN ACTION ON SIDEDRAWER/MODAL
  const showSidebar = () => {
    setIsDrawerOpen(true);

    // Disables Background Scrolling whilst the SideDrawer/Modal is open
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
  };
  const handleBlueprintCardClicked = (blueprint: any) => {
    setSelectedBlueprint(blueprint);
    showSidebar();
  };
  return (
    <div className="flex flex-col min-w-[320px] gap-2 text-white">
      <h1 className="text-xl text-white 2xl:text-4xl lg:text-3xl md:text-2xl pt-3">
        Own Blueprints
      </h1>
      <div>
        <SearchBar />
      </div>
      <div className="grid grid-cols-2 pt-8 pb-16 xs:grid-cols-2 sm:grid-cols-3 md:gap-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2  xl:grid-cols-4">
        {productData.length > 0 &&
          productData.map((product) => {
            return (
              <div className="flex justify-center" key={product.id}>
                <OwnBlueprintCard
                  blueprintId={product.id}
                  name={product.name}
                  uri={product.uri}
                  balance={product.balance}
                  address={product.blueprintAddress}
                  myBlueprint={product.myBlueprint}
                  onClick={() => handleBlueprintCardClicked(product)}
                />
              </div>
            );
          })}
        <BlueprintInfoCard />
        {/* <BlueprintInfoCard /> */}
        {/* <BlueprintInfoCard /> */}
      </div>
      <OwnBlueprintDetailsDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </div>
  );
};

export default ProductPage;
