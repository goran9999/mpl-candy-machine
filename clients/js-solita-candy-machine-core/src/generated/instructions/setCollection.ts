/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';

/**
 * @category Instructions
 * @category SetCollection
 * @category generated
 */
export const setCollectionStruct = new beet.BeetArgsStruct<{
  instructionDiscriminator: number[] /* size: 8 */;
}>(
  [['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)]],
  'SetCollectionInstructionArgs',
);
/**
 * Accounts required by the _setCollection_ instruction
 *
 * @property [_writable_] candyMachine
 * @property [**signer**] authority
 * @property [_writable_] authorityPda
 * @property [**signer**] payer
 * @property [] collectionMint
 * @property [] collectionMetadata
 * @property [_writable_] collectionAuthorityRecord
 * @property [_writable_, **signer**] newCollectionUpdateAuthority
 * @property [] newCollectionMetadata
 * @property [] newCollectionMint
 * @property [] newCollectionMasterEdition
 * @property [_writable_] newCollectionAuthorityRecord
 * @property [] tokenMetadataProgram
 * @category Instructions
 * @category SetCollection
 * @category generated
 */
export type SetCollectionInstructionAccounts = {
  candyMachine: web3.PublicKey;
  authority: web3.PublicKey;
  authorityPda: web3.PublicKey;
  payer: web3.PublicKey;
  collectionMint: web3.PublicKey;
  collectionMetadata: web3.PublicKey;
  collectionAuthorityRecord: web3.PublicKey;
  newCollectionUpdateAuthority: web3.PublicKey;
  newCollectionMetadata: web3.PublicKey;
  newCollectionMint: web3.PublicKey;
  newCollectionMasterEdition: web3.PublicKey;
  newCollectionAuthorityRecord: web3.PublicKey;
  tokenMetadataProgram: web3.PublicKey;
  systemProgram?: web3.PublicKey;
  anchorRemainingAccounts?: web3.AccountMeta[];
};

export const setCollectionInstructionDiscriminator = [192, 254, 206, 76, 168, 182, 59, 223];

/**
 * Creates a _SetCollection_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category SetCollection
 * @category generated
 */
export function createSetCollectionInstruction(
  accounts: SetCollectionInstructionAccounts,
  programId = new web3.PublicKey('CFzdVwhuEen1o3ZZSUkMRdx7Z4kFZKAQw9CyqKt6BFHY'),
) {
  const [data] = setCollectionStruct.serialize({
    instructionDiscriminator: setCollectionInstructionDiscriminator,
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
    {
      pubkey: accounts.authorityPda,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.payer,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: accounts.collectionMint,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.collectionMetadata,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.collectionAuthorityRecord,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.newCollectionUpdateAuthority,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: accounts.newCollectionMetadata,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.newCollectionMint,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.newCollectionMasterEdition,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.newCollectionAuthorityRecord,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.tokenMetadataProgram,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.systemProgram ?? web3.SystemProgram.programId,
      isWritable: false,
      isSigner: false,
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
