
const Task= require('../models/task')

const getAllTasks= async(req,res)=>{
    try{
        const tasks=await Task.find({})
        res.status(200).json({tasks}) 
    }
    catch(error){
        res.status(500).json({msg:error})
    }
}

const createTask = async (req,res)=>{
    try{
        const task=await Task.create(req.body)
        res.status(201).json({task}) 
    }
    catch(error){
        res.status(500).json({msg:error})
    }
}
const getTask =async (req,res)=>
    {
        try{
            const{id:taskID}=req.params//unpacking 'id' (from req.params object) to be stored in a new variable named taskID
            const task=await Task.findOne({_id:taskID})//asking to send the details of task whose id matches the assigned 
            // taskID value(_id-- is given by database by default)
            if(!task){
                return res.status(404).json({msg:`no task with id:${taskID}`})
            }
            res.status(200).json({task}) 
        }
        catch(error){
            res.status(500).json({msg:error})
        }
    }

    const deleteTask = async(req,res)=>{
        try {
            const {id:idKey}=req.params
            const task= await Task.findOneAndDelete({_id:idKey})
            if(!task){
                return res.status(404).json({msg:`${idKey} THIS ID DOESNT EXIST`})
            }
            return res.status(200).json({task})
        } catch (error) {
            res.status(500).json({msg:error})
        }
        res.send('delete tasks')
    }
    
    const updateTask =async (req,res)=>{ 
        try {
            const {id:taskID}=req.params;
            const task= await Task.findByIdAndUpdate(taskID,req.body,{
                new:true,//returns the modified document when made true or returns the original document.
                runValidators:true//here if we make this to true then we can have the validations according to schemas! 
            })
            if(!task){
                return res.status(404).json({msg:`${taskId} THIS ID DOESNT EXIST`})
            }
            return res.status(200).json({task})
        } catch (error) {
            res.status(500).json({msg:error})
        }
    }
    module.exports={getAllTasks,createTask,getTask,updateTask,deleteTask}