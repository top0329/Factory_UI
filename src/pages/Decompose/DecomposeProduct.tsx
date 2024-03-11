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
    <div className="flex justify-center items-center py-10 text-white sm:py-10 min-w-[360px]">
      <div className="relative p-4 sm:w-[1000px] xs:w-[500px] w-[400px]">
        <div className="relative bg-[#040404] border border-none rounded-[46px] shadow dark:bg-gray-700">
          <h3 className="text-[32px] py-6 font-semibold text-center text-white">
            Decompose Product
          </h3>
          <div className="flex flex-col items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-600">
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
                text="Mint Product"
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
