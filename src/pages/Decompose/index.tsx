import { useState } from "react";
import Button from "../../components/Button";
import ProductDetailsDrawer from "../../components/Drawers/ProductDetailsDrawer";

const DecomposePage = () => {
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
      This is decompose page!
      <Button
        text="Click here to see ProductDetailsDrawer"
        className="my-6"
        onClick={showSidebar}
      />
      <ProductDetailsDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </div>
  );
};

export default DecomposePage;
