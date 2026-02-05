import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldLabel, FieldGroup, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const supabase = createClient()

function AddTodo() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    fetchTodos()
  }, [])

  async function fetchTodos() {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) console.error(error)
    else setTodos(data)
  }

  async function addTodo() {
    if (!title.trim()) return
    const { error } = await supabase.from('todos').insert([{ title }])
    if (error) console.error(error)
    else {
      setTitle('')
      fetchTodos()
    }
  }

  async function updateTodo(id, newTitle) {
    await supabase.from('todos').update({ title: newTitle }).eq('id', id)
    fetchTodos()
  }

  async function deleteTodo(id) {
    await supabase.from('todos').delete().eq('id', id)
    fetchTodos()
  }

  async function completeTodo(id) {
    await supabase.from('todos').update({ completed: true }).eq('id', id)
    fetchTodos()
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
          <Button variant="default" size="sm" onClick={addTodo}>Add</Button>
        </FieldGroup>
      </FieldSet>

      </div>

      <div className="p-4" ><Separator /></div>

      <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-lg pb-4 text-center font-bold">Incomplete Tasks</h2>
      <div>
        {
          todos.filter(t => !t.completed).map(todo => (
            <div className="m-4 text-center bg-[var(--card)] border-solid border border-[var(--border)] p-6 rounded w-2/3 mx-auto dark" key={todo.id}>
              <div className="pb-6 font-bold text-sm">{todo.title}</div>
                <div>
                  <Button className="mb-4 w-80" variant="default" size="sm" onClick={() => completeTodo(todo.id)}>Complete</Button>
                  <div>
                  <Button className="m-1 w-40" variant="secondary" size="sm" onClick={() => updateTodo(todo.id, prompt('New title:', todo.title))}>Update</Button>
                  <Button className="m-1 w-40" variant="destructive" size="sm" onClick={() => deleteTodo(todo.id)}>Delete</Button>
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
        {todos
          .filter((t) => t.completed)
          .map((todo) => (
            <div className="m-4 text-center bg-[var(--card)] border-solid border border[var(--border)] p-6 round w-2/3 mx-auto dark" key={todo.id}>
              <span className="pb-6 font-bold text-sm">{todo.title}</span>
              <div>
              <Button  className="m-1" variant="destructive" size="sm" onClick={() => deleteTodo(todo.id)}>Delete</Button>
              </div>
            </div>
          ))}
      </div>
      </div>
    </div>
  )
}

export default AddTodo