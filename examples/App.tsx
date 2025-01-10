import { useState } from 'react'
import { Renderer } from '../src/Renderer'
import type { FormSchema } from '../src/types'

const initialSchema: FormSchema = {
  description: "Test form",
  fields: {
    name: {
      type: "text",
      label: "Name",
      required: true
    },
    email: {
      type: "email",
      label: "Email",
      required: true
    }
  }
}

function App() {
  const [schemaText, setSchemaText] = useState(JSON.stringify(initialSchema, null, 2))
  const [error, setError] = useState<string>('')
  const [schema, setSchema] = useState<FormSchema>(initialSchema)

  const handleSchemaChange = (value: string) => {
    setSchemaText(value)
    try {
      const parsed = JSON.parse(value)
      setSchema(parsed)
      setError('')
    } catch (e) {
      setError('Invalid JSON format')
    }
  }

  const handleSubmit = (data: any) => {
    console.log('Form submitted:', data)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Form Generator</h1>
      
      {/* Schema Editor */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Schema Editor</h2>
        <div className="relative">
          <textarea
            value={schemaText}
            onChange={(e) => handleSchemaChange(e.target.value)}
            className="w-full h-64 p-4 font-mono text-sm bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            spellCheck="false"
          />
          {error && (
            <div className="absolute bottom-2 right-2 text-red-500 text-sm bg-white px-2 py-1 rounded">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Form Preview */}
      <div className="border-t pt-8">
        <h2 className="text-lg font-semibold mb-4">Form Preview</h2>
        {!error && <Renderer schema={schema} onSubmit={handleSubmit} />}
      </div>
    </div>
  )
}

export default App