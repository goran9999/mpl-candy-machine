/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  DateTime,
  DateTimeInput,
  mapDateTimeSerializer,
} from '@metaplex-foundation/umi';
import { Serializer, i64, struct } from '@metaplex-foundation/umi/serializers';

/** Guard that sets a specific start date for the mint. */
export type StartDate = { date: DateTime };

export type StartDateArgs = { date: DateTimeInput };

/** @deprecated Use `getStartDateSerializer()` without any argument instead. */
export function getStartDateSerializer(
  _context: object
): Serializer<StartDateArgs, StartDate>;
export function getStartDateSerializer(): Serializer<StartDateArgs, StartDate>;
export function getStartDateSerializer(
  _context: object = {}
): Serializer<StartDateArgs, StartDate> {
  return struct<StartDate>([['date', mapDateTimeSerializer(i64())]], {
    description: 'StartDate',
  }) as Serializer<StartDateArgs, StartDate>;
}
