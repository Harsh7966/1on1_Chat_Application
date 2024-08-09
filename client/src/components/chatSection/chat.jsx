import React, { useEffect, useState, useRef } from 'react';
import { LuSend } from "react-icons/lu";
import { NoChatSelected } from './noChatSelected';
import { UseContext } from '../../storage/auth';
import { UseSocketContext } from '../../storage/socketContext';

const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit' };

    const formattedDate = date.toLocaleDateString(undefined, dateOptions);
    const formattedTime = date.toLocaleTimeString([], timeOptions);

    return `${formattedDate} ${formattedTime}`;
};

export const Chat = () => {
    const { chats, userDetails, SelectedUserDetails, tokenAuthorization, setChats } = UseContext();
    const [message, setMessage] = useState("");
    const chatContainerRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [chats]);

    const handleInput = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const receiverId = SelectedUserDetails._id;

            const newMessage = {
                message,
                senderId: userDetails._id,
                receiverId,
                createdAt: new Date().toISOString()
            };

            setChats((prevChats) => [...prevChats, newMessage]);

            const response = await fetch(`http://localhost:1010/api/message/send/${receiverId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": tokenAuthorization
                },
                body: JSON.stringify({ message })
            });

            if (response.status === 200) {
                console.log("Message sent successfully");
                setMessage("");
            } else {
                console.log("Message not sent");
            }
        } catch (err) {
            console.log(err);
        }
    };


    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    const isUserSelected = !!SelectedUserDetails;
    const noMessages = isUserSelected && chats.length === 0;

    return (
        <div className="flex flex-col h-full">
            {isUserSelected ? (
                <>
                    <div className="bg-slate-400 px-4 py-2 mb-2 sticky top-0 z-10">
                        <span className="label-text font-bold">To: </span>
                        <span className="text-gray-900 font-bold">{SelectedUserDetails.uname}</span>
                    </div>

                    <div className="flex-1 px-4 overflow-y-auto" ref={chatContainerRef} style={{ maxHeight: 'calc(100vh - 180px)' }}>
                        {noMessages ? (
                            <div className="text-center text-gray-500 mt-10">
                                Send the message to start the conversation
                            </div>
                        ) : (
                            chats.map((chat, index) => (
                                <div key={index} className={`chat ${userDetails._id === chat.senderId ? 'chat-end' : 'chat-start'} ${userDetails._id !== chat.senderId ? 'animate-shake' : ''}`}>
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img
                                                alt="Chat Avatar"
                                                src={`http://localhost:1010${userDetails._id === chat.senderId ? userDetails.profile : SelectedUserDetails.profile}`}
                                            />
                                        </div>
                                    </div>
                                    <div className={`chat-bubble ${userDetails._id === chat.senderId ? 'chat-bubble-accent' : 'bg-black'}`}>
                                        {chat.message}
                                    </div>
                                    <time className="text-xs opacity-50">{formatDateTime(chat.createdAt)}</time>
                                </div>

                            ))
                        )}
                    </div>

                    <form className='px-4 my-3 sticky bottom-0 z-10' onSubmit={handleSubmit}>
                        <div className='relative w-full'>
                            <input
                                type='text'
                                className='border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-600 text-white'
                                placeholder='Send a message'
                                name='message'
                                onChange={handleInput}
                                value={message}
                            />
                            <button
                                type='submit'
                                className='absolute inset-y-0 end-0 flex items-center pe-3'
                            >
                                <LuSend />
                            </button>
                        </div>
                    </form>
                </>
            ) : (
                <NoChatSelected />
            )}
        </div>
    );
};

export default Chat;
