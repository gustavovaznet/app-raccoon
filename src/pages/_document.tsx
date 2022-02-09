//DOCUMENT FILE

import Document, { Html, Head, Main, NextScript } from 'next/document';

//EXPORTING MY DOCUMENT CLASS
export default class MyDocument extends Document{
    render(){
        return(
            //HTML - HEAD PROPERTIES
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&display=swap" rel="stylesheet" />
                    <link rel="shortcut icon" href="/favicon.png" type="image/png" />
                </Head>
                {/*BODY*/}
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
