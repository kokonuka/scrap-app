const config = {
  Auth: {
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    userPoolId: process.env.NEXT_PUBLIC_AWS_USERPOOLID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_AWS_USERPOOLWEBCLIENTID,
    identityPoolId: process.env.NEXT_PUBLIC_AWS_IDENTITYPOOLID,
    // oauth: {
    //   domain: "XXXX.auth.us-east-1.amazoncognito.com",
    //   scope: ["openid"],
    //   redirectSignIn: "https://localhost:3000/",
    //   redirectSignOut: "https://localhost:3000/",
    //   responseType: "code",
    // },
  },
};

export default config;
