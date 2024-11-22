import React, { useState } from 'react';
import { Card, Button, Form, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser, resetPasswordUser } from '../Redux/Actions/UserActions';

const MonCompte = () => {
  const user = useSelector((state) => state.UserReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const togglePasswordForm = () => {
    setShowPasswordForm(!showPasswordForm);
  };

  const handleDelete = async () => {
    await dispatch(deleteUser(user._id));
    navigate("/");
  };

  const handleChangePassword = async () => {
    await dispatch(resetPasswordUser(user._id, newPassword));
    setShowPasswordForm(false);
  };

  return (
    <Card className="mx-auto p-4 shadow-lg bg-light" style={{ maxWidth: '800px' }}>
      <div className="d-flex align-items-center gap-4">
        {/* Image de l'utilisateur */}
        <div className="d-flex justify-content-center align-items-center">
          {user?.photo ? (
            <img
              src={user.photo}
              alt="User"
              className="rounded-circle"
              style={{ width: '150px', height: '150px', objectFit: 'cover', border: '2px solid #007BFF' }}
            />
          ) : (
            <div
              className="rounded-circle bg-secondary d-flex justify-content-center align-items-center"
              style={{ width: '150px', height: '150px' }}
            >
              <span className="text-white font-weight-bold">No Image</span>
            </div>
          )}
        </div>

        {/* Informations utilisateur */}
        <div className="w-100">
          <Table striped bordered hover>
            <tbody>
              <tr>
                <th>First Name</th>
                <td>{user?.firstName}</td>
              </tr>
              <tr>
                <th>Last Name</th>
                <td>{user?.lastName}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{user?.email}</td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>{user?.phone}</td>
              </tr>
              <tr>
                <th>Role</th>
                <td>{user?.role}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      {/* Formulaire de modification du mot de passe */}
      {showPasswordForm && (
        <Form className="mt-4">
          <Form.Group controlId="formNewPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" className="mt-2" onClick={handleChangePassword}>
            Update Password
          </Button>
        </Form>
      )}
    </Card>
  );
};

export default MonCompte;
