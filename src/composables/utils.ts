
export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
}

export const randomGibberish = () => {
  const length = randomInt(8, 20);
  const codePoints = []
  for (let i = 0; i < length; i++) {
    // code points chosen so that it somehow looks gibberish
    codePoints.push(randomInt(8000, 1200));
  }
  return String.fromCodePoint(...codePoints);
}

export const range = (max: number) => {
  return [...Array(max).keys()];
}

export const shuffle = <T>(array: T[]) => {
  const shuffled = array.slice();
  // Quick and dirty shuffle, don't do this at home
  for (let i = 0 ; i < shuffled.length ; i++) {
    const a = randomInt(0, shuffled.length);
    const b = randomInt(0, shuffled.length);
    [shuffled[a], shuffled[b]] = [shuffled[b], shuffled[a]];
  }
  return shuffled;
}
