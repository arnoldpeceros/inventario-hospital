import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({
      projectId: "inventario-hospital-arnold",
      appId: "1:486280479526:web:823cc1fe5759905a2137e7",
      storageBucket: "inventario-hospital-arnold.firebasestorage.app",
      apiKey: "AIzaSyAxVMMNlBDUXR9_6pqCeBeJgYfBTNefqSY",
      authDomain: "inventario-hospital-arnold.firebaseapp.com",
      messagingSenderId: "486280479526"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
};