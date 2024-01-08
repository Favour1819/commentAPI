const blogModel = require("../models/blogModel")

exports.createPost = async (req, res)=>{
  try {
    const {title, desc} = req.body
    const newPost = await blogModel.create({
        title,
        desc
    })
    res.status(201).json({
        message: `blog post created successfullY`,
        newPost
        })
      }
catch (error) {
    res.status(500).json({
    message: error.message
    })
  }
}

exports.getOne = async(req, res)=>{
    try {
        const {id} = req.params
        const blogPost = await blogModel.findById(id).populate('comments')
        if (!blogPost) {
            return res.status(404).json({
                message:`blogId not found`,
            })
        } else {
            return res.status(200).json({
                message:`viewing blog post`,
                blogPost
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
       const blogs = await blogModel.find()
        if (!blogs) {
            return res.status(404).json({
                message:`blogs not found`,
            })
        } else {
            return res.status(200).json({
                message:`there are ${blogs.length} blogs found in this page`,
                blogs
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
        const {title, desc} = req.body
       const {id} = req.params
       const blog = await blogModel.findById(id)
        if (!blog) {
            return res.status(404).json({
                message:`blog not found`,
            })
        }
        const updateBlog = await blogModel.findByIdAndUpdate(id, {title, desc}, {new:true})
        if (updateBlog) {
            return res.status(404).json({
                message:`blog updated successfully`,
                data: updateBlog
            })
        } else{
            return res.status(404).json({
                message:`cannot update blog`,
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
       const blog = await blogModel.findById(id)
        if (!blog) {
            return res.status(404).json({
                message:`blog not found`,
            })
        }

        blog.comments = null
        const deleteComment = await blogModel.findByIdAndDelete(id)
        if (deleteComment) {
            return res.status(404).json({
                message:`blog deleted successfully`,
                data: deleteComment
            })
        } else{
            return res.status(404).json({
                message:`cannot deleted blog`,
            })
        }

    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })   
    }
}

