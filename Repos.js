import React from 'react';

const Repos = (props) => {
  return (                      //show all repos
    <div>
      <h3> User Repos </h3>
      <ul className="list-group">
        {props.repos.map((repo, index) => {            //maping repos (to get all of them)
            return (                          //some kind of forEach loop
                                            //if html_url is proper - add link as a 'list item'; if not - don't do it
                                            //if there is description - show it; if not - don't do it
              <li className="list-group-item" key={index}>
                {repo.html_url && <h4><a href={repo.html_url}>{repo.name}</a></h4>}
                {repo.description && <p> {repo.description} </p>}
                </li>
            )
        })
        }
      </ul>
    </div>
  )
};

Repos.propTypes = {
  username: React.PropTypes.string.isRequired,
  repos: React.PropTypes.array.isRequired
};

export default Repos;
