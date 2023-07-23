import { SnackbarProvider } from "notistack";
import UsersDetailsCard from "./components/UsersDetailsCard";
import "./style.css";

export default function App() {
  return (
    <SnackbarProvider>
      <UsersDetailsCard />
    </SnackbarProvider>
  );
}
