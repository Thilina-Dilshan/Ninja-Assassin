
const pgb = $("#pgb");


if (typeof window.innerWidth == 'undefined' || typeof window.innerWidth == 'null') {
    viewPortWidth=1300;
}else{
    viewPortWidth = window.innerWidth,
    viewPortHeight = window.innerHeight
}

let imgArray = [];
let url;

let imgCount=0;
let percentage=0;

let load=0;
let prg=0;

/* Calculate image loading*/

for(let i = 0; i <= 9; i++){
    const image = new Image();
    image.src  = `img/Jump__00${i}.png`;
    image.onload = function(){
        ++load;
        percentage=(load/70)*100+"%";
        // console.log(percentage);
        // pgb.css('width', percentage);
        
    }
}


for(let i = 0; i <= 9; i++){
    const image = new Image();
    // image.src  = `img/Jump (${i}).png`;
    image.src  = `img/Jump__00${i}.png`;
    url=`img/Jump__00${i}.png`;
    image.onload = function(){
        ++load;
        percentage=(load/70)*100+"%";
        // console.log(percentage);
        // pgb.css('width', percentage);

    }
}


for(let i = 0; i <= 9; i++){
    const image = new Image();
    // image.src  = `img/Idle (${i}).png`;
    image.src  = `img/Idle__00${i}.png`;
    image.onload = function(){
        ++load;
        percentage=(load/70)*100+"%";
        // console.log(percentage);
        // pgb.css('width', percentage);

    }
}


for(let i = 0; i <= 9; i++){
    const image = new Image();
    image.src  = `img/Run__00${i}.png`;
    image.onload = function(){
        ++load;
        percentage=(load/70)*100+"%";
        // console.log(percentage);
        // pgb.css('width', percentage);

    }
}


for(let i = 0; i <= 9; i++){
    const image = new Image();
    image.src  = `img/Dead__00${i}.png`;
    image.onload = function(){
        ++load;
        percentage=(load/70)*100+"%";
        // console.log(percentage);
        // pgb.css('width', percentage);

    }
}


for(let i = 0; i <= 9; i++){
    const image = new Image();
    image.src  = `img/Jump_Attack__00${i}.png`;
    image.onload = function(){
        ++load;
        percentage=(load/70)*100+"%";
        // console.log(percentage);
        // pgb.css('width', percentage);
    }
}


for(let i = 1; i <= 10; i++){
    const image = new Image();
    image.src  = `img/Walk (${i}).png`;
    image.onload = function(){
        ++load;
        percentage=(load/70)*100+"%";
        // console.log(percentage);
        // pgb.css('width', percentage);
    }
}


let loss=0;
let win=0;


const bgElm = document.getElementById('background');

const boxElm = document.createElement('div');
boxElm.classList.add('box');
bgElm.append(boxElm);

document.body.addEventListener('click', ()=> document.body.requestFullscreen());

let jump = false;
let run = false;
let alive = true;
attack=false;
let dx = 0;


let bgLeft=false;
let bgRight=false;
document.body.addEventListener('keydown', (eventData)=> {
    if (eventData.code === 'ArrowUp' || eventData.code === 'KeyW'){
        if(alive){
            jump = true;
        }
    }else if (eventData.code === 'KeyD' || eventData.code === 'ArrowRight'){
        boxElm.style.transform = 'rotateY(0deg)'
        if(alive){
            run = true;
            bgRight=true;
            bgLeft=false;
        }
        dx = 2;
    }else if (eventData.code === 'KeyA' || eventData.code === 'ArrowLeft'){
        boxElm.style.transform = 'rotateY(180deg)';
        if(alive){
            run = true;
            bgLeft=true;
            bgRight=false;
        }
        dx = -2;
    }else if(eventData.code === 'Enter' || eventData.code === 'Space'){
        if(alive){
            attack = true;
        }
    }else{
        // console.log(eventData.code);
    }
});

document.body.addEventListener('keyup', (eventData) => {
    if (eventData.code === 'KeyD' || eventData.code === 'ArrowRight'){
        run = false;
        dx = 0;
    }else if (eventData.code === 'KeyA' || eventData.code === 'ArrowLeft'){
        run = false;
        dx = 0;
    }
});

