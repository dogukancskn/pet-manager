import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";

import './index.css'
import App from './App.jsx'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { PetProvider } from './context/PetContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { VaccinationProvider } from './context/VaccinationContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

      <AuthProvider>

        <PetProvider>

          <VaccinationProvider>

            <App />

          </VaccinationProvider>

        </PetProvider>

      </AuthProvider>

    </BrowserRouter>
  </StrictMode>,
)