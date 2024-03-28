import * as React from "react";
import { Badge, Card } from "react-bootstrap";

export type ValidationState = "success" | "warning" | "error" | null;

interface IProps {
  label?: React.ReactText | JSX.Element;
  labelStyle?:
    | "default"
    | "primary"
    | "success"
    | "info"
    | "warning"
    | "danger";
  defaultExpanded?: boolean;
  title: string | JSX.Element;
  validationState?: ValidationState;
  children: any;
}

export default class CollapsibleFormGroup extends React.PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <Card
        //defaultExpanded={this.props.defaultExpanded}
        style={{ margin: "0 -13px -1.1em -13px" }}
      >
        <Card.Header>
          <Card.Title
          //  toggle={true}
          >
            <span className={this.titleClass()}>{this.props.title}</span>
            {this.props.label ? (
              <Badge bg={this.props.labelStyle} className="pull-right">
                {this.props.label}
              </Badge>
            ) : null}
          </Card.Title>
        </Card.Header>
        <Card.Body
          //collapsible={true}
        >{this.props.children}</Card.Body>
      </Card>
    );
  }

  private titleClass(): string | undefined {
    switch (this.props.validationState) {
      case "success":
        return "text-success";
      case "warning":
        return "text-warning";
      case "error":
        return "text-danger";
      default:
        return undefined;
    }
  }
}
