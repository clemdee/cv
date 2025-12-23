/*
 * MERGE SHALLOW
 */

type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

type OptionalPropertyNames<T>
  = { [K in keyof T]-?: (object extends { [P in K]: T[K] } ? K : never) }[keyof T];

type SpreadProperties<L, R, K extends keyof L & keyof R>
  = { [P in K]: L[P] | Exclude<R[P], undefined> };

type SpreadTwo<L, R> = Id<
  & Pick<L, Exclude<keyof L, keyof R>>
  & Pick<R, Exclude<keyof R, OptionalPropertyNames<R>>>
  & Pick<R, Exclude<OptionalPropertyNames<R>, keyof L>>
  & SpreadProperties<L, R, OptionalPropertyNames<R> & keyof L>
>;

type Spread<A extends readonly [...any]> = A extends [infer L, ...infer R]
  ? SpreadTwo<L, Spread<R>> : unknown;

export const mergeShallow = <A extends object[]>(...a: [...A]) => {
  return Object.assign({}, ...a) as Spread<A>;
};

// const mergedShallow = mergeShallow(
//   { a: 42 } as const,
//   { b: 'foo', a: 'bar' } as const,
//   { c: true, b: 123 } as const,
// );

// /*
// const mergedShallow: {
//   readonly a: "bar";
//   readonly b: 123;
//   readonly c: true;
// }
// */

/*
 * MERGE DEEP
 */

type IfEquals<X, Y, A = X, B = never>
  = (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2)
    ? A
    : B;

type ReadonlyKeys<T> = {
  [K in keyof T]-?: IfEquals<
    { [P in K]: T[K] },
    { -readonly [P in K]: T[K] },
    never,
    K
  >
}[keyof T];

type Primitive
  = | string
    | number
    | boolean
    | bigint
    | symbol
    | null
    | undefined;

type IsObject<T>
  = T extends Primitive ? false
    : T extends any[] ? false
      : T extends object ? true : false;

type MergeValue<L, R, K extends PropertyKey>
  = K extends keyof R
    ? K extends keyof L
      ? IsObject<L[K]> extends true
        ? IsObject<R[K]> extends true
          ? DeepMergeTwo<L[K], R[K]>
          : R[K]
        : R[K]
      : R[K]
    : K extends keyof L
      ? L[K]
      : never;

type ResultReadonlyKeys<L, R>
  = | ReadonlyKeys<L>
    | ReadonlyKeys<R>;

type DeepMergeTwo<L, R> = Id<
  // readonly part
  {
    readonly [K in keyof L | keyof R as
    K extends ResultReadonlyKeys<L, R> ? K : never
    ]: MergeValue<L, R, K>
  }
  // mutable part
  & {
    [K in keyof L | keyof R as
    K extends ResultReadonlyKeys<L, R> ? never : K
    ]: MergeValue<L, R, K>
  }
>;

type DeepMerge<A extends readonly any[]>
  = A extends [infer L, ...infer R]
    ? DeepMergeTwo<L, DeepMerge<R>>
    : unknown;

export const mergeDeep = <A extends (object | undefined)[]>(...a: [...A]) => {
  const result: any = {};

  for (const obj of a) {
    for (const key in obj) {
      const prev = result[key];
      const next = (obj as any)[key];

      if (
        prev
        && next
        && typeof prev === 'object'
        && typeof next === 'object'
        && !Array.isArray(prev)
        && !Array.isArray(next)
      ) {
        result[key] = mergeDeep(prev, next);
      }
      else {
        result[key] = next;
      }
    }
  }

  return result as DeepMerge<A>;
};

// const mergedDeep = mergeDeep(
//   { a: { deep: 42, another: 1 } } as const,
//   { b: 'foo', a: { deep: 'bar' } } as const,
//   { c: true, b: { bbb: 123 } } as const,
// );

// /*
// const mergedDeep: {
//   readonly b: {
//     readonly bbb: 123;
//   };
//   readonly c: true;
//   readonly a: {
//     readonly deep: "bar";
//     readonly another: 1;
//   };
// }
// */
