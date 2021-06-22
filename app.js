let input=document.getElementById('input');
let info=document.querySelector('.info');
let footer=document.querySelector('.foot');
let num=document.querySelector('.num');
input.addEventListener('keypress',(e)=>{
    if(e.key==='Enter'){
        if(localStorage.getItem('data')==null){
            localStorage.setItem('data','[]')
        }
        let data=JSON.parse(localStorage.getItem('data'));
        data.push(input.value);
        localStorage.setItem('data',JSON.stringify(data))
        input.value='';
        location.reload();
        viewData();
    }
})

function viewData(){
    if(localStorage.getItem('data')!==null){
        let storage=JSON.parse(localStorage.getItem('data'));
        console.log(storage.length);
        num.textContent=storage.length
        for(let i=0; i<storage.length; i++){
            let todo=document.createElement('div');
            let round=document.createElement('div');
            let p=document.createElement('p');
            let close=document.createElement('div');
            p.innerHTML=storage[i];
            p.classList.add('to-do');
            round.classList.add('round');
            todo.classList.add('todo');
            close.classList.add('close');
            close.innerHTML='<svg id="cross" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>';
            todo.append(round)
            todo.append(p)
            todo.append(close)
            info.insertBefore(todo,footer);
        }
    }
}
viewData();

let round=document.querySelectorAll('.round');
round.forEach(rond=>{
    rond.addEventListener('click',(e)=>{
        e.target.parentElement.classList.toggle('completed')
        rond.classList.toggle('radio');
        
    })
})

let cross=document.querySelectorAll('.close');

cross.forEach(close=>{
    close.addEventListener('click',(e)=>{
        let item=e.target.parentElement;
        console.log(item.parentElement);
        let todo=item.parentElement;
        let dos=todo.children[1].textContent;
        let storage=JSON.parse(localStorage.getItem('data'));
        storage.splice(storage.indexOf(dos),1);
        localStorage.setItem('data',JSON.stringify(storage))
        todo.remove();
        num.textContent=storage.length
    })
})
let com=document.querySelector('.Complete');
let todo=document.querySelectorAll('.todo');
let all=document.querySelector('.all');

all.addEventListener('click',()=>{
    todo.forEach(tod=>{
        tod.style.display='flex';   
    })   
})
com.addEventListener('click',function(e){
    e.preventDefault();
    todo.forEach(tod=>{
        if(tod.classList.contains('completed')){
        tod.style.display='flex';
        }else{
            tod.style.display='none'
        }
    })   
})
