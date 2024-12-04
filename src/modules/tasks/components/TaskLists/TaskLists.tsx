import React, { useState, useEffect } from "react";
import { axiosInstance, TASKSURL } from "../../../../services/EndPoints";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

interface TaskData {
  title: string;
  status: string;
  creationDate: string;
  employee: string | null;
  projectTitle: string;
  id: number;
}

export default function TasksLists() {
  const [tasksList, setTasksList] = useState<TaskData[]>([]);
  const [arrayOfPages, setArrayOfPages] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState(0);
  const [titleValu, setTitleValu] = useState("");
  const [statusValu, setStatusValu] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id: number) => {
    setSelectedId(id);
    setShow(true);
  };

  let getAllTasks = async (
    title?: string,
    pageNo?: number,
    pageSize?: number,
    status?: string | number
  ) => {
    try {
      let response = await axiosInstance.get(TASKSURL.GET_TASKALL, {
        params: { pageSize: pageSize, pageNumber: pageNo, title: title, status:status },
      });

      const updatedTasks = response?.data.data.map((task: any) => ({
        title: task.title,
        status: task.status,
        creationDate: task.creationDate,
        employee: task.employee,
        projectTitle: task.project ? task.project.title : "N/A", // Correct mapping for project title
        id: task.id,
      }));

      setTasksList(updatedTasks);
      setArrayOfPages(
        Array<string>(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => (i + 1).toString())
      );
    } catch (error) {
      toast?.error("Error fetching data!");
      console.error(error);
    }
  };
  const getTitle = (input:any) => {
    getAllTasks( input.target.value,1,5,statusValu);
    setTitleValu(input.target.value)
  };
  const getStatus = (input:any) => {
    setStatusValu(input.target.value);
    getAllTasks(titleValu,1,5,input.target.value);
  };

  const deleteTask = async () => {
    try {
      await axiosInstance.delete(TASKSURL.DELETE_TASK(selectedId));
      toast?.success("Task deleted successfully!");
      getAllTasks();
    } catch (error) {
      toast?.error(error.response?.data?.message || "Error deleting task.");
      console.error(error);
    }
    handleClose();
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Done":
        return "bg-success";
      case "In Progress":
        return "bg-warning";
      case "ToDo":
        return "bg-purple";
      default:
        return "bg-secondary";
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between p-4 bg-white ">
        <h3>Tasks</h3>
        <Link to='/tasks/create-task' className="btn-add">+ Add New Task</Link>
      </div>

      <div className="bg-white m-5">
        {/* Search Section */}
        <div className="row mb-4">
          <div className="col-md-4 mt-4 mx-2">
            <input
            onChange={getTitle}
              type="text"
              placeholder="Search by title ..."
              className="form-control rounded-5 ps-2"
            />
          </div>
          <div className="col-md-4 mt-4 mx-2">
          <select
          onChange={getStatus}
            
            className="form-select rounded-5 ps-2 "
            aria-label="Default select example"
          >
            <option selected value="" disabled>
              
            Filter
            </option>
            <option value="ToDo">ToDo</option>
            <option value="InProgress">InProgress</option>
            <option value="Done">Done</option>
          </select> 
          </div>
        </div>

        {/* Tasks Table */}
        <table className="table table-striped">
          <thead className="Tasks-header">
            <tr>
              <th scope="col">
                <div className="d-flex align-items-center ">
                  Title
                  <div className="d-flex flex-column ms-3 justify-content-center">
                    <i className="fa fa-chevron-up chevron"></i>{" "}
                    <i className="fa fa-chevron-down chevron"></i>{" "}
                  </div>
                </div>
              </th>
              <th scope="col">
                <div className="d-flex align-items-center ">
                  Status
                  <div className="d-flex flex-column ms-3 justify-content-center">
                    <i className="fa fa-chevron-up chevron"></i>{" "}
                    <i className="fa fa-chevron-down chevron"></i>{" "}
                  </div>
                </div>
              </th>
              <th scope="col">
                <div className="d-flex align-items-center ">
                  Employee
                  <div className="d-flex flex-column ms-3 justify-content-center">
                    <i className="fa fa-chevron-up chevron"></i>{" "}
                    <i className="fa fa-chevron-down chevron"></i>{" "}
                  </div>
                </div>
              </th>
              <th scope="col">
                <div className="d-flex align-items-center ">
                  Project Title
                  <div className="d-flex flex-column ms-3 justify-content-center">
                    <i className="fa fa-chevron-up chevron"></i>{" "}
                    <i className="fa fa-chevron-down chevron"></i>{" "}
                  </div>
                </div>
              </th>
              <th scope="col">
                <div className="d-flex align-items-center ">
                  Creation Date
                  <div className="d-flex flex-column ms-3 justify-content-center">
                    <i className="fa fa-chevron-up chevron"></i>{" "}
                    <i className="fa fa-chevron-down chevron"></i>{" "}
                  </div>
                </div>
              </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {tasksList.map((task: TaskData) => (
              <tr key={task.id}>
                <td className="p-3">{task.title}</td>
                <td className="p-3">
                  <div
                    className={`status text-white ${getStatusClass(
                      task.status
                    )} p-3 rounded-5`}
                  >
                    {task.status}
                  </div>
                </td>
                <td className="p-3">
                  {task.employee ? task.employee.userName : "N/A"}
                </td>
                <td className="p-3">{task.projectTitle}</td>
                <td className="p-3">
                  {new Date(task.creationDate).toLocaleDateString()}
                </td>
                <td className="cred-icons p-3">
                  <Dropdown>
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      className="Tasks-list-dropdown d-flex border-0 fs-4"
                    >
                      <i className="fa-solid justify-content-center align-items-center Tasks-list-icon-toggle fa-ellipsis-vertical"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">
                        <button onClick={() => handleShow(task.id)}>
                          <i className="fa-solid fa-trash Task-list-icon mx-3"></i>
                        </button>
                        <span>Delete</span>
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                      <Link to={`/tasks/${task.id}`}><i className="fa-regular fa-pen-to-square Task-list-icon mx-3"></i>                      </Link>
                        <span>Edit</span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for delete confirmation */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <h5 className="my-3">
                Are you sure you want to delete this task?
              </h5>
              <p className="text-muted">This action cannot be undone.</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={deleteTask}>
              Delete Task
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Pagination */}
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center">
            {arrayOfPages.map((page, index) => (
              <li key={index} className="page-item">
                <button
                  className="page-link"
                  onClick={() => getAllTasks(page, 10)}
                >
                  {page}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
