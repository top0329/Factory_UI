import copper from '../../assets/images/development/copper_ERC20.webp';
import key721 from '../../assets/images/development/key_ERC721.webp';
import axeIron from '../../assets/images/development/axe_iron_wood_ERC1155.webp';
import { ERC20MintListCard } from '../Cards/ListCard/ERC20ListCard';
import { ERC721MintListCard } from '../Cards/ListCard/ERC721ListCard';
import { ERC1155MintListCard } from '../Cards/ListCard/ERC1155ListCard';

export default function MintProductModal() {
  const ERC20Data = [
    {
      uri: copper,
      type: 'ERC20',
      name: 'Copper ERC20',
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      amount: 100,
    },
    {
      uri: copper,
      type: 'ERC20',
      name: 'Copper ERC20',
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      amount: 100,
    },
  ];

  const ERC721Data = [
    {
      uri: key721,
      type: 'ERC721',
      name: 'KEY ERC721',
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      id: 3,
    },
    {
      uri: key721,
      type: 'ERC721',
      name: 'KEY ERC721',
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      id: 3,
    },
  ];

  const ERC1155Data = [
    {
      uri: axeIron,
      type: 'ERC1155',
      name: 'AXE ERC1155',
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      id: 3,
      amount: 100,
    },
  ];

  return (
    <div className="flex flex-col items-center w-[450px] sm:w-[60%] h-[820px] bg-[#060606] rounded-[48px] text-white">
      <div className="flex justify-center py-8 border-b border-[#858584] w-full">
        <p id="header" className="xs:text-[32px] text-[22px]">
          Mint Product
        </p>
      </div>
      <div
        id="container"
        className="flex flex-col w-full py-8 gap-y-4 h-[75%] justify-start items-center"
      >
        {ERC20Data.map((data, index) => (
          <ERC20MintListCard key={index} {...data} />
        ))}
        {ERC721Data.map((data, index) => (
          <ERC721MintListCard key={index} {...data} />
        ))}
        {ERC1155Data.map((data, index) => (
          <ERC1155MintListCard key={index} {...data} />
        ))}
      </div>
      <div className="flex justify-between !text-cent gap-10 my-2">
        <button className="flex py-2 px-5 rounded-2xl gap-3 items-center w-full !text-center !justify-center bg-[#353535] text-white">
          Cancel
        </button>
        <button className="flex py-2 px-5 rounded-2xl gap-3 items-center w-full !text-center !justify-center bg-primary text-white">
          Create
        </button>
      </div>
    </div>
  );
}
