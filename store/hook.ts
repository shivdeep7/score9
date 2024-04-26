import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./store";

export const AppUseDispatch = () => useDispatch<AppDispatch>();
export const AppUseSelector: TypedUseSelectorHook<RootState> = useSelector;