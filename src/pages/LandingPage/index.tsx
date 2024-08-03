import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import AOS from 'aos';
import { useAtom } from 'jotai';
import { Contract, ethers } from 'ethers';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Helmet } from 'react-helmet';
import { HeadProvider, Title, Link, Meta } from 'react-head';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ScrollButton from '../../components/Button/ScrollDownButton';
import PlatformUsage from '../../components/PlatformUsage';
import BlueprintCardForCarousel from '../../components/Cards/BlueprintCard/BlueprintCardForCarousel';
import Union from '../../assets/images/union.png';
import CardFront from '../../assets/images/card-front.png';
import SmallBlueprintCardImage from '../../assets/images/small-blueprint-card.png';
import Image from '../../components/Image';
import HelmetImage from '../../assets/images/helmet.jpg';
import ArmorImage from '../../assets/images/armor.jpg';
import SwordImage from '../../assets/images/sword.jpg';
import BlackTeaImage from '../../assets/images/black-tea.webp';
import GoldCoinImage from '../../assets/images/gold-coin.webp';
import MilkTeaImage from '../../assets/images/milk-tea.webp';
import CoffeeImage from '../../assets/images/coffee.webp';
import SilverCoinImage from '../../assets/images/siliver-coin.webp';
import FactoryABI from '../../abi/FactoryABI.json';
import BlueprintABI from '../../abi/BlueprintABI.json';
import ProductABI from '../../abi/ProductABI.json';
import { searchValueAtom } from '../../jotai/atoms';
import {
  blueprintAddress,
  defaultRPC,
  factoryAddress,
  invalidChars,
  productAddress,
} from '../../constants';

