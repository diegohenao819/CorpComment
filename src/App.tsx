import Container from "./components/Container";
import Footer from "./components/Footer";
import HashtagList from "./components/HashtagList";
import { FeedbackProvider } from "./lib/FeedbackContext";

function App() {
  return (
    <div className="app">
      <FeedbackProvider>
        <Footer />

        <Container />

        <HashtagList />
      </FeedbackProvider>
    </div>
  );
}

export default App;
