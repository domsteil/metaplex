"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redeemPrintingV2Bid = void 0;
const common_1 = require("@oyster/common");
const web3_js_1 = require("@solana/web3.js");
const borsh_1 = require("borsh");
const _1 = require(".");
async function redeemPrintingV2Bid(vault, safetyDepositTokenStore, tokenAccount, safetyDeposit, fractionMint, bidder, payer, metadata, masterEdition, originalMint, newMint, edition, editionOffset, winIndex, instructions) {
    const PROGRAM_IDS = common_1.programIds();
    const store = PROGRAM_IDS.store;
    if (!store) {
        throw new Error('Store not initialized');
    }
    const { auctionKey, auctionManagerKey } = await _1.getAuctionKeys(vault);
    const { bidRedemption, bidMetadata } = await _1.getBidderKeys(auctionKey, bidder);
    const prizeTrackingTicket = await _1.getPrizeTrackingTicket(auctionManagerKey, originalMint);
    const newMetadata = await common_1.getMetadata(newMint);
    const newEdition = await common_1.getEdition(newMint);
    const editionMarkPda = await common_1.getEditionMarkPda(originalMint, edition);
    const value = new _1.RedeemPrintingV2BidArgs({ editionOffset, winIndex });
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
            pubkey: tokenAccount,
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
            isWritable: true,
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
            pubkey: prizeTrackingTicket,
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: newMetadata,
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: newEdition,
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: masterEdition,
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: newMint,
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: editionMarkPda,
            isSigner: false,
            isWritable: true,
        },
        {
            // Mint authority (this) is going to be the payer since the bidder
            // may not be signer hre - we may be redeeming for someone else (permissionless)
            // and during the txn, mint authority is removed from us and given to master edition.
            // The ATA account is already owned by bidder by default. No signing needed
            pubkey: payer,
            isSigner: true,
            isWritable: false,
        },
        {
            pubkey: metadata,
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
exports.redeemPrintingV2Bid = redeemPrintingV2Bid;
//# sourceMappingURL=redeemPrintingV2Bid.js.map