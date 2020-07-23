import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { API_ENDPOINT, TOKEN_NAME } from '../../env';
import './Login.css';

import Modal from '../../components/modal/Modal';

export default class Login extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      usernameMessage: '',
      passwordMessage: '',
      errorMessage: '',
      showModal: false
    }
  }

  async login() {
    const userData = {
      username: this.state.username,
      password: this.state.password
    };

    this.validate(userData);
    if(this.state.usernameMessage.length > 0
        || this.state.passwordMessage.length > 0) {
      return;
    }

    try {
      const res = await axios({
        method: 'POST',
        url: `${API_ENDPOINT}/auth?username=${userData.username}&password=${userData.password}`
      });

      if(res.status !== 200) {
        this.handleError('잘못된 아이디/비밀번호 입니다.');
        return;
      }
      Cookies.set(TOKEN_NAME, res.data);
      this.props.changeView('Main');
    } catch (error) {
      this.handleError('서비스에 문제가 생겼습니다.');
      console.error(error);
    }
  }

  validate(userData) {
    if(userData.username.length < 8 || userData.username.length > 30) {
      this.setState(state => ({ usernameMessage: '아이디는 8자 이상 30자 이하입니다.' }));
    } else {
      this.setState(state => ({ usernameMessage: '' }));
    }

    if(!userData.password || userData.password.length < 8 || userData.password.length > 30) {
      this.setState(state => ({ passwordMessage: '비밀번호는 8자 이상 30자 이하입니다.' }));
    } else {
      this.setState(state => ({ passwordMessage: '' }));
    }
  }

  handleError(message) {
    this.setState(state => ({ showModal: true, errorMessage: message }));
  }

  closeModal() {
    this.setState(state => ({ showModal: false, errorMessage: '' }));
  }

  handleChange(evt) {
    const target = evt.target;
    const userData = {};
    userData[target.name] = target.value;
    this.setState(state => (userData));
  }

  handleEnterKey(evt) {
    if(evt.key === 'Enter') {
      this.login();
    }
  }

  render() {
    const usernameValid = this.state.usernameMessage.length === 0;
    const passwordValid = this.state.passwordMessage.length === 0;
    const usernameField = `input username${usernameValid ? '' : ' is-danger'}`;
    const passwordField = `input password${passwordValid ? '' : ' is-danger'}`;
    const usernameHelp = usernameValid
      ? <p className="help is-danger">{this.state.usernameMessage}</p> : '';
    const passwordHelp = passwordValid
      ? <p className="help is-danger">{this.state.passwordMessage}</p> : '';
    return(
      <section id="Login" className="section">
        <div className="hero container">
          <div className="hero-body">
            <h1 className="title">Pond</h1>
          </div>
        </div>
        <div className="container login-form">
          <div className="field">
            <label className="label">아이디</label>
            <div className="control">
              <input type="email" name="username" className={usernameField} onChange={evt => this.handleChange(evt)} value={this.state.username} />
            </div>
            {usernameHelp}
          </div>
          <div className="field">
            <label className="label">비밀번호</label>
            <div className="control">
              <input type="password" name="password" className={passwordField} onKeyUp={evt => this.handleEnterKey(evt)} onChange={evt => this.handleChange(evt)} value={this.state.passowrd} />
            </div>
            {passwordHelp}
          </div>
          <div className="login-btn-wrapper">
            <button id="login-btn" className="button is-fullwidth" onClick={() => this.login()}>로그인</button>
          </div>
        </div>
        <Modal
          show={this.state.showModal}
          content={this.state.errorMessage}
          closeModal={() => this.closeModal()} />
      </section>
    );
  }
}
