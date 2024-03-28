import * as React from "react";
import { Button, Card, CardTitle } from 'react-bootstrap';
import { BsArrowsAngleExpand, BsArrowsCollapse, BsArrowsExpand } from 'react-icons/bs';

interface IProps {
  header?: string | any;
  initiallyCollapsed?: boolean;
  children: any;
}

interface IState {
  collapse: boolean;
}

export default class Panel extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      collapse:
        this.props.initiallyCollapsed === undefined
          ? false
          : this.props.initiallyCollapsed
    };
  }

  public render() {
    const panelClsName = this.state.collapse
      ? "panel-body collapse"
      : "panel-body";
    return (
      <div className="panel panel-default">
        {this.header()}
        <div id="archimate-view-props" className={panelClsName}>
          {this.props.children}
        </div>
      </div>
    );
  }

  public componentDidUpdate(prevProps: IProps) {
    if (this.props.initiallyCollapsed !== prevProps.initiallyCollapsed) {
      this.setState({
        collapse: this.props.initiallyCollapsed ? true : false
      });
    }
  }

  private handleCollapseExpand = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  private header() {
    if (this.props.header) {
      return (
        <Card>
          <CardTitle>
            {this.props.header}
            <Button onClick={this.handleCollapseExpand}>
              {this.state.collapse ? (<BsArrowsExpand />) : (<BsArrowsCollapse />)}
            </Button>
          </CardTitle>
        </Card>
      );
    }
    return null;
  }
}
