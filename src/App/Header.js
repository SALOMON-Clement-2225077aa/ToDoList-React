import React from 'react';
import '../style/Header.css';

function Header({ todoItems }) {
    const numTotal = todoItems.length;
    const numChecked = todoItems.filter(item => item.done).length;
    const progress = numTotal === 0 ? 100 : (numChecked/numTotal)*100;

    return (
        <header>
            <h2>Ma to-do-list :</h2>
            <div className="progress-label">Tâches effectuées : {numChecked}/{numTotal}</div>
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
        </header>
    );
}

export default Header;
