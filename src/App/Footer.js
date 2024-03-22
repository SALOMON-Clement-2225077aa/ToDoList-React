import React from 'react';
import '../style/Footer.css'

function Footer({ handleAddTask, handleSearchChange, searchTerm }) {
    return (
        <footer>
            <input className="search" type="text" placeholder="Rechercher une tâche" value={searchTerm} onChange={handleSearchChange}/>
            <button className="Ajouter" onClick={handleAddTask}>Ajouter</button>
        </footer>
    );
}

export default Footer;
