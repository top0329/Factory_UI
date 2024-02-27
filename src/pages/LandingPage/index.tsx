import { useEffect } from 'react';
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
import CardFront from '../../assets/images/card-front.png';
import SmallBlueprintCardImage from '../../assets/images/small-blueprint-card.png';
import IronPickaxe from '../../assets/images/development/pickaxe_iron_wood_ERC1155.webp';

const LandingPage = () => {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useAtom(searchValueAtom);

  useEffect(() => {
    const config = {
      type: 'carousel',
      startAt: 0,
      perView: 5,
      autoplay: 10000,
      gap: 32,
      breakpoints: {
        1536: {
          perView: 5,
        },
        1280: {
          perView: 4,
        },
        1024: {
          perView: 3,
        },
        768: {
          perView: 2,
        },
        640: {
          perView: 1.5,
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

  const smoothScrollTo = (endY: number, duration: number) => {
    const startY = window.scrollY;
    const distanceY = endY - startY;
    let startTime: number = 0;

    // Easing function: easeInOutCubic
    // Use different easing functions if desired
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

  // Scroll to one viewport height down with a duration of 1000ms (1 second)
  const scrollToSection = () => {
    smoothScrollTo(window.innerHeight, 1000);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Check if Enter key was pressed
    if (event.key === 'Enter') {
      // Execute any additional code when Enter key is pressed
      navigate('/blueprint');
    }
  };

  return (
    <div className="relative text-white bg-landing overflow-hidden">
      <img
        className="absolute w-[1000px] z-10 top-[-220px] rotate-[-30deg] overflow-hidden"
        src={Union}
        alt="union"
      />
      <img
        className="absolute w-[1000px] z-10 top-[900px] left-[400px] rotate-[-30deg]"
        src={Union}
        alt="union"
      />
      <div
        id="hero"
        className="px-6 2xl:px-24 xl:px-20 lg:px-16 md:px-12 sm:px-10"
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
            <div className="flex justify-start items-center gap-1 border-b-2 w-auto pt-8 mx-0 md:w-96 lg:pt-16 sm:pt-14 sm:mx-4">
              <Icon className="w-6 h-6" icon="ion:search-outline" />
              <input
                className="z-20 w-full bg-transparent px-0 py-2 outline-none text-sm sm:text-lg sm:px-2"
                type="text"
                placeholder="Search for Blueprint ID, Name and Creator"
                value={searchValue}
                onKeyDown={handleKeyDown}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-6">
            <div className="relative">
              <div className="flex flex-row-reverse justify-center mt-20 ml-0 items-center z-30 rounded-3xl px-1 top-[170px] right-[116px] xl:mt-20 md:mt-10 md:ml-32">
                <img
                  className="mt-[100px] max-w-[120px] max-h-[250px] rotate-[35deg] lg:max-w-[170px] lg:max-h-[320px] lg:mt-[120px] sm:max-w-[150px] sm:max-h-[280px]"
                  src={SmallBlueprintCardImage}
                  alt="card-front"
                />
                <img
                  className="max-w-[200px] max-h-[350px] rotate-[-24deg] lg:max-w-[250px] lg:max-h-[460px] sm:max-w-[230px] sm:max-h-[400px]"
                  src={CardFront}
                  alt="card-front"
                />
              </div>
            </div>
          </div>
          <ScrollButton
            className="z-20 !mt-[-60px] mb-4 ml-1 sm:ml-4 sm:w-20 sm:h-20"
            onClick={scrollToSection}
          />
        </div>
      </div>
      <div
        id="carousel"
        className="h-[700px] px-6 2xl:px-24 xl:px-20 lg:px-16 md:px-12 sm:px-10"
      >
        <h1 className="text-3xl font-semibold pt-6">Most Minted Blueprints</h1>
        <div className="absolute inset-x-0 z-30 flex justify-center items-center bg-transparent px-6 2xl:px-auto 2xl:max-w-[1750px] xl:px-20 lg:px-16 md:px-12 sm:px-10">
          <div className="glide w-full py-8 rounded-3xl">
            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides overflow-hidden">
                <li className="glide__slide">
                  <div className="relative flex flex-col text-center bg-transparent h-full items-center justify-center rounded-3xl duration-300 ease-in-out">
                    <BlueprintCard
                      blueprintid={95}
                      mintLimit={10000}
                      mintPrice={0.001}
                      totalSupply={100000000}
                      name="Iron Pickaxe"
                      uri={IronPickaxe}
                    />
                  </div>
                </li>
                <li className="glide__slide">
                  <div className="relative flex flex-col text-center bg-transparent h-full items-center justify-center rounded-3xl duration-300 ease-in-out">
                    <BlueprintCard
                      blueprintid={95}
                      mintLimit={10000}
                      mintPrice={0.001}
                      totalSupply={100000000}
                      name="Iron Pickaxe"
                      uri={IronPickaxe}
                    />
                  </div>
                </li>
                <li className="glide__slide">
                  <div className="relative flex flex-col text-center bg-transparent h-full items-center justify-center rounded-3xl duration-300 ease-in-out">
                    <BlueprintCard
                      blueprintid={95}
                      mintLimit={10000}
                      mintPrice={0.001}
                      totalSupply={100000000}
                      name="Iron Pickaxe"
                      uri={IronPickaxe}
                    />
                  </div>
                </li>
                <li className="glide__slide">
                  <div className="relative flex flex-col text-center bg-transparent h-full items-center justify-center rounded-3xl duration-300 ease-in-out">
                    <BlueprintCard
                      blueprintid={95}
                      mintLimit={10000}
                      mintPrice={0.001}
                      totalSupply={100000000}
                      name="Iron Pickaxe"
                      uri={IronPickaxe}
                    />
                  </div>
                </li>
                <li className="glide__slide">
                  <div className="relative flex flex-col text-center bg-transparent h-full items-center justify-center rounded-3xl duration-300 ease-in-out">
                    <BlueprintCard
                      blueprintid={95}
                      mintLimit={10000}
                      mintPrice={0.001}
                      totalSupply={100000000}
                      name="Iron Pickaxe"
                      uri={IronPickaxe}
                    />
                  </div>
                </li>
              </ul>
            </div>
            <div className="glide__arrows" data-glide-el="controls">
              <button
                className="glide__arrow glide__arrow--left left-[-28px] border-none"
                data-glide-dir="<"
              >
                <div className="h-9 w-9 bg-gray-800 rounded-full flex justify-center items-center my-auto duration-300 ease-in-out">
                  <Icon
                    className="w-10 h-10 text-light-gray"
                    icon="material-symbols:keyboard-arrow-left"
                  />
                </div>
              </button>
              <button
                className="glide__arrow glide__arrow--right right-[-28px] border-none"
                data-glide-dir=">"
              >
                <div className="h-9 w-9 bg-gray-800 rounded-full flex justify-center items-center my-auto duration-300 ease-in-out">
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
