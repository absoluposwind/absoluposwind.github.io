const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors =document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mod = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const resetBtn = document.getElementById("jsReset");
const nameText = document.getElementById("imgName");

const resetModal = document.querySelector(".modal");
const resetOverlay = resetModal.querySelector(".md_overlay");
const resetCloseBtn = resetModal.querySelector("#resetNo");
const resetYesBtn = resetModal.querySelector("#resetYes");

const colorSelectBtn = document.getElementById("colorName");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = "700";

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

const closeModal = () => {
    resetModal.classList.add("hidden");
}

ctx.fillStyle="white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle = "INITIAL_COLOR";
ctx.fillStyle = "INITIAL_COLOR";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

var td;
td=new Date();
td = td.getFullYear() +"_"+(td.getMonth()+1)+"_" + td.getDate();

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    colorSelectBtn.value=color;
    colorSelectBtn.style.color=color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling == true){
        filling = false;
        mod.innerText = "Fill"
    }else{
        filling = true;
        mod.innerText="Paint"
        ctx.fillStyle = ctx.strokeStyle;
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

function handleCM(event){
    console.log(event);
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    
    link.href = image;
    link.download = td;
    link.click();
}

function handleResetClick(){
    resetModal.classList.remove("hidden");
}

function resetGo(){
    resetModal.classList.add("hidden");
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mod){
    mod.addEventListener("click",handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}

if(resetBtn){
    resetBtn.addEventListener("click",handleResetClick);
}

console.log(td);
resetCloseBtn.addEventListener("click",closeModal);
resetYesBtn.addEventListener("click",resetGo);