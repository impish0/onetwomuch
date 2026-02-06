import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { FieldSet, FieldGroup, Field } from '@/components/ui/field.jsx'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from './hooks/useAuth.js'

function AddTask() {
  const { user, loading } = useAuth()
  const [ tasks, setTasks ] = useState([])
  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')

const fetchTasks = useCallback(async () => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) console.error(error)
  else setTasks(data)
  }, [])

  useEffect(() => {
    if (!loading && user) {
      fetchTasks()
    }
  }, [loading, user, fetchTasks])

  async function addTask() {
    if (!title.trim()) return
    const { error } = await supabase.from('tasks').insert([{ title, description }])
    if (error) console.error(error)
    else {
      setTitle('')
      setDescription('')
      fetchTasks()
    }
  }

  async function updateTask(id, newTitle) {
    await supabase.from('tasks').update({ title: newTitle }).eq('id', id)
    fetchTasks()
  }

  async function deleteTask(id) {
    await supabase.from('tasks').delete().eq('id', id)
    fetchTasks()
  }

  async function completeTask(id) {
    await supabase.from('tasks').update({ completed: true }).eq('id', id)
    fetchTasks()
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
          <Button variant="default" size="sm" onClick={addTask}>Add</Button>
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
                <div>
                  <Button className="mb-4 w-80" variant="default" size="sm" onClick={() => completeTask(tasks.id)}>Complete</Button>
                  <div>
                  <Button className="m-1 w-40" variant="secondary" size="sm" onClick={() => updateTask(tasks.id, prompt('New title:', tasks.title))}>Update</Button>
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
              <span className="pb-6 font-bold text-sm">{tasks.title}</span>
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