import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const StoreTokenInLs = (jwt) => {
        setToken(jwt);
        localStorage.setItem("jwt", jwt);
    };

    const [token, setToken] = useState(localStorage.getItem("jwt"));
    const [allusers, setAllusers] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [chats, setChats] = useState([]);
    const [SelectedUserDetails, setSelectedUserDetails]= useState({});

    const tokenAuthorization = `Bearer ${token}`;
    const isUserLogin = !!token;

    const logoutUser = () => {
        try {
            setToken("");
            setUserDetails({});
            setChats([]);
            setSelectedUserDetails("");
            localStorage.removeItem("jwt");
        } catch (err) {
            console.error("Error during logout:", err);
        }
    };

    const userAuthentication = async () => {
        try {
            const response = await fetch("http://localhost:1010/api/auth/user/details", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": tokenAuthorization
                }
            });

            if (response.ok) {
                const details = await response.json();
                setUserDetails(details);
            } else {
                const errorData = await response.json();
                console.error("Error fetching user details:", errorData.msg);
                // Optional: Provide feedback to user
            }
        } catch (err) {
            console.error("Error during user authentication:", err);
            // Optional: Provide feedback to user
        }
    };

    const getAllUsers = async () => {
        try {
            const response = await fetch("http://localhost:1010/api/user/getAllUsers", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": tokenAuthorization
                }
            });

            if (response.ok) {
                const data = await response.json();
                setAllusers(data);
            } else {
                const errorData = await response.json();
                console.error("Error fetching all users:", errorData);
                // Optional: Provide feedback to user
            }
        } catch (err) {
            console.error("Error during fetching all users:", err);
            // Optional: Provide feedback to user
        }
    };

    const getChat = async (userId) => {
        try {
            const response = await fetch(`http://localhost:1010/api/message/get/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": tokenAuthorization
                }
            });

            if (response.ok) {
                const chat = await response.json();
                setChats(chat);
            } else {
                console.error("Chat not found");
                // Optional: Provide feedback to user
            }
        } catch (err) {
            console.error("Error during fetching chat:", err);
            // Optional: Provide feedback to user
        }
    };

    const getSelectedUserDetails= (user) =>{
        try{
            setSelectedUserDetails(user);
        }catch(err){
            console.log(err);
        }
    }

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { hour: '2-digit', minute: '2-digit' };
    
        const formattedDate = date.toLocaleDateString(undefined, dateOptions);
        const formattedTime = date.toLocaleTimeString([], timeOptions);
    
        return `${formattedDate} ${formattedTime}`;
    };

    return (
        <AuthContext.Provider value={{
            tokenAuthorization,
            isUserLogin,
            StoreTokenInLs,
            userAuthentication,
            userDetails,
            logoutUser,
            getAllUsers,
            allusers,
            getChat,
            chats,
            getSelectedUserDetails,
            SelectedUserDetails,
            formatDateTime,
            setChats
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UseContext = () => {
    return useContext(AuthContext);
};

















