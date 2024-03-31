import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import useWeb3 from '../../hooks/useWeb3';
import Button from '../../components/Button';
import OwnBlueprintListCard from '../../components/Cards/ListCard';
import { SelectedProduct } from '../../types';
import { selectedProductintAtom } from '../../jotai/atoms';
import { ethers } from 'ethers';
import { ERC20DecomposeListCard } from '../../components/Cards/ListCard/ERC20ListCard';
import { ProductListCard } from '../../components/Cards/ListCard/ProductListCard';
import { BlueprintListCard } from '../../components/Cards/ListCard/BlueprintListCard';
import { blueprintAddress, productAddress } from '../../constants';
import { useState } from 'react';

const DecomposeProductPage = () => {
  const [selectedOwnData] = useAtom<SelectedProduct>(selectedProductintAtom);
  const [productAmount, setProductAmount] = useState<number>();
  const {
    isConnected,
    library,
    account,
    factoryContract,
    factoryWeb3,
    productWeb3,
  } = useWeb3();
  const navigate = useNavigate();

  const handleApprove = async () => {
    if (isConnected && library) {
      const transaction = await productWeb3.methods
        .setApprovalForAll(await factoryContract.getAddress(), true)
        .send({ from: account });

      console.log('Product token approve is successed', await transaction);
    }
  };

  const handleChange = (e: any) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      // Check if the input is a non-negative integer
      setProductAmount(inputValue);
    }
  };

  const handleDecompose = async () => {
    try {
      const transaction = await factoryWeb3.methods
        .decomposeProduct(selectedOwnData.id, selectedOwnData.balance, {
          value: ethers.parseEther(
            Number(selectedOwnData.decomposeFee).toString()
          ),
        })
        .send({ from: account });

      console.log(transaction);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center py-10 text-white sm:py-10 min-w-[360px] ">
      <div className="relative py-4 sm:w-[1000px]  xs:w-[500px] w-[400px] ">
        <div className="relative  border bg-black rounded-[46px] shadow border-[#1f1f1f]">
          <h3 className="sm:text-[32px] text-[22px] py-6 font-semibold text-center text-white border-b border-gray-400">
            Decompose Product
          </h3>
          <div className="flex flex-col gap-6 p-6 sm:bg-[#040404] ">
            <ProductListCard
              name={selectedOwnData.name}
              address={productAddress}
              id={selectedOwnData.id}
              balance={selectedOwnData.balance}
              uri={selectedOwnData.uri}
            />
            <div className=" flex justify-between items-center">
              <p className="xs:text-[22px] text-[16px] text-[#BABABA]">
                Product Decompose Fee
              </p>
              <p className="xs:text-[24px] text-[16px] font-semibold">
                {selectedOwnData.decomposeFee} ETH
              </p>
            </div>
            <div className=" flex justify-between gap-6 items-center">
              <input
                type="number"
                placeholder="Product Amount"
                onChange={handleChange}
                value={productAmount}
                className="md:w-[70%] w-1/2 h-[40px] rounded-xl placeholder-gray-600 bg-black border border-white px-4 hide-arrows"
              />
              <Button
                className="flex justify-center w-[160px] h-9 rounded-xl"
                text="Approve"
                onClick={handleApprove}
                variant="primary"
              />
            </div>
          </div>
          <div className="flex flex-col px-6 pt-2 pb-8 rounded-b dark:border-gray-600">
            <p className="xs:text-[24px] text-[18px] text-left mb-4 text-[#BABABA]">
              Preview
            </p>
            <BlueprintListCard
              id={selectedOwnData.id}
              amount={selectedOwnData.balance}
              uri={selectedOwnData.uri}
              address={blueprintAddress}
              name={selectedOwnData.name}
            />
            {selectedOwnData.data.erc20Data.map((dataItem, index) => (
              <ERC20DecomposeListCard key={index} {...dataItem} />
            ))}
            {selectedOwnData.data.erc721Data.map((dataItem, index) => (
              <OwnBlueprintListCard
                key={index}
                isDecompose={true}
                {...dataItem}
                type={1}
              />
            ))}
            {selectedOwnData.data.erc1155Data.map((dataItem, index) => (
              <OwnBlueprintListCard
                key={index}
                isDecompose={true}
                {...dataItem}
                type={2}
              />
            ))}
            <div className="flex justify-center px-[60px] items-center md:gap-32 gap-8 pt-10 sm:pt-6">
              <Button
                className="flex justify-center w-[160px] !h-9 rounded-xl"
                text="Cancel"
                variant="secondary"
                onClick={() => navigate('/product')}
              />
              <Button
                className="flex justify-center w-[160px] h-9 rounded-xl"
                text="Decompose"
                variant="primary"
                onClick={handleDecompose}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecomposeProductPage;
