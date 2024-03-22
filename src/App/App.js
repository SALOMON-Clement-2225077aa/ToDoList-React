import React, { useState, useEffect } from 'react';
import '../style/App.css';
import Header from './Header.js';
import Footer from "./Footer";

function App() {
  const initialItems = [
    { id: 1, text: "Learn JavaScript", done: false },
    { id: 2, text: "Learn React", done: false },
    { id: 3, text: "Play around in JSFiddle", done: true },
    { id: 4, text: "Build something awesome", done: true }
  ];

  const [todoItems, setTodoItems] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const savedTodoItems = localStorage.getItem("todoItems");
    if (savedTodoItems) {
      setTodoItems(JSON.parse(savedTodoItems));
    } else {
      setTodoItems(initialItems);
    }
  }, []);

  const saveTodoItemsToLocalStorage = (items) => {
    localStorage.setItem("todoItems", JSON.stringify(items));
  };

  const handleChange = (id) => {
    setTodoItems(todoItems.map(item => {
      if (item.id === id) {
        return { ...item, done: !item.done };
      }
      return item;
    }));
  };

  const handleAddTask = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setNewTask(""); // Réinitialise le champ texte après la fermeture de la modal
  };
  const handleModalSubmit = () => {
    if (newTask.trim() !== "") {
      const newItem = {
        id: todoItems.length > 0 ? todoItems[todoItems.length - 1].id + 1 : 1,
        text: newTask,
        done: false
      };
      setTodoItems([...todoItems, newItem]);
      saveTodoItemsToLocalStorage([...todoItems, newItem]); // Enregistrer dans le localstorage
      setNewTask(""); // Réinitialise le champ texte
      setShowModal(false); // Ferme la modal après l'ajout
    }
  };

  const handleDeletion = (id) => {
    const updatedItems = todoItems.filter(item => item.id !== id);
    setTodoItems(updatedItems);
    saveTodoItemsToLocalStorage(updatedItems);
  };

  const numDone = todoItems.filter(item => item.done).length;
  const numTotal = todoItems.length;

  const handleSave = () => {
    saveTodoItemsToLocalStorage(todoItems);
  };

  const handleLoad = () => {
    const savedTodoItems = localStorage.getItem("todoItems");
    if (savedTodoItems) {
      setTodoItems(JSON.parse(savedTodoItems));
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMoveUp = (id) => {
    const index = todoItems.findIndex(item => item.id === id);
    if (index > 0) {
      const newItems = [...todoItems];
      [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
      setTodoItems(newItems);
      saveTodoItemsToLocalStorage(newItems);
    }
  };

  const handleMoveDown = (id) => {
    const index = todoItems.findIndex(item => item.id === id);
    if (index < todoItems.length - 1) {
      const newItems = [...todoItems];
      [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
      setTodoItems(newItems);
      saveTodoItemsToLocalStorage(newItems);
    }
  };

  const filteredItems = todoItems.filter(item =>
      item.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <div className="todo-container">
        <Header todoItems={todoItems} />
        <ol className="todo-list">
          {filteredItems.map(item => (
              <li className="todo-item" key={item.id}>
                <label>
                  <input type="checkbox" onChange={() => handleChange(item.id)} checked={item.done} />
                  <span className={item.done ? "done task-text" : "task-text"}>{item.text}</span>
                  <button onClick={() => handleMoveUp(item.id)}>↑</button>
                  <button onClick={() => handleMoveDown(item.id)}>↓</button>
                  <button onClick={() => handleDeletion(item.id)} className="delete">Supprimer</button>
                </label>
              </li>
          ))}
        </ol>
        {showModal && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={handleModalClose}>&times;</span>
                <h3>Que voulez-vous ajouter ?</h3>
                <input type="text" placeholder="Ecrire une tâche" value={newTask} onChange={(e) => setNewTask(e.target.value)}/>
                <button onClick={handleModalSubmit}>Valider</button>
              </div>
            </div>
        )}
        <Footer handleAddTask={handleAddTask} handleSearchChange={handleSearchChange} searchTerm={searchTerm}/>
      </div>
  );
}

export default App;
