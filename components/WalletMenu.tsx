import Image from "next/image";
import {
  type Config,
  Connector,
  CreateConnectorFn,
  type UseConnectReturnType,
  useConnect,
  useConnectors,
} from "wagmi";
import { metaMask } from "wagmi/connectors";
import {
  coinbaseSrc,
  ll,
  metamaskSrc,
  phantomSrc,
  safewalletSrc,
  trustwalletSrc,
  walletconnectSrc,
} from "@/lib/utils";
import { Button } from "./ui/button";

const width = 48;
const makeConnectorDiv = (
  connectorName: string,
  connect: UseConnectReturnType<Config, unknown>,
) => {
  switch (connectorName) {
    case "WalletConnect": {
      return (
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
      );
    }
    case "MetaMask": {
      return (
        <div className="flex items-center mt-1">
          <Image
            src={metamaskSrc}
            alt="metamask"
            width={width}
            height={width}
            loading="eager"
          />
          <Button
            onClick={() => connect.mutate({ connector: metaMask() })}
            type="button"
            size="lg"
            className="ml-2"
          >
            <span className="font-bold w-60">MetaMask</span>
          </Button>
        </div>
      );
    }
    case "Coinbase Wallet": {
      return (
        <div className="flex items-center mt-1">
          <Image
            src={coinbaseSrc}
            alt="Coinbase"
            width={width}
            height={width}
            loading="eager"
          />
          <span className="font-bold ml-2">Coinbase</span>
        </div>
      );
    }
    case "Safe": {
      return (
        <div className="flex items-center mt-1">
          <Image
            src={safewalletSrc}
            alt="safe wallet"
            width={width}
            height={width}
            loading="eager"
          />
          <span className="font-bold ml-2">Safe wallet</span>
        </div>
      );
    }
    case "Phantom": {
      return (
        <div className="flex items-center mt-1">
          <Image
            src={phantomSrc}
            alt="Phantom"
            width={width}
            height={width}
            loading="eager"
          />
          <span className="font-bold ml-2">Phantom</span>
        </div>
      );
    }
    case "Trust": {
      return (
        <div className="flex items-center mt-1">
          <Image
            src={trustwalletSrc}
            alt="trust wallet"
            width={width}
            height={width}
            loading="eager"
          />
          <span className="font-bold ml-2">Trust wallet</span>
        </div>
      );
    }
    default:
      return <div>Not found</div>;
    //ALWAYS make such default entry in every switch blocks!
  }
};
const WalletMenu = () => {
  //connection.status === "disconnected"
  const connectors = useConnectors();
  ll("connectors:", connectors);
  const connect = useConnect();
  return (
    <div className="flex flex-col">
      {connectors.map((connector) => (
        <div key={connector.id}>
          {makeConnectorDiv(connector.name, connect)}
        </div>
      ))}
    </div>
  );
};

export default WalletMenu;
