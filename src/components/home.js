import React, {Component} from 'react';
import Parse from 'parse';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: ''
    };

    let install = new Parse.Installation();
    install.set("deviceType", navigator.userAgent);

    install.save().then((resp) => {
      console.log('Created install object', resp);

      this.setState({
        result: 'New object created with objectId: ' + resp.id
      })
    }, err => {
      console.log('Error creating install object', err);

      this.setState({
        result: 'Failed to create new object, with error code: ' + err.message
      })
    })
  }

  render() {
    return (
      <h1>{this.state.result}</h1>
    )
  }
}

export default Home;