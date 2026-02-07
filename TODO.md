# Documents Feature TODO

## Database Setup
- [x] Create documents table in Supabase
- [x] Configure RLS policies for documents

## Phase 1: Basic Infrastructure

### 1. Create useDocuments Hook
File: `src/hooks/useDocuments.js`

Copy useTasks.js and adapt:
- Rename tasks to documents throughout
- Update table name from 'tasks' to 'documents'
- Remove completeTask function
- Keep: fetchDocuments, addDocument, updateDocument, deleteDocument
- Update fields: title, content, created_at, updated_at

### 2. Create Documents List Page
File: `src/Documents.jsx`

Basic document list:
- Display document titles
- Show created_at timestamps
- Add form to create new documents (title input only)
- Use similar structure to AddTask but simplified

### 3. Add Documents Route
File: `src/App.jsx` or `src/main.jsx`

Add protected route for documents page.

### 4. Update Sidebar Navigation
File: `src/components/app-sidebar.jsx`

Add documents link with icon and label.

## Phase 2: Rich Text Editor

### 5. Install Tiptap
```bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-placeholder
```

### 6. Build Editor Component
File: `src/components/TiptapEditor.jsx`

Create reusable editor component:
- Accept content and onChange props
- Configure StarterKit extensions
- Add basic toolbar (bold, italic, headings, lists)
- Add placeholder support

### 7. Create Document Editor Page
File: `src/DocumentEditor.jsx`

Full document editing interface:
- Get document ID from route params
- Load document data
- Integrate TiptapEditor
- Handle content updates

### 8. Implement Auto-Save
Update DocumentEditor:
- Debounce content changes
- Auto-save after typing stops
- Display save status indicator
- Handle errors gracefully

## Future Ideas
- Link documents to tasks
- Add folders/organization
- Implement search
- Extended formatting options
- Sharing and collaboration
- Version history

## Notes
- Build and test each phase sequentially
- Phase 1 uses familiar patterns from tasks feature
- Phase 2 introduces Tiptap (new territory)
