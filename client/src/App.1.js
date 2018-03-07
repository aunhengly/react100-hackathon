import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  state = {
    query: '',
    items: []
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
 
  handleClick = (e) => {
    // axios.all([
    //   axios.get('/api/v1/products?query=' + this.state.query),
    //   axios.get('/api/v1/products((search='+ this.state.query + '))?')
    // ]).then(responses => {
    //   this.setState({
    //     walmart: responses[0].data.items,
    //     bestbuy: responses[1].data.products
    //   })
    // })
    axios.get('/api/v1/products?query=' + this.state.query).then((response) => {
      this.setState({ items: response.data })
    })
  }

  render() {
    return (
      <div className="App">
        <span> Walmart Logo <input type="text" onChange={this.handleChange} name="query" value={this.state.query}/> </span>
        <button onClick={this.handleClick}>Search</button>
        <ul>
          {this.state.items.map(item => <li key={item.itemId}>{item.name}</li>)}
        </ul>
      </div>
    );
  }
}

export default App;
