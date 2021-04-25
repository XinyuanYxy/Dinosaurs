
    // Create Dino Constructor
function Dino(species,weight,height,diet,where,when,fact,img){
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
    this.img = img;

};
// Create Dino Objects





const dinos = (function getDinos() {
    let Dinos = [];
    //fetch data from json and push data into Dinos array
    fetch("./dino.json")
  .then((res) => res.json())
  .then(data => {
    data.Dinos.map(function (dino){
        let img = '/images/'+ dino.species.toLowerCase()+'.png';
        let d = new Dino(dino.species,dino.weight,dino.height,dino.diet,dino.where,dino.when,dino.fact,img);
        Dinos.push(d);
    })
   
    ;
  });

    return Dinos;

})();





    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 
Dino.prototype.heightCompare = function (human){
    let humanHeightinInches = human.feet*12 + human.inches;
    if (humanHeightinInches > this.height) {
        return `${this.species} is not taller than you, ${human.name}`;
    }else if (humanHeightinInches < this.height){
        return `${this.species} is taller than you, ${human.name}, watch out!`
    }else{
        return `${this.species} is as the same high as you, ${human.name}.`
    }
}
    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.weightCompare = function (human){
   
    if (human.weight > this.weight) {
        return `${this.species} is slimmer than you, ${human.name}, May be you should consider picking up a sport`;
    }else if (human.weight < this.weight){
        return `${this.species} is heavier than you, ${human.name}!`
    }else{
        return `${this.species} has the weight as you, ${human.name}.`
    }
}
    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.dietCompare = function (human){

    if (human.diet === this.diet){
        return `${this.species} was a ${this.diet}. You two could share dinner.`;
    } else if (this.diet === "carnivor"){
        return `${this.species} was a ${this.diet}. Better run as far as possible.`;
    } else if (this.diet === "herbavor"){
        return `${this.species} was a ${this.diet}. ha, this fact takes a little worry off your plate.`;
    } else {
        return `${this.species} was a ${this.diet}. Time to suggest a potluck.`;
    }
}

Dino.prototype.ranDecide =  function (human){
    var rando = Math.floor(Math.random()*5);
    switch(rando){
        case 1:
            result = this.dietCompare(human);
            break;
        case 2:
            result = this.weightCompare(human);
            break;
        case 3:
            result = this.heightCompare(human);
            break;
        case 4: 
            result = this.fact;
            break;
        default:
            result = this.fact;
            break;
    }
    return result;
}

    // Generate Tiles for each Dino in Array

function addtile(human,element,indicator){

    let grid = document.getElementById('grid');
    let newtile = document.createElement('div');
    newtile.classList.add("grid-item");

    newtile.innerHTML=`<h3>${
        indicator ==="human" ? human.name : element.species
    }</h3>`;

    newtile.innerHTML += `<img src= "${
        indicator === "human" ? "/images/human.png" : element.img
    }">`;

    if (indicator === "dino"){
        newtile.innerHTML += `<p> ${
            element.species == "Pigeon" ? element.fact : element.ranDecide(human)

        } </p>`;

    }




    grid.appendChild(newtile);

   
}


function generateTiles(human){
    for (let i = 0;i<4;i++){
        addtile(human,dinos[i],"dino");
    }
    addtile(human,dinos[0],"human");
    for (let i = 4;i<8;i++){
        addtile(human,dinos[i],"dino");

    }


}  



        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic
document.getElementById('btn').addEventListener('click', function (){
    // create human object
    const Human =(function (){
        let formItems = document.getElementById('dino-compare');
        let name = formItems[0].value;
        let feet = formItems[1].value 
        let inches =  formItems[2].value 
        let weight = formItems[3].value;
        let diet = formItems[4].value;
    
        return {
            name: name,
            feet: feet,
            inches: inches,
            weight: weight,
            diet: diet
        };
    
    })();

    let form = document.getElementById("dino-compare");
    form.innerHTML="";

   

 
    generateTiles(Human);



});
