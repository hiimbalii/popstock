import React from "react";
import "./App.css";
import Wallet from "./inventory/partials/wallet";
import Portfolio from "./components/blocks/portfolio";
import Marketplace from "./components/blocks/markteplace";
import AuthProvider from "./core/providers/authProvider";
import { Provider } from "react-redux";
import { songsStore } from "./shared/stores/songsStore";

function App() {
  return (
    <AuthProvider>
      <Provider store={songsStore}>
        <div className="bg-gray-600 w-full h-screen flex px-20">
          <div className="w-96 m-4 flex flex-col gap-2">
            <Portfolio />
            <Wallet />
          </div>
          <div className="flex-grow m-4 h-full">
            <Marketplace />
          </div>
        </div>
      </Provider>
    </AuthProvider>
  );
}

export default App;
