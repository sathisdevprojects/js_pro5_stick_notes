const container = document.querySelector('.container');
const btn = document.querySelector('.btn');



function getStorage(){
    return JSON.parse(localStorage.getItem("sticky-app")||"[]");
}


getStorage().forEach(element => {
   const text = createTextArea(element.id,element.content);
   container.insertBefore(text,btn) 
});

function createTextArea(id,content){
    const text =document.createElement('textarea');
    text.classList.add('sticky');
    text.value=content;
    text.placeholder="Enter Notes..😎";
    text.addEventListener('change',()=>{
      updateNote(id,text.value);
    });
    text.addEventListener('dblclick',()=>{
        const check = confirm("Sure to Delete..😒");
        if(check){
            deleteNote(id,text);
        }
    });
    return text;
}
function addSticky(){
    const notes =getStorage();
    const newObject ={
        id:Math.floor(Math.random()*1000),
        content:""
    }
       const text = createTextArea(newObject.id,newObject.content);
        container.insertBefore(text,btn);
        notes.push(newObject);
        saveNotes(notes);
}
btn.addEventListener('click',()=>addSticky());

function saveNotes(notes){
    localStorage.setItem("sticky-app",JSON.stringify(notes));
}
// update function
function updateNote(id,content){
    const notes =getStorage();
    const updateElement = notes.filter((note)=>note.id==id)[0];
    updateElement.content=content;
    saveNotes(notes);

}
function deleteNote(id,text){
    const notes = getStorage().filter((note)=>note.id!=id);
    saveNotes(notes);
    container.removeChild(text);
}  


