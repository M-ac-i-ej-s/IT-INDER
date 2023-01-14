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
    await User.aggregate([
        {$match: {type:type, _id: {$not :{$in: [...user[0].likes, ...user[0].dislikes]}}}},
        ])
        .then((allUsers) => {
            res.status(200).json({
                success: true,
                message: 'All users',
                Users: sortByLanguages(allUsers,user[0].languages),
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

export const upadateUser = async (req, res) => {
    const id = req.params.userId;
    await User.findByIdAndUpdate(
        id,
        {
            description: req.body.description,
            languages: req.body.languages,
        },
        { new: true }
    )
        .then((user) => {
            res.status(200).json({
                success: true,
                message: 'User is updated',
                user: user,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
            });
        });
}

export const updateUserWithToken = async (req, res) => {
    const id = req.user;
    const token = req.header('access-token');
    const user = await User.findOne({ _id: id });
    if (req.body.password && req.body.oldpassword) {
        const validate = await bcrypt.compare(
            req.body.oldpassword,
            user.password
        );
        if (validate) {
            const hashedPwd = await bcrypt.hash(req.body.password, 10);
            await User.findByIdAndUpdate(
                id,
                {
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPwd
                },
                { new: true }
            )
                .then((user) => {
                    res.status(200).json({
                        success: true,
                        message: 'User is updated',
                        User: {
                            user: user,
                            token: token,
                        },
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        success: false,
                        message: 'Server error. Please try again.',
                    });
                });
        } else {
            res.status(500).json({
                success: false,
                message: 'Invalid password.',
            });
        }
    } else {
        await User.findByIdAndUpdate(
            id,
            {
                name: req.body.name,
                email: req.body.email,
            },
            { new: true }
        )
            .then((user) => {
                res.status(200).json({
                    success: true,
                    message: 'User is updated',
                    User: {
                        user: user,
                        token: token,
                    },
                });
            })
            .catch((err) => {
                res.status(500).json({
                    success: false,
                    message: 'Server error. Please try again.',
                });
            });
    }
};

export const deleteUser = async (req, res) => {
    const id = req.params.userId;
    await User.findByIdAndRemove(id)
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
