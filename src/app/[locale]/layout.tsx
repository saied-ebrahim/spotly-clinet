import type { Metadata } from "next";
import Script from "next/script";

import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import HomeApp from "@/components/Global/HomeApp";
import ProgressBar from "@/components/Global/ProgressBar";
import "react-phone-number-input/style.css";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";

export const metadata: Metadata = {
  title: "Spotly",
  description: "Spotly is a platform for creating and managing events. "
  ,

  
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <head>
        <Script
          id="chatbase-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                if(!window.chatbase||window.chatbase("getState")!=="initialized"){
                  window.chatbase=(...arguments)=>{
                    if(!window.chatbase.q){
                      window.chatbase.q=[]
                    }
                    window.chatbase.q.push(arguments)
                  };
                  window.chatbase=new Proxy(window.chatbase,{
                    get(target,prop){
                      if(prop==="q"){
                        return target.q
                      }
                      return(...args)=>target(prop,...args)
                    }
                  })
                }
                const onLoad=function(){
                  const script=document.createElement("script");
                  script.src="https://www.chatbase.co/embed.min.js";
                  script.id="vIK05EAL23YpcJuEvr6Ht";
                  script.domain="www.chatbase.co";
                  document.body.appendChild(script)
                };
                if(document.readyState==="complete"){
                  onLoad()
                }else{
                  window.addEventListener("load",onLoad)
                }
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <ProgressBar />
        <ToastContainer
          position={locale === "ar" ? "top-left" : "top-right"}
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={locale === "ar"}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <NextIntlClientProvider>
          <HomeApp>{children}</HomeApp>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
