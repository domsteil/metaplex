"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSafetyDepositBox = void 0;
const common_1 = require("@oyster/common");
const web3_js_1 = require("@solana/web3.js");
const borsh_1 = require("borsh");
const _1 = require(".");
async function validateSafetyDepositBox(vault, metadata, safetyDepositBox, safetyDepositTokenStore, tokenMint, auctionManagerAuthority, metadataAuthority, payer, instructions, edition, whitelistedCreator, store, printingMint, printingMintAuthority) {
    const PROGRAM_IDS = common_1.programIds();
    const { auctionKey, auctionManagerKey } = await _1.getAuctionKeys(vault);
    const originalAuthorityLookup = await _1.getOriginalAuthority(auctionKey, metadata);
    const value = new _1.ValidateSafetyDepositBoxArgs();
    const data = Buffer.from(borsh_1.serialize(_1.SCHEMA, value));
    const keys = [
        {
            pubkey: await _1.getSafetyDepositBoxValidationTicket(auctionManagerKey, safetyDepositBox),
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: auctionManagerKey,
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: metadata,
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: originalAuthorityLookup,
            isSigner: false,
            isWritable: true,
        },
        {
            pubkey: whitelistedCreator || web3_js_1.SystemProgram.programId,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: store,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: safetyDepositBox,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: safetyDepositTokenStore,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: tokenMint,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: edition,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: vault,
            isSigner: false,
            isWritable: false,
        },
        {
            pubkey: auctionManagerAuthority,
            isSigner: true,
            isWritable: false,
        },
        {
            pubkey: metadataAuthority,
            isSigner: true,
            isWritable: false,
        },
        {
            pubkey: payer,
            isSigner: true,
            isWritable: false,
        },
        {
            pubkey: PROGRAM_IDS.metadata,
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
    if (printingMint && printingMintAuthority) {
        keys.push({
            pubkey: printingMint,
            isSigner: false,
            isWritable: true,
        });
        keys.push({
            pubkey: printingMintAuthority,
            isSigner: true,
            isWritable: false,
        });
    }
    instructions.push(new web3_js_1.TransactionInstruction({
        keys,
        programId: PROGRAM_IDS.metaplex,
        data,
    }));
}
exports.validateSafetyDepositBox = validateSafetyDepositBox;
//# sourceMappingURL=validateSafetyDepositBox.js.map