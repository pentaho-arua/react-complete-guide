import React, { Component } from 'react';

import classes from './App.css';
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";


class App extends Component {
  state = {
    persons: [
      { id: "aaa", name: "André", age: 35 },
      { id: "bbb", name: "Elio", age: 25 },
      { id: "ccc", name: "Vasco", age: 38 },
      { id: "ddd", name: "Paula", age: 35 },
      { id: "eee", name: "Vera", age: 37 }
    ],
    otherState: "Some value",
    showPersons: false
  }

  nameChangedHandler = (event, id) => {
    // NOTE: This is the best approach to update information in the state without manipulating any part of the state directly
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    })

    const person = {
      ...this.state.persons[personIndex]
    }
    // This is the same, just with old syntax
    // const person = Object.assign({}, this.state.persons[personIndex]);
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  }

  deletePersonHandler = (personIndex) => {
    /*
      DON'T DO THIS. Since the objects are pointers instead of new objects we are not creating a new object, instead using 
      the same reference to the original object, thus when we use splice on the persons object we are actually mutating the actual state and
      we shouldn't manipulate the state directly.
    
      const persons = this.state.persons;
      persons.splice(personIndex, 1);
      this.setState({ persons: persons });
    */
    const persons = [...this.state.persons]; // Using the spread operator `...` we are copying all the elements inside the array into the new one.
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  }

  togglePersonsHandler = () => {
    this.setState({ showPersons: !this.state.showPersons })
  }

  render() {
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangedHandler}
      />
    }

    return (
      <div className={classes.App}>
        <Cockpit
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler}
        />
        {persons}
      </div>
    );

    // This is the same as the code above
    //return React.createElement("div", { className: "App" }, React.createElement("h1", null, "This is a react app"));
  }
}

export default App;
