import React, {Component} from 'react';
import Avatar from '../avatar';
import './styles.css';

class Profile extends Component {
  formatDateTime(datetime) {
    return datetime.split('.')[0].replace('T', ' ');
  }

  render() {
    const {
      id,
      first_name,
      last_name,
      age,
      role,
      email,
      dateJoined,
    } = this.props;

    return (
      <div className="profileContainer">
        <div>
          <Avatar className="profileAvatar" avatar="" centered={false} />
        </div>
        <div className="profileInfo">
          <div className="name">{first_name}</div>
          <div className="username">
            <strong>@{last_name}</strong>
            <b className="staffStatus">{role === "admin" ? ' (Admin) ' : '(User)'}</b>
          </div>
          <div className="status">
            <strong>Email: </strong>
            {email}
          </div>
          <div className="status">
            <strong>Age: </strong>
            {age}
          </div>
          <div className="dateJoined">
            <strong>Joined: </strong>
            {dateJoined}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
