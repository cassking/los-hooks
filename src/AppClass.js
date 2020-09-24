import React, { Component } from 'react';

class App extends Component {
  state = {
    count: 0,
    isOn: false,
    x: null,
    y: null,
  }
// useeffect equivalent did mount and did update
componentDidMount() {
  document.title = `You've been clicked ${this.state.count} times in class compoment`
  window.addEventListener('mousemove', this.handleMouseMove)
  // need to unmount this listener
}

componentDidUpdate() {
  document.title = `You've been clicked ${this.state.count} times in class compoment`
}
componentWillUnmount() {
  //cleaning up
  window.removeEventListener('mousemove', this.handleMouseMove)
}
handleMouseMove = (event) => {
  this.setState({
    x: event.x,
    y: event.y,
  })
}
  incrementCount = () => {
    this.setState(prevState =>({
      count: prevState.count + 1
    }))
  }

  toggleLight = () => {
    this.setState(prevState => ({
      isOn: !prevState.isOn
    }))
  }
  render () {
    return (
      <React.Fragment>
        <button onClick={this.incrementCount}>
        I was clicked {this.state.count} times class based
        </button>
        <h2>Toggle Light:</h2>
        <div
        style={{
          borderRadius: 10,
          height: '50px',
          width: '50px',
          background: this.state.isOn ? "Yellow" : "Gray"
        }}
        onClick={this.toggleLight}
        >{this.state.isOn}
        </div>
        <div> <h2>MousePosition</h2>
        <p>X Position: {this.state.x}</p>
        <p>Y Position: {this.state.y}</p></div>
      </React.Fragment>
    );
  }

}

export default App;
