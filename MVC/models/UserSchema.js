import mongoose from "mongoose";


const UserSchema= new mongoose.Schema({

 name:{type:String, required:[true, "name is required filed"], minLength:[5,"minimum length is 5"] },
 email:{type:String, required:[true, 'email is required filed'], unique:true, },
 work:{type:String, required:[true, 'work must be required'],  },
 phone:{type:Number, required:[true, 'number must be required']  },
 password:{type:String, required:[true, 'password must be required'], minLength:[5, 'minimum length is 5']},
    confirmPassword: { type: String, required: [true, 'confirmPassword must be required'], minLength: [5, 'confirmPassword length is 5']},
})

const User=mongoose.model("User", UserSchema);
export default User