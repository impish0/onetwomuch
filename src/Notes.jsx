import { useState } from 'react';
import { useNotes } from '@/hooks/useNotes.js';
import { TipTap } from '@/components/TipTap.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FieldSet, FieldGroup, Field } from '@/components/ui/field.jsx';
import { Navigate, useNavigate } from 'react-router-dom';

function Notes() {
    const { notes, addNote, editNote, deleteNote } = useNotes()
    const [ editingNote, setEditingNote ] = useState(null)
    const [ title, setTitle ] = useState('')
    const [ content, setContent ] = useState('')

    const handleAddNote = async () => {
        await addNote(title, content)
        setTitle('')
        setContent('')
        Navigate('/notes:id')
    }

    return (
        <div>

            <h2 className="text-3xl font-bold mb-4 text-left">My Notes</h2>

            <FieldSet>
                <FieldGroup>
                    <Field>
                        <Input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Note Title" />
                    </Field>
                    <Button variant="default" size="sm" onClick={handleAddNote}>Create Note</Button>
                </FieldGroup>
            </FieldSet>

            {notes.map(notes => (
            <div className="m-4 p-6 min-w-75 text-center bg-card border-solid border rounded w-2/3 mx-auto"
              key={notes.id}>
              <div className="pb-6 font-bold text-lg">{notes.title}</div>
              <div className="pb-6 text-sm">{notes.content.slice(0, 100)}</div>
                <div>
                  <Button className="m-2 w-1/3" variant="" size="sm" onClick={() => setEditingNote(notes)}>Update</Button>
                  <Button  className="m-1" variant="destructive" size="sm" onClick={() => deleteNote(notes.id)}>Delete</Button>
                </div>
              </div>
         ))}
        </div>
    )
}

export default Notes