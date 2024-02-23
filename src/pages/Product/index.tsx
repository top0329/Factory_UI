import { useState } from "react";
import Button from "../../components/Button";
import OwnBlueprintDetailsDrawer from "../../components/Drawers/OwnBlueprintDetailsDrawer";

const ProductPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // FUNCTION TO HANDLE OPEN ACTION ON SIDEDRAWER/MODAL
  const showSidebar = () => {
    setIsDrawerOpen(true);

    // Disables Background Scrolling whilst the SideDrawer/Modal is open
    if (typeof window != 'undefined' && window.document) {
      document.body.style.overflow = 'hidden';
    }
  };
  
  return (
    <div className="text-white">
      This is product page!
      <Button
        text="Click here to see OwnBlueprintDetailsDrawer"
        className="my-6"
        onClick={showSidebar}
      />
      <OwnBlueprintDetailsDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </div>
  );
};

export default ProductPage;
