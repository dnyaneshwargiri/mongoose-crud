const mongoose= require('mongoose');
const userSchema=require('./models/users')

mongoose.connect('mongodb://localhost/testDB',()=>{
    console.log('Connected to mongodb.')
},(e)=>{
    console.log(e.message);
}) 

//create new document
let user= new userSchema({name:'Dnyaneshwar', age: 24})
//can save using then or using async and promise

//1. using then
user.save().then(()=>{
    console.log(`User- ${this.name} is inserted in mongodb \n ${user}`)
})
//2. using async and promise
run();
async function run(){
    let user= new userSchema({name:'Shushma', age: 26})
    //can do direct assignment like below 
    user.age=28
    try{
        //or can use create() method of mongoose instead of save()
        user=new userSchema.create({
            name: 'Rob',
            age:45,
            hobbies:['jogging','reading'],
            address:{
                street:'JP 13',
                city: 'Orlando'
            }
    
        })
        user.createdAt=new Date().now() //will thorw error as creteadAt is marked immutable in user.js
        await user.save()
    }
    catch(e){
        console.log(e.message);
    }
    console.log(`User- is inserted in mongodb \n ${user}`)
    //find/read document
    try {
        //by id
        let user=await userSchema.findById('0d45g555g668k6677k888l');
        //by field name
        user=await userSchema.find({name:'Dnyaneshwar'});
        //findone
        user=await userSchema.findOne({name:'Dnyaneshwar'});
        //check if exist return boolean
        user=await userSchema.exist({name:'Dnyaneshwar'});
        console.log(user);
        //using where
        user=await userSchema.where("name").equals('Dnyaneshwar');
        user=await userSchema.where('age').lt(20).populate('bestFriend').limit(2).select("email");
        //update
        user[0].bestFriend = "0d45g555g668k6677k8882"
        //delete
        user.deleteOne();
        //calling custom method
        user.sayName()
        //calling custom find
        user.findByEmail('test@test.com');
        //calling custom query
        user.find().byName('Sushma');
        //getting virtual property
        user.namedEmail
        //pre save middlewar
        user.save()



        

        
    } catch (e) {
        console.log(e.message);
    }
    //delete document
    try {
        user=await userSchema.deleteOne({name:'Dnyaneshwar'});
        console.log(user);            
    } catch (e) {
        console.log(e.message);
    }
}