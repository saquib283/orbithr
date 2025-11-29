import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// --- STEP 1: Define the RENDER Backend URI ---
const RENDER_BACKEND_URI = 'https://orbithr.onrender.com/graphql';

// 1. HTTP Link: Connects to your Backend
const httpLink = createHttpLink({
  uri: RENDER_BACKEND_URI,
});

// 2. Auth Link: Injects the token into headers (from localStorage)
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('orbit_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

// Trigger Deploy

// 3. Initialize Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);