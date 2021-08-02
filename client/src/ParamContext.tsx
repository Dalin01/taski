import { createContext } from 'react';

const ParamContext = createContext({});
export const ParamProvider = ParamContext.Provider;
export default ParamContext;
