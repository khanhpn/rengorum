import React, {Component} from 'react';
import {connect} from 'react-redux';
import Navlink from '../../components/navlink';
import UserMenu from '../../components/usermenu';
import './styles.css';
import {showModal, logout} from '../../actions';

class HeaderContainer extends Component {
  render() {
    const {
      isAuthenticated,
      id,
      email,
      first_name,
      last_name,
      role,
      age,
      handleLogout,
      isLoading,
      showRegister,
      showLogin,
      showEditProfile,
    } = this.props;

    return (
      <div className="headerContainer">
        <Navlink />
        <UserMenu
          isAuthenticated={isAuthenticated}
          first_name={first_name}
          last_name={last_name}
          email={email}
          id={id}
          age={age}
          role={role}
          logout={handleLogout}
          isLoading={isLoading}
          showRegister={showRegister}
          showLogin={showLogin}
          showEditProfile={showEditProfile}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  id: state.auth.id,
  email: state.auth.email,
  first_name: state.auth.first_name,
  last_name: state.auth.last_name,
  role: state.auth.role,
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
});

const mapDispatchToProps = dispatch => ({
  handleLogout: () => {
    dispatch(logout());
  },
  showRegister: () => {
    dispatch(showModal('REGISTER', {}));
  },
  showLogin: () => {
    dispatch(showModal('LOGIN', {}));
  },
  showEditProfile: () => {
    dispatch(showModal('EDIT_PROFILE', {}));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderContainer);
