const router = require('express').Router();
const fb = require('firebase-admin');
const credential = require('../../../credentials/cred.json')

//Initialize FireBase
fb.initializeApp({
    credential: fb.credential.cert(credential),
    databaseURL: 'https://mathapp-a0cb2-default-rtdb.firebaseio.com/'
});

const db = fb.database();

//Dummy requests
db.ref('problems').on('value', (ss)=>{
});
db.ref('cathegories').on('value', (ss)=>{
});

//Make JSON payload
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
    db.ref('problems').push(newProblem(req.body));
    res.redirect('/upload');
});

//Send New Cathegories
router.post('/new-cathegory', (req, res)=>{
    console.log(req.body);
    db.ref('cathegories').push(newCathegory(req.body));
    res.redirect('/upload')
});

//Get all problems avilable.
router.get('/problems', (req, res)=>{
    db.ref('problems').on('value', (ss)=>{
        res.send(ss);
    });
});

//Get all problems within cathegory 
router.get('/problems/:cathegory', (req, res)=>{
    var probs = [];
    db.ref('problems').orderByChild('cathegory').equalTo(req.params.cathegory).on('child_added', (ss)=>{
        probs.push(ss.val());
    });
    res.send(probs);
});

//Get Cathegories available.
router.get('/cathegories', (req, res)=>{
    var caths = [];
    db.ref('cathegories').orderByChild('cathegory').on('child_added', (ss)=>{
        //console.log(ss.val());
        caths.push(ss.val());
    });
    res.send(caths);
});


module.exports = router;