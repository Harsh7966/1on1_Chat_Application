
// messageController.js
const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");
const { getSocketIO, userSocketMap } = require("../socket/socket");

const sendMessage = async (req, res) => {
    try {
        // console.log("userSocketMap", userSocketMap);
        const receiverId = req.params.receiverId;
        // console.log("recieverIdddd", receiverId);
        const senderId = req.userId;
        const { message } = req.body;
        // console.log("message", message);

        if (!receiverId || receiverId === senderId) {
            return res.status(400).json({ error: "Invalid receiverId" });
        }

        let conversationExist = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversationExist) {
            conversationExist = await Conversation.create({
                participants: [senderId, receiverId],
                messages: []
            });
        }

        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            message: message
        });

        await newMessage.save();

        conversationExist.messages.push(newMessage._id);
        await conversationExist.save();

        const receiverSocketId = userSocketMap[receiverId];
        // console.log("receiverSocketId", receiverSocketId);
        
        const io = getSocketIO(); // Get the io instance here
        if (receiverSocketId && io) {
            // console.log("into if")
            io.to(receiverSocketId).emit("newMessage", newMessage);
        } else {
            console.error(`Socket not found for user ${receiverId}`);
        }

        res.status(200).json(newMessage);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getMessage = async (req, res) => {
    try {
        const userId = req.params.userId;
        const loginUserId = req.userId;

        const conversations = await Conversation.find({
            participants: { $all: [userId, loginUserId] }
        }).populate("messages");

        if (!conversations || conversations.length === 0) {
            return res.status(200).json([]);
        }

        const messages = conversations.map(conversation => conversation.messages).flat();

        res.status(200).json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    sendMessage,
    getMessage
};