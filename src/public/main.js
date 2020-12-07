var cath = document.getElementById('cath');
var prev = document.getElementById('equ');
var inp = document.getElementById('prob');
var math = document.getElementById('math');

//On load
window.onload = ()=>{
    //Load cathegories from API
    fetch('/api/cathegories')
    .then(res => res.json())
    .then(data => {
        data.forEach(e => {
            console
            var opt = document.createElement('OPTION');
            opt.appendChild(document.createTextNode(e['cathegory']));
            opt.value = e['cathegory'];
            

            cath.appendChild(opt);
        });
    });

    //Listen input for preview
    inp.addEventListener('input', ()=>{
        prev.innerHTML = "`" + inp.value + "`";
        MathJax.typeset();
    });

    
};

//Add Cathegory function
function uploadCathegory(){
    var val = prompt("Write a cathegory");
    console.log(val);
    if(val != ''){
        fetch('/api/new-cathegory', {
            headers: {'Content-Type': 'application/json'},
            method: 'post',
            body: JSON.stringify({cathegory: val})
        })
        .then((res) => console.log(res));
        location.reload();
    }
}

//Get random problem!!!
function GetProblem(){
    fetch('/api/problems/' + cath.value)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if (data['length'] == 0) return;
        math.innerHTML = data[0]['problem'];
    });
}

