import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import OwnBlueprintListCard from '../../components/Cards/ListCard';
import { SelectedProduct } from '../../types';

import { selectedProductintAtom } from '../../jotai/atoms';

const DecomposeProductPage = () => {
  const [selectedOwnData] = useAtom<SelectedProduct>(selectedProductintAtom);
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center py-10 text-white sm:py-10 min-w-[360px] ">
      <div className="relative py-4 sm:w-[1000px]  xs:w-[500px] w-[400px] ">
        <div className="relative  border bg-black rounded-[46px] shadow border-[#1f1f1f]">
          <h3 className="sm:text-[32px] text-[22px] py-6 font-semibold text-center text-white border-b border-gray-400">
            Decompose Product
          </h3>
          <div className="flex flex-col gap-6 p-6 sm:bg-[#040404] ">
            <OwnBlueprintListCard
              isDecompose={true}
              type={4}
              uri={selectedOwnData.uri}
              name={selectedOwnData.name}
              address={selectedOwnData.blueprintAddress}
              id={selectedOwnData.id}
              amount={selectedOwnData.balance}
            />
            <div className=" flex justify-between items-center">
              <p className="xs:text-[22px] text-[18px] text-[#BABABA]">
                Product Decompose Fee
              </p>
              <p className="xs:text-[24px] text-[18px] font-semibold">
                0.1 ETH
              </p>
            </div>
            <div className=" flex justify-between gap-6 items-center">
              <input
                type="number"
                className="md:w-[70%] w-1/2 h-[40px] rounded-xl bg-black border border-white px-2 hide-arrows"
              ></input>
              <Button
                className="flex justify-center w-[160px] h-9 rounded-xl"
                text="Approve"
                variant="primary"
              />
            </div>
          </div>
          <div className="flex flex-col px-6 pt-2 pb-8 rounded-b dark:border-gray-600">
            <p className="xs:text-[24px] text-[18px] text-left mb-4 text-[#BABABA]">
              Preview
            </p>
            {selectedOwnData.data.erc20Data.map((dataItem, index) => (
              <OwnBlueprintListCard
                key={index}
                isDecompose={true}
                {...dataItem}
                type={0}
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
                onClick={() => navigate('/decompose')}
              />
              <Button
                className="flex justify-center w-[160px] h-9 rounded-xl"
                text="Decompose"
                variant="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecomposeProductPage;
