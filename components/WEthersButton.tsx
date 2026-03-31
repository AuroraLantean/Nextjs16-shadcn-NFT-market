import { useEffect, useState } from "react";
import { evmGetSignerViaEthersjs } from "@/lib/wallet";
import { Button } from "@/ui/button";

export const EthersButton = () => {
  const [status, _setStatus] = useState("disconnected");
  const addresses = [""];
  const chainId = "id xyz";

  useEffect(() => {}, []);

  return (
    <div>
      {status === "disconnected" && (
        <div>
          <Button onClick={evmGetSignerViaEthersjs} type="button">
            Connect
          </Button>
        </div>
      )}
      {status === "connected" && (
        <div>
          Wagmi addresses: {JSON.stringify(addresses)}
          <br />
          <div className="flex items-center">
            <span className="mr-3">chainId: {chainId}</span>
            <Button type="button" onClick={() => {}}>
              Disconnect
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
