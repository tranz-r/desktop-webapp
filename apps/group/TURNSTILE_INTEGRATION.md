# Cloudflare Turnstile Integration

This document describes the Cloudflare Turnstile integration implemented for the contact form to prevent bot submissions and spam.

## Overview

The integration follows Cloudflare's recommended approach using:
- **Implicit rendering** on the frontend
- **Server-side validation** on the backend
- **Environment-based configuration** for security

## Frontend Implementation

### Files Modified
- `src/app/contact/page.tsx` - Added Turnstile widget to contact form
- `src/types/turnstile.d.ts` - TypeScript declarations for Turnstile API
- `next.config.js` - Added environment variable configuration

### Key Features
- **Implicit Rendering**: Widget automatically renders when page loads
- **Form Validation**: Submit button disabled until Turnstile completes
- **Error Handling**: Proper error states and user feedback
- **Token Management**: Automatic token refresh and cleanup

### Environment Variables
```bash
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key_here
```

## Backend Implementation

### Files Created/Modified
- `TranzrMoves.Domain/Interfaces/ITurnstileService.cs` - Service interface
- `TranzrMoves.Infrastructure/Services/TurnstileService.cs` - Service implementation
- `SendContactFormCommandHandler.cs` - Added Turnstile validation
- `DependencyInjection.cs` - Registered Turnstile service

### Key Features
- **Token Validation**: Validates tokens with Cloudflare's Siteverify API
- **Error Handling**: Comprehensive error logging and user feedback
- **Security**: Secret key stored in environment variables
- **Performance**: Async/await pattern with proper cancellation support

### Environment Variables
```bash
TURNSTILE_SECRET_KEY=your_secret_key_here
```

## Configuration

### Testing Keys
For development/testing, use Cloudflare's test keys:
- **Site Key**: `1x00000000000000000000AA`
- **Secret Key**: `1x0000000000000000000000000000000AA`

### Production Keys
1. Create a Turnstile site in Cloudflare Dashboard
2. Configure domain restrictions
3. Set appropriate security levels
4. Update environment variables with production keys

## Security Considerations

1. **Secret Key Protection**: Never expose secret key in frontend code
2. **Domain Validation**: Configure proper domain restrictions in Cloudflare
3. **Rate Limiting**: Consider implementing additional rate limiting
4. **Token Expiry**: Tokens expire after 5 minutes
5. **Single Use**: Each token can only be validated once

## Testing

### Manual Testing
1. Load the contact page
2. Verify Turnstile widget appears
3. Complete the challenge
4. Submit the form
5. Check backend logs for validation success

### Automated Testing
- Unit tests for `TurnstileService`
- Integration tests for contact form submission
- Error handling tests for various failure scenarios

## Troubleshooting

### Common Issues
1. **Widget not appearing**: Check site key configuration
2. **Validation failing**: Verify secret key and network connectivity
3. **TypeScript errors**: Ensure type declarations are imported
4. **CORS issues**: Verify domain configuration in Cloudflare

### Debug Steps
1. Check browser console for JavaScript errors
2. Verify environment variables are loaded
3. Check network tab for API calls
4. Review backend logs for validation errors

## References

- [Cloudflare Turnstile Documentation](https://developers.cloudflare.com/turnstile/)
- [Client-side Rendering Guide](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/)
- [Server-side Validation Guide](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)
