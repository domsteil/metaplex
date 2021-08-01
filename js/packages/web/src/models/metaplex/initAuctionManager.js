"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAuctionManager = void 0;
const common_1 = require("@oyster/common");
const web3_js_1 = require("@solana/web3.js");
const borsh_1 = require("borsh");
const _1 = require(".");
async function initAuctionManager(vault, auctionManagerAuthority, payer, acceptPaymentAccount, store, settings, instructions) {
    const PROGRAM_IDS = common_1.programIds();
    const { auctionKey, auctionManagerKey } = await _1.getAuctionKeys(vault);
    const value = new _1.InitAuctionManagerArgs({
        settings,
    });
    const data = Buffer.from(borsh_1.serialize(_1.SCHEMA, value));
    const keys = [
        {
            pubkey: auctionManagerKey,
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: vault,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: auctionKey,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: auctionManagerAuthority,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: payer,
            isSigner: true,
            isWritable: false,
        },
        {
            pubkey: acceptPaymentAccount,
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
    ];
    instructions.push(new web3_js_1.TransactionInstruction({
        keys,
        programId: PROGRAM_IDS.metaplex,
        data,
    }));
}
exports.initAuctionManager = initAuctionManager;
//# sourceMappingURL=initAuctionManager.js.map