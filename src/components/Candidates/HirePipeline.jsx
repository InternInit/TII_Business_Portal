import React, { useState, useEffect } from "react";
import { Row as AntRow, Col as AntCol } from "antd";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { PageContainer, Header } from "../Styled/FundamentalComponents.jsx";
import DraggingCard from "./DraggingCard.jsx";
import styled from "styled-components";

const dragStyle = {
  backgroundColor: "#ebecf0",
  padding: 4,
  width: "100%",
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
  const { source, destination } = result;

  let status = "Review";
  switch (parseInt(destination.droppableId)) {
    case 1:
      status = "Review";
      break;
    case 2:
      status = "Online Interview";
      break;
    case 3:
      status = "On-Site Interview";
      break;
    case 4:
      status = "Accepted";
      break;
    default:
      status = "Review";
    // code block
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
    name: "Marked",
    items: [],
  },
  2: {
    name: "Online Interview",
    items: [],
  },
  3: {
    name: "On-Site Interview",
    items: [],
  },
  4: {
    name: "Accepted",
    items: [],
  },
};

function HirePipeline(props) {
  const [columns, setColumns] = useState(columnsFromBackend);
  let markedCandidates = props.candidates.filter(
    (candidate) => candidate.status === "Review"
  );
  let onlineInterviewCandidates = props.candidates.filter(
    (candidate) => candidate.status === "Online Interview"
  );
  let onSiteInterviewCandidates = props.candidates.filter(
    (candidate) => candidate.status === "On-Site Interview"
  );
  let acceptedCandidates = props.candidates.filter(
    (candidate) => candidate.status === "Accepted"
  );

  useEffect(() => {
    setColumns({
      ...columns,
      ["1"]: { ...columns["1"], items: markedCandidates },
      ["2"]: { ...columns["2"], items: onlineInterviewCandidates },
      ["3"]: { ...columns["3"], items: onSiteInterviewCandidates },
      ["4"]: { ...columns["4"], items: acceptedCandidates },
    });
  }, []);

  return (
    /**
     *
     *The page containing drag n drop
     *
     */
    <div className="px-4 py-2" style={{ width: "100%" }}>
      <AntRow gutter={[36, 0]} style={{ width: "100%" }}>
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
              <AntCol span={6} key={columnId}>
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
                                key={item.internId}
                                draggableId={item.internId.toString()}
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
                                        name={item.info["First Name"]}
                                        date={
                                          item.info["Starting/Ending Dates"]
                                        }
                                        position={"Cheese grator"}
                                        city={item.info.City}
                                        stateLocation={item.info.State}
                                        id={item.internId}
                                        avatar={`https://tii-intern-media.s3.amazonaws.com/${item.internId}/profile_picture`}
                                      />
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
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
