import { useState, useCallback, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client.js'
import { useAuth } from '@/hooks/useAuth.js'

export function useNotes() {
  const { user, loading } = useAuth()
  const [ notes, setNotes ] = useState([])

// Fetch notes function 
const fetchNotes = useCallback(async () => {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) console.error(error)
  else setNotes(data)
  }, [])

    // Add note function
    const addNote = useCallback(async (title, content = '') => {
      const trimmedTitle = title.trim()
      if (!trimmedTitle) return null

      const { data, error } = await supabase
        .from('notes')
        .insert([{ title: trimmedTitle, content }])
        .select('id')
        .single()

      if (error) {
        console.error('Note insert error:', error)
        return null
      }

      fetchNotes()
      return data?.id ?? null
    }, [fetchNotes])

    // Update Note
    const updateNote = useCallback(async (id, updates) => {
        const { error } = await supabase.from('notes').update({
            title: updates.title?.trim(),
            content: updates.content
        }).eq('id', id)

        if (error) console.error('Note update error:', error)
            fetchNotes()
    }, [fetchNotes])
  
    // Delete Notes
    const deleteNote = useCallback(async (id) => {
      const { error } = await supabase.from('notes').delete().eq('id', id)
      if (error) {
        console.error('Note delete error:', error)
      } else {
        fetchNotes()
      }
    }, [fetchNotes])

    useEffect(() => {
      if (!loading && user) {
      fetchNotes()
    }
    }, [loading, user, fetchNotes])

    return {
        notes,
        addNote,
        updateNote,
        deleteNote
    }
}