import * as React from "react";
import styles from "./AccordionWithQuestion.module.scss";
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
        <span className={`${styles.accordionWithQuestion}`}></span>
        <div className="all_que_list">
          {accData.map((acc, index) => (
            <a href={"#id-" + (index + 1)}>
              <span>{index + 1}</span>: {acc.Question}
            </a>
          ))}
        </div>

        <div className="que_with_ans">
          {accData.map((acc, index) => (
            <div id={"id-" + (index + 1)} className="list">
              <a>Q. {acc.Question} </a>
              <p className="ans">{acc.Answer} </p>
            </div>
          ))}
        </div>
      </section>
    );
  }
}
