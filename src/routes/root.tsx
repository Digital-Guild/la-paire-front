import { Outlet } from "react-router";
import CommandeModal from "../components/menu/CommandeModal";
import LoadingManager from "../components/menu/LoadingManager";
import QueryProvider from "../hooks/QueryProvider";

function Root() {
  return (
    <QueryProvider>
      <Outlet />
      <CommandeModal />
      <LoadingManager />
    </QueryProvider>
  );
}

export default Root;
