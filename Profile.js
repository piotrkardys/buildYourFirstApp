var React = require('react');
var Router = require('react-router');
var Repos = require('./Github/Repos');
var UserProfile = require('./Github/UserProfile');
var Notes = require('./Notes/Notes');

var Profile = React.createClass ({
  getInitialState: function() {
    return {                            //'state' field - init parameters
      notes: [1, 2, 3],
      bio: {
        name: 'Piotr Kardys'
      },
      repos: ['a', 'b', 'c']
    }
  },
  render: function() {
    console.log(this.props);
                                //this.props.params - parameters via Router
    return (                    //calling components with parameters
      <div className="row">
        <div className="col-sm-4"><UserProfile username={this.props.params.username} bio={this.state.bio} /></div>
        <div className="col-sm-4"><Repos repos={this.state.repos} /></div>
        <div className="col-sm-4"><Notes notes={this.state.notes} /></div>
      </div>
    )
  }
});

module.exports = Profile;
