"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdrawMasterEdition = void 0;
const common_1 = require("@oyster/common");
const web3_js_1 = require("@solana/web3.js");
const borsh_1 = require("borsh");
const _1 = require(".");
async function withdrawMasterEdition(vault, safetyDepositTokenStore, destination, safetyDeposit, fractionMint, mint, instructions) {
    const PROGRAM_IDS = common_1.programIds();
    const store = PROGRAM_IDS.store;
    if (!store) {
        throw new Error('Store not initialized');
    }
    const { auctionKey, auctionManagerKey } = await _1.getAuctionKeys(vault);
    const prizeTrackingTicket = await _1.getPrizeTrackingTicket(auctionManagerKey, mint);
    const vaultAuthority = (await common_1.findProgramAddress([
        Buffer.from(common_1.VAULT_PREFIX),
        PROGRAM_IDS.vault.toBuffer(),
        vault.toBuffer(),
    ], PROGRAM_IDS.vault))[0];
    const auctionExtended = (await common_1.findProgramAddress([
        Buffer.from(common_1.AUCTION_PREFIX),
        PROGRAM_IDS.auction.toBuffer(),
        vault.toBuffer(),
        Buffer.from(common_1.EXTENDED),
    ], PROGRAM_IDS.auction))[0];
    const value = new _1.WithdrawMasterEditionArgs();
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
            pubkey: prizeTrackingTicket,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: vaultAuthority,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: auctionKey,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: auctionExtended,
            isSigner: false,
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
            pubkey: store,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: web3_js_1.SYSVAR_RENT_PUBKEY,
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
exports.withdrawMasterEdition = withdrawMasterEdition;
//# sourceMappingURL=withdrawMasterEdition.js.map