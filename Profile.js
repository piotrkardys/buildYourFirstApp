var React = require('react');
var Router = require('react-router');
var Repos = require('./Github/Repos');
var UserProfile = require('./Github/UserProfile');
var Notes = require('./Notes/Notes');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');                 //DataBase

var Profile = React.createClass ({
  mixins: [ReactFireMixin],
  getInitialState: function() {
    return {                            //'state' field - init parameters
      notes: [1, 2, 3],
      bio: {
        name: 'Piotr Kardys'
      },
      repos: ['a', 'b', 'c']
    }
  },
  componentDidMount: function() {
    //this.ref = new Firebase('https://github-note-taker.firebaseio.com/');
    this.ref = new Firebase('https://resplendent-fire-4532.firebaseio.com/');
    var childRef = this.ref.child(this.props.params.username);
    this.bindAsArray(childRef, 'notes');                        //addListener to notes table
  },
  componentWillUnmount: function() {
    this.unbind('notes');                                       //removeListener from notes table
  },
  render: function() {
                                //this.props.params - parameters via Router
    return (                    //calling components with parameters
      <div className="row">
        <div className="col-sm-4"><UserProfile username={this.props.params.username} bio={this.state.bio} /></div>
        <div className="col-sm-4"><Repos username={this.props.params.username} repos={this.state.repos} /></div>
        <div className="col-sm-4"><Notes username={this.props.params.username} notes={this.state.notes} /></div>
      </div>
    )
  }
});

module.exports = Profile;
