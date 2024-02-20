import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Logo } from '../Logo';
import { Button } from '../Button';
import { Icon } from '@iconify/react/dist/iconify.js';

function Header() {
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
  return (
    <div className="px-5 py-3 bg-black h-20 object-contain">
      <div className="flex justify-between items-center">
        <Logo
          url="/src/assets/images/blueprint-logo.png"
          className="w-48 h-14"
        />
        <div className="flex justify-between items-center gap-24">
          <div className="flex gap-8">
            <Link to={'#'} className="text-white text-lg">
              Blueprint
            </Link>
            <Link to={'#'} className="text-white text-lg">
              Product
            </Link>
            <Link to={'#'} className="text-white text-lg">
              Decompose
            </Link>
            <Link to={'#'} className="text-white text-lg">
              Whitepaper
            </Link>
          </div>
          <div className="flex items-center">
            {isWalletConnected ? (
              <div className="flex gap-5">
                <div className="flex gap-0 items-center">
                  <img
                    className="h-9"
                    src="/src/assets/images/Ethereum.png"
                    alt="avatar"
                  />
                  <Icon
                    icon="solar:alt-arrow-down-outline"
                    width="24px"
                    height="24px"
                    className="text-light-gray cursor-pointer"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <img
                    className="h-9"
                    src="/src/assets/images/avatar.png"
                    alt="avatar"
                  />
                  <p className="text-white">0x456c...8ca9</p>
                </div>
              </div>
            ) : (
              <Button
                variant="outline"
                text="Connect Wallet"
                onClick={() => setIsWalletConnected(true)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
