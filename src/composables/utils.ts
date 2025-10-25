export type RecursivePartial<T> = {
  [P in keyof T]?:
  T[P] extends (infer U)[] ? RecursivePartial<U>[]
    : T[P] extends object | undefined ? RecursivePartial<T[P]>
      : T[P];
};

export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const randomGibberish = () => {
  const length = randomInt(8, 20);
  const codePoints = [];
  for (let i = 0; i < length; i++) {
    // code points chosen so that it somehow looks gibberish
    codePoints.push(randomInt(8000, 1200));
  }
  return String.fromCodePoint(...codePoints);
};

export const range = (max: number) => {
  return [...Array.from({ length: max }).keys()];
};

export const shuffle = <T>(array: T[]) => {
  const shuffled = array.slice();
  // Quick and dirty shuffle, don't do this at home
  for (let i = 0; i < shuffled.length; i++) {
    const a = randomInt(0, shuffled.length);
    const b = randomInt(0, shuffled.length);
    [shuffled[a], shuffled[b]] = [shuffled[b], shuffled[a]] as [T, T];
  }
  return shuffled;
};

export const formatStorage = (bytes: number) => {
  if (bytes < 0) throw new Error('Value must be non-negative');
  if (bytes === 0) return '0B';

  const units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB'];

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / 1024 ** i;
  const unit = units[i];
  return `${Number.parseFloat(value.toFixed(1))}${unit}`;
};
