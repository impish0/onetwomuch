import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { FieldSet, FieldGroup, Field } from '@/components/ui/field.jsx'
import { Textarea } from '@/components/ui/textarea'
import { useTasks } from '@/hooks/useTasks.js'
import { EditTaskSheet } from '@/components/EditTaskSheet.jsx'
import { DatePicker } from '@/components/DatePicker'

function AddTask() {
  const { tasks, addTask, updateTask, deleteTask, completeTask } = useTasks()

  const [ editingTask, setEditingTask ] = useState(null)
  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ dueDate, setDueDate ] = useState(null)

  const handleAddTask = async () => {
    await addTask(title, description, dueDate)
    setTitle('')
    setDescription('')
    setDueDate(null)
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
            <DatePicker
              value={dueDate}
              onChange={setDueDate}
              placeholder="Select a due date" />
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
            <div className="m-4 p-6 min-w-75 text-center bg-card border-solid border rounded w-2/3 mx-auto" key={tasks.id}>
              <div className="pb-6 font-bold text-lg">{tasks.title}</div>
              {tasks.description && <div className="pb-6 text-sm">{tasks.description}</div>}
              {tasks.due_date && <div className="pb-6 text-sm">📅 Due Date: {new Date(tasks.due_date).toLocaleDateString()}</div>}
                <div>
                  <Button className="m-2 w-1/3" variant="outline" size="sm" onClick={() => setEditingTask(tasks)}>Update</Button>
                  <Button className="w-1/3" variant="default" size="sm" onClick={() => completeTask(tasks.id)}>Complete</Button>
                </div>
              </div>
          ))}
      </div>
      </div>

      <div className="p-4" ><Separator /></div>

      <div className="max-w-2xl mx-auto p-4">   
      <h2 className="text-lg pb-4 text-center font-bold">Completed Tasks</h2>
      <div>
        {tasks
          .filter((t) => t.completed)
          .map((tasks) => (
            <div className="m-4 min-w-75 text-center card border-solid border p-6 w-2/3 mx-auto" key={tasks.id}>
              <div className="pb-6 font-bold text-sm">{tasks.title}</div>
              {tasks.description && <div className="pb-6 text-sm">{tasks.description}</div>}
              {tasks.completed_at && <div className="pb-6 text-sm">Finished on: {new Date(tasks.completed_at).toLocaleDateString()}</div>}
              <div>
              <Button  className="m-1" variant="destructive" size="sm" onClick={() => deleteTask(tasks.id)}>Delete</Button>
              </div>
            </div>
          ))}
      </div>
      </div>
      <EditTaskSheet
        task={editingTask}
        isOpen={editingTask !== null}
        onClose={() => setEditingTask(null)}
        onUpdate={updateTask}
        />
    </div>
  )
}

export default AddTask