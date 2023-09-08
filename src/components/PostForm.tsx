import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import PostType from '../types/post'



type PostFormProps = {
    handleChange: (e:React.ChangeEvent<HTMLInputElement>) => void,
    handleSubmit: (e:React.FormEvent) => void
    newPost: Partial<PostType>
    isLoggedIn: boolean
}

export default function PostForm({ handleChange, handleSubmit, newPost, isLoggedIn }: PostFormProps) {
  return (
    <Form onSubmit={handleSubmit}>
        <Form.Label>Post Title</Form.Label>
        <Form.Control name='title' onChange={handleChange} value={newPost.title} placeholder='Enter Title'/>
        <Form.Label>Post Body</Form.Label>
        <Form.Control name='body' onChange={handleChange} as='textarea' value={newPost.body} placeholder='Enter Body'/>
        <Button className='mt-3 w-100' variant='warning' type ='submit' disabled={!isLoggedIn}>Create Post</Button>
    </Form>
  )
}