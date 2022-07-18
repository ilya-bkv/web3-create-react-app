import React from 'react'
import {ethers} from 'ethers'
import Web3 from 'web3';

const changeNetwork = async (chainId:number) => {
  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
        chainId: Web3.utils.toHex(chainId),
        chainName: 'Polygon Mainnet',
        nativeCurrency: {
          name: 'MATIC',
          symbol: 'MATIC',
          decimals: 18
        },
        rpcUrls: ['https://polygon-rpc.com/'],
        blockExplorerUrls: ['https://polygonscan.com/']
      }]
    });
  } catch (error) {
    console.log('!!! err:', error);
  }
};

type Props = {
  chainId: number,
  name: string
}

const ChangeNetwork: React.FC<Props> = (props) => {
  const [requiredNetwork, setRequiredNetwork] = React.useState<boolean>(false)
  const handleNetworkSwitch = async () => await changeNetwork(props.chainId)
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  React.useMemo(() => {
    provider.on("network", (newNetwork) => {
      setRequiredNetwork(newNetwork.chainId !== props.chainId)
    });
  }, [provider])

  return (
    <>
      {requiredNetwork && (
        <div className="ChangeNetwork">
          It looks like you are using the wrong network.
          <button
            color="primary"
            onClick={() => handleNetworkSwitch()}
          >Switch to {props.name}</button>
        </div>
      )}
    </>
  )
}

export default React.memo(ChangeNetwork)
