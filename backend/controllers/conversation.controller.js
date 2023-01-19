import Conversation from "../models/conversation.model.js";

export const newConversation = async (req, res) => {
    const userId = req.user
    const newConversation = new Conversation({
      members: [userId, req.body.receiverId],
    });
    return newConversation
            .save()
            .then((newConv) => {
                res.status(200).json({
                    success: true,
                    message: 'New conversation created!',
                    newMess: newMess,
                });
            })
            .catch((err) => {
                res.status(500).json({
                    success: false,
                    message: 'Server error. Please try again.',
                    error: err.message,
                });
            })
}

export const getConversation = async (req, res) => {
    const userId = req.user
    await Conversation.find({
        members: { $in: [userId] },
    }).then(conversations => {
        res.status(200).json({
            success: true,
            message: 'Succes!',
            conversation: conversations
        });
    }).catch(err => {
      res.status(500).json({
        success: false,
        message: 'Email or password incorrect!',
        error: err.message
    });
    })
}