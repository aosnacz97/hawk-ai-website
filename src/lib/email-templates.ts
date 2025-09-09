interface EmailTemplateProps {
  name?: string;
  email: string;
  verificationUrl?: string;
  magicLinkUrl?: string;
  appName?: string;
}

export function getVerificationEmailTemplate({
  name = 'User',
  email: _email,
  verificationUrl,
  appName = 'Ease Up'
}: EmailTemplateProps): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
      <div style="background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Welcome to ${appName}!</h1>
        <p style="color: #E0E7FF; margin: 10px 0 0 0; font-size: 16px;">Please verify your email address</p>
      </div>
      
      <div style="padding: 40px 30px; background-color: #ffffff;">
        <h2 style="color: #1F2937; margin: 0 0 20px 0; font-size: 24px;">Hi ${name}!</h2>
        
        <p style="color: #374151; line-height: 1.6; margin-bottom: 20px; font-size: 16px;">
          Thank you for signing up for ${appName}! To complete your registration and start using our service, 
          please verify your email address by clicking the button below.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="display: inline-block; background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%); 
                    color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; 
                    font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);">
            Verify Email Address
          </a>
        </div>
        
        <p style="color: #6B7280; line-height: 1.6; margin: 20px 0; font-size: 14px;">
          If the button doesn't work, you can also copy and paste this link into your browser:
        </p>
        
        <div style="background: #F3F4F6; padding: 15px; border-radius: 6px; word-break: break-all; margin: 20px 0;">
          <p style="color: #374151; margin: 0; font-size: 14px; font-family: monospace;">${verificationUrl}</p>
        </div>
        
        <div style="background: #FEF3C7; border: 1px solid #F59E0B; border-radius: 6px; padding: 15px; margin: 20px 0;">
          <p style="color: #92400E; margin: 0; font-size: 14px;">
            <strong>Security Note:</strong> This verification link will expire in 48 hours for your security. 
            If you didn't create an account with ${appName}, you can safely ignore this email.
          </p>
        </div>
      </div>
      
      <div style="background: #F9FAFB; padding: 30px; text-align: center; border-radius: 0 0 8px 8px; border-top: 1px solid #E5E7EB;">
        <p style="color: #6B7280; margin: 0 0 10px 0; font-size: 14px;">
          Need help? Contact us at 
          <a href="mailto:support@ease-up.app" style="color: #3B82F6; text-decoration: none;">support@ease-up.app</a>
        </p>
        <p style="color: #9CA3AF; margin: 0; font-size: 12px;">
          © 2024 ${appName}. All rights reserved.
        </p>
      </div>
    </div>
  `;
}

export function getMagicLinkEmailTemplate({
  name = 'User',
  email: _email,
  magicLinkUrl,
  appName = 'Ease Up'
}: EmailTemplateProps): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
      <div style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Your ${appName} Login Link</h1>
        <p style="color: #D1FAE5; margin: 10px 0 0 0; font-size: 16px;">Click to sign in securely</p>
      </div>
      
      <div style="padding: 40px 30px; background-color: #ffffff;">
        <h2 style="color: #1F2937; margin: 0 0 20px 0; font-size: 24px;">Hi ${name}!</h2>
        
        <p style="color: #374151; line-height: 1.6; margin-bottom: 20px; font-size: 16px;">
          You requested a magic link to sign in to your ${appName} account. Click the button below to 
          access your account securely without a password.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${magicLinkUrl}" 
             style="display: inline-block; background: linear-gradient(135deg, #10B981 0%, #059669 100%); 
                    color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; 
                    font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">
            Sign In to ${appName}
          </a>
        </div>
        
        <p style="color: #6B7280; line-height: 1.6; margin: 20px 0; font-size: 14px;">
          If the button doesn't work, you can also copy and paste this link into your browser:
        </p>
        
        <div style="background: #F3F4F6; padding: 15px; border-radius: 6px; word-break: break-all; margin: 20px 0;">
          <p style="color: #374151; margin: 0; font-size: 14px; font-family: monospace;">${magicLinkUrl}</p>
        </div>
        
        <div style="background: #FEF3C7; border: 1px solid #F59E0B; border-radius: 6px; padding: 15px; margin: 20px 0;">
          <p style="color: #92400E; margin: 0; font-size: 14px;">
            <strong>Security Note:</strong> This magic link will expire in 24 hours and can only be used once. 
            If you didn't request this login link, you can safely ignore this email.
          </p>
        </div>
        
        <div style="background: #EFF6FF; border: 1px solid #3B82F6; border-radius: 6px; padding: 15px; margin: 20px 0;">
          <p style="color: #1E40AF; margin: 0; font-size: 14px;">
            <strong>Tip:</strong> For faster access in the future, consider setting up a password in your account settings.
          </p>
        </div>
      </div>
      
      <div style="background: #F9FAFB; padding: 30px; text-align: center; border-radius: 0 0 8px 8px; border-top: 1px solid #E5E7EB;">
        <p style="color: #6B7280; margin: 0 0 10px 0; font-size: 14px;">
          Need help? Contact us at 
          <a href="mailto:support@ease-up.app" style="color: #3B82F6; text-decoration: none;">support@ease-up.app</a>
        </p>
        <p style="color: #9CA3AF; margin: 0; font-size: 12px;">
          © 2024 ${appName}. All rights reserved.
        </p>
      </div>
    </div>
  `;
}

export function getVerificationSuccessEmailTemplate({
  name = 'User',
  email: _email,
  appName = 'Ease Up'
}: EmailTemplateProps): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
      <div style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Email Verified! 🎉</h1>
        <p style="color: #D1FAE5; margin: 10px 0 0 0; font-size: 16px;">Welcome to ${appName}</p>
      </div>
      
      <div style="padding: 40px 30px; background-color: #ffffff;">
        <h2 style="color: #1F2937; margin: 0 0 20px 0; font-size: 24px;">Hi ${name}!</h2>
        
        <p style="color: #374151; line-height: 1.6; margin-bottom: 20px; font-size: 16px;">
          Great news! Your email address has been successfully verified. You now have full access to all 
          ${appName} features and can start using our service.
        </p>
        
        <div style="background: #F0FDF4; border: 1px solid #10B981; border-radius: 6px; padding: 20px; margin: 20px 0;">
          <h3 style="color: #059669; margin: 0 0 10px 0; font-size: 18px;">What's Next?</h3>
          <ul style="color: #374151; margin: 0; padding-left: 20px;">
            <li style="margin-bottom: 8px;">Complete your profile setup</li>
            <li style="margin-bottom: 8px;">Explore our features and tools</li>
            <li style="margin-bottom: 8px;">Set up your preferences</li>
            <li>Start using ${appName} to its full potential!</li>
          </ul>
        </div>
      </div>
      
      <div style="background: #F9FAFB; padding: 30px; text-align: center; border-radius: 0 0 8px 8px; border-top: 1px solid #E5E7EB;">
        <p style="color: #6B7280; margin: 0 0 10px 0; font-size: 14px;">
          Need help getting started? Contact us at 
          <a href="mailto:support@ease-up.app" style="color: #3B82F6; text-decoration: none;">support@ease-up.app</a>
        </p>
        <p style="color: #9CA3AF; margin: 0; font-size: 12px;">
          © 2024 ${appName}. All rights reserved.
        </p>
      </div>
    </div>
  `;
}
