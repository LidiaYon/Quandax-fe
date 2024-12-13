import React, { useState } from 'react';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { generateQuestionId } from '../../../utils/idGenerators';
import { IAssignmentQuestion, IChoiceQuestionOptions } from '../../../interfaces/IAssignment';
import { QuestionType } from '../../../types/common.types';

interface SingleChoiceQuestionProps {
  onQuestionCreate: (question: IAssignmentQuestion) => void;
}

const SingleChoiceQuestionCreator: React.FC<SingleChoiceQuestionProps> = ({ onQuestionCreate }) => {
  const [questionText, setQuestionText] = useState('');
  const [points, setPoints] = useState(1);
  const [options, setOptions] = useState<IChoiceQuestionOptions[]>([
    { value: '', label: '' },
    { value: '', label: '' }
  ]);
  const [correctAnswer, setCorrectAnswer] = useState<string | undefined>(undefined);

  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, { value: '', label: '' }]);
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = { value, label: value };
    setOptions(newOptions);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
      
      // Reset correct answer if the current correct answer is removed
      if (correctAnswer === options[index].value) {
        setCorrectAnswer(undefined);
      }
    }
  };

  const handleSubmit = () => {
    // Validation
    if (!questionText) {
      alert('Please enter a question');
      return;
    }

    if (options.some(opt => !opt.value)) {
      alert('All options must have a value');
      return;
    }

    if (!correctAnswer) {
      alert('Please select a correct answer');
      return;
    }

    // Create the question object matching IAssignmentQuestion interface
    const newQuestion: IAssignmentQuestion = {
      questionId: generateQuestionId(),
      questionText,
      questionType: QuestionType.SINGLE_CHOICE,
      points,
      options,
      correctAnswer
    };

    onQuestionCreate(newQuestion);

    // Reset form
    setQuestionText('');
    setPoints(1);
    setOptions([
      { value: '', label: '' },
      { value: '', label: '' }
    ]);
    setCorrectAnswer(undefined);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create Single Choice Question</h2>

      {/* Question Text */}
      <input 
        type="text"
        placeholder="Question Text"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        className="w-full px-3 py-2 border rounded mb-3"
      />

      {/* Points */}
      <div className="mb-3">
        <label className="block mb-1">Points</label>
        <input 
          type="number"
          min="1"
          value={points}
          onChange={(e) => setPoints(Number(e.target.value))}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      {/* Options */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-2">
          <label>Options</label>
          {options.length < 4 && (
            <button 
              onClick={addOption}
              className="text-green-500 hover:bg-green-100 p-1 rounded"
            >
              <PlusIcon size={20} />
            </button>
          )}
        </div>

        {options.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option.value}
              onChange={(e) => updateOption(index, e.target.value)}
              className="flex-grow px-3 py-2 border rounded mr-2"
            />
            <input 
              type="radio"
              name="correct-answer"
              checked={correctAnswer === option.value}
              onChange={() => setCorrectAnswer(option.value)}
              className="mr-2"
            />
            {options.length > 2 && (
              <button 
                onClick={() => removeOption(index)}
                className="text-red-500 hover:bg-red-100 p-1 rounded"
              >
                <TrashIcon size={20} />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button 
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Create Question
      </button>
    </div>
  );
};

export default SingleChoiceQuestionCreator;