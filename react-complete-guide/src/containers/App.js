import React, { Component } from 'react';
import classes from  './App.css';

import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Aux';

class App extends Component {
  constructor(props) {
    super(props)
    console.log('[App.js] constructor')
    // this.state = {
    //   persons: [
    //     { id: 'asdfae', name: 'Max', age: 28 },
    //     { id: 'ae13rf', name: 'Manu', age: 29 },
    //     { id: 'aae3f', name: 'Stephanie', age: 26 }
    //   ],
    //   otherState: 'Some other value',
    //   showPersons: false,
    // }
  }

  state = {
    persons: [
      { id: 'asdfae', name: 'Max', age: 28 },
      { id: 'ae13rf', name: 'Manu', age: 29 },
      { id: 'aae3f', name: 'Stephanie', age: 26 }
    ],
    otherState: 'Some other value',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
  }

  static getDerivedStatFromProps(props, state) {
    console.log('[App.js getDerivedStatFromProps', props);
    return state;
  }

  // componentWillMount() {
  //   console.log('[App.js] componentWillMount')
  // }

  componentDidMount() {
    console.log('[App.js] componentDidMount')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate')
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate')
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons]; // => creates copy of state.persons w/o mutating original state
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    // const person = Object.assign({}, this.state.persons[personIndex]);
    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState((prevState, props) => { // => Use this pattern when updating state depends on old state
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      }
    });
  }

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow })
  }

  render() {
    console.log('[App.js] render')
    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <Persons 
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}/>
      );
    }

    return (
      <Aux classes={classes.App}>
        <button onClick={() => this.setState({ showCockpit: !this.state.showCockpit })}>Remove cockpit</button>
        { this.state.showCockpit ? <Cockpit
          title={this.props.appTitle}
          showPersons={this.state.showPersons}
          personsLength={this.state.persons.length}
          clicked={this.togglePersonHandler} /> : '' }
        { persons }
      </Aux>
    );
  }
}

export default withClass(App, classes.App);
