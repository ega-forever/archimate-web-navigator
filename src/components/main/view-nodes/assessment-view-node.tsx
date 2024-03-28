import { IViewNodeProps } from "./default-element";
import MotivationViewNode from "./motivation-view-node";

export default class AssessmentViewNode extends MotivationViewNode {
  constructor(props: IViewNodeProps) {
    super(props);
    this.state = {
      ...this.state,
      badge: "#archimate-assessment-badge"
    };
  }
}
