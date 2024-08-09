
import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { UseContext } from "./auth";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    const { userDetails, setChats } = UseContext();
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        if (userDetails._id) {
            const socket = io("http://localhost:1010", { query: { userId: userDetails._id } });
            setSocket(socket);

            socket.on("getOnlineUsers", setOnlineUsers);
            socket.on("newMessage", (newMessage) => {
                setChats((prevChats) => [...prevChats, newMessage]);
            });

            socket.on("connect", () => console.log("Connected to server"));
            socket.on("disconnect", () => console.log("Disconnected from server"));

            return () => {
                socket.off("getOnlineUsers");
                socket.off("newMessage"); // Ensure this is also cleaned up
                socket.close();
            };
        }
    }, [userDetails, setChats]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};

export const UseSocketContext = () => useContext(SocketContext);
