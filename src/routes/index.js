const router = require('express').Router()
const path = require('path');

//Use
router.use('/api', require('./api'));

//Functions
function viewfile(filename){
    return path.join(__dirname,`../views/${filename}`)
}

//Home page
router.route('/')
.get((req, res)=>{
    res.sendFile(viewfile("index.html"));
});

router.route('/upload')
.get((req, res)=>{
    res.sendFile(viewfile("upload.html"));
});

router.route('/problems')
.get((req, res)=>{
    res.sendFile(viewfile("problems.html"));
});

module.exports = router;