'use client'
import Head from "next/head";

export default function MainLayout({ children }) {
    return (
        <section>
            <Head>
                <title>Employee with MongoDB</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="container mx-auto">
                <h1 className="text-center text-3xl text-stone-700">Employee Management</h1>
                {children}
            </main>
        </section>
    )
}