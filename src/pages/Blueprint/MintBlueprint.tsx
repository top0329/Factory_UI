import React, { useEffect, useState } from 'react';
import copy from 'copy-to-clipboard';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useAtom } from 'jotai';
import { Contract, ethers } from 'ethers';

import Button from '../../components/Button';
import useWeb3 from '../../hooks/useWeb3';
import useToast from '../../hooks/useToast';
import erc20Abi from '../../abi/ERC20ABI.json';
import { blueprintSelectionState } from '../../jotai/atoms';
import { usdtAddress, usdcAddress, factoryAddress } from '../../constants';
import useSpinner from '../../hooks/useSpinner';

const MintBlueprintPage = () => {
  const { factoryContract, factoryWeb3, account, erc20Approve, library } =
    useWeb3();
  const { showToast } = useToast();
  const { openSpin, closeSpin } = useSpinner();

  const navigate = useNavigate();

  const [selectedBlueprint] = useAtom(blueprintSelectionState);

  const [blueprintMintAmountValue, setBlueprintMintAmountValue] = useState<
    number | ''
  >('');
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isMintAmountOver, setIsMintAmountOver] = useState<boolean>(false);
  const [isMintAmountEmpty, setIsMintAmountEmpty] = useState<boolean>(false);
  const [blueprintCreationFee, setBlueprintCreationFee] = useState<number>(0);
  const [currentEthBalance, setCurrentEthBalance] = useState<number>(0);
  const [currentUsdtBalance, setCurrentUsdtBalance] = useState<number>(0);
  const [currentUsdcBalance, setCurrentUsdcBalance] = useState<number>(0);

  useEffect(() => {
    async function init() {
      const usdtContract: Contract = new ethers.Contract(
        usdtAddress,
        erc20Abi,
        library
      ) as Contract;
      const usdcContract: Contract = new ethers.Contract(
        usdcAddress,
        erc20Abi,
        library
      ) as Contract;
      const _ethBalance = await library?.provider?.getBalance(account!);
      const _ethBalanceNumber = ethers.formatEther(_ethBalance!);
      const _usdtBalance = await usdtContract.balanceOf(account);
      const _usdtBalanceNumber = ethers.formatUnits(_usdtBalance, 6);
      const _usdcBalance = await usdcContract.balanceOf(account);
      const _usdcBalanceNumber = ethers.formatUnits(_usdcBalance, 6);
      const _blueprintCreationFee =
        await factoryContract.blueprintCreationFee();
      const _blueprintCreationFeeEth = ethers.formatEther(
        _blueprintCreationFee
      );
      setBlueprintCreationFee(Number(_blueprintCreationFeeEth));
      setCurrentUsdtBalance(Number(_usdtBalanceNumber));
      setCurrentUsdcBalance(Number(_usdcBalanceNumber));
      setCurrentEthBalance(Number(_ethBalanceNumber));
    }
    init();
  }, [account, factoryContract, library]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue === '' || /^\d+$/.test(newValue)) {
      if (
        Number(newValue) < Number(selectedBlueprint.mintLimit) ||
        Number(selectedBlueprint.mintLimit) === 0
      ) {
        setBlueprintMintAmountValue(
          newValue.trim() === '' ? '' : Number(newValue)
        );
      } else {
        setIsMintAmountOver(true);
        setTimeout(() => {
          setIsMintAmountOver(false);
        }, 2000);
      }
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

  const handleApproveClick = async () => {
    try {
      if (blueprintMintAmountValue === 0 || blueprintMintAmountValue === '') {
        setIsMintAmountEmpty(true);
        setTimeout(() => {
          setIsMintAmountEmpty(false);
        }, 2000);
      } else {
        if (Number(selectedBlueprint.mintPriceUnit) === 1) {
          if (
            currentUsdtBalance >=
            blueprintMintAmountValue * Number(selectedBlueprint.mintPrice)
          ) {
            const approveValue = ethers.parseUnits(
              (
                blueprintMintAmountValue * Number(selectedBlueprint.mintPrice)
              ).toString(),
              6
            );
            openSpin('Approving');
            await erc20Approve(
              usdtAddress,
              factoryAddress,
              approveValue.toString()
            );
            showToast('success', 'Approved successfully');
            setIsApproved(true);
          } else {
            showToast(
              'warning',
              "You don't have enough USDT to approve this transaction"
            );
            console.log(
              "You don't have enough USDT to approve this transaction"
            );
            setIsApproved(false);
          }
        } else if (Number(selectedBlueprint.mintPriceUnit) === 2) {
          if (
            currentUsdcBalance >=
            blueprintMintAmountValue * Number(selectedBlueprint.mintPrice)
          ) {
            const approveValue = ethers.parseUnits(
              (
                blueprintMintAmountValue * Number(selectedBlueprint.mintPrice)
              ).toString(),
              6
            );
            openSpin('Approving');
            await erc20Approve(
              usdcAddress,
              factoryAddress,
              approveValue.toString()
            );
            showToast('success', 'Approved successfully');
            setIsApproved(true);
          } else {
            showToast(
              'warning',
              "You don't have enough USDC to approve this transaction"
            );
            console.log(
              "You don't have enough USDC to approve this transaction"
            );
            setIsApproved(false);
          }
        }
      }
    } catch (err) {
      setIsApproved(false);
      showToast('fail', 'Approve failed!');
      console.log(err);
    } finally {
      closeSpin();
    }
  };

  const handleMintBlueprintClick = async () => {
    try {
      if (blueprintMintAmountValue === 0 || blueprintMintAmountValue === '') {
        setIsMintAmountEmpty(true);
        setTimeout(() => {
          setIsMintAmountEmpty(false);
        }, 2000);
      } else {
        if (Number(selectedBlueprint.mintPriceUnit) === 0) {
          if (
            currentEthBalance >=
            blueprintMintAmountValue * Number(selectedBlueprint.mintPrice) +
              blueprintCreationFee
          ) {
            openSpin('Minting Blueprint');
            const _mintFee =
              blueprintMintAmountValue * Number(selectedBlueprint.mintPrice) +
              blueprintCreationFee;
            const _mintFeeWei = ethers.parseEther(_mintFee.toString());
            const transition = await factoryWeb3.methods
              .mintBlueprint(
                account,
                selectedBlueprint.id,
                blueprintMintAmountValue,
                '0x'
              )
              .send({ from: account, value: _mintFeeWei });
            console.log(transition);
            showToast('success', 'Blueprint minted successfully');
            setIsApproved(false);
            navigate('/my-blueprint');
          } else {
            showToast('warning', "You don't have enough eth");
            console.log("You don't have enough eth");
          }
        }
        if (Number(selectedBlueprint.mintPriceUnit) === 1) {
          if (currentEthBalance >= blueprintCreationFee) {
            if (
              currentUsdtBalance >=
              blueprintMintAmountValue * Number(selectedBlueprint.mintPrice)
            ) {
              if (isApproved) {
                openSpin('Minting Blueprint');
                const _blueprintCreationFeeWei = ethers.parseEther(
                  blueprintCreationFee.toString()
                );
                const transition = await factoryWeb3.methods
                  .mintBlueprint(
                    account,
                    selectedBlueprint.id,
                    blueprintMintAmountValue,
                    '0x'
                  )
                  .send({ from: account, value: _blueprintCreationFeeWei });
                console.log(transition);
                showToast('success', 'Blueprint minted successfully');
                setIsApproved(false);
                navigate('/my-blueprint');
              } else {
                showToast('warning', 'Not approved');
                console.log('Not approved');
              }
            } else {
              showToast('warning', "You don't have enough USDT");
              console.log("You don't have enough USDT");
            }
          } else {
            showToast('warning', "You don't have enough eth");
            console.log("You don't have enough eth");
          }
        }
        if (Number(selectedBlueprint.mintPriceUnit) === 2) {
          if (currentEthBalance >= blueprintCreationFee) {
            if (
              currentUsdcBalance >=
              blueprintMintAmountValue * Number(selectedBlueprint.mintPrice)
            ) {
              if (isApproved) {
                openSpin('Minting Blueprint');
                const _blueprintCreationFeeWei = ethers.parseEther(
                  blueprintCreationFee.toString()
                );
                const transition = await factoryWeb3.methods
                  .mintBlueprint(
                    account,
                    selectedBlueprint.id,
                    blueprintMintAmountValue,
                    '0x'
                  )
                  .send({ from: account, value: _blueprintCreationFeeWei });
                console.log(transition);
                showToast('success', 'Blueprint minted successfully');
                setIsApproved(false);
                navigate('/my-blueprint');
              } else {
                showToast('warning', 'Not approved');
                console.log('Not approved');
              }
            } else {
              showToast('warning', "You don't have enough USDC");
              console.log("You don't have enough USDC");
            }
          } else {
            showToast('warning', "You don't have enough eth");
            console.log("You don't have enough eth");
          }
        }
      }
    } catch (err) {
      console.log(err);
      showToast('fail', 'Mint failed!');
    } finally {
      closeSpin();
    }
  };

  const handleCopyButtonClicked = () => {
    try {
      setIsCopied(true);
      copy(selectedBlueprint.creator);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.log('failed to copy', err);
    }
  };

  return (
    <div className="flex justify-center items-center py-10 text-white sm:py-10">
      <div className="relative rounded-3xl bg-[#060606] w-full pb-6 sm:w-[614px] sm:bg-[#060606] border-2 border-[#1f1f1f]">
        <header className="flex justify-start items-center pl-4 py-4 text-xl sm:text-3xl sm:justify-center">
          Mint Blueprint
        </header>
        <img
          className="w-full h-80 sm:h-96 object-cover"
          src={selectedBlueprint.uri}
          alt="blueprint"
        />
        <div className="z-10 absolute top-[268px] bg-gradient-to-t from-[#060606] to-transparent w-full h-28 sm:top-[340px]"></div>
        <div className="flex flex-col gap-4 sm:px-8">
          <h1 className="z-20 font-semibold text-lg mt-[-36px] pl-4 sm:text-xl">
            {selectedBlueprint.name}
          </h1>
          <div className="flex flex-col gap-3 px-4">
            <div className="grid grid-cols-2 gap-3 font-mono">
              <p className="col-span-1 text-light-gray">Blueprint ID</p>
              <p className="col-span-1">{Number(selectedBlueprint.id)}</p>
            </div>
            <div className="flex flex-col justify-between items-start gap-2 font-mono sm:flex-row sm:items-center">
              <p className="text-light-gray">Creator</p>
              <div className="relative flex items-center gap-1">
                <Icon className="w-6 h-6 xs:w-4 xs:h-5" icon="logos:ethereum" />
                <a
                  className="underline text-base break-all"
                  href={`https://sepolia.etherscan.io/address/${selectedBlueprint.creator}`}
                  target="_blank"
                >
                  {selectedBlueprint.creator}
                </a>
                <Icon
                  className="w-6 h-6 cursor-pointer xs:w-4 xs:h-4"
                  icon="solar:copy-outline"
                  onClick={handleCopyButtonClicked}
                />
                {isCopied && (
                  <div
                    className="absolute -bottom-12 right-0 mb-2 px-4 py-2 bg-gray-700 text-white text-xs rounded-lg transition-opacity opacity-100"
                    style={{ transition: 'opacity 0.3s' }}
                  >
                    Copied!
                  </div>
                )}
              </div>
            </div>
            <div className="relative grid grid-cols-2 items-center gap-3 font-mono">
              <p className="col-span-1 text-light-gray">
                Blueprint Mint Amount
              </p>
              <input
                id="blueprint-mint-amount"
                name="blueprint-mint-amount"
                className="inline w-full rounded-lg border border-light-gray text-white text-lg bg-black py-1.5 px-2 leading-5 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm hide-arrows"
                type="number"
                step={1}
                min={1}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                value={blueprintMintAmountValue}
              />
              {isMintAmountOver && (
                <div
                  className="absolute -bottom-12 right-2 mb-2 px-4 py-2 bg-gray-700 text-white text-xs rounded-lg transition-opacity opacity-100"
                  style={{ transition: 'opacity 0.3s' }}
                >
                  Blueprint Mint Limit Over!
                </div>
              )}
              {isMintAmountEmpty && (
                <div
                  className="absolute -bottom-12 right-2 mb-2 px-4 py-2 bg-gray-700 text-white text-xs rounded-lg transition-opacity opacity-100"
                  style={{ transition: 'opacity 0.3s' }}
                >
                  Blueprint Mint Amount Empty!
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 items-center gap-3 font-mono">
              <p className="col-span-1 text-light-gray">
                Blueprint Creation Fee
              </p>
              <p className="col-span-1">{blueprintCreationFee} ETH</p>
            </div>
            <div className="grid grid-cols-2 items-center gap-3 font-mono">
              <p className="col-span-1 text-light-gray">Blueprint Mint Price</p>
              <p className="col-span-1">
                {Number(selectedBlueprint.mintPrice)}{' '}
                {Number(selectedBlueprint.mintPriceUnit) === 0
                  ? 'ETH'
                  : Number(selectedBlueprint.mintPriceUnit) === 1
                  ? 'USDT'
                  : 'USDC'}
              </p>
            </div>
            <div className="grid grid-cols-2 items-center gap-3 font-mono">
              <p className="col-span-1 text-light-gray">Total Mint fee</p>
              <p className="col-span-1">
                {blueprintCreationFee} ETH + {Number(blueprintMintAmountValue)}{' '}
                * {Number(selectedBlueprint.mintPrice)}{' '}
                {Number(selectedBlueprint.mintPriceUnit) === 0
                  ? 'ETH'
                  : Number(selectedBlueprint.mintPriceUnit) === 1
                  ? 'USDT'
                  : 'USDC'}
              </p>
            </div>
            <div className="flex justify-center items-center gap-8 pt-0 xs:gap-28 sm:pt-2">
              <Button
                className="flex justify-center !w-28"
                text="Cancel"
                variant="secondary"
                onClick={() => {
                  navigate('/blueprint');
                }}
              />
              {Number(selectedBlueprint.mintPriceUnit) === 0 ? (
                <Button
                  className="truncate !px-3"
                  text="Mint Blueprint"
                  variant="primary"
                  onClick={handleMintBlueprintClick}
                />
              ) : (
                <React.Fragment>
                  {isApproved ? (
                    <Button
                      className="truncate !px-3"
                      text="Mint Blueprint"
                      variant="primary"
                      onClick={handleMintBlueprintClick}
                    />
                  ) : (
                    <Button
                      className="truncate !px-8"
                      text="Approve"
                      variant="primary"
                      onClick={handleApproveClick}
                    />
                  )}
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MintBlueprintPage;
