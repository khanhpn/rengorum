import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUserProfile} from '../../actions';
import StatusMessage from '../../components/statusmessage';
import Profile from '../../components/profile';
import './styles.css';

class UserProfileContainer extends Component {
  componentDidMount() {
    const {username} = this.props.match.params;
    this.props.fetchUserProfile(username);
  }

  componentWillReceiveProps(newProps) {
    const {username: oldUsername} = this.props.match.params;
    const {username: futureUsername} = newProps.match.params;
    if (oldUsername !== futureUsername) {
      this.props.fetchUserProfile(futureUsername);
    }
  }

  render() {
    const {isLoading, error, profile} = this.props;

    if (error || !profile || isLoading) {
      return (
        <StatusMessage
          error={error || !profile}
          errorClassName="userProfile-error"
          errorMessage={error}
          loading={isLoading}
          loadingMessage={`We are fetching the user profile for you`}
          type="default"
        />
      );
    }

    const {
      id,
      email,
      first_name,
      last_name,
      age,
      role,
      created_at,
    } = profile;

    return (
      <Profile
        id={id}
        first_name={first_name}
        last_name={last_name}
        role={role}
        email={email}
        dateJoined={created_at}
        age={age}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.userProfile.isLoading,
  profile: state.userProfile.profile,
  error: state.userProfile.error,
});

const mapDispatchToProps = dispatch => ({
  fetchUserProfile: username => {
    dispatch(fetchUserProfile(username));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfileContainer);
