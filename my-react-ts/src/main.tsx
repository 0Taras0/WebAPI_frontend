import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Provider} from "react-redux";
import {store} from "./store";
import {ThemeProvider} from "./context/ThemeContext.tsx";
import {AppWrapper} from "./components/common/PageMeta.tsx";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {APP_ENV} from "./env";

createRoot(document.getElementById('root')!).render(
    <>
        <ThemeProvider>
            <AppWrapper>
                <Provider store={store}>
                    <GoogleOAuthProvider
                        clientId={`${APP_ENV.APP_GOOGLE_AUTH}`}>
                        <App/>
                    </GoogleOAuthProvider>
                </Provider>
            </AppWrapper>
        </ThemeProvider>
    </>
)