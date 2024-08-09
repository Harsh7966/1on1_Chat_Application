Chat Application
A fully responsive chat application that allows users to create accounts, view online members, search for users, and engage in real-time one-on-one chats.

Features
User Authentication: Create an account and log in using JSON Web Tokens (JWT) for secure authentication.
User Directory: After logging in, users can view a list of all members, complete with their online/offline status.
Search Functionality: Easily find users with a search bar, allowing for quick access to initiate chats.
Real-Time Chat: Engage in real-time one-on-one conversations using WebSockets, powered by Socket.IO on the backend and Socket.IO-client on the frontend.
Responsive Design: The application is fully responsive, ensuring a seamless experience across devices.
Modern Tech Stack:
Frontend: HTML, CSS, JavaScript, React.js
Backend: Node.js, Express.js
Database: MongoDB Atlas
Styling: Tailwind CSS, daisyUI (Tailwind CSS component library)
State Management: Context API
Getting Started
Prerequisites
Make sure you have the following installed:

Node.js
npm or yarn
MongoDB Atlas account (for the database)
Installation
Clone the repository:

git clone https://github.com/Harsh7966/1on1_Chat_Application.git
cd 1on1_Chat_Application
Install dependencies for the server:

cd server
npm install
Install dependencies for the client:

cd client
npm install
Configuration
Create a .env file in the server directory and set up the following environment variables:

JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_connection_string
Start the server:

cd server
npm start
Start the client:

cd client
npm start
Usage
Navigate to http://localhost:3000 to access the chat application.
Create an account or log in to explore the features.
Use the search bar to find other users and start chatting!
Technologies Used
Frontend: React.js, Tailwind CSS, daisyUI
Backend: Node.js, Express.js
Database: MongoDB Atlas
Real-Time Communication: Socket.IO
Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch for your feature or bug fix.
Commit your changes.
Push to your branch.
Open a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgements
Socket.IO - for real-time communication
Tailwind CSS - for styling
MongoDB Atlas - for database services
