import React, {Component} from 'react';
import GuestNav from './guestnav';
import UserNav from './usernav';

class UserMenu extends Component {
  render() {
    const {
      isAuthenticated,
      id,
      email,
      first_name,
      last_name,
      age,
      role,
      logout,
      isLoading,
      showRegister,
      showLogin,
      showEditProfile,
    } = this.props;

    if (isAuthenticated) {
      return (
        <UserNav
          email={email}
          id={id}
          first_name={first_name}
          last_name={last_name}
          age={age}
          role={role}
          logout={logout}
          showEditProfile={showEditProfile}
          isLoading={isLoading}
        />
      );
    } else {
      return <GuestNav showRegister={showRegister} showLogin={showLogin} />;
    }
  }
}

export default UserMenu;
