import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { deleteUser, resetPasswordUser } from '../Redux/Actions/UserActions';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaCog, FaEnvelope, FaBook, FaQuestionCircle } from 'react-icons/fa';

const Profile = () => {
  const user = useSelector(state => state.UserReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [activeSection, setActiveSection] = useState("profile"); // Section active par défaut

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

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white p-4 fixed h-full">
        <div className="flex flex-col space-y-6">
          <div className="text-xl font-bold">Dashboard</div>
          <div className="space-y-4">
            <div
              className={`flex items-center gap-2 p-2 cursor-pointer rounded-md ${activeSection === 'moncompte' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
              onClick={() => handleSectionChange('moncompte')}
            >
              <FaUser size={20} />
              <span>Mon Compte</span>
            </div>
            <div
              className={`flex items-center gap-2 p-2 cursor-pointer rounded-md ${activeSection === 'settings' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
              onClick={() => handleSectionChange('settings')}
            >
              <FaCog size={20} />
              <span>Settings</span>
            </div>
            <div
              className={`flex items-center gap-2 p-2 cursor-pointer rounded-md ${activeSection === 'messages' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
              onClick={() => handleSectionChange('messages')}
            >
              <FaEnvelope size={20} />
              <span>Messages</span>
            </div>
            <div
              className={`flex items-center gap-2 p-2 cursor-pointer rounded-md ${activeSection === 'courses' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
              onClick={() => handleSectionChange('courses')}
            >
              <FaBook size={20} />
              <span>Courses</span>
            </div>
            <div
              className={`flex items-center gap-2 p-2 cursor-pointer rounded-md ${activeSection === 'help' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
              onClick={() => handleSectionChange('help')}
            >
              <FaQuestionCircle size={20} />
              <span>Help</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64 w-full p-8">
        {activeSection === 'moncompte' && (
          <Card className="mx-auto" style={{ width: '18rem' }}>
            {user?.photo && <Card.Img variant="top" src={user.photo} />}
            <Card.Body>
              <Card.Title>{user?.username}</Card.Title>
              <Card.Text>Email: {user?.email}</Card.Text>
              <Card.Text>firstName: {user?.firstName}</Card.Text>
              <Card.Text>lastName: {user?.lastName}</Card.Text>
              <Card.Text>Phone: {user?.phone}</Card.Text>
              <div className="d-flex justify-content-between">
                <Button variant="danger" onClick={handleDelete}>Delete Account</Button>
                <Button variant="info" onClick={togglePasswordForm}>
                  {showPasswordForm ? "Cancel" : "Modify Password"}
                </Button>
              </div>
              {showPasswordForm && (
                <Form.Group className="mt-3" controlId="formNewPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <Button variant="primary" className="mt-2" onClick={handleChangePassword}>Update Password</Button>
                </Form.Group>
              )}
            </Card.Body>
          </Card>
        )}
        
        {activeSection === 'settings' && (
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <h3>Settings</h3>
            {/* Contenu pour Settings */}
            <p>Changez vos paramètres ici...</p>
          </div>
        )}
        
        {activeSection === 'messages' && (
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <h3>Messages</h3>
            {/* Contenu pour Messages */}
            <p>Voir vos messages ici...</p>
          </div>
        )}
        
        {activeSection === 'courses' && (
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <h3>Courses</h3>
            {/* Contenu pour Courses */}
            <p>Consulter vos cours ici...</p>
            <Button variant="primary" className="mt-2" onClick={handleChangePassword}>Update Password</Button>

          </div>
        )}
        
        {activeSection === 'help' && (
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <h3>Help</h3>
            {/* Contenu pour Help */}
            <p>Aide et support ici...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
