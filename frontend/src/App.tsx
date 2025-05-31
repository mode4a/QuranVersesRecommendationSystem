import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import VerseRecommender from "./components/VerseRecommender";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col font-primary bg-slate-900">
      <Header />
      <main className="flex-grow container mx-auto">
        <VerseRecommender />
      </main>
      <Footer />
      <ToastContainer position="bottom-right" theme="dark" />
    </div>
  );
}

export default App;
