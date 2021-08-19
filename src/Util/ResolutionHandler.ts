import ClientData from "../Entity/ClientData"
import { questions, responses } from "../Assets/Messages"
import QuestionEntity from "../Entity/QuestionEntity";

/**
 * Request a message from a given tree status.
 */
export const requestMessage = (position : number|null) : QuestionEntity|null => {
    let question : QuestionEntity = questions[0];
    if (position !== null) {
        if (position > questions.length) {
            return null;
        }
        questions.forEach(storedQuestion => {
            if (storedQuestion.position === position) {
                question = storedQuestion;
            }
        });
    }
    
    return question;
}

/**
 * Manage response message from the client.
 */
export const manageResponse = (client : ClientData, clientResponse: string) => {
    let isQuestionCorrect : boolean = false;

    responses.forEach(response => {
        if (response.text === clientResponse) {
            isQuestionCorrect = response.accepted
            return;
        }
    });

    client.optionTreePosition.completedPositions++
    client.optionTreePosition.userEvents.push({
        accepted: isQuestionCorrect
    })
}

export const addQuestion = (question: QuestionEntity) : void => {
    question.data = question.data.replaceAll('-', ' ');
    questions.push(question);
}