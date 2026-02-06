import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { FieldSet, FieldGroup, Field } from '@/components/ui/field.jsx'
import { Textarea } from '@/components/ui/textarea'
import { useTasks } from '@/hooks/useTasks.js'

function AddTask() {
  const { tasks, addTask, updateTask, deleteTask, completeTask } = useTasks()

  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')

  const handleAddTask = async () => {
    await addTask(title, description)
    setTitle('')
    setDescription('')
  }

  return (
    <div>

      <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-lg pb-4 text-center">Add A New Task</h2>
      <FieldSet>
        <FieldGroup>
          <Field>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a new To-Do"/>
          </Field>
          <Field>
            <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)" />
          </Field>
          <Button variant="default" size="sm" onClick={handleAddTask}>Add</Button>
        </FieldGroup>
      </FieldSet>

      </div>

      <div className="p-4" ><Separator /></div>

      <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-lg pb-4 text-center font-bold">Incomplete Tasks</h2>
      <div>
        {
          tasks.filter(t => !t.completed).map(tasks => (
            <div className="m-4 text-center bg-[var(--card)] border-solid border border-[var(--border)] p-6 rounded w-2/3 mx-auto dark" key={tasks.id}>
              <div className="pb-6 font-bold text-sm">{tasks.title}</div>
              {tasks.description && <div className="pb-6 text-sm">{tasks.description}</div>}
                <div>
                  <Button className="mb-4 w-80" variant="default" size="sm" onClick={() => completeTask(tasks.id)}>Complete</Button>
                  <div>
                  <Button className="m-1 w-40" variant="secondary" size="sm" onClick={() => {
                    const newTitle = prompt('New title:', tasks.title)
                    const newDescription = prompt('New description:', tasks.description)
                    if (newTitle !== null) {
                      updateTask(tasks.id, {
                        title: newTitle || tasks.title,
                        description: newDescription || tasks.description
                    })
                  }
                }}>Update</Button>
                  <Button className="m-1 w-40" variant="destructive" size="sm" onClick={() => deleteTask(tasks.id)}>Delete</Button>
                  </div>
                </div>
              </div>
          ))}
      </div>
      </div>

      <div className="p-4" ><Separator /></div>

      <div className="max-w-2xl mx-auto p-4">   
      <h2 className="text-lg pb-4 text-center font-bold">Complete Tasks</h2>
      <div>
        {tasks
          .filter((t) => t.completed)
          .map((tasks) => (
            <div className="m-4 text-center bg-[var(--card)] border-solid border border[var(--border)] p-6 round w-2/3 mx-auto dark" key={tasks.id}>
              <div className="pb-6 font-bold text-sm">{tasks.title}</div>
              {tasks.description && <div className="pb-6 text-sm">{tasks.description}</div>}
              <div>
              <Button  className="m-1" variant="destructive" size="sm" onClick={() => deleteTask(tasks.id)}>Delete</Button>
              </div>
            </div>
          ))}
      </div>
      </div>
    </div>
  )
}

export default AddTask