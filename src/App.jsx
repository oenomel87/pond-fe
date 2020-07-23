import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import Login from './pages/login/Login';
import Main from './pages/main/Main';
import EventForm from './pages/form/EventFrom';

import { API_ENDPOINT, TOKEN_NAME } from './env';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      view: 'Login'
    };
  }

  componentDidMount() {
    this.checkToken();
  }

  async checkToken() {
    try {
      const token = Cookies.get(TOKEN_NAME);
      if(token == null) {
        this.changeView('Login');
        return;
      }

      const res = await axios({
        method: 'get',
        url: `${API_ENDPOINT}/`,
        headers: {
          Authorization: 'Bearer ' + token,
        }
      });

      if(res.status !== 200) {
        this.changeView('Login');
        return;
      }

      this.changeView('Main');
    } catch (error) {
      this.changeView('Login');
      console.error(error);
    }
  }

  changeView(view) {
    this.setState(state => ({ view: view }));
  }

  render() {

    let page;

    switch(this.state.view) {
      case 'Main':
        page = <Main changeView={view => this.changeView(view)} />
        break;
      case 'EventForm':
        page = <EventForm />
        break;
      case 'Login':
      default:
        page = <Login changeView={view => this.changeView(view)} />;
    }

    return (
      <section id="App" className="section">
        {page}
      </section>
    );
  }
}
