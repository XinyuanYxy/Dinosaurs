function Creature(name, weight, height, diet, img) {
	this.name = name;
	this.weight = weight;
	this.diet = diet;
	this.img = img;
	this.height = height; //height in inches
}

// Create Dino Constructor
function Dino(species, weight, height, diet, where, when, fact, img) {
	Creature.call(this, species, weight, height, diet, img);
	this.where = where;
	this.when = when;
	this.fact = fact;
}
// extend Creature to Dino
Dino.prototype = Object.create(Creature.prototype);
Dino.prototype.constructor = Dino;

//create Human Constructor
function Human() {
	this.feet = document.getElementById('feet').value;
	this.inches = document.getElementById('inches').value;
	let humanHeightinInches = this.feet * 12 + this.inches;
	let name = document.getElementById('name').value;
	let weight = document.getElementById('weight').value;
	let diet = document.getElementById('diet').value;
	Creature.call(
		this,
		name,
		weight,
		humanHeightinInches,
		diet,
		'/images/human.png'
	);
}
//extend Creature to Human
Human.prototype = Creature.prototype;
Human.prototype.constructor = Human;

// Create Dino Objects
const dinos = (function getDinos() {
	let Dinos = [];
	fetch('./dino.json')
		.then((res) => res.json())
		.then((data) => {
			data.Dinos.map(function (dino) {
				let img = '/images/' + dino.species.toLowerCase() + '.png';
				let d = new Dino(
					dino.species,
					dino.weight,
					dino.height,
					dino.diet,
					dino.where,
					dino.when,
					dino.fact,
					img
				);
				Dinos.push(d);
			});
		})
		.catch(function () {
			console.log('error');
		});

	return Dinos;
})();

// Create Dino Compare Method 1
Dino.prototype.heightCompare = function (human) {
	if (human.height > this.height) {
		return `${this.name} is not taller than you, ${human.name}`;
	} else if (human.height < this.height) {
		return `${this.name} is taller than you, ${human.name}, watch out!`;
	} else {
		return `${this.name} is as the same high as you, ${human.name}.`;
	}
};

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.weightCompare = function (human) {
	if (human.weight > this.weight) {
		return `${this.name} is slimmer than you, ${human.name}, Maybe you should consider picking up a sport`;
	} else if (human.weight < this.weight) {
		return `${this.name} is heavier than you, ${human.name}!`;
	} else {
		return `${this.name} has the same weight as you, ${human.name}.`;
	}
};

// Create Dino Compare Method 3
Dino.prototype.dietCompare = function (human) {
	if (human.diet === this.diet) {
		return `${this.name} was a ${this.diet}. You two could share dinner.`;
	} else if (this.diet === 'carnivor') {
		return `${this.name} was a ${this.diet}. Better run as far as possible.`;
	} else if (this.diet === 'herbavor') {
		return `${this.name} was a ${this.diet}. ha, this fact takes a little worry off your plate.`;
	} else {
		return `${this.name} was a ${this.diet}. Time to suggest a potluck.`;
	}
};

Dino.prototype.ranDecide = function (human) {
	let rando = Math.floor(Math.random() * 5);
	let result;
	switch (rando) {
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
};

// Generate Tiles for each Dino in Array

function addtile(human, element, indicator) {
	let grid = document.getElementById('grid');
	let newtile = document.createElement('div');
	newtile.classList.add('grid-item');

	newtile.innerHTML = `<h3>${
		indicator === 'human' ? human.name : element.name
	}</h3>`;

	newtile.innerHTML += `<img src= "${
		indicator === 'human' ? human.img : element.img
	}">`;

	if (indicator === 'dino') {
		newtile.innerHTML += `<p> ${
			element.name == 'Pigeon' ? element.fact : element.ranDecide(human)
		} </p>`;
	}
	grid.appendChild(newtile);
}
// add a GoBack button, and button listener, generate tiles
function generateTiles(human) {
	let grid = document.getElementById('grid');
	let newdiv = document.createElement('div');
	let button = document.createElement('input');
	newdiv.classList.add('goback');
	button.type = 'button';
	button.value = 'Go Back';
	button.addEventListener('click', function () {
		document.getElementById('grid').innerHTML = '';
		document.getElementById('dino-compare').style.display = '';
	});
	button.classList.add('btn1');

	dinos.sort(function () {
		return 0.5 - Math.random();
	});

	dinos.forEach((dino, i) => {
		if (i === 4) {
			addtile(human, dinos[0], 'human');
		}
		addtile(human, dinos[i], 'dino');
	});
	newdiv.appendChild(button);
	grid.appendChild(newdiv);
	document.getElementById('grid').style.display = '';
}
// On button click, prepare and display infographic
document.getElementById('btn').addEventListener('click', function () {
	let human = new Human();
	document.getElementById('dino-compare').style.display = 'none';
	generateTiles(human);
});
