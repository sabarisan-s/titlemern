const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("./models/userModel");
const auth = require("./auth");
const postModel = require("./models/postModel");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res
            .status(400)
            .json({ error: true, message: "Fill * required" });
    }

    try {
        const checkEmail = await userModel.findOne({ email });

        if (checkEmail) {
            return res
                .status(401)
                .json({ error: true, message: "Email already taken!" });
        }

        const salt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await userModel.create({
            fullName,
            email,
            password: hashedPassword,
        });

        const accessToken = jwt.sign({ user }, process.env.SECRET_KEY, {
            expiresIn: "36000m",
        });
        return res.status(201).json({
            error: false,
            message: "Created new user",
            user,
            accessToken,
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Server problem try again",
        });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ error: true, message: "Fill * required" });
    }

    try {
        const checkUser = await userModel.findOne({ email });

        if (!checkUser) {
            return res.status(401).json({ error: true, message: "NOt user" });
        }
        const passwordCheck = await bcrypt.compare(
            password,
            checkUser.password
        );
        if (!passwordCheck) {
            return res
                .status(401)
                .json({ error: true, message: "Check password is wrong" });
        }
        if (checkUser.email === email && passwordCheck) {
            const accessToken = jwt.sign(
                { user: checkUser },
                process.env.SECRET_KEY,
                {
                    expiresIn: "36000m",
                }
            );

            return res.status(200).json({
                error: false,
                message: "Login successfully",
                user: checkUser,
                accessToken,
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Server problem try again",
        });
    }
});

app.get("/user", auth, async (req, res) => {
    const { user } = req.user;

    try {
        const userCheck = await userModel.findOne({ _id: user._id });
        if (!userCheck) {
            return res.status(401).json({ error: true, message: "NOt user" });
        }

        console.log(user);
        return res.status(200).json({
            error: false,
            message: "",
            user,
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Server problem try again",
        });
    }
});

app.post("/create-post", auth, async (req, res) => {
    const { title } = req.body;
    const { user } = req.user;

    if (!title) {
        return res
            .status(400)
            .json({ error: true, message: "Fill * required" });
    }

    if (!user) {
        return res.status(400).json({ error: true, message: "Not user" });
    }

    try {
        const note = await postModel.create({
            title,
            fullName: user.fullName,
            userId: user._id,
        });

        return res.status(200).json({
            error: false,
            message: "Created successfully",
            note,
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Server problem try again",
        });
    }
});

app.get("/get-post", auth, async (req, res) => {
    const { user } = req.user;

    if (!user) {
        return res.status(400).json({ error: true, message: "Not user" });
    }

    try {
        const note = await postModel.find({
            userId: user._id,
        });

        return res.status(200).json({
            error: false,
            message: "Get successfully",
            note,
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Server problem try again",
        });
    }
});

app.put("/update-post/:noteId", auth, async (req, res) => {
    const { title } = req.body;
    const { user } = req.user;
    const { noteId } = req.params;

    if (!title) {
        return res
            .status(400)
            .json({ error: true, message: "Fill * required" });
    }

    if (!user) {
        return res.status(400).json({ error: true, message: "Not user" });
    }

    try {
        const note = await postModel.findOne({
            _id: noteId,
            userId: user._id,
        });

        if (!note) {
            return res.status(400).json({ error: true, message: "Not find" });
        }

        if (title) note.title = title;
        await note.save();

        return res.status(200).json({
            error: false,
            message: "Updated successfully",
            note,
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Server problem try again",
        });
    }
});

app.delete("/delete-post/:noteId", auth, async (req, res) => {
    const { user } = req.user;
    const { noteId } = req.params;

    if (!user) {
        return res.status(400).json({ error: true, message: "Not user" });
    }

    try {
        const note = await postModel.findOne({
            _id: noteId,
            userId: user._id,
        });

        if (!note) {
            return res.status(400).json({ error: true, message: "Not find" });
        }

        await postModel.deleteOne({
            _id: noteId,
            userId: user._id,
        });

        return res.status(200).json({
            error: false,
            message: "Delete successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Server problem try again",
        });
    }
});

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("connected database"))
    .catch((err) => console.log("not connected database"));

const port = 8000 || process.env.PORT;

app.listen(port, (err) => {
    if (err) throw err;

    console.log("server connected");
});
