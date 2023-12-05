import { createContext } from 'react';
import { INotification } from './types';

export interface IAppContext {
  notification: INotification;
  setNotification: React.Dispatch<React.SetStateAction<INotification>>;
}

const AppContext = createContext<IAppContext>({
  notification: { type: "", message: "" },
  setNotification: () => {}
});

export default AppContext;