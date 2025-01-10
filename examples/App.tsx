import { useState } from 'react';
import { Renderer } from '../src/Renderer';
import type { FormSchema } from '../src/types';

const initialSchema: FormSchema = {
  title: "Advanced Form Demo",
  description: "This form demonstrates all available field types and features",
  fields: {
    personalInfo: {
      type: "text",
      label: "Full Name",
      required: true,
      placeholder: "John Doe",
      validation: {
        minLength: 2,
        maxLength: 50
      },
      description: "Enter your full legal name"
    },
    email: {
      type: "email",
      label: "Email Addresses",
      required: true,
      allowMultiple: true,
      placeholder: "primary@example.com, secondary@example.com",
      description: "You can enter multiple email addresses separated by commas"
    },
    password: {
      type: "password",
      label: "Password",
      required: true,
      showStrengthIndicator: true,
      showToggle: true,
      description: "Password must be at least 8 characters long"
    },
    age: {
      type: "number",
      label: "Age",
      min: 18,
      max: 120,
      unit: "years",
      description: "You must be at least 18 years old"
    },
    phoneNumbers: {
      type: "array",
      label: "Phone Numbers",
      itemsType: "text",
      minItems: 1,
      maxItems: 3,
      sortable: true,
      placeholder: "+1 (555) 555-5555",
      description: "Add up to 3 phone numbers. Drag to reorder."
    }
  },
  styling: {
    className: "max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6",
    fieldClassName: "bg-gray-50 hover:bg-gray-100 transition-colors duration-200",
    labelClassName: "text-gray-700 font-medium",
    errorClassName: "text-red-600 font-medium"
  },
  callbacks: {
    onValidate: async (data) => {
      // Simulate async validation
      await new Promise(resolve => setTimeout(resolve, 500));
      return true;
    },
    onChange: (data) => {
      console.log('Form data changed:', data);
    },
    onError: (errors) => {
      console.error('Validation errors:', errors);
    }
  }
};

function App() {
  const [schemaText, setSchemaText] = useState(JSON.stringify(initialSchema, null, 2));
  const [error, setError] = useState<string>('');
  const [schema, setSchema] = useState<FormSchema>(initialSchema);
  const [submissionResult, setSubmissionResult] = useState<string>('');

  const handleSchemaChange = (value: string) => {
    setSchemaText(value);
    try {
      const parsed = JSON.parse(value);
      setSchema(parsed);
      setError('');
    } catch (e) {
      setError('Invalid JSON format');
    }
  };

  const handleSubmit = async (data: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmissionResult(JSON.stringify(data, null, 2));
    console.log('Form submitted:', data);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Form Generator Demo
          </h1>
          <p className="text-lg text-gray-600">
            Edit the schema on the left to customize the form on the right
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Schema Editor */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Schema Editor
              </h2>
              <div className="relative">
                <textarea
                  value={schemaText}
                  onChange={(e) => handleSchemaChange(e.target.value)}
                  className="w-full h-[600px] p-4 font-mono text-sm bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  spellCheck="false"
                />
                {error && (
                  <div className="absolute bottom-4 right-4 text-red-500 text-sm bg-white px-3 py-2 rounded-md shadow">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Form Preview & Result */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Form Preview
                </h2>
                {!error && (
                  <Renderer 
                    schema={schema} 
                    onSubmit={handleSubmit}
                  />
                )}
              </div>
            </div>

            {submissionResult && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Submission Result
                </h2>
                <pre className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-[300px]">
                  {submissionResult}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
