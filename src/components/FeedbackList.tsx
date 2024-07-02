import { useContext } from "react";
import { FeedbackContext } from "../lib/FeedbackContext";
import FeedbackItem from "./FeedbackItem";
import Spinner from "./Spinner";

const FeedbackList = () => {
  const {
    loading,
    filteredFeedbackItems,
    selectedCompany,
    setSelectedCompany,
  } = useContext(FeedbackContext)!;

  return (
    <ol className="feedback-list">
      {loading ? <Spinner /> : null}

      {filteredFeedbackItems?.map((feedbackItem) => (
        <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
      ))}

      {selectedCompany ? (
        <button className="button" onClick={() => setSelectedCompany("")}>
          Clear
        </button>
      ) : null}
    </ol>
  );
};

export default FeedbackList;
