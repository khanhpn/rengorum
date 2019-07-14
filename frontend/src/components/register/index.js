import React, {Component} from 'react';
import {Form, Icon, Message, Button} from 'semantic-ui-react';
import StatusMessage from '../../components/statusmessage';
import './styles.css';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      age: '',
      password: '',
      password_confirmation: '',
      checked: true,
    };
  }

  handleChange = (e, {name, value}) => {
    this.setState({[name]: value});
  };

  handleCheckbox = () => {
    this.setState({checked: !this.state.checked});
  };

  isFormValid = () => {
    const {first_name, last_name, age, password_confirmation, email, password, checked} = this.state;

    let isFormValid = true;
    if (!first_name || !last_name || !email || !password || !checked || !password_confirmation || !age) {
      isFormValid = false;
    }
    if (password !== password_confirmation) isFormValid = false;
    if (password.length < 6) isFormValid = false;
    return isFormValid;
  };

  handleSubmit = e => {
    if (this.isFormValid()) {
      let data = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        age: this.state.age,
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.password,
      };
      this.props.handleRegister(data);
    }
  };

  render() {
    let {isLoading, error, showLogin} = this.props;

    const statusMessage = (
      <StatusMessage
        error={error}
        errorMessage={error || 'Login Error'}
        loading={isLoading}
        loadingMessage={'Registering your account'}
        type="modal"
      />
    );

    return (
      <div>
        <Message
          attached
          header="Welcome to our site!"
          content="Fill out the form below to sign-up for a new account"
        />
        {statusMessage}
        <Form className="attached fluid segment">
          <Form.Input
            required
            label="FirstName"
            placeholder="FirstName"
            type="text"
            name="first_name"
            value={this.state.first_name}
            onChange={this.handleChange}
          />
          <Form.Input
            required
            label="LastName"
            placeholder="LastName"
            type="text"
            name="last_name"
            value={this.state.last_name}
            onChange={this.handleChange}
          />
          <Form.Input
            required
            label="Age"
            placeholder="Age"
            type="text"
            name="age"
            value={this.state.age}
            onChange={this.handleChange}
          />
          <Form.Input
            required
            label="Email"
            placeholder="Email"
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <Form.Input
            required
            label="Password"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <Form.Input
            required
            label="Password Confirmation"
            type="password"
            name="password_confirmation"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
          />
          <Form.Checkbox
            inline
            required
            label="I agree to the terms and conditions"
            name="agreement"
            checked={this.state.checked}
            onChange={this.handleCheckbox}
          />
          <Button
            color="blue"
            loading={isLoading}
            disabled={isLoading}
            onClick={this.handleSubmit}>
            Submit
          </Button>
        </Form>
        <Message attached="bottom" warning>
          <Icon name="help" />
          Already signed up?&nbsp;
          {/* eslint-disable-next-line */}
          <a className="register-login" onClick={showLogin}>
            Login here
          </a>
          &nbsp;instead.
        </Message>
      </div>
    );
  }
}
