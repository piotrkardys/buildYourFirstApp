//var ReactFireMixin = require('reactfire');        //we can't use mixins in ES6 syntax
//var Firebase = require('firebase');               //DataBase - ES5 syntax
import React from 'react';
import Repos from './Github/Repos';
import UserProfile from './Github/UserProfile';
import Notes from './Notes/Notes';
import getGithubInfo from '../utils/helpers';
import Rebase from 're-base';                       //something like Firebase

const base = Rebase.createClass('https://resplendent-fire-4532.firebaseio.com/');

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: {},
      repos: [],
      notes: []
    }
  }
  componentDidMount() {
    //this.ref = new Firebase('https://github-note-taker.firebaseio.com/');
    //this.ref = new Firebase('https://resplendent-fire-4532.firebaseio.com/'); - we can't use Firebae in ES6
    this.init(this.props.params.username);
  }
  componentWillReceiveProps(nextProps) {                //if executed - change the content on the page
    //this.unbind('notes');                             //unbind notes (from the DB) firstly - ES5
    base.removeBinding(this.ref);                       //unbind notes - ES6
    this.init(nextProps.params.username);               //calls this function for changing that content
  }
  componentWillUnmount() {
    //this.unbind('notes');                                       //removeListener from notes table - ES5
    base.removeBinding(this.ref);                                 //removeListener - ES6
  }

  init(username) {
    this.ref = base.bindToState(username, {
      context: this,
      asArray: true,
      state: 'notes'
    });

    getGithubInfo(username).then(function(data) {   //calls the method getGithubInfo with parameters
      this.setState({                                                         //results of that function are written in the variable
        bio: data.bio,                                                        //and method setState is called (to sets fields properly)
        repos: data.repos
      })
    }.bind(this))                                                             //that is because of calling 'this' properly (class Profile, not object helpers)
  }
  handleAddNote(newNote) {                    //function adds new note to the end of the notes' list
    //this.ref.child(this.props.params.username).child(this.state.notes.length).set(newNote)       //ES5
    base.post(this.props.params.username, {
      data: this.state.notes.concat([newNote])
    });
  }

  render() {
                                //this.props.params - parameters via Router
    return (                    //calling components with parameters
      <div className="row">
        <div className="col-sm-4"><UserProfile username={this.props.params.username} bio={this.state.bio} /></div>
        <div className="col-sm-4"><Repos username={this.props.params.username} repos={this.state.repos} /></div>
        <div className="col-sm-4"><Notes username={this.props.params.username} notes={this.state.notes} addNote={(newNote) => this.handleAddNote(newNote)} /></div>
      </div>
    )
  }
};

export default Profile;
