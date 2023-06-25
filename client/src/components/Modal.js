import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
    // return the creation of a react portal
    return ReactDOM.createPortal(
        // The first argument is the JSX to show
        <div
            onClick={props.onDismiss}
            className="ui dimmer modals visible active"
        >
            {/* This is to prevent the default behavior of bubbling the event up to the parent and triggering the redirect 
        to the Stream List component when clicking inside the content of the modal */}
            <div
                onClick={e => e.stopPropagation()}
                className="ui standard modal visible active"
            >
                <i onClick={props.onDismiss} className="close icon"></i>
                <h3 className="ui header">{props.title}</h3>
                <div className="content">{props.content}</div>
                <div className="actions">{props.actions}</div>
            </div>
        </div>,
        // The second argument is a reference to the element that we are going to render the portal into
        document.getElementById('modal')
    );
};

export default Modal;
