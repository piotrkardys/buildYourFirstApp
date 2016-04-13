var React = require('react');

var Repos = React.createClass({
  propTypes: {
    username: React.PropTypes.string.isRequired,
    repos: React.PropTypes.array.isRequired
  },
  render: function() {
    var repos = this.props.repos.map(function(repo, index) {            //maping repos (to get all of them)
      return (
        <li className="list-group-item" key={index}>                    //some kind of forEach loop
          {repo.html_url && <h4><a href={repo.html_url}>{repo.name}</a></h4>} //if html_url is proper - add link as a 'list item'; if not - don't do it
          {repo.description && <p> {repo.description} </p>}  //if there is description - show it; if not - don't do it
        </li>
      )
    });
    return (                      //show all repos
      <div>
        <h3> User Repos </h3>
        <ul className="list-group">
          {repos}
        </ul>
      </div>
    )
  }
});

module.exports = Repos;
