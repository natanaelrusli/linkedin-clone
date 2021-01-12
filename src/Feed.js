import { CalendarViewDay, Create, Event, Image, Subscriptions } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import './Feed.css'
import InputOption from './InputOption'
import Post from './Post'
import { db } from './firebase'
import firebase from 'firebase'

function Feed() {
    const [posts, setPosts] = useState([])
    const [input, setInput] = useState('')
    
    useEffect(() => {
        // Realtime listener to firebase
        db.collection("posts")
            .orderBy("timestamp", "desc")
            .onSnapshot(snapshot => (
            setPosts(snapshot.docs.map(doc => (
                {
                    id : doc.id,
                    data : doc.data(),
                }
            )))
        ))

        return () => {
            // cleanup function
        }
    }, [])

    const sendPost = (e) => {
        // Prevents the page from refreshing when we submit
        e.preventDefault()

        db.collection("posts").add({
            name : "Nata Nael",
            description : "This is from firebase",
            message : input,
            photoURL : "",
            timestamp : firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput("")
    }

    return (
        <div className="feed">
            <div className="feed__inputContainer">

                <div className="feed__input">
                    <Create />
                    <form>
                        <input value={input} onChange={e => setInput(e.target.value)} type="text"/>
                        <button onClick={sendPost} type="submit">Send</button>
                    </form>
                </div>

                <div className="feed__inputOptions">
                    {/* Input Options */}
                    <InputOption title="Photo" Icon={Image} color="#70B5F9"/>
                    <InputOption title="Subscriptions" Icon={Subscriptions} color="#E7A33E"/>
                    <InputOption title="Subscriptions" Icon={Event} color="#C0CBCD"/>
                    <InputOption title="Write Article" Icon={CalendarViewDay} color="#7FC15E"/>
                </div>

            </div>

            {/* Posts */}
            {posts.map(({ id, data : { name, description, message, photoURL } }) => (
                <Post key={id} name={name} description={description} message={message} photoURL={photoURL}/>
            ))}
        </div>
    )
}

export default Feed
