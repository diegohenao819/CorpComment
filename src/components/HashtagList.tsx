import { useContext } from "react";
import { FeedbackContext } from "../lib/FeedbackContext";
import { TFeedbackItem } from "../lib/types";

const HashtagList = () => {
  const { feedbackItems, setSelectedCompany } = useContext(FeedbackContext)!;


  // Companies for hashtag list 
  const companies = feedbackItems
    .map((feedbackItem: TFeedbackItem) => feedbackItem.company)
    .filter(
      (company: string, index: number, companies: string[]) =>
        companies.indexOf(company) === index
    );


  return (
    <ul className="hashtags">
      {companies.map((company: string, index: number) => (
        <li key={index}>
          <button onClick={()=> setSelectedCompany(company)}>#{company}</button>
        </li>
      ))}
    </ul>
  );
};

export default HashtagList;
