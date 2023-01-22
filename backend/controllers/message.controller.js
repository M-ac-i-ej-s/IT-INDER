import Message from "../models/message.model.js";

export const addMessage =  async (req, res) => {
    const newMessage = new Message(req.body);
    return newMessage
            .save()
            .then((newMess) => {
                res.status(201).json({
                    success: true,
                    message: 'New message send!',
                    newMess: newMess,
                });
            })
            .catch((err) => {
                res.status(500).json({
                    success: false,
                    message: 'Server error. Please try again.',
                    error: error.message,
                });
            })
  }

export const getMessage = async (req, res) => {
    await Message.find({
        conversationId: req.params.conversationId,
      }).then(messages => {
        res.status(200).json({
            success: true,
            message: 'Succes!',
            messages: messages
        });
      }).catch (err => { 
      res.status(500).json({
        success: false,
        message: 'cant find conversation',
        error: err.message
    });
    })
  }  

  export const deleteMessages = async (req, res) => {
    const userId = req.user
    await Message.find({
        sender: userId,
      }).remove().exec()
        .catch (err => { 
        res.status(500).json({
        success: false,
        message: 'cant find conversation',
        error: err.message
    });
    })
  }  

  export const deleteMessage = async (req, res) => {
    await Message.findByIdAndUpdate(
          req.params.messageId,
          {
              text: ''
          },
          { new: true }
        ).then((message) => {
          res.status(200).json({
              success: true,
              message: 'message is deleted',
          });
      })
      .catch((err) => {
          res.status(500).json({
              success: false,
              message: 'Server error. Please try again.',
          });
      });
  }  