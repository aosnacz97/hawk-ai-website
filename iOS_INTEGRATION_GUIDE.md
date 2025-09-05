# iOS App Integration Guide

## 🚀 Integration Overview

Your authentication system is already set up and ready for iOS integration! Here's how to connect your iOS app to the existing API endpoints.

## 📱 iOS Implementation Steps

### 1. **Create iOS Authentication Service**

```swift
// AuthService.swift
import Foundation
import Combine

class AuthService: ObservableObject {
    private let baseURL = "https://yourdomain.com" // Replace with your production URL
    private let session = URLSession.shared
    
    @Published var isLoading = false
    @Published var errorMessage: String?
    @Published var isAuthenticated = false
    
    // MARK: - Email Verification
    
    func sendVerificationEmail(email: String, name: String? = nil) async throws -> Bool {
        isLoading = true
        defer { isLoading = false }
        
        let url = URL(string: "\(baseURL)/api/auth/send-verification-production")!
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let body = [
            "email": email,
            "name": name ?? ""
        ]
        
        request.httpBody = try JSONSerialization.data(withJSONObject: body)
        
        let (data, response) = try await session.data(for: request)
        
        guard let httpResponse = response as? HTTPURLResponse else {
            throw AuthError.invalidResponse
        }
        
        if httpResponse.statusCode == 200 {
            return true
        } else if httpResponse.statusCode == 429 {
            // Rate limited
            let retryAfter = httpResponse.value(forHTTPHeaderField: "Retry-After")
            throw AuthError.rateLimited(retryAfter: retryAfter)
        } else {
            let errorData = try JSONSerialization.jsonObject(with: data) as? [String: Any]
            let message = errorData?["message"] as? String ?? "Unknown error"
            throw AuthError.serverError(message: message)
        }
    }
    
    // MARK: - Magic Link Login
    
    func sendMagicLink(email: String, name: String? = nil) async throws -> Bool {
        isLoading = true
        defer { isLoading = false }
        
        let url = URL(string: "\(baseURL)/api/auth/send-magic-link")!
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let body = [
            "email": email,
            "name": name ?? ""
        ]
        
        request.httpBody = try JSONSerialization.data(withJSONObject: body)
        
        let (data, response) = try await session.data(for: request)
        
        guard let httpResponse = response as? HTTPURLResponse else {
            throw AuthError.invalidResponse
        }
        
        if httpResponse.statusCode == 200 {
            return true
        } else if httpResponse.statusCode == 429 {
            let retryAfter = httpResponse.value(forHTTPHeaderField: "Retry-After")
            throw AuthError.rateLimited(retryAfter: retryAfter)
        } else {
            let errorData = try JSONSerialization.jsonObject(with: data) as? [String: Any]
            let message = errorData?["message"] as? String ?? "Unknown error"
            throw AuthError.serverError(message: message)
        }
    }
    
    // MARK: - Verify Email Token
    
    func verifyEmailToken(token: String) async throws -> Bool {
        isLoading = true
        defer { isLoading = false }
        
        let url = URL(string: "\(baseURL)/api/auth/verify-email-secure")!
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let body = ["token": token]
        request.httpBody = try JSONSerialization.data(withJSONObject: body)
        
        let (data, response) = try await session.data(for: request)
        
        guard let httpResponse = response as? HTTPURLResponse else {
            throw AuthError.invalidResponse
        }
        
        if httpResponse.statusCode == 200 {
            isAuthenticated = true
            return true
        } else {
            let errorData = try JSONSerialization.jsonObject(with: data) as? [String: Any]
            let message = errorData?["message"] as? String ?? "Verification failed"
            throw AuthError.serverError(message: message)
        }
    }
    
    // MARK: - Verify Magic Link Token
    
    func verifyMagicLinkToken(token: String) async throws -> Bool {
        isLoading = true
        defer { isLoading = false }
        
        let url = URL(string: "\(baseURL)/api/auth/verify-magic-link")!
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let body = ["token": token]
        request.httpBody = try JSONSerialization.data(withJSONObject: body)
        
        let (data, response) = try await session.data(for: request)
        
        guard let httpResponse = response as? HTTPURLResponse else {
            throw AuthError.invalidResponse
        }
        
        if httpResponse.statusCode == 200 {
            isAuthenticated = true
            return true
        } else {
            let errorData = try JSONSerialization.jsonObject(with: data) as? [String: Any]
            let message = errorData?["message"] as? String ?? "Login failed"
            throw AuthError.serverError(message: message)
        }
    }
}

// MARK: - Error Handling

enum AuthError: Error, LocalizedError {
    case invalidResponse
    case rateLimited(retryAfter: String?)
    case serverError(message: String)
    case networkError
    
    var errorDescription: String? {
        switch self {
        case .invalidResponse:
            return "Invalid response from server"
        case .rateLimited(let retryAfter):
            if let retryAfter = retryAfter {
                return "Too many requests. Please try again in \(retryAfter) seconds."
            }
            return "Too many requests. Please try again later."
        case .serverError(let message):
            return message
        case .networkError:
            return "Network error. Please check your connection."
        }
    }
}
```

