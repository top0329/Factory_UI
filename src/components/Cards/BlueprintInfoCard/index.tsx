import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAtom } from 'jotai';
import { Icon } from '@iconify/react/dist/iconify.js';
import { ethers } from 'ethers';
import { Address } from 'viem';

import useWeb3 from '../../../hooks/useWeb3';
import useToast from '../../../hooks/useToast';
import useSpinner from '../../../hooks/useSpinner';
import DefaultBlueprintImage from '../../../assets/images/default-blueprint.png';
import getTokenData from '../../../utils/getTokenData';
import getERC1155Data from '../../../utils/getERC1155Data';
import getERC721Data from '../../../utils/getERC721Data';
import { createBlueprintAtom } from '../../../jotai/atoms';
import { CreateBlueprint } from '../../../types';
import {
  DefaultErc20ImageUri,
  invalidChars,
  TOKEN_DETAIL_DATA_URL,
} from '../../../constants';
import { uploadFileToIPFS, uploadJSONToIPFS } from '../../../utils/uploadIPFS';
import { getTokenDetailsByAddress } from '../../../utils/checkContractType';
import { getGasPrice } from '../../../utils/getGasPrice';

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface Props {
  isRecreate?: boolean;
  isUpdate?: boolean;
}

const CheckboxIcon = btoa(
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="white" d="M20.292 6.708a1 1 0 0 0-1.414-1.414l-10.334 10.333-4.25-4.25a1 1 0 1 0-1.415 1.414l5 5a1 1 0 0 0 1.415 0L20.292 6.708z"/></svg>'
);

function CustomCheckbox({ checked, onChange }: CustomCheckboxProps) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      style={{
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        appearance: 'none',
        border: '1px solid #858584',
        borderRadius: '2px',
        backgroundColor: checked ? '#011018' : 'transparent',
        backgroundImage: checked
          ? `url('data:image/svg+xml;base64,${CheckboxIcon}')`
          : '',
        backgroundPosition: 'center',
        backgroundSize: '98%',
        width: '14px',
        height: '14px',
        cursor: 'pointer',
      }}
    />
  );
}

