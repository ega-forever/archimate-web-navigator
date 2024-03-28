import BadgedRectViewNode from "./badged-rect";
import { IViewNodeProps } from "./default-element";

export default class SystemSoftwareViewNode extends BadgedRectViewNode {
  constructor(props: IViewNodeProps) {
    super(props);
    this.state = {
      ...this.state,
      badge: "#archimate-system-software-badge"
    };
  }
}
