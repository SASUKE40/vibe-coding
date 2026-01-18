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

export type BulletItem = {
  text: string;
  icon?: string;
};

export type StandardSlide = BaseSlide & {
  type: "standard";
  bullets: BulletItem[];
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
    icon?: string;
    bullets: BulletItem[];
  };
  right: {
    heading?: string;
    icon?: string;
    bullets: BulletItem[];
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
