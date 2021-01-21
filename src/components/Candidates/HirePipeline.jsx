import React, { useState, useEffect } from "react";
import { Row as AntRow, Col as AntCol, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Header } from "../Styled/FundamentalComponents.jsx";
import DraggingCard from "./DraggingCard.jsx";
import _ from "underscore";

const dragStyle = {
  backgroundColor: "#ebecf0",
  padding: 4,
  width: "100%",
  minWidth: "300px",
  minHeight: "80vh",
  borderRadius: "10px",
  boxShadow: "1px 1px 5px -5px",
  border: "1px solid #C5D1D8",
};

/**
 *
 *Handles Drag and Drop
 *
 */
const onDragEnd = (result, columns, setColumns, props) => {
  if (!result.destination) return;

  console.log("Result " + JSON.stringify(result));
  console.log("Columns " + JSON.stringify(columns));
  console.log("Props" + JSON.stringify(props));

  const { source, destination, draggableId } = result;
  let status;
  let studentIndex = _.findIndex(props.candidates, {Id: draggableId});
 
  if (props.candidates[studentIndex].status.includes("Interview") && destination.droppableId === 2) {
    status = props.candidates[studentIndex].status;
  } else {
    status = "Review";

    switch (parseInt(destination.droppableId)) {
      case 1:
        status = "Review";
        break;
      case 2:
        status = "Interview";
        break;
      case 3:
        status = "Accepted";
        break;
      default:
        status = "Review";
      // code block
    }
  }
  props.updateCandidateStatus(result.draggableId, status);

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

//Card Drop Zones
const columnsFromBackend = {
  1: {
    name: "Review",
    items: [],
  },
  2: {
    name: "Interview",
    items: [],
  },
  3: {
    name: "Accepted",
    items: [],
  },
};

function HirePipeline(props) {
  const [columns, setColumns] = useState(columnsFromBackend);

  /**
   * Filters through all the candidates to place them into
   * the correct buckets
   */
  let markedCandidates = props.candidates.filter(
    (candidate) => candidate.status === "Review"
  );
  let interviewCandidates = props.candidates.filter((candidate) =>
    candidate.status.includes("Interview")
  );
  let acceptedCandidates = props.candidates.filter(
    (candidate) => candidate.status === "Accepted"
  );

  useEffect(() => {
    setColumns({
      ...columns,
      ["1"]: { ...columns["1"], items: markedCandidates },
      ["2"]: { ...columns["2"], items: interviewCandidates },
      ["3"]: { ...columns["3"], items: acceptedCandidates },
    });
  }, []);

  return (
    /**
     *
     *The page containing drag n drop
     *
     */
    <div className="px-4 py-2" style={{ width: "100%" }}>
      <AntRow gutter={[36, 0]} style={{ minWidth: "1200px" }}>
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns, props)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              /**
               *
               *Mapping of Columns (Already defined)
               *
               */
              <AntCol span={8} key={columnId}>
                <div>
                  <Header className="twentyFont mb-point-25" subheading bolded>
                    {column.name}
                  </Header>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        /**
                         *
                         *Drop Zone Columns for Student Cards
                         *
                         */
                        <Spin
                          indicator={
                            <LoadingOutlined style={{ fontSize: 36 }} spin />
                          }
                          spinning={props.loading.isCandidateLoading}
                        >
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={dragStyle}
                          >
                            {/**
                             *
                             * Mapping of student cards and draggability
                             *
                             */}
                            {column.items.map((item, index) => {
                              return (
                                <Draggable
                                  key={item.Id}
                                  draggableId={item.Id.toString()}
                                  index={index}
                                >
                                  {(provided) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          userSelect: "none",
                                          padding: 8,
                                          ...provided.draggableProps.style,
                                        }}
                                      >
                                        {/**
                                         *
                                         * Student Card
                                         *
                                         */}
                                        <DraggingCard
                                          name={
                                            item.formData["0"]["First Name"]
                                          }
                                          date={
                                            item.formData["0"][
                                              "Starting/Ending Dates Formatted"
                                            ]
                                          }
                                          position={item.appliedFor}
                                          city={item.formData["0"].City}
                                          stateLocation={
                                            item.formData["0"].State
                                          }
                                          status={item.status}
                                          updateCandidateStatus={
                                            props.updateCandidateStatus
                                          }
                                          id={item.Id}
                                          avatar={`http://tii-intern-media.s3-website-us-east-1.amazonaws.com/${item.Id}/profile_picture`}
                                        />
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        </Spin>
                      );
                    }}
                  </Droppable>
                </div>
              </AntCol>
            );
          })}
        </DragDropContext>
      </AntRow>
    </div>
  );
}

export default HirePipeline;
