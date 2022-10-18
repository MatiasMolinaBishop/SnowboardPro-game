//LOAD WEB PAGE BEFORE CLICKING ON START-BUTTON
window.onload = () => {
    document.getElementById('start-button').onclick = () => {
      startGame();
    };
  }
  
  //INITIAL CODE VARIABLES TEMPLATE

  const canvas = document.getElementById('canvas')
  canvas.width = 1250 
  canvas.height = 700
  const canvasContext = canvas.getContext("2d")
  
//IMAGE VARIBABLES 

  const imageBackGround = new Image()
  imageBackGround.src ='images/moon.png' 
  const imgGokuLeft = new Image()
  imgGokuLeft.src = 'images/gokuLeft.png'
  const imgGokuRight = new Image()
  imgGokuRight.src = 'images/gokuRight.png'
  const imgGokuAttackLeft = new Image()
  imgGokuAttackLeft.src = 'images/kamehamehaLeft.png'
  const imgGokuAttackRight = new Image()
  imgGokuAttackRight.src = 'images/kamehamehaRight.png'
  const imgEnergyBall = new Image()
  imgEnergyBall.src = 'images/monsterEnery3.png'
  const imgCharacter2 = new Image()
  imgCharacter2.src = 'images/Character2.png'
  const imgWorldOne = new Image()
  imgWorldOne.src = 'images/panoramic.jpeg'
  const imgDragonSphere = new Image()
  imgDragonSphere.src = 'images/esferaDragon.png'//chcek
  const imgEnemy1 = new Image()
  imgEnemy1.src  = 'images/enemy1.png'
  const imgEnemy2 = new Image()
  imgEnemy2.src  = 'images/enemy2.png'
  const imgEnemy3 = new Image()
  imgEnemy3.src  = 'images/enemy3.png'
  const imgEnemy4 = new Image()
  imgEnemy4.src  = 'images/enemy4.png'
  const imgEnemy5 = new Image()
  imgEnemy5.src  = 'images/enemy5.png'

  
//INITIAL COUNTERS,CONDITIONS
    let playing = true
    let kills = 0//TO KEEP SCORE OF ENERGY BALLS DISTROYED
    let active = true

  //INSTANCE OBJECTS TOKENS AS IMGAES
    let goku = imgGokuLeft
    let kamehameha = imgGokuAttackLeft

  //CLASSES
  class World{//SETS THE WOLRD BACKGROUND PARAMETER WORLD TO ALLOW DOM TO CHANGE IMAGE WHEN SELECTING WORLDS
    constructor(world){
        this.img = world,
        this.x = 0,
        this.speed = -0.5
    }
    move(){
        this.x += this.speed;
        this.x %= canvas.width;
    }
    draw(){
        canvasContext.drawImage(this.img, this.x, 0);
        if (this.speed < 0) {
          canvasContext.drawImage(this.img, this.x + canvas.width, 0);
        } else {
          canvasContext.drawImage(this.img, this.x - this.img.width, 0);
        }
      }
      updateCanvas(){
        worldOne.move();
        worldOne.draw();
      }
    }

    let worldOne = new World(imgWorldOne) //NEW INSTANCE OBJECT OF CLASS WORLD
    //TO CREATE ANOTHER WORLD FIND PANORAMIC IMG THAT WORKS AND CREATE INSTANCE OBJECT WITH THE IMG VARIALE AS ARGUMENT 
    //LATER CAN MANIPULATE WITH DOM TO CHANGE ONJECT CALLED UPON BY SUER INPPUT TO DISPLAY GAME

  class Character{
    constructor(){
        this.x = canvas.width/2 + 200,
        this.y = canvas.height/2 + 100,
        this.w = 80,
        this.h = 110,
        this.speed = 36,
        this.direction = 'left'
    }
    drawPlayer(character){//SOMEHOW MAKE IT SO THAT AT THE START YOU CAN CHOOSE DIFFERENT CHARACTERS
        canvasContext.drawImage(character, this.x, this.y, this.w, this.h)
    }
    moveLeft(){
        if(this.x<0){//SET MOVEMENT LIMITS
          return
        }
        this.direction = 'left'
        this.x = this.x - this.speed
        goku = imgGokuLeft
        kamehameha = imgGokuAttackLeft
    }
    moveRight(){
        if(this.x >canvas.width - this.w){//SET MOVEMENT LIMITS
          return
        }
        this.direction = 'right'
        this.x = this.x + this.speed
        goku = imgGokuRight
        kamehameha =  imgGokuAttackRight
    }
    moveUp(){
        if(this.y < 0){//SET MOVEMENT LIMITS
            retunr
        }
        this.y = this.y - this.speed
    }
    moveDown(){
        if(this.y >= canvas.height-90){//SET MOVEMENT LIMITS
            return
        }
        this.y = this.y + this.speed
    }
    //TEST COLITION WITH OBJECTS
    contains(b){
        return (this.x < b.x + b.w) &&
          (this.x + this.w > b.x) &&
          (this.y < b.y + b.h) &&
          (this.y + this.h > b.y)
      }
      attackOne(){
        let attack = new Attack(kamehameha, this.x,this.y, this.direction)
        attacksArrayOne.push(attack) 
      }
      attackTwo(){

      }
  }

  let characterMian = new Character();
  let characterRandom = new Character();//FOR NOW ITS THE SAME CLASS. BUT WANT TO CALL IT WITH A ANOTHER CLASS SO THAT IT MPOVES ON ITS OWN.
  //MOVES WITH AI. IF HE HITS SOMETHING ADD SOUNF FUCK!

