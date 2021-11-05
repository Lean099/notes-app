const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }]
},{timestamps: true}
);

UserSchema.pre('save', async function(next){
    const usuario = this;
    await bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(usuario.password, salt, (err, hash)=>{
            usuario.password=hash;
            next();
        })
    })
})

UserSchema.methods.validatePassword = async function(password){
    const usuario = this;
    const compare = await bcrypt.compare(password, usuario.password);
    return compare;
}


module.exports = model("User", UserSchema);