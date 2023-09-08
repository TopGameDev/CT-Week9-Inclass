// import Card from 'react-bootstrap/Card'
import UserType from '../types/auth'
import PostType from '../types/post'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'



type Props = {
    post: PostType
    currentUser: UserType|null,
}

export default function PostCard({post, currentUser}: Props) {
  return (
    // <Card key={post.id}>
    //     <Card.Body>
    //         <Card.Title>{post.title}</Card.Title>
    //     </Card.Body>
    // </Card>
    <div className="post-card text-center">
        <div>
            <h3>{post.title}</h3>
            <h5>By {post.author.firstName}</h5>
            <p>{post.body}</p>
            { currentUser?.id === post.author.id && (
              <Link to={`/post/${post.id}`}>
                <Button variant='primary'>Edit Post</Button>
              </Link>
            )}
        </div>
    </div>
  )
}