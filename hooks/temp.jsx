
exports.Register = [
    body("username")
        .trim()
        .isLength({ min: 1 })
        .withMessage("You must type your username.")
        .escape(),
    body("email")
        .trim()
        .isLength({ min: 1 })
        .withMessage("You must type your email address. ")
        .custom((value) => {
            if (!checkEmail(value)) {
                throw new Error("The email format is not valid. It must be something along the lines of Bob@email.com.");
            }
            return true;
        }),
    body("password")
        .trim()
        .isLength({ min: 4 })
        .withMessage("Your password must be at least 4 characters long."),
    body("profile_pic"),
    body("confirm_password")
        .trim()
        .isLength({ min: 4 })
        .withMessage("Your confirmation password must be at least 4 characters long.")
        .custom((value, { req }) => {
            if (value != req.body.password) {
                throw new Error("Your password and confirmation password should match.")
            }
            //this is necessary to indicate that the validation passed
            return true
        }),
    async (req, res, next) => {
        const {
            username,
            email,
        } = req.body;

        const errors = validationResult(req);

        const UserList = await User.find({})

        UserList.forEach(val => {
            if (val.username == username.trim()) {
                const obj = {
                    param: "username",
                    msg: "That username already exists in our database."
                }
                errors.errors.push(obj)
            }
            if (val.email.toLowerCase() == email.trim().toLowerCase()) {
                const obj = {
                    param: "email",
                    msg: "That email already exists in our database."
                }
                errors.errors.push(obj)
            }
        })

        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const obj = {
                username: username.replace(/\s/g, ''),
                email: email,
                password: hashedPassword,
                joinedDate: Date.now(),
            }

            if (req.files && req.files.profile_pic) {
                obj.profile_pic = req.files.profile_pic[0].buffer
            }

            const newUser = new User(obj);
            const result = await newUser.save();

            const savedUser = {
                username: result.username,
                email: result.email,
                joinedDate: result.joinedDate,
                profile_pic: result.profile_pic,
                id: result._id,
            }

            console.log("User is successfully created.")
            const token = jwt.sign(savedUser.toJSON(), process.env.JWT_SECRET, { expiresIn: 60 * 60 })
            return res.status(200).json({ user: savedUser, token, message: "User is successfully saved in the database" });
        } catch (e) {
            console.log("Error in trying to create new user: ", e.message)
            res.status(500).json({ error: e.message });
        }
    }
]
