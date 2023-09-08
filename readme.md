# Redux Epic Middleware

A Redux middleware for handling side effects based on dispatched actions.

[View redux-epic-middleware on npm](https://www.npmjs.com/package/redux-epic-middleware)

## Overview

The Redux Epic Middleware allows you to define "epic functions" that react to dispatched actions and potentially carry out side effects. This provides an elegant way to manage asynchronous operations, logging, data fetching, and more based on the actions dispatched to the Redux store.

## Execution order

**Important**: Epics run after the Redux reducer has executed, ensuring that the state within the epics is always up-to-date after all reducers have processed the action.

## Installation

```bash
npm install redux-epic-middleware
```

## Usage

#### Define your epics:

```
const userEpics = {
    FETCH_USER: (state, payload) => {
      // Fetch user logic here...
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
