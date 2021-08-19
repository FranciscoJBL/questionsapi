import ExpectedResponse from "./ExpectedResponse";

/**
 * Question entity.
 */
 export default interface QuestionEntity {
    data: string;
    expects: ExpectedResponse; 
    position: number;
}