import React, { Component } from "react";
import Joi from "joi-browser/dist/joi-browser";
class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };
  schema = {
    username: Joi.string().required(),
    password: Joi.string().required(),
  };

  validate = () => {
    const result = Joi.validate(this.state.account, this.schema, {
      abortEarly: false,
    });
    if (!result.error) return null;
    let error = {};
    for (let item of result.error.details) {
      error[item.path[0]] = item.message;
    }
    return error;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let errors = this.validate();
    this.setState({ errors: errors || {} });
  };

  handleChange = (e) => {
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  };

  render() {
    return (
      <div className="container">
        <h1>Login Here!</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              value={this.state.account.username}
              name="username"
              className="form-control"
              onChange={this.handleChange}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            {this.state.errors.username && (
              <div className="alert alert-danger">
                {this.state.errors.username}
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              value={this.state.account.password}
              onChange={this.handleChange}
              className="form-control"
              name="password"
              id="exampleInputPassword1"
              placeholder="Password"
            />
            {this.state.errors.password && (
              <div className="alert alert-danger">
                {this.state.errors.password}
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
