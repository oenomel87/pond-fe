import React from 'react';

import './Modal.css';

export default class Modal extends React.Component {
  
  render() {
    const classNames = 'modal' + (this.props.show ? ' is-active': '');
    const title = this.props.title ? <h4>{this.props.title}</h4> : '';
    const cancelButton = this.props.cancelButtonText
      ? <button className="button">{this.props.cancelButtonText}</button> : ''
    const okButton = <button onClick={this.props.closeModal}>{this.props.okButtonText ? this.props.okButtonText : '확인'}</button>;
 
    return (
      <div className={classNames}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="box">
            <section>
              <article>
                {title}
                <p className="content">{this.props.content}</p>
              </article>
            </section>
            <section className="button-section">
              {cancelButton}
              {okButton}
            </section>
          </div>
        </div>
      </div>
    );
  }
}