let angle = 0;
function doJump(){
    boxElm.style.width= '150px'; 
    let y  = Math.cos(angle * (Math.PI / 180));
    y *= 3;
    boxElm.style.top = (boxElm.offsetTop - y) + "px";
    angle++;
    if (angle >  180){
        jump = false;
        angle = 0;  
    }
}

let bgDx = 2;
let bgX=0;
function doRun(){
    boxElm.style.width= '150px';
    let x = boxElm.offsetLeft + dx;
    
    let bgCSS = getComputedStyle(bgElm);
    if ((x + boxElm.offsetWidth)> innerWidth-130) {
        x = innerWidth - boxElm.offsetWidth-130;
        if(bgRight){
            bgX -= 2;
        }
    }else if (x <= -10){
        x = -10;
    }else if(x>300 && bgLeft){
        bgX += 2;        
        // console.log(bgX);
    }else if(x>300 && bgRight){
        bgX -= 2;

    }
    boxElm.style.left = `${x}px`;
    bgElm.style.backgroundPositionX = `${bgX}px`
}


let i = 0;
function drawIdle(){
    boxElm.style.width= '101px';
    boxElm.style.backgroundImage = `url('/img/Idle__00${i++}.png')`;
    if(i === 9) i = 0;
}

let k = 0;
function drawJump(){
    boxElm.style.backgroundImage = `url('img/Jump__00${k++}.png')`;
    if(k === 9) k = 0;
}

let j = 0;
function drawRun(){
    boxElm.style.backgroundImage = `url('img/Run__00${j++}.png')`;
    if(j === 9) j = 0;
}


let l =0;
function drowDead(){
    boxElm.style.width= '170px';
    if(l<10){
        boxElm.style.backgroundImage = `url('img/Dead__00${l++}.png')`;
    }
    if(l === 9) setTimeout(()=>{
        alive=true;
        notStarted=false;
        l=0;
        document.onkeydown = function (e) {
            return true;
        }
    },3000);
}

let m =0;
function drawAttack(){
    boxElm.style.width= '170px'
    boxElm.style.backgroundImage = `url('img/Jump_Attack__00${m++}.png')`;
    if(m === 9) {
        setTimeout(()=>{
            m = 0;
            attack=false;
            document.onkeydown = function (e) {
                return true;
            }
        },0)
    }
}

setInterval(()=> {
    if (jump){
        doJump();
    }
    if (run){
        doRun();
    }
}, 5);


let notStarted=true;
setInterval(()=> {
    if (!jump && !run && alive && !attack){
        drawIdle();
        notStarted=true;
    }else if (jump){
        drawJump();
    }else if (!jump && run && alive){
        drawRun();
    }else if(!alive){
        document.onkeydown = function (e) {
            return false;
        }
        if(notStarted){
            drowDead();
        }
    }else if(attack && alive){
        document.onkeydown = function (e) {
            return false;
        }
        drawAttack();
    }
}, (1000/20));


/****************** Dino Object setup **************/
let d=0;
class DivObject{
    width = 110;
    height = 110;
    speed;
    xPos=viewPortWidth+100;
    yPos=70;
    r2;
    elm;
    dead=false;
    constructor(speed){
        this.elm = document.createElement('div');
        this.elm.style.position = 'absolute';
        this.elm.style.width = `${this.width}px`;
        this.elm.style.height = `${this.height}px`;
        this.elm.style.bottom= `${this.yPos}px`;
        this.speed = speed;
        this.elm.style.zIndex = 99;
        // this.elm.style.backgroundColor = 'black';
        this.r2 = this.height/2;
        document.getElementById('background').append(this.elm);
    }
    
    kill(){
       
        this.xPos -= this.speed;
        if(alive && this.xPos > -100 && !this.dead){
            this.elm.style.left = `${this.xPos}px`;
        }else{
            this.xPos=viewPortWidth+100;
        }
        
        const r1 = (Math.hypot(boxElm.offsetHeight,boxElm.offsetWidth)-55)/2;
        const xDiff =(this.elm.offsetLeft + this.r2) - (boxElm.offsetLeft+boxElm.offsetWidth/2);
        const yDiff = (this.elm.offsetTop + this.r2) - (boxElm.offsetTop+boxElm.offsetHeight/2);
        const hypot = Math.hypot(xDiff, yDiff);
        
        if (hypot < (r1 + this.r2)-30){
            if(attack){
                this.dead = true;
                this.drawDead();
                setTimeout(()=>{
                    win+=1;
                },0) 
                ++d;
                setTimeout(()=>{
                    this.speed = (5+Math.random()*12);
                    this.elm.style.left=viewPortWidth+100+'px'
                    this.xPos=viewPortWidth+100;
                    if(dragon.yPos === 214){
                        dragon.yPos=75
                    }else{
                        dragon.yPos = 214;
                    }
                },1000);
                fireBallBottom.kill();
            }else if(!this.dead){
                fireBallBottom.xPos=viewPortWidth+100;
                this.speed = (4+Math.random()*10);
                this.elm.style.left=viewPortWidth+100+'px';
                if(alive)loss+=1;
                alive=false;
            }
        }
    } 

