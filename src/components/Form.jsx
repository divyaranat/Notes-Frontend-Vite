import { useState } from "react";
import { NotesCard } from "./NotesCard"

export function NoteForm() {
    const [formData, setFormData] = useState({ title: "", content: "", id: null});
    const [formDataUpdate, setFormDataUpdate] = useState({ title: "", content: "", id: null});
    const [noteID, setNoteID] = useState(null);
    URL = "https://deployment-notes-app.onrender.com";

    const handleSubmit = async (event) => {
        event.preventDefault();
        await fetch(URL, {
            method: "POST",
            body: JSON.stringify({
                title: formData.title,
                content: formData.content
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
    }

    const handleSubmitDelete = async (event) => {
        event.preventDefault();
        console.log(noteID)
        await fetch(`${URL}/${noteID}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
    }

    const handleSubmitUpdate = async (event) => {
        event.preventDefault();
        await fetch(`${URL}/${formDataUpdate.id}`, {
            method: "PUT",
            body: JSON.stringify({
                title: formDataUpdate.title,
                content: formDataUpdate.content
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value}));
    }

    const handleChangeDelete = (event) => {
        setNoteID(event.target.value);
    };

    const handleChangeUpdate = (event) => {
        const { name, value } = event.target;
        setFormDataUpdate((prevFormData) => ({ ...prevFormData, [name]: value}));
    }

    return (
        <>
            <h2>New Note</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='title'>Title:</label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} /><br></br><br></br>

                    <label htmlFor='content'>Content:</label>
                    <input type="text" id="content" name="content" value={formData.content} onChange={handleChange} /><br></br><br></br>

                    <input type="submit" value="Submit" />
                </form>
            <h2>Delete Note</h2>
                <form onSubmit={handleSubmitDelete}>
                    <label htmlFor='noteID'>Note ID:</label>
                    <input type="number" value={noteID} onChange={handleChangeDelete}/><br></br><br></br>

                    <input type="submit" value="Submit" />
                </form>
            <h2>Update Note</h2>
                <form onSubmit={handleSubmitUpdate}>
                    <label htmlFor='title'>Title:</label>
                    <input type="text" id="title" name="title" value={formDataUpdate.title} onChange={handleChangeUpdate} /><br></br><br></br>

                    <label htmlFor='content'>Content:</label>
                    <input type="text" id="content" name="content" value={formDataUpdate.content} onChange={handleChangeUpdate} /><br></br><br></br>

                    <label htmlFor='noteID'>Note ID:</label>
                    <input type="number" id="id" name="id" value={formDataUpdate.id} onChange={handleChangeUpdate} /><br></br><br></br>

                    <input type="submit" value="Submit" />
                </form>
            <h1>Notes</h1>
            <NotesCard />
        </>
    );
}