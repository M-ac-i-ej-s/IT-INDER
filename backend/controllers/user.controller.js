import mongoose from 'mongoose';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';


export const getAllUsers = async (req, res) => {
    const sortByLanguages = (users, pattern) => {
        const newArr = users
          .map((user) => {
            let number = 0;
            pattern.forEach((el1) => {
              if (user.languages.includes(el1)) {
                number += 1;
              }
            });
            return [user, number];
          })
          .sort((a, b) => {
            if (a[1] < b[1]) {
              return 1;
            }
            if (a[1] > b[1]) {
              return -1;
            }
            return 0;
          });
        return newArr.map((el) => {
          return el[0];
        });
    };
    const userId = req.user;
    const user = await User.find({_id: userId})
    let type = 'project'
    if(user[0].type === 'project'){
        type = 'programmer'
    }
    const arrayOfIds = [...user[0].likes, ...user[0].dislikes].map(el => mongoose.Types.ObjectId(el))
    await User.aggregate([
        {$match: {type:type, _id: {$nin :[...arrayOfIds]}, isActive: {$ne: userId}}},
        ])
        .then((allUsers) => {
            res.status(200).json({
                success: true,
                message: 'All users',
                Users: sortByLanguages(allUsers,user[0].languages)[0],
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: err.message,
            });
        });
};

export const searchAllUsers = async (req, res) => {
    const name = req.query.name || '.*'
    const description = req.query.description || '.*'
    const email = req.query.email || '.*'
    let type = req.query.type || '.*'
    if(type === 'any') type = '.*'
    await User.find({
        $and: [
            {name: {$regex: `^.*${name}.*$`, $options: 'i'}},
            {description: {$regex: `^.*${description}.*$`, $options: 'i'}},
            // // {languages: {$in: languages}},
            {email:{$regex: `^.*${email}.*$`, $options: 'i'}},
            {type:{$regex: `^.*${type}.*$`, $options: 'i'}}
        ]
    })
        .then((allUsers) => {
            res.status(200).json({
                success: true,
                message: 'All users',
                Users: allUsers,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server Failed',
                error: err.message,
            });
        });
};


export const getOneUser = async (req, res) => {
    const userId = req.user;
    await User.find({_id: userId})
        .then((singleUser) => {
            res.status(200).json({
                success: true,
                message: 'Single User',
                User: singleUser,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'This user does not exist',
                error: err.message,
            });
        });
};

export const getUser = async (req, res) => {
    const userId = req.params.id;
    await User.find({_id: userId})
        .then((singleUser) => {
            res.status(200).json({
                success: true,
                message: 'Single User',
                User: singleUser,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'This user does not exist',
                error: err.message,
            });
        });
};

export const createUser = async (req, res) => {
    const hashedPwd = await bcrypt.hash(req.body.password, 10);
    User.find({ email: req.body.email }, (err, users) => {
        if (users.length) {
            return res.sendStatus(409);
        } else {
            const user = new User({
                _id: mongoose.Types.ObjectId(),
                type: req.body.type,
                name: req.body.name,
                description: req.body.description,
                languages: req.body.languages,
                isActive: false,
                likes: [],
                dislikes: [],
                matches: [],
                email: req.body.email,
                password: hashedPwd,
            });
            return user
                .save()
                .then((newUser) => {
                    return res.status(201).json({
                        success: true,
                        message: 'New user created successfully',
                        User: newUser,
                    });
                })
                .catch((error) => {
                    res.status(500).json({
                        success: false,
                        message: 'Server error. Please try again.',
                        error: error.message,
                    });
                });
        }
    });
};

export const editUser = async (req, res) => {
    const userId = req.user;
    await User.findByIdAndUpdate(
        userId,
        {
            description: req.body.description,
            languages: [...req.body.languages],
        },
        { new: true }
    )
        .then((user) => {
            res.status(200).json({
                success: true,
                message: 'User is updated',
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
            });
        });
};

export const resetUser = async (req, res) => {
    const userId = req.user;
    await User.findByIdAndUpdate(
        userId,
        {
            likes: [],
            dislikes:[]
        },
        { new: true }
    )
        .then((user) => {
            res.status(200).json({
                success: true,
                message: 'User is updated',
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
            });
        });
};

export const firstTime = async (req, res) => {
    const userId = req.user;
    await User.findByIdAndUpdate(
        userId,
        {
            firstTime:true,
        },
        { new: true }
    )
        .then((user) => {
            res.status(200).json({
                success: true,
                message: 'User is updated',
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
            });
        });
};

export const userIsActive = async (req, res) => {
    const userId = req.user
    await User.findByIdAndUpdate(
        userId,
        {
            isActive: req.body.id
        },
        { new: true }
    )
        .then((user) => {
            res.status(200).json({
                success: true,
                message: 'User is active',
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
            });
        });
}

export const like = async (req, res) => {
    const userId = req.user
    const id = req.body.id
    const user = await User.find({_id: userId})
    await User.findByIdAndUpdate(
        userId,
        {
            likes: [...user[0].likes, id ]
        },
        { new: true }
        )
        .then((user) => {
            res.status(200).json({
                success: true,
                message: 'User is liked',
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
            });
    });
}

export const dislike = async (req, res) => {
    const userId = req.user
    const id = req.body.id
    const user = await User.find({_id: userId})
    await User.findByIdAndUpdate(
        userId,
        {
            dislikes: [...user[0].dislikes, id ]
        },
        { new: true }
        )
        .then((user) => {
            res.status(200).json({
                success: true,
                message: 'User is disliked',
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
            });
    });
}

export const deleteUser = async (req, res) => {
    const userId = req.user;
    await User.findByIdAndRemove(userId)
        .exec()
        .then(() =>
            res.status(204).json({
                success: true,
            })
        )
        .catch((err) =>
            res.status(500).json({
                success: false,
            })
        );
};

export const banUser = async (req, res) => {
    const userId = req.query.id;
    await User.findByIdAndRemove(userId)
        .exec()
        .then(() =>
            res.status(204).json({
                success: true,
            })
        )
        .catch((err) =>
            res.status(500).json({
                success: false,
            })
        );
};
