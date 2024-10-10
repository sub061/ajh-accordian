export interface IAccordionWithQuestionProps {
     getQuestionAnswer: IListContent[]

}

export interface IListContent{
  Id: string;
  Question: string;
  Answer: string;
}

export interface IMainlist{
  value: IListContent;
}