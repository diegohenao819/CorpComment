import { useContext, useState } from "react";
import { FeedbackContext } from "../lib/FeedbackContext";
import { MAX_CHARACTERS } from "../lib/contants";
import { TFeedbackItem } from "../lib/types";

const FeedbackForm = () => {
  const [text, setText] = useState("");
  const [validForm, setValidForm] = useState(false)
  const [invalidForm, setInvalidForm] = useState(false)
  const numberCharacters = MAX_CHARACTERS - text.length;
  const { feedbackItems, setFeedbackItems } = useContext(FeedbackContext)!;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) {
      return;
    }


    if(text.includes("#") && text.length > 5) {
      setValidForm(true)

      setTimeout(() => setValidForm(false), 5000)

    }else{
      setInvalidForm(true)
      setTimeout(() => setInvalidForm(false), 5000)
      return
    }


    const company = text.match(/#\w+/)?.[0].slice(1);
    const firstLetter = company?.charAt(0).toUpperCase();

    const newFeedbackItem: TFeedbackItem = {
      id: new Date().getTime(),
      upvoteCount: 0,
      badgeLetter: firstLetter!,
      company: company!,
      text: text,
      daysAgo: 0,
    };
    setFeedbackItems([newFeedbackItem, ...feedbackItems]);
    setText("");

    fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFeedbackItem),
      }
    );
  };

  return (
    <form className={`form ${validForm ? "form--valid" : ""} ${invalidForm ? "form--invalid" : ""}`}
    
    onSubmit={(e) => handleSubmit(e)}>
      <textarea
        id="feedback-textarea"
        placeholder="asdf"
        spellCheck="false"
        maxLength={150}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag the company.
      </label>

      <div>
        <p className="u-italic">{numberCharacters}</p>

        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;
