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
    const addTask = useCallback(async (title, description) => {
      if (!title.trim()) return
      const { error } = await supabase.from('tasks').insert([{ title, description }])
      if (error) console.error(error)
        fetchTasks()
    }, [fetchTasks])

    // Update task
    const updateTask = useCallback(async (id, updates) => {
      await supabase.from('tasks').update(updates).eq('id', id)
      fetchTasks()
    }, [fetchTasks])

    // complete task
    const completeTask = useCallback(async (id) => {
      await supabase.from('tasks').update({ completed: true }).eq('id', id)
      fetchTasks()
    }, [fetchTasks])
  
    // Delete task
    const deleteTask = useCallback(async (id) => {
      await supabase.from('tasks').delete().eq('id', id)
      fetchTasks()
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