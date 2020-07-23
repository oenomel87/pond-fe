import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { API_ENDPOINT, TOKEN_NAME } from '../../env';

import MainCard from '../../components/card/MainCard';
import Modal from '../../components/modal/Modal';
import './Main.css';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      errorMessage: '',
      totalAmount: 0
    }
  }

  componentDidMount() {
    this.fetchTotalAmount();
  }

  async fetchTotalAmount() {
    try {
      const token = Cookies.get(TOKEN_NAME);
      const res = await axios({
        method: 'get',
        url: `${API_ENDPOINT}/event/total`,
        headers: {
          Authorization: 'Bearer ' + token,
        }
      });

      if(res.status !== 200) {
        this.handleError('서버에 접속 할 수 없습니다.');
        return;
      }

      const data = res.data;
      if(data.data) {
        this.setState({ totalAmount: data.data });
      }
    } catch(err) {
      console.error(err);
      this.handleError('서버에 접속 할 수 없습니다.');
    }
  }

  handleError(message) {
    this.setState(state => ({ showModal: true, errorMessage: message }));
  }

  closeModal() {
    this.setState(state => ({ showModal: false }));
  }

  render() {
    return (
      <section id="main" className="section">
        <div className="container">
          <MainCard amount={this.state.totalAmount} changeView={this.props.changeView} cardName="현재잔고" />
          <div className="main-card add-category">
            <div className="box">
              <p>+ 카테고리 추가</p>
            </div>
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