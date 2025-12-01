// i18n
import "@locales/i18n";

// Redux store
import GlobalLoading from "@/components/global-loading";
import { store } from "@store";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReduxProvider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TOAST_POSITION, TOAST_TIMEOUT } from "./configs/common";
import { queryClient } from "./queryClient";
import Router from "./routes";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <Router />
        <GlobalLoading />
        <ToastContainer
          position={TOAST_POSITION}
          autoClose={TOAST_TIMEOUT}
          icon={({ type }) => {
            switch (type) {
              default:
                return null;
            }
          }}
        />
      </ReduxProvider>
    </QueryClientProvider>
  );
}

export default App;
