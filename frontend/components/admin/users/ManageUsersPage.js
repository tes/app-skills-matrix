import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from '../../../modules/admin/users';
import { Row, Button } from 'react-bootstrap';
import R from 'ramda';
import AddUserForm from './AddUserForm';
import UserList from './UserList';

class ManageUsersPageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: {},
      selectedUsers: [],
    };

    this.updateNewUserState = this.updateNewUserState.bind(this);
    this.onAddUser = this.onAddUser.bind(this);
    this.clearUserForm = this.clearUserForm.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.onSelectMentor = this.onSelectMentor.bind(this);
    this.onSelectTemplate = this.onSelectTemplate.bind(this);
    this.onUserSelectionChange = this.onUserSelectionChange.bind(this);
    this.onStartEvaluation = this.onStartEvaluation.bind(this);
  }

  componentDidMount() {
    if (this.props.success) {
      this.clearUserForm();
    }
  }

  updateNewUserState(e) {
    const field = e.target.name;
    let newUser = this.state.newUser;
    newUser[field] = e.target.value;
    return this.setState({ newUser });
  }

  clearUserForm() {
    this.setState({ newUser: {} });
  }

  onAddUser(e) {
    e.preventDefault();
    this.props.actions.addUser(this.state.newUser);
  };

  onStartEvaluation(e) {
    e.preventDefault();
    this.state.selectedUsers.map(this.props.actions.startEvaluation);
    this.setState({ selectedUsers: [] });
  };

  onUserSelectionChange(e, user) {
    const checked = e.target.checked;
    let selectedUsers;
    if (checked) {
      selectedUsers = this.state.selectedUsers.concat([user.id]);
    } else {
      selectedUsers = R.filter((id) => id !== user.id, this.state.selectedUsers);
    }

    return this.setState({ selectedUsers });
  }

  onSelectMentor(e, user) {
    e.preventDefault();
    this.props.actions.selectMentor(e.target.value, user);
  }

  onSelectTemplate(e, user) {
    e.preventDefault();
    this.props.actions.selectTemplate(e.target.value, user);
  }

  render() {
    return (
      <div>
        <Row>
          <h1 className="header">Users</h1>
        </Row>
        <Row>
          <AddUserForm
            newUser={this.state.newUser}
            updateNewUserState={this.updateNewUserState}
            onAddUser={this.onAddUser}
            error={this.props.error}
          />
        </Row>
        <Row>
          <Button
            bsStyle="primary"
            disabled={this.state.selectedUsers.length === 0}
            onClick={this.onStartEvaluation}
          >
            Start evaluation
          </Button>
        </Row>
        <Row>
          <UserList
            selectedUsers={this.state.selectedUsers}
            users={this.props.users.users}
            templates={this.props.matrices.templates}
            onSelectMentor={this.onSelectMentor}
            onSelectTemplate={this.onSelectTemplate}
            onUserSelectionChange={this.onUserSelectionChange}
          />
        </Row>
        <Row>
          <ul>
            {
              this.props.users.newEvaluations.map((e) => (
                <li key={e.id}>
                  {
                    e.success
                      ? <div>New evaluation created for {e.subject.name}</div>
                      : e.message
                  }
                </li>
              ))
            }
          </ul>
        </Row>
      </div>
    );
  }
}

ManageUsersPageComponent.propTypes = {
  users: PropTypes.object,
  matrices: PropTypes.object,
};

export const ManageUsersPage = connect(
  function mapStateToProps({ users, matrices }) {
    return {
      users,
      matrices
    }
  },
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(actions, dispatch)
    };
  }
)(ManageUsersPageComponent);
