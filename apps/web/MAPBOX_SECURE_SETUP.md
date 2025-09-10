# Secure Mapbox Integration - Setup Guide

## Overview
This implementation provides a secure Mapbox integration where the sensitive Mapbox API key is kept on the backend, while the frontend only uses a public token for map display.

## Security Benefits
- ✅ **API Key Protection**: Mapbox API key is never exposed to the client
- ✅ **Rate Limiting**: Backend can implement rate limiting and usage controls
- ✅ **Request Validation**: Backend validates and sanitizes all requests
- ✅ **Audit Logging**: All map requests are logged on the backend
- ✅ **Cost Control**: Backend can monitor and control API usage

## Architecture

### Backend (.NET)
- **MapController**: New API endpoint `/api/v1/map/route`
- **Extended MapBoxService**: Handles geocoding and route calculation
- **Secure Configuration**: Mapbox token stored in backend environment variables

### Frontend (React)
- **MapboxMap Component**: Displays map and route using backend data
- **Public Token**: Only uses public Mapbox token for map rendering
- **Backend Integration**: Fetches route data from secure backend API

## Setup Instructions

### 1. Backend Configuration

#### Add Environment Variable
Add to your backend environment variables:
```bash
MAPBOX_TOKEN=your_mapbox_secret_token_here
```

#### Existing Infrastructure
The implementation leverages your existing MapBox service infrastructure:
- ✅ `IMapBoxService` interface (extended)
- ✅ `MapBoxService` implementation (extended)
- ✅ HTTP client configuration in `Program.cs`
- ✅ Existing distance endpoint `/api/v1/address/distance`

### 2. Frontend Configuration

#### Install Mapbox GL JS
```bash
npm install mapbox-gl @types/mapbox-gl
```

#### Add Public Token
Create `.env.local` in `desktop-webapp/apps/web/`:
```bash
# Public Mapbox token for map display only
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_public_token_here
```

### 3. Files Created/Modified

#### Backend Files:
- ✅ `Src/TranzrMoves.Api/Dtos/MapRouteDto.cs` - Route data transfer objects
- ✅ `Src/TranzrMoves.Api/Controllers/MapController.cs` - New map API controller
- ✅ `Src/TranzrMoves.Domain/Interfaces/IMapBoxService.cs` - Extended interface
- ✅ `Src/TranzrMoves.Infrastructure/Services/MapBoxService.cs` - Extended service

#### Frontend Files:
- ✅ `src/components/MapboxMap.tsx` - Secure map component
- ✅ `src/app/collection-delivery/page.tsx` - Updated to use secure map

### 4. API Endpoints

#### New Endpoint
```
GET /api/v1/map/route?originAddress={address}&destinationAddress={address}
```

**Response:**
```json
{
  "coordinates": [
    { "longitude": -0.1276, "latitude": 51.5074 },
    { "longitude": -0.1280, "latitude": 51.5078 }
  ],
  "distanceMiles": 2.5,
  "durationMinutes": 15.2,
  "origin": {
    "longitude": -0.1276,
    "latitude": 51.5074,
    "address": "123 Main St, London SW1A 1AA, UK"
  },
  "destination": {
    "longitude": -0.1280,
    "latitude": 51.5078,
    "address": "456 High St, London SW1A 2BB, UK"
  }
}
```

## Security Features

### 1. Token Separation
- **Backend**: Uses secret token for API calls (geocoding, routing)
- **Frontend**: Uses public token only for map display

### 2. Request Validation
- Backend validates all input addresses
- Sanitizes and encodes addresses before API calls
- Returns only necessary data to frontend

### 3. Error Handling
- Comprehensive error handling on both backend and frontend
- Graceful fallbacks for failed requests
- User-friendly error messages

### 4. Rate Limiting Ready
- Backend can easily add rate limiting middleware
- Request logging for monitoring and analytics
- Cost control and usage tracking

## Usage

### Frontend Integration
```typescript
// The MapboxMap component automatically:
// 1. Fetches route data from backend
// 2. Displays interactive map
// 3. Shows route line and markers
// 4. Displays distance and duration

<MapboxMap 
  originAddress="123 Main St, London SW1A 1AA"
  destinationAddress="456 High St, London SW1A 2BB"
  className="w-full"
/>
```

### Backend API Call
```csharp
// The MapController automatically:
// 1. Validates input addresses
// 2. Geocodes addresses using Mapbox API
// 3. Calculates route with full geometry
// 4. Returns structured route data
```

## Testing

### 1. Backend Testing
Test the new endpoint:
```bash
curl "http://localhost:5000/api/v1/map/route?originAddress=123%20Main%20St%2C%20London%20SW1A%201AA&destinationAddress=456%20High%20St%2C%20London%20SW1A%202BB"
```

### 2. Frontend Testing
1. Navigate to `/collection-delivery` page
2. Enter pickup and delivery addresses
3. Verify map appears with route line
4. Check distance and duration display

### 3. Integration Testing
1. Start backend API
2. Start frontend application
3. Complete address form
4. Verify map loads with route
5. Check browser network tab for backend API calls

## Troubleshooting

### Map Not Loading
- Check `NEXT_PUBLIC_MAPBOX_TOKEN` is set correctly
- Verify the token has map display permissions
- Check browser console for errors

### Route Not Loading
- Check `MAPBOX_TOKEN` is set in backend environment
- Verify backend API is running and accessible
- Check backend logs for API errors

### Addresses Not Found
- Ensure addresses are in UK format
- Check that addresses exist in Mapbox database
- Verify backend geocoding is working

## Cost Optimization

### Backend Controls
- Implement caching for repeated routes
- Add request rate limiting
- Monitor API usage and costs
- Implement request validation

### Frontend Optimization
- Only fetch route when both addresses are complete
- Debounce address changes to prevent excessive requests
- Cache route data in component state

## Migration from Client-Side

If you have an existing client-side Mapbox implementation:

1. **Remove client-side API calls** to Mapbox geocoding/directions
2. **Replace with backend API calls** to your new `/api/v1/map/route` endpoint
3. **Keep public token** for map display only
4. **Update error handling** to work with backend responses

## Environment Variables Summary

### Backend (.NET)
```bash
MAPBOX_TOKEN=your_mapbox_secret_token_here
```

### Frontend (Next.js)
```bash
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_public_token_here
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

This approach provides enterprise-grade security while maintaining the same user experience.
