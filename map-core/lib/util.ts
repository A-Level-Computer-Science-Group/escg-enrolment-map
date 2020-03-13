/**
 * Returns enum variant that matches a value if that value can be constant-initialized into the enum.
 * If the variant check fails it throws an exception.
 * This creates a safe way to serialize data to an enum.
 * @param enumList A provider of variants list. The name of the enum type you want to create can be placed here.
 * @param value The value you want to constant-initialize to the enum type.
 */
export function convertToEnum<E, V>(enumList: { [s: string]: E }, value: V): E {
  if (Object.values(enumList).includes(value as any))
    return (value as unknown) as E;
  throw `Invalid enumerator variant: "${value}". All valid variants are [${Object.values(
    enumList
  ).toString()}].`;
}
