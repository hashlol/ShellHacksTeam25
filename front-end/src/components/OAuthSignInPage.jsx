import * as React from "react";
import { AppProvider, SignInPage } from "@toolpad/core";
import { useTheme } from "@mui/material/styles";

// OAuth providers available for sign-in
const providers = [{ id: "google", name: "Google" }];

// Sign-in function for handling OAuth sign-in requests
// const signIn = async (provider: AuthProvider) => {
//   const promise = new Promise<void>((resolve) => {
//     setTimeout(() => {
//       console.log(`Sign in with ${provider.id}`);
//       resolve();
//     }, 500); // Simulates a network delay
//   });
//   return promise;
// };

// Main component for the OAuth Sign-In page
const OAuthSignInPage = () => {
  const theme = useTheme(); // Retrieves the current theme from MUI
  return (
    <AppProvider theme={theme}>
      <SignInPage signIn={signIn} providers={providers} />
    </AppProvider>
  );
};

export default OAuthSignInPage;
