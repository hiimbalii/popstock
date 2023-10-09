import React from "react";
import "./App.css";
import Wallet from "./partial/wallet";
import Portfolio from "./partial/portfolio";
import Marketplace from "./partial/markteplace";
import getAuthToken from "./AppRoot/auth_client";
import AuthProvider from "./providers/authProvider";

function App() {
  return (
    <AuthProvider>
      <div className="bg-gray-600 w-full h-screen flex px-20">
        <div className="w-96 m-4 flex flex-col gap-2">
          <Portfolio />
          <Wallet />
        </div>
        <div className="flex-grow m-4 h-full">
          <Marketplace />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
