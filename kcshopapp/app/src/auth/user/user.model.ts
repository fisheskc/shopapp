import mongoose from 'mongoose';
import { UserModel, UserDoc, AuthenticationService } from '@kcshopapp/common'

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,   
    },
    password: {
        type: String,
        required: true, 
    }
}, {
   toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
            delete ret.password
        }
   }
})

// means that before saving/ Initiate the authentification service from the kcshopapp
// We use the Pwt to Hash method from that class
schema.pre('save', async function(done){
    const authentificationService = new AuthenticationService()
    if(this.isModified('password') || this.isNew) {
        const hashedPwd = authentificationService.pwdToHash(this.get('password'))
        this.set('password', hashedPwd);
    }

    done()
})

export const User = mongoose.model<UserDoc, UserModel>('User', schema)