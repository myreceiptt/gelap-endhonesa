// /src/components/TokenClaim.tsx

"use client";

// External libraries
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  balanceOf,
  canClaim,
  decimals,
  getActiveClaimCondition,
  totalSupply,
} from "thirdweb/extensions/erc20";
import { ClaimButton, useActiveAccount, useReadContract } from "thirdweb/react";

// Blockchain configurations
import { client } from "@/config/client";
import { oioiT0kenMonadTestnet } from "@/config/contracts";

// Components libraries
import Loader from "@/components/ReusableLoader";

const TokenClaim: React.FC = () => {
  // All useState condition
  const [isActive, setIsActive] = useState(false);
  const [erc20ClaimedOverride, setErc20ClaimedOverride] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pesanAwal, setPesanAwal] = useState<string | null>("Ceki... Ceki...");
  const [pesanTunggu, setPesanTunggu] = useState<string | null>(null);
  const [pesanKirim, setPesanKirim] = useState<string | null>(null);
  const [pesanSukses, setPesanSukses] = useState<string | null>(null);
  const [pesanGagal, setPesanGagal] = useState<string | null>(null);

  // Use active account wallet
  const activeAccount = useActiveAccount();

  // Untuk handle double tap di mobile
  const lastTapRef = useRef(0);
  const handleTap = useCallback(() => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      // double tap
      setIsActive(true);
    } else {
      // single tap (reset if already active)
      if (isActive) setIsActive(false);
    }
    lastTapRef.current = now;
  }, [isActive]);

  useEffect(() => {
    const handleTouch = () => handleTap();
    window.addEventListener("touchend", handleTouch);
    return () => {
      window.removeEventListener("touchend", handleTouch);
    };
  }, [handleTap]);

  // Retrieves the token decimals
  const { data: tokenDecimals } = useReadContract(decimals, {
    contract: oioiT0kenMonadTestnet,
  });

  // Fetch coin total supply
  const { data: coinSupply } = useReadContract(totalSupply, {
    contract: oioiT0kenMonadTestnet,
  });

  // Fetch active claim condition
  const { data: activeClaimCondition } = useReadContract(
    getActiveClaimCondition,
    {
      contract: oioiT0kenMonadTestnet,
    }
  );

  // Log the result on console
  console.log("Active Claim:", activeClaimCondition);

  // Set claim amount
  const amount = useMemo(() => {
    if (
      activeClaimCondition?.quantityLimitPerWallet &&
      tokenDecimals !== undefined
    ) {
      return (
        activeClaimCondition.quantityLimitPerWallet /
        BigInt(10) ** BigInt(tokenDecimals)
      ).toString();
    }

    return "0";
  }, [activeClaimCondition?.quantityLimitPerWallet, tokenDecimals]);

  // Fetch can claim "result"
  const { data: canClaimErc20 } = useReadContract(canClaim, {
    contract: oioiT0kenMonadTestnet,
    claimer: activeAccount?.address ?? "",
    quantity: amount,
  });

  // Set ERC20 claimed
  const erc20Claimed =
    canClaimErc20 !== undefined ? !canClaimErc20.result : erc20ClaimedOverride;

  // Calculate current supply
  const currentSupply =
    coinSupply && tokenDecimals !== undefined ? (
      `${(coinSupply / BigInt(10) ** BigInt(tokenDecimals)).toString()}`
    ) : (
      <Loader message="Ceki... Ceki..." />
    );

  // Fetch user's owned Coins
  const { data: ownedCoins } = useReadContract(balanceOf, {
    contract: oioiT0kenMonadTestnet,
    address: activeAccount?.address ?? "",
  });

  return (
    <div className="w-full grid grid-cols-1 gap-4">
      {/* Column: Image */}
      <div className="flex justify-center cursor-pointer">
        <Image
          src="/tokens/oioi.png"
          alt="OiOi Token"
          width={74}
          height={74}
          className={`transition-all duration-700
          ${
            isActive
              ? "opacity-100 animate-pulse"
              : "opacity-0 hover:opacity-100 hover:animate-pulse"
          }`}
          onClick={handleTap}
        />
      </div>

      {/* Column: Form */}
      <div className="flex flex-col gap-2 items-center justify-center">
        <h2
          className={`text-center text-sm font-medium font-[family-name:var(--font-geist-mono)] transition-all duration-700
          ${
            isActive
              ? "text-foreground animate-pulse"
              : "text-background hover:text-foreground hover:animate-pulse"
          }`}
          onClick={handleTap}>
          OiOi Token bukan uang, bukan jimat, bukan sekadar token. OiOi Token
          itu pengingat: bahwa kita masih waras, masih bisa mencatat kenyataan —
          walau dunia diatur supaya lupa.
        </h2>
        <h2
          className={`text-center text-sm font-medium font-[family-name:var(--font-geist-mono)] transition-all duration-700
          ${
            isActive
              ? "text-foreground animate-pulse"
              : "text-background hover:text-foreground hover:animate-pulse"
          }`}
          onClick={handleTap}>
          Klaim OiOi Token ini, biar lengkap kewarganegaraanmu, bukti kamu sudah
          resmi jadi penduduk dan tinggal di negeri paling GELAP: ENDHONESA.
        </h2>
        <h2
          className={`text-center text-sm font-medium font-[family-name:var(--font-geist-mono)] transition-all duration-700
          ${
            isActive
              ? "text-foreground animate-pulse"
              : "text-background hover:text-foreground hover:animate-pulse"
          }`}
          onClick={handleTap}>
          OiOi Token dicetak di blockchain Monad Testnet, bukan di lembar kertas
          negara. Semuanya bisa dicek — no tipu-tipu, no sensor-sensoran. Sebab
          kita tak lagi butuh stempel birokrasi, cukup jejak digital sebagai
          saksi: kamu hidup di ENDHONESA yang GELAP, tapi kamu tak bungkam.
        </h2>
        <h1
          className={`text-center text-sm font-medium font-[family-name:var(--font-geist-mono)] transition-all duration-700
          ${
            isActive
              ? "text-foreground animate-pulse"
              : "text-background hover:text-foreground hover:animate-pulse"
          }`}
          onClick={handleTap}>
          oleh{" "}
          <Link href="https://www.endhonesa.com/" target="_blank">
            ENDHONESA GELAP ;p
          </Link>
        </h1>

        <div className="flex flex-col gap-2 items-center justify-center">
          <h4 className="text-center text-xs font-medium"></h4>
          <h4 className="text-center text-xs font-medium"></h4>
          <h4 className="text-center text-xs font-medium"></h4>
          <h4 className="text-center text-xs font-medium"></h4>
        </div>

        {/* Success or Error Messages */}
        {pesanAwal && <Loader message={pesanAwal} />}
        {pesanTunggu && <Loader message={pesanTunggu} />}
        {pesanKirim && <Loader message={pesanKirim} />}
        {pesanSukses && <Loader message={pesanSukses} />}
        {pesanGagal && <Loader message={pesanGagal} />}

        {/* Claim Button */}
        <ClaimButton
          unstyled
          className={`w-full rounded-lg p-2 border-2 text-base font-semibold font-[family-name:var(--font-geist-mono)] transition-colors duration-700 ease-in-out
            ${
              isProcessing || erc20Claimed
                ? "border-foreground hover:border-foreground text-foreground hover:text-foreground hover:animate-pulse"
                : "border-foreground hover:border-foreground text-foreground hover:text-foreground hover:animate-pulse cursor-pointer"
            }
          `}
          contractAddress={oioiT0kenMonadTestnet.address}
          chain={oioiT0kenMonadTestnet.chain}
          client={client}
          claimParams={{
            type: "ERC20",
            quantity: amount,
          }}
          disabled={Boolean(isProcessing || !amount || erc20Claimed)}
          onClick={() => {
            setIsProcessing(true);
            setPesanAwal(null);
            setPesanTunggu("Sabar dan tunggu, yaa!");
            setPesanSukses(null);
            setPesanGagal(null);
          }}
          onTransactionSent={() => {
            setPesanTunggu(null);
            setPesanKirim("OiOi Token sedang diklaim.");
          }}
          onError={(error) => {
            setIsProcessing(false);
            setPesanTunggu(null);
            setPesanKirim(null);
            setPesanGagal(`${error.message}`);
          }}
          onTransactionConfirmed={async () => {
            setIsProcessing(false);
            setPesanKirim(null);
            setPesanSukses("OiOi Token berhasil diklaim.");
            try {
              // Refetch claim condition
              const activeCondition20 = await canClaim({
                contract: oioiT0kenMonadTestnet,
                claimer: activeAccount?.address ?? "",
                quantity: "1",
              });

              if (!activeCondition20.result) {
                setErc20ClaimedOverride(true);
              } else {
                setErc20ClaimedOverride(false);
              }
            } catch (error) {
              console.error("Error refetching claim condition:", error);
            }
          }}>
          {erc20Claimed ? "Sudah Diklaim" : "Klaim Sekarang"}
        </ClaimButton>
        <h4
          className={`text-center text-xs font-medium font-[family-name:var(--font-geist-mono)] transition-all duration-700
          ${
            isActive
              ? "text-foreground animate-pulse"
              : "text-background hover:text-foreground hover:animate-pulse"
          }`}
          onClick={handleTap}>
          &#42;Kamu punya{" "}
          {ownedCoins !== undefined && tokenDecimals !== undefined ? (
            (ownedCoins / BigInt(10) ** BigInt(tokenDecimals)).toString()
          ) : (
            <Loader message="Ceki... Ceki..." />
          )}{" "}
          OiOi. Total ada {currentSupply} OiOi yang sudah diklaim. Sekali klaim
          maksimal {amount} OiOi. Kamu hanya bisa klaim sekali saja. Batas klaim
          sampai 17 Agustus 2025.
        </h4>
      </div>
    </div>
  );
};

export default TokenClaim;
