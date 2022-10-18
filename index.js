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
    let balls = 0
    let win = false

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
        let attack = new Attack(active, kamehameha, this.x,this.y, this.direction)
        attacksArrayOne.push(attack) 
      }
      attackTwo(){

      }
  }

  let characterMian = new Character();

  let attacksArrayOne = []
  let attacksArrayTwo = []//TO BE FILLED WITH SECIND ATTACK

  class Attack{
    constructor(active, imgAttack,x, y, direction){
        this.x = x
        this.y = y
        this.w= 200
        this.h = 130
        this.speed = 5
        this.img = imgAttack
        this.direction = direction 
        this.active = active
    }

    drawAttackOne(){
        if(!this.active){return}// whne they collide this.active = false
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
        //this.y = canvas.height/2,
        this.y = Math.floor(Math.random()*500)
        this.w = 80,
        this.h = 110,
        this.speedY = Math.ceil(Math.random()*3),
        this.speedX = Math.ceil(Math.random()*3),
        //this.speed = 2.5
        this.img = img
    }
    drawEnemy(){

        this.y = this.y + this.speedY //+ Math.random(),
        this.x = this.x + this.speedX //+ Math.random(),
        canvasContext.drawImage(this.img, this.x, this.y, this.w, this.h)

        if (this.y >= canvas.height - 15){
            this.speedY = -this.speedY
        }
        else if(this.y <= canvas.height/2 - 200){
            this.speedY = -this.speedY
        }

    





        //this.x = this.x + this.speed
        //canvasContext.drawImage(this.img, this.x, this.y, this.w, this.h)
    }
  }

  let arrayEnemy1 = []

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
        drawScore()
        dragonBallsCount()
        canvasContext.drawImage(imageBackGround, 500,200, canvas.width, canvas.height) 
        characterMian.drawPlayer(goku) 
        
        for(let i=0; i<arrayEnemy1.length; i++){
          arrayEnemy1[i].drawEnemy()//DRAW DRAGON BALLS
      }

        for(let i=0; i<attacksArrayOne.length; i++){
            attacksArrayOne[i].drawAttackOne()
            for(let e=0; e < energyArray.length; e++) {
              if(energyArray[e].contains(attacksArrayOne[i])){//IDEA FORE EACH HERE TO LOOP THROUGH ENERGY ARRAY AND COMPARE
                //console.log('clolitionnn')
                energyArray[e].active = false   //WHY GAME ENDS THERE IS A BUG
                energyArray.splice(energyArray.indexOf(energyArray[e]), 1)
                //attacksArrayOne[i].active = false //NOTE WHEN TRYONG TO MAKE FALSE CONDITION FOR KAMEHAMEHA I GET ERRORS CHECK WITH TEACHER LATER
                //attacksArrayOne.splice(attacksArrayOne.indexOf(attacksArrayOne[i], 1))
                kills += 1
              }
              //if (attacksArrayOne[i].active === false){
                //attacksArrayOne.splice(attacksArrayOne.indexOf(attacksArrayOne[i], 1))
              //}
            }     
        }
        for(let i=0; i<dragonBallsArray.length; i++){
            dragonBallsArray[i].drawEnergy()//DRAW DRAGON BALLS
            if(characterMian.contains(dragonBallsArray[i])){
              dragonBallsArray[i].active = false
              dragonBallsArray.splice(dragonBallsArray.indexOf(dragonBallsArray[i]),1)
              balls ++
              if(balls >= 1){
                playing = false
                win = true
              }
              //dragonBallsArray[i].splice()
          }
        }
        for(let i=0; i<energyArray.length; i++){
            energyArray[i].drawEnergy()
            if(characterMian.contains(energyArray[i])){
                playing = false
            }
          }
    }else if(win === true){
      winGame()
    }else{
        gameOver()
    }
    requestAnimationFrame(updateDrawing)//makes infinit loop
  }


  //SET TIMEOUTS TO DRAW ENEMY CHARACTERS
  setTimeout(function(){
    let enemy2 = new Enemies(imgEnemy2)
    arrayEnemy1.push(enemy2)
  }, 11000)

  setTimeout(function(){
    let enemy1 = new Enemies(imgEnemy1)
    arrayEnemy1.push(enemy1)
  },24000)

  setTimeout(function(){
    let enemy3 = new Enemies(imgEnemy3)
    arrayEnemy1.push(enemy3)
  },39000)

  setTimeout(function(){
    let enemy4 = new Enemies(imgEnemy4)
    arrayEnemy1.push(enemy4)
  },46000)

  setTimeout(function(){
    let enemy5 = new Enemies(imgEnemy5)
    arrayEnemy1.push(enemy5)
  },60000)

  // setTimeout(function(){
  //   let enemy6 = new Enemies(imgEnemy6)                  GIANT FROM ATTACK ON TITAN BIG FUCKER
  //   arrayEnemy1.push(enemy6)
  // },80000)


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
  function dragonBallsCount(){
    canvasContext.fillStyle = "white"
    canvasContext.font = "30px Arial"
    canvasContext.fillText('DRAGON BALLS:',70,70)
    canvasContext.fillText(balls, 340,70)
  }
  function drawScore(){
    canvasContext.fillStyle = "white"
    canvasContext.font = "30px Arial"
    canvasContext.fillText('ENEMIES KILLED:',70,110)
    canvasContext.fillText(kills, 340,110)
  }
  function gameOver(){
    canvasContext.fillStyle = "white"
    canvasContext.font = "40px Arial"
    canvasContext.fillText('GAME OVER', canvas.width/2-120,canvas.height/2+20)
    canvasContext.fillStyle = "white"
    canvasContext.font = "16px Arial"
    canvasContext.fillText('CLICK ANYWHERE TO PLAY AGAIN',canvas.width/2-126,canvas.height/2+60)
  }
  function winGame(){
    canvasContext.fillStyle = "white"
    canvasContext.font = "40px Arial"
    canvasContext.fillText('あなたが勝った!!', canvas.width/2-100,canvas.height/2+20)
    canvasContext.fillStyle = "white"
    canvasContext.fillText('MAKE YOUR WISH', canvas.width/2-120,canvas.height/2-40)
    canvasContext.fillStyle = "white"
    canvasContext.font = "16px Arial"
    canvasContext.fillText('CLICK ANYWHERE TO PLAY AGAIN',canvas.width/2-85,canvas.height/2+60)
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