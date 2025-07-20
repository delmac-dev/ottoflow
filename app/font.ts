import localFont from 'next/font/local';

export const openSans = localFont({
  src: [
    {
      path: "./(fonts)/OpenSans-Light.ttf",
      weight: "300"
    },
    {
      path: "./(fonts)/OpenSans-Regular.ttf",
      weight: "400"
    },
    {
      path: "./(fonts)/OpenSans-Medium.ttf",
      weight: "500"
    },
    {
      path: "./(fonts)/OpenSans-SemiBold.ttf",
      weight: "600"
    },
    {
      path: "./(fonts)/OpenSans-Bold.ttf",
      weight: "700"
    },
    {
      path: "./(fonts)/OpenSans-ExtraBold.ttf",
      weight: "800"
    },
  ],
  variable: "--font-open-sans"
});
