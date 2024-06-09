import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faUser,
  faClock,
  faSignOutAlt,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function UserPage() {
  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      <div className="bg-green relative mb-4 flex flex-col p-8 w-full">
        <Link href="">
          <FontAwesomeIcon
            icon={faTimes}
            className="mb-8 self-start w-8 h-8 text-white"
          />
        </Link>
        <div className="flex items-center">
          <div className="rounded-full bg-gray-300 mr-4 w-12 h-12"></div>
          <div className="text-lg font-bold text-white">Eduardo Chacón</div>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <Link href="">
          <div className="mb-5 w-full">
            <div className="flex justify-between items-center px-4 mb-4">
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faUser}
                  className="mr-3 w-6 h-6 text-black"
                />
                <div>
                  <div className="text-lg font-bold text-black">
                    Editar perfil
                  </div>
                  <span className="text-lg text-gray-500">
                    Edita la información de tu perfil
                  </span>
                </div>
              </div>
              <FontAwesomeIcon
                icon={faChevronRight}
                className="w-4 h-4 text-gray-700"
              />
            </div>
            <div className="border-t border-gray-300"></div>
          </div>
        </Link>
        <Link href="">
          <div className="mb-5 w-full">
            <div className="flex justify-between items-center px-4 mb-4">
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faClock}
                  className="mr-4 w-5 h-5 text-black"
                />
                <div>
                  <div className="text-lg font-bold text-black">
                    Tus interacciones
                  </div>
                  <span className="text-lg text-gray-500">
                    Comentarios y post hechos
                  </span>
                </div>
              </div>
              <FontAwesomeIcon
                icon={faChevronRight}
                className="w-4 h-4 text-gray-700"
              />
            </div>
            <div className="border-t border-gray-300"></div>
          </div>
        </Link>
        <Link href="">
          <div className="mb-5 w-full">
            <div className="flex items-center px-4 mb-4">
              <FontAwesomeIcon
                icon={faClock}
                className="mr-4 w-5 h-5 text-black"
              />
              <div className="flex-grow">
                <div className="text-lg font-bold text-black">
                  Tus intereses
                </div>
                <span className="text-lg text-gray-500">
                  Las universidades que te interesan
                </span>
              </div>
              <FontAwesomeIcon
                icon={faChevronRight}
                className="w-4 h-4 text-gray-700"
              />
            </div>
            <div className="border-t border-gray-300"></div>
          </div>
        </Link>
        <Link href="">
          <div className="mb-5 w-full">
            <div className="flex justify-between items-center px-4 mb-4">
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  className="mr-3 w-6 h-6 text-black"
                />
                <div className="text-lg font-bold text-black">
                  Cerrar sesión
                </div>
              </div>
              <FontAwesomeIcon
                icon={faChevronRight}
                className="w-4 h-4 text-gray-700"
              />
            </div>
            <div className="border-t border-gray-300"></div>
          </div>
        </Link>
      </div>
    </div>
  );
}
