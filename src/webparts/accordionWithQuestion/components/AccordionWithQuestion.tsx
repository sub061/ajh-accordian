import * as React from "react";
//import styles from "./AccordionWithQuestion.module.scss";
import type { IAccordionWithQuestionProps } from "./IAccordionWithQuestionProps";
//import { escape } from "@microsoft/sp-lodash-subset";
import { type IListContent } from "./IAccordionWithQuestionProps";

interface IAccordionWithQuestionState {
  accData: IListContent[];
}

export default class AccordionWithQuestion extends React.Component<
  IAccordionWithQuestionProps,
  IAccordionWithQuestionState
> {
  constructor(props: IAccordionWithQuestionProps) {
    super(props);
    this.state = {
      accData: props.getQuestionAnswer || null,
    };
  }

  public render(): React.ReactElement<IAccordionWithQuestionProps> {
    const { accData } = this.state;
    console.log("accdata", accData);

    return (
      <section>
        {accData.map((acc) => (
          <div>Question = {acc.Question}</div>
        ))}

        <div>
          {accData.map((acc) => (
            <div>
              <span>Question = {acc.Question} </span>
              <span>Answer = {acc.Answer} </span>
            </div>
          ))}
        </div>
      </section>
    );
  }
}
