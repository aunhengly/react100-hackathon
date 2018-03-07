import React, { Component } from 'react';
// import comparation from './Comparation';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: 'iphone',
      walmart: [],
      bestbuy: [],
      walmartSelected: {},
      bbySelected: {}
    }

  }

  componentDidMount() {
    this.handleClickSearch()
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleClickSearch = (e) => {
    axios.get('/api/v1/products?query=' + this.state.query).then(response => {
      this.setState({
        walmart: response.data.walmart,
        bestbuy: response.data.bestbuy
      })
    })
  }

  handleRadioChange = (e, item) => {
    this.setState({ [e.target.name + 'Selected']: item });
  } // This function is to the specific selected item and store in walmartSelected & bbySelected

  render() {
    return (
      <div className="container">
        <h1>
          <span>Logo</span>
          <label>I want to</label>
          <select defaultValue="hengly">
            <option hidden value="hengly">Select what you want to do</option>
            <option>Compare the prices of</option>
            <option>Find product</option>
          </select>
          <span><input type="text" onChange={this.handleChange} name="query"  value={this.state.query} /> </span>
          <button onClick={this.handleClickSearch}>Search</button>
        </h1>
        <div className="container">
          <div className="row">
            <div className="col">
              <h2>This is Walmart</h2>
              <div className="walmart">
                <ul>
                  {this.state.walmart.map(item =>
                    <li key={item.itemId}>
                      <input type="radio" name="walmart" value={this.state.walmartSelected} onChange={(e) => this.handleRadioChange(e, item)} /><label>Compare</label>
                      <img alt={item.name} src={item.thumbnailImage} />
                      <span>${item.salePrice}</span>
                      -{item.name}
                    </li>)}
                </ul>
              </div>
            </div>
            <div className="col">
              <h2>This is BBY</h2>
              <div className="bby">
                <ul>
                  {this.state.bestbuy.map((item, index) =>
                    <li key={item.productId + ' ' + index}>
                      {/* Above key is just to make i unique avoiding error */}
                      <input type="radio" name="bby" value={this.state.bbySelected} onChange={(e) => this.handleRadioChange(e, item)} /><label>Compare</label>
                      <img alt={item.name} src={item.image} />
                      <span>${item.price}</span>
                      -{item.name} </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h2>selected for comparation</h2>
            <table >
              <thead>
                <tr>
                  <th>Walmart</th>
                  <th>BestBuy</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <li>
                      <img alt={this.state.walmartSelected.name} src={this.state.walmartSelected.image} />
                      <span>${this.state.walmartSelected.price}</span>
                      -{this.state.walmartSelected.name} </li>
                  </td>
                  <td>
                    <li>
                      <img alt={this.state.bbySelected.name} src={this.state.bbySelected.image} />
                      <span>${this.state.bbySelected.price}</span>
                      -{this.state.bbySelected.name} </li>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
