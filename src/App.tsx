import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import SearchBar from './components/SearchBar';
import PlatformStatus from './components/PlatformStatus';

function App() {
  return (
    <div className="bg-[#040A0F]">
      <Header />
      <h1 className="text-blue-900 text-4xl m-3">Here will be landing page!</h1>
      <br />
      <br />
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
