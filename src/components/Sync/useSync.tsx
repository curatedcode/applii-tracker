import { useContext } from "react";
import { SyncContext } from "./SyncProvider";

const useSync = () => useContext(SyncContext);

export default useSync;
