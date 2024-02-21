import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import SearchBar from './components/SearchBar';
import PlatformStatus from './components/PlatformStatus';
import PlatformUsage from './components/PlatformUsage';
import FAQ from './components/FAQ';
import ScrollButton from './components/Button/ScrollDownButton';
import ComponentButton from './components/Button/ComponentButton';

function App() {
  return (
    <div className="">
      <Header />
      <h1 className="text-blue-900 text-4xl m-3">Here will be landing page!</h1>
      <br />
      <ScrollButton />
      <br />
      <ComponentButton />
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
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
