import UserType from "./auth"

type PostType ={
    id: number,
    title: string,
    body: string,
    imageUrl: string,
    dateCreated: string,
    userId: number,
    author: UserType
}

export default PostType