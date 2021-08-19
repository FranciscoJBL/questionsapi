import ExpectedResponse from "../Entity/ExpectedResponse";
import QuestionEntity from "../Entity/QuestionEntity";
import ResponseMessage from "../Entity/ResponseMessage";

/**
 * List of available questions. This can be replaced by fields on a database in a production environment.
 */
export const questions : Array<QuestionEntity> = [
    {
        data: 'Hi, nice to meet you. We need to ask a few questions in order to know you better',
        expects: ExpectedResponse.ACCEPT, 
        position: 0
    }
];

export const responses : Array<ResponseMessage> = [
    { accepted: true, text: 'Yes' },
    { accepted: false, text: 'No' }
]
