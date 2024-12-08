import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'


//API to register user
const registerUser = async (req, res) => {
    try {
        const {name , email, password} = req.body

        if(!name || !email || !password) {
            return res.status(400).json({success: false, message: "Please fill all fields"})
        }


        //validating email
        if(!validator.isEmail(email)) {
            return res.status(400).json({success: false, message: " Enter a Valid Email"})
        }


        //validating password
        if(password.length < 8) {
            return res.status(400).json({success: false, message: "Password must be atleast 8 characters"})
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        //_id
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET )
        res.status(201).json({success: true, token})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//API for user login
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body

        if(!email || !password) {
            return res.status(400).json({success: false, message: "Please fill all fields"})
        }

        //validating email
        if(!validator.isEmail(email)) {
            return res.status(400).json({success: false, message: " Enter a Valid Email"})
        }

        const user = await userModel.findOne({email})

        if(!user) {
            return res.status(400).json({success: false, message: "User Does not Exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res.status(400).json({success: false, message: "Invalid credentials"})
        }

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET )
        res.status(201).json({success: true, token})
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}


export {registerUser, loginUser}