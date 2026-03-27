import {
  useDisconnect as useDisconnectPhantom,
  usePhantom,
  useModal as usePhantomModal,
} from "@phantom/react-sdk";
import { useAtom } from "jotai";
import { useConnect, useConnection, useConnectors, useDisconnect } from "wagmi";
import { walletMenuOpenAtom } from "@/lib/jotaiStates";
import { metamaskConn } from "@/lib/wagmi";
import { Button } from "@/ui/button";
//import { ConnectButton } from "@rainbow-me/rainbowkit";

export const WagmiButton = () => {
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
      {connection.status === "disconnected" && (
        <div className="flex items-center">
          {connectors.map((connector) => {
            if (connector.name === "Phantom") {
              return (
                <div key={connector.id}>
                  <PhantomButton isFat={false} />
                </div>
              );
            } else {
              return (
                <div key={connector.id}>
                  <Button
                    key={connector.uid}
                    onClick={() => connect.mutate({ connector: metamaskConn })}
                    type="button"
                  >
                    {connector.name}
                  </Button>
                </div>
              );
            }
          })}
        </div>
      )}
      <div>connect status: {connect.status}</div>
      <div>error message: {connect.error?.message}</div>
    </div>
  );
};

type PhantomButtonProps = {
  isFat?: boolean;
};
export function PhantomButton({ isFat = true }: PhantomButtonProps) {
  //setPrevOpen: (open: boolean) => void
  const { open, close, isOpened } = usePhantomModal();
  const { isConnected, user } = usePhantom();
  const { disconnect, isDisconnecting } = useDisconnectPhantom();
  const [_walletMenuOpen, setWalletMenuOpen] = useAtom(walletMenuOpenAtom);
  //          <p>Connected</p>
  //          {JSON.stringify(user?.addresses)}
  let buttonClassname = "ml-2 h-12";
  let spanClassname = "font-bold w-60";
  if (!isFat) {
    buttonClassname = "";
    spanClassname = "";
  }
  return (
    <div>
      {isConnected ? (
        <Button
          type="button"
          size="lg"
          className={buttonClassname}
          onClick={() => {
            setWalletMenuOpen(false);
            disconnect();
          }}
          disabled={isDisconnecting}
        >
          <span className={spanClassname}>Disconnect Phantom</span>
        </Button>
      ) : (
        <Button
          type="button"
          size="lg"
          className={buttonClassname}
          onClick={() => {
            setWalletMenuOpen(false);
            open();
          }}
        >
          <span className={spanClassname}>Phantom</span>
        </Button>
      )}
    </div>
  );
}
