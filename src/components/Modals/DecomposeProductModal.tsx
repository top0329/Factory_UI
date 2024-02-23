import copper from '../../assets/images/copper_ERC20.webp';
import key721 from '../../assets/images/key_ERC721.webp';
import axeIron from '../../assets/images/axe_iron_wood_ERC1155.webp';
import ProductListCard from '../Cards/ListCard/ProductListCard';
import ERC20DecomposeListCard from '../Cards/ListCard/ERC20DecomposeListCard';
import ERC721DecomposeListCard from '../Cards/ListCard/ERC721DecomposeListCard';
import ERC1155DecomposeListCard from '../Cards/ListCard/ERC1155DecomposeListCard';

export default function DecomposeProductModal() {
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
    <div className="flex flex-col overflow-hidden items-center w-[450px] sm:w-[60%] h-[1070px] !bg-[#000000] rounded-[48px] text-white">
      <div className="flex justify-center py-8 border-b border-[#858584] w-full bg-[#040404]">
        <p id="header" className="text-[32px] ">
          Decompose Product
        </p>
      </div>
      <div
        id="decomposeForm"
        className="flex flex-col w-full py-8 gap-y-8 justify-start items-center p-8"
      >
        <ProductListCard
          uri={copper}
          type={'Product'}
          name={'Copper Product'}
          address={'0xdAC17F958D2ee523a2206206994597C13D831ec7'}
          id={3}
          balance={100}
        />
        <div id="amountForm" className="flex justify-between gap-3 w-[85%]">
          <input className="border border-[#858584] bg-[#000000] px-5 py-3 w-3/4 rounded-xl" />
          <button className="px-11 py-2 bg-primary rounded-xl w-1/4">
            Approve
          </button>
        </div>
      </div>
      <div
        id="preview"
        className="flex flex-col w-full py-8 gap-y-4 h-[55%] justify-start items-center bg-gradient-to-t from-[#000000] to-[#060606]"
      >
        <p className="flex !items-start !justify-start text-2xl text-[#AAA8A8]">
          Preview
        </p>
        {ERC20Data.map((data, index) => (
          <ERC20DecomposeListCard key={index} {...data} />
        ))}
        {ERC721Data.map((data, index) => (
          <ERC721DecomposeListCard key={index} {...data} />
        ))}
        {ERC1155Data.map((data, index) => (
          <ERC1155DecomposeListCard key={index} {...data} />
        ))}
      </div>
      <div className="flex justify-between !text-cente w-1/3 gap-10 my-2">
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
