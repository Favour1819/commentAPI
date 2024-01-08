const commentModel = require('../models/commentModel');
const blogModel = require('../models/blogModel')

exports.newcomment = async (req,res)=>{
    try{
        const id = req.body.id;
        const blog = await blogModel.findById(id);
        if (!blog){
            return res.status (404).json({
                message:'Blog not found'
            })
        }

        const comment = await commentModel.create(req.body);

        // post the comment into the comments filed in the blog model
        blog.comments.push(comment._id)
        comment.post = blog._id

        // save the changes into the database
        await blog.save();
        await comment.save();

        // send a success response to the user
        res.status (200).json({
            message: 'You sucessfully posted a comment',
            data: comment
        })

    }catch(error){
        res.status (500).json({
            message:error.message
        })
    }
}

exports.getOne = async(req, res)=>{
    try {
        const {id} = req.params
        const comment = await commentModel.findById(id)
        if (!comment) {
            return res.status(404).json({
                message:`comment not found`,
            })
        } else {
            return res.status(200).json({
                message:`comment found`,
                comment
            })   
        }

    } catch (error) {
        return res.status(404).json({
            message: error.message, 
        })   
    }
}


exports.getAll = async(req, res)=>{
    try {
       const comments = await commentModel.find()
        if (!comments) {
            return res.status(404).json({
                message:`comment not found`,
            })
        } else {
            return res.status(200).json({
                message:`comments found`,
                comments
            })   
        }

    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })   
    }
}


exports.update = async(req, res)=>{
    try {

        const {id} = req.params
       const comment = await commentModel.findById(id)
        if (!comment) {
            return res.status(404).json({
                message:`comment not found`,
            })
        }
        const updateComment = await commentModel.findByIdAndUpdate(id, req.body, {new:true})
        if (updateComment) {
            return res.status(404).json({
                message:`comment updated successfully`,
                data: updateComment
            })
        } else{
            return res.status(404).json({
                message:`cannot update comment`,
            })
        }

    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })   
    }
}


exports.deleteOne = async(req, res)=>{
    try {
       const {id} = req.params
       const comment = await commentModel.findById(id)
        if (!comment) {
            return res.status(404).json({
                message:`comment not found`,
            })
        }
        const updateComment = await commentModel.findByIdAndDelete(id)
        if (updateComment) {
            return res.status(404).json({
                message:`comment deleted successfully`,
                data: updateComment
            })
        } else{
            return res.status(404).json({
                message:`cannot deleted comment`,
            })
        }

    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })   
    }
}

