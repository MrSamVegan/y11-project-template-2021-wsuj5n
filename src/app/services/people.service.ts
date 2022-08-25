import { Injectable , OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeopleService   {
  people=[];  //people array setup to hold data from people DB
  valid: any;
  constructor() {
      /* ====LOCALSTORAGE========
    Local storage stores data as key-value pairs, and the values are stored as "strings". 
    So, if we must JSON.stringify when we put them into LocalStorage and we must 'parse' the string into a valid object. when we retrieve it.

    This inictial checks to see if the peopleDB in local storage exsits, if it doen;t it creates a blanck db in lcoal storage called peopleDB
    */
    if (localStorage.peopleDB == null ) {
        localStorage.setItem('peopleDB', JSON.stringify(this.people));
    }

  } //end constructor

  //this function extacts data from the peopleDB and puts it in the array people
  getPeople() {
    let people = JSON.parse(localStorage.getItem('peopleDB'));
    return people;
  }

  // this FUNCTION accepts 'one' parameter 'person' which as an object
  // and pushes this parameter into the peole array
  addPerson(person): void {
    let people = JSON.parse(localStorage.getItem('peopleDB'));
    people.push(person);  //add the object to the end of the array
    localStorage.setItem('peopleDB', JSON.stringify(people));
  }

// this function edits the data in the peopleDB
  editPerson(person, id): void {
    let people = JSON.parse(localStorage.getItem('peopleDB'));
    people[id] = person; //change the objects at array position id
    localStorage.setItem('peopleDB', JSON.stringify(people));
  }

  deletePerson(id): void {
    let people = this.getPeople()
    people.splice(id, 1);  //remove the person at position ID in the array
    localStorage.setItem('peopleDB', JSON.stringify(people));
  }

  checkAdd(addValues): void {
    //check if inputs in the add are valid
    this.valid = "pass";

    //First name check
    if (typeof addValues.fName === 'undefined' || addValues.fName == null || addValues.fName == "") {
      this.valid = "frnameFail";
    } 

    //Phone number check
    if (isNaN(addValues.phone) || addValues.phone == null || addValues.phone == "" || addValues.phone.length != 10) {
       this.valid = "pNumberFail";
    }

    //Forklift check
    if (addValues.forkLice == null) {
      this.valid = "forkLiceFail";
    }

    //Licence class check
    if (addValues.lClass == null) {
      this.valid = "lClassFail";
    }

    //Licence expiry check
    if (addValues.eDate == null) {
      this.valid = "lExpiryFail";
    }

    //Licence number check
    var checklic = addValues.lNumber;
    if (checklic.length != 8 && checklic.length != 6){
      this.valid = "lNumberFail";
    } else {
      if (checklic.length == 8){
        for (let i = 0; i <= 7; i++) {
          if (checklic.charAt(i) < '0' || checklic.charAt(i) > '9') {
            this.valid = "lNumberFail";
          }
        }
      } else if (checklic.length == 6){
        for (let i = 0; i <= 3; i++) {
          if (checklic.charAt(i) < '0' || checklic.charAt(i) > '9') {
            this.valid = "lNumberFail";
          }
        }
        for (let i = 4; i <= 5; i++) {
          if (checklic.charAt(i).toUpperCase() < 'A' || checklic.charAt(i).toUpperCase() > 'Z')  {
            this.valid = "lNumberFail";
          }
        }
      }
    }

    

    console.log("fName is " + addValues.fName); //debugging output
    console.log("valid is inside check " + this.valid); //debugging output



    return this.valid;
  } // end checkadd


}  // end class




