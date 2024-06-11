import {
  faUser,
  faClockRotateLeft,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const userOptions = [
  {
    href: "",
    icon: faUser,
    iconColor: "text-black",
    title: "Editar perfil",
    description: "Edita la información de tu perfil",
  },
  {
    href: "",
    icon: faClockRotateLeft,
    iconColor: "text-black",
    title: "Tus interacciones",
    description: "Comentarios y post hechos",
  },
  {
    href: "",
    icon: faClockRotateLeft,
    iconColor: "text-black",
    title: "Tus intereses",
    description: "Las universidades que te interesan",
  },
  {
    href: "",
    icon: faSignOutAlt,
    iconColor: "text-black",
    title: "Cerrar sesión",
    description: "",
  },
];

export default userOptions;
