import { Chat } from "../../chatSection/chat";
import { OnlineUsers } from "../../onlineUserSection/onlineUser";
import { Theme } from "../../theme";

export const UserHome = () => {
    return (
        <div className="relative flex flex-col min-h-screen pt-14"> {/* Container */}
            <div className="flex flex-1 flex-col md:flex-row max-w-5xl w-full  mx-auto rounded-lg " style={{ height: '80vh' }}> {/* Fixed height */}
                
                {/* Online Users Section */}
                <div className="flex-1 md:mr-2 rounded-lg shadow-md overflow-hidden m-2">
                    <OnlineUsers />
                </div>

                <div className="hidden md:block w-px bg-gray-300 mx-2"></div> 

                {/* Chat Section */}
                <div className="flex-1 md:ml-2 rounded-lg shadow-md overflow-hidden m-2">
                    <Chat />
                </div>
            </div>

            <div className="absolute top-4 right-4"> {/* Floating position for the Theme component */}
                <Theme />
            </div>
        </div>
    );
};
