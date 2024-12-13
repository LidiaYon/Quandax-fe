import React, { useState } from 'react';
import { generateQuestionId } from '../../../utils/idGenerators';
import { IAssignmentQuestion } from '../../../interfaces/IAssignment';
import { QuestionType } from '../../../types/common.types';



interface SingleChoiceQuestionProps {
  onQuestionCreate: (question: IAssignmentQuestion) => void;
}

const OpenEndedQuestionCreator: React.FC<SingleChoiceQuestionProps> = ({ onQuestionCreate }) => {
  const [questionText, setQuestionText] = useState('');
  const [points, setPoints] = useState(1);

  const handleSubmit = () => {
    // Validation
    if (!questionText) {
      alert('Please enter a question');
      return;
    }


    // Create the question object matching IAssignmentQuestion interface
    const newQuestion: IAssignmentQuestion = {
      questionId: generateQuestionId(),
      questionText,
      questionType: QuestionType.ESSAY,
      points,
      options: [],
      correctAnswer: undefined
    };

    onQuestionCreate(newQuestion);

    // Reset form
    setQuestionText('');
    setPoints(1);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create Open Ended Question</h2>

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

export default OpenEndedQuestionCreator;