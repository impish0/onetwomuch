import { useState, useCallback, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client.js'
import { useAuth } from '@/hooks/useAuth.js'

export function useDocuments() {
  const { user, loading } = useAuth()
  const [ documents, setDocuments ] = useState([])

// Fetch documents function 
const fetchDocuments = useCallback(async () => {
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) console.error(error)
  else setDocuments(data)
  }, [])

    // Add document function
    const addDocument = useCallback(async (title, content ) => {
    const trimmedTitle = title.trim()
    
    if (!trimmedTitle) return

    const { error } = await supabase.from('documents').insert([{
        title: trimmedTitle,
        content,
    }])

      if (error) console.error(error)
        fetchDocuments()
    }, [fetchDocuments])

    // Update Document
    const updateDocument = useCallback(async (id, updates) => {
        const { error } = await supabase.from('documents').update({
            title: updates.title?.trim(),
            content: updates.content
        }).eq('id', id)

        if (error) console.error('Document update error:', error)
            fetchDocuments()
    }, [fetchDocuments])
  
    // Delete Documents
    const deleteDocument = useCallback(async (id) => {
      const { error } = await supabase.from('documents').delete().eq('id', id)
      if (error) {
        console.error('Document delete error:', error)
      } else {
        fetchDocuments()
      }
    }, [fetchDocuments])

    useEffect(() => {
      if (!loading && user) {
      fetchDocuments()
    }
    }, [loading, user, fetchDocuments])

    return {
        documents,
        addDocument,
        updateDocument,
        deleteDocument
    }
}