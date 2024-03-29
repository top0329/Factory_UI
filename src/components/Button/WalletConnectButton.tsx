import { ConnectButton } from '@rainbow-me/rainbowkit';

export const WalletConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="text-base text-light-gray sm:text-white justify-center truncate lg:text-lg sm:text-sm sm:block sm:border-2 border-white bg-opacity-100 py-2 sm:px-5 rounded-2xl flex gap-3 items-center"
                  >
                    Connect Wallet
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button
                    className="text-base text-red-600 justify-center items-center truncate py-2 lg:text-lg sm:text-sm sm:block sm:text-red-600"
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong network
                  </button>
                );
              }
              return (
                <div style={{ display: 'flex', gap: 6, paddingTop: 4 }}>
                  <button
                    onClick={openChainModal}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      color: 'white',
                    }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        className="text-white text-lg"
                        style={{
                          background: chain.iconBackground,
                          width: 24,
                          height: 24,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 24, height: 24 }}
                          />
                        )}
                      </div>
                    )}
                  </button>
                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="text-white text-base xl:text-2xl lg:text-xl"
                  >
                    {account.address.substring(0, 6)}...
                    {account.address.substring(account.address.length - 4)}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
