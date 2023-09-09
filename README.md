# Redux Epic Middleware

A Redux middleware for handling side effects based on dispatched actions.

[View redux-epic-middleware on npm](https://www.npmjs.com/package/redux-epic-middleware)

## Overview

The Redux Epic Middleware allows you to define "epic functions" that react to dispatched actions and potentially carry out side effects. This provides an elegant way to manage asynchronous operations, logging, data fetching, and more based on the actions dispatched to the Redux store.

## Execution order

- **Important**: Epics run after the Redux reducer has executed, ensuring that the state within the epics is always up-to-date after all reducers have processed the action.

- It's safe to dispatch additional store actions directly from your epics.

- If you're using asynchronous functions as epics (e.g., for fetching data), you can use the await keyword and then dispatch further Redux actions after the async operations are completed.

## Installation

```bash
npm install redux-epic-middleware
```

## Usage

#### Define your epics:

```
const userEpics = {
    FETCH_USER: async (state, payload, dispatch) => {
      try {
        const response = await fetch(`https://api.example.com/user/${payload.id}`);
        const user = await response.json();

        dispatch({ type: 'FETCH_USER_SUCCESS', payload: user });
      } catch (error) {
        dispatch({ type: 'FETCH_USER_FAILURE', payload: error });
      }
    }

    FETCH_USER_FAILURE: (state, payload) => {
      // Send some analytics from event...
    }
};
```

#### Add the middleware to your store:

```
import {createEpicMiddleware} from 'redux-epic-middleware';

const epicMiddleware = createEpicMiddleware(userEpics);
const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
```

#### Dispatch actions as you normally would. The corresponding epics will be triggered:

```
store.dispatch({ type: 'FETCH_USER', payload: { id: 123 } });
```
