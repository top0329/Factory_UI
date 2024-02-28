export interface IButtonClass {
  name: string;
  style: string;
}

export interface WindowSize {
  width?: number;
  height?: number;
}

export type CarouselModel = {
  headerText?: string | null;
  subText?: string | null;
  image: string;
};