    a=1;
    drawKill(){
        this.elm.style.width=110+'px';
        this.elm.style.backgroundSize= 'cover';
        this.elm.style.backgroundRepeat= 'no-repeat';
        this.elm.style.transform= 'rotateY(180deg)';
        if(this.a === 10) this.a = 1;
        this.elm.style.backgroundImage = `url('img/Walk (${this.a++}).png')`;
    }

    b=1;
    drawDead(){
        this.elm.style.backgroundSize= 'cover';
        this.elm.style.width=160+'px';
        this.elm.style.backgroundRepeat= 'no-repeat';
        this.elm.style.transform= 'rotateY(180deg)';
        if(this.b === 8) {
            this.b = 1;
            setTimeout(()=>this.dead=false,1500);
        }
        this.elm.style.backgroundImage = `url('img/Dead (${this.b++}).png')`;
    }
}

let divObject=new DivObject(1+Math.random()*8);
setInterval(()=>{ 
    if(divObject!=null && !divObject.dead){
        divObject.kill();
    }else if(divObject==null){
        // console.log(innerWidth);
        divObject = new DivObject().kill();
    }
},50);

setInterval(()=>{
    if(!divObject.dead){
        // console.log("drawing kill...")
        divObject.drawKill();
    }
},100)

setInterval(()=>{
    if(divObject.dead){
        divObject.drawDead();
    }
},500)


/* Fly Dragon Object */

class DragonObject{
    width = 200;
    height = 200;
    speed;
    xPos=viewPortWidth+100;
    yPos;
    r2;
    elm;
    dead=false;
    calc=false;
    constructor(speed,yPos){
        this.speed = speed;
        this.yPos = yPos;
        this.elm = document.createElement('div');
        this.elm.style.position = 'absolute';
        this.elm.style.width = `${this.width}px`;
        this.elm.style.height = `${this.height}px`;
        this.elm.style.bottom= `${this.yPos}px`;
        // this.alive = true;
        // this.elm.style.backgroundColor = 'black';
        this.elm.classList.add('fylDragon');
        this.r2 = this.height/2;
        this.elm.style.scale='0.4';
        document.getElementById('background').append(this.elm);
    }
    
    kill(){
        this.xPos -= this.speed;
        this.elm.style.transitionProperty='bottom';
        this.elm.style.transitionDuration='1500ms';
        this.elm.style.bottom = this.yPos+'px';
        if(this.xPos > -100){
            this.elm.style.left = `${this.xPos}px`;
            
        }else{
            this.xPos=viewPortWidth+100;
        }
        
        const r1 = (Math.hypot(boxElm.offsetHeight,boxElm.offsetWidth)-55)/2;
        const xDiff =(this.elm.offsetLeft + this.r2) - (boxElm.offsetLeft+boxElm.offsetWidth/2) ;
        const yDiff = (this.elm.offsetTop + this.r2) - (boxElm.offsetTop+boxElm.offsetHeight/2) ;
        const hypot = Math.hypot(xDiff, yDiff);
        
        if (hypot < (r1 + this.r2)-60){ 
            // console.log(hypot < (r1 + this.r2)-45);
        
            if(attack){
                win+=1;
                // console.log(this.speed);
                this.dead = true;
                this.elm.style.transitionProperty='transform';
                this.elm.style.transitionDuration='1000ms'; //?
                this.elm.style.transform='scale(0)';    //?
                setTimeout(()=>{
                    this.speed = (4+Math.random()*10);
                    this.xPos=viewPortWidth+100;
                    this.elm.style.left=this.xPos+'px'
                    this.elm.style.transform='scale(1)'
                    this.elm.style.transform= 'rotateY(180deg)';
                    if(dragon.yPos === 214){
                        dragon.yPos=75
                    }else{
                        dragon.yPos = 214;
                    }
                },1000);
                setTimeout(()=>this.dead=false,1500);
                
            }else if(!this.dead){
                this.speed = (4+Math.random()*10);
                this.elm.style.left=viewPortWidth+100+'px';
                if(alive)loss+=1;
                alive=false;
                this.yPos = (Math.random()< 0.5 ? 214 : 75 );
                dragon.xPos=viewPortWidth+100;
                fireBallBottom.xPos=viewPortWidth+100;

            }
        }
    }
}