### 2. **Create Authentication Views**

```swift
// EmailVerificationView.swift
import SwiftUI

struct EmailVerificationView: View {
    @StateObject private var authService = AuthService()
    @State private var email = ""
    @State private var name = ""
    @State private var showingSuccess = false
    @State private var errorMessage = ""
    
    var body: some View {
        VStack(spacing: 24) {
            // Header
            VStack(spacing: 8) {
                Image(systemName: "envelope.circle.fill")
                    .font(.system(size: 60))
                    .foregroundColor(.blue)
                
                Text("Verify Your Email")
                    .font(.title)
                    .fontWeight(.bold)
                
                Text("Enter your email to receive a verification link")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
            }
            
            // Form
            VStack(spacing: 16) {
                TextField("Your Name (Optional)", text: $name)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                
                TextField("Email Address", text: $email)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .keyboardType(.emailAddress)
                    .autocapitalization(.none)
                
                if !errorMessage.isEmpty {
                    Text(errorMessage)
                        .foregroundColor(.red)
                        .font(.caption)
                }
                
                Button(action: sendVerification) {
                    HStack {
                        if authService.isLoading {
                            ProgressView()
                                .scaleEffect(0.8)
                        }
                        Text(authService.isLoading ? "Sending..." : "Send Verification Email")
                    }
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.blue)
                    .foregroundColor(.white)
                    .cornerRadius(10)
                }
                .disabled(authService.isLoading || email.isEmpty)
            }
        }
        .padding()
        .alert("Verification Email Sent", isPresented: $showingSuccess) {
            Button("OK") { }
        } message: {
            Text("Please check your email and click the verification link.")
        }
    }
    
    private func sendVerification() {
        Task {
            do {
                let success = try await authService.sendVerificationEmail(
                    email: email,
                    name: name.isEmpty ? nil : name
                )
                if success {
                    showingSuccess = true
                    errorMessage = ""
                }
            } catch {
                errorMessage = error.localizedDescription
            }
        }
    }
}

// MagicLinkLoginView.swift
struct MagicLinkLoginView: View {
    @StateObject private var authService = AuthService()
    @State private var email = ""
    @State private var name = ""
    @State private var showingSuccess = false
    @State private var errorMessage = ""
    
    var body: some View {
        VStack(spacing: 24) {
            // Header
            VStack(spacing: 8) {
                Image(systemName: "key.circle.fill")
                    .font(.system(size: 60))
                    .foregroundColor(.green)
                
                Text("Sign In with Magic Link")
                    .font(.title)
                    .fontWeight(.bold)
                
                Text("Enter your email to receive a secure login link")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
            }
            
            // Form
            VStack(spacing: 16) {
                TextField("Your Name (Optional)", text: $name)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                
                TextField("Email Address", text: $email)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .keyboardType(.emailAddress)
                    .autocapitalization(.none)
                
                if !errorMessage.isEmpty {
                    Text(errorMessage)
                        .foregroundColor(.red)
                        .font(.caption)
                }
                
                Button(action: sendMagicLink) {
                    HStack {
                        if authService.isLoading {
                            ProgressView()
                                .scaleEffect(0.8)
                        }
                        Text(authService.isLoading ? "Sending..." : "Send Magic Link")
                    }
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.green)
                    .foregroundColor(.white)
                    .cornerRadius(10)
                }
                .disabled(authService.isLoading || email.isEmpty)
            }
            
            // Security note
            VStack(spacing: 8) {
                Text("Security Note")
                    .font(.caption)
                    .fontWeight(.semibold)
                Text("Magic links are secure and don't require passwords. The link expires in 24 hours for your security.")
                    .font(.caption)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
            }
        }
        .padding()
        .alert("Magic Link Sent", isPresented: $showingSuccess) {
            Button("OK") { }
        } message: {
            Text("Please check your email and click the magic link to sign in.")
        }
    }
    
    private func sendMagicLink() {
        Task {
            do {
                let success = try await authService.sendMagicLink(
                    email: email,
                    name: name.isEmpty ? nil : name
                )
                if success {
                    showingSuccess = true
                    errorMessage = ""
                }
            } catch {
                errorMessage = error.localizedDescription
            }
        }
    }
}
```

