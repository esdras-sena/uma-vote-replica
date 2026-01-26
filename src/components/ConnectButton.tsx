import { X, ChevronDown } from "lucide-react";
import { createPortal } from "react-dom";
import { useAccount, useConnect, useDisconnect, useStarkProfile, useNetwork } from "@starknet-react/core";
import AddressBar from "./lib/AddressIcon";
import GenericModal from "./lib/GenericModal";
import CopyButton from "./lib/CopyButton";
import AccountBalance from "./lib/AccountBalance";
import { useEffect, useMemo, useState, useCallback } from "react";
import { blo } from "blo";
import { Button } from "./ui/button";

const UserModal = () => {
  const { address } = useAccount();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();
  const [imageError, setImageError] = useState(false);
  const { data: starkProfile } = useStarkProfile({ address });

  return (
    <GenericModal popoverId="user-popover">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60"
        onClick={() => {
          const popover = document.getElementById("user-popover");
          // @ts-ignore
          popover?.hidePopover?.();
        }}
      />
      {/* Card */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="pointer-events-auto mx-auto mt-12 md:mt-16 w-[92vw] max-w-[32rem] rounded-[16px] border border-border bg-card p-5 text-card-foreground shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold">Connected</h3>
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" aria-label="Wallet connected" />
              <span className="ml-2 inline-flex items-center rounded-full border border-border bg-muted/40 px-2 py-0.5 text-xs text-muted-foreground">
                {mounted ? ((() => {
                  let hint = '';
                  try { hint = (localStorage.getItem('preferredChain') || '').toLowerCase(); } catch { }
                  if (hint.includes('main')) return 'Starknet';
                  if (hint.includes('sepolia')) return 'Starknet Sepolia';
                  return chain?.name || 'Network';
                })()) : 'Network'}
              </span>
            </div>
            <button
              className="grid h-8 w-8 place-content-center rounded-full hover:bg-muted"
              onClick={() => {
                const pop = document.getElementById("user-popover");
                // @ts-ignore
                pop?.hidePopover?.();
              }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <div className="h-9 w-9 overflow-clip rounded-full md:h-10 md:w-10">
              {!imageError && starkProfile?.profilePicture ? (
                <img
                  src={starkProfile?.profilePicture}
                  className="w-full rounded-full"
                  alt="starknet profile"
                  onError={() => setImageError(true)}
                />
              ) : (
                <img 
                  src={blo(address as `0x${string}` || "0x0")} 
                  className="mx-auto h-full w-full rounded-full" 
                  alt="address avatar"
                />
              )}
            </div>
            <CopyButton
              copyText={starkProfile?.name || address || ""}
              buttonText={
                starkProfile?.name || address?.slice(0, 10).concat("...").concat(address?.slice(-5))
              }
              className="flex items-center gap-2 text-sm text-card-foreground/90 hover:text-card-foreground"
              iconClassName="text-amber"
            />
          </div>

          <div className="mt-4">
            <AccountBalance address={address || ""} />
          </div>

          <div className="mt-4">
            <button
              onClick={() => {
                const popover = document.getElementById("user-popover");
                // @ts-ignore
                popover?.hidePopover?.();
                disconnect();
              }}
              className="w-full rounded-[10px] border border-border bg-muted p-2.5 text-red-400 hover:bg-muted/70"
            >
              Disconnect
            </button>
          </div>
        </div>
      </div>
    </GenericModal>
  );
};

// Wallet selection modal component
const WalletSelectModal = ({
  isOpen,
  onClose,
  connectors,
  onConnect,
  isConnecting,
  errorText,
}: {
  isOpen: boolean;
  onClose: () => void;
  connectors: any[];
  onConnect: (connector: any) => void;
  isConnecting: boolean;
  errorText?: string | null;
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const sortedConnectors = useMemo(() => {
    const list = Array.isArray(connectors) ? [...connectors] : [];
    return list.sort((a, b) => {
      const aIsEmail = a?.id === "argentWebWallet";
      const bIsEmail = b?.id === "argentWebWallet";
      if (aIsEmail && !bIsEmail) return 1;
      if (!aIsEmail && bIsEmail) return -1;
      return String(a?.name || a?.id || "").localeCompare(String(b?.name || b?.id || ""));
    });
  }, [connectors]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 2147483647 }}
      role="dialog"
      aria-modal="true"
      aria-label="Connect Wallet"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative w-[92vw] max-w-[24rem] rounded-[16px] border border-border bg-card p-5 text-card-foreground shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Connect Wallet</h3>
          <button
            className="grid h-8 w-8 place-content-center rounded-full hover:bg-muted"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {sortedConnectors.map((connector) => {
            const displayName = connector?.name || connector?.id;
            const iconSrc = connector?.icon
              ? (typeof connector.icon === "string" ? connector.icon : (connector.icon?.dark || connector.icon?.light))
              : null;

            return (
              <button
                key={connector.id}
                onClick={() => onConnect(connector)}
                disabled={isConnecting}
                className="flex items-center gap-3 w-full p-3 rounded-lg border border-border bg-muted/30 hover:bg-muted/60 transition-colors text-left disabled:opacity-50"
              >
                {iconSrc ? (
                  <img
                    src={iconSrc}
                    alt={displayName}
                    className="w-8 h-8 rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : null}
                <span className="font-medium text-foreground">{displayName}</span>
              </button>
            );
          })}
        </div>

        {errorText ? (
          <p className="mt-3 text-sm text-destructive">{errorText}</p>
        ) : null}
      </div>
    </div>,
    document.body
  );
};

export function ConnectButton() {
  const { isConnected } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectErrorText, setConnectErrorText] = useState<string | null>(null);

  const handleConnect = useCallback(async (connector: any) => {
    setIsConnecting(true);
    setConnectErrorText(null);
    try {
      await connectAsync({ connector });
      setWalletModalOpen(false);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.error("Wallet connection error:", error);

      if (msg.includes("wallet_switchStarknetChain")) {
        setConnectErrorText(
          "Your wallet doesn't support network switching from dApps. Open the wallet and switch to the correct network, then try again.",
        );
        return;
      }

      setConnectErrorText(msg || "Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  }, [connectAsync]);

  const togglePopover = ({ targetId }: { targetId: string }) => {
    const popover = document.getElementById(targetId);
    // @ts-ignore
    popover?.togglePopover();
    if (popover) {
      popover.addEventListener("toggle", () => {
        if (popover.matches(":popover-open")) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
      });
    }
  };

  if (!isConnected) {
    return (
      <>
        <Button
          className="bg-amber hover:bg-amber/90 text-primary-foreground font-medium px-6 rounded-full"
          onClick={() => setWalletModalOpen(true)}
          disabled={isConnecting}
        >
          {isConnecting ? 'Connecting...' : 'Connect wallet'}
        </Button>
        <WalletSelectModal
          isOpen={walletModalOpen}
          onClose={() => setWalletModalOpen(false)}
          connectors={connectors}
          onConnect={handleConnect}
          isConnecting={isConnecting}
          errorText={connectErrorText}
        />
      </>
    );
  }

  return (
    <>
      <Button
        onClick={() => togglePopover({ targetId: "user-popover" })}
        variant="outline"
        className="flex items-center gap-2 rounded-full px-4"
      >
        <AddressBar />
        <ChevronDown className="w-4 h-4" />
      </Button>
      <UserModal />
    </>
  );
}