let dragon = new DragonObject(8,(Math.random()< 0.5 ? 214 : 75 ));
setInterval(()=>{
    if(dragon!=null && alive && !dragon.dead){
        dragon.kill();
    }
},50);


/* Fire ball object */

class FireBallObject{
    width = 90;
    height = 60;
    speed;
    xPos=viewPortWidth+100;
    yPos;
    r2;
    elm;
    dead=false;
    speeding;
    constructor(speed,yPos){
        this.speed = speed;
        this.speeding = true;
        this.yPos = yPos;
        this.elm = document.createElement('div');
        this.elm.style.position = 'absolute';
        this.elm.style.width = `${this.width}px`;
        this.elm.style.height = `${this.height}px`;
        this.elm.style.bottom= `${this.yPos}px`;
        // this.alive = true;
        // this.elm.style.backgroundColor = 'black';
        this.elm.classList.add('fireBall');
        this.r2 = this.height/2;
        this.elm.style.scale='0.4';
        document.getElementById('background').append(this.elm);
    }
    
    kill(){
        // console.log("Relocating")
        // this.xPos -= this.speed;

        // if(divObject.dead){
        //     this.xPos=divObject.xPos;
            
        // }
        this.elm.style.bottom = this.yPos+'px';
        
        if(divObject.dead){
            // this.xPos=divObject.xPos;
            this.xPos=viewPortWidth+100;
        }

        if(this.xPos>-100 && this.xPos<1110){
            this.xPos -= divObject.speed*1.5;
        }else{
            this.xPos -= divObject.speed;
        }

        if(this.xPos > -100){
            this.elm.style.left = `${this.xPos}px`;
            
        }else{
            // this.elm.alive = false;
            // this.elm.remove();
            // this.elm=null;
            // this.elm.style.right = 10;
            this.xPos=divObject.xPos;
            this.speed=0;
        }
        
        const r1 = (Math.hypot(boxElm.offsetHeight,boxElm.offsetWidth)-55)/2;
        const xDiff =(this.elm.offsetLeft + this.r2) - (boxElm.offsetLeft+boxElm.offsetWidth/2) ;
        const yDiff = (this.elm.offsetTop + this.r2) - (boxElm.offsetTop+boxElm.offsetHeight/2) ;
        const hypot = Math.hypot(xDiff, yDiff);
        
        if (hypot < (r1 + this.r2)-40){ 
            if(alive)loss+=1;
            alive=false;
            // this.xPos=viewPortWidth+100;
            // fireBallBottom.xPos=viewPortWidth+100;
            this.xPos=viewPortWidth+100;
            this.elm.style.left=this.xPos+'px';
            setTimeout(()=>this.speed = 4+Math.random()*12,0)
            dragon.xPos=viewPortWidth+100;
            // this.elm.style.left=this.xPos+'px';
            // this.yPos = (70);
            // console.log('Player dead"s: ', ++playerDeadCount);
            // console.log(this.yPos);
        }
    } 
}


let fireBallBottom = new FireBallObject((4+Math.random()*12),110);
setInterval(()=>{ 
    if(fireBallBottom!=null && alive ){
        fireBallBottom.kill();
    }else{
        // fireBallBottom.xPos=viewPortWidth+100;
    }
},50);





/* Floating object */

class FloatingObject{
    width = 100;
    height = 70;
    // speed=2+Math.random()*8;
    speed=1;
    xPos= 10+Math.random()*(1000);
    yPos=-100;
    floating=false;
    r2;
    elm;
    dead=false;
    constructor(){
        this.speed = this.speed;
        this.yPos = this.yPos;
        this.elm = document.createElement('div');
        this.elm.style.position = 'absolute';
        this.elm.style.width = `${this.width}px`;
        this.elm.style.height = `${this.height}px`;
        this.elm.style.top= `${this.yPos}px`;
        this.elm.style.transform= `rotate(90deg)`;
        // this.elm.style.zIndex=999;
        // this.alive = true;
        // this.elm.style.backgroundColor = 'black';
        this.elm.classList.add('fireBall');
        this.r2 = this.height/2;
        this.elm.style.scale='0.4';
        document.getElementById('background').append(this.elm);
    }
    
