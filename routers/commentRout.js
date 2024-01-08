const { newcomment, getOne, getAll, update, deleteOne } = require("../controllers/commentCont")

const router = require("express").Router()

router.post("/anewcomment",newcomment )
router.get("/comment/:id",getOne )
router.get("/comments",getAll)
router.put("/updatecomment/:id",update )
router.delete("/deletecomment/:id", deleteOne)
module.exports = router