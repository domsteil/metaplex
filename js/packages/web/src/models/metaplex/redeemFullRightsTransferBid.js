"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redeemFullRightsTransferBid = void 0;
const common_1 = require("@oyster/common");
const web3_js_1 = require("@solana/web3.js");
const borsh_1 = require("borsh");
const _1 = require(".");
async function redeemFullRightsTransferBid(vault, safetyDepositTokenStore, destination, safetyDeposit, fractionMint, bidder, payer, instructions, masterMetadata, newAuthority, 
// If this is an auctioneer trying to reclaim a specific winning index, pass it here,
// and this will instead call the proxy route instead of the real one, wrapping the original
// redemption call in an override call that forces the winning index if the auctioneer is authorized.
auctioneerReclaimIndex) {
    const PROGRAM_IDS = common_1.programIds();
    const store = PROGRAM_IDS.store;
    if (!store) {
        throw new Error('Store not initialized');
    }
    const { auctionKey, auctionManagerKey } = await _1.getAuctionKeys(vault);
    const { bidRedemption, bidMetadata } = await _1.getBidderKeys(auctionKey, bidder);
    const transferAuthority = (await common_1.findProgramAddress([
        Buffer.from(common_1.VAULT_PREFIX),
        PROGRAM_IDS.vault.toBuffer(),
        vault.toBuffer(),
    ], PROGRAM_IDS.vault))[0];
    const value = auctioneerReclaimIndex !== undefined
        ? new _1.RedeemUnusedWinningConfigItemsAsAuctioneerArgs({
            winningConfigItemIndex: auctioneerReclaimIndex,
            proxyCall: _1.ProxyCallAddress.RedeemFullRightsTransferBid,
        })
        : new _1.RedeemFullRightsTransferBidArgs();
    const data = Buffer.from(borsh_1.serialize(_1.SCHEMA, value));
    const keys = [
        {
            pubkey: auctionManagerKey,
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: safetyDepositTokenStore,
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: destination,
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: bidRedemption,
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: safetyDeposit,
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: vault,
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: fractionMint,
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: auctionKey,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: bidMetadata,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: bidder,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: payer,
            isSigner: true,
            isWritable: false,
        },
        {
            pubkey: PROGRAM_IDS.token,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: PROGRAM_IDS.vault,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: PROGRAM_IDS.metadata,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: store,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: web3_js_1.SystemProgram.programId,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: web3_js_1.SYSVAR_RENT_PUBKEY,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: masterMetadata,
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: newAuthority,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: transferAuthority,
            isSigner: false,
            isWritable: false,
        },
    ];
    instructions.push(new web3_js_1.TransactionInstruction({
        keys,
        programId: PROGRAM_IDS.metaplex,
        data,
    }));
}
exports.redeemFullRightsTransferBid = redeemFullRightsTransferBid;
//# sourceMappingURL=redeemFullRightsTransferBid.js.map