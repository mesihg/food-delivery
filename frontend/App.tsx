import 'react-native-gesture-handler';
import React from 'react';
import {QueryClientProvider, QueryClient} from 'react-query';
import {AuthProvider} from './src/contexts/AuthContext';
import Route from './src/navigation/Route';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 30000,
    },
  },
});
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Route />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
