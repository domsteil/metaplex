"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveAdmin = void 0;
const common_1 = require("@oyster/common");
const setStore_1 = require("../models/metaplex/setStore");
const setWhitelistedCreator_1 = require("../models/metaplex/setWhitelistedCreator");
// TODO if this becomes very slow move to batching txns like we do with settle.ts
// but given how little this should be used keep it simple
async function saveAdmin(connection, wallet, isPublic, whitelistedCreators) {
    let signers = [];
    let instructions = [];
    let storeSigners = [];
    let storeInstructions = [];
    await setStore_1.setStore(isPublic, wallet.publicKey, wallet.publicKey, storeInstructions);
    signers.push(storeSigners);
    instructions.push(storeInstructions);
    for (let i = 0; i < whitelistedCreators.length; i++) {
        const wc = whitelistedCreators[i];
        let wcSigners = [];
        let wcInstructions = [];
        await setWhitelistedCreator_1.setWhitelistedCreator(wc.address, wc.activated, wallet.publicKey, wallet.publicKey, wcInstructions);
        signers.push(wcSigners);
        instructions.push(wcInstructions);
    }
    instructions.length === 1
        ? await common_1.sendTransactionWithRetry(connection, wallet, instructions[0], signers[0], 'single')
        : await common_1.sendTransactions(connection, wallet, instructions, signers, common_1.SequenceType.StopOnFailure, 'single');
}
exports.saveAdmin = saveAdmin;
//# sourceMappingURL=saveAdmin.js.map