import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Web3 from 'web3';
import { useAtom } from 'jotai';
import { ethers } from 'ethers';

import Button from '../../components/Button';
import useWeb3 from '../../hooks/useWeb3';
import useSpinner from '../../hooks/useSpinner';
import useToast from '../../hooks/useToast';
import { selectedProductAtom } from '../../jotai/atoms';
import { ProductListCard } from '../../components/Cards/ListCard/ProductListCard';
import { BlueprintListCard } from '../../components/Cards/ListCard/BlueprintListCard';
import { ERC20DecomposeListCard } from '../../components/Cards/ListCard/ERC20ListCard';
import { ERC721DecomposeListCard } from '../../components/Cards/ListCard/ERC721ListCard';
import { ERC1155DecomposeListCard } from '../../components/Cards/ListCard/ERC1155ListCard';
import { SelectedProduct } from '../../types';

const DecomposeProductPage = () => {
  const {
    isConnected,
    library,
    account,
    factoryContract,
    factoryWeb3,
    productWeb3,
    currentBlueprintAddress,
    currentProductAddress,
  } = useWeb3();
  const { openSpin, closeSpin } = useSpinner();
  const { showToast } = useToast();

  const navigate = useNavigate();
  const productId = useParams().id;

  const [selectedOwnData] = useAtom<SelectedProduct>(selectedProductAtom);

  const [productAmount, setProductAmount] = useState<string>('');
  const [isDecomposeApproved, setIsDecomposeApproved] =
    useState<boolean>(false);
  const [isApproveEnable, setIsApproveEnable] = useState<boolean>(false);
  const [decomposeFee, setDecomposeFee] = useState<number>(0);

  useEffect(() => {
    async function init() {
      if (selectedOwnData.id.toString() !== productId) {
        navigate('/product');
      }

      const tmpDecomposeFee = await factoryContract.productDecomposeFee();
      setDecomposeFee(Number(ethers.formatEther(tmpDecomposeFee)));
    }
    init();
  }, [productId, navigate, selectedOwnData.id, factoryContract]);

  const handleApprove = async () => {
    const web3 = new Web3(window.ethereum);
    if (isConnected && library) {
      try {
        let receipt = null;
        while (receipt === null || receipt.status === undefined) {
          const transaction = productWeb3.methods
            .setApprovalForAll(await factoryContract.getAddress(), true)
            .send({ from: account });
          openSpin('Approving');
          receipt = await web3.eth.getTransactionReceipt(
            (
              await transaction
            ).transactionHash
          );
          if (receipt && receipt.status !== undefined) {
            if (receipt.status) {
              setIsDecomposeApproved(true);
              setIsApproveEnable(false);
              showToast('success', 'Approve success!');
              closeSpin();
            } else {
              closeSpin();
            }
          } else {
            alert('Transaction is still pending');
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before checking again
          }
        }
      } catch (err) {
        showToast('fail', 'User rejected!');
        console.log(err);
      } finally {
        closeSpin();
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === '' || Number(inputValue) === 0) {
      setIsApproveEnable(false);
      setProductAmount(inputValue);
    } else if (Number(inputValue) > selectedOwnData.balance) {
      setIsApproveEnable(true);
      setProductAmount(selectedOwnData.balance.toString());
    } else {
      setIsApproveEnable(true);
      setProductAmount(inputValue);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !(
        (event.key >= '0' && event.key <= '9') ||
        event.key === 'Backspace' ||
        event.key === 'Delete' ||
        event.key === 'Tab' ||
        event.key === 'ArrowLeft' ||
        event.key === 'ArrowRight' ||
        (event.key >= '0' &&
          event.key <= '9' &&
          event.getModifierState('NumLock'))
      )
    ) {
      event.preventDefault();
    }
  };

  const handleDecompose = async () => {
    const web3 = new Web3(window.ethereum);
    try {
      let receipt = null;
      while (receipt === null || receipt.status === undefined) {
        const transaction = factoryWeb3.methods
          .decomposeProduct(selectedOwnData.id, Number(productAmount))
          .send({
            from: account,
            value: ethers.parseEther(Number(decomposeFee).toString()),
          });
        openSpin('Decomposing Product...');
        receipt = await web3.eth.getTransactionReceipt(
          (
            await transaction
          ).transactionHash
        );
        if (receipt && receipt.status !== undefined) {
          if (receipt.status) {
            showToast('success', 'Decompose success!');
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
      showToast('fail', 'User rejected!');
      console.log(err);
    } finally {
      closeSpin();
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
              address={currentProductAddress}
              id={selectedOwnData.id}
              balance={selectedOwnData.balance}
              uri={selectedOwnData.imageUri}
            />
            <div className=" flex justify-between items-center">
              <p className="xs:text-[22px] text-[16px] text-[#BABABA]">
                Product Decompose Fee
              </p>
              <p className="xs:text-[24px] text-[16px] font-semibold">
                {Number(decomposeFee) * Number(productAmount)} ETH
              </p>
            </div>
            <div className=" flex justify-between gap-6 items-center">
              <input
                className="md:w-[70%] w-1/2 h-[40px] rounded-xl placeholder-gray-600 bg-black border border-white px-4 hide-arrows"
                type="number"
                placeholder="Product Amount"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                value={productAmount}
              />
              <Button
                className="flex disabled:bg-gray-900 justify-center w-[160px] h-9 rounded-xl"
                text="Approve"
                disabled={!isApproveEnable}
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
              uri={selectedOwnData.imageUri}
              address={currentBlueprintAddress}
              name={selectedOwnData.name}
              productAmount={Number(productAmount)}
            />
            {selectedOwnData.data.erc20Data.map((dataItem, index) => (
              <ERC20DecomposeListCard
                key={index}
                name={dataItem.name}
                uri={dataItem.uri}
                address={dataItem.tokenAddress}
                amount={Number(dataItem.amount)}
                productAmount={Number(productAmount)}
              />
            ))}
            {selectedOwnData.data.erc721Data.map((dataItem, index) => (
              <ERC721DecomposeListCard
                key={index}
                id={dataItem.tokenId}
                address={dataItem.tokenAddress}
              />
            ))}
            {selectedOwnData.data.erc1155Data.map((dataItem, index) => (
              <ERC1155DecomposeListCard
                key={index}
                id={dataItem.tokenId}
                address={dataItem.tokenAddress}
                amount={dataItem.amount}
                productAmount={Number(productAmount)}
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
                className="flex justify-center disabled:bg-gray-900 w-[160px] h-9 rounded-xl"
                disabled={!isDecomposeApproved}
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
