import { useState, useCallback, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client.js'
import { useAuth } from '@/hooks/useAuth.js'

export function useTasks() {
  const { user, loading } = useAuth()
  const [ tasks, setTasks ] = useState([])

// Fetch tasks function 
const fetchTasks = useCallback(async () => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) console.error(error)
  else setTasks(data)
  }, [])

    // Add task function
    const addTask = useCallback(async (title, description, dueDate = null) => {
    const trimmedTitle = title.trim()
    const trimmedDescription = description?.trim() || ''
    
    if (!trimmedTitle) return

    const { error } = await supabase.from('tasks').insert([{
        title: trimmedTitle,
        description: trimmedDescription,
        due_date: dueDate
    }])

      if (error) console.error(error)
        fetchTasks()
    }, [fetchTasks])

    // Update task
    const updateTask = useCallback(async (id, updates) => {
        const { error } = await supabase.from('tasks').update({
            title: updates.title?.trim(),
            description: updates.description?.trim(),
            due_date: updates.due_date
        }).eq('id', id)

        if (error) console.error(error)
            fetchTasks()
    }, [fetchTasks])

    // complete task
    const completeTask = useCallback(async (id) => {
      const { error } = await supabase.from('tasks').update({
        completed: true,
        completed_at: new Date().toISOString()
        }).eq('id', id)

        if (error) {
            console.error('Task completion error:', error)
         } else {
              fetchTasks()
         }
        }, [fetchTasks])
  
    // Delete task
    const deleteTask = useCallback(async (id) => {
      const { error } = await supabase.from('tasks').delete().eq('id', id)
      if (error) {
        console.error('Task delete error:', error)
      } else {
        fetchTasks()
      }
    }, [fetchTasks])

    useEffect(() => {
      if (!loading && user) {
      fetchTasks()
    }
    }, [loading, user, fetchTasks])

    return {
        tasks,
        addTask,
        updateTask,
        deleteTask,
        completeTask
    }
}