export type ChapterId = string;

export type Chapter = {
  id: ChapterId;
  number: string;
  title: string;
  blurb: string;
  section: string;
  minutes: number;
};

export type Os = "mac" | "win";
