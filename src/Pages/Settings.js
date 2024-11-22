import React, { useState } from "react";
import { Card, Button, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, updateUser, resetPasswordUser } from "../Redux/Actions/UserActions";

const Settings = () => {
  const user = useSelector((state) => state.UserReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [editableUser, setEditableUser] = useState({ ...user });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setEditableUser({ ...user }); // Réinitialise les données modifiables
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableUser({ ...editableUser, [name]: value });
  };

  const handleSaveChanges = async () => {
    await dispatch(updateUser(editableUser._id, editableUser));
    setEditMode(false);
  };

  const togglePasswordForm = () => {
    setShowPasswordForm(!showPasswordForm);
  };

  const handleChangePassword = async () => {
    await dispatch(resetPasswordUser(user._id, newPassword));
    setShowPasswordForm(false);
  };

  const handleDelete = async () => {
    await dispatch(deleteUser(user._id));
    navigate("/");
  };

  return (
    <Card className="mx-auto p-4 shadow-lg bg-light" style={{ maxWidth: "800px" }}>
      <div className="d-flex align-items-center gap-4">
        {/* Image de l'utilisateur */}
        <div className="d-flex justify-content-center align-items-center">
          {user?.photo ? (
            <img
              src={user.photo}
              alt="User"
              className="rounded-circle"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                border: "2px solid #007BFF",
              }}
            />
          ) : (
            <div
              className="rounded-circle bg-secondary d-flex justify-content-center align-items-center"
              style={{ width: "150px", height: "150px" }}
            >
              <span className="text-white font-weight-bold">No Image</span>
            </div>
          )}
        </div>

        {/* Informations utilisateur */}
        <div className="w-100">
          <Table striped bordered hover>
            <tbody>
              {["firstName", "lastName", "email", "phone", "role"].map((field) => (
                <tr key={field}>
                  <th>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </th>
                  <td>
                    {editMode ? (
                      <Form.Control
                        type="text"
                        name={field}
                        value={editableUser[field]}
                        onChange={handleInputChange}
                      />
                    ) : (
                      user[field]
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Boutons */}
      <div className="mt-4 d-flex justify-content-between">
        <Button variant="danger" onClick={handleDelete}>
          Delete Account
        </Button>
        {editMode ? (
          <Button variant="success" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        ) : (
          <Button variant="info" onClick={toggleEditMode}>
            Edit
          </Button>
        )}
        <Button variant="info" onClick={togglePasswordForm}>
          {showPasswordForm ? "Cancel" : "Modify Password"}
        </Button>
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

export default Settings;
