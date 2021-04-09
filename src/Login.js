import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from './features/userSlice'
import { auth, provider } from './firebase'
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

    const loginGoogle = () => {
        auth.signInWithPopup(provider)
        .then((userAuth) => {
            dispatch(login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
                photoURL: profilePic,
            }))
        })
        .catch((error) => alert(error.message));
    }

    return (
        <div className="login">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/600px-LinkedIn_logo_initials.png" alt="Header Logo"/>
            
            <form>
                <input type="text" placeholder="Full Name" value={name} onChange={(e)=>setName(e.target.value)} name="" id=""/>
                <input type="text" placeholder="Profile Pic (Optional)" value={profilePic} onChange={(e)=>setProfilePic(e.target.value)} name="" id=""/>
                <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} name="" id=""/>

                <button onClick={loginToApp}>Login</button>
                <p>Don't have an account? Register <span className="login__register" onClick={register}>Here</span></p>
                <p>Other Login options:</p>
                <img className="login__googleImage" alt="Google Login" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png" onClick={loginGoogle}></img>
            </form>
        </div>
    )
}

export default Login
