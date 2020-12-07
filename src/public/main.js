var cath = document.getElementById('cath');
var prev = document.getElementById('equ');
var inp = document.getElementById('prob');
var math = document.getElementById('math');

//Load cathegories from API
fetch('/api/cathegories')
.then(res => res.json())
.then(data => {
    data.forEach(e => {
        //console
        var opt = document.createElement('OPTION');
        opt.appendChild(document.createTextNode(e['cathegory']));
        opt.value = e['cathegory'];
        

        cath.appendChild(opt);
        
    });
});



//On load
window.onload = ()=>{
    

    //Listen input for preview
    inp.addEventListener('input', ()=>{
        prev.innerHTML = "`" + inp.value + "`";
        MathJax.typeset();
    });

    
};

//Add Cathegory function
function uploadCathegory(){
    var val = prompt("Write a cathegory");
    //console.log(val);
    if(val != ''){
        fetch('/api/new-cathegory', {
            headers: {'Content-Type': 'application/json'},
            method: 'post',
            body: JSON.stringify({cathegory: val})
        })
        //.then((res) => console.log(res));
        location.reload();
    }
}

//Get random problem!!!
function getProblem(){
    fetch('/api/problems/' + cath.value)
    .then(res => res.json())
    .then(data => {
        //console.log(data);
        var len = data['length'];
        if (len == 0) {
            math.innerHTML = "<h4>There is no problems available for this cathegory :(</h4><h4><a href=\"/upload\">Add one yourself here</a></h4>"
            return;
        };

        var rand = Math.round(Math.random() * (len - 1));
        //console.log(rand);
        math.innerHTML = "`" + data[rand]['problem'] + "`";
        MathJax.typeset();
    });
}

