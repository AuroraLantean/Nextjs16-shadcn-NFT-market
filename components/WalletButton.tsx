import { useConnect, useConnection, useConnectors, useDisconnect } from "wagmi";
import { metaMask } from "wagmi/connectors";
import { ll } from "@/lib/utils";
import { Button } from "@/ui/button";

//import { ConnectButton } from "@rainbow-me/rainbowkit";

const WalletButton = () => {
  const connect = useConnect();
  const connectors = useConnectors();
  const disconnect = useDisconnect();
  const connection = useConnection();
  return (
    <div>
      {connection.status === "connected" && (
        <div>
          addresses: {JSON.stringify(connection.addresses)}
          <br />
          chainId: {connection.chainId}
          <Button type="button" onClick={() => disconnect.mutate()}>
            Disconnect
          </Button>
        </div>
      )}
      {connection.status === "disconnected" &&
        connectors.map((connector) => (
          <Button
            key={connector.uid}
            onClick={() => connect.mutate({ connector: metaMask() })}
            type="button"
            //variant="secondary"
          >
            {connector.name}
          </Button>
        ))}
      <div>connect status: {connect.status}</div>
      <div>error message: {connect.error?.message}</div>
    </div>
  );
};

export default WalletButton;
