import { Globe } from "lucide-react";
import Link from "next/link";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

const ChainsDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Globe className="w-4 h-4" />
          <span className="hidden md:inline">Chains</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/evm-sepolia">
              <span>EVM Sepolia</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link href="/solana">
              <span>Solana</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/sui">
              <span>Sui</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem disabled>CosmWasm</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChainsDropdown;
