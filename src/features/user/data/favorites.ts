interface Favorites {
  title: string;
  location: string;
  imageUrl: string;
  notifications: number;
  category: string; // Nueva propiedad
}

const favorites: Favorites[] = [
  {
    title: "Licenciatura en Mercadotecnia",
    location: "Campus central",
    imageUrl: "/telematica.jpg",
    notifications: 3,
    category: "licenciaturas",
  },
  {
    title: "Arquitectura",
    location: "FIME",
    imageUrl: "/telematica.jpg",
    notifications: 2,
    category: "licenciaturas",
  },
  {
    title: "Ingeniería de Software",
    location: "Telemática",
    imageUrl: "/telematica.jpg",
    notifications: 0,
    category: "ingenierias",
  },
];

export default favorites;
