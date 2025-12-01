import { APP_ENV } from "@configs/env";
import { register } from "register-service-worker";

function checkServiceWorker() {
  console.log("APP_ENV", APP_ENV);

  // Check if the service worker is available in the browser and if the app is not in development mode
  if (APP_ENV !== "development" && "serviceWorker" in navigator) {
    register("/service-worker.js", {
      registrationOptions: { scope: "./" },
      ready() {
        console.log(
          "App is being served from cache by a service worker.\n" +
            "For more details, visit https://goo.gl/AFskqB"
        );
      },
      registered() {
        console.log("Service worker has been registered.");
      },
      cached() {
        console.log("Content has been cached for offline use.");
      },
      updatefound() {
        console.log("New content is downloading.");
      },
      updated() {
        console.log("New content is available; please refresh.");
      },
      offline() {
        console.log("No internet connection found. App is running in offline mode.");
      },
      error(error) {
        console.error("Error during service worker registration:", error);
      },
    });
  }
}

checkServiceWorker();
