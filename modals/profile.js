import mongoose from 'mongoose';


const profileSchema = mongoose.Schema({
    name : String,
    email : {type: String, unique : true},
    phoneNumber : String,
    buisnessName : String,
    buisnessAddress : String,
    logo :  String,
    website : String,
    userId : [String]
});

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;