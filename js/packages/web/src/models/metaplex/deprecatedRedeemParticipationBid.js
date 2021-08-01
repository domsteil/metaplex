"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deprecatedRedeemParticipationBid = void 0;
const common_1 = require("@oyster/common");
const web3_js_1 = require("@solana/web3.js");
const borsh_1 = require("borsh");
const _1 = require(".");
async function deprecatedRedeemParticipationBid(vault, safetyDepositTokenStore, destination, safetyDeposit, fractionMint, bidder, payer, instructions, tokenMint, participationPrintingAccount, transferAuthority, acceptPaymentAccount, tokenPaymentAccount) {
    const PROGRAM_IDS = common_1.programIds();
    const store = PROGRAM_IDS.store;
    if (!store) {
        throw new Error('Store not initialized');
    }
    const { auctionKey, auctionManagerKey } = await _1.getAuctionKeys(vault);
    const { bidRedemption, bidMetadata } = await _1.getBidderKeys(auctionKey, bidder);
    const value = new _1.DeprecatedRedeemParticipationBidArgs();
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
            isWritable: true,
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
            pubkey: transferAuthority,
            isSigner: true,
            isWritable: false,
        },
        {
            pubkey: acceptPaymentAccount,
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: tokenPaymentAccount,
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: participationPrintingAccount,
            isSigner: false,
            isWritable: true,
        },
    ];
    instructions.push(new web3_js_1.TransactionInstruction({
        keys,
        programId: PROGRAM_IDS.metaplex,
        data,
    }));
}
exports.deprecatedRedeemParticipationBid = deprecatedRedeemParticipationBid;
//# sourceMappingURL=deprecatedRedeemParticipationBid.js.map