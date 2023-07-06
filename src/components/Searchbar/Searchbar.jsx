import React, { Component } from 'react';
import css from './Searchbar.module.css'
import PropTypes from 'prop-types'

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.inputValue);
    this.setState({
      inputValue: '',
    });
  };

  handleInputChange = e => {
    const { value } = e.currentTarget;
    this.setState({
      inputValue: value,
    });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button}>
            <span className={css.label}>Search</span>
          </button>

          <input
            onChange={this.handleInputChange}
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.inputValue}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired
}