/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Account,
  Context,
  Pda,
  PublicKey,
  RpcAccount,
  RpcGetAccountOptions,
  RpcGetAccountsOptions,
  assertAccountExists,
  deserializeAccount,
  gpaBuilder,
  publicKey as toPublicKey,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  publicKey as publicKeySerializer,
  string,
  struct,
  u32,
  u8,
} from '@metaplex-foundation/umi/serializers';

/** PDA to track the number of mints. */
export type AllocationTracker = Account<AllocationTrackerAccountData>;

export type AllocationTrackerAccountData = { count: number };

export type AllocationTrackerAccountDataArgs = AllocationTrackerAccountData;

/** @deprecated Use `getAllocationTrackerAccountDataSerializer()` without any argument instead. */
export function getAllocationTrackerAccountDataSerializer(
  _context: object
): Serializer<AllocationTrackerAccountDataArgs, AllocationTrackerAccountData>;
export function getAllocationTrackerAccountDataSerializer(): Serializer<
  AllocationTrackerAccountDataArgs,
  AllocationTrackerAccountData
>;
export function getAllocationTrackerAccountDataSerializer(
  _context: object = {}
): Serializer<AllocationTrackerAccountDataArgs, AllocationTrackerAccountData> {
  return struct<AllocationTrackerAccountData>([['count', u32()]], {
    description: 'AllocationTrackerAccountData',
  }) as Serializer<
    AllocationTrackerAccountDataArgs,
    AllocationTrackerAccountData
  >;
}

/** @deprecated Use `deserializeAllocationTracker(rawAccount)` without any context instead. */
export function deserializeAllocationTracker(
  context: object,
  rawAccount: RpcAccount
): AllocationTracker;
export function deserializeAllocationTracker(
  rawAccount: RpcAccount
): AllocationTracker;
export function deserializeAllocationTracker(
  context: RpcAccount | object,
  rawAccount?: RpcAccount
): AllocationTracker {
  return deserializeAccount(
    rawAccount ?? (context as RpcAccount),
    getAllocationTrackerAccountDataSerializer()
  );
}

export async function fetchAllocationTracker(
  context: Pick<Context, 'rpc'>,
  publicKey: PublicKey | Pda,
  options?: RpcGetAccountOptions
): Promise<AllocationTracker> {
  const maybeAccount = await context.rpc.getAccount(
    toPublicKey(publicKey, false),
    options
  );
  assertAccountExists(maybeAccount, 'AllocationTracker');
  return deserializeAllocationTracker(maybeAccount);
}

export async function safeFetchAllocationTracker(
  context: Pick<Context, 'rpc'>,
  publicKey: PublicKey | Pda,
  options?: RpcGetAccountOptions
): Promise<AllocationTracker | null> {
  const maybeAccount = await context.rpc.getAccount(
    toPublicKey(publicKey, false),
    options
  );
  return maybeAccount.exists
    ? deserializeAllocationTracker(maybeAccount)
    : null;
}

export async function fetchAllAllocationTracker(
  context: Pick<Context, 'rpc'>,
  publicKeys: Array<PublicKey | Pda>,
  options?: RpcGetAccountsOptions
): Promise<AllocationTracker[]> {
  const maybeAccounts = await context.rpc.getAccounts(
    publicKeys.map((key) => toPublicKey(key, false)),
    options
  );
  return maybeAccounts.map((maybeAccount) => {
    assertAccountExists(maybeAccount, 'AllocationTracker');
    return deserializeAllocationTracker(maybeAccount);
  });
}

export async function safeFetchAllAllocationTracker(
  context: Pick<Context, 'rpc'>,
  publicKeys: Array<PublicKey | Pda>,
  options?: RpcGetAccountsOptions
): Promise<AllocationTracker[]> {
  const maybeAccounts = await context.rpc.getAccounts(
    publicKeys.map((key) => toPublicKey(key, false)),
    options
  );
  return maybeAccounts
    .filter((maybeAccount) => maybeAccount.exists)
    .map((maybeAccount) =>
      deserializeAllocationTracker(maybeAccount as RpcAccount)
    );
}

export function getAllocationTrackerGpaBuilder(
  context: Pick<Context, 'rpc' | 'programs'>
) {
  const programId = context.programs.getPublicKey(
    'mplCandyGuard',
    '364Dz7e1KReCfVyz4n6jozmcdyKAoGnZ87zLkBqCat4T'
  );
  return gpaBuilder(context, programId)
    .registerFields<{ count: number }>({ count: [0, u32()] })
    .deserializeUsing<AllocationTracker>((account) =>
      deserializeAllocationTracker(account)
    )
    .whereSize(4);
}

export function getAllocationTrackerSize(): number {
  return 4;
}

export function findAllocationTrackerPda(
  context: Pick<Context, 'eddsa' | 'programs'>,
  seeds: {
    /** Unique identifier of the allocation */
    id: number;
    /** The address of the Candy Guard account */
    candyGuard: PublicKey;
    /** The address of the Candy Machine account */
    candyMachine: PublicKey;
  }
): Pda {
  const programId = context.programs.getPublicKey(
    'mplCandyGuard',
    '364Dz7e1KReCfVyz4n6jozmcdyKAoGnZ87zLkBqCat4T'
  );
  return context.eddsa.findPda(programId, [
    string({ size: 'variable' }).serialize('allocation'),
    u8().serialize(seeds.id),
    publicKeySerializer().serialize(seeds.candyGuard),
    publicKeySerializer().serialize(seeds.candyMachine),
  ]);
}

export async function fetchAllocationTrackerFromSeeds(
  context: Pick<Context, 'eddsa' | 'programs' | 'rpc'>,
  seeds: Parameters<typeof findAllocationTrackerPda>[1],
  options?: RpcGetAccountOptions
): Promise<AllocationTracker> {
  return fetchAllocationTracker(
    context,
    findAllocationTrackerPda(context, seeds),
    options
  );
}

export async function safeFetchAllocationTrackerFromSeeds(
  context: Pick<Context, 'eddsa' | 'programs' | 'rpc'>,
  seeds: Parameters<typeof findAllocationTrackerPda>[1],
  options?: RpcGetAccountOptions
): Promise<AllocationTracker | null> {
  return safeFetchAllocationTracker(
    context,
    findAllocationTrackerPda(context, seeds),
    options
  );
}
