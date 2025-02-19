import Fuse from "fuse.js";
import { List } from "immutable";
import * as React from "react";
import {
  Badge,
  Button,
  Form,
  FormControl,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Modal
} from "react-bootstrap";
import { BsDash, BsPlus } from 'react-icons/bs';
import {
  Element,
  ElementType,
  Layer,
  layerElements,
  Layers,
  Query
} from "../../../archimate-model";

type ElementTypeFilterType = ElementType | string;

interface IProps {
  onChange: (query: Query) => void;
  onClose: () => void;
  query: Query;
  show: boolean;
}

interface IState {
  elementTypeFilter: ElementTypeFilterType;
  elementTypesFilterElements: List<ElementTypeFilterType>;
  fuse?: Fuse<any>;
  fuseElementTypes?: List<ElementType>;
  fuseFilteredElements?: List<Element>;
  layerFilter: Layer | string;
  results: List<Element>;
  search: string;
}

export default class ElementPicker extends React.PureComponent<IProps, IState> {
  private allLayers: Array<Layer | string>;
  private fuseOptions = {
    distance: 100,
    keys: ["name", "type"],
    location: 0,
    maxPatternLength: 32,
    shouldSort: true,
    threshold: 0.6
  };

  constructor(props: IProps) {
    super(props);
    this.allLayers = new Array<Layer | string>().concat(
      ["All"],
      Layers.filter((l: Layer) => l !== Layer.None)
    );
    this.state = {
      elementTypeFilter: "All",
      elementTypesFilterElements: this.elementTypesForLayer(Layer.None),
      layerFilter: "All",
      results: List(),
      search: ""
    };
  }

  public render() {
    return (
      <Modal show={this.props.show} onHide={this.onClose}>
        <Modal.Header closeButton={true}>
          <Modal.Title>Add ArchiMate Element</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup controlId="layerFilter">
              <Form.Label>Layer Filter</Form.Label>
              <Form.Select
                defaultValue={this.state.layerFilter}
                onChange={this.onLayerFilterChanged}
              >
                {this.allLayers.map(v => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </Form.Select>
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup controlId="elementTypeFilter">
              <Form.Label>Element Type Filter</Form.Label>
              <Form.Select
                defaultValue={this.state.elementTypeFilter}
                onChange={this.onElementTypeFilterChanged}
              >
                {this.state.elementTypesFilterElements.map(v => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </Form.Select>
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup controlId="search">
              <Form.Label>Search</Form.Label>
              <input
                type="text"
                value={this.state.search}
                className="form-control"
                id="search"
                placeholder="search"
                onChange={this.onSearchChanged}
              />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup controlId="results">
              <Form.Label>
                Results <Badge>{this.state.results.size}</Badge>
              </Form.Label>
              <ListGroup>
                {this.state.results
                  .slice(0, Math.min(20, this.state.results.size))
                  .map(
                    el =>
                      el ? (
                        <ListGroupItem key={el.id}>
                          <div className="pull-right">
                            {this.addRemoveElement(el)}
                          </div>
                          <span className="text-info">{el.type}</span>
                          {": "}
                          {<span className="text-primary">{el.name}</span> || (
                            <span className="text-muted">unnamed</span>
                          )}
                        </ListGroupItem>
                      ) : (
                        undefined
                      )
                  )}
              </ListGroup>
              <FormControl.Feedback />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.onClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  private onSearchChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ search: event.target.value });
    this.calculateResults();
  };

  private onAddClick = (element: Element, event: any) => {
    this.props.onChange(
      this.props.query.updateQuery({
        elements: this.props.query.elements.add(element)
      })
    );
  };

  private onRemoveClick = (element: Element, event: any) => {
    this.props.onChange(
      this.props.query.updateQuery({
        elements: this.props.query.elements.remove(element)
      })
    );
  };

  private onClose = () => {
    this.props.onClose();
  };

  private onLayerFilterChanged = (event: any) => {
    const layerFilter = event.target.value;
    const elementTypes = this.elementTypesForLayer(layerFilter);
    this.setState({
      elementTypesFilterElements: elementTypes,
      fuse: undefined,
      layerFilter,
      results: List<Element>()
    });
    this.calculateResults();
  };

  private onElementTypeFilterChanged = (event: any) => {
    const elementTypeFilter = event.target.value;
    this.setState({
      elementTypeFilter,
      fuse: undefined,
      results: List<Element>()
    });
    this.calculateResults();
  };

  private calculateResults() {
    if (this.state.fuse === undefined) {
      const fuseElementTypes = this.filteredElementTypes();
      const fuseFilteredElements = List<Element>(
        this.allElements().filter(
          e => (e ? fuseElementTypes.some(et => et === e.type) : false)
        )
      );
      this.setState({
        fuseElementTypes,
        fuseFilteredElements
      });
      const fuse = new Fuse<any>(fuseFilteredElements.toJS(), this.fuseOptions);
      this.setState({ fuse });
    }
    const results: List<Element> =
      this.state.search.length > 0
        ? List<Element>((this.state.fuse as any).search(this.state.search))
        : List<Element>();
    this.setState({ results });
  }

  private elementTypesForLayer = (
    layer: Layer | string
  ): List<ElementTypeFilterType> => {
    return List<ElementTypeFilterType>(
      layerElements(layer === "All" ? Layer.None : (layer as Layer)).map(v => v).sort()
    ).unshift("All");
  };

  private filteredElementTypes(): List<ElementType> {
    if (this.state.elementTypeFilter === "All") {
      return List(
        this.state.elementTypesFilterElements
          .filter(et => et !== "All")
          .map(et => et as ElementType)
      );
    } else {
      return List([this.state.elementTypeFilter as ElementType]);
    }
  }

  private addRemoveElement(el: Element): JSX.Element {
    // TODO: should be working with Immutable v4
    // const isSelected = this.props.selectedElements.includes(el);
    const isSelected = this.props.query.elements.some(
      e => (e ? e.id === el.id : false)
    );
    const onClick = isSelected
      ? this.onRemoveClick.bind(this, el)
      : this.onAddClick.bind(this, el);
    const bsStyle = isSelected ? "danger" : "primary";
    return (
      <Button size="sm" variant={bsStyle} onClick={onClick}>
        isSelected ? <BsDash/> || <BsPlus/>
      </Button>
    );
  }

  private allElements = () => {
    return List<Element>(this.props.query.model.elements);
  };
}
