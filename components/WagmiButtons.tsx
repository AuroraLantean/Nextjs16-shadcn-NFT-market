import {
  useIsExtensionInstalled,
  usePhantom,
  useAccounts as usePhantomAccounts,
  useConnect as usePhantomConnect,
  useDisconnect as usePhantomDisconnect,
  useModal as usePhantomModal,
} from "@phantom/react-sdk";
import { useAtom } from "jotai";
import Link from "next/link";
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
  const phantomAddresses = usePhantomAccounts();
  return (
    <div>
      {connection.status === "connected" && (
        <div>
          Wagmi addresses: {JSON.stringify(connection.addresses)}
          <br />
          <div className="flex items-center">
            <span className="mr-3">chainId: {connection.chainId}</span>
            <Button type="button" onClick={() => disconnect.mutate()}>
              Disconnect
            </Button>
          </div>
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
      <div>
        error message: {connect.error?.message}{" "}
        <div>PhantomAccounts: {JSON.stringify(phantomAddresses)}</div>
      </div>
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
  const { disconnect, isDisconnecting } = usePhantomDisconnect();
  const [_walletMenuOpen, setWalletMenuOpen] = useAtom(walletMenuOpenAtom);
  const { connect, isConnecting, error } = usePhantomConnect();
  const { isInstalled, isLoading } = useIsExtensionInstalled();
  // {JSON.stringify(user?.addresses)}
  let buttonClassname = "ml-2 h-12";
  let spanClassname = "font-bold w-60";
  if (!isFat) {
    buttonClassname = "";
    spanClassname = "";
  }

  if (!isInstalled) {
    return (
      <Button
        type="button"
        size="lg"
        className={buttonClassname}
        //onClick={handleConnect}
        //disabled={isConnecting}
      >
        <Link href="https://phantom.app/download">
          <span className={spanClassname}>Install Phantom Wallet</span>
        </Link>
      </Button>
    );
  }
  const handleConnect = async () => {
    setWalletMenuOpen(false);
    //open();//to open Phantom Authentication menu
    try {
      const { walletId, addresses } = await connect({ provider: "injected" });
      // Connection successful
      console.log("Connected addresses:", addresses);
    } catch (err) {
      // Connection failed (user cancelled, network error, etc)
      console.error("Failed to connect:", err);
    }
  };
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
          onClick={handleConnect}
          disabled={isConnecting}
        >
          <span className={spanClassname}>Phantom</span>
        </Button>
      )}
    </div>
  );
}
