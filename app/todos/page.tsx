import { createClient } from '@/lib/supabase/server'

export default async function TodosPage() {
  const supabase = await createClient()

  // Fetch all rows from the 'todos' table
  const { data: todos, error } = await supabase.from('todos').select('*')

  if (error) {
    return <div className="p-8 text-red-500">Error loading tasks: {error.message}</div>
  }

  return (
    <div className="max-w-xl mx-auto p-8 font-sans">
      <h1 className="text-3xl font-bold mb-6">SupaDash Tasks</h1>
      <ul className="space-y-3">
        {todos?.map((item) => (
          <li key={item.id} className="p-4 border rounded-lg shadow-sm flex items-center justify-between">
            <span>{item.task}</span>
            <span className="text-xs text-gray-500">
              {new Date(item.created_at).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}