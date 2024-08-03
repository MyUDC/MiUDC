import {
  faUser,
  faClockRotateLeft,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import UserOption from "../interfaces/UserOption";



const userOptions: UserOption[] = [
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
    href: "/user/interests",
    icon: faClockRotateLeft,
    iconColor: "text-black",
    title: "Tus intereses",
    description: "Las universidades que te interesan",
  },
];

export default userOptions;
