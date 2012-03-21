// Taylor Eisman
// JavaScript File Project 4
// VFW 03/12

window.addEventListener("DOMContentLoaded", function(){

	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}

	function makeCats(){
		var formTag = document.getElementsByTagName("form"),
			selectLi = $('select'),
			makeSelect = document.createElement('select');
		makeSelect.setAttribute("id", "years");
		for( var i=0, j=contactYears.length; i < j; i++ ) {
			var makeOption = document.createElement("option");
			var	optText = contactYears[i];
			makeOption.setAttribute("value", contactYears[i]);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
	
	function getSelectedRadio(){
		var radios = document.forms[0].transmission;
		for (var i=0; i<radios.length; i++){
			if(radios[i].checked){
				transmissionValue = radios[i].value; 
			}
		}
	}
	
	function setCheckboxValue(){
		if($('leather').checked){
			leatherValue = $('leather').value;
		}else{
			leatherValue = "No"
		}
	}
	
	function toggleControls(n){
		switch(n){
			case "on":
				$('carDetails').style.display = "none";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "none";
				$('addNew').style.display = "inline";
				break;
			case "off":
				$('carDetails').style.display = "block";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "inline";
				$('addNew').style.display = "none";
				$('items').style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	function storeData(key){
		// here and also ^
		if(!key){
			var id  			= Math.floor(Math.random()*10000001);
		}else{
			id = key;
		}
		//
		
		
		getSelectedRadio();
		setCheckboxValue();
		var item					= {};
			item.year				= ["Year: ", $('years').value];
			item.make				= ["Make: ", $('make').value];
			item.model				= ["Model: ", $('model').value];
			item.color				= ["Color: ", $('color').value];
			item.transmission		= ["Transmission: ", transmissionValue];
			item.leather			= ["Leather: ", leatherValue];
			item.horsepower			= ["Horsepower: ", $('horsepower').value];
			item.date				= ["Date: ", $('date').value];
			item.notes				= ["Notes: ", $('notes').value];
		localStorage.setItem(id, JSON.stringify(item));
		alert("Car Saved!");
	}
	
	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
			autoFillData();
			alert("No data exists so default data was added.");
		}
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display = "block";
		for(var i=0, len=localStorage.length; i<len;i++){
			var makeli = document.createElement('li');
			var linksLi = document.createElement('li');    // here created new li item to hold links
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
			for(var n in obj){
				var makeSubli = document.createElement('li');
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);  // here added to makeSubList
			}
			makeItemLinks(localStorage.key(i), linksLi);	//here create edit and delete buttons/links for each item in local storage ("called function to")
		}
	}
	
	
	// created my makeItemLinks function to create edit delete links for each stored item when displayed
	function makeItemLinks(key, linksLi){
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Car Details";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
		
		var deleteLink = document.creatElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Car";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteTesxt;
		linksLi.appendChild(deleteLink);
	}
	// created edit item function
	function editItem(){
		var value = localStorage.getItem(this.key);
		var itme = JSON.parse(value);
		
		toggleControls("off");
		
		$('years').value = item.year[1];
		$('make').value = item.make[1];
		$('model').value = item.model[1];
		$('color').value = item.color[1];
		var radios = document.forms[0].transmission;
		for(var i=0; i<radios.length; i++){
			if(radios[i].vaule == "Automatic" && item.transmission[1] == "Automatic"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Manuel" && item.transmission[1] == "Manuel"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		if(item.leather[1] === "Yes"){
			$('leather').setAttribute("checked", "checked");
		}
		$('horsepower').value		= item.horsepower[1];
		$('date').vaule				= item.date[1];
		$('notes').value 			= item.notes[1];
		
		// rmove the listener from the input 'save contact' button.
		save.removeListener("click", storeData);
		// change Submit button value to edit button
		$('submit').value = "Edit Details";
		var editSubmit = $('submit');
		// Save the key value established in this function as a property of the editSubmit event
		// so we can use that data to the value we edited
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}
	
		function deleteItem(){
			var ask = confirm("Delete Car?");
			if(ask){
				localStorage.removeItem(this.key);
				alert("Contact was deleted.");
				window.location.reload();
			}else{
				alert('Car was not deleted.');
			}
		}
	
	
	function clearLocal() {
		if(localStorage.length === 0){
			alert("There is no data to clear.");
		}else{
			localStorage.clear();
			alert("All data was deleted.");
			window.location.reload();
			return false;
		}
	}
	
	// here
	function validate(e){
		// define elements to check
		var getYear 	= $('years');
		var getMake 	= $('make');
		var getModel 	= $('model');
		var getColor 	= $('color');
		
		// reset error messages
		errMsg.innerHTML = "";
			getYear.style.border = "1px solid black";
			getMake.style.border = "1px solid black";
			getModel.style.border = "1px solid black";
			getColor.style.border = "1px solid black";

		
		// Get Error Messages
		var messageArray = [];
		// year validation
		if(getYear === "--Choose Year--"){
			var yearError = "Please select a year.";
			getYear.style.border = "1px solid red";
			messageArray.push(yearError);
		}
		
		// make validation
		if(getMake.value === ""){
			var makeError = "Please enter the Make.";
			getMake.style.border = "1px solid red";
			messageArray.push(makeError);
		}
		// model validation
		if(getModel.value === ""){
			var modelError = "Please enter the Model.";
			getModel.style.border = "1px solid red";
			messageArray.push(modelError);
		}
		// color validation
		if(getColor.value === ""){
			var colorError = "Please enter the Color.";
			getColor.style.border = "1px solid red";
			messageArray.push(colorError);
		}
		
		// if errors display on screen
		if(messageArray.length >= 1){
			for(var i=0, j=messageArray.length; i < j; i++){
				var txt = document.createElement('li');
				txt.innerHTML = messageArray[i];
				errMsg.appendChild(txt);
				
			}
			e.preventDefault();
			return false;
			
		}else{
			// if ok save data
			storeData(this.key);
		}
		
	}
	
	
	
	// if had email
	// email validation
	// var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))+$/;
	// if(!(re.exec(getEmail.value))){
	//	var emailError = "Please enter a valid email address.";
	// 	getEmail.style.border = "1px solid red";
	//	messageArray.push(emailError);
	// }
	
	
	
	
	var contactYears = ["--Choose A Year--", "1966", "1967", "1968", "1969"],
		transmissionValue,
		leatherValue = "No",
		errMsg = $('errors'); // here
	;
	
	var displayLink = $('displayLink');
	displayLink.addEventListener("click", getData);
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal);	
	var save = $('submit');
	save.addEventListener("click", validate);  // here store data to validate
	var checkbox = $('leather');
	checkbox.addEventListener("click", setCheckboxValue);
	var radios = document.forms[0].transmission;
	for(var i=0; i<radios.length; i++){
		radios[i].addEventListener("click", getSelectedRadio);
	}
	
	makeCats();
	
});


