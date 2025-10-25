
export const frames = {
  square: { borderRadius: '0rem' },
  roundedHalf: { borderRadius: '1rem 0rem 1rem 0rem' },
  roundedHalf2: { borderRadius: '0rem 1rem 0rem 1rem' },
  rounded: { borderRadius: '1rem' },
  circle: { borderRadius: '100%' },
  none: { borderStyle: 'none' },
};

export type ProfileFrames = keyof typeof frames;
