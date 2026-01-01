export interface Difficulty {
  start: number;
  end: number;
}

export interface Track {
  value: number;
  label: string;
  src: string;
  headshot: string;
  difficulty: Difficulty[];
}
