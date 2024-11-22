import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { Form, InputGroup, Modal } from 'react-bootstrap';
import { deleteResource, updateResource } from '../Redux/Actions/ResourceAction'; 

function ResourceCard(props) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [newDuration, setNewDuration] = useState(props.resource.duration);

  // Supprimer une ressource
  const handleDelete = () => {
    dispatch(deleteResource(props.resource._id));
  };

  // Fermer la modale
  const handleClose = () => setShow(false);

  // Ouvrir la modale
  const handleShow = () => setShow(true);

  // Mettre à jour la ressource
  const handleUpdate = async () => {
    if (newDuration && newDuration !== props.resource.duration) {
      await dispatch(updateResource(props.resource._id, { duration: newDuration }));
      handleClose();
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{props.resource.title}</Card.Title>
        <Card.Text>
          {props.resource.description}
        </Card.Text>
        <Card.Text>
          Durée: {props.resource.duration}
        </Card.Text>
        <Button variant="primary" onClick={handleDelete}>
          Supprimer
        </Button>
        <Button variant="primary" onClick={handleShow}>
          Modifier la durée
        </Button>
        <Button variant="primary" style={{ backgroundColor: props.resource.available ? 'green' : 'red' }}>
          {props.resource.available ? 'Disponible' : 'Indisponible'}
        </Button>

        {/* Modal pour modifier la durée */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modifier la ressource</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Durée
              </InputGroup.Text>
              <Form.Control
                onChange={(e) => setNewDuration(e.target.value)}
                value={newDuration}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fermer
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
              Sauvegarder la nouvelle durée
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  );
}

export default ResourceCard;
