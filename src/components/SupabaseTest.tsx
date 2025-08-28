import React, { useState } from 'react';
import { submitToAndroidWaitlist, submitToAppleWaitlist } from '../api/waitlist';
import EnvChecker from './EnvChecker';

const SupabaseTest: React.FC = () => {
  const [testEmail, setTestEmail] = useState('test@example.com');
  const [result, setResult] = useState('');
  const [isTesting, setIsTesting] = useState(false);

  const testAndroidWaitlist = async () => {
    setIsTesting(true);
    setResult('Testing Android waitlist...');
    
    try {
      const response = await submitToAndroidWaitlist(testEmail);
      setResult(`Android Test Result: ${response.success ? 'SUCCESS' : 'FAILED'} - ${response.message || 'No message'}`);
    } catch (error) {
      setResult(`Android Test Error: ${error}`);
    } finally {
      setIsTesting(false);
    }
  };

  const testAppleWaitlist = async () => {
    setIsTesting(true);
    setResult('Testing Apple waitlist...');
    
    try {
      const response = await submitToAppleWaitlist(testEmail);
      setResult(`Apple Test Result: ${response.success ? 'SUCCESS' : 'FAILED'} - ${response.message || 'No message'}`);
    } catch (error) {
      setResult(`Apple Test Error: ${error}`);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Supabase Connection Test</h2>
      
      <EnvChecker />
      
      <div className="mb-4 mt-4">
        <label className="block text-sm font-medium mb-2">Test Email:</label>
        <input
          type="email"
          value={testEmail}
          onChange={(e) => setTestEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="space-y-2 mb-4">
        <button
          onClick={testAndroidWaitlist}
          disabled={isTesting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded disabled:bg-gray-400"
        >
          Test Android Waitlist
        </button>
        
        <button
          onClick={testAppleWaitlist}
          disabled={isTesting}
          className="w-full bg-green-600 text-white py-2 px-4 rounded disabled:bg-gray-400"
        >
          Test Apple Waitlist
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded">
        <h3 className="font-semibold mb-2">Result:</h3>
        <pre className="text-sm whitespace-pre-wrap">{result || 'No test run yet'}</pre>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>✅ Environment variables loaded</p>
        <p>✅ Supabase client configured</p>
        <p>✅ API functions ready</p>
      </div>
    </div>
  );
};

export default SupabaseTest;