    kill(){
        this.yPos += this.speed;
        this.elm.style.left = this.xPos+'px';
        if(this.yPos >= innerHeight-200){
            this.speed=0;
            this.floating=false;
            // console.log("Working")
        }else{
            this.elm.style.top = this.yPos+'px';
            // this.elm.alive = false;
            // this.elm.remove();
            // this.elm=null;
            // this.elm.style.right = 10;
            // this.yPos=-100;
        }
        
        const r1 = (Math.hypot(boxElm.offsetHeight,boxElm.offsetWidth)-55)/2;
        const xDiff =(this.elm.offsetLeft + this.r2) - (boxElm.offsetLeft+boxElm.offsetWidth/2) ;
        const yDiff = (this.elm.offsetTop + this.r2) - (boxElm.offsetTop+boxElm.offsetHeight/2) ;
        const hypot = Math.hypot(xDiff, yDiff);
        
        if (hypot < (r1 + this.r2)-40){ 
            if(alive)++loss;
            alive=false;
            // this.xPos=viewPortWidth+100;
            // this.elm.style.left=this.xPos+'px';
            // this.yPos = (75+Math.random()*275);
            // console.log('Player dead"s: ', ++playerDeadCount);

        }
    } 
}

let floatObj = new FloatingObject();

setInterval(()=>{ 
    // console.log(dinoDeadCount%2==1)
    if(floatObj!=null && d%2==1 && alive){
        // console.log("from 1");
        floatObj.floating=true;
        floatObj.kill();
        if(floatObj.speed===0){
            floatObj.speed = 4+Math.random()*8;
        }
        return;
        // floatObj.xPos = 10+Math.random()*(700-160);
    }else if(divObject.dead){
        floatObj.kill();
    }else{
        floatObj.speed = 0;
        floatObj.xPos = 10+Math.random()*(900);
        floatObj.yPos = -100;
        floatObj.floating = false;
        floatObj.kill();
        // floatObj.style.top = yPos+'px';
        d=2;
        // alert("Okay")
        // floatObj.kill();
        // console.log("from 2");    
    }


},50);


/* Dead count setup */

let lblPosition=100;

const lblWin = document.createElement('label');
lblWin.style.position='absolute';
lblWin.classList.add('animate__animated');
lblWin.style.fontSize='2rem';
lblWin.style.fontWeight='bold';
lblWin.style.backgroundColor="green";
lblWin.style.borderRadius='6px';
lblWin.style.padding='10px';
lblWin.style.top='10px';
lblWin.style.left=lblPosition+'px'
bgElm.append(lblWin);

const lblLoss = document.createElement('label');
lblLoss.style.position='absolute';
lblLoss.classList.add('animate__animated');
lblLoss.style.fontSize='2rem';
lblLoss.style.fontWeight='bold';
lblLoss.style.backgroundColor="darkRed";
lblLoss.style.borderRadius='6px';
lblLoss.style.padding='10px';
lblLoss.style.top='10px';
lblLoss.style.right=lblPosition+'px';
bgElm.append(lblLoss);

let winOldTxt=lblWin.innerText;
let lossOldTxt=lblLoss.innerText;
setInterval(()=>{
    const winCurrentTxt=lblWin.innerText;
    lblWin.innerText=`Win = ${win}`;
    if(winOldTxt!=winCurrentTxt){
        setTimeout(()=>lblWin.classList.add('animate__shakeX'),0) ;
        setTimeout(()=>lblWin.classList.remove('animate__shakeX'),500) ;
        
    }
    winOldTxt=winCurrentTxt;
    
    const lossCurrentText=lblLoss.innerText; 
    lblLoss.innerText=`Loss = ${loss}`;
    if(lossOldTxt!=lossCurrentText){
        setTimeout(()=>lblLoss.classList.add('animate__shakeX'),0) ;
        setTimeout(()=>lblLoss.classList.remove('animate__shakeX'),500) ;
        
    }
    lossOldTxt=lossCurrentText;

},50);
