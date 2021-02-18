import React, { Component} from 'react';
import axios from 'axios';

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ''
  }
  async componentDidMount(){
    await this.fatchValues();
    await this.fatchIndexes();
  }
  async fatchValues(){
    const values = await axios.get('api/values/current');
    this.setState({values: values.data});
  }
  async fatchIndexes(){
    const index = await axios.get('api/values/all');
    this.setState({seenIndexes: index.data})
  }
  submitIndex = async (e) => {
    e.preventDefault();
    await axios.post('api/values', {
      index: this.state.index
    })
    this.setState({
      index: ''
    })
  }

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({number}) => number).join(', ');
  }
  renderValues() {
    const entries = [];
    for(let key in this.state.values){
      entries.push(
        <div key={key}>
          for key {key} the value is {this.state.values[key]}
        </div>
      )
    }
    return entries;
  } 
  render(){
    return (
      <div>
        <form onSubmit={this.submitIndex}>
          <label>Enter your index</label>
          <input
            value = {this.state.index}
            onChange={event => this.setState({index: event.target.value})}
          />
          <button>Submit</button>
          <h3>Indexes i have seen:</h3>
            {this.renderSeenIndexes()}
          <h3>Calculated values:</h3>
            {this.renderValues()}
        </form>
      </div>
    )
  }
}
export default Fib;