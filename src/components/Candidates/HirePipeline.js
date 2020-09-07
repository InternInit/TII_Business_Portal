import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import DraggingCard from "./DraggingCard.js";
import styled from "styled-components";

//Styled Components
const Header = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #434343;
  margin-top: 4vh;
`;

//Styles
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: "#eceff9",
};

const columnStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const dragStyle = {
  backgroundColor: "#f5f5f5",
  padding: 4,
  width: "40vh",
  minHeight: "80vh",
  borderRadius: "4px",
  border: "1px solid #d8def3",
};

/**
 *
 *Handles Drag and Drop
 *
 */
const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

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
    /*
    fetch(`http://localhost:8000/student?_page=1&_limit=5`)
      .then(response => response.json())
      .then(json => {
        setColumns({
          ...columns,
          ["1"]: { ...columns["1"], items: json }
        });
        console.log(json);
      });
      */
    setColumns({
      ...columns,
      ["1"]: { ...columns["1"], items: markedCandidates },
      ["2"]: { ...columns["2"], items: onlineInterviewCandidates },
      ["3"]: { ...columns["3"], items: onSiteInterviewCandidates },
      ["4"]: { ...columns["4"], items: acceptedCandidates },
    });

    console.log(columns);
    console.log(markedCandidates);
  }, []);
  return (
    /**
     *
     *The page containing drag n drop
     *
     */
    <div style={containerStyle}>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            /**
             *
             *Mapping of Columns (Already defined)
             *
             */
            <div style={columnStyle} key={columnId}>
              <Header>{column.name}</Header>
              <div style={{ margin: 8 }}>
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
                              key={item.assocId}
                              draggableId={item.assocId.toString()}
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
                                        item.info["Starting/Ending Dates"][0]
                                      }
                                      position="Cheese grator"
                                      id={item.studentId}
                                      avatar={`https://tii-intern-media.s3.amazonaws.com/${item.studentId}/profile_picture`}
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
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default HirePipeline;
