"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuctionManagerKey = exports.SCHEMA = exports.BidRedemptionTicket = exports.AuctionManagerState = exports.AuctionManagerStatus = exports.Store = exports.WhitelistedCreator = exports.WinningConfigStateItem = exports.WinningConfigState = exports.decodePayoutTicket = exports.decodeBidRedemptionTicket = exports.decodeAuctionManager = exports.decodeStore = exports.WhitelistedCreatorParser = exports.decodeWhitelistedCreator = exports.decodePrizeTrackingTicket = exports.WinningConfigItem = exports.WinningConfig = exports.ParticipationConfig = exports.ParticipationState = exports.WinningConfigType = exports.AuctionManagerSettings = exports.NonWinningConstraint = exports.WinningConstraint = exports.RedeemParticipationBidV2Args = exports.WithdrawMasterEditionArgs = exports.RedeemPrintingV2BidArgs = exports.DecommissionAuctionManagerArgs = exports.DeprecatedValidateParticipationArgs = exports.SetWhitelistedCreatorArgs = exports.SetStoreArgs = exports.EmptyPaymentAccountArgs = exports.RedeemUnusedWinningConfigItemsAsAuctioneerArgs = exports.ProxyCallAddress = exports.DeprecatedPopulateParticipationPrintingAccountArgs = exports.ClaimBidArgs = exports.StartAuctionArgs = exports.DeprecatedRedeemParticipationBidArgs = exports.RedeemFullRightsTransferBidArgs = exports.RedeemBidArgs = exports.ValidateSafetyDepositBoxArgs = exports.InitAuctionManagerArgs = exports.AuctionManager = exports.PayoutTicket = exports.PrizeTrackingTicket = exports.MetaplexKey = exports.MAX_PRIZE_TRACKING_TICKET_SIZE = exports.MAX_BID_REDEMPTION_TICKET_SIZE = exports.ORIGINAL_AUTHORITY_LOOKUP_SIZE = exports.METAPLEX_PREFIX = void 0;
exports.getPayoutTicket = exports.getSafetyDepositBoxValidationTicket = exports.getPrizeTrackingTicket = exports.getWhitelistedCreator = exports.getOriginalAuthority = exports.getBidderKeys = exports.getBidRedemption = exports.getAuctionKeys = void 0;
const common_1 = require("@oyster/common");
const bn_js_1 = __importDefault(require("bn.js"));
const borsh_1 = require("borsh");
__exportStar(require("./initAuctionManager"), exports);
__exportStar(require("./redeemBid"), exports);
__exportStar(require("./redeemFullRightsTransferBid"), exports);
__exportStar(require("./deprecatedRedeemParticipationBid"), exports);
__exportStar(require("./startAuction"), exports);
__exportStar(require("./validateSafetyDepositBox"), exports);
__exportStar(require("./redeemParticipationBidV2"), exports);
__exportStar(require("./redeemPrintingV2Bid"), exports);
__exportStar(require("./withdrawMasterEdition"), exports);
exports.METAPLEX_PREFIX = 'metaplex';
exports.ORIGINAL_AUTHORITY_LOOKUP_SIZE = 33;
exports.MAX_BID_REDEMPTION_TICKET_SIZE = 3;
exports.MAX_PRIZE_TRACKING_TICKET_SIZE = 1 + 32 + 8 + 8 + 8 + 50;
var MetaplexKey;
(function (MetaplexKey) {
    MetaplexKey[MetaplexKey["Uninitialized"] = 0] = "Uninitialized";
    MetaplexKey[MetaplexKey["OriginalAuthorityLookupV1"] = 1] = "OriginalAuthorityLookupV1";
    MetaplexKey[MetaplexKey["BidRedemptionTicketV1"] = 2] = "BidRedemptionTicketV1";
    MetaplexKey[MetaplexKey["StoreV1"] = 3] = "StoreV1";
    MetaplexKey[MetaplexKey["WhitelistedCreatorV1"] = 4] = "WhitelistedCreatorV1";
    MetaplexKey[MetaplexKey["PayoutTicketV1"] = 5] = "PayoutTicketV1";
    MetaplexKey[MetaplexKey["SafetyDepositValidationTicketV1"] = 6] = "SafetyDepositValidationTicketV1";
    MetaplexKey[MetaplexKey["AuctionManagerV1"] = 7] = "AuctionManagerV1";
    MetaplexKey[MetaplexKey["PrizeTrackingTicketV1"] = 8] = "PrizeTrackingTicketV1";
})(MetaplexKey = exports.MetaplexKey || (exports.MetaplexKey = {}));
class PrizeTrackingTicket {
    constructor(args) {
        this.key = MetaplexKey.PrizeTrackingTicketV1;
        this.key = MetaplexKey.PrizeTrackingTicketV1;
        this.metadata = args.metadata;
        this.supplySnapshot = args.supplySnapshot;
        this.expectedRedemptions = args.expectedRedemptions;
        this.redemptions = args.redemptions;
    }
}
exports.PrizeTrackingTicket = PrizeTrackingTicket;
class PayoutTicket {
    constructor(args) {
        this.key = MetaplexKey.PayoutTicketV1;
        this.key = MetaplexKey.PayoutTicketV1;
        this.recipient = args.recipient;
        this.amountPaid = args.amountPaid;
    }
}
exports.PayoutTicket = PayoutTicket;
class AuctionManager {
    constructor(args) {
        this.key = MetaplexKey.AuctionManagerV1;
        this.store = args.store;
        this.authority = args.authority;
        this.auction = args.auction;
        this.vault = args.vault;
        this.acceptPayment = args.acceptPayment;
        this.state = args.state;
        this.settings = args.settings;
    }
}
exports.AuctionManager = AuctionManager;
class InitAuctionManagerArgs {
    constructor(args) {
        this.instruction = 0;
        this.settings = args.settings;
    }
}
exports.InitAuctionManagerArgs = InitAuctionManagerArgs;
class ValidateSafetyDepositBoxArgs {
    constructor() {
        this.instruction = 1;
    }
}
exports.ValidateSafetyDepositBoxArgs = ValidateSafetyDepositBoxArgs;
class RedeemBidArgs {
    constructor() {
        this.instruction = 2;
    }
}
exports.RedeemBidArgs = RedeemBidArgs;
class RedeemFullRightsTransferBidArgs {
    constructor() {
        this.instruction = 3;
    }
}
exports.RedeemFullRightsTransferBidArgs = RedeemFullRightsTransferBidArgs;
class DeprecatedRedeemParticipationBidArgs {
    constructor() {
        this.instruction = 4;
    }
}
exports.DeprecatedRedeemParticipationBidArgs = DeprecatedRedeemParticipationBidArgs;
class StartAuctionArgs {
    constructor() {
        this.instruction = 5;
    }
}
exports.StartAuctionArgs = StartAuctionArgs;
class ClaimBidArgs {
    constructor() {
        this.instruction = 6;
    }
}
exports.ClaimBidArgs = ClaimBidArgs;
class DeprecatedPopulateParticipationPrintingAccountArgs {
    constructor() {
        this.instruction = 11;
    }
}
exports.DeprecatedPopulateParticipationPrintingAccountArgs = DeprecatedPopulateParticipationPrintingAccountArgs;
var ProxyCallAddress;
(function (ProxyCallAddress) {
    ProxyCallAddress[ProxyCallAddress["RedeemBid"] = 0] = "RedeemBid";
    ProxyCallAddress[ProxyCallAddress["RedeemFullRightsTransferBid"] = 1] = "RedeemFullRightsTransferBid";
})(ProxyCallAddress = exports.ProxyCallAddress || (exports.ProxyCallAddress = {}));
class RedeemUnusedWinningConfigItemsAsAuctioneerArgs {
    constructor(args) {
        this.instruction = 12;
        this.winningConfigItemIndex = args.winningConfigItemIndex;
        this.proxyCall = args.proxyCall;
    }
}
exports.RedeemUnusedWinningConfigItemsAsAuctioneerArgs = RedeemUnusedWinningConfigItemsAsAuctioneerArgs;
class EmptyPaymentAccountArgs {
    constructor(args) {
        this.instruction = 7;
        this.winningConfigIndex = args.winningConfigIndex;
        this.winningConfigItemIndex = args.winningConfigItemIndex;
        this.creatorIndex = args.creatorIndex;
    }
}
exports.EmptyPaymentAccountArgs = EmptyPaymentAccountArgs;
class SetStoreArgs {
    constructor(args) {
        this.instruction = 8;
        this.public = args.public;
    }
}
exports.SetStoreArgs = SetStoreArgs;
class SetWhitelistedCreatorArgs {
    constructor(args) {
        this.instruction = 9;
        this.activated = args.activated;
    }
}
exports.SetWhitelistedCreatorArgs = SetWhitelistedCreatorArgs;
class DeprecatedValidateParticipationArgs {
    constructor() {
        this.instruction = 10;
    }
}
exports.DeprecatedValidateParticipationArgs = DeprecatedValidateParticipationArgs;
class DecommissionAuctionManagerArgs {
    constructor() {
        this.instruction = 13;
    }
}
exports.DecommissionAuctionManagerArgs = DecommissionAuctionManagerArgs;
class RedeemPrintingV2BidArgs {
    constructor(args) {
        this.instruction = 14;
        this.editionOffset = args.editionOffset;
        this.winIndex = args.winIndex;
    }
}
exports.RedeemPrintingV2BidArgs = RedeemPrintingV2BidArgs;
class WithdrawMasterEditionArgs {
    constructor() {
        this.instruction = 15;
    }
}
exports.WithdrawMasterEditionArgs = WithdrawMasterEditionArgs;
class RedeemParticipationBidV2Args {
    constructor() {
        this.instruction = 16;
    }
}
exports.RedeemParticipationBidV2Args = RedeemParticipationBidV2Args;
var WinningConstraint;
(function (WinningConstraint) {
    WinningConstraint[WinningConstraint["NoParticipationPrize"] = 0] = "NoParticipationPrize";
    WinningConstraint[WinningConstraint["ParticipationPrizeGiven"] = 1] = "ParticipationPrizeGiven";
})(WinningConstraint = exports.WinningConstraint || (exports.WinningConstraint = {}));
var NonWinningConstraint;
(function (NonWinningConstraint) {
    NonWinningConstraint[NonWinningConstraint["NoParticipationPrize"] = 0] = "NoParticipationPrize";
    NonWinningConstraint[NonWinningConstraint["GivenForFixedPrice"] = 1] = "GivenForFixedPrice";
    NonWinningConstraint[NonWinningConstraint["GivenForBidPrice"] = 2] = "GivenForBidPrice";
})(NonWinningConstraint = exports.NonWinningConstraint || (exports.NonWinningConstraint = {}));
class AuctionManagerSettings {
    constructor(args) {
        this.winningConfigs = [];
        this.participationConfig = null;
        Object.assign(this, args);
    }
}
exports.AuctionManagerSettings = AuctionManagerSettings;
var WinningConfigType;
(function (WinningConfigType) {
    /// You may be selling your one-of-a-kind NFT for the first time, but not it's accompanying Metadata,
    /// of which you would like to retain ownership. You get 100% of the payment the first sale, then
    /// royalties forever after.
    ///
    /// You may be re-selling something like a Limited/Open Edition print from another auction,
    /// a master edition record token by itself (Without accompanying metadata/printing ownership), etc.
    /// This means artists will get royalty fees according to the top level royalty % on the metadata
    /// split according to their percentages of contribution.
    ///
    /// No metadata ownership is transferred in this instruction, which means while you may be transferring
    /// the token for a limited/open edition away, you would still be (nominally) the owner of the limited edition
    /// metadata, though it confers no rights or privileges of any kind.
    WinningConfigType[WinningConfigType["TokenOnlyTransfer"] = 0] = "TokenOnlyTransfer";
    /// Means you are auctioning off the master edition record and it's metadata ownership as well as the
    /// token itself. The other person will be able to mint authorization tokens and make changes to the
    /// artwork.
    WinningConfigType[WinningConfigType["FullRightsTransfer"] = 1] = "FullRightsTransfer";
    /// Means you are using authorization tokens to print off editions during the auction using
    /// from a MasterEditionV1
    WinningConfigType[WinningConfigType["PrintingV1"] = 2] = "PrintingV1";
    /// Means you are using the MasterEditionV2 to print off editions
    WinningConfigType[WinningConfigType["PrintingV2"] = 3] = "PrintingV2";
})(WinningConfigType = exports.WinningConfigType || (exports.WinningConfigType = {}));
class ParticipationState {
    constructor(args) {
        this.collectedToAcceptPayment = new bn_js_1.default(0);
        this.primarySaleHappened = false;
        this.validated = false;
        this.printingAuthorizationTokenAccount = null;
        Object.assign(this, args);
    }
}
exports.ParticipationState = ParticipationState;
class ParticipationConfig {
    constructor(args) {
        this.winnerConstraint = WinningConstraint.NoParticipationPrize;
        this.nonWinningConstraint = NonWinningConstraint.GivenForFixedPrice;
        this.safetyDepositBoxIndex = 0;
        this.fixedPrice = new bn_js_1.default(0);
        Object.assign(this, args);
    }
}
exports.ParticipationConfig = ParticipationConfig;
class WinningConfig {
    constructor(args) {
        this.items = [];
        Object.assign(this, args);
    }
}
exports.WinningConfig = WinningConfig;
class WinningConfigItem {
    constructor(args) {
        this.safetyDepositBoxIndex = 0;
        this.amount = 0;
        this.winningConfigType = WinningConfigType.TokenOnlyTransfer;
        Object.assign(this, args);
    }
}
exports.WinningConfigItem = WinningConfigItem;
const decodePrizeTrackingTicket = (buffer) => {
    return borsh_1.deserializeUnchecked(exports.SCHEMA, PrizeTrackingTicket, buffer);
};
exports.decodePrizeTrackingTicket = decodePrizeTrackingTicket;
const decodeWhitelistedCreator = (buffer) => {
    return borsh_1.deserializeUnchecked(exports.SCHEMA, WhitelistedCreator, buffer);
};
exports.decodeWhitelistedCreator = decodeWhitelistedCreator;
const WhitelistedCreatorParser = (pubkey, account) => ({
    pubkey,
    account,
    info: exports.decodeWhitelistedCreator(account.data),
});
exports.WhitelistedCreatorParser = WhitelistedCreatorParser;
const decodeStore = (buffer) => {
    return borsh_1.deserializeUnchecked(exports.SCHEMA, Store, buffer);
};
exports.decodeStore = decodeStore;
const decodeAuctionManager = (buffer) => {
    return borsh_1.deserializeUnchecked(exports.SCHEMA, AuctionManager, buffer);
};
exports.decodeAuctionManager = decodeAuctionManager;
const decodeBidRedemptionTicket = (buffer) => {
    return borsh_1.deserializeUnchecked(exports.SCHEMA, BidRedemptionTicket, buffer);
};
exports.decodeBidRedemptionTicket = decodeBidRedemptionTicket;
const decodePayoutTicket = (buffer) => {
    return borsh_1.deserializeUnchecked(exports.SCHEMA, PayoutTicket, buffer);
};
exports.decodePayoutTicket = decodePayoutTicket;
class WinningConfigState {
    constructor(args) {
        this.items = [];
        this.moneyPushedToAcceptPayment = false;
        Object.assign(this, args);
    }
}
exports.WinningConfigState = WinningConfigState;
class WinningConfigStateItem {
    constructor(args) {
        this.primarySaleHappened = false;
        this.claimed = false;
        Object.assign(this, args);
    }
}
exports.WinningConfigStateItem = WinningConfigStateItem;
class WhitelistedCreator {
    constructor(args) {
        this.key = MetaplexKey.WhitelistedCreatorV1;
        this.activated = true;
        this.address = args.address;
        this.activated = args.activated;
    }
}
exports.WhitelistedCreator = WhitelistedCreator;
class Store {
    constructor(args) {
        this.key = MetaplexKey.StoreV1;
        this.public = true;
        this.key = MetaplexKey.StoreV1;
        this.public = args.public;
        this.auctionProgram = args.auctionProgram;
        this.tokenVaultProgram = args.tokenVaultProgram;
        this.tokenMetadataProgram = args.tokenMetadataProgram;
        this.tokenProgram = args.tokenProgram;
    }
}
exports.Store = Store;
var AuctionManagerStatus;
(function (AuctionManagerStatus) {
    AuctionManagerStatus[AuctionManagerStatus["Initialized"] = 0] = "Initialized";
    AuctionManagerStatus[AuctionManagerStatus["Validated"] = 1] = "Validated";
    AuctionManagerStatus[AuctionManagerStatus["Running"] = 2] = "Running";
    AuctionManagerStatus[AuctionManagerStatus["Disbursing"] = 3] = "Disbursing";
    AuctionManagerStatus[AuctionManagerStatus["Finished"] = 4] = "Finished";
})(AuctionManagerStatus = exports.AuctionManagerStatus || (exports.AuctionManagerStatus = {}));
class AuctionManagerState {
    constructor(args) {
        this.status = AuctionManagerStatus.Initialized;
        this.winningConfigItemsValidated = 0;
        this.winningConfigStates = [];
        this.participationState = null;
        Object.assign(this, args);
    }
}
exports.AuctionManagerState = AuctionManagerState;
class BidRedemptionTicket {
    constructor(args) {
        this.key = MetaplexKey.BidRedemptionTicketV1;
        this.participationRedeemed = false;
        this.itemsRedeemed = 0;
        Object.assign(this, args);
    }
}
exports.BidRedemptionTicket = BidRedemptionTicket;
exports.SCHEMA = new Map([
    [
        PrizeTrackingTicket,
        {
            kind: 'struct',
            fields: [
                ['key', 'u8'],
                ['metadata', 'pubkey'],
                ['supplySnapshot', 'u64'],
                ['expectedRedemptions', 'u64'],
                ['redemptions', 'u64'],
            ],
        },
    ],
    [
        AuctionManager,
        {
            kind: 'struct',
            fields: [
                ['key', 'u8'],
                ['store', 'pubkey'],
                ['authority', 'pubkey'],
                ['auction', 'pubkey'],
                ['vault', 'pubkey'],
                ['acceptPayment', 'pubkey'],
                ['state', AuctionManagerState],
                ['settings', AuctionManagerSettings],
            ],
        },
    ],
    [
        ParticipationConfig,
        {
            kind: 'struct',
            fields: [
                ['winnerConstraint', 'u8'],
                ['nonWinningConstraint', 'u8'],
                ['safetyDepositBoxIndex', 'u8'],
                ['fixedPrice', { kind: 'option', type: 'u64' }],
            ],
        },
    ],
    [
        AuctionManagerSettings,
        {
            kind: 'struct',
            fields: [
                ['winningConfigs', [WinningConfig]],
                ['participationConfig', { kind: 'option', type: ParticipationConfig }],
            ],
        },
    ],
    [
        WinningConfig,
        {
            kind: 'struct',
            fields: [['items', [WinningConfigItem]]],
        },
    ],
    [
        WinningConfigItem,
        {
            kind: 'struct',
            fields: [
                ['safetyDepositBoxIndex', 'u8'],
                ['amount', 'u8'],
                ['winningConfigType', 'u8'],
            ],
        },
    ],
    [
        WinningConfigState,
        {
            kind: 'struct',
            fields: [
                ['items', [WinningConfigStateItem]],
                ['moneyPushedToAcceptPayment', 'u8'], // bool
            ],
        },
    ],
    [
        WinningConfigStateItem,
        {
            kind: 'struct',
            fields: [
                ['primarySaleHappened', 'u8'],
                ['claimed', 'u8'], // bool
            ],
        },
    ],
    [
        WhitelistedCreator,
        {
            kind: 'struct',
            fields: [
                ['key', 'u8'],
                ['address', 'pubkey'],
                ['activated', 'u8'],
            ],
        },
    ],
    [
        Store,
        {
            kind: 'struct',
            fields: [
                ['key', 'u8'],
                ['public', 'u8'],
                ['auctionProgram', 'pubkey'],
                ['tokenVaultProgram', 'pubkey'],
                ['tokenMetadataProgram', 'pubkey'],
                ['tokenProgram', 'pubkey'],
            ],
        },
    ],
    [
        AuctionManagerState,
        {
            kind: 'struct',
            fields: [
                ['status', 'u8'],
                ['winningConfigItemsValidated', 'u8'],
                ['winningConfigStates', [WinningConfigState]],
                ['participationState', { kind: 'option', type: ParticipationState }],
            ],
        },
    ],
    [
        ParticipationState,
        {
            kind: 'struct',
            fields: [
                ['collectedToAcceptPayment', 'u64'],
                ['primarySaleHappened', 'u8'],
                ['validated', 'u8'],
                [
                    'printingAuthorizationTokenAccount',
                    { kind: 'option', type: 'pubkey' },
                ],
            ],
        },
    ],
    [
        BidRedemptionTicket,
        {
            kind: 'struct',
            fields: [
                ['key', 'u8'],
                ['participationRedeemed', 'u8'],
                ['itemsRedeemed', 'u8'], // bool
            ],
        },
    ],
    [
        PayoutTicket,
        {
            kind: 'struct',
            fields: [
                ['key', 'u8'],
                ['recipient', 'pubkey'],
                ['amountPaid', 'u64'],
            ],
        },
    ],
    [
        DeprecatedPopulateParticipationPrintingAccountArgs,
        {
            kind: 'struct',
            fields: [['instruction', 'u8']],
        },
    ],
    [
        RedeemUnusedWinningConfigItemsAsAuctioneerArgs,
        {
            kind: 'struct',
            fields: [
                ['instruction', 'u8'],
                ['winningConfigItemIndex', 'u8'],
                ['proxyCall', 'u8'],
            ],
        },
    ],
    [
        DecommissionAuctionManagerArgs,
        {
            kind: 'struct',
            fields: [['instruction', 'u8']],
        },
    ],
    [
        RedeemPrintingV2BidArgs,
        {
            kind: 'struct',
            fields: [
                ['instruction', 'u8'],
                ['editionOffset', 'u64'],
                ['winIndex', 'u64'],
            ],
        },
    ],
    [
        WithdrawMasterEditionArgs,
        {
            kind: 'struct',
            fields: [['instruction', 'u8']],
        },
    ],
    [
        RedeemParticipationBidV2Args,
        {
            kind: 'struct',
            fields: [['instruction', 'u8']],
        },
    ],
    [
        InitAuctionManagerArgs,
        {
            kind: 'struct',
            fields: [
                ['instruction', 'u8'],
                ['settings', AuctionManagerSettings],
            ],
        },
    ],
    [
        ValidateSafetyDepositBoxArgs,
        {
            kind: 'struct',
            fields: [['instruction', 'u8']],
        },
    ],
    [
        RedeemBidArgs,
        {
            kind: 'struct',
            fields: [['instruction', 'u8']],
        },
    ],
    [
        RedeemFullRightsTransferBidArgs,
        {
            kind: 'struct',
            fields: [['instruction', 'u8']],
        },
    ],
    [
        DeprecatedRedeemParticipationBidArgs,
        {
            kind: 'struct',
            fields: [['instruction', 'u8']],
        },
    ],
    [
        StartAuctionArgs,
        {
            kind: 'struct',
            fields: [['instruction', 'u8']],
        },
    ],
    [
        ClaimBidArgs,
        {
            kind: 'struct',
            fields: [['instruction', 'u8']],
        },
    ],
    [
        EmptyPaymentAccountArgs,
        {
            kind: 'struct',
            fields: [
                ['instruction', 'u8'],
                ['winningConfigIndex', { kind: 'option', type: 'u8' }],
                ['winningConfigItemIndex', { kind: 'option', type: 'u8' }],
                ['creatorIndex', { kind: 'option', type: 'u8' }],
            ],
        },
    ],
    [
        SetStoreArgs,
        {
            kind: 'struct',
            fields: [
                ['instruction', 'u8'],
                ['public', 'u8'], //bool
            ],
        },
    ],
    [
        SetWhitelistedCreatorArgs,
        {
            kind: 'struct',
            fields: [
                ['instruction', 'u8'],
                ['activated', 'u8'], //bool
            ],
        },
    ],
    [
        DeprecatedValidateParticipationArgs,
        {
            kind: 'struct',
            fields: [['instruction', 'u8']],
        },
    ],
]);
async function getAuctionManagerKey(vault, auctionKey) {
    const PROGRAM_IDS = common_1.programIds();
    return (await common_1.findProgramAddress([Buffer.from(exports.METAPLEX_PREFIX), auctionKey.toBuffer()], PROGRAM_IDS.metaplex))[0];
}
exports.getAuctionManagerKey = getAuctionManagerKey;
async function getAuctionKeys(vault) {
    const PROGRAM_IDS = common_1.programIds();
    const auctionKey = (await common_1.findProgramAddress([
        Buffer.from(common_1.AUCTION_PREFIX),
        PROGRAM_IDS.auction.toBuffer(),
        vault.toBuffer(),
    ], PROGRAM_IDS.auction))[0];
    const auctionManagerKey = await getAuctionManagerKey(vault, auctionKey);
    return { auctionKey, auctionManagerKey };
}
exports.getAuctionKeys = getAuctionKeys;
async function getBidRedemption(auctionKey, bidMetadata) {
    const PROGRAM_IDS = common_1.programIds();
    return (await common_1.findProgramAddress([
        Buffer.from(exports.METAPLEX_PREFIX),
        auctionKey.toBuffer(),
        bidMetadata.toBuffer(),
    ], PROGRAM_IDS.metaplex))[0];
}
exports.getBidRedemption = getBidRedemption;
async function getBidderKeys(auctionKey, bidder) {
    const PROGRAM_IDS = common_1.programIds();
    const bidMetadata = (await common_1.findProgramAddress([
        Buffer.from(common_1.AUCTION_PREFIX),
        PROGRAM_IDS.auction.toBuffer(),
        auctionKey.toBuffer(),
        bidder.toBuffer(),
        Buffer.from(common_1.METADATA),
    ], PROGRAM_IDS.auction))[0];
    const bidRedemption = await getBidRedemption(auctionKey, bidMetadata);
    return { bidMetadata, bidRedemption };
}
exports.getBidderKeys = getBidderKeys;
async function getOriginalAuthority(auctionKey, metadata) {
    const PROGRAM_IDS = common_1.programIds();
    return (await common_1.findProgramAddress([
        Buffer.from(exports.METAPLEX_PREFIX),
        auctionKey.toBuffer(),
        metadata.toBuffer(),
    ], PROGRAM_IDS.metaplex))[0];
}
exports.getOriginalAuthority = getOriginalAuthority;
async function getWhitelistedCreator(creator) {
    const PROGRAM_IDS = common_1.programIds();
    const store = PROGRAM_IDS.store;
    if (!store) {
        throw new Error('Store not initialized');
    }
    return (await common_1.findProgramAddress([
        Buffer.from(exports.METAPLEX_PREFIX),
        PROGRAM_IDS.metaplex.toBuffer(),
        store.toBuffer(),
        creator.toBuffer(),
    ], PROGRAM_IDS.metaplex))[0];
}
exports.getWhitelistedCreator = getWhitelistedCreator;
async function getPrizeTrackingTicket(auctionManager, mint) {
    const PROGRAM_IDS = common_1.programIds();
    const store = PROGRAM_IDS.store;
    if (!store) {
        throw new Error('Store not initialized');
    }
    return (await common_1.findProgramAddress([
        Buffer.from(exports.METAPLEX_PREFIX),
        PROGRAM_IDS.metaplex.toBuffer(),
        auctionManager.toBuffer(),
        mint.toBuffer(),
    ], PROGRAM_IDS.metaplex))[0];
}
exports.getPrizeTrackingTicket = getPrizeTrackingTicket;
async function getSafetyDepositBoxValidationTicket(auctionManager, safetyDepositBox) {
    const PROGRAM_IDS = common_1.programIds();
    return (await common_1.findProgramAddress([
        Buffer.from(exports.METAPLEX_PREFIX),
        PROGRAM_IDS.metaplex.toBuffer(),
        auctionManager.toBuffer(),
        safetyDepositBox.toBuffer(),
    ], PROGRAM_IDS.metaplex))[0];
}
exports.getSafetyDepositBoxValidationTicket = getSafetyDepositBoxValidationTicket;
async function getPayoutTicket(auctionManager, winnerConfigIndex, winnerConfigItemIndex, creatorIndex, safetyDepositBox, recipient) {
    const PROGRAM_IDS = common_1.programIds();
    return (await common_1.findProgramAddress([
        Buffer.from(exports.METAPLEX_PREFIX),
        auctionManager.toBuffer(),
        Buffer.from(winnerConfigIndex !== null && winnerConfigIndex !== undefined
            ? winnerConfigIndex.toString()
            : 'participation'),
        Buffer.from(winnerConfigItemIndex !== null && winnerConfigItemIndex !== undefined
            ? winnerConfigItemIndex.toString()
            : '0'),
        Buffer.from(creatorIndex !== null && creatorIndex !== undefined
            ? creatorIndex.toString()
            : 'auctioneer'),
        safetyDepositBox.toBuffer(),
        recipient.toBuffer(),
    ], PROGRAM_IDS.metaplex))[0];
}
exports.getPayoutTicket = getPayoutTicket;
//# sourceMappingURL=index.js.map