import { useState, useEffect } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet.jsx'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FieldSet, FieldGroup, Field } from '@/components/ui/field.jsx'
import { Textarea } from '@/components/ui/textarea'

export function EditTaskSheet({ task, isOpen, onClose, onUpdate }) {
    const [ title, setTitle ] = useState(task?.title || '')
    const [ description, setDescription ] = useState(task?.description || '')

    const handleSave = async () => {
    await onUpdate(task.id, { title, description })
    onClose()
}

useEffect(() => {
    if (task) {
        setTitle(task.title || '')
        setDescription(task.description || '')
    }
}, [task])

return (
    <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Edit Task</SheetTitle>
                <SheetDescription>Edit your task details below</SheetDescription>
            </SheetHeader>
          <div className="p-4">
            <FieldSet>
              <FieldGroup>
                <Field>
                  <Input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Update Title"/>
                </Field>
                <Field>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Update Description" />
                </Field>
              </FieldGroup>
            </FieldSet>
            </div>
            <SheetFooter>
                <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
                <Button variant="default" size="sm" onClick={handleSave}>Save Changes</Button>
            </SheetFooter>
        </SheetContent>
    </Sheet>
)
}