import type { Metadata } from "next";
import { Poppins, Epilogue, Literata } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import '@/utils/axios'
import ReduxProvider from "@/store/ReduxProvider";
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

const theme = createTheme({
   fontFamily: "Epilogue",
    primaryColor: 'gray',
    primaryShade: 9
  });


export const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });
export const epilogue = Epilogue({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });
export const literata = Literata({ subsets: ["latin"], weight: ["200", "300", "400", "500", "600", "700", "800", "900"] });

 const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen  text-gray-800 ${poppins.className}`}>
        <ReduxProvider>
          <MantineProvider theme={theme}>
            <Header />

              {children}
          </MantineProvider>
          
        </ReduxProvider>
      </body>
    </html>
  );
}