### 3. **Handle Deep Links for Token Verification**

```swift
// AppDelegate.swift or App.swift
import SwiftUI

@main
struct EaseUpApp: App {
    @StateObject private var authService = AuthService()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(authService)
                .onOpenURL { url in
                    handleDeepLink(url)
                }
        }
    }
    
    private func handleDeepLink(_ url: URL) {
        // Handle verification links
        if url.host == "verify-email" {
            if let token = url.queryItems?.first(where: { $0.name == "token" })?.value {
                Task {
                    do {
                        let success = try await authService.verifyEmailToken(token: token)
                        if success {
                            // Navigate to success screen
                        }
                    } catch {
                        // Handle error
                    }
                }
            }
        }
        
        // Handle magic link
        if url.host == "auth" && url.path == "/magic-link" {
            if let token = url.queryItems?.first(where: { $0.name == "token" })?.value {
                Task {
                    do {
                        let success = try await authService.verifyMagicLinkToken(token: token)
                        if success {
                            // Navigate to main app
                        }
                    } catch {
                        // Handle error
                    }
                }
            }
        }
    }
}

// URL extension for query parsing
extension URL {
    var queryItems: [URLQueryItem]? {
        URLComponents(url: self, resolvingAgainstBaseURL: false)?.queryItems
    }
}
```

### 4. **Configure URL Schemes in Info.plist**

```xml
<!-- Info.plist -->
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLName</key>
        <string>com.easeup.app</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>easeup</string>
        </array>
    </dict>
</array>
```

### 5. **Update Email Templates for iOS Deep Links**

The email templates will need to be updated to use your iOS app's URL scheme:

```typescript
// In your email templates, use:
const verificationUrl = `easeup://verify-email?token=${verificationToken}`;
const magicLinkUrl = `easeup://auth/magic-link?token=${magicLinkToken}`;
```

## 🔧 Configuration Steps

### 1. **Update Your API Base URL**
Replace `https://yourdomain.com` with your actual domain in the iOS code.

### 2. **Configure URL Schemes**
- Add your app's URL scheme to Info.plist
- Update email templates to use the correct scheme

### 3. **Test the Integration**
- Use the demo page at `/auth-demo` to test the API
- Test deep link handling in iOS Simulator
- Verify email delivery and link functionality

## 📱 User Flow

### **Email Verification Flow:**
1. User enters email in iOS app
2. App calls `/api/auth/send-verification-production`
3. User receives email with verification link
4. User clicks link → opens iOS app via deep link
5. App extracts token and calls `/api/auth/verify-email-secure`
6. User is verified and authenticated

### **Magic Link Flow:**
1. User enters email in iOS app
2. App calls `/api/auth/send-magic-link`
3. User receives email with magic link
4. User clicks link → opens iOS app via deep link
5. App extracts token and calls `/api/auth/verify-magic-link`
6. User is signed in and authenticated

## 🚀 Production Deployment

### 1. **Update Email Templates**
Modify the email templates to use your iOS app's URL scheme instead of web URLs.

### 2. **Configure Production URLs**
Update the base URL in your iOS app to point to your production server.

### 3. **Test End-to-End**
- Test email delivery
- Test deep link handling
- Test token verification
- Test error handling

## 🔒 Security Considerations

- ✅ Tokens are cryptographically secure
- ✅ Rate limiting prevents abuse
- ✅ Tokens expire automatically
- ✅ One-time use for magic links
- ✅ HTTPS enforcement in production

## 📊 Monitoring

The system includes comprehensive logging for:
- Rate limit violations
- Failed authentication attempts
- Successful authentications
- Suspicious activity

Your iOS app is now ready to integrate with the authentication system! The API endpoints are production-ready and can handle thousands of concurrent users.
