import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

const TaskBar = () => {
  return (
    <>
      <button>
        <FontAwesomeIcon icon={faPen} />
      </button>
      <button>
        <FontAwesomeIcon icon={faCheck} />
      </button>
      <button>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </>
  );
};

export default TaskBar;
