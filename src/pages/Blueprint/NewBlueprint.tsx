import ComponentButton from '../../components/Button/ComponentButton';
import BlueprintInfoCard from '../../components/Cards/BlueprintInfoCard/BlueprintInfoCard';
import AddComponentModal from '../../components/Modals/AddComponentModal';

const NewBlueprintPage = () => {
  return (
    <div className="text-white">
      <div className="flex justify-between items-center py-3">
        <h1 className="text-3xl">New Blueprint</h1>
        <h3 className="text-xl">
          Available Component: <span>7</span>
        </h3>
      </div>
      <div className="grid grid-cols-4 pt-6 pb-16 gap-6">
        <div className="col-span-1">
          <BlueprintInfoCard />
        </div>
        <div className="col-span-3">
          <div className="grid grid-cols-4 gap-3">
            <ComponentButton />
          </div>
        </div>
      </div>
      <AddComponentModal />
    </div>
  );
};

export default NewBlueprintPage;
