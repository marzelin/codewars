/* 
  You've just purchased a new housemaid robot, a sleek new Quapple Robit.
  The Robit is the latest in home care automation, being powered by table scraps
  and capable of performing any one task with no human intervention.  Unfortunately,
  the Robit app's API only allows you to issue one command at a time, which doesn't
  do much for your productivity.  But there is still hope!  Robit's commands
  are exposed in a JavaScript API, so you can write a script for yourself that 
  allows you to chain commands.  

  Your challenge is to write some code that lets you chain functions as you would
  in jQuery or D3.  
  
  $('h1').html("First command").css({background: "#d5d5d5"}).toggle();
  
  *** RULES ***
  
  1) Due to restrictions in Robit's warranty, you are NOT ALLOWED to modify any of
  its prototype functions. Unlicensed tampering with factory code can result in 
  lawsuits, maiming, accidental and/or intentional death, or robot rebellions.
  
  2) All of your code must be within the indicated boundaries below
  
  3) Functions must execute in the order they are called
  
   eg robit.wakeUp().findTrash().pickupTrash().changeBabyDiapers().makeDinner().shutDown();
    
    The Robit must findTrash before it can pickupTrash, and should not shutDown before it 
    can makeDinner.
    
  4) Functions must finish execution before the next one can begin
    
  Click 'Run' at the top of the screen to run your code.
   
  Happy coding!
*/

function Robit() {}

Robit.prototype.wakeUp = function wakeUp(callback) {
  setTimeout(function() {
    callback()
    console.log('Woke up');
  }, 600);
};
Robit.prototype.findTrash = function findTrash(callback) {
  setTimeout(function() {
    callback()
    console.log('Found trash');
  }, 1000);
};
Robit.prototype.pickupTrash = function pickupTrash(callback) {
  setTimeout(function() {
    callback()
    console.log('Picked up trash');
  }, 2000);
};
Robit.prototype.changeBabyDiapers = function changeBabyDiapers(callback) {
  setTimeout(function() {
    callback()
    console.log("Changed baby's diapers");
  }, 750);
};
Robit.prototype.makeDinner = function makeDinner(callback) {
  setTimeout(function() {
    callback()
    console.log('Made dinner');
  }, 500);
};
Robit.prototype.shutDown = function shutDown(callback) {
  setTimeout(function() {
    callback()
    console.log('Shut down for the day');
  }, 3000);
};

/********* ONLY CHANGE CODE BELOW THIS LINE ********/

function MyRobit() {
  const robit = new Robit()
  const tasks = []
  let isBusy = false

  const next = _ => tasks.length 
    ? robit[tasks.shift()](next)
    : (isBusy = false)

  for (let fnName in Robit.prototype)
    this[fnName] = _ => (isBusy
      ? tasks.push(fnName)
      : (robit[fnName](next), isBusy = true)
      , this)
}

const robit = new MyRobit()

/********* ONLY CHANGE CODE ABOVE THIS LINE ********/


console.log("----Expected Output:----")
console.log("Woke up");
console.log("Found trash");
console.log("Picked up trash");
console.log("Changed baby's diapers");
console.log("Made dinner");
console.log("Shut down for the day");
console.log("-----------------------")
console.log("****Actual Output: ****")

robit.wakeUp().findTrash().pickupTrash().changeBabyDiapers().makeDinner().shutDown();