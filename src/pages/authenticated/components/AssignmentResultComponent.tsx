import React from 'react';
import { IAssignmentSubmissionResult } from "@lidiayon/sharedlibs";
import { X, Award } from 'lucide-react';

interface AssignmentResultProps {
  result: IAssignmentSubmissionResult;
}

const AssignmentResultComponent: React.FC<AssignmentResultProps> = ({ result }) => {
  // Calculate percentage
  const percentage = Math.round((result.finalScore / result.outOf) * 100);

  // Determine performance message
  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Excellent work!";
    if (percentage >= 80) return "Great job!";
    if (percentage >= 70) return "Good effort!";
    if (percentage >= 60) return "Keep practicing!";
    return "You can do better next time!";
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <div className="text-center mb-6">
        <Award className="mx-auto mb-4 text-yellow-500" size={64} />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Assignment Results
        </h1>
        
        <div className="flex justify-center items-center space-x-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-2xl font-semibold text-green-700">
              {result.finalScore} / {result.outOf}
            </p>
            <p className="text-green-600">{percentage}%</p>
          </div>
          
          <div>
            <p className="text-xl font-medium text-gray-700">
              {getPerformanceMessage()}
            </p>
          </div>
        </div>

        {result.totalFlawedQuestions > 0 && (
          <p className="mt-4 text-red-600 font-medium">
            There were {result.totalFlawedQuestions} answers submitted to questions not found in the system.
          </p>
        )}
      </div>

      {result.inCorrectlyAnsweredQuestions.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
            Incorrectly Answered Questions
          </h2>
          
          <div className="space-y-4">
            {result.inCorrectlyAnsweredQuestions.map((question, index) => (
              <div 
                key={question.questionId} 
                className="bg-red-50 p-4 rounded-lg border border-red-200"
              >
                <div className="flex items-start space-x-3">
                  <X className="text-red-500 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Question {index + 1}
                    </h3>
                    <p className="text-gray-700 mb-2">
                      {question.questionText}
                    </p>
                    {question.correctAnswer && (
                      <div className="bg-white p-2 rounded border">
                        <span className="text-green-600 font-medium">
                          Correct Answer: 
                        </span>
                        <span className="ml-2 text-gray-700">
                          {question.correctAnswer}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentResultComponent;