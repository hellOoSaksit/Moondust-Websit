import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar"

export default function Layout({ children }) {
  return (
      
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <div className="bg-gradient-to-r from-violet-200 to-pink-200" style={{ flex: 1 }}>
            <Navbar />
            <Sidebar>{children}</Sidebar>
          </div>
              <div className="bg-gradient-to-r from-blue-200 to-cyan-200">
                <Footer />
              </div>
    </div>
  );
}