const BlueprintInfoCard: FC<Props> = ({ isRecreate, isUpdate }) => {
  const initialBlueprint: CreateBlueprint = {
    id: '',
    name: '',
    imageUri:
      'https://ipfs.io/ipfs/bafkreiac47exop4qnvi47azogyp2xrb45dlyqgsijpnsvkvizkh4rm3uvi',
    creator: '',
    totalSupply: '',
    mintPrice: '',
    mintPriceUnit: '',
    mintLimit: '',
    data: {
      erc20Data: [],
      erc721Data: [],
      erc1155Data: [],
    },
  };

  const {
    isConnected,
    library,
    account,
    chainId,
    factoryWeb3,
    blueprintContract,
    nativeTokenUnit,
    web3,
  } = useWeb3();
  const { showToast } = useToast();
  const { openSpin, closeSpin } = useSpinner();

  const navigate = useNavigate();

  const [createInfo, setCreateInfo] =
    useAtom<CreateBlueprint>(createBlueprintAtom);
  const [uriChecked, setUriChecked] = useState(false);
  const [mintPriceChecked, setMintPriceChecked] = useState(false);
  const [mintLimitChecked, setMintLimitChecked] = useState(false);
  const [fileText, setFileText] = useState('');
  const [isIPFSSelected, setIsIPFSSelected] = useState(false);
  const [name, setName] = useState('');
  const [totalSupply, setTotalSupply] = useState<number | ''>('');
  const [mintPrice, setMintPrice] = useState<number | ''>('');
  const [mintPriceLimit, setMintPriceLimit] = useState<number | ''>('');
  const [imageSrc, setImageSrc] = useState<string>(
    createInfo.imageUri.substring(21)
  );
  const [tokenDataUrl, setTokenDataUrl] = useState<string>('');
  const [uploadedImageSrc, setUploadedImageSrc] = useState<string>(
    DefaultBlueprintImage
  );
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [error, setError] = useState<{
    name: string;
    totalSupply: string;
    uri: string;
    mintPrice: string;
    mintLimit: string;
  }>({
    name: '',
    totalSupply: '',
    uri: '',
    mintPrice: '',
    mintLimit: '',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (chainId === 1) {
      setTokenDataUrl(TOKEN_DETAIL_DATA_URL.main);
    } else if (chainId === 137) {
      setTokenDataUrl(TOKEN_DETAIL_DATA_URL.polygon);
    }
  }, [chainId]);

  useEffect(() => {
    setIsIPFSSelected(isIPFSSelected);
    setName(createInfo.name);
    setTotalSupply(Number(createInfo.totalSupply));
    setMintPrice(createInfo.mintPrice);
    setMintPriceLimit(createInfo.mintLimit);
  }, [
    createInfo.mintLimit,
    createInfo.mintPrice,
    createInfo.name,
    createInfo.totalSupply,
    isIPFSSelected,
  ]);

  useEffect(() => {
    setImageSrc(createInfo.imageUri);
  }, [createInfo.imageUri]);

  useEffect(() => {
    if (isRecreate || isUpdate) setIsIPFSSelected(true);
  }, [isRecreate, isUpdate]);

  const handleRadioClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.id;
    if (value === 'files-radio') {
      if (selectedFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedFile(selectedFile);
          setFileText(selectedFile.name);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setUploadedImageSrc(DefaultBlueprintImage);
      }
    } else if (value === 'ipfs-radio') {
      setImageSrc(createInfo.imageUri.substring(21));
    }
    setIsIPFSSelected(value === 'ipfs-radio');
  };

  const handleUriCheckedChange = () => {
    setUriChecked(!uriChecked);
  };

  const handleMintPriceChecked = () => {
    setMintPriceChecked(!mintPriceChecked);
  };

  const handleMintLimitChecked = () => {
    setMintLimitChecked(!mintLimitChecked);
  };

  const handleFileNameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setFileText(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(file);
        setUploadedImageSrc(reader.result as string);
        setFileText(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (invalidChars.test(value)) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
      return;
    } else {
      setCreateInfo((prevCreateInfo) => ({
        ...prevCreateInfo,
        name: value,
      }));
      setName(value);
      if (value.length > 0) {
        setError((prevError) => ({
          ...prevError,
          name: '',
        }));
      } else {
        setError((prevError) => ({
          ...prevError,
          name: 'Name is required',
        }));
      }
    }
  };

  const handleKeyDownForMintPrice = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      !(
        (event.key >= '0' && event.key <= '9') ||
        event.key === 'Backspace' ||
        event.key === 'Delete' ||
        event.key === 'Tab' ||
        event.key === 'ArrowLeft' ||
        event.key === 'ArrowRight' ||
        event.key === '.' ||
        (event.key >= '0' &&
          event.key <= '9' &&
          event.getModifierState('NumLock'))
      )
    ) {
      event.preventDefault();
    }
  };

  const handleKeyDownForTotalSupplyAndMintLimit = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
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

  const triggerFileInputClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const uploadImageToIPFS = async () => {
    if (!selectedFile) return;
    try {
      const imageHashURI: string = await uploadFileToIPFS(selectedFile, name);
      return imageHashURI;
    } catch (error) {
      console.log('Error uploading file:', error);
    }
  };

  const uploadMetadataToIPFS = async (imageHashURI: string) => {
    try {
      const json = {
        name: name,
        description: 'The ERC1155 token for Factory Project',
        image: `ipfs/${imageHashURI}`,
        attributes: [],
        compiler: 'Factory',
      };
      const jsonHash = await uploadJSONToIPFS(fileText, json);
      return jsonHash;
    } catch (error) {
      console.log('Error uploading file:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const gasPrice = await getGasPrice(web3, chainId!);
      if (name === '') {
        setError((prevState) => ({
          ...prevState,
          name: 'Name is required!',
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          name: '',
        }));
      }
      if (totalSupply === '' || totalSupply === 0) {
        setError((prevState) => ({
          ...prevState,
          totalSupply: 'Total Supply is Empty!',
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          totalSupply: '',
        }));
      }
      if (isConnected && library) {
        if (
          createInfo.data.erc20Data.length +
            createInfo.data.erc721Data.length +
            createInfo.data.erc1155Data.length >
          0
        ) {
          const componentData = {
            erc20Data: await Promise.all(
              createInfo.data.erc20Data.map(async (erc20) => {
                const tokenData = await getTokenData(
                  erc20.tokenAddress as Address,
                  library
                );
                if (tokenData) {
                  const { decimal } = tokenData;
                  return {
                    tokenAddress: erc20.tokenAddress,
                    amount: Number(
                      ethers.parseUnits(erc20.amount.toString(), decimal)
                    ),
                  };
                }
              })
            ),
            erc721Data: createInfo.data.erc721Data.map((erc721) => {
              return {
                tokenAddress: erc721.tokenAddress,
                tokenId: erc721.tokenId,
              };
            }),
            erc1155Data: createInfo.data.erc1155Data.map((erc1155) => {
              return {
                tokenAddress: erc1155.tokenAddress,
                tokenId: erc1155.tokenId,
                amount: erc1155.amount,
              };
            }),
          };
          if (isUpdate) {
            const data = {
              id: Number(createInfo.id),
              chainId: chainId,
              imageUri: imageSrc,
              mintPrice:
                createInfo.mintPrice === '' ? 0 : Number(createInfo.mintPrice),
              mintPriceUnit: Number(createInfo.mintPriceUnit),
              mintLimit: Number(createInfo.mintLimit),
            };
            try {
              if (
                Number(uriChecked) +
                  Number(mintPriceChecked) +
                  Number(mintLimitChecked) >
                1
              ) {
                if (uriChecked) {
                  if (isIPFSSelected) {
                    if (imageSrc.substring(21)) {
                      openSpin('Uploading metadata to ipfs');
                      const jsonHash = await uploadMetadataToIPFS(
                        imageSrc.substring(21)
                      );
                      if (jsonHash) {
                        openSpin('Updating Blueprint');
                        let _mintPrice: bigint;
                        if (Number(createInfo.mintPriceUnit) === 0) {
                          _mintPrice = ethers.parseEther(
                            createInfo.mintPrice.toString()
                          );
                        } else {
                          _mintPrice = ethers.parseUnits(
                            createInfo.mintPrice.toString(),
                            6
                          );
                        }
                        await factoryWeb3.methods
                          .updateBlueprintData(
                            createInfo.id,
                            jsonHash.substring(16),
                            _mintPrice,
                            createInfo.mintPriceUnit,
                            Number(createInfo.mintLimit)
                          )
                          .send({ from: account, gasPrice });
                        await axios.put(
                          `${import.meta.env.VITE_BASE_URI}/blueprint/update`,
                          data
                        );
                        setCreateInfo(initialBlueprint);
                        showToast('success', 'Blueprint updated successfully');
                        navigate('/blueprint');
                      }
                    } else {
                      showToast('warning', 'Please input ipfs image hash');
                    }
                  } else {
                    if (selectedFile) {
                      openSpin('Uploading image to ipfs');
                      const imageHash = await uploadImageToIPFS();
                      if (imageHash) {
                        openSpin('Uploading metadata to ipfs');
                        const jsonHash = await uploadMetadataToIPFS(imageHash);
                        if (jsonHash) {
                          openSpin('Updating Blueprint');
                          let _mintPrice: bigint;
                          if (Number(createInfo.mintPriceUnit) === 0) {
                            _mintPrice = ethers.parseEther(
                              createInfo.mintPrice.toString()
                            );
                          } else {
                            _mintPrice = ethers.parseUnits(
                              createInfo.mintPrice.toString(),
                              6
                            );
                          }
                          await factoryWeb3.methods
                            .updateBlueprintData(
                              createInfo.id,
                              jsonHash.substring(16),
                              _mintPrice,
                              createInfo.mintPriceUnit,
                              Number(createInfo.mintLimit)
                            )
                            .send({ from: account, gasPrice });
                          data.imageUri = `https://ipfs.io/ipfs/${imageHash}`;
                          await axios.put(
                            `${import.meta.env.VITE_BASE_URI}/blueprint/update`,
                            data
                          );
                          setCreateInfo(initialBlueprint);
                          showToast(
                            'success',
                            'Blueprint updated successfully'
                          );
                          navigate('/blueprint');
                        }
                      }
                    } else {
                      showToast('warning', 'Please upload image');
                    }
                  }
                } else {
                  openSpin('Updating Blueprint');
                  let _mintPrice: bigint;
                  if (Number(createInfo.mintPriceUnit) === 0) {
                    _mintPrice = ethers.parseEther(
                      createInfo.mintPrice.toString()
                    );
                  } else {
                    _mintPrice = ethers.parseUnits(
                      createInfo.mintPrice.toString(),
                      6
                    );
                  }
                  const jsonHashUri = await blueprintContract.uri(
                    createInfo.id
                  );
                  await factoryWeb3.methods
                    .updateBlueprintData(
                      createInfo.id,
                      jsonHashUri,
                      _mintPrice,
                      createInfo.mintPriceUnit,
                      Number(createInfo.mintLimit)
                    )
                    .send({ from: account, gasPrice });
                  await axios.put(
                    `${import.meta.env.VITE_BASE_URI}/blueprint/update`,
                    data
                  );
                  setCreateInfo(initialBlueprint);
                  showToast('success', 'Blueprint updated successfully');
                  navigate('/blueprint');
                }
              } else if (uriChecked) {
                if (isIPFSSelected) {
                  if (imageSrc.substring(21)) {
                    openSpin('Uploading metadata to ipfs');
                    const jsonHash = await uploadMetadataToIPFS(
                      imageSrc.substring(21)
                    );
                    if (jsonHash) {
                      openSpin('Updating Blueprint URI');
                      await factoryWeb3.methods
                        .updateBlueprintURI(
                          createInfo.id,
                          jsonHash.substring(16)
                        )
                        .send({ from: account, gasPrice });
                      await axios.put(
                        `${import.meta.env.VITE_BASE_URI}/blueprint/update`,
                        {
                          id: Number(createInfo.id),
                          chainId: chainId,
                          imageUri: imageSrc,
                        }
                      );
                      setCreateInfo(initialBlueprint);
                      showToast(
                        'success',
                        'Blueprint URI updated successfully'
                      );
                      navigate('/blueprint');
                    }
                  } else {
                    showToast('warning', 'Please input ipfs image hash');
                  }
                } else {
                  if (selectedFile) {
                    openSpin('Uploading image to ipfs');
                    const imageHash = await uploadImageToIPFS();
                    if (imageHash) {
                      openSpin('Uploading metadata to ipfs');
                      const jsonHash = await uploadMetadataToIPFS(imageHash);
                      if (jsonHash) {
                        openSpin('Updating Blueprint URI');
                        await factoryWeb3.methods
                          .updateBlueprintURI(
                            createInfo.id,
                            jsonHash.substring(16)
                          )
                          .send({ from: account, gasPrice });
                        await axios.put(
                          `${import.meta.env.VITE_BASE_URI}/blueprint/update`,
                          {
                            id: Number(createInfo.id),
                            chainId: chainId,
                            imageUri: `https://ipfs.io/ipfs/${imageHash}`,
                          }
                        );
                        setCreateInfo(initialBlueprint);
                        showToast(
                          'success',
                          'Blueprint URI updated successfully'
                        );
                        navigate('/blueprint');
                      }
                    }
                  } else {
                    showToast('warning', 'Please upload image');
                  }
                }
              } else if (mintPriceChecked) {
                let _mintPrice: bigint;
                if (Number(createInfo.mintPriceUnit) === 0) {
                  _mintPrice = ethers.parseEther(
                    createInfo.mintPrice.toString()
                  );
                } else {
                  _mintPrice = ethers.parseUnits(
                    createInfo.mintPrice.toString(),
                    6
                  );
                }
                openSpin('Updating Blueprint MintPrice');
                await factoryWeb3.methods
                  .updateBlueprintMintPrice(
                    createInfo.id,
                    _mintPrice,
                    createInfo.mintPriceUnit
                  )
                  .send({ from: account, gasPrice });
                await axios.put(
                  `${import.meta.env.VITE_BASE_URI}/blueprint/update`,
                  {
                    id: Number(createInfo.id),
                    chainId: chainId,
                    mintPrice:
                      createInfo.mintPrice === ''
                        ? 0
                        : Number(createInfo.mintPrice),
                    mintPriceUnit: Number(createInfo.mintPriceUnit),
                  }
                );
                setCreateInfo(initialBlueprint);
                showToast('success', 'Blueprint MintPrice update successfully');
                navigate('/blueprint');
              } else if (mintLimitChecked) {
                const _mintLimit = createInfo.mintLimit;
                openSpin('Updating Blueprint MintLimit');
                await factoryWeb3.methods
                  .updateBlueprintMintLimit(createInfo.id, _mintLimit)
                  .send({ from: account, gasPrice });
                await axios.put(
                  `${import.meta.env.VITE_BASE_URI}/blueprint/update`,
                  {
                    id: Number(createInfo.id),
                    chainId: chainId,
                    mintLimit: Number(_mintLimit),
                  }
                );
                setCreateInfo(initialBlueprint);
                showToast(
                  'success',
                  'Blueprint MintLimit updated successfully'
                );
                navigate('/blueprint');
              } else {
                showToast('warning', 'Please select an option to update');
              }
            } catch (err) {
              console.log(err);
              showToast('fail', 'Blueprint update failed!');
            }
          } else if (isRecreate) {
            try {
              if (
                error.name === '' &&
                error.totalSupply === '' &&
                name !== '' &&
                totalSupply !== 0
              ) {
                const blueprintData = {
                  id: 0,
                  chainId: chainId,
                  name: createInfo.name,
                  imageUri: imageSrc,
                  creator: account,
                  totalSupply: Number(createInfo.totalSupply),
                  mintPrice:
                    createInfo.mintPrice === ''
                      ? 0
                      : Number(createInfo.mintPrice),
                  mintPriceUnit: Number(createInfo.mintPriceUnit),
                  mintLimit: Number(createInfo.mintLimit),
                  data: {
                    erc20Data: await Promise.all(
                      createInfo.data.erc20Data.map(async (erc20) => {
                        let _name: string = '';
                        let _uri: string = '';
                        const tokenData = await getTokenData(
                          erc20.tokenAddress as Address,
                          library
                        );
                        if (tokenData) {
                          const { tokenName } = tokenData;
                          const details = await getTokenDetailsByAddress(
                            erc20.tokenAddress as Address,
                            tokenDataUrl
                          );
                          _name = tokenName;
                          if (details) {
                            _uri = details?.logo;
                          } else {
                            _uri = DefaultErc20ImageUri;
                          }
                          return {
                            name: _name,
                            tokenAddress: erc20.tokenAddress,
                            amount: Number(erc20.amount),
                            uri: _uri,
                          };
                        }
                      })
                    ),
                    erc721Data: await Promise.all(
                      createInfo.data.erc721Data.map(async (erc721) => {
                        let _name: string = '';
                        const erc721Data = await getERC721Data(
                          erc721.tokenAddress as Address,
                          erc721.tokenId,
                          library
                        );
                        if (erc721Data) {
                          const { name } = erc721Data;
                          _name = name;
                        }
                        return {
                          name: _name,
                          tokenAddress: erc721.tokenAddress,
                          tokenId: Number(erc721.tokenId),
                        };
                      })
                    ),
                    erc1155Data: await Promise.all(
                      createInfo.data.erc1155Data.map(async (erc1155) => {
                        let _name: string = '';
                        const erc1155Data = await getERC1155Data(
                          erc1155.tokenAddress as Address,
                          erc1155.tokenId,
                          library
                        );
                        if (erc1155Data) {
                          const { name } = erc1155Data;
                          _name = name;
                        }
                        return {
                          name: _name,
                          tokenAddress: erc1155.tokenAddress,
                          tokenId: Number(erc1155.tokenId),
                          amount: Number(erc1155.amount),
                        };
                      })
                    ),
                  },
                };
                if (uriChecked) {
                  if (isIPFSSelected) {
                    if (imageSrc.substring(21)) {
                      openSpin('Uploading metadata to ipfs');
                      const jsonHash = await uploadMetadataToIPFS(
                        imageSrc.substring(21)
                      );
                      if (jsonHash) {
                        let _mintPrice: bigint;
                        if (Number(createInfo.mintPriceUnit) === 0) {
                          _mintPrice = ethers.parseEther(
                            createInfo.mintPrice.toString()
                          );
                        } else {
                          _mintPrice = ethers.parseUnits(
                            createInfo.mintPrice.toString(),
                            6
                          );
                        }
                        openSpin('Recreating Blueprint');
                        const tx = await factoryWeb3.methods
                          .createBlueprint(
                            createInfo.name,
                            jsonHash.substring(16),
                            createInfo.totalSupply,
                            _mintPrice,
                            createInfo.mintPriceUnit,
                            createInfo.mintLimit,
                            componentData
                          )
                          .send({ from: account, gasPrice });
                        blueprintData.id = parseInt(tx.logs[0].topics[1]);
                        await axios.post(
                          `${import.meta.env.VITE_BASE_URI}/blueprint/create`,
                          blueprintData
                        );
                        setCreateInfo(initialBlueprint);
                        showToast(
                          'success',
                          'Blueprint recreated successfully'
                        );
                        navigate('/blueprint');
                      }
                    } else {
                      showToast('warning', 'Please input ipfs image hash');
                    }
                  } else {
                    if (selectedFile) {
                      openSpin('Uploading image to ipfs');
                      const imageHash = await uploadImageToIPFS();
                      if (imageHash) {
                        openSpin('Uploading metadata to ipfs');
                        const jsonHash = await uploadMetadataToIPFS(imageHash);
                        if (jsonHash) {
                          let _mintPrice: bigint;
                          if (Number(createInfo.mintPriceUnit) === 0) {
                            _mintPrice = ethers.parseEther(
                              createInfo.mintPrice.toString()
                            );
                          } else {
                            _mintPrice = ethers.parseUnits(
                              createInfo.mintPrice.toString(),
                              6
                            );
                          }
                          openSpin('Rereating Blueprint');
                          const tx = await factoryWeb3.methods
                            .createBlueprint(
                              createInfo.name,
                              jsonHash.substring(16),
                              createInfo.totalSupply,
                              _mintPrice,
                              createInfo.mintPriceUnit,
                              createInfo.mintLimit,
                              componentData
                            )
                            .send({ from: account, gasPrice });
                          blueprintData.id = parseInt(tx.logs[0].topics[1]);
                          blueprintData.imageUri = `https://ipfs.io/ipfs/${imageHash}`;
                          await axios.post(
                            `${import.meta.env.VITE_BASE_URI}/blueprint/create`,
                            blueprintData
                          );
                          setCreateInfo(initialBlueprint);
                          showToast(
                            'success',
                            'Blueprint created successfully'
                          );
                          navigate('/blueprint');
                        }
                      }
                    } else {
                      showToast('warning', 'Please upload image');
                    }
                  }
                } else {
                  let _mintPrice: bigint;
                  let _imageUri: string = '';
                  if (Number(createInfo.mintPriceUnit) === 0) {
                    _mintPrice = ethers.parseEther(
                      createInfo.mintPrice.toString()
                    );
                  } else {
                    _mintPrice = ethers.parseUnits(
                      createInfo.mintPrice.toString(),
                      6
                    );
                  }
                  const jsonHashUri = await blueprintContract.uri(
                    createInfo.id
                  );
                  const {
                    data: { image },
                  } = await axios.get(`https://ipfs.io/${jsonHashUri}`);
                  _imageUri = `https://ipfs.io/${image}`;
                  const _mintLimit = createInfo.mintLimit;
                  openSpin('Recreating Blueprint');
                  const tx = await factoryWeb3.methods
                    .createBlueprint(
                      createInfo.name,
                      jsonHashUri,
                      createInfo.totalSupply,
                      _mintPrice,
                      createInfo.mintPriceUnit,
                      _mintLimit,
                      componentData
                    )
                    .send({ from: account, gasPrice });
                  blueprintData.id = parseInt(tx.logs[0].topics[1]);
                  blueprintData.imageUri = _imageUri;
                  await axios.post(
                    `${import.meta.env.VITE_BASE_URI}/blueprint/create`,
                    blueprintData
                  );
                  setCreateInfo(initialBlueprint);
                  showToast('success', 'Blueprint recreated successfully');
                  navigate('/blueprint');
                }
              }
            } catch (err) {
              console.log(err);
              showToast('fail', 'Blueprint recreation failed!');
            }
          } else {
            try {
              if (
                error.name === '' &&
                error.totalSupply === '' &&
                name !== '' &&
                totalSupply !== 0
              ) {
                const blueprintData = {
                  id: 0,
                  chainId: chainId,
                  name: createInfo.name,
                  imageUri: imageSrc,
                  creator: account,
                  totalSupply: Number(createInfo.totalSupply),
                  mintPrice:
                    createInfo.mintPrice === ''
                      ? 0
                      : Number(createInfo.mintPrice),
                  mintPriceUnit: Number(createInfo.mintPriceUnit),
                  mintLimit: Number(createInfo.mintLimit),
                  data: {
                    erc20Data: await Promise.all(
                      createInfo.data.erc20Data.map(async (erc20) => {
                        let _name: string = '';
                        let _uri: string = '';
                        const tokenData = await getTokenData(
                          erc20.tokenAddress as Address,
                          library
                        );
                        if (tokenData) {
                          const { tokenName } = tokenData;
                          const details = await getTokenDetailsByAddress(
                            erc20.tokenAddress as Address,
                            tokenDataUrl
                          );
                          _name = tokenName;
                          if (details) {
                            _uri = details?.logo;
                          } else {
                            _uri = DefaultErc20ImageUri;
                          }
                          return {
                            name: _name,
                            tokenAddress: erc20.tokenAddress,
                            amount: Number(erc20.amount),
                            uri: _uri,
                          };
                        }
                      })
                    ),
                    erc721Data: await Promise.all(
                      createInfo.data.erc721Data.map(async (erc721) => {
                        let _name: string = '';
                        const erc721Data = await getERC721Data(
                          erc721.tokenAddress as Address,
                          erc721.tokenId,
                          library
                        );
                        if (erc721Data) {
                          const { name } = erc721Data;
                          _name = name;
                        }
                        return {
                          name: _name,
                          tokenAddress: erc721.tokenAddress,
                          tokenId: erc721.tokenId,
                        };
                      })
                    ),
                    erc1155Data: await Promise.all(
                      createInfo.data.erc1155Data.map(async (erc1155) => {
                        let _name: string = '';
                        const erc1155Data = await getERC1155Data(
                          erc1155.tokenAddress as Address,
                          erc1155.tokenId,
                          library
                        );
                        if (erc1155Data) {
                          const { name } = erc1155Data;
                          _name = name;
                        }
                        return {
                          name: _name,
                          tokenAddress: erc1155.tokenAddress,
                          tokenId: erc1155.tokenId,
                          amount: erc1155.amount,
                        };
                      })
                    ),
                  },
                };
                if (uriChecked) {
                  if (isIPFSSelected) {
                    if (imageSrc.substring(21)) {
                      openSpin('Uploading metadata to ipfs');
                      const jsonHash = await uploadMetadataToIPFS(
                        imageSrc.substring(21)
                      );
                      if (jsonHash) {
                        let _mintPrice: bigint;
                        let _mintLimit: number;
                        if (!mintPriceChecked) {
                          _mintPrice = 0n;
                        } else if (createInfo.mintPrice === '') {
                          _mintPrice = 0n;
                        } else if (Number(createInfo.mintPriceUnit) === 0) {
                          _mintPrice = ethers.parseEther(
                            createInfo.mintPrice.toString()
                          );
                        } else {
                          _mintPrice = ethers.parseUnits(
                            createInfo.mintPrice.toString(),
                            6
                          );
                        }
                        if (!mintLimitChecked) {
                          _mintLimit = 0;
                        } else {
                          _mintLimit =
                            createInfo.mintLimit === ''
                              ? 0
                              : createInfo.mintLimit;
                        }
                        openSpin('Creating Blueprint');
                        const tx = await factoryWeb3.methods
                          .createBlueprint(
                            createInfo.name,
                            jsonHash.substring(16),
                            createInfo.totalSupply,
                            _mintPrice,
                            createInfo.mintPriceUnit,
                            _mintLimit,
                            componentData
                          )
                          .send({ from: account, gasPrice });
                        blueprintData.id = parseInt(tx.logs[0].topics[1]);
                        blueprintData.mintLimit = _mintLimit;
                        await axios.post(
                          `${import.meta.env.VITE_BASE_URI}/blueprint/create`,
                          blueprintData
                        );
                        setCreateInfo(initialBlueprint);
                        showToast('success', 'Blueprint created successfully');
                        navigate('/blueprint');
                      }
                    } else {
                      showToast('warning', 'Please input ipfs image hash');
                    }
                  } else {
                    if (selectedFile) {
                      openSpin('Uploading image to ipfs');
                      const imageHash = await uploadImageToIPFS();
                      if (imageHash) {
                        openSpin('Uploading metadata to ipfs');
                        const jsonHash = await uploadMetadataToIPFS(imageHash);
                        if (jsonHash) {
                          let _mintPrice: bigint;
                          let _mintLimit: number;
                          if (Number(createInfo.mintPriceUnit) === 0) {
                            _mintPrice = ethers.parseEther(
                              createInfo.mintPrice.toString()
                            );
                          } else {
                            _mintPrice = ethers.parseUnits(
                              createInfo.mintPrice.toString(),
                              6
                            );
                          }
                          if (!mintPriceChecked) _mintPrice = 0n;
                          if (!mintLimitChecked) {
                            _mintLimit = 0;
                          } else {
                            _mintLimit =
                              createInfo.mintLimit === ''
                                ? 0
                                : createInfo.mintLimit;
                          }
                          openSpin('Creating Blueprint');
                          const tx = await factoryWeb3.methods
                            .createBlueprint(
                              createInfo.name,
                              jsonHash.substring(16),
                              createInfo.totalSupply,
                              _mintPrice,
                              createInfo.mintPriceUnit,
                              _mintLimit,
                              componentData
                            )
                            .send({
                              from: account,
                              gasPrice: gasPrice,
                            });
                          blueprintData.id = parseInt(tx.logs[0].topics[1]);
                          blueprintData.imageUri = `https://ipfs.io/ipfs/${imageHash}`;
                          blueprintData.mintLimit = _mintLimit;
                          await axios.post(
                            `${import.meta.env.VITE_BASE_URI}/blueprint/create`,
                            blueprintData
                          );
                          setCreateInfo(initialBlueprint);
                          showToast(
                            'success',
                            'Blueprint created successfully'
                          );
                          navigate('/blueprint');
                        }
                      }
                    } else {
                      showToast('warning', 'Please upload image');
                    }
                  }
                } else {
                  let _mintPrice: bigint;
                  let _mintLimit: number;
                  const jsonHashUri =
                    'ipfs/QmWRsqwhHn6anbyDVSot66BcgAfQKWj1D5wJBdiPpo79Tn';
                  const _imageUri =
                    'https://ipfs.io/ipfs/bafkreiac47exop4qnvi47azogyp2xrb45dlyqgsijpnsvkvizkh4rm3uvi';
                  if (!mintPriceChecked) {
                    _mintPrice = 0n;
                  } else if (Number(createInfo.mintPriceUnit) === 0) {
                    _mintPrice = ethers.parseEther(
                      createInfo.mintPrice.toString()
                    );
                  } else {
                    _mintPrice = ethers.parseUnits(
                      createInfo.mintPrice.toString(),
                      6
                    );
                  }
                  if (!mintLimitChecked) {
                    _mintLimit = 0;
                  } else {
                    _mintLimit =
                      createInfo.mintLimit === '' ? 0 : createInfo.mintLimit;
                  }
                  openSpin('Creating Blueprint');
                  const tx = await factoryWeb3.methods
                    .createBlueprint(
                      createInfo.name,
                      jsonHashUri,
                      createInfo.totalSupply,
                      _mintPrice,
                      createInfo.mintPriceUnit,
                      _mintLimit,
                      componentData
                    )
                    .send({ from: account, gasPrice });
                  blueprintData.id = parseInt(tx.logs[0].topics[1]);
                  blueprintData.imageUri = _imageUri;
                  blueprintData.mintLimit = _mintLimit;
                  await axios.post(
                    `${import.meta.env.VITE_BASE_URI}/blueprint/create`,
                    blueprintData
                  );
                  setCreateInfo(initialBlueprint);
                  showToast('success', 'Blueprint created successfully');
                  navigate('/blueprint');
                }
              }
            } catch (err) {
              console.log(err);
              showToast('fail', 'Blueprint creation failed!');
            }
          }
        } else {
          showToast('warning', 'Please add at least one component');
        }
      } else {
        showToast('warning', 'Please connect your wallet first');
      }
    } catch (err) {
      console.log(err);
    } finally {
      closeSpin();
    }
  };

  return (
    <div className="flex flex-col  w-full rounded-3xl bg-[#011018] border border-[#858584]/30 gap-y-1 pb-[30px] ">
      <div className="flex justify-between items-center py-3 text-[#AEAEAE] pl-[24px] pr-[12px]">
        <p className="lg:md:sm:text-2xl xs:text-lg truncate">Blueprint Info</p>
      </div>
      <div className="flex flex-col gap-0 justify-center">
        <input
          id="hiddenFileInput"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
        <img
          className="aspect-auto object-cover h-[250px] xs:h-[180px] sm:h-[200px] md:h-[140px]"
          src={isIPFSSelected ? imageSrc : uploadedImageSrc}
          style={{ maxWidth: '100%' }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = DefaultBlueprintImage;
          }}
        />
      </div>
      <div className="flex flex-col items-center lg:px-[16px] px-[10px] gap-2">
        <div className="relative flex flex-col w-full gap-y-1">
          <p className="text-xs text-[#858584]">Name</p>
          <input
            className="border-[0.5px] w-full h-[28px] py-1 px-2 rounded-lg bg-[#010B10] border-secondary"
            maxLength={20}
            onChange={handleNameChange}
            value={name}
            disabled={isUpdate ? true : false}
            required
          />
          {showTooltip && (
            <div
              className="absolute -bottom-12 left-2 mb-2 px-4 py-2 bg-gray-700 text-white text-xs rounded-lg transition-opacity opacity-100"
              style={{ transition: 'opacity 0.3s' }}
            >
              Special characters are not allowed!
            </div>
          )}
          {error.name && (
            <div className="col-start-2 col-end-4 text-red-600 text-xs text-left pl-2">
              {error.name}
            </div>
          )}
        </div>
        <div className="flex flex-col w-full gap-y-1">
          <p className="text-xs text-[#858584]">Total Supply</p>
          <input
            className="border-[0.5px] w-full h-[28px] py-1 px-2 rounded-lg hide-arrows bg-[#010B10] border-secondary"
            type="number"
            min={1}
            onChange={(event) => {
              const newSupplyNumber = event.target.value;
              setCreateInfo((prevCreateInfo) => ({
                ...prevCreateInfo,
                totalSupply:
                  newSupplyNumber.trim() === '' ? '' : Number(newSupplyNumber),
              }));
              setTotalSupply(
                newSupplyNumber.trim() === '' ? '' : Number(newSupplyNumber)
              );
              if (
                newSupplyNumber.trim() === '' ? '' : Number(newSupplyNumber)
              ) {
                setError((prevError) => ({
                  ...prevError,
                  totalSupply: '',
                }));
              } else {
                setError((prevError) => ({
                  ...prevError,
                  totalSupply: 'Total Supply is Empty!',
                }));
              }
            }}
            onKeyDown={handleKeyDownForTotalSupplyAndMintLimit}
            value={totalSupply === 0 ? '' : totalSupply}
            disabled={isUpdate ? true : false}
            required
          />
          {error.totalSupply && (
            <div className="col-start-2 col-end-4 text-red-600 text-xs text-left pl-2">
              {error.totalSupply}
            </div>
          )}
        </div>
        <div className="flex flex-col w-full gap-y-1">
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <CustomCheckbox
                checked={uriChecked}
                onChange={handleUriCheckedChange}
              />
              <p className="text-xs text-[#858584]">URI</p>
            </div>
            {uriChecked && (
              <div className="flex gap-2">
                <div className="flex items-center">
                  <input
                    id="files-radio"
                    name="files-radio"
                    className="w-4 h-4 !text-black !bg-gray-100 !border-gray-300 !focus:ring-black"
                    type="radio"
                    onChange={handleRadioClick}
                    checked={!isIPFSSelected}
                  />
                  <label className="ms-1 text-xs font-medium text-[#858584]">
                    Files
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="ipfs-radio"
                    name="ipfs-radio"
                    className="w-4 h-4 "
                    type="radio"
                    onChange={handleRadioClick}
                    checked={isIPFSSelected}
                  />
                  <label className="ms-1 text-xs font-medium text-[#858584]">
                    IPFS
                  </label>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <div className="w-full">
              <input
                className={`border-[0.5px] w-full h-[28px] py-1 ${
                  isIPFSSelected ? 'rounded pl-[44px]' : 'rounded-l-lg pl-2'
                } ${
                  uriChecked && isIPFSSelected
                    ? 'bg-[#03070F] border-[#8B8B8B] mr-0.5'
                    : 'bg-[#010B10] border-secondary '
                }`}
                type="text"
                value={
                  isIPFSSelected
                    ? imageSrc.substring(21) ===
                      'bafkreiac47exop4qnvi47azogyp2xrb45dlyqgsijpnsvkvizkh4rm3uvi'
                      ? ''
                      : imageSrc.substring(21)
                    : fileText
                }
                disabled={!uriChecked || !isIPFSSelected}
                onChange={(event) => {
                  handleFileNameChange;
                  const newUri = event.target.value;
                  setCreateInfo((prevCreateInfo) => ({
                    ...prevCreateInfo,
                    uri: `https://ipfs.io/ipfs/${newUri}`,
                  }));
                  setImageSrc(`https://ipfs.io/ipfs/${event.target.value}`);
                }}
              />
              {isIPFSSelected && <p className="ml-2 mt-[-25px]">IPFS:</p>}
            </div>
            {!isIPFSSelected && (
              <button
                className={`px-[17.5px] flex justify-center items-center !bg-[#4A4A4A]/20 rounded-r-lg border-[0.5px] ${
                  uriChecked && !isIPFSSelected
                    ? 'bg-[#03070F] border-[#8B8B8B] '
                    : 'bg-[#010B10] border-secondary'
                }`}
                onClick={triggerFileInputClick}
                disabled={!uriChecked || isIPFSSelected}
              >
                <Icon icon="icomoon-free:upload" className="text-[#939393]" />
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col w-full gap-y-1">
          <div className="flex justify-start items-center gap-2">
            <CustomCheckbox
              checked={mintPriceChecked}
              onChange={handleMintPriceChecked}
            />
            <p className="text-xs text-[#858584]">Mint Price</p>
          </div>
          <div className="flex justify-center">
            <input
              className={`border-[0.5px] w-full h-[28px] py-1 rounded-l-lg px-2 border-r-0 hide-arrows
                ${
                  mintPriceChecked
                    ? ' bg-[#03070F] border-[#8B8B8B]'
                    : ' bg-[#010B10] border-secondary'
                }`}
              type="number"
              min={0}
              onChange={(event) => {
                const newMintPrice = event.target.value;
                setCreateInfo((prevCreateInfo) => ({
                  ...prevCreateInfo,
                  mintPrice:
                    newMintPrice.trim() === '' ? '' : Number(newMintPrice),
                }));
                setMintPrice(
                  newMintPrice.trim() === '' ? '' : Number(newMintPrice)
                );
              }}
              onKeyDown={handleKeyDownForMintPrice}
              value={mintPrice}
              disabled={!mintPriceChecked}
              required
            />
            <select
              className={`!bg-[#4A4A4A]/20 rounded-r-lg text-center text-[11px] w-[50px] border-[0.5px] border-l-0 ${
                mintPriceChecked
                  ? 'bg-[#03070F] border-[#8B8B8B]'
                  : 'bg-[#010B10] border-secondary'
              }`}
              onChange={(event) => {
                const newMintPriceUnit = Number(event.target.value);
                setCreateInfo((prevCreateInfo) => ({
                  ...prevCreateInfo,
                  mintPriceUnit: newMintPriceUnit,
                }));
              }}
              value={Number(createInfo.mintPriceUnit)}
              disabled={!mintPriceChecked}
            >
              <option value={0} className="!bg-[#4A4A4A]">
                {nativeTokenUnit}
              </option>
              <option value={1} className="!bg-[#4A4A4A]">
                USDT
              </option>
              <option value={2} className="!bg-[#4A4A4A]">
                USDC
              </option>
            </select>
          </div>
        </div>
        <div className="flex flex-col w-full gap-y-1">
          <div className="flex justify-start items-center gap-2">
            <CustomCheckbox
              checked={mintLimitChecked}
              onChange={handleMintLimitChecked}
            />
            <p className="text-xs text-[#858584]">Mint Limit</p>
          </div>
          <input
            className={`border-[0.5px] w-full h-[28px] py-1 px-2 rounded-lg hide-arrows
            ${
              mintLimitChecked
                ? ' bg-[#03070F] border-[#8B8B8B]'
                : ' bg-[#010B10] border-secondary'
            }`}
            type="number"
            min={0}
            onChange={(event) => {
              const newMintPriceLimit = event.target.value;
              if (Number(newMintPriceLimit) < Number(totalSupply)) {
                setCreateInfo((prevCreateInfo) => ({
                  ...prevCreateInfo,
                  mintLimit:
                    newMintPriceLimit.trim() === ''
                      ? ''
                      : Number(newMintPriceLimit),
                }));
                setMintPriceLimit(
                  newMintPriceLimit.trim() === ''
                    ? ''
                    : Number(newMintPriceLimit)
                );
              } else {
                showToast(
                  'warning',
                  'Mint limit must be less than total supply'
                );
              }
            }}
            onKeyDown={handleKeyDownForTotalSupplyAndMintLimit}
            value={mintPriceLimit === '' ? '' : Number(mintPriceLimit)}
            disabled={!mintLimitChecked}
            required
          />
        </div>
        <div className="flex justify-between mt-2 !text-cente w-full gap-4">
          <button
            id="cancelButton"
            className="flex rounded-2xl gap-3 items-center w-full h-8 !text-center !justify-center bg-[#353535] text-white"
            onClick={() => {
              setCreateInfo(initialBlueprint);
              navigate('/blueprint');
            }}
          >
            Cancel
          </button>
          <button
            className="flex rounded-2xl gap-3 items-center w-full h-8 !text-center !justify-center bg-primary text-white"
            onClick={handleSubmit}
          >
            {isRecreate ? 'Recreate' : isUpdate ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlueprintInfoCard;
