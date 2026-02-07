import { useEditor, EditorContent } from '@tiptap/react'
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'

export function TipTap ({ content }) {
    const editor = useEditor({
        extensions: [StarterKit], 
        content: content || "<p>Start writing...</p>",
    })

    return (
    <>
      <EditorContent editor={editor} />
      <FloatingMenu editor={editor} />
      <BubbleMenu editor={editor} />
    </>
)
}
