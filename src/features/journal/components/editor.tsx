import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '../../../core/components/ui/button'
import { Card } from '../../../core/components/ui/card'
import { useJournal } from '../context'

const journalEntrySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  mood: z.enum(['happy', 'neutral', 'sad']).optional()
})

type JournalEntryForm = z.infer<typeof journalEntrySchema>

export function JournalEditor() {
  const { addEntry } = useJournal()
  const { register, handleSubmit, formState: { errors } } = useForm<JournalEntryForm>({ resolver: zodResolver(journalEntrySchema) })

  const onSubmit = (data: JournalEntryForm) => {
    addEntry({
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString()
    })
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">Title</label>
          <input
            id="title"
            {...register('title')}
            className="w-full p-3 rounded-lg bg-surface border border-white/20 focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>}
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-2">Content</label>
          <textarea
            id="content"
            rows={8}
            {...register('content')}
            className="w-full p-3 rounded-lg bg-surface border border-white/20 focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.content && <p className="mt-1 text-sm text-red-400">{errors.content.message}</p>}
        </div>

        <div className="flex justify-end">
          <Button type="submit">Save Entry</Button>
        </div>
      </form>
    </Card>
  )
}