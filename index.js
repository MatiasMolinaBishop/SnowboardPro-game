//Game wont load until the start-button is clicked (NEED TO ASK HOW THIS ACTUALLY WORKS)
window.onload = () => {
    document.getElementById('start-button').onclick = () => {
      startGame();
    };
  }
  
  //Creat / name our variables
  const canvas = document.getElementById('canvas')
  canvas.width = 1200 //1000
  canvas.height = 600//600
  const canvasContext = canvas.getContext("2d")
  const imageBackGround = new Image()
  imageBackGround.src ='images/moon.png' //TESTING CHANGED TO MOON IMG INSTEAD OF ORIGINAL
  const imageSkiPlayer = new Image()
  imageSkiPlayer.src = 'images/Character1.png'
  const imageSkiPlayer2 = new Image()
  imageSkiPlayer2.src = 'images/Character2.png'

  //Testing for back-ground image infinite loop
  const imgTest = new Image()
  imgTest.src = 'images/panoramic.jpeg'

  class InfiniteLoop{
    constructor(){

        this.imgTest = imgTest,
        this.x = 0,
        //this.y = canvas.heighth/2,
        this.speed = -1
    }
    move(){
        this.x += this.speed;
        this.x %= canvas.width;
    }
    draw(){
        canvasContext.drawImage(this.imgTest, this.x, 0);
        if (this.speed < 0) {
          canvasContext.drawImage(this.imgTest, this.x + canvas.width, 0);
        } else {
          canvasContext.drawImage(this.imgTest, this.x - this.imgTest.width, 0);
        }
      }
      updateCanvas(){
        backgroundImage.move();
        backgroundImage.draw();
      }
    }

    let backgroundImage = new InfiniteLoop

  //Testing for back-ground image infinite loop

  //Here we create our calsses and their methods

  class Character{
    constructor(){
        this.x = canvas.width/2 + 200,
        this.y = canvas.height/2 + 100,
        this.w = 80,
        this.h = 110,
        this.speed = 10,
        this.jump = 80
    }
    drawPlayer(character){//SOMEHOW MAKE IT SO THAT AT THE START YOU CAN CHOOSE DIFFERENT CHARACTERS
        //TRY LATER WITH A BETTER IMAGE. THIS IS A TRIAL
        canvasContext.drawImage(character, this.x, this.y, this.w, this.h)
    }
    moveLeft(){
        if(this.x<0){
          return
        }
        this.x = this.x - this.speed
    }
    moveRight(){
        if(this.x >canvas.width - this.w){// -this.w so that it doesnt disapear
          return
        }
          this.x = this.x + this.speed
    }
    moveUp(){
        if(this.y < 0){
            retunr
        }
        this.y = this.y - this.speed
    }
    moveDown(){
        if(this.y >= canvas.height-90){
            return
        }
        this.y = this.y + this.speed
    }
    jumpUpBrah(){
        if(this.y <= 0){
            return
        }
        this.y = this.y  - this.jump
        //Need to somwhow make him comwdown
    }
    jumpDownBrah(){
        if(this.y >= canvas.height - 90){
            return
        }
        this.y = this.y + this.jump
    }
  }

  let characterMian = new Character();
  let characterRandom = new Character();//FOR NOW ITS THE SAME CLASS. BUT WANT TO CALL IT WITH A ANOTHER CLASS SO THAT IT MPOVES ON ITS OWN.
  //MOVES WITH AI. IF HE HITS SOMETHING ADD SOUNF FUCK!


    //Random objects Class MONSTERS 
    //NEED TO SET LIMITS LIKE THE BALL THAT MOVES ARUFN PING PONG BUT THIS ARE MPNSTERS AND WHEN THEY REACH THE END THE DESPEAR KEEP MOVING
class ObstaclesMonster{//use random at certain things here so that they behave diifferently
    constructor(){
        this.x = 0,
        this.yM =580,//WHY WHEN 590 OR MORE THE MONSTER STOPS MOVING ALONG Y AXIS?
        this.w = 10,
        this.h = 10,
        this.speedY = Math.random()*3,
        this.speedX = Math.random()*3
    }
      drawMonster(){
        this.yM = this.yM + this.speedY //+ Math.random(),
        this.x = this.x + this.speedX //+ Math.random(),
        canvasContext.fillStyle = 'red',
        canvasContext.fillRect(this.x,this.yM,this.w,this.h)
//CODE FORM BALL ABOVE MODIFY
//This makes MONSTER move up and down but also to the right 
//It sets the limits of when to move up or down changing the objects speed
        if (this.yM >= canvas.height - 15){//DONT KNOW WHY I CANT MAKE THE BOUNDRY LESS THAN THE CANVAS HEIGHT
            this.speedY = -this.speedY
        }
        else if(this.yM <= canvas.height/2){
            this.speedY = -this.speedY
        }
    }}

let monsterArray = []

let monster = new ObstaclesMonster()

//Functions

  function startGame() {
    updateDrawing()
  }

  function updateDrawing(){
    canvasContext.clearRect(0,0,canvas.width,canvas.height)//So the image doestn lag?
    //canvasContext.drawImage(imageBackGround, 0, 0, canvas.width, canvas.height) 

    //Test infinite loop








    backgroundImage.updateCanvas()




    canvasContext.drawImage(imageBackGround, 500,200, canvas.width, canvas.height) 
 








    //Test infinite loop
    
    characterMian.drawPlayer(imageSkiPlayer)//Calling charcater objecst method to draw image of character

    characterRandom.drawPlayer(imageSkiPlayer2)

    //monster.drawMonster()

    for(let i=0; i<monsterArray.length; i++){
        monsterArray[i].drawMonster()
      }

    requestAnimationFrame(updateDrawing)//makes infinit loop
  }

  //Set Intervals functions
  setInterval(function(){
    let monster = new ObstaclesMonster()
    monsterArray.push(monster)
  }, 3000)

  //EventListeners to make game live / reactive to the player's input

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
    else if(e.keyCode === 32){
        //jump        
        characterMian.jumpUpBrah() 
        //characterMian.jumpDownBrah()
        //Maybe with a time interval that calls jumpUpBrah fucntion and after milliseidns it calls the jumpDownBrah function
    }
    else if(e.keyCode === 67){//C NOTE THIS IS ONLY TO TEST THAT JUMPDOWNBRAH METHOD IS WORKING. IT WORKS!
        characterMian.jumpDownBrah()
    }
  })