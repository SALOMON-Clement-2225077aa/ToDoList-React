import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { text: "Learn JavaScript", done: false },
        { text: "Learn React", done: false },
        { text: "Play around in JSFiddle", done: true },
        { text: "Build something awesome", done: true }
      ],
      newItemText: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleTaskToggle = this.handleTaskToggle.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
  }

  handleInputChange(event) {
    this.setState({ newItemText: event.target.value });
  }

  handleAddTask() {
    const newItem = { text: this.state.newItemText, done: false };
    this.setState(prevState => ({
      items: [...prevState.items, newItem],
      newItemText: '' // Clear input after adding task
    }));
  }

  handleTaskToggle(index) {
    this.setState(prevState => {
      const items = [...prevState.items];
      items[index].done = !items[index].done;
      return { items };
    });
  }

  handleDeleteTask(index) {
    this.setState(prevState => {
      const items = [...prevState.items];
      items.splice(index, 1); // Remove the task at the specified index
      return { items };
    });
  }

  render() {
    const nbWait = this.state.items.filter(item => !item.done).length;
    return (
        <div className="App">
          <header className="App-header">
            <h2>Todos:</h2>
            <ol>
              {this.state.items.map((item, index) => (
                  <li key={index}>
                    <label>
                      <input type="checkbox" onChange={() => this.handleTaskToggle(index)} checked={item.done} />
                      <span className={item.done ? "done" : ""}>{item.text}</span>
                    </label>
                    <button onClick={() => this.handleDeleteTask(index)}>Supprimer</button>
                  </li>
              ))}
            </ol>
            <label>Nombre de tâches effectué : {nbWait}/{this.state.items.length} </label>
            <br /><br />
            <input type="text" value={this.state.newItemText} onChange={this.handleInputChange} />
            <button onClick={this.handleAddTask}>+</button>
          </header>
        </div>
    );
  }
}

ReactDOM.render(<TodoApp />, document.getElementById("root"));

export default TodoApp;
