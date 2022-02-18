
import Record from "../modals/record.js";

export const allRecordsofUser = async (req, res) => {
    const {searchQuery} = req.query;
    
    try{
        const records = await Record.find({creator : searchQuery});
        if(!records){
            return res.status(404).json("record not found");
        }
        res.status(200).json(records);
    }catch(err){
        return res.status(500).json(err);
    }
};

export const getRecord = async (req, res) => {
    const id = req.params.id;
    try{
        const record = await Record.findById(id);
        if(!record){
            return res.status(404).json("record not found");
        }
        res.status(200).json(record);
    }catch(err){
        return res.status(500).json(err);   
    }
};

export const createRecord = async (req, res) => {
    const record = req.body;
    try{
        const newRecord = new Record(record);
        await newRecord.save();
        res.status(200).json(newRecord);
    }catch(err){
        return res.status(500).json(err);
    }
};

export const updateRecord = async (req, res) => {
    const id = req.params.id;

    try{
        const record = await Record.findById(id);
        if(!record){
            return res.status(404).json("record not found");
        }
        const updatedRecord = await Record.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json(updatedRecord);
    }catch(err){
        return res.status(500).json(err);
    }
};

export const deleteRecord  = async (req, res) => {
    const id = req.params.id;
    try{
        const record = await Record.findById(id);
        if(!record){
            return res.status(404).json("record not found");
        }
        await Record.findByIdAndDelete(id);
        res.status(200).json("record deleted");
    }catch(err){
        return res.status(500).json(err);
    }
};