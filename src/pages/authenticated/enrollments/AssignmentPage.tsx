import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/common/Button";
import { ActionBar } from "../components/ActionBar";
import MainLayout from "../MainLayout";
import { useEffect, useState } from "react";
import { IAssignment, IAssignmentQuestion, IAssignmentSubmission, IAssignmentSubmissionResult, QuestionType } from "@lidiayon/sharedlibs";
import ServiceAssignment from "../../../services/ServiceAssignment";
import { showToast } from "../../../components/common/Toaster";
import { formatDate } from "../../../utils/common.utils";
import { useAppSelector } from "../../../store/hooks/hooks";
import TextArea from "../../../components/common/TextArea";
import AssignmentResultComponent from "../components/AssignmentResultComponent";
import FullScreenLoader from "../../../components/common/FullScreenLoader";



const AssignmentPage = () => {
    const user = useAppSelector((state) => state.user.user);

    const navigate = useNavigate();
    const { courseId, courseName, assignmentId } = useParams();
    const [assignment, setAssignment] = useState<IAssignment | undefined>(undefined)
    const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [submissionResult, setSubmissionResult] = useState<IAssignmentSubmissionResult | undefined>(undefined)

    useEffect(() => {
        if (courseId && assignmentId) {
            setIsLoading(true)
            ServiceAssignment.getCourseAssignment(courseId, assignmentId)
                .then(data => {
                    setAssignment(data)
                    setIsLoading(false)
                }).catch(error => {
                    setIsLoading(false)
                    showToast({
                        type: "error",
                        message: "Error loading assignments",
                        error
                    })
                })
        }


    }, [courseId, courseName, assignmentId])


    if (!assignment) return <FullScreenLoader message="Loading Assignment"/>

    const handleAnswerChange = (questionId: string, answer: string) => {
        setUserAnswers(prev => ({
          ...prev,
          [questionId]: answer
        }));
      };
    
      const handleSubmit = async () => {
        if (!assignment) return;
    
        const unansweredQuestions = assignment.questions.filter(
          q => !userAnswers[q.questionId]
        );
    
        if (unansweredQuestions.length > 0) {
          showToast({
            type: "error",
            message: `Please answer all ${unansweredQuestions.length} questions before submitting`
          });
          return;
        }
    
        // Prepare submission object
        const submission: IAssignmentSubmission = {
          user: user?._id!,
          assignment: assignment._id,
          answers: assignment.questions.map(q => ({
            questionId: q.questionId,
            userAnswer: userAnswers[q.questionId]
          }))
        };

        try {
            setIsLoading(true)
            const result = await ServiceAssignment.submitAssignment(submission)
            setSubmissionResult(result)
            setIsLoading(false)
        } catch (error) {
            setSubmissionResult(undefined)
            setIsLoading(false)
        }
      };
    

    const renderQuestionInput = (question: IAssignmentQuestion) => {
        switch (question.questionType) {
          case QuestionType.ESSAY:
            return (
                <TextArea 
                key={question.questionId} 
                placeholder="Enter your answer"
                value={userAnswers[question.questionId] || ''}
                required
                onChange={(e) => handleAnswerChange(question.questionId, e)}
                />

           
            );
          
          case QuestionType.SINGLE_CHOICE:
            return (
              <div key={question.questionId} className="space-y-2">
                {question.options?.map((option) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      id={`${question.questionId}-${option.value}`}
                      name={question.questionId}
                      value={option.value}
                      checked={userAnswers[question.questionId] === option.value}
                      onChange={() => handleAnswerChange(question.questionId, option.value)}
                      className="mr-2"
                    />
                    <label htmlFor={`${question.questionId}-${option.value}`}>
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            );
          
          default:
            return null;
        }
      };

    return (
        <MainLayout title={`${courseName} Assignment Submission`}>
      <div className="space-y-4 pt-16 max-w-2xl mx-auto">
        <ActionBar>
          <Button variant="outline" onClick={() => navigate(`/enrollments`)}>
            Back to My Courses
          </Button>
        </ActionBar>

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-4">{assignment.title}</h2>
          <div className="mb-4">
            <p><strong>Total Points:</strong> {assignment.totalPoints}</p>
            <p><strong>Due Date:</strong> {formatDate(assignment.dueDate)}</p>
          </div>

          <div className="space-y-6">
            {assignment.questions.map((question, index) => (
              <div key={question.questionId} className="mb-4">
                <h3 className="font-semibold mb-2">
                  Question {index + 1} ({question.points} points)
                </h3>
                <p className="mb-3">{question.questionText}</p>
                {renderQuestionInput(question)}
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Button 
              disabled={isLoading}
              isLoading={isLoading}
              onClick={handleSubmit}
              className="w-full"
            >
              Submit Assignment
            </Button>
          </div>
          {!isLoading && submissionResult && (
            <div className="mt-10">
            <AssignmentResultComponent result={submissionResult} />
          </div>
          )}
          
        </div>
      </div>
    </MainLayout>
    );
};

export default AssignmentPage;