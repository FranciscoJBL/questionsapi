import ClientData from "../Entity/ClientData"
import { questions, isUsingSample, flush } from "../Assets/Messages"
import QuestionEntity from "../Entity/QuestionEntity";

/**
 * Request a message from a given tree status.
 */
export const requestMessage = (position : number|null) : QuestionEntity|null => {
    // By default, we send the first question
    let question : QuestionEntity = questions[0];
    // If a position as been sent, we look for the message at this position
    if (position !== null) {
        // If the position is invalid, we just return null
        if (position >= questions.length -1) {
            return null;
        }

        // Find the correct question on the pool.
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
    // Save the client information
    client.optionTreePosition.userEvents.push({
        position: client.optionTreePosition.completedPositions,
        response: clientResponse
    })

    // Add a new completed position to the pool, to the question won't be repeated.
    client.optionTreePosition.completedPositions++
}

/**
 * Add a new question to the pool.
 */
export const addQuestion = (question: QuestionEntity) : void => {

    // The api needs to flush the message storage if there is custom messages being added.
    if (isUsingSample() === true) {
        flush()
    }


    // Show question spaces propertly.
    question.data = question.data.replaceAll('-', ' ');
    questions.push(question);
}