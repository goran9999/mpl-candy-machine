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
  publicKey as publicKeySerializer,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';
import { addAccountMeta, addObjectProperty } from '../shared';

// Accounts.
export type SetCandyMachineAuthorityInstructionAccounts = {
  candyMachine: PublicKey | Pda;
  authority?: Signer;
};

// Data.
export type SetCandyMachineAuthorityInstructionData = {
  discriminator: Array<number>;
  newAuthority: PublicKey;
};

export type SetCandyMachineAuthorityInstructionDataArgs = {
  newAuthority: PublicKey;
};

/** @deprecated Use `getSetCandyMachineAuthorityInstructionDataSerializer()` without any argument instead. */
export function getSetCandyMachineAuthorityInstructionDataSerializer(
  _context: object
): Serializer<
  SetCandyMachineAuthorityInstructionDataArgs,
  SetCandyMachineAuthorityInstructionData
>;
export function getSetCandyMachineAuthorityInstructionDataSerializer(): Serializer<
  SetCandyMachineAuthorityInstructionDataArgs,
  SetCandyMachineAuthorityInstructionData
>;
export function getSetCandyMachineAuthorityInstructionDataSerializer(
  _context: object = {}
): Serializer<
  SetCandyMachineAuthorityInstructionDataArgs,
  SetCandyMachineAuthorityInstructionData
> {
  return mapSerializer<
    SetCandyMachineAuthorityInstructionDataArgs,
    any,
    SetCandyMachineAuthorityInstructionData
  >(
    struct<SetCandyMachineAuthorityInstructionData>(
      [
        ['discriminator', array(u8(), { size: 8 })],
        ['newAuthority', publicKeySerializer()],
      ],
      { description: 'SetCandyMachineAuthorityInstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [133, 250, 37, 21, 110, 163, 26, 121],
    })
  ) as Serializer<
    SetCandyMachineAuthorityInstructionDataArgs,
    SetCandyMachineAuthorityInstructionData
  >;
}

// Args.
export type SetCandyMachineAuthorityInstructionArgs =
  SetCandyMachineAuthorityInstructionDataArgs;

// Instruction.
export function setCandyMachineAuthority(
  context: Pick<Context, 'programs' | 'identity'>,
  input: SetCandyMachineAuthorityInstructionAccounts &
    SetCandyMachineAuthorityInstructionArgs
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
    getSetCandyMachineAuthorityInstructionDataSerializer().serialize(
      resolvedArgs
    );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
