export interface SanityImage {
  _type?: string;
  asset?: {
    _ref: string;
    _type?: string;
  };
}

export interface About {
  _id: string;
  title: string;
  description: string;
  imgUrl: SanityImage;
}

export interface Work {
  _id: string;
  title: string;
  name?: string;
  description: string;
  projectLink: string;
  codeLink: string;
  imgUrl: SanityImage;
  tags: string[];
}

export interface Skill {
  _id: string;
  name: string;
  bgColor: string;
  icon: SanityImage;
}

export interface WorkExperience {
  name: string;
  company: string;
  desc: string;
}

export interface Experience {
  _id: string;
  year: string;
  works: WorkExperience[];
}

export interface Testimonial {
  _id: string;
  name: string;
  company: string;
  feedback: string;
  imgurl: SanityImage;
}

export interface Brand {
  _id: string;
  name: string;
  imgUrl: SanityImage;
}

export interface Contact {
  _type: "contact";
  name: string;
  email: string;
  message: string;
}
