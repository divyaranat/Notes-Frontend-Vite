import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';

export function NotesCard() {
    const [notes, setNotes] = useState([]);
    const URL = "https://deployment-notes-app.onrender.com"

    useEffect(() => {
        async function fetchNotes() {
          try {
            const response = await fetch(URL);
            const jsonRes = await response.json();
            setNotes(jsonRes);
          } catch (error) {
            console.log('Error fetching notes:', error);
          }
        }
    
        fetchNotes();
    }, []);

    return (
      <>
        {notes.map(note => (
        <Card style={{ width: '18rem'}}>
            <Card.Body>
              <Card.Title style={{ color: "green" }}>{note.title}</Card.Title>
              <Card.Text>{note.content}</Card.Text>
              <Card.Text>ID: {note.id}</Card.Text>
            </Card.Body>
        </Card>
        ))}
      </>
    );      
}