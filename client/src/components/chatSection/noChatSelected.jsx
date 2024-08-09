import React, { useEffect } from 'react';
import { UseContext } from '../../storage/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-solid-svg-icons';
import { PiHandWavingFill } from "react-icons/pi";
import { BsFillChatDotsFill } from "react-icons/bs";

export const NoChatSelected = () => {
    const { userDetails } = UseContext();

    return (
        <div className="flex items-center justify-center flex-1 pl-0 md:pl-4 scrollbar md:bg-opacity-10 rounded-lg shadow-md md:shadow-none">
            <div className="text-center sm:text-lg md:text-xl text-gray-500 font-semibold flex flex-col items-center gap-2 m-3">
                <PiHandWavingFill className="text-4xl" /> {/* Increase size using Tailwind */}
                <p>Welcome <FontAwesomeIcon icon={faSmile} className="text-orange-500 text-2xl" /> {userDetails.uname} </p>
                <p>Select a chat to start messaging</p>
                <BsFillChatDotsFill className="text-4xl" /> {/* Increase size using Tailwind */}
            </div>
        </div>
    );
};
