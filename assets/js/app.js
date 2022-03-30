// Les imports importants
import React from 'react';
import ReactDOM from 'react-dom';

// any CSS you import will output into a single css file (app.css in this case)
import '../styles/app.css';

// start the Stimulus application
import '../bootstrap';

const App = () => {
    return ( 
        <h1>Hello !</h1>
    );
}

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);