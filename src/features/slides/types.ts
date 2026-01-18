export type SlideType = "title" | "standard" | "code" | "split" | "quote" | "image";

export type BaseSlide = {
  id: number;
  title: string;
  type: SlideType;
};

export type TitleSlide = BaseSlide & {
  type: "title";
  subtitle?: string;
};

export type StandardSlide = BaseSlide & {
  type: "standard";
  bullets: string[];
};

export type CodeSlide = BaseSlide & {
  type: "code";
  description?: string;
  code: string;
  language: string;
};

export type SplitSlide = BaseSlide & {
  type: "split";
  left: {
    heading?: string;
    bullets: string[];
  };
  right: {
    heading?: string;
    bullets: string[];
  };
};

export type QuoteSlide = BaseSlide & {
  type: "quote";
  quote: string;
  attribution?: string;
};

export type ImageSlide = BaseSlide & {
  type: "image";
  imageUrl: string;
  caption?: string;
  source?: string;
};

export type Slide =
  | TitleSlide
  | StandardSlide
  | CodeSlide
  | SplitSlide
  | QuoteSlide
  | ImageSlide;

export type SlideNavigation = {
  currentSlide: number;
  totalSlides: number;
  goToSlide: (n: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  goToFirst: () => void;
  goToLast: () => void;
};
