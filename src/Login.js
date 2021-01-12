import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from './features/userSlice'
import { auth } from './firebase'
import './Login.css'

function Login() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [profilePic, setProfilePic] = useState('')
    const dispatch = useDispatch()

    const register = () => {
        if (!name) {
            return alert("Please enter a full name!")
        }

        auth.createUserWithEmailAndPassword(email, password)
        .then((userAuth) => {
            // All of these is a Firebase function
            userAuth.user.updateProfile({
                displayName: name,
                photoURL: profilePic,
            })
            .then(() => {
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: name,
                    photoURL: profilePic,
                }))
            })
        })
        .catch(error => alert(error))
    }

    const loginToApp = (e) => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(email, password)
        .then((userAuth) => {
            dispatch(login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
                photoURL: profilePic,
            }))
        })
        .catch(error => alert(error))
    }

    return (
        <div className="login">
            <img src="https://logos-world.net/wp-content/uploads/2020/04/Linkedin-Logo-2011%E2%80%932019.png" alt="Header Logo"/>
            
            <form>
                <input type="text" placeholder="Full Name" value={name} onChange={(e)=>setName(e.target.value)} name="" id=""/>
                <input type="text" placeholder="Profile Pic (Optional)" value={profilePic} onChange={(e)=>setProfilePic(e.target.value)} name="" id=""/>
                <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} name="" id=""/>

                <button onClick={loginToApp}>Login</button>
                <p>Don't have an account? Register <span className="login__register" onClick={register}>Here</span></p>
            </form>
        </div>
    )
}

export default Login
