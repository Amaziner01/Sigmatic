const router = require('express').Router();
const fb = require('firebase-admin');
const credential = require('../../../credentials/cred.json')

//Initialize FireBase
fb.initializeApp({
    credential: fb.credential.cert(credential),
    databaseURL: "https://mathapp-a0cb2-default-rtdb.firebaseio.com/"
});

const db = fb.database();

function newProblem(object){
    const problem = {
        problem: object.problem.trim().replace(' ', ''),
        cathegory: object.cathegory
    }
    return problem;
}
function newCathegory(object){
    const cath = {
        cathegory: object.cathegory
    }
    return cath;
}

//Send New problem to DB
router.post('/new-problem', (req, res) =>{
    console.log(req.body);
    db.ref("probs").push(newProblem(req.body));

    res.redirect('/upload');
});

router.post('/new-cathegory', (req, res)=>{

});

router.get('/problems', (req, res)=>{
    db.ref("probs").on("value", (ss)=>{
        res.send(ss);
    })
});


module.exports = router;