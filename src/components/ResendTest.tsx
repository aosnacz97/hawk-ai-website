import React, { useState } from 'react';
import { sendContactEmail } from '../api/resend';

const ResendTest: React.FC = () => {
  const [testData] = useState({
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Contact Form',
    message: 'This is a test message from the contact form.'
  });
  const [result, setResult] = useState('');
  const [isTesting, setIsTesting] = useState(false);

  const testResendEmail = async () => {
    setIsTesting(true);
    setResult('Testing Resend email...');
    
    try {
      const response = await sendContactEmail(testData);
      setResult(`Resend Test Result: ${response.success ? 'SUCCESS' : 'FAILED'} - ${response.message || 'No message'}`);
    } catch (error) {
      setResult(`Resend Test Error: ${error}`);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Resend Email Test</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Test Data:</label>
        <div className="space-y-2 text-sm">
          <div><strong>Name:</strong> {testData.name}</div>
          <div><strong>Email:</strong> {testData.email}</div>
          <div><strong>Subject:</strong> {testData.subject}</div>
          <div><strong>Message:</strong> {testData.message}</div>
        </div>
      </div>

      <button
        onClick={testResendEmail}
        disabled={isTesting}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded disabled:bg-gray-400 mb-4"
      >
        {isTesting ? 'Testing...' : 'Test Resend Email'}
      </button>

      <div className="bg-gray-100 p-4 rounded">
        <h3 className="font-semibold mb-2">Result:</h3>
        <pre className="text-sm whitespace-pre-wrap">{result || 'No test run yet'}</pre>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>✅ Resend SDK installed</p>
        <p>✅ Email template configured</p>
        <p>✅ From: contact@ease-up.app</p>
        <p>✅ To: support@ease-up.app</p>
      </div>
    </div>
  );
};

export default ResendTest;
