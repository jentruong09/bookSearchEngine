import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Switch

import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        {/* <Switch>
          <Route exact path = '/' component={SearchBooks}/>
          <Route exact path = '/saved' component={SavedBooks}/>
          <Route render = {() => <h1 className='message'> Wrong Page/Route! </h1>} />
        </Switch> */}
        <Routes>
          <Route 
            path='/' 
            element={<SearchBooks />} 
          />
          <Route 
            path='/saved' 
            element={<SavedBooks />} 
          />
          <Route 
            path='*'
            element={<h1 className='display-2'>Wrong page!</h1>}
          />
        </Routes>
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;
