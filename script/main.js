/*
	Traccia:
	L'utente clicca su un bottone che genererà una griglia di gioco quadrata.

	Ogni cella ha un numero progressivo, da 1 a 100. 
	Ci saranno quindi 10 caselle per ognuna delle 10 righe. 
	Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.

	Bonus
	Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
	- con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
	- con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
	- con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
*/

// Generate button
let generateFieldBtn = document.querySelector("button[name='generateField']");

generateFieldBtn.addEventListener("click", generateField);


// Difficulty selector
let difficultySelector = document.querySelector("select[name='difficulty']");
difficultySelector.addEventListener("change", changeDifficulty);

// Change difficulty based on the current selector state
function changeDifficulty() {
	// Easy mode
	if (difficultySelector.value == 1) {
		document.querySelector("input[name='fieldColumns']").value = 10;
		document.querySelector("input[name='fieldRows']").value = 10;
	}
	// Medium mode
	else if (difficultySelector.value == 2) {
		document.querySelector("input[name='fieldColumns']").value = 9;
		document.querySelector("input[name='fieldRows']").value = 9;
	}
	// Hard mode
	else if (difficultySelector.value == 3) {
		document.querySelector("input[name='fieldColumns']").value = 7;
		document.querySelector("input[name='fieldRows']").value = 7;
	}
}

// Main function
function generateField() {

	// Getter for the section of the fields
	let fieldSettings = document.getElementById("fieldSettings");
	let tableSection = document.getElementById("field");

	// Get board size
	let board = {
		// Round the number, converted into number data type, obtained from the raw html input
		columns: Math.round(
			Number(
				fieldSettings.querySelector("input[name='fieldColumns']").value
			)
		),
		// Round the number, converted into number data type, obtained from the raw html input
		rows: Math.round(
			Number(
				fieldSettings.querySelector("input[name='fieldRows']").value
			)
		)
	};

	// Check input data
	if (board.columns > 1 && board.rows > 1 && board.columns < 100 && board.rows < 100) {

		// Input is OK
		// Remove listener
		generateFieldBtn.removeEventListener("click", generateField);

		// Loading message
		fieldSettings.innerHTML = "Generating the field...";

		console.log("Generating the field...");


		// Creates a table element 
		let tableElement = document.createElement('table');
		
		// Creates a table body element 
		let tableBody = document.createElement('tbody');

		// Defines the cell number
		let cellId = 1;

		// For each row
		for (let i = 0; i < board.rows; i++) {
			// Create a table row
			let tableRow = document.createElement('tr');

			// For each column
			for (let j = 0; j < board.columns; j++) {

				// Create a cell with the data inside
				let tableCell = document.createElement('td');

				// Sets the table cell id attribute
				tableCell.setAttribute('id', 'cell-' + cellId);
				
				// Sets the table cell id attribute
				tableCell.setAttribute('class', 'cell');
				
				// Prints the counter
				tableCell.innerHTML = cellId;
				
				// At the click it logs the id and sets the style of the cell to background blue
				tableCell.onclick = function() {
					console.log(this.getAttribute('id'));

					this.setAttribute('style', 'background-color: aqua;');
				}
				
				// Appends the newly created cell to the end of the row
				tableRow.appendChild(tableCell);
				
				// Updates the counter
				cellId++;
			}
			
			// Adds the newly created row to the table
			tableBody.appendChild(tableRow);
		}
		
		// Adds the newly created body to the table
		tableElement.appendChild(tableBody);
		
		// Adds the newly created table to the table
		tableSection.appendChild(tableElement);

		// Clear the message
		fieldSettings.innerHTML = "";
	} else {
		// Print error messagge
		tableSection.innerHTML = "Field settings are not correct. ";
	}
}
