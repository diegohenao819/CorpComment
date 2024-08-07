// Create context for feedback

import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import { TFeedbackItem } from "./types";

// INTERFACE
interface FeedbackContextType {
  feedbackItems: TFeedbackItem[];
  loading: boolean;
  setFeedbackItems: (feedbackItems: TFeedbackItem[]) => void;
  setSelectedCompany: (company: string | null) => void;
  filteredFeedbackItems: TFeedbackItem[];
  selectedCompany: string | null;
}

// CREATE CONTEXT
export const FeedbackContext = createContext<FeedbackContextType | undefined>(
  undefined
);

// PROVIDER
export const FeedbackProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCompany, setSelectedCompany] = useState<string | null>("");

  const filteredFeedbackItems = useMemo(
    () =>
      selectedCompany
        ? feedbackItems.filter(
            (feedbackItem) => feedbackItem.company === selectedCompany
          )
        : feedbackItems,
    [selectedCompany, feedbackItems]
  );

  useEffect(() => {
    setLoading(true);
    fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
    )
      .then((response) => response.json())
      .then((data) => {
        setFeedbackItems(data.feedbacks);
        setLoading(false);
      });
  }, []);

  return (
    <FeedbackContext.Provider
      value={{
        feedbackItems,
        loading,
        setFeedbackItems,
        selectedCompany,
        setSelectedCompany,
        filteredFeedbackItems,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};
