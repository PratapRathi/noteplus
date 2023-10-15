import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';

const Alert = () => {
    const context = useContext(noteContext);
    const { alert } = context;

    const capitalize = (word) => {
        if (word === "danger") word = "error";
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    const styles = {
        position: 'fixed',
        zIndex: '9999',
        width: '100%',
    }

    return (
        <div style={styles}>
            {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                <strong>{capitalize(alert.type)}</strong>: {alert.msg}
            </div>}
        </div>
    )
}

export default Alert
