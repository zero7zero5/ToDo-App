import React, { Component } from "react";
import Joi from "joi-browser/dist/joi-browser";

class Todo extends Component {
  state = {
    list: [],
    input: {
      items: "",
      id: "",
    },
    error: {},
  };
  schema = {
    items: Joi.string().required(),
  };
  validate = () => {
    const result = Joi.validate(this.state.input, this.schema, {
      abortEarly: false,
    });
    if (!result.error) return null;
    const error = {};
    for (let item of result.error.details) {
      error[item.path[0]] = item.message;
    }
    return error;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const error = this.validate();
    if (error) this.setState({ error: error });

    if (!error.items) {
      let input = {
        items: this.state.input.items,
        id: Date.now(),
      };

      let list = [...this.state.list];
      list.push(input);
      input = { items: "", id: "" };
      this.setState({ list, input });
    }
  };

  handleChange = (e) => {
    const input = { ...this.state.input };
    input[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ input });
  };
  handleDelete = (item) => {
    const lists = [...this.state.list];
    const list = lists.filter((m) => m.id !== item.id);
    this.setState({ list });
  };

  render() {
    return (
      <div className="container">
        <h1 style={{ textAlign: "center" }}>Todo App</h1>
        <form
          onSubmit={this.handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="form-group">
            <label
              style={{ display: "block", textAlign: "center" }}
              htmlFor="exampleInputEmail1"
            >
              Items
            </label>
            <input
              autoComplete="off"
              onChange={this.handleChange}
              value={this.state.input.items}
              name="items"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            {this.state.error.items && (
              <div className="alert alert-danger">{this.state.error.items}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>{" "}
        <br />
        {this.state.list.length === 0 ? null : (
          <table className="table">
            <thead>
              <tr>
                <th>List</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>
              {this.state.list.map((m) => (
                <tr key={m.id}>
                  <td>{m.items}</td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(m)}
                      className="btn btn-success"
                    >
                      Done
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default Todo;
