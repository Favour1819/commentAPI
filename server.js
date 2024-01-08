const express = require ('express'); 
const blogRouter = require('./routers/blogRouter.js');
const commentRouter = require("./routers/commentRout.js")
require('./dbConfig/dbConfig.js')
const PORT = process.env.port

const app = express();
app.use(express.json())

app.use('/api/v1/', blogRouter);
app.use('/api/v1/', commentRouter);
// app.use ('/uploads', express.static('uploads'))



app.listen(PORT,()=>{
   console.log(`Server is running on ${PORT}`)
})
