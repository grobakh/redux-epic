import { Middleware, Dispatch } from "redux";

type TEpicFunction<TStore> = (
  state: TStore,
  payload: any,
  dispatch: Dispatch
) => void;

export function createEpicMiddleware<TStore>(
  epics: Record<string, TEpicFunction<TStore>>
): Middleware {
  const runEpic = (
    state: TStore,
    action: { type: string; payload: any },
    dispatch: Dispatch
  ) => {
    for (const [epicActionType, epicFunction] of Object.entries(epics)) {
      if (action.type === epicActionType) {
        epicFunction(state, action.payload, dispatch);
      }
    }
  };

  return (store) => (next) => (action) => {
    next(action);
    runEpic(store.getState(), action, store.dispatch);
  };
}
