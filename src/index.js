import React, {Component} from 'react';
import { render } from 'react-dom';
//import './style.css';

import { subscriber,messageService } from './messageService';

class ConsumerA extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0
    }
  }

  componentDidMount() {
    subscriber.subscribe((v)=>{
      let{counter} = this.state;
      counter = counter+v;
      this.setState({counter})
    })
  }

  render(){
    let {counter} = this.state;
    return(
      <div>
        <hr />
        <h3>Counter for Consumer A</h3>
        <div>Counter: {counter}</div>
        <hr />
      </div>
    )
  }
}

class ConsumerB extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0
    }
  }

  componentDidMount() {
    subscriber.subscribe((v)=>{
      let{counter} = this.state;
      counter = counter+v;
      this.setState({counter})
    })
  }

  render(){
    let {counter} = this.state;
    return(
      <div>
        <hr />
        <h3>Counter for Consumer A</h3>
        <div>Counter: {counter}</div>
        <hr />
        <ProducerB />
      </div>
    )
  }  
}

class ProducerA extends Component{
  render(){
    return(
      <div>
        <h3>Producer A</h3>
        <button onClick={(e)=>{subscriber.next(1)}}>Increment Counter</button>
        <ConsumerA />
      </div>
    )
  }
}

class ProducerB extends Component {
  render(){
    return(
      <div>
        <h3>Prodicer B</h3>
        <button onClick={(e)=>{subscriber.next(-1)}}>Decrement Counter</button>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return(
      <div>
        <ProducerA />
        <hr />
        <ConsumerB />
      </div>
    )
  }
}

render(<App />, document.getElementById('root'));