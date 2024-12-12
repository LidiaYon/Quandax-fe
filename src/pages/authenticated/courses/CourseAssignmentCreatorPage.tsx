import { useEffect, useState } from 'react';

import SingleChoiceQuestionCreator from '../components/SingleChoiceQuestionCreator';
import { IAssignment, QuestionType, IAssignmentQuestion } from '@lidiayon/sharedlibs';
import { useParams } from 'react-router-dom';
import MainLayout from '../MainLayout';
import OpenEndedQuestionCreator from '../components/OpenEndedQuestionCreator';
import TextInput from '../../../components/common/TextInput';
import TextArea from '../../../components/common/TextArea';
import { showToast } from '../../../components/common/Toaster';
import ServiceAssignment from '../../../services/ServiceAssignment';
import FullScreenLoader from '../../../components/common/FullScreenLoader';

const intialState: IAssignment = {
  _id: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  course: "",
  title: '',
  description: '',
  dueDate: new Date(),
  totalPoints: 0,
  questions: []
}

const CourseAssignmentCreatorPage = () => {
  const { courseId, courseName } = useParams();
  const [isLoading, setIsLoading] = useState(false)
  const [assignment, setAssignment] = useState<IAssignment>(intialState);

  const [questionType, setQuestionType] = useState<QuestionType>("SINGLE_CHOICE");

  const addQuestion = (question: IAssignmentQuestion) => {
    setAssignment(prev => ({
      ...prev,
      questions: [...prev.questions, {
        ...question,
        questionType
      }],
      totalPoints: prev.totalPoints + question.points
    }));
  };

  const createAssignment = async () => {
    setIsLoading(true)
    try {

      await ServiceAssignment.createAssignment(assignment)
      setIsLoading(false)

      showToast({
        type: "success",
        message: "Assignment created succesfully"
      })
    } catch (error) {
      setIsLoading(false)

      showToast({
        type: "error",
        message: "Error creating assignment",
        error
      })
    }
  };

  if (!courseId) return <FullScreenLoader />

  useEffect(() => {
    setAssignment(prev => ({
      ...prev,
      course: courseId
    }))
  }, [courseId])

  return (
    <MainLayout title={`Assignemt for ${courseName}`}>
      <div className={`max-w-2xl mx-auto p-4 bg-gray-100 rounded-lg ${isLoading ? "disabled-block" : ""}`}>
        <h1 className="text-2xl font-bold mb-4">Assignment Creator</h1>

        <div className="mb-4 grid grid-cols-2 gap-4">

          <TextInput
            label="Assignment Title"
            type="text"
            placeholder="Assignment Title"
            value={assignment.title}
            onChange={(v) => setAssignment(prev => ({
              ...prev,
              title: v
            }))}
          />

        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">

          <TextInput
            label="Due Date"
            type="date"
            placeholder="Due Date"
            value={assignment.dueDate.toISOString().split('T')[0]}
            onChange={(v) =>
              setAssignment((prev) => ({
                ...prev,
                dueDate: new Date(v),
              }))
            }
          />

        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">

          <TextArea
            label="Description"
            placeholder="Description"
            value={assignment.description || ""}
            onChange={(v) => setAssignment(prev => ({
              ...prev,
              description: v
            }))}
          />

        </div>

        {assignment.questions.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">
              Current Questions (Total Points: {assignment.totalPoints})
            </h2>
            {assignment.questions.map((q, index) => (
              <div key={index} className="bg-white p-3 rounded mb-2">
                <p><strong>Type:</strong> {q.questionType}</p>
                <p><strong>Question:</strong> {q.questionText}</p>
                <p><strong>Points:</strong> {q.points}</p>
              </div>
            ))}
          </div>
        )}

        {assignment.questions.length > 0 && (
          <button
            onClick={createAssignment}
            className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Create Assignment
          </button>
        )}

        {/* Question Type Selector */}
        <div className="mt-4 mb-4 flex space-x-2">
          {([QuestionType.SINGLE_CHOICE] as QuestionType[]).map(type => (
            <button
              key={type}
              onClick={() => setQuestionType(type)}
              className={`px-4 py-2 rounded ${questionType === type
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
                }`}
            >
              {type.replace('_', ' ')}
            </button>
          ))}
        </div>

        {questionType === QuestionType.SINGLE_CHOICE && (
          <SingleChoiceQuestionCreator onQuestionCreate={addQuestion} />
        )}

        {/* not enabled by choice but other question types can be added as necessary. */}
        {questionType === QuestionType.ESSAY && (
          <OpenEndedQuestionCreator onQuestionCreate={addQuestion} />
        )}


      </div>
    </MainLayout>
  );
};

export default CourseAssignmentCreatorPage;