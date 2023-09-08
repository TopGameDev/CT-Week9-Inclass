import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getPostById, editPostById, deletePostById } from "../lib/apiWrapper";
import CategoryType from "../types/category";
import PostType from "../types/post";
import UserType from "../types/auth";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

type EditPostProps = {
    flashMessage: (message: string|null, category: CategoryType|null) => void,
    currentUser: UserType|null
}

export default function EditPost({ flashMessage, currentUser }: EditPostProps) {
    const { postId } = useParams();
    console.log(postId);
    const navigate = useNavigate();

    const [postToEdit, setPostToEdit] = useState<PostType|null>(null);
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    useEffect(() => {
        async function getPost(){
            let response = await getPostById(postId!);
            if (response.error){
                flashMessage(response.error, 'danger')
                navigate('/')
            } else {
                setPostToEdit(response.data!)
            }
        }
        getPost()
    }, [flashMessage, navigate, postId])

    useEffect(() => {
        if (postToEdit){
            if (postToEdit.author.id !== currentUser?.id){
                flashMessage('You do not have permission to edit this post. Who do you think you are?!', 'danger');
                navigate('/')
            }

        }
    }, [postToEdit?.id])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPostToEdit({...postToEdit, [event.target.name]: event.target.value} as PostType)
    }

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        let token = localStorage.getItem('token') || ''
        let response = await editPostById(token, postId!, postToEdit!);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(`${response.data?.title} has been updated`, 'success')
            navigate('/')
        }
    }

    const handleDetelePost = async () => {
        const token = localStorage.getItem('token') || ''
        const response = await deletePostById(token, postId!);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(response.data!, 'primary')
            navigate('/')
        }
    }


  return (
    <>
        <h1 className="text-center">Edit {postToEdit?.title}</h1>
        {postToEdit && (<Card>
            <Card.Body>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Label>Edit Post Title</Form.Label>
                    <Form.Control name='title' value={postToEdit?.title} onChange={handleInputChange}/>
                    <Form.Label>Edit Post Body</Form.Label>
                    <Form.Control name='body' as='textarea' value={postToEdit?.body} onChange={handleInputChange}/>
                    <Button variant="success" className="mt-3 w-50" type="submit">Edit Post</Button>
                    <Button variant="danger" className="mt-3 w-50" onClick={openModal}>Delete Post</Button>
                </Form>
            </Card.Body>
        </Card>)}
        <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Delete {postToEdit?.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete {postToEdit?.title}? This action cannot be undone.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>Close</Button>
                <Button variant="danger" onClick={handleDetelePost}>Delete Post</Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}