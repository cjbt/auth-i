import React, { Component, useState } from 'react';
import axios from 'axios';
import './App.css';
import { Users } from './component';
import { Route } from 'react-router-dom';
axios.defaults.withCredentials = true;

// const Register = props => {
//   return (
//     <form action="">
//       <input type="text"/>
//       <input type="text"/>
//       <button></button>
//     </form>
//   )
// }

const Dashboard = props => {
  return <div />;
};

const Login = props => {
  const [input, setInput] = useState('');
  const [pass, setPass] = useState('');

  const onHandleSubmit = e => {
    e.preventDefault();
    axios
      .post('https://lambdaauth.herokuapp.com/login', {
        input,
        pass
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
  return (
    <form onSubmit={onHandleSubmit}>
      <input
        type='text'
        name='username'
        placeholder='Enter username'
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <input
        type='password'
        name='password'
        placeholder='Enter password'
        value={pass}
        onChange={e => setPass(e.target.value)}
      />
      <button type='submit'>Login</button>
    </form>
  );
};
class App extends Component {
  render() {
    // console.log(this.state.isLoggedIn);
    return (
      <div className='App'>
        {/* {this.state.users.map(user => (
          <Users user={user} />
        ))} */}
        {/* <Route path='/' component={Register} /> */}
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/login' component={Login} />
      </div>
    );
  }
}

export default App;
