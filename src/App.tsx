import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Home from './views/Home'
import Register from './views/Register';
import Login from './views/Login';
import EditPost from './views/EditPost';
import Navigation from "./components/Navigation";
import AlertMessage from './components/AlertMessage';
import UserType from './types/auth';
import CategoryType from './types/category';
import { getMe } from './lib/apiWrapper';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState((localStorage.getItem('token') && new Date(localStorage.getItem('tokenExp') as string) > new Date()) || false)
  const [loggedInUser, setLoggedInUser] = useState<UserType|null>(null);
  const [logInAgain, setLogInAgain] = useState(false)

  useEffect(() => {
    if (isLoggedIn){
        getMe(localStorage.getItem('token') as string)
            .then(response => {
                if (response.data){
                    setLoggedInUser(response.data)
                }
            })
        .catch(err => console.error(err))
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (isLoggedIn){
      const now = new Date()
      const exp = new Date(localStorage.getItem('tokenExp') || '');
      if (new Date(now.setMinutes(now.getMinutes() + 5)) > exp){
        flashMessage('You will be logged out in less than 5 minutes', 'danger')
        setLogInAgain(true)
      }
      if (new Date() > new Date(exp)){
        logUserOut()
      }
    }
  })

  const [message, setMessage] = useState<string|null>(null);
  const [category, setCategory] = useState<CategoryType|null>(null)

  // console.log("State Value",isLoggedIn)
  // console.log("State Setter", typeof setIsLoggedIn)

  const logUserIn = (user:UserType):void => {
    setIsLoggedIn(true);
    setLoggedInUser(user);
    flashMessage(`${user.username} has logged in`, 'success');
  }

  const logUserOut = (): void => {
    setIsLoggedIn(false);
    setLoggedInUser(null);
    localStorage.removeItem('token')
    localStorage.removeItem('tokenExp')
    flashMessage('You have logged out', 'info');
  }

  const flashMessage = (newMessage:string|null, newCategory:CategoryType|null):void =>{
    setMessage(newMessage);
    setCategory(newCategory)
  }

  return (
    <div>
      <Navigation isLoggedIn={isLoggedIn} handleClick={logUserOut}/>
      <Container>
        {message && <AlertMessage category={category!} message={message} flashMessage={flashMessage}/>}
        { logInAgain && <Button variant='warning'>Re-LogIn</Button> }
        <Routes>
            <Route path='/' element={<Home isLoggedIn={isLoggedIn} user={loggedInUser} flashMessage={flashMessage}/>} />
            <Route path='/login' element={<Login isLoggedIn={isLoggedIn} logUserIn={logUserIn} flashMessage={flashMessage} />} />
            <Route path='/register' element={<Register logUserIn={logUserIn } flashMessage={flashMessage}/>} />
            <Route path='/post/:postId' element={<EditPost flashMessage={flashMessage} currentUser={loggedInUser}/>} />
        </Routes>
      </Container>
    </div>
  )
}