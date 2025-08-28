import React from 'react';

const EnvChecker: React.FC = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const resendKey = process.env.NEXT_PUBLIC_RESEND_API_KEY;

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="font-bold mb-2">Environment Variables Status:</h3>
      <div className="space-y-1 text-sm">
        <div>
          <span className="font-medium">SUPABASE_URL:</span> 
          <span className={supabaseUrl ? 'text-green-600' : 'text-red-600'}>
            {supabaseUrl ? '✅ Loaded' : '❌ Missing'}
          </span>
        </div>
        <div>
          <span className="font-medium">SUPABASE_ANON_KEY:</span> 
          <span className={supabaseKey ? 'text-green-600' : 'text-red-600'}>
            {supabaseKey ? '✅ Loaded' : '❌ Missing'}
          </span>
        </div>
        <div>
          <span className="font-medium">RESEND_API_KEY:</span> 
          <span className={resendKey ? 'text-green-600' : 'text-red-600'}>
            {resendKey ? '✅ Loaded' : '❌ Missing'}
          </span>
        </div>
        {supabaseUrl && (
          <div className="text-xs text-gray-600 mt-2">
            URL: {supabaseUrl.substring(0, 30)}...
          </div>
        )}
        {supabaseKey && (
          <div className="text-xs text-gray-600">
            Supabase Key: {supabaseKey.substring(0, 20)}...
          </div>
        )}
        {resendKey && (
          <div className="text-xs text-gray-600">
            Resend Key: {resendKey.substring(0, 20)}...
          </div>
        )}
      </div>
    </div>
  );
};

export default EnvChecker;
