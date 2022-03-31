import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      userName: '',
      userEmail: '',
      userDescription: '',
      userUrlImg: '',
    };
  }

  componentDidMount() {
    this.handleGetUser();
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

  render() {
    const { userName, userEmail, userDescription, userUrlImg, isLoading } = this.state;
    const profile = (
      <div>
        <img
          data-testid="profile-image"
          src={ userUrlImg }
          alt={ userName }
        />
        <h3>{ userName }</h3>
        <p>{ userDescription }</p>
        <p>{ userEmail }</p>
        <Link to="/profile/edit">
          <p>Editar perfil</p>
        </Link>
      </div>
    );
    return (
      <div data-testid="page-profile">
        <Header />
        { isLoading ? <Loading /> : profile }
      </div>
    );
  }
}
