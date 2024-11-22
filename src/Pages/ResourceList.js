import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ResourceCard from '../Components/ResourceCard'; 
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form, InputGroup, Row, Col } from 'react-bootstrap';
import { addResource, getAllResources } from '../Redux/Actions/ResourceAction'; 

const ResourceList = () => {
  const dispatch = useDispatch();
  const ListResource = useSelector(state => state.ResourceReducer?.resources);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [contentUrl, setContentUrl] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [photo, setPhoto] = useState('');

  const handleClick = () => {
    if (title && description && category) {
      dispatch(addResource({ title, description, category, contentUrl, createdBy, photo }));
      handleClose();
    } else {
      alert('Veuillez remplir tous les champs');
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(getAllResources());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <Button variant="primary" onClick={handleShow} className="mb-3"> 
        Ajouter une nouvelle ressource
      </Button>

      {/* Modal for adding a new resource */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une ressource</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <InputGroup className="mb-3">
              <InputGroup.Text>Titre</InputGroup.Text>
              <Form.Control onChange={(e) => setTitle(e.target.value)} placeholder="Entrez le titre de la ressource" />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Description</InputGroup.Text>
              <Form.Control onChange={(e) => setDescription(e.target.value)} placeholder="Entrez la description de la ressource" />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Catégorie</InputGroup.Text>
              <Form.Control onChange={(e) => setCategory(e.target.value)} placeholder="Entrez la catégorie de la ressource" />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>URL du contenu</InputGroup.Text>
              <Form.Control onChange={(e) => setContentUrl(e.target.value)} placeholder="Entrez l'URL du contenu" />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Créé par</InputGroup.Text>
              <Form.Control onChange={(e) => setCreatedBy(e.target.value)} placeholder="Entrez le nom du créateur" />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Photo</InputGroup.Text>
              <Form.Control onChange={(e) => setPhoto(e.target.value)} placeholder="Entrez l'URL de la photo" />
            </InputGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Fermer</Button>
          <Button variant="primary" onClick={handleClick}>Ajouter la ressource</Button>
        </Modal.Footer>
      </Modal>

      {/* Resources List */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {ListResource?.length > 0 ? (
          ListResource.map(resource => (
            <Col key={resource._id}>
              <ResourceCard resource={resource} />
            </Col>
          ))
        ) : (
          <div className="text-center">Aucune ressource disponible</div>
        )}
      </Row>
    </div>
  );
};

export default ResourceList;
