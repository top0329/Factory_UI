import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { ethers } from 'ethers';
import useWeb3 from '../../hooks/useWeb3';
import Button from '../../components/Button';
import OwnBlueprintListCard from '../../components/Cards/ListCard';
import { SelectedProduct } from '../../types';
import { selectedProductintAtom } from '../../jotai/atoms';
import { ERC20DecomposeListCard } from '../../components/Cards/ListCard/ERC20ListCard';
import { ProductListCard } from '../../components/Cards/ListCard/ProductListCard';
import { BlueprintListCard } from '../../components/Cards/ListCard/BlueprintListCard';
import { blueprintAddress, productAddress } from '../../constants';
import { ERC1155DecomposeListCard } from '../../components/Cards/ListCard/ERC1155ListCard';
import Web3 from 'web3';
import useSpinner from '../../hooks/useSpinner';

const DecomposeProductPage = () => {
  const [selectedOwnData] = useAtom<SelectedProduct>(selectedProductintAtom);
  const [productAmount, setProductAmount] = useState<number>(0);
  const { openSpin, closeSpin } = useSpinner();

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
    const web3 = new Web3(window.ethereum);

    if (isConnected && library) {
      let receipt = null;
      while (receipt === null || receipt.status === undefined) {
        const transaction = productWeb3.methods
          .setApprovalForAll(await factoryContract.getAddress(), true)
          .send({ from: account });

        openSpin('Transaction Pending...');
        receipt = await web3.eth.getTransactionReceipt(
          (
            await transaction
          ).transactionHash
        );

        if (receipt && receipt.status !== undefined) {
          if (receipt.status) {
            closeSpin();
          } else {
            closeSpin();
          }
        } else {
          alert('Transaction is still pending');
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before checking again
        }
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === '' || /^\d*$/.test(inputValue)) {
      if (Number(inputValue) > selectedOwnData.balance) {
        setProductAmount(selectedOwnData.balance);
      } else {
        setProductAmount(Number(inputValue));
      }
    }
  };

  const handleDecompose = async () => {
    const web3 = new Web3(window.ethereum);

    try {
      let receipt = null;
      while (receipt === null || receipt.status === undefined) {
        const transaction = factoryWeb3.methods
          .decomposeProduct(selectedOwnData.id, productAmount)
          .send({
            from: account,
            value: ethers.parseEther(
              Number(selectedOwnData.decomposeFee).toString()
            ),
          });
        openSpin('Transaction Pending...');

        receipt = await web3.eth.getTransactionReceipt(
          (
            await transaction
          ).transactionHash
        );

        if (receipt && receipt.status !== undefined) {
          if (receipt.status) {
            closeSpin();
            navigate('/product');
          } else {
            closeSpin();
          }
        } else {
          alert('Transaction is still pending');
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before checking again
        }
      }
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
              productAmount={productAmount}
            />
            {selectedOwnData.data.erc20Data.map((dataItem, index) => (
              <ERC20DecomposeListCard
                key={index}
                {...dataItem}
                productAmount={productAmount}
              />
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
              <ERC1155DecomposeListCard
                key={index}
                {...dataItem}
                productAmount={productAmount}
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
