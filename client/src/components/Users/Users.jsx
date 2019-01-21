import React from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../../actions/user/fetchUsers";
import { changePermissions } from "../../actions/user/changePermissions";
import { deleteAccount } from "../../actions/user/deleteAccount";
import PropTypes from "prop-types";
import {
  Wrapper,
  Select,
  Input,
  Form,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  RemoveBtn,
  Option
} from "./style";

class Users extends React.Component {
  componentDidMount() {
    const { fetchUsers } = this.props;
    fetchUsers();
  }

  handleChangeUser = () => {
    
  }

  handleChangeStatus = (e, user) => {
    const { changePermissions } = this.props;
    const status = e.target.value === "Admin" ? true : false;
    changePermissions(status, user.id);
  };

  removeUser = id => {
    const { deleteAccount } = this.props;
    deleteAccount(id);
  };

  render() {
    const { users } = this.props;
    return (
      <Wrapper>
        <Form>
          <Input
            onChange={this.handleChange}
            type="text"
            name="city"
            placeholder="search user"
          />
        </Form>
        <TableContainer>
          <Table>
            <Thead>
              <tr>
                <Th>id</Th>
                <Th>name</Th>
                <Th>change status</Th>
                <Th>remove</Th>
              </tr>
            </Thead>
            <Tbody>
              {users.map((user, id) => {
                return (
                  <Tr key={user.id}>
                    <Td>{id + 1}</Td>
                    <Td>{user.login}</Td>
                    <Td>
                      {user.id === 1 ? (
                        "Admin"
                      ) : (
                        <Select onChange={e => this.handleChangeStatus(e, user)}>
                          <Option key={id}>
                            {user.isAdmin ? "Admin" : "User"}
                          </Option>
                          <Option key={id + 1}>
                            {user.isAdmin ? "User" : "Admin"}
                          </Option>
                        </Select>
                      )}
                    </Td>
                    <Td>
                      {user.id !== 1 && (
                        <RemoveBtn
                          onClick={id => this.removeUser(user.id)}
                          src={"delete.png"}
                        />
                      )}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = {
  fetchUsers,
  changePermissions,
  deleteAccount
};

const mapStateToProps = state => ({
  users: state.user.users
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);

Users.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      login: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      isAdmin: PropTypes.bool.isRequired
    })
  ),
  fetchUsers: PropTypes.func.isRequired,
  changePermissions: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired
};
