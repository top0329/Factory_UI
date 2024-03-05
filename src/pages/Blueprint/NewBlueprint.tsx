import ComponentButton from '../../components/Button/ComponentButton';
import BlueprintInfoCard from '../../components/Cards/BlueprintInfoCard/BlueprintInfoCard';

const NewBlueprintPage = () => {
  return (
    <div className="text-white">
      {/* <div className="flex justify-between items-center py-3 bg-[#01060e] px-6 xl:px-20 lg:px-16 md:px-12 sm:px-10 2xl:max-w-[1536px] 2xl:min-w-full"> */}
      <div className="flex justify-between items-center py-3">
        <h1 className="text-3xl">New Blueprint</h1>
        <h3 className="text-xl">
          Available Component: <span>7</span>
        </h3>
      </div>
      <div className="grid grid-cols-4 pt-8 pb-16 gap-3">
        <div className="col-span-1">
          <BlueprintInfoCard />
        </div>
        <div className="col-span-3">
          <div className="grid grid-cols-4 gap-3">
            <ComponentButton />
            <ComponentButton />
            <ComponentButton />
            <ComponentButton />
            <ComponentButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBlueprintPage;
