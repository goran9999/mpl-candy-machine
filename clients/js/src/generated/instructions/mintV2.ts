/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  MetadataDelegateRole,
  findMasterEditionPda,
  findMetadataDelegateRecordPda,
  findMetadataPda,
} from '@metaplex-foundation/mpl-token-metadata';
import { findAssociatedTokenPda } from '@metaplex-foundation/mpl-toolbox';
import {
  AccountMeta,
  Context,
  Option,
  OptionOrNullable,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  publicKey,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  array,
  bytes,
  mapSerializer,
  option,
  string,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';
import { findCandyGuardPda, findCandyMachineAuthorityPda } from '../../hooked';
import { addAccountMeta, addObjectProperty } from '../shared';

// Accounts.
export type MintV2InstructionAccounts = {
  candyGuard?: PublicKey | Pda;
  candyMachineProgram?: PublicKey | Pda;
  candyMachine: PublicKey | Pda;
  firstCreator?: Signer;
  candyMachineAuthorityPda?: PublicKey | Pda;
  payer?: Signer;
  minter?: Signer;
  nftMint: PublicKey | Pda | Signer;
  nftMintAuthority?: Signer;
  nftMetadata?: PublicKey | Pda;
  nftMasterEdition?: PublicKey | Pda;
  token?: PublicKey | Pda;
  tokenRecord?: PublicKey | Pda;
  collectionDelegateRecord?: PublicKey | Pda;
  collectionMint: PublicKey | Pda;
  collectionMetadata?: PublicKey | Pda;
  collectionMasterEdition?: PublicKey | Pda;
  collectionUpdateAuthority: PublicKey | Pda;
  tokenMetadataProgram?: PublicKey | Pda;
  splTokenProgram?: PublicKey | Pda;
  splAtaProgram?: PublicKey | Pda;
  systemProgram?: PublicKey | Pda;
  sysvarInstructions?: PublicKey | Pda;
  recentSlothashes?: PublicKey | Pda;
  authorizationRulesProgram?: PublicKey | Pda;
  authorizationRules?: PublicKey | Pda;
};

// Data.
export type MintV2InstructionData = {
  discriminator: Array<number>;
  mintArgs: Uint8Array;
  group: Option<string>;
};

export type MintV2InstructionDataArgs = {
  mintArgs: Uint8Array;
  group: OptionOrNullable<string>;
};

/** @deprecated Use `getMintV2InstructionDataSerializer()` without any argument instead. */
export function getMintV2InstructionDataSerializer(
  _context: object
): Serializer<MintV2InstructionDataArgs, MintV2InstructionData>;
export function getMintV2InstructionDataSerializer(): Serializer<
  MintV2InstructionDataArgs,
  MintV2InstructionData
>;
export function getMintV2InstructionDataSerializer(
  _context: object = {}
): Serializer<MintV2InstructionDataArgs, MintV2InstructionData> {
  return mapSerializer<MintV2InstructionDataArgs, any, MintV2InstructionData>(
    struct<MintV2InstructionData>(
      [
        ['discriminator', array(u8(), { size: 8 })],
        ['mintArgs', bytes()],
        ['group', option(string())],
      ],
      { description: 'MintV2InstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [120, 121, 23, 146, 173, 110, 199, 205],
    })
  ) as Serializer<MintV2InstructionDataArgs, MintV2InstructionData>;
}

// Args.
export type MintV2InstructionArgs = MintV2InstructionDataArgs;

// Instruction.
export function mintV2(
  context: Pick<Context, 'programs' | 'eddsa' | 'identity' | 'payer'>,
  input: MintV2InstructionAccounts & MintV2InstructionArgs
): TransactionBuilder {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplCandyGuard',
    '364Dz7e1KReCfVyz4n6jozmcdyKAoGnZ87zLkBqCat4T'
  );

  // Resolved inputs.
  const resolvedAccounts = {
    candyMachine: [input.candyMachine, true] as const,
    nftMint: [input.nftMint, true] as const,
    collectionMint: [input.collectionMint, false] as const,
    collectionUpdateAuthority: [
      input.collectionUpdateAuthority,
      false,
    ] as const,
  };
  const resolvingArgs = {};
  addObjectProperty(
    resolvedAccounts,
    'candyGuard',
    input.candyGuard
      ? ([input.candyGuard, false] as const)
      : ([
          findCandyGuardPda(context, {
            base: publicKey(input.candyMachine, false),
          }),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'candyMachineProgram',
    input.candyMachineProgram
      ? ([input.candyMachineProgram, false] as const)
      : ([
          context.programs.getPublicKey(
            'mplCandyMachine',
            'CFzdVwhuEen1o3ZZSUkMRdx7Z4kFZKAQw9CyqKt6BFHY'
          ),
          false,
        ] as const)
  );

  addObjectProperty(
    resolvedAccounts,
    'firstCreator',
    input.firstCreator
      ? ([input.firstCreator, false] as const)
      : ([context.payer, false] as const)
  );

  addObjectProperty(
    resolvedAccounts,
    'candyMachineAuthorityPda',
    input.candyMachineAuthorityPda
      ? ([input.candyMachineAuthorityPda, true] as const)
      : ([
          findCandyMachineAuthorityPda(context, {
            candyMachine: publicKey(input.candyMachine, false),
          }),
          true,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'payer',
    input.payer
      ? ([input.payer, true] as const)
      : ([context.payer, true] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'minter',
    input.minter
      ? ([input.minter, true] as const)
      : ([context.identity, true] as const)
  );
  // addObjectProperty(
  //   resolvedAccounts,
  //   'nftMintAuthority',
  //   input.nftMintAuthority
  //     ? ([input.nftMintAuthority, false] as const)
  //     : ([context.identity, false] as const)
  // );
  addObjectProperty(
    resolvedAccounts,
    'nftMetadata',
    input.nftMetadata
      ? ([input.nftMetadata, true] as const)
      : ([
          findMetadataPda(context, { mint: publicKey(input.nftMint, false) }),
          true,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'nftMasterEdition',
    input.nftMasterEdition
      ? ([input.nftMasterEdition, true] as const)
      : ([
          findMasterEditionPda(context, {
            mint: publicKey(input.nftMint, false),
          }),
          true,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'token',
    input.token
      ? ([input.token, true] as const)
      : ([
          findAssociatedTokenPda(context, {
            mint: publicKey(input.nftMint, false),
            owner: publicKey(resolvedAccounts.minter[0], false),
          }),
          true,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'tokenRecord',
    input.tokenRecord
      ? ([input.tokenRecord, true] as const)
      : ([programId, false] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'collectionDelegateRecord',
    input.collectionDelegateRecord
      ? ([input.collectionDelegateRecord, false] as const)
      : ([
          findMetadataDelegateRecordPda(context, {
            mint: publicKey(input.collectionMint, false),
            delegateRole: MetadataDelegateRole.Collection,
            updateAuthority: publicKey(input.collectionUpdateAuthority, false),
            delegate: publicKey(
              resolvedAccounts.candyMachineAuthorityPda[0],
              false
            ),
          }),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'collectionMetadata',
    input.collectionMetadata
      ? ([input.collectionMetadata, true] as const)
      : ([
          findMetadataPda(context, {
            mint: publicKey(input.collectionMint, false),
          }),
          true,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'collectionMasterEdition',
    input.collectionMasterEdition
      ? ([input.collectionMasterEdition, false] as const)
      : ([
          findMasterEditionPda(context, {
            mint: publicKey(input.collectionMint, false),
          }),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'tokenMetadataProgram',
    input.tokenMetadataProgram
      ? ([input.tokenMetadataProgram, false] as const)
      : ([
          context.programs.getPublicKey(
            'mplTokenMetadata',
            'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
          ),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'splTokenProgram',
    input.splTokenProgram
      ? ([input.splTokenProgram, false] as const)
      : ([
          context.programs.getPublicKey(
            'splToken',
            'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
          ),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'splAtaProgram',
    input.splAtaProgram
      ? ([input.splAtaProgram, false] as const)
      : ([
          context.programs.getPublicKey(
            'splAssociatedToken',
            'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
          ),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'systemProgram',
    input.systemProgram
      ? ([input.systemProgram, false] as const)
      : ([
          context.programs.getPublicKey(
            'splSystem',
            '11111111111111111111111111111111'
          ),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'sysvarInstructions',
    input.sysvarInstructions
      ? ([input.sysvarInstructions, false] as const)
      : ([
          publicKey('Sysvar1nstructions1111111111111111111111111'),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'recentSlothashes',
    input.recentSlothashes
      ? ([input.recentSlothashes, false] as const)
      : ([
          publicKey('SysvarS1otHashes111111111111111111111111111'),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'authorizationRulesProgram',
    input.authorizationRulesProgram
      ? ([input.authorizationRulesProgram, false] as const)
      : ([programId, false] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'authorizationRules',
    input.authorizationRules
      ? ([input.authorizationRules, false] as const)
      : ([programId, false] as const)
  );
  const resolvedArgs = { ...input, ...resolvingArgs };

  addAccountMeta(keys, signers, resolvedAccounts.candyGuard, false);
  addAccountMeta(keys, signers, resolvedAccounts.candyMachineProgram, false);
  addAccountMeta(keys, signers, resolvedAccounts.candyMachine, false);
  addAccountMeta(keys, signers, resolvedAccounts.firstCreator!, false);
  addAccountMeta(
    keys,
    signers,
    resolvedAccounts.candyMachineAuthorityPda,
    false
  );

  addAccountMeta(keys, signers, resolvedAccounts.payer, false);
  addAccountMeta(keys, signers, resolvedAccounts.minter, false);
  addAccountMeta(keys, signers, resolvedAccounts.nftMint, false);
  // addAccountMeta(keys, signers, resolvedAccounts.nftMintAuthority, false);
  addAccountMeta(keys, signers, resolvedAccounts.nftMetadata, false);
  addAccountMeta(keys, signers, resolvedAccounts.nftMasterEdition, false);
  addAccountMeta(keys, signers, resolvedAccounts.token, false);
  addAccountMeta(keys, signers, resolvedAccounts.tokenRecord, false);
  addAccountMeta(
    keys,
    signers,
    resolvedAccounts.collectionDelegateRecord,
    false
  );
  addAccountMeta(keys, signers, resolvedAccounts.collectionMint, false);
  addAccountMeta(keys, signers, resolvedAccounts.collectionMetadata, false);
  addAccountMeta(
    keys,
    signers,
    resolvedAccounts.collectionMasterEdition,
    false
  );
  addAccountMeta(
    keys,
    signers,
    resolvedAccounts.collectionUpdateAuthority,
    false
  );
  addAccountMeta(keys, signers, resolvedAccounts.tokenMetadataProgram, false);
  addAccountMeta(keys, signers, resolvedAccounts.splTokenProgram, false);
  addAccountMeta(keys, signers, resolvedAccounts.splAtaProgram, false);
  addAccountMeta(keys, signers, resolvedAccounts.systemProgram, false);
  addAccountMeta(keys, signers, resolvedAccounts.sysvarInstructions, false);
  addAccountMeta(keys, signers, resolvedAccounts.recentSlothashes, false);
  addAccountMeta(
    keys,
    signers,
    resolvedAccounts.authorizationRulesProgram,
    false
  );
  addAccountMeta(keys, signers, resolvedAccounts.authorizationRules, false);

  // Data.
  const data = getMintV2InstructionDataSerializer().serialize(resolvedArgs);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
