import type { OptionKey, Question } from "../types/question";

interface OptionListProps {
  question: Question;
  selectedOptions: OptionKey[];
  submitted: boolean;
  onChange: (options: OptionKey[]) => void;
}

export default function OptionList({ question, selectedOptions, submitted, onChange }: OptionListProps) {
  const optionEntries = Object.entries(question.options) as Array<[OptionKey, string]>;

  function handleOptionClick(optionKey: OptionKey): void {
    if (submitted) {
      return;
    }

    if (question.type === "single") {
      onChange([optionKey]);
      return;
    }

    const nextOptions = selectedOptions.includes(optionKey)
      ? selectedOptions.filter((selectedOption) => selectedOption !== optionKey)
      : [...selectedOptions, optionKey];

    onChange(nextOptions);
  }

  return (
    <div className="option-list">
      {optionEntries.map(([optionKey, optionText]) => {
        const selected = selectedOptions.includes(optionKey);
        const correct = question.answer.includes(optionKey);
        const wrongSelected = submitted && selected && !correct;
        const optionClassName = [
          "option-item",
          selected ? "selected" : "",
          submitted && correct ? "correct" : "",
          wrongSelected ? "wrong" : ""
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <button
            className={optionClassName}
            type="button"
            key={optionKey}
            disabled={submitted}
            onClick={() => handleOptionClick(optionKey)}
          >
            <span className="option-key">{optionKey}</span>
            <span>{optionText}</span>
          </button>
        );
      })}
    </div>
  );
}
