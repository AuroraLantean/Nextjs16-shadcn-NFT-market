import Image from "next/image";
import {
  type Config,
  type UseConnectReturnType,
  useConnect,
  useConnectors,
} from "wagmi";
import { metaMask, walletConnect } from "wagmi/connectors";
import {
  coinbaseSrc,
  ll,
  metamaskSrc,
  phantomSrc,
  reownProjId,
  safewalletSrc,
  trustwalletSrc,
  walletconnectSrc,
} from "@/lib/utils";
import { walletConnectConn } from "@/lib/wagmi";
import { Button } from "./ui/button";

const width = 48;
const makeConnectorDiv = (
  connectorName: string,
  connect: UseConnectReturnType<Config, unknown>,
) => {
  switch (connectorName) {
    case "MetaMask": {
      return (
        <div className="flex items-center">
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
            className="ml-2 h-12"
          >
            <span className="font-bold w-60">MetaMask</span>
          </Button>
        </div>
      );
    }
    case "WalletConnect": {
      return (
        <div className="flex items-center mt-1">
          <Image
            src={walletconnectSrc}
            alt="WalletConnect"
            width={width}
            height={width}
            loading="eager"
          />
          <Button
            onClick={() =>
              connect.mutate({
                connector: walletConnectConn,
              })
            }
            type="button"
            size="lg"
            className="ml-2 h-12"
          >
            <span className="font-bold w-60">WalletConnect</span>
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
          <Button
            onClick={() => console.log("to connect to Coinbase wallet")}
            type="button"
            size="lg"
            className="ml-2 h-12"
          >
            <span className="font-bold w-60">Coinbase</span>
          </Button>
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
          <Button
            onClick={() => console.log("to connect to Safe wallet")}
            type="button"
            size="lg"
            className="ml-2 h-12"
          >
            <span className="font-bold w-60">Safe wallet</span>
          </Button>
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
          <Button
            onClick={() => console.log("to connect to Phantom wallet")}
            type="button"
            size="lg"
            className="ml-2 h-12"
          >
            <span className="font-bold w-60">Phantom</span>
          </Button>
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
          <Button
            onClick={() => console.log("to connect to Trust wallet")}
            type="button"
            size="lg"
            className="ml-2 h-12"
          >
            <span className="font-bold w-60">Trust wallet</span>
          </Button>
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
