import ScrollButton from '../../components/Button/ScrollDownButton';
import FAQ from '../../components/FAQ';
import PlatformStatus from '../../components/PlatformStatus';
import PlatformUsage from '../../components/PlatformUsage';

const LandingPage = () => {
  return (
    <div className="text-white bg-landing">
      <p>This is landing page!</p>
      <ScrollButton />
      <PlatformStatus
        blueprints={112}
        creators={91}
        mintedBlueprints={68}
        products={55}
      />
      <PlatformUsage />
      <FAQ />
    </div>
  );
};

export default LandingPage;
