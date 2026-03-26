import Image from "next/image";
import {
  coinbaseSrc,
  metamaskSrc,
  phantomSrc,
  trustwalletSrc,
  walletconnectSrc,
} from "@/lib/utils";

const WalletMenu = () => {
  const width = 48;
  return (
    <div>
      <h1 className="font-extrabold">Connect a Wallet</h1>
      <div className="flex items-center">
        <Image
          src={metamaskSrc}
          alt="metamask"
          width={width}
          height={width}
          loading="eager"
        />
        <span className="font-bold ml-2">MetaMask</span>
      </div>
      <div className="flex items-center">
        <Image
          src={phantomSrc}
          alt="Phantom"
          width={width}
          height={width}
          loading="eager"
        />
        <span className="font-bold ml-2">Phantom</span>
      </div>
      <div className="flex items-center">
        <Image
          src={walletconnectSrc}
          alt="WalletConnect"
          width={width}
          height={width}
          loading="eager"
        />
        <span className="font-bold ml-2">WalletConnect</span>
      </div>
      <div className="flex items-center">
        <Image
          src={coinbaseSrc}
          alt="Coinbase"
          width={width}
          height={width}
          loading="eager"
        />
        <span className="font-bold ml-2">Coinbase</span>
      </div>

      <div className="flex items-center">
        <Image
          src={trustwalletSrc}
          alt="trust wallet"
          width={width}
          height={width}
          loading="eager"
        />
        <span className="font-bold ml-2">Trust wallet</span>
      </div>
    </div>
  );
};

export default WalletMenu;
