/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  findCollectionAuthorityRecordPda,
  findMasterEditionPda,
  findMetadataPda,
} from '@metaplex-foundation/mpl-token-metadata';
import {
  AccountMeta,
  Amount,
  Context,
  Option,
  OptionOrNullable,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  mapAmountSerializer,
  none,
  publicKey,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  array,
  bool,
  mapSerializer,
  option,
  string,
  struct,
  u16,
  u64,
  u8,
} from '@metaplex-foundation/umi/serializers';
import { findCandyMachineAuthorityPda } from '../../hooked';
import { addAccountMeta, addObjectProperty } from '../shared';
import {
  ConfigLineSettings,
  ConfigLineSettingsArgs,
  Creator,
  CreatorArgs,
  HiddenSettings,
  HiddenSettingsArgs,
  getConfigLineSettingsSerializer,
  getCreatorSerializer,
  getHiddenSettingsSerializer,
} from '../types';

// Accounts.
export type InitializeCandyMachineInstructionAccounts = {
  candyMachine: PublicKey | Pda;
  authorityPda?: PublicKey | Pda;
  authority?: PublicKey | Pda;
  payer?: Signer;
  collectionMetadata?: PublicKey | Pda;
  collectionMint: PublicKey | Pda;
  collectionMasterEdition?: PublicKey | Pda;
  collectionUpdateAuthority: Signer;
  collectionAuthorityRecord?: PublicKey | Pda;
  tokenMetadataProgram?: PublicKey | Pda;
  systemProgram?: PublicKey | Pda;
};

// Data.
export type InitializeCandyMachineInstructionData = {
  discriminator: Array<number>;
  /** Number of assets available */
  itemsAvailable: bigint;
  /** Symbol for the asset */
  symbol: string;
  /** Secondary sales royalty basis points (0-10000) */
  sellerFeeBasisPoints: Amount<'%', 2>;
  /** Max supply of each individual asset (default 0) */
  maxEditionSupply: bigint;
  /** Indicates if the asset is mutable or not (default yes) */
  isMutable: boolean;
  /** List of creators */
  creators: Array<Creator>;
  /** Config line settings */
  configLineSettings: Option<ConfigLineSettings>;
  /** Hidden setttings */
  hiddenSettings: Option<HiddenSettings>;
};

export type InitializeCandyMachineInstructionDataArgs = {
  /** Number of assets available */
  itemsAvailable: number | bigint;
  /** Symbol for the asset */
  symbol?: string;
  /** Secondary sales royalty basis points (0-10000) */
  sellerFeeBasisPoints: Amount<'%', 2>;
  /** Max supply of each individual asset (default 0) */
  maxEditionSupply?: number | bigint;
  /** Indicates if the asset is mutable or not (default yes) */
  isMutable?: boolean;
  /** List of creators */
  creators: Array<CreatorArgs>;
  /** Config line settings */
  configLineSettings?: OptionOrNullable<ConfigLineSettingsArgs>;
  /** Hidden setttings */
  hiddenSettings?: OptionOrNullable<HiddenSettingsArgs>;
};

/** @deprecated Use `getInitializeCandyMachineInstructionDataSerializer()` without any argument instead. */
export function getInitializeCandyMachineInstructionDataSerializer(
  _context: object
): Serializer<
  InitializeCandyMachineInstructionDataArgs,
  InitializeCandyMachineInstructionData
>;
export function getInitializeCandyMachineInstructionDataSerializer(): Serializer<
  InitializeCandyMachineInstructionDataArgs,
  InitializeCandyMachineInstructionData
>;
export function getInitializeCandyMachineInstructionDataSerializer(
  _context: object = {}
): Serializer<
  InitializeCandyMachineInstructionDataArgs,
  InitializeCandyMachineInstructionData
