export interface Unimplemented {
  error: string;
  args: unknown;
}

export function unimplemented<T>(_args: T): Unimplemented {
  return { error: 'Unimplemented', args: _args };
}
