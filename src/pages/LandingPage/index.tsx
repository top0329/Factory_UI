import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import Glide from '@glidejs/glide';
import { Icon } from '@iconify/react/dist/iconify.js';

import ScrollButton from '../../components/Button/ScrollDownButton';
import FAQ from '../../components/FAQ';
import PlatformStatus from '../../components/PlatformStatus';
import PlatformUsage from '../../components/PlatformUsage';
import BlueprintCard from '../../components/Cards/BlueprintCard/BlueprintCard';
import { searchValueAtom } from '../../jotai/atoms';

import Union from '../../assets/images/union.png';
import CardFront from '../../assets/svg/card-front.svg';
import SmallBlueprintCardImage from '../../assets/svg/small-blueprint-card.svg';
import useWeb3 from '../../hooks/useWeb3';
import { invalidChars } from '../../constants';
import Image from '../../components/Image';

const LandingPage = () => {
  const { blueprintContract, factoryContract, productContract } = useWeb3();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useAtom<string>(searchValueAtom);

  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [blueprintsValue, setBlueprintsValue] = useState<number>(0);
  const [creatorsValue, setCreatorsValue] = useState<number>(0);
  const [mintedBlueprintsValue, setMintedBlueprintsValue] = useState<number>(0);
  const [productsValue, setProductsValue] = useState<number>(0);
  const [isScrollAtBottom, setIsScrollAtBottom] = useState<boolean>(false);

  useEffect(() => {
    const config = {
      type: 'carousel',
      startAt: 0,
      perView: 5,
      autoplay: 3000,
      gap: 16,
      breakpoints: {
        1535: {
          perView: 4,
        },
        1279: {
          perView: 4,
        },
        1100: {
          perView: 3,
        },
        640: {
          perView: 3,
          gap: 8,
        },
        459: {
          perView: 2,
          gap: 8,
        },
        389: {
          perView: 1.5,
          gap: 2,
        },
      },
    };
    const glide = new Glide('.glide', {
      ...config,
      type: 'carousel',
    });
    glide.mount();
    return () => {
      glide.destroy();
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      const _blueprintIds = await blueprintContract.getBlueprintIds();
      const _blueprintCreators = await factoryContract.getBlueprintCreators();
      const _totalMintedBlueprintTokens =
        await blueprintContract.totalMintedBlueprintTokens();
      const _productIds = await productContract.getProductIDs();
      setBlueprintsValue(_blueprintIds.length);
      setCreatorsValue(_blueprintCreators.length);
      setMintedBlueprintsValue(Number(_totalMintedBlueprintTokens));
      setProductsValue(_productIds.length);
    }
    fetchData();
  }, [blueprintContract, factoryContract, productContract]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const smoothScrollTo = (duration: number) => {
    const startY = window.scrollY;
    // const distanceY = endY - startY;
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
    smoothScrollToTop(1000); // Smooth scroll to top with a duration of 1 second (1000 milliseconds)
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
    <div className="relative text-white bg-landing overflow-hidden">
      <img
        className="absolute w-[1000px] z-10 top-[-220px] rotate-[-30deg] overflow-hidden 2xl:max-w-[1536px] 2xl:px-[calc((100vw-1536px)/2)] 2xl:min-w-full"
        src={Union}
        alt="union"
      />
      <img
        className="absolute w-[1000px] z-10 top-[900px] left-[calc((100vw)/2)] rotate-[-30deg]"
        src={Union}
        alt="union"
      />
      <div
        id="hero"
        className="px-6 xl:px-20 lg:px-16 md:px-12 sm:px-10 2xl:max-w-[1536px] 2xl:min-px-96 2xl:min-w-full"
      >
        <div className="grid grid-cols-12 pt-2 md:pt-4 lg:pt-8">
          <div className="col-span-12 md:col-span-6">
            <h1 className="mt-4 font-bold text-[30px] leading-[40px] xl:text-[66px] xl:leading-[80px] lg:text-[50px] lg:mt-10 md:text-[38px] md:mt-4 sm:text-[40px] sm:leading-[60px]">
              Get Unique NFTs <br />
              For Your Business
            </h1>
            <h2 className="text-xl pt-4 leading-[30px] xl:text-[32px] xl:leading-[50px] lg:text-[28px] sm:text-2xl sm:leading-[40px]">
              The Easiest Way To Create Your <br />
              Own Tokens ...
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
          <div className="col-span-12 md:col-span-6">
            <div className="relative">
              <div className="flex flex-row-reverse justify-center mt-20 ml-0 items-center z-30 rounded-3xl px-1 top-[170px] right-[116px] xl:mt-20 md:mt-10 md:ml-32">
                <Image
                  className="mt-[100px] max-w-[120px] max-h-[250px] rotate-[35deg] opacity-50 lg:max-w-[170px] lg:max-h-[320px] lg:mt-[120px] sm:max-w-[150px] sm:max-h-[280px]"
                  src={SmallBlueprintCardImage}
                  spinnerClassName="mt-[100px] min-w-[120px] min-h-[250px] rotate-[35deg] opacity-50 lg:min-w-[170px] lg:min-h-[320px] lg:mt-[120px] sm:min-w-[150px] sm:min-h-[280px]"
                  alt="card-front"
                />
                <Image
                  className="max-w-[200px] max-h-[350px] rotate-[-24deg] lg:max-w-[250px] lg:max-h-[460px] sm:max-w-[230px] sm:max-h-[400px]"
                  src={CardFront}
                  spinnerClassName="min-w-[200px] min-h-[350px] rotate-[-24deg] lg:min-w-[250px] lg:min-h-[460px] sm:min-w-[230px] sm:min-h-[400px]"
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
      >
        <h1 className="text-center text-xl font-semibold pt-6 sm:text-3xl">
          Most Minted Blueprints
        </h1>
        <div className="absolute top-20 inset-x-0 z-30 flex justify-center items-center bg-transparent w-full px-6 pt-4 xl:px-20 lg:px-16 md:px-12 sm:px-10 2xl:max-w-[1536px] 2xl:min-px-96 2xl:min-w-full">
          <div className="glide w-full">
            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides overflow-hidden">
                <li className="glide__slide">
                  <div className="relative flex flex-col bg-transparent h-full items-center justify-center rounded-3xl duration-300 ease-in-out">
                    <BlueprintCard
                      blueprintId={95}
                      mintLimit={10000}
                      mintPrice={0.001}
                      mintUnit={1}
                      totalSupply={100000000}
                      name="Iron Sword"
                      uri="https://ipfs.io/ipfs/bafkreih47rxou2qm5kmc6ye5fxae37aih2qkjvlizrgzrzhjp7tqsvkzh4"
                    />
                  </div>
                </li>
                <li className="glide__slide">
                  <div className="relative flex flex-col bg-transparent h-full items-center justify-center rounded-3xl duration-300 ease-in-out">
                    <BlueprintCard
                      blueprintId={95}
                      mintLimit={10000}
                      mintUnit={2}
                      mintPrice={0.001}
                      totalSupply={100000000}
                      name="Black Tea"
                      uri="https://ipfs.io/ipfs/bafkreigw4ex37u2tl3tt5kocwacrbq3ucox2pkmmlojg3f3lc2545vzcza"
                    />
                  </div>
                </li>
                <li className="glide__slide">
                  <div className="relative flex flex-col bg-transparent h-full items-center justify-center rounded-3xl duration-300 ease-in-out">
                    <BlueprintCard
                      blueprintId={95}
                      mintLimit={10000}
                      mintUnit={0}
                      mintPrice={0.001}
                      totalSupply={100000000}
                      name="Spear"
                      uri="https://ipfs.io/ipfs/bafkreigc7k7kmuc6nh2ykdn4hto26nnqpltnvrjh2mu5zsioaeo5cic3kq"
                    />
                  </div>
                </li>
                <li className="glide__slide">
                  <div className="relative flex flex-col bg-transparent h-full items-center justify-center rounded-3xl duration-300 ease-in-out">
                    <BlueprintCard
                      blueprintId={95}
                      mintLimit={10000}
                      mintUnit={1}
                      mintPrice={0.001}
                      totalSupply={100000000}
                      name="Gold Coin"
                      uri="https://ipfs.io/ipfs/bafkreiaw3v4sctoiryu5wmwcqznzngjymfrgjswt667zb4msda6lg54boy"
                    />
                  </div>
                </li>
                <li className="glide__slide">
                  <div className="relative flex flex-col bg-transparent h-full items-center justify-center rounded-3xl duration-300 ease-in-out">
                    <BlueprintCard
                      blueprintId={95}
                      mintLimit={10000}
                      mintUnit={0}
                      mintPrice={0.001}
                      totalSupply={100000000}
                      name="Milk Tea"
                      uri="https://ipfs.io/ipfs/bafkreie4shaao65odx4ie7oqfdr5vldbbg4pbwib4gragksb7z6ae3eabq"
                    />
                  </div>
                </li>
                <li className="glide__slide">
                  <div className="relative flex flex-col bg-transparent h-full items-center justify-center rounded-3xl duration-300 ease-in-out">
                    <BlueprintCard
                      blueprintId={95}
                      mintLimit={10000}
                      mintUnit={1}
                      mintPrice={0.001}
                      totalSupply={100000000}
                      name="Coffee"
                      uri="https://ipfs.io/ipfs/bafybeig6qdkvvfa2o24x7xbwsyyd3n3nichylckgyqgygots22pzi3amjm"
                    />
                  </div>
                </li>
                <li className="glide__slide">
                  <div className="relative flex flex-col bg-transparent h-full items-center justify-center rounded-3xl duration-300 ease-in-out">
                    <BlueprintCard
                      blueprintId={95}
                      mintUnit={0}
                      mintLimit={10000}
                      mintPrice={0.001}
                      totalSupply={100000000}
                      name="Silver Coin"
                      uri="https://ipfs.io/ipfs/bafybeibp23rhdzkvgkek2zj4jxg3ti7qqcgmfpwevz3ni4dnicw2kvz77a"
                    />
                  </div>
                </li>
              </ul>
            </div>
            <div className="glide__arrows" data-glide-el="controls">
              <button
                className="glide__arrow glide__arrow--left -left-2 border-none p-0 sm:-left-3"
                data-glide-dir="<"
              >
                <div className="h-7 w-7 bg-gray-800 rounded-full flex justify-center items-center my-auto duration-300 ease-in-out hover:bg-default sm:h-9 sm:w-9">
                  <Icon
                    className="w-10 h-10 text-light-gray"
                    icon="material-symbols:keyboard-arrow-left"
                  />
                </div>
              </button>
              <button
                className="glide__arrow glide__arrow--right -right-2 border-none p-0 sm:-right-3"
                data-glide-dir=">"
              >
                <div className="h-7 w-7 bg-gray-800 rounded-full flex justify-center items-center my-auto duration-300 ease-in-out hover:bg-default sm:h-9 sm:w-9">
                  <Icon
                    className="w-10 h-10 text-light-gray"
                    icon="material-symbols:keyboard-arrow-right"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <PlatformStatus
        blueprints={blueprintsValue}
        creators={creatorsValue}
        mintedBlueprints={mintedBlueprintsValue}
        products={productsValue}
      />
      <PlatformUsage />
      <FAQ />
    </div>
  );
};

export default LandingPage;
