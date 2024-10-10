export interface IAccordionWithQuestionProps {
     getQuestionAnswer: IListContent[]

}

export interface IListContent{
   [key: string]: any; // Add this index signature
  Question: string;
  Answer: string;
  Position: string;
}

export interface IMainlist{
  value: IListContent;
}