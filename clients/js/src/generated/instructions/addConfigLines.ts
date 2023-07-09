/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  AccountMeta,
  Context,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  array,
  mapSerializer,
  struct,
  u32,
  u8,
} from '@metaplex-foundation/umi/serializers';
import { addAccountMeta, addObjectProperty } from '../shared';
import { ConfigLine, ConfigLineArgs, getConfigLineSerializer } from '../types';

// Accounts.
export type AddConfigLinesInstructionAccounts = {
  candyMachine: PublicKey | Pda;
  authority?: Signer;
};

// Data.
export type AddConfigLinesInstructionData = {
  discriminator: Array<number>;
  index: number;
  configLines: Array<ConfigLine>;
};

export type AddConfigLinesInstructionDataArgs = {
  index: number;
  configLines: Array<ConfigLineArgs>;
};

/** @deprecated Use `getAddConfigLinesInstructionDataSerializer()` without any argument instead. */
export function getAddConfigLinesInstructionDataSerializer(
  _context: object
): Serializer<AddConfigLinesInstructionDataArgs, AddConfigLinesInstructionData>;
export function getAddConfigLinesInstructionDataSerializer(): Serializer<
  AddConfigLinesInstructionDataArgs,
  AddConfigLinesInstructionData
>;
export function getAddConfigLinesInstructionDataSerializer(
  _context: object = {}
): Serializer<
  AddConfigLinesInstructionDataArgs,
  AddConfigLinesInstructionData
> {
  return mapSerializer<
    AddConfigLinesInstructionDataArgs,
    any,
    AddConfigLinesInstructionData
  >(
    struct<AddConfigLinesInstructionData>(
      [
        ['discriminator', array(u8(), { size: 8 })],
        ['index', u32()],
        ['configLines', array(getConfigLineSerializer())],
      ],
      { description: 'AddConfigLinesInstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [223, 50, 224, 227, 151, 8, 115, 106],
    })
  ) as Serializer<
    AddConfigLinesInstructionDataArgs,
    AddConfigLinesInstructionData
  >;
}

// Args.
export type AddConfigLinesInstructionArgs = AddConfigLinesInstructionDataArgs;

// Instruction.
export function addConfigLines(
  context: Pick<Context, 'programs' | 'identity'>,
  input: AddConfigLinesInstructionAccounts & AddConfigLinesInstructionArgs
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
  };
  const resolvingArgs = {};
  addObjectProperty(
    resolvedAccounts,
    'authority',
    input.authority
      ? ([input.authority, false] as const)
      : ([context.identity, false] as const)
  );
  const resolvedArgs = { ...input, ...resolvingArgs };

  addAccountMeta(keys, signers, resolvedAccounts.candyMachine, false);
  addAccountMeta(keys, signers, resolvedAccounts.authority, false);

  // Data.
  const data =
    getAddConfigLinesInstructionDataSerializer().serialize(resolvedArgs);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
