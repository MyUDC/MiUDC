'use client';

import { faChevronRight, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { SignOut } from '../actions';

export const SignOutButton = () => {
  const router = useRouter();
  
  
  return (
    <div onClick={() => {
      console.log(process.env.NODE_ENV);
      SignOut();
      router.refresh();
    }} className="cursor-pointer mb-5 w-full">
      <div className="flex justify-between items-center px-4 mb-4">
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faSignOutAlt}
            className={`mr-3 w-6 h-6 text-black`}
          />
          <div>
            <div className="text-lg font-bold text-black">Cerrar sesión</div>
          </div>
        </div>
        <FontAwesomeIcon
          icon={faChevronRight}
          className="w-4 h-4 text-gray-700"
        />
      </div>
      <div className="border-t border-gray-300"></div>
    </div>
  )
}
