import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";

export default function RootLayout({ children }) {
  
    return (
        <main className="relative min-h-screen pb-36">
            <Navbar />
            {children}
            <Footer />
        </main>
    );
}