import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import SearchBar from './components/SearchBar';
import PlatformStatus from './components/PlatformStatus';
import PlatformUsage from './components/PlatformUsage';
import Robot from './assets/svg/robot.svg';
import DefaultBlueprintCard from './components/Cards/default';
import ScrollButton from './components/Button/ScrollDownButton';

function App() {
  return (
    <div className="bg-[#040A0F]">
      <Header />
      <h1 className="text-blue-900 text-4xl m-3">Here will be landing page!</h1>
      <br />
      <DefaultBlueprintCard
        imageLink={Robot}
        name="Robot"
        blueprintid={28}
        tsupply={1000000000}
        mintPrice={0.001}
        mintLimit={100}
      />
      <br />
      <ScrollButton />
      <br />
      <br />
      <br />
      <SearchBar />
      <br />
      <br />
      <PlatformStatus
        blueprints={112}
        creators={91}
        mintedBlueprints={68}
        products={55}
      />
      <br />
      <PlatformUsage />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default App;
