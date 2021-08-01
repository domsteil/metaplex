import { PublicKey, TransactionInstruction } from '@solana/web3.js';
import BN from 'bn.js';
export declare function redeemPrintingV2Bid(vault: PublicKey, safetyDepositTokenStore: PublicKey, tokenAccount: PublicKey, safetyDeposit: PublicKey, fractionMint: PublicKey, bidder: PublicKey, payer: PublicKey, metadata: PublicKey, masterEdition: PublicKey, originalMint: PublicKey, newMint: PublicKey, edition: BN, editionOffset: BN, winIndex: BN, instructions: TransactionInstruction[]): Promise<void>;
//# sourceMappingURL=redeemPrintingV2Bid.d.ts.map