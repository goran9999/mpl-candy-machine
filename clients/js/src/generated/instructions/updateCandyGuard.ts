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
  bytes,
  mapSerializer,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';
import { addAccountMeta, addObjectProperty } from '../shared';

// Accounts.
export type UpdateCandyGuardInstructionAccounts = {
  candyGuard: PublicKey | Pda;
  authority?: Signer;
  payer?: Signer;
  systemProgram?: PublicKey | Pda;
};

// Data.
export type UpdateCandyGuardInstructionData = {
  discriminator: Array<number>;
  data: Uint8Array;
};

export type UpdateCandyGuardInstructionDataArgs = { data: Uint8Array };

/** @deprecated Use `getUpdateCandyGuardInstructionDataSerializer()` without any argument instead. */
export function getUpdateCandyGuardInstructionDataSerializer(
  _context: object
): Serializer<
  UpdateCandyGuardInstructionDataArgs,
  UpdateCandyGuardInstructionData
>;
export function getUpdateCandyGuardInstructionDataSerializer(): Serializer<
  UpdateCandyGuardInstructionDataArgs,
  UpdateCandyGuardInstructionData
>;
export function getUpdateCandyGuardInstructionDataSerializer(
  _context: object = {}
): Serializer<
  UpdateCandyGuardInstructionDataArgs,
  UpdateCandyGuardInstructionData
> {
  return mapSerializer<
    UpdateCandyGuardInstructionDataArgs,
    any,
    UpdateCandyGuardInstructionData
  >(
    struct<UpdateCandyGuardInstructionData>(
      [
        ['discriminator', array(u8(), { size: 8 })],
        ['data', bytes()],
      ],
      { description: 'UpdateCandyGuardInstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [219, 200, 88, 176, 158, 63, 253, 127],
    })
  ) as Serializer<
    UpdateCandyGuardInstructionDataArgs,
    UpdateCandyGuardInstructionData
  >;
}

// Args.
export type UpdateCandyGuardInstructionArgs =
  UpdateCandyGuardInstructionDataArgs;

// Instruction.
export function updateCandyGuard(
  context: Pick<Context, 'programs' | 'identity' | 'payer'>,
  input: UpdateCandyGuardInstructionAccounts & UpdateCandyGuardInstructionArgs
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
    candyGuard: [input.candyGuard, true] as const,
  };
  const resolvingArgs = {};
  addObjectProperty(
    resolvedAccounts,
    'authority',
    input.authority
      ? ([input.authority, false] as const)
      : ([context.identity, false] as const)
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

  addAccountMeta(keys, signers, resolvedAccounts.candyGuard, false);
  addAccountMeta(keys, signers, resolvedAccounts.authority, false);
  addAccountMeta(keys, signers, resolvedAccounts.payer, false);
  addAccountMeta(keys, signers, resolvedAccounts.systemProgram, false);

  // Data.
  const data =
    getUpdateCandyGuardInstructionDataSerializer().serialize(resolvedArgs);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
