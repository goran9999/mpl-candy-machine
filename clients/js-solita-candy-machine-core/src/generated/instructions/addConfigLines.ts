/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
import { ConfigLine, configLineBeet } from '../types/ConfigLine';

/**
 * @category Instructions
 * @category AddConfigLines
 * @category generated
 */
export type AddConfigLinesInstructionArgs = {
  index: number;
  configLines: ConfigLine[];
};
/**
 * @category Instructions
 * @category AddConfigLines
 * @category generated
 */
export const addConfigLinesStruct = new beet.FixableBeetArgsStruct<
  AddConfigLinesInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['index', beet.u32],
    ['configLines', beet.array(configLineBeet)],
  ],
  'AddConfigLinesInstructionArgs',
);
/**
 * Accounts required by the _addConfigLines_ instruction
 *
 * @property [_writable_] candyMachine
 * @property [**signer**] authority
 * @category Instructions
 * @category AddConfigLines
 * @category generated
 */
export type AddConfigLinesInstructionAccounts = {
  candyMachine: web3.PublicKey;
  authority: web3.PublicKey;
  anchorRemainingAccounts?: web3.AccountMeta[];
};

export const addConfigLinesInstructionDiscriminator = [223, 50, 224, 227, 151, 8, 115, 106];

/**
 * Creates a _AddConfigLines_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category AddConfigLines
 * @category generated
 */
export function createAddConfigLinesInstruction(
  accounts: AddConfigLinesInstructionAccounts,
  args: AddConfigLinesInstructionArgs,
  programId = new web3.PublicKey('CFzdVwhuEen1o3ZZSUkMRdx7Z4kFZKAQw9CyqKt6BFHY'),
) {
  const [data] = addConfigLinesStruct.serialize({
    instructionDiscriminator: addConfigLinesInstructionDiscriminator,
    ...args,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.candyMachine,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.authority,
      isWritable: false,
      isSigner: true,
    },
  ];

  if (accounts.anchorRemainingAccounts != null) {
    for (const acc of accounts.anchorRemainingAccounts) {
      keys.push(acc);
    }
  }

  const ix = new web3.TransactionInstruction({
    programId,
    keys,
    data,
  });
  return ix;
}
