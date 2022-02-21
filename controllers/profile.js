import Profile from "../modals/profile.js";

export const getAllProfiles = async (req, res) => {
    try{
        const profiles = await Profile.find().sort({createdAt: -1});
       return res.status(200).json(profiles);

    }catch(err){
        return res.status(500).send(err);
    }
};

export const getProfile = async (req, res) => {
    const id = req.params.id;
    try {
        const profile = await Profile.findById(id);
        if (!profile) {
            return res.status(404).send('profile not found');
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const createProfile = async (req, res) => {
    const {name, email,userId,  phoneNumber, buisnessName, buisnessAddress, logo, website} = req.body;
    try {
        const profile = await Profile.findOne({email: email});
        if(profile){
            return res.status(400).json('profile already exists');
        }

        const newProfile = new Profile({
            name,
            email,
            phoneNumber,
            buisnessName,
            buisnessAddress,
            logo,
            website,
            userId
        });

        await newProfile.save();
       
        console.log(newProfile);
        res.status(200).json(newProfile);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateProfile = async (req, res) => {
    const id = req.params.id;
    try {
        
        const profile = await Profile.findByIdAndUpdate(id,{...req.body, id}, { new: true });
        if (!profile) {
            return res.status(404).send('profile not found');
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteProfile = async (req, res) => {
    const id = req.params.id;
    try {
        const profile = await Profile.findByIdAndDelete(id);
        if (!profile) {
            return res.status(404).send('profile not found');
        }
        res.send(profile);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getProfileByUserId = async (req, res) => {
    const {searchQuery} = req.query;
    console.log(searchQuery)

    try {
        const profile = await Profile.find({userId: searchQuery});
        if (!profile) {
            return res.status(404).send('profile not found');
        }
        res.status(200).json(profile);
    }catch(err){
        return res.status(500).json(err);
    }
}

export const getProfileBySearch = async (req, res) => {
    const {searchQuery} = req.query;

    try {
        const profile = await Profile.find({$or :[ {name: {$regex: searchQuery, $options: 'i'}, email: {$regex: searchQuery, $options: 'i'}}]});
        if (!profile) {
            return res.status(404).send('profile not found');
        }
        res.status(200).json(profile);
    }catch(err){
        return res.status(500).json(err);
    }
}
