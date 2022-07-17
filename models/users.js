const mongoose= require('mongoose');


const userSchema= new mongoose.Schema({
    name: String,
    age : {
        type:Number,
        min:1,
        max:400,
        validator:{
            validator:()=>v%2 ==0,
            message : props => `${props.value} is not even number`
        }
    },
    Address : { //or can use another schema object but if fields are low it is not efficient
        street: String,
        city: String,
        postnumber : Number
    },
    //simple datatype assignment
    email:String,
    //detailed field specification
    // email:{
    //     type:String,
    //     required:true,
    //     lowecase:true,
    //     minLength:10,
    // }, 
    // createAt: Date,
       createAt: {
        type:Date,
        // default: new Date()//wont work as it takes same time when index.js was run
        default:()=>  Date.now(), //works
        immutable:true,
       },

    updatedAt: Date,
    bestFriend: {
        type: mongoose.SchemaType.ObjectId,
        ref: "userSchema"
    },
    hobbies:[String] 
});

userSchema.methods.sayName=function(){
    return console.log(`Name is ${this.name}`);
}
userSchema.statics.findByEmail=function(email){
    return this.where('email',{email:new RegExp(email, 'i')})
}
userSchema.query.byName=function(name){
    return this.where('email',{email:new RegExp(email, 'i')})
}
userSchema.virtual('namedEmail').get(function(){
    return `${this.name} <${this.email}>`
})
//cusotm middleware function
userSchema.pre('save')=function(doc,next) {
    doc.sayName();
    this.updatedDate=Date.now()
    next();
    //throw new Error('Fail Save')
}
mongoose.export =mongoose.model('userSchema',userSchema);