import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const AdminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
     email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String
    }
    
},{
    timestamps:true
});

AdminSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
})

AdminSchema.methods.matchPassword = async function (enteredPassword){
     return await bcrypt.compare(enteredPassword,this.password)
}

const Admin = mongoose.model('Admin',AdminSchema);

export default Admin;