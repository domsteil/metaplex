import { PublicKey, TransactionInstruction } from '@solana/web3.js';
import { AuctionManagerSettings } from '.';
export declare function initAuctionManager(vault: PublicKey, auctionManagerAuthority: PublicKey, payer: PublicKey, acceptPaymentAccount: PublicKey, store: PublicKey, settings: AuctionManagerSettings, instructions: TransactionInstruction[]): Promise<void>;
//# sourceMappingURL=initAuctionManager.d.ts.map