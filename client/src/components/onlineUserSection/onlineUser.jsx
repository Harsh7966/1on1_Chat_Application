import React, { useEffect, useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { UseContext } from '../../storage/auth';
import { UseSocketContext } from '../../storage/socketContext';

export const OnlineUsers = () => {
    const { getAllUsers, allusers, getChat, getSelectedUserDetails } = UseContext();
    const { onlineUsers } = UseSocketContext();
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getAllUsers();
    }, [getAllUsers]);

    // Filter users based on the search query
    const filteredUsers = allusers.filter(user =>
        user.uname.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Check if a user is online
    const isOnline = (userId) => onlineUsers.includes(userId);

    const handleUserClick = (user) => () => {
        setSelectedUserId(user._id);
        getChat(user._id);
        getSelectedUserDetails(user);
    };

    // Update search query state on input change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Handle form submission and open chat for the first matching user
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Open chat for the first user that matches the search query
        if (filteredUsers.length > 0) {
            const firstUser = filteredUsers[0];
            setSelectedUserId(firstUser._id);
            getChat(firstUser._id);
            getSelectedUserDetails(firstUser);
        }
    };

    return (
        <div className="flex-1 rounded-lg shadow-md flex flex-col h-full">
            {/* Sticky Search Input and Button */}
            <div className="sticky top-0 z-20 border-b p-4 shadow-md">
                <div className="relative w-full">
                    <form className="m-0" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="input input-bordered rounded-full pr-16 w-full"
                        />
                        <button
                            type="submit"
                            className="absolute inset-y-0 right-0 px-4 py-2 bg-gray-600 text-white rounded-full"
                        >
                            <HiOutlineSearch />
                        </button>
                    </form>
                </div>
            </div>

            {/* User List */}
            <div className="flex-1 p-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 150px)' }}>
                {filteredUsers.map((user) => (
                    <div
                        key={user._id}
                        className={`flex items-center border-b border-gray-300 py-4 cursor-pointer transition-colors duration-300 ease-in-out ${selectedUserId === user._id ? 'bg-slate-400' : 'hover:bg-slate-300'
                            }`}
                        onClick={handleUserClick(user)}
                    >
                        <div className={`avatar ${isOnline(user._id) ? "online" : ""} mr-3 flex-shrink-0`}>
                            <div className="w-12 md:w-16 rounded-full overflow-hidden border border-gray-300">
                                <img src={`http://localhost:1010${user.profile}`} alt="Online User" />
                            </div>
                        </div>

                        <div className="flex flex-col flex-1">
                            <div className="flex gap-3 justify-between items-center">
                                <p className="text-sm font-bold">{user.uname}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OnlineUsers;
