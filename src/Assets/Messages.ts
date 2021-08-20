import ExpectedResponse from "../Entity/ExpectedResponse";
import QuestionEntity from "../Entity/QuestionEntity";

/**
 * List of available questions. This can be replaced by fields on a database in a production environment.
 */
export let questions : Array<QuestionEntity> = [];

/**
 * Defines if the system its using example data.
 */
let usingExample = false;

/**
 * Sample questions dataset.
 */
const sampleQuestions : Array<QuestionEntity> = [
    {
        data: 'Hi, nice to meet you. We need to ask a few questions in order to know you better',
        expects: ExpectedResponse.ACCEPT, 
        position: 0
    },
    {
        data: 'What is your name?',
        expects: ExpectedResponse.USER_INPUT, 
        position: 1
    },
    {
        data: 'Do you like dogs?',
        expects: ExpectedResponse.BINARY_QUESTION, 
        position: 2
    },
    {
        data: 'And what do you say about cats? Do you like them?',
        expects: ExpectedResponse.BINARY_QUESTION, 
        position: 3
    },
    {
        data: 'What is your parent name?',
        expects: ExpectedResponse.USER_INPUT, 
        position: 4
    }
];

/**
 * Initialize questions with sample dataset.
 */
export const createSampleMessages = () => {
    questions = [...questions, ...sampleQuestions];
    usingExample = true;
}

/**
 * Check if the system is using the example dataset.
 */
export const isUsingSample = () : boolean => {
    return usingExample;
}

/**
 * Flush the questions content.
 */
export const flush = () => {
    questions = [];
    usingExample = false;
}