import { MantineProvider } from "@mantine/core";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <h1>Loan Management System</h1>
      <Outlet />
    </MantineProvider>
  );
};

export default App;