let attacksArrayOne = []
let attacksArrayTwo = []//TO BE FILLED WITH SECIND ATTACK

  class Attack{
    constructor(imgAttack,x, y, direction){
        this.x = x
        this.y = y
        this.w= 200
        this.h = 130
        this.speed = 5
        this.img = imgAttack
        this.direction = direction 
    }

    drawAttackOne(){
        if(this.direction === 'left'){
            this.x = this.x - this.speed
            canvasContext.drawImage(this.img, this.x - 160, this.y, this.w, this.h)
        }
        else if(this.direction === 'right'){
            this.x = this.x + this.speed
            canvasContext.drawImage(this.img, this.x + 40, this.y, this.w, this.h)
        }
    }
    drawAttackTwo(){

    }
  }
  class Enemies{//CREATE ARRAY OF ENEMIES SAME PROPERTIES BUT CHANGE IMG AS ARGUMENT LOOP OVER ARRAY  OF ENEMIES TO HAVE THEM SHOW UP EVERY 15 SECONDS
    constructor(img){
        this.x = 0,
        this.y = canvas.height/2,
        this.w = 80,
        this.h = 110,
        this.speed = 20
        this.img = img
    }
    drawEnemy(){
        this.x = this.x + this.speed
        canvasContext.drawImage(this.img, this.x, this.y, this.w, this.h)
    }
  }
//NEED TO PUSH THEM INTO ARRAY SOMEHOE
  let enemy1 = new Enemies()//INSERT IMAGE OG ENEMIES
  let enemy2 = new Enemies()//INSERT IMAGE OG ENEMIES
  let enemy3 = new Enemies()//INSERT IMAGE OG ENEMIES
  let enemy4 = new Enemies()//INSERT IMAGE OG ENEMIES5

  let enemiesArray =[enemy1, enemy2, enemy3, enemy4]//ITERATE THROUGH ARRAY ON UPDATE DRAWING FUNCTION WITH SET TIMER

class Energy{//OBJECT THAT DISROY TO DISTROY / ENEMY
    constructor(active){
        this.x = 0,
        this.y =580,
        this.w = 50,
        this.h = 50,
        this.speedY = Math.random()*3,
        this.speedX = Math.random()*3,
        this.active = active //condition that will allow for monster to be drawn
    }
    contains(b){
        return (this.x < b.x + b.w) &&
          (this.x + this.w > b.x) &&
          (this.y < b.y + b.h) &&
          (this.y + this.h > b.y)
      }
      drawEnergy(){
        if(!this.active){return}// whne they collide this.active = false
        this.y = this.y + this.speedY //+ Math.random(),
        this.x = this.x + this.speedX //+ Math.random(),
        canvasContext.drawImage(imgEnergyBall, this.x, this.y, this.w, this.h)

        if (this.y >= canvas.height - 15){
            this.speedY = -this.speedY
        }
        else if(this.y <= canvas.height/2 - 200){
            this.speedY = -this.speedY
        }
    }}

