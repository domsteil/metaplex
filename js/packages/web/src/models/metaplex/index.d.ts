/// <reference types="node" />
import { AccountParser } from '@oyster/common';
import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
export * from './initAuctionManager';
export * from './redeemBid';
export * from './redeemFullRightsTransferBid';
export * from './deprecatedRedeemParticipationBid';
export * from './startAuction';
export * from './validateSafetyDepositBox';
export * from './redeemParticipationBidV2';
export * from './redeemPrintingV2Bid';
export * from './withdrawMasterEdition';
export declare const METAPLEX_PREFIX = "metaplex";
export declare const ORIGINAL_AUTHORITY_LOOKUP_SIZE = 33;
export declare const MAX_BID_REDEMPTION_TICKET_SIZE = 3;
export declare const MAX_PRIZE_TRACKING_TICKET_SIZE: number;
export declare enum MetaplexKey {
    Uninitialized = 0,
    OriginalAuthorityLookupV1 = 1,
    BidRedemptionTicketV1 = 2,
    StoreV1 = 3,
    WhitelistedCreatorV1 = 4,
    PayoutTicketV1 = 5,
    SafetyDepositValidationTicketV1 = 6,
    AuctionManagerV1 = 7,
    PrizeTrackingTicketV1 = 8
}
export declare class PrizeTrackingTicket {
    key: MetaplexKey;
    metadata: PublicKey;
    supplySnapshot: BN;
    expectedRedemptions: BN;
    redemptions: BN;
    constructor(args: {
        metadata: PublicKey;
        supplySnapshot: BN;
        expectedRedemptions: BN;
        redemptions: BN;
    });
}
export declare class PayoutTicket {
    key: MetaplexKey;
    recipient: PublicKey;
    amountPaid: BN;
    constructor(args: {
        recipient: PublicKey;
        amountPaid: BN;
    });
}
export declare class AuctionManager {
    key: MetaplexKey;
    store: PublicKey;
    authority: PublicKey;
    auction: PublicKey;
    vault: PublicKey;
    acceptPayment: PublicKey;
    state: AuctionManagerState;
    settings: AuctionManagerSettings;
    constructor(args: {
        store: PublicKey;
        authority: PublicKey;
        auction: PublicKey;
        vault: PublicKey;
        acceptPayment: PublicKey;
        state: AuctionManagerState;
        settings: AuctionManagerSettings;
    });
}
export declare class InitAuctionManagerArgs {
    instruction: number;
    settings: AuctionManagerSettings;
    constructor(args: {
        settings: AuctionManagerSettings;
    });
}
export declare class ValidateSafetyDepositBoxArgs {
    instruction: number;
}
export declare class RedeemBidArgs {
    instruction: number;
}
export declare class RedeemFullRightsTransferBidArgs {
    instruction: number;
}
export declare class DeprecatedRedeemParticipationBidArgs {
    instruction: number;
}
export declare class StartAuctionArgs {
    instruction: number;
}
export declare class ClaimBidArgs {
    instruction: number;
}
export declare class DeprecatedPopulateParticipationPrintingAccountArgs {
    instruction: number;
}
export declare enum ProxyCallAddress {
    RedeemBid = 0,
    RedeemFullRightsTransferBid = 1
}
export declare class RedeemUnusedWinningConfigItemsAsAuctioneerArgs {
    instruction: number;
    winningConfigItemIndex: number;
    proxyCall: ProxyCallAddress;
    constructor(args: {
        winningConfigItemIndex: number;
        proxyCall: ProxyCallAddress;
    });
}
export declare class EmptyPaymentAccountArgs {
    instruction: number;
    winningConfigIndex: number | null;
    winningConfigItemIndex: number | null;
    creatorIndex: number | null;
    constructor(args: {
        winningConfigIndex: number | null;
        winningConfigItemIndex: number | null;
        creatorIndex: number | null;
    });
}
export declare class SetStoreArgs {
    instruction: number;
    public: boolean;
    constructor(args: {
        public: boolean;
    });
}
export declare class SetWhitelistedCreatorArgs {
    instruction: number;
    activated: boolean;
    constructor(args: {
        activated: boolean;
    });
}
export declare class DeprecatedValidateParticipationArgs {
    instruction: number;
}
export declare class DecommissionAuctionManagerArgs {
    instruction: number;
}
export declare class RedeemPrintingV2BidArgs {
    instruction: number;
    editionOffset: BN;
    winIndex: BN;
    constructor(args: {
        editionOffset: BN;
        winIndex: BN;
    });
}
export declare class WithdrawMasterEditionArgs {
    instruction: number;
}
export declare class RedeemParticipationBidV2Args {
    instruction: number;
}
export declare enum WinningConstraint {
    NoParticipationPrize = 0,
    ParticipationPrizeGiven = 1
}
export declare enum NonWinningConstraint {
    NoParticipationPrize = 0,
    GivenForFixedPrice = 1,
    GivenForBidPrice = 2
}
export declare class AuctionManagerSettings {
    winningConfigs: WinningConfig[];
    participationConfig: ParticipationConfig | null;
    constructor(args?: AuctionManagerSettings);
}
export declare enum WinningConfigType {
    TokenOnlyTransfer = 0,
    FullRightsTransfer = 1,
    PrintingV1 = 2,
    PrintingV2 = 3
}
export declare class ParticipationState {
    collectedToAcceptPayment: BN;
    primarySaleHappened: boolean;
    validated: boolean;
    printingAuthorizationTokenAccount: PublicKey | null;
    constructor(args?: ParticipationState);
}
export declare class ParticipationConfig {
    winnerConstraint: WinningConstraint;
    nonWinningConstraint: NonWinningConstraint;
    safetyDepositBoxIndex: number;
    fixedPrice: BN | null;
    constructor(args?: ParticipationConfig);
}
export declare class WinningConfig {
    items: WinningConfigItem[];
    constructor(args?: WinningConfig);
}
export declare class WinningConfigItem {
    safetyDepositBoxIndex: number;
    amount: number;
    winningConfigType: WinningConfigType;
    constructor(args?: WinningConfigItem);
}
export declare const decodePrizeTrackingTicket: (buffer: Buffer) => PrizeTrackingTicket;
export declare const decodeWhitelistedCreator: (buffer: Buffer) => WhitelistedCreator;
export declare const WhitelistedCreatorParser: AccountParser;
export declare const decodeStore: (buffer: Buffer) => Store;
export declare const decodeAuctionManager: (buffer: Buffer) => AuctionManager;
export declare const decodeBidRedemptionTicket: (buffer: Buffer) => BidRedemptionTicket;
export declare const decodePayoutTicket: (buffer: Buffer) => PayoutTicket;
export declare class WinningConfigState {
    items: WinningConfigStateItem[];
    moneyPushedToAcceptPayment: boolean;
    constructor(args?: WinningConfigState);
}
export declare class WinningConfigStateItem {
    primarySaleHappened: boolean;
    claimed: boolean;
    constructor(args?: WinningConfigStateItem);
}
export declare class WhitelistedCreator {
    key: MetaplexKey;
    address: PublicKey;
    activated: boolean;
    twitter?: string;
    name?: string;
    image?: string;
    description?: string;
    constructor(args: {
        address: PublicKey;
        activated: boolean;
    });
}
export declare class Store {
    key: MetaplexKey;
    public: boolean;
    auctionProgram: PublicKey;
    tokenVaultProgram: PublicKey;
    tokenMetadataProgram: PublicKey;
    tokenProgram: PublicKey;
    constructor(args: {
        public: boolean;
        auctionProgram: PublicKey;
        tokenVaultProgram: PublicKey;
        tokenMetadataProgram: PublicKey;
        tokenProgram: PublicKey;
    });
}
export declare enum AuctionManagerStatus {
    Initialized = 0,
    Validated = 1,
    Running = 2,
    Disbursing = 3,
    Finished = 4
}
export declare class AuctionManagerState {
    status: AuctionManagerStatus;
    winningConfigItemsValidated: number;
    winningConfigStates: WinningConfigState[];
    participationState: ParticipationState | null;
    constructor(args?: AuctionManagerState);
}
export declare class BidRedemptionTicket {
    key: MetaplexKey;
    participationRedeemed: boolean;
    itemsRedeemed: number;
    constructor(args?: BidRedemptionTicket);
}
export declare const SCHEMA: Map<any, any>;
export declare function getAuctionManagerKey(vault: PublicKey, auctionKey: PublicKey): Promise<PublicKey>;
export declare function getAuctionKeys(vault: PublicKey): Promise<{
    auctionKey: PublicKey;
    auctionManagerKey: PublicKey;
}>;
export declare function getBidRedemption(auctionKey: PublicKey, bidMetadata: PublicKey): Promise<PublicKey>;
export declare function getBidderKeys(auctionKey: PublicKey, bidder: PublicKey): Promise<{
    bidMetadata: PublicKey;
    bidRedemption: PublicKey;
}>;
export declare function getOriginalAuthority(auctionKey: PublicKey, metadata: PublicKey): Promise<PublicKey>;
export declare function getWhitelistedCreator(creator: PublicKey): Promise<PublicKey>;
export declare function getPrizeTrackingTicket(auctionManager: PublicKey, mint: PublicKey): Promise<PublicKey>;
export declare function getSafetyDepositBoxValidationTicket(auctionManager: PublicKey, safetyDepositBox: PublicKey): Promise<PublicKey>;
export declare function getPayoutTicket(auctionManager: PublicKey, winnerConfigIndex: number | null | undefined, winnerConfigItemIndex: number | null | undefined, creatorIndex: number | null | undefined, safetyDepositBox: PublicKey, recipient: PublicKey): Promise<PublicKey>;
//# sourceMappingURL=index.d.ts.map