import {  useContext } from "react";
import FeedbackItem from "./FeedbackItem";
import Spinner from "./Spinner";
import { FeedbackContext } from "../lib/FeedbackContext";

const FeedbackList = () => {
  const { feedbackItems, loading } = useContext(FeedbackContext) || {};

  

  return <ol className="feedback-list">

    {
      loading? <Spinner /> : null
    }

    {
      feedbackItems?.map((feedbackItem) => (<FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />))
    }
 
  </ol>;
};

export default FeedbackList;