let energyArray = []

class dragonBalls{//CHECK
    constructor(){
        this.x = 0,
        this.y =580,
        this.w = 50,
        this.h = 50,
        this.speedY = Math.random()*3,
        this.speedX = Math.random()*3,
        this.active = true //condition that will allow for monster to be drawn
    }
      drawEnergy(){
        if(!this.active){return}// whne they collide this.active = false DONT UNDESTAND THIS SYNTHAX
        this.y = this.y + this.speedY //+ Math.random(),
        this.x = this.x + this.speedX //+ Math.random(),
        canvasContext.drawImage(imgDragonSphere, this.x, this.y, this.w, this.h)

        if (this.y >= canvas.height - 15){
            this.speedY = -this.speedY
        }
        else if(this.y <= canvas.height/2 - 200){
            this.speedY = -this.speedY
        }
    }}

    let dragonBallsArray = []

//Functions

  function startGame() {
    updateDrawing()
  }
  function updateDrawing(){
    canvasContext.clearRect(0,0,canvas.width,canvas.height)//So the image doestn lag?

    //Infinite loop
    worldOne.updateCanvas()
   
    if(playing){
        drawTimer()
        drawKills()
        canvasContext.drawImage(imageBackGround, 500,200, canvas.width, canvas.height) 
        characterRandom.drawPlayer(imgCharacter2)
        characterMian.drawPlayer(goku)

        for(let i=0; i<attacksArrayOne.length; i++){
            attacksArrayOne[i].drawAttackOne()
            //if(energyArray[i].contains(attacksArrayOne[i])){//IDEA FORE EACH HERE TO LOOP THROUGH ENERGY ARRAY AND COMPARE
                //ills = kills + 1 
                //active = false
            
        }

        for(let i=0; i<dragonBallsArray.length; i++){
            dragonBallsArray[i].drawEnergy()//DRAW DRAGON BALLS
        }

        for(let i=0; i<energyArray.length; i++){
            energyArray[i].drawEnergy()
            if(characterMian.contains(energyArray[i])){
                playing = false
            }
          }
    }else{
        gameOver()
    }
    requestAnimationFrame(updateDrawing)//makes infinit loop
  }

  //SET INTERVAL FUNCTIONS
  setInterval(function(){
    let energy = new Energy(active)
    energyArray.push(energy)
  }, 3000)

  setInterval(function(){
    let dragonBall = new dragonBalls()
    dragonBallsArray.push(dragonBall)
  }, 9000)

  //AUXILIARY FUNCTIONS
  function drawTimer(){
    canvasContext.fillStyle = "white"
    canvasContext.font = "40px Arial"
    canvasContext.fillText('00:00', 70,70)
  }
  function drawKills(){
    canvasContext.fillStyle = "white"
    canvasContext.font = "40px Arial"
    canvasContext.fillText('POINTS:',1000,70)
    canvasContext.fillText(kills, 1180,70)
  }
  function gameOver(){
    canvasContext.fillStyle = "white"
    canvasContext.font = "40px Arial"
    canvasContext.fillText('GAME OVER', canvas.width/2-120,canvas.height/2+20)
    canvasContext.fillStyle = "white"
    canvasContext.font = "16px Arial"
    canvasContext.fillText('CLICK ANYWHERE TO PLAY AGAIN',canvas.width/2-126,canvas.height/2+60)
  }

  //EVENT LISTENERS
  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 37){
      //move left
      characterMian.moveLeft()
      //console.log(e)
    } else if (e.keyCode === 39){
      //move right
      characterMian.moveRight()

    }else if (e.keyCode === 38){
        //move up
        characterMian.moveUp()
    }
    else if (e.keyCode === 40){
        //move down
        characterMian.moveDown()
    }
    else if(e.keyCode ===18){
        characterMian.attackOne()
    }
  })
//TO PLAY AGAIN DIFFICULT LEAVE FOR THR END
  document.getElementById('canvas').onclick = () => {
    playing = true
    canvasContext.clearRect(0,0,canvas.width, canvas.height)

  };