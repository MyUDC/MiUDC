interface Interests {
  title: string;
  location: string;
  imageUrl: string;
  notifications: number;
}

const interests: Interests[] = [
  {
    title: "Mercadotecnia",
    location: "Campus central",
    imageUrl: "/svgs/logo-full.svg",
    notifications: 3,
  },
  {
    title: "Arquitectura",
    location: "FIME",
    imageUrl: "/svgs/logo-full.svg",
    notifications: 2,
  },
  {
    title: "Ingeniería de Software",
    location: "Telemática",
    imageUrl: "/svgs/logo-full.svg",
    notifications: 0,
  },
];

export default interests;
