import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div className="bg-gradient-to-r from-violet-200 to-pink-200" style={{ flex: 1 }}>
        <Navbar />
        <div className="mt-7">{children}</div>
      </div>
      <div className="bg-gradient-to-r from-blue-200 to-cyan-200">
        <Footer />
      </div>
    </div>
  );
}
