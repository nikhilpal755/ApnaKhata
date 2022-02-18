
import Client from "../modals/client.js";
// get client by id
export const getClient = async (req, res) => {
    const id = req.params.id;
    try{
        const client = await Client.findById(id);
        if(!client){
            return res.status(404).json("client not found");
        }
        res.status(200).json(client);
    }catch(err){
        return res.status(500).json(err);   
    }
};

export const getClientsofUser = async (req, res) => {
    const {searchQuery} = req.query;
    try{
        const client = await Client.find({userId : searchQuery});
      
        if(!client){
            return res.status(404).json("client not found");
        }
        res.status(200).json(client);
    }catch(err){
        return res.status(500).json(err);   
    }
};

export const getClientByPages = async (req, res) => {
    const {page} = req.query;
    try{
        const limit = 10;
        const client = await Client.find({userId : req.user._id}).skip(page * limit).limit(limit);
        if(!client){
            return res.status(404).json("client not found");
        }
        res.status(200).json(client);
    }catch(err){
        return res.status(500).json(err);   
    }
};

export const createClient = async (req, res) => {
    const {name, email, address, phoneNumber, userId} = req.body;
    try{
        const newClient = new Client({
            name,
            email,
            address,
            phoneNumber,
            userId
        });
        await newClient.save();
        res.status(200).json(newClient);
    }catch(err){
        return res.status(500).json(err);   
    }
};

// update client by id
export const updateClient = async (req, res) => {
    const id = req.params.id;
   
    try{
        const updatedClient = await Client.findByIdAndUpdate(id, {...req.body, id}, {new: true});
        if(!updatedClient){
            return res.status(404).json("client not found");
        }
        res.status(200).json(updatedClient);
    }catch(err){
        return res.status(500).json(err);   
    }

};

export const deleteClient = async (req, res) => {
    const id = req.params.id;
    try{
        const deletedClient = await Client.findByIdAndDelete(id);
        if(!deletedClient){
            return res.status(404).json("client not found");
        }
        res.status(200).json(deletedClient);
    }catch(err){
        return res.status(500).json(err);   
    }
};