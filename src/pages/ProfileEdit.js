import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      userName: '',
      userEmail: '',
      userDescription: '',
      userUrlImg: '',
      isRedirect: false,
      isDisabled: true,
    };
  }

  componentDidMount() {
    this.handleGetUser();
    this.handleDisableButton();
  }

  handleGetUser = async () => {
    this.setState({
      isLoading: true,
    });
    const user = await getUser();
    this.setState({
      isLoading: false,
      userName: user.name,
      userEmail: user.email,
      userDescription: user.description,
      userUrlImg: user.image,
    });
  }

  handleInput = (event) => {
    this.handleDisableButton();
    const { id, value } = event.target;
    this.setState({
      [id]: value,
    });
  };

  handleSaveButton = async () => {
    const { userName, userEmail, userDescription, userUrlImg } = this.state;
    this.setState({
      isLoading: true,
    });
    await updateUser({ name: userName,
      email: userEmail,
      image: userUrlImg,
      description: userDescription });
    this.setState({
      isLoading: false,
      isRedirect: true,
    });
  }

  // https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
  // https://www.w3schools.com/jsref/jsref_obj_regexp.asp

  validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/; return re.test(email);
  }

  handleDisableButton = () => {
    const { userName, userEmail, userDescription, userUrlImg } = this.state;
    let nameValidation = false;
    if (userName.length > 0) nameValidation = true;
    let descValidation = false;
    if (userDescription.length > 0) descValidation = true;
    let urlValidation = false;
    if (userUrlImg.length > 0) urlValidation = true;
    let emailValidation = false;
    if (userEmail.length > 0) emailValidation = true;
    let emailFormat = false;
    if (this.validateEmail(userEmail)) emailFormat = true;
    const validations = [nameValidation,
      descValidation, urlValidation, emailValidation, emailFormat];
    const enable = validations.every((validation) => validation === true);
    if (enable) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  render() {
    const { userName, userEmail,
      userDescription, userUrlImg,
      isLoading, isRedirect, isDisabled } = this.state;
    const editProfile = (
      <div>
        <label htmlFor="userName">
          Nome
          <input
            id="userName"
            onChange={ this.handleInput }
            value={ userName }
            data-testid="edit-input-name"
            type="text"
          />
        </label>
        <label htmlFor="userEmail">
          Email
          <input
            id="userEmail"
            onChange={ this.handleInput }
            value={ userEmail }
            data-testid="edit-input-email"
            type="text"
          />
        </label>
        <label htmlFor="userDescription">
          Descrição
          <textarea
            id="userDescription"
            onChange={ this.handleInput }
            value={ userDescription }
            data-testid="edit-input-description"
            type="text"
          />
        </label>
        <label htmlFor="userUrlImg">
          Url da image
          <input
            id="userUrlImg"
            onChange={ this.handleInput }
            value={ userUrlImg }
            data-testid="edit-input-image"
            type="text"
          />
        </label>
        <button
          onClick={ this.handleSaveButton }
          type="submit"
          data-testid="edit-button-save"
          disabled={ isDisabled }
        >
          Salvar
        </button>
      </div>
    );
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { isLoading ? <Loading /> : editProfile }
        { isRedirect && <Redirect to="/profile" /> }
      </div>
    );
  }
}
