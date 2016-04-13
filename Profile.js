var React = require('react');
var Router = require('react-router');
var Repos = require('./Github/Repos');
var UserProfile = require('./Github/UserProfile');
var Notes = require('./Notes/Notes');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');                 //DataBase
var helpers = require('../utils/helpers');

var Profile = React.createClass ({
  mixins: [ReactFireMixin],
  getInitialState: function() {
    return {                            //'state' field - init parameters
      notes: [1, 2, 3],
      bio: {},
      repos: []
    }
  },
  componentDidMount: function() {
    //this.ref = new Firebase('https://github-note-taker.firebaseio.com/');
    this.ref = new Firebase('https://resplendent-fire-4532.firebaseio.com/');
    this.init(this.props.params.username);
  },
  componentWillReceiveProps: function(nextProps) {      //if executed - change the content on the page
    this.unbind('notes');                               //unbind notes (from the DB) firstly
    this.init(nextProps.params.username);               //calls this function for changing that content
  },
  componentWillUnmount: function() {
    this.unbind('notes');                                       //removeListener from notes table
  },

  init: function(username) {
    var childRef = this.ref.child(username);
    this.bindAsArray(childRef, 'notes');                        //addListener to notes table

    helpers.getGithubInfo(username).then(function(data) {   //calls the method getGithubInfo with parameters
      this.setState({                                                         //results of that function are written in the variable
        bio: data.bio,                                                        //and method setState is called (to sets fields properly)
        repos: data.repos
      })
    }.bind(this))                                                             //that is because of calling 'this' properly (class Profile, not object helpers)
  },
  handleAddNote: function(newNote) {        //function adds new note to the end of the notes' list
    this.ref.child(this.props.params.username).child(this.state.notes.length).set(newNote)
  },
  
  render: function() {
                                //this.props.params - parameters via Router
    return (                    //calling components with parameters
      <div className="row">
        <div className="col-sm-4"><UserProfile username={this.props.params.username} bio={this.state.bio} /></div>
        <div className="col-sm-4"><Repos username={this.props.params.username} repos={this.state.repos} /></div>
        <div className="col-sm-4"><Notes username={this.props.params.username} notes={this.state.notes} addNote={this.handleAddNote} /></div>
      </div>
    )
  }
});

module.exports = Profile;