function SampleNextArrow(props: React.HTMLAttributes<SVGSVGElement>) {
  const { className, onClick } = props;
  return (
    <Icon
      className={`${className} !w-7 !h-7 !mr-4 !text-light-gray !bg-gray-800 rounded-full duration-300 ease-in-out hover:!bg-default sm:!h-9 sm:!w-9 sm:!mr-2`}
      icon="material-symbols:keyboard-arrow-right"
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: React.HTMLAttributes<SVGSVGElement>) {
  const { className, onClick } = props;
  return (
    <Icon
      className={`${className} z-30 !w-7 !h-7 !ml-4 !text-light-gray !bg-gray-800 rounded-full duration-300 ease-in-out hover:!bg-default sm:!h-9 sm:!w-9 sm:!ml-2`}
      icon="material-symbols:keyboard-arrow-left"
      onClick={onClick}
    />
  );
}

const LandingPage = () => {
  const settings = {
    swipeToSlide: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1535,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 459,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useAtom<string>(searchValueAtom);

  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [blueprintsValue, setBlueprintsValue] = useState<any>({
    mainnet: 0,
    bsc: 0,
    polygon: 0,
  });
  const [creatorsValue, setCreatorsValue] = useState<any>({
    mainnet: 0,
    bsc: 0,
    polygon: 0,
  });
  const [mintedBlueprintsValue, setMintedBlueprintsValue] = useState<any>({
    mainnet: 0,
    bsc: 0,
    polygon: 0,
  });
  const [blueprintCreationFee, setBlueprintCreationFee] = useState<any>({
    mainnet: 0,
    bsc: 0,
    polygon: 0,
  });
  const [decomposeFee, setDecomposeFee] = useState<any>({
    mainnet: 0,
    bsc: 0,
    polygon: 0,
  });
  const [productsValue, setProductsValue] = useState<any>({
    mainnet: 0,
    bsc: 0,
    polygon: 0,
  });
  const [isScrollAtBottom, setIsScrollAtBottom] = useState<boolean>(false);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const _blueprints: any = { mainnet: 0, bsc: 0, polygon: 0 };
      const _blueprintCreators: any = { mainnet: 0, bsc: 0, polygon: 0 };
      const _mintedBlueprints: any = { mainnet: 0, bsc: 0, polygon: 0 };
      const _products: any = { mainnet: 0, bsc: 0, polygon: 0 };
      const _blueprintCreationFee: any = { mainnet: 0, bsc: 0, polygon: 0 };
      const _decomposeFee: any = { mainnet: 0, bsc: 0, polygon: 0 };
      const mainnetProvider = new ethers.JsonRpcProvider(defaultRPC.mainnet);
      const mainnetFactoryContract = new ethers.Contract(
        factoryAddress.mainnet,
        FactoryABI,
        mainnetProvider
      ) as Contract;
      const mainnetBlueprintContract = new ethers.Contract(
        blueprintAddress.mainnet,
        BlueprintABI,
        mainnetProvider
      ) as Contract;
      const mainnetProductContract = new ethers.Contract(
        productAddress.mainnet,
        ProductABI,
        mainnetProvider
      ) as Contract;
      const _mainnetBlueprintIds =
        await mainnetBlueprintContract.getBlueprintIds();
      _blueprints.mainnet = _mainnetBlueprintIds.length;
      const _mainnetBlueprintCreators =
        await mainnetBlueprintContract.getBlueprintCreators();
      _blueprintCreators.mainnet = _mainnetBlueprintCreators.length;
      _mintedBlueprints.mainnet =
        await mainnetBlueprintContract.totalMintedBlueprintTokens();
      const _mainnetProductIds = await mainnetProductContract.getProductIDs();
      _products.mainnet = _mainnetProductIds.length;
      const _mainnetBlueprintCreationFee =
        await mainnetFactoryContract.blueprintCreationFee();
      _blueprintCreationFee.mainnet = ethers.formatEther(
        _mainnetBlueprintCreationFee
      );
      const _mainnetDecomposeFee =
        await mainnetFactoryContract.productDecomposeFee();
      _decomposeFee.mainnet = ethers.formatEther(_mainnetDecomposeFee);
      const bscProvider = new ethers.JsonRpcProvider(defaultRPC.bsc);
      const bscFactoryContract = new ethers.Contract(
        factoryAddress.bsc,
        FactoryABI,
        bscProvider
      ) as Contract;
      const bscBlueprintContract = new ethers.Contract(
        blueprintAddress.bsc,
        BlueprintABI,
        bscProvider
      ) as Contract;
      const bscProductContract = new ethers.Contract(
        productAddress.bsc,
        ProductABI,
        bscProvider
      ) as Contract;
      const _bscBlueprintIds = await bscBlueprintContract.getBlueprintIds();
      _blueprints.bsc = _bscBlueprintIds.length;
      const _bscBlueprintCreators =
        await bscBlueprintContract.getBlueprintCreators();
      _blueprintCreators.bsc = _bscBlueprintCreators.length;
      _mintedBlueprints.bsc =
        await bscBlueprintContract.totalMintedBlueprintTokens();
      const _bscProductIds = await bscProductContract.getProductIDs();
      _products.bsc = _bscProductIds.length;
      const _bscBlueprintCreationFee =
        await bscFactoryContract.blueprintCreationFee();
      _blueprintCreationFee.bsc = ethers.formatEther(_bscBlueprintCreationFee);
      const _bscDecomposeFee = await bscFactoryContract.productDecomposeFee();
      _decomposeFee.bsc = ethers.formatEther(_bscDecomposeFee);
      const polygonProvider = new ethers.JsonRpcProvider(defaultRPC.polygon);
      const polygonFactoryContract = new ethers.Contract(
        factoryAddress.polygon,
        FactoryABI,
        polygonProvider
      ) as Contract;
      const polygonBlueprintContract = new ethers.Contract(
        blueprintAddress.polygon,
        BlueprintABI,
        polygonProvider
      ) as Contract;
      const polygonProductContract = new ethers.Contract(
        productAddress.polygon,
        ProductABI,
        polygonProvider
      ) as Contract;
      const _polygonBlueprintIds =
        await polygonBlueprintContract.getBlueprintIds();
      _blueprints.polygon = _polygonBlueprintIds.length;
      const _polygonBlueprintCreators =
        await polygonBlueprintContract.getBlueprintCreators();
      _blueprintCreators.polygon = _polygonBlueprintCreators.length;
      _mintedBlueprints.polygon =
        await polygonBlueprintContract.totalMintedBlueprintTokens();
      const _polygonProductIds = await polygonProductContract.getProductIDs();
      _products.polygon = _polygonProductIds.length;
      const _polygonBlueprintCreationFee =
        await polygonFactoryContract.blueprintCreationFee();
      _blueprintCreationFee.polygon = ethers.formatEther(
        _polygonBlueprintCreationFee
      );
      const _polygonDecomposeFee =
        await polygonFactoryContract.productDecomposeFee();
      _decomposeFee.polygon = ethers.formatEther(_polygonDecomposeFee);
      setBlueprintsValue(_blueprints);
      setCreatorsValue(_blueprintCreators);
      setMintedBlueprintsValue(_mintedBlueprints);
      setProductsValue(_products);
      setBlueprintCreationFee(_blueprintCreationFee);
      setDecomposeFee(_decomposeFee);
    }
    fetchData();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const smoothScrollTo = (duration: number) => {
    const startY = window.scrollY;
    const distanceY = window.innerHeight;
    let startTime: number = 0;
    const easeInOutCubic = (time: number) =>
      time < 0.5 ? 4 * time * time * time : 1 - Math.pow(-2 * time + 2, 3) / 2;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const time = timestamp - startTime;
      const percent = Math.min(time / duration, 1);
      const easedPercent = easeInOutCubic(percent);
      window.scrollTo(0, startY + easedPercent * distanceY);
      if (time < duration) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };

  const scrollToSection = () => {
    smoothScrollTo(1000);
  };

  const smoothScrollToTop = (duration: number) => {
    const startY = window.scrollY;
    const distanceY = startY;
    let startTime: number = 0;
    const easeInOutCubic = (time: number) =>
      time < 0.5 ? 4 * time * time * time : 1 - Math.pow(-2 * time + 2, 3) / 2;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const time = timestamp - startTime;
      const percent = Math.min(time / duration, 1);
      const easedPercent = easeInOutCubic(percent);
      window.scrollTo(0, startY - easedPercent * distanceY);
      if (time < duration) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };

  const handleScrollToTop = () => {
    smoothScrollToTop(1000);
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const isAtEndOfPage = scrollY + windowHeight >= documentHeight;
    setIsScrollAtBottom(isAtEndOfPage);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (invalidChars.test(value)) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
      return;
    } else {
      setSearchValue(value);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      navigate('/blueprint');
    }
  };

  return (
    <HeadProvider>
      <div className="relative text-white bg-landing overflow-hidden pb-10">
        <Title>Factory - Factory</Title>
        <Link rel="canonical" href="http://factorygame.org/" />
        <Meta
          name="description"
          content="This is factorygame.org. Here you can get the unique 'Product Token' which is combined of 'blueprint token' and component tokens - ERC20, ERC721 and ERC1155 tokens"
        />
        <Meta
          name="keyword"
          content="Factory, Factory1155, Blueprint, Product, Custody, Component Token, Combine, Synthesis, Decompose"
        />
        <Helmet>
          <link rel="preload" as="image" href={Union} />
          <link rel="preload" as="image" href={CardFront} />
          <link rel="preload" as="image" href={SmallBlueprintCardImage} />
          <meta
            name="description"
            content="This is factorygame.org. Here you can get the unique 'Product Token' which is combined of 'blueprint token' and component tokens - ERC20, ERC721 and ERC1155 tokens"
          />
          <meta
            name="keyword"
            content="Factory, Factorygame, Blueprint, Product, Custody, Component Token, Combine, Synthesis, Decompose"
          />
          <meta property="og:title" content="Factory" />
          <meta
            property="og:description"
            content="This is factorygame.org. Here you can get the unique 'Product Token' which is combined of 'blueprint token' and component tokens - ERC20, ERC721 and ERC1155 tokens."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://factorygame.org/" />
          <meta property="twitter:title" content="Factory1155" />
          <meta
            property="twitter:description"
            content="This is factorygame.org. Here you can get the unique 'Product Token' which is combined of 'blueprint token' and component tokens - ERC20, ERC721 and ERC1155 tokens"
          />
        </Helmet>
        <img
          loading="lazy"
          className="absolute w-[1000px] top-[-220px] rotate-[-30deg] overflow-hidden 2xl:max-w-[1536px] 2xl:px-[calc((100vw-1536px)/2)] 2xl:min-w-full"
          src={Union}
          alt="union"
        />
        <img
          loading="lazy"
          className="absolute w-[1000px] top-[900px] left-[calc((100vw)/2)] rotate-[-30deg]"
          src={Union}
          alt="union"
        />
        <div
          id="hero"
          className="px-6 xl:px-20 lg:px-16 md:px-12 sm:px-10 2xl:max-w-[1536px] 2xl:min-px-96 2xl:min-w-full"
        >
          <div className="grid grid-cols-12 pt-2 md:pt-4 lg:pt-8">
            <div
              className="col-span-12 md:col-span-6"
              data-aos="fade-right"
              data-aos-offset="200"
              data-aos-delay="200"
              data-aos-duration="500"
              data-aos-easing="ease-in-out"
              data-aos-once="true"
            >
              <h1 className="mt-4 font-bold text-[30px] leading-[40px] xl:text-[66px] xl:leading-[80px] lg:text-[50px] lg:mt-10 md:text-[38px] md:mt-4 sm:text-[40px] sm:leading-[60px]">
                Seamlessly Craft Your Custom Gaming Tokens.
              </h1>
              <h2 className="text-xl pt-4 leading-[30px] xl:text-[32px] xl:leading-[50px] lg:text-[28px] sm:text-2xl sm:leading-[40px]">
                The Easiest Way To Create Your <br />
                Own Game Assets ...
              </h2>
              <div className="relative flex justify-start items-center gap-1 border-b-2 max-w-[296px] pt-8 pl-1 mx-0 md:w-96 lg:pt-16 sm:pt-14 sm:mx-4 sm:w-96 sm:max-w-96">
                <Icon className="w-6 h-6" icon="ion:search-outline" />
                <input
                  className="z-20 w-full bg-transparent px-0 py-2 outline-none text-sm sm:text-lg sm:px-2"
                  type="text"
                  placeholder="Search for Blueprint ID, Name and Creator"
                  value={searchValue}
                  onKeyDown={handleKeyDown}
                  onChange={handleSearchChange}
                />
                {showTooltip && (
                  <div
                    className="absolute -bottom-12 left-8 mb-2 px-4 py-2 bg-gray-700 text-white text-xs rounded-lg transition-opacity opacity-100"
                    style={{ transition: 'opacity 0.3s' }}
                  >
                    Special characters are not allowed!
                  </div>
                )}
              </div>
            </div>
            <div
              className="col-span-12 md:col-span-6"
              data-aos="fade-left"
              data-aos-offset="200"
              data-aos-delay="200"
              data-aos-duration="500"
              data-aos-easing="ease-in-out"
              data-aos-once="true"
            >
              <div className="relative">
                <div className="flex flex-row-reverse justify-center mt-20 ml-0 items-center z-30 rounded-3xl px-1 top-[170px] right-[116px] xl:mt-20 md:mt-10 md:ml-32">
                  <Image
                    className="mt-[100px] max-w-[120px] max-h-[250px] rotate-[35deg] opacity-50 lg:max-w-[170px] lg:max-h-[320px] lg:mt-[120px] sm:max-w-[150px] sm:max-h-[280px]"
                    src={SmallBlueprintCardImage}
                    spinnerClassName="mt-[100px] min-w-[120px] min-h-[250px] rotate-[35deg] rounded-2xl opacity-50 lg:min-w-[170px] lg:min-h-[320px] lg:mt-[120px] sm:min-w-[150px] sm:min-h-[280px]"
                    alt="card-front"
                  />
                  <Image
                    className="max-w-[200px] max-h-[350px] rotate-[-24deg] lg:max-w-[250px] lg:max-h-[460px] sm:max-w-[230px] sm:max-h-[400px]"
                    src={CardFront}
                    spinnerClassName="min-w-[200px] min-h-[350px] rotate-[-24deg] rounded-2xl lg:min-w-[250px] lg:min-h-[460px] sm:min-w-[230px] sm:min-h-[400px]"
                    alt="card-front"
                  />
                </div>
              </div>
            </div>
            <ScrollButton
              isScrollAtBottom={isScrollAtBottom}
              onClick={isScrollAtBottom ? handleScrollToTop : scrollToSection}
            />
          </div>
        </div>
        <div
          id="carousel"
          className="relative mt-10 h-[400px] sm:h-[550px] md:h-[620px] lg:h-[650px] xl:h-[680px]"
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-delay="200"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-once="true"
        >
          <h1 className="text-center text-xl font-semibold pt-6 sm:text-3xl">
            Most Minted Blueprints
          </h1>
          <div className="absolute top-20 inset-x-0 z-30 bg-transparent w-full px-6 pt-4 xl:px-20 lg:px-16 md:px-12 sm:px-10 2xl:max-w-[1536px] 2xl:min-px-96 2xl:min-w-full">
            <Slider {...settings}>
              <div className="px-1 lg:px-2 relative flex flex-col bg-transparent h-full items-center justify-center rounded-3xl duration-300 ease-in-out">
                <BlueprintCardForCarousel
                  blueprintId={95}
                  mintLimit={10000}
                  mintPrice={0.001}
                  mintUnit={1}
                  totalSupply={100000000}
                  name="Helmet"
                  uri={HelmetImage}
                />
              </div>
              <div className="px-1 lg:px-2 relative flex flex-col bg-transparent h-full items-center justify-center rounded-3xl duration-300 ease-in-out">
                <BlueprintCardForCarousel
                  blueprintId={293}
                  mintLimit={10000}
                  mintUnit={0}
                  mintPrice={0.001}
                  totalSupply={100000000}
                  name="Armor"
                  uri={ArmorImage}
                />
              </div>
              <div className="px-1 lg:px-2 relative flex flex-col bg-transparent h-full items-center justify-center rounded-3xl duration-300 ease-in-out">
                <BlueprintCardForCarousel
                  blueprintId={843}
                  mintLimit={10000}
                  mintUnit={2}
                  mintPrice={0.001}
                  totalSupply={100000000}
                  name="Sword"
                  uri={SwordImage}
                />
              </div>
              <div className="px-1 lg:px-2 relative flex flex-col bg-transparent h-full items-center justify-center rounded-3xl duration-300 ease-in-out">
                <BlueprintCardForCarousel
                  blueprintId={658}
                  mintLimit={10000}
                  mintUnit={2}
                  mintPrice={0.001}
                  totalSupply={100000000}
                  name="Black Tea"
                  uri={BlackTeaImage}
                />
              </div>
              <div className="px-1 lg:px-2 relative flex flex-col bg-transparent h-full items-center justify-center rounded-3xl duration-300 ease-in-out">
                <BlueprintCardForCarousel
                  blueprintId={83}
                  mintLimit={10000}
                  mintUnit={1}
                  mintPrice={0.001}
                  totalSupply={100000000}
                  name="Gold Coin"
                  uri={GoldCoinImage}
                />
              </div>
              <div className="px-1 lg:px-2 relative flex flex-col bg-transparent h-full items-center justify-center rounded-3xl duration-300 ease-in-out">
                <BlueprintCardForCarousel
                  blueprintId={693}
                  mintLimit={10000}
                  mintUnit={0}
                  mintPrice={0.001}
                  totalSupply={100000000}
                  name="Milk Tea"
                  uri={MilkTeaImage}
                />
              </div>
              <div className="px-1 lg:px-2 relative flex flex-col bg-transparent h-full items-center justify-center rounded-3xl duration-300 ease-in-out">
                <BlueprintCardForCarousel
                  blueprintId={62}
                  mintLimit={10000}
                  mintUnit={1}
                  mintPrice={0.001}
                  totalSupply={100000000}
                  name="Coffee"
                  uri={CoffeeImage}
                />
              </div>
              <div className="px-1 lg:px-2 relative flex flex-col bg-transparent h-full items-center justify-center rounded-3xl duration-300 ease-in-out">
                <BlueprintCardForCarousel
                  blueprintId={482}
                  mintUnit={0}
                  mintLimit={10000}
                  mintPrice={0.001}
                  totalSupply={100000000}
                  name="Silver Coin"
                  uri={SilverCoinImage}
                />
              </div>
            </Slider>
          </div>
        </div>
        <div
          className="flex flex-col items-center justify-center px-6 pb-10 w-full bg-transparent sm:px-10 md:px-15 lg:px-20 2xl:max-w-[1536px] 2xl:min-px-96 2xl:min-w-full"
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-delay="200"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-once="true"
        >
          <h2 className="text-2xl font-semibold pb-4 lg:text-4xl sm:text-3xl xl:pb-6">
            Polygon Informations
          </h2>
          <div className="flex flex-col justify-center items-center px-4 py-6 border-2 border-light-gray rounded-3xl gap-4 2xl:gap-10 lg:px-10 lg:flex-row sm:px-6">
            <div className="flex flex-col w-full gap-1 lg:w-auto">
              <div className="flex flex-row justify-between gap-4 2xl:gap-10">
                <div className="flex flex-col gap-1">
                  <div className="flex flex-col gap-2">
                    <h3 className="truncate text-lg font-semibold xl:text-2xl sm:text-xl">
                      Compose Fee
                    </h3>
                    <p className="text-base text-light-gray xl:text-xl sm:text-lg">
                      {Number(blueprintCreationFee.polygon)} MATIC
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="truncate text-lg font-semibold xl:text-2xl sm:text-xl">
                      Blueprints
                    </h3>
                    <p className="text-base text-light-gray xl:text-xl sm:text-lg">
                      {Number(blueprintsValue.polygon)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="truncate text-lg font-semibold xl:text-2xl sm:text-xl">
                      Minted Blueprints
                    </h3>
                    <p className="text-base text-light-gray xl:text-xl sm:text-lg">
                      {Number(mintedBlueprintsValue.polygon)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex flex-col gap-2">
                    <h3 className="truncate text-lg font-semibold xl:text-2xl sm:text-xl">
                      Decompose Fee
                    </h3>
                    <p className="text-base text-light-gray xl:text-xl sm:text-lg">
                      {Number(decomposeFee.polygon)} MATIC
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="truncate text-lg font-semibold xl:text-2xl sm:text-xl">
                      Creators
                    </h3>
                    <p className="text-base text-light-gray xl:text-xl sm:text-lg">
                      {Number(creatorsValue.polygon)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="truncate text-lg font-semibold xl:text-2xl sm:text-xl">
                      Products
                    </h3>
                    <p className="text-base text-light-gray xl:text-xl sm:text-lg">
                      {Number(productsValue.polygon)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1">
                <h3 className="text-center text-lg font-semibold xl:text-2xl sm:text-xl">
                  Factory Address
                </h3>
                <p className="text-center text-sm text-light-gray break-all xl:text-xl sm:text-lg xs:text-base">
                  {factoryAddress.polygon}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-center text-lg font-semibold xl:text-2xl sm:text-xl">
                  Blueprint Address
                </h3>
                <p className="text-center text-sm text-light-gray break-all xl:text-xl sm:text-lg xs:text-base">
                  {blueprintAddress.polygon}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-center text-lg font-semibold xl:text-2xl sm:text-xl">
                  Product Address
                </h3>
                <p className="text-center text-sm text-light-gray break-all xl:text-xl sm:text-lg xs:text-base">
                  {productAddress.polygon}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex flex-col items-center justify-center px-6 pb-10 w-full bg-transparent sm:px-10 md:px-15 lg:px-20 2xl:max-w-[1536px] 2xl:min-px-96 2xl:min-w-full"
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-delay="200"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-once="true"
        >
          <h2 className="text-2xl font-semibold pb-4 lg:text-4xl sm:text-3xl xl:pb-6">
            Ethereum Informations
          </h2>
          <div className="flex flex-col justify-center items-center px-4 py-6 border-2 border-light-gray rounded-3xl gap-4 2xl:gap-10 lg:px-10 lg:flex-row sm:px-6">
            <div className="flex flex-col w-full gap-1 lg:w-auto">
              <div className="flex flex-row justify-between gap-4 2xl:gap-10">
                <div className="flex flex-col gap-1">
                  <div className="flex flex-col gap-2">
                    <h3 className="truncate text-lg font-semibold xl:text-2xl sm:text-xl">
                      Compose Fee
                    </h3>
                    <p className="text-base text-light-gray xl:text-xl sm:text-lg">
                      {Number(blueprintCreationFee.mainnet)} ETH
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="truncate text-lg font-semibold xl:text-2xl sm:text-xl">
                      Blueprints
                    </h3>
                    <p className="text-base text-light-gray xl:text-xl sm:text-lg">
                      {Number(blueprintsValue.mainnet)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="truncate text-lg font-semibold xl:text-2xl sm:text-xl">
                      Minted Blueprints
                    </h3>
                    <p className="text-base text-light-gray xl:text-xl sm:text-lg">
                      {Number(mintedBlueprintsValue.mainnet)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex flex-col gap-2">
                    <h3 className="truncate text-lg font-semibold xl:text-2xl sm:text-xl">
                      Decompose Fee
                    </h3>
                    <p className="text-base text-light-gray xl:text-xl sm:text-lg">
                      {Number(decomposeFee.mainnet)} ETH
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="truncate text-lg font-semibold xl:text-2xl sm:text-xl">
                      Creators
                    </h3>
                    <p className="text-base text-light-gray xl:text-xl sm:text-lg">
                      {Number(creatorsValue.mainnet)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="truncate text-lg font-semibold xl:text-2xl sm:text-xl">
                      Products
                    </h3>
                    <p className="text-base text-light-gray xl:text-xl sm:text-lg">
                      {Number(productsValue.mainnet)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1">
                <h3 className="text-center text-lg font-semibold xl:text-2xl sm:text-xl">
                  Factory Address
                </h3>
                <p className="text-center text-sm text-light-gray break-all xl:text-xl sm:text-lg xs:text-base">
                  {factoryAddress.mainnet}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-center text-lg font-semibold xl:text-2xl sm:text-xl">
                  Blueprint Address
                </h3>
                <p className="text-center text-sm text-light-gray break-all xl:text-xl sm:text-lg xs:text-base">
                  {blueprintAddress.mainnet}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-center text-lg font-semibold xl:text-2xl sm:text-xl">
                  Product Address
                </h3>
                <p className="text-center text-sm text-light-gray break-all xl:text-xl sm:text-lg xs:text-base">
                  {productAddress.mainnet}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex flex-col items-center justify-center px-6 pb-10 w-full bg-transparent sm:px-10 md:px-15 lg:px-20 2xl:max-w-[1536px] 2xl:min-px-96 2xl:min-w-full"
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-delay="200"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-once="true"
        >
          <h2 className="text-2xl font-semibold pb-4 lg:text-4xl sm:text-3xl xl:pb-6">
            BSC Informations
          </h2>
          <div className="flex flex-col justify-center items-center px-4 py-6 border-2 border-light-gray rounded-3xl gap-4 2xl:gap-10 lg:px-10 lg:flex-row sm:px-6">
            <div className="flex flex-col w-full gap-1 lg:w-auto">
              <div className="flex flex-row justify-between gap-4 2xl:gap-10">
                <div className="flex flex-col gap-1">
                  <div className="flex flex-col gap-2">
                    <h3 className="truncate text-lg font-semibold xl:text-2xl sm:text-xl">
                      Compose Fee
                    </h3>
                    <p className="text-base text-light-gray xl:text-xl sm:text-lg">
                      {Number(blueprintCreationFee.bsc)} BNB
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="truncate text-lg font-semibold xl:text-2xl sm:text-xl">
                      Blueprints
                    </h3>
                    <p className="text-base text-light-gray xl:text-xl sm:text-lg">
                      {Number(blueprintsValue.bsc)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="truncate text-lg font-semibold xl:text-2xl sm:text-xl">
                      Minted Blueprints
                    </h3>
                    <p className="text-base text-light-gray xl:text-xl sm:text-lg">
                      {Number(mintedBlueprintsValue.bsc)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex flex-col gap-2">
                    <h3 className="truncate text-lg font-semibold xl:text-2xl sm:text-xl">
                      Decompose Fee
                    </h3>
                    <p className="text-base text-light-gray xl:text-xl sm:text-lg">
                      {Number(decomposeFee.bsc)} BNB
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="truncate text-lg font-semibold xl:text-2xl sm:text-xl">
                      Creators
                    </h3>
                    <p className="text-base text-light-gray xl:text-xl sm:text-lg">
                      {Number(creatorsValue.bsc)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="truncate text-lg font-semibold xl:text-2xl sm:text-xl">
                      Products
                    </h3>
                    <p className="text-base text-light-gray xl:text-xl sm:text-lg">
                      {Number(productsValue.bsc)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1">
                <h3 className="text-center text-lg font-semibold xl:text-2xl sm:text-xl">
                  Factory Address
                </h3>
                <p className="text-center text-sm text-light-gray break-all xl:text-xl sm:text-lg xs:text-base">
                  {factoryAddress.bsc}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-center text-lg font-semibold xl:text-2xl sm:text-xl">
                  Blueprint Address
                </h3>
                <p className="text-center text-sm text-light-gray break-all xl:text-xl sm:text-lg xs:text-base">
                  {blueprintAddress.bsc}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-center text-lg font-semibold xl:text-2xl sm:text-xl">
                  Product Address
                </h3>
                <p className="text-center text-sm text-light-gray break-all xl:text-xl sm:text-lg xs:text-base">
                  {productAddress.bsc}
                </p>
              </div>
            </div>
          </div>
        </div>
        <PlatformUsage />
      </div>
    </HeadProvider>
  );
};

export default LandingPage;