> {
  return mapSerializer<
    InitializeCandyMachineInstructionDataArgs,
    any,
    InitializeCandyMachineInstructionData
  >(
    struct<InitializeCandyMachineInstructionData>(
      [
        ['discriminator', array(u8(), { size: 8 })],
        ['itemsAvailable', u64()],
        ['symbol', string()],
        ['sellerFeeBasisPoints', mapAmountSerializer(u16(), '%', 2)],
        ['maxEditionSupply', u64()],
        ['isMutable', bool()],
        ['creators', array(getCreatorSerializer())],
        ['configLineSettings', option(getConfigLineSettingsSerializer())],
        ['hiddenSettings', option(getHiddenSettingsSerializer())],
      ],
      { description: 'InitializeCandyMachineInstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237],
      symbol: value.symbol ?? '',
      maxEditionSupply: value.maxEditionSupply ?? 0,
      isMutable: value.isMutable ?? true,
      configLineSettings: value.configLineSettings ?? none(),
      hiddenSettings: value.hiddenSettings ?? none(),
    })
  ) as Serializer<
    InitializeCandyMachineInstructionDataArgs,
    InitializeCandyMachineInstructionData
  >;
}

// Args.
export type InitializeCandyMachineInstructionArgs =
  InitializeCandyMachineInstructionDataArgs;

// Instruction.
export function initializeCandyMachine(
  context: Pick<Context, 'programs' | 'eddsa' | 'identity' | 'payer'>,
  input: InitializeCandyMachineInstructionAccounts &
    InitializeCandyMachineInstructionArgs
): TransactionBuilder {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplCandyMachineCore',
    'CFzdVwhuEen1o3ZZSUkMRdx7Z4kFZKAQw9CyqKt6BFHY'
  );

  // Resolved inputs.
  const resolvedAccounts = {
    candyMachine: [input.candyMachine, true] as const,
    collectionMint: [input.collectionMint, false] as const,
    collectionUpdateAuthority: [input.collectionUpdateAuthority, true] as const,
  };
  const resolvingArgs = {};
  addObjectProperty(
    resolvedAccounts,
    'authorityPda',
    input.authorityPda
      ? ([input.authorityPda, true] as const)
      : ([
          findCandyMachineAuthorityPda(context, {
            candyMachine: publicKey(input.candyMachine, false),
          }),
          true,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'authority',
    input.authority
      ? ([input.authority, false] as const)
      : ([context.identity.publicKey, false] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'payer',
    input.payer
      ? ([input.payer, false] as const)
      : ([context.payer, false] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'collectionMetadata',
    input.collectionMetadata
      ? ([input.collectionMetadata, false] as const)
      : ([
          findMetadataPda(context, {
            mint: publicKey(input.collectionMint, false),
          }),
          false,
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
    'collectionAuthorityRecord',
    input.collectionAuthorityRecord
      ? ([input.collectionAuthorityRecord, true] as const)
      : ([
          findCollectionAuthorityRecordPda(context, {
            mint: publicKey(input.collectionMint, false),
            collectionAuthority: publicKey(
              resolvedAccounts.authorityPda[0],
              false
            ),
          }),
          true,
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
  const resolvedArgs = { ...input, ...resolvingArgs };

  addAccountMeta(keys, signers, resolvedAccounts.candyMachine, false);
  addAccountMeta(keys, signers, resolvedAccounts.authorityPda, false);
  addAccountMeta(keys, signers, resolvedAccounts.authority, false);
  addAccountMeta(keys, signers, resolvedAccounts.payer, false);
  addAccountMeta(keys, signers, resolvedAccounts.collectionMetadata, false);
  addAccountMeta(keys, signers, resolvedAccounts.collectionMint, false);
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
  addAccountMeta(
    keys,
    signers,
    resolvedAccounts.collectionAuthorityRecord,
    false
  );
  addAccountMeta(keys, signers, resolvedAccounts.tokenMetadataProgram, false);
  addAccountMeta(keys, signers, resolvedAccounts.systemProgram, false);

  // Data.
  const data =
    getInitializeCandyMachineInstructionDataSerializer().serialize(
      resolvedArgs
    );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
