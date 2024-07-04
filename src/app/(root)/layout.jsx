import Navbar from "@/components/navbar/Navbar";

export default function RootLayout({ children }) {
  
    return (
        <main>
            <Navbar />
            {children}
        </main>
    );
}