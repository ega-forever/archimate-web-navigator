import * as React from "react";
import {
  Col,
  FormLabel,
  Form,
  FormGroup
} from "react-bootstrap";
import "../archimate-navigator.css";

interface IProps {
  modelName: string;
  diagramName: string | undefined;
  diagramViewpoint: string | undefined;
}

export default class ModelInfo extends React.Component<IProps> {
  public render() {
    return (
      <Form>
        <FormGroup>
          <Col sm={2}>
            <small className="text-muted">Model</small>
          </Col>
          <Col sm={10}>
            <Form.Text>
              <strong>{this.props.modelName}</strong>
            </Form.Text>
          </Col>
        </FormGroup>
        {this.diagramRow()}
      </Form>
    );
  }

  protected diagramRow() {
    if (this.props.diagramName) {
      return (
        <FormGroup>
          <Col sm={2}>
            <small className="text-muted">Diagram</small>
          </Col>
          <Col sm={10}>
            <Form.Text>
              <strong>{this.props.diagramName}</strong>{" "}
              <small>
                &lt;
                {this.props.diagramViewpoint}
                &nbsp;Viewpoint&gt;
              </small>
            </Form.Text>
          </Col>
        </FormGroup>
      );
    } else {
      return null;
    }
  }
}
