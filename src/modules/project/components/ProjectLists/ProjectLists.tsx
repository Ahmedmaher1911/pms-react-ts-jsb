import React, { useState, useEffect } from "react";
import { axiosInstance, PROJECT_URL } from "../../../../services/EndPoints";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import "../ProjectLists/TasksAndProjectsLists.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

// Define TaskData interface
interface TaskData {
  id: number;
  title: string;
  description: string;
  status: string;
  creationDate: string;
  modificationDate: string;
}

// Update ProjectData interface
interface ProjectData {
  title: string;
  description: string;
  task: TaskData[]; // Corrected type
  id: number;
}

export default function ProjectLists() {
  const [projectsList, setProjectsList] = useState<ProjectData[]>([]);
  const [titleValue, setTitleValue] = useState("");
  const [arrayOfPages, setArrayOfPages] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState(0);
  const [show, setShow] = useState(false);
  const [searchParams , setSearchParams] = useSearchParams();
  const title = searchParams.get("title")|| '';
  const pageNo = searchParams.get("pageNumber")|| 1;
const navigate  = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = (id: number) => {
    setSelectedId(id);
    setShow(true);
  };

  const getTitleValue = (input: any) => {
    setTitleValue(input.target.value);
    setSearchParams({ title: input.target.value, pageNumber: "1" });
  getAllProjects(input.target.value);
    
  };

  let getAllProjects = async (
    title?: string,
    pageNo?: string,
    pageSize?: number
  ) => {
    try {
      let response = await axiosInstance.get(
        PROJECT_URL.GIT_PROJECTS_FOR_MANAGER,
        {
          params: { pageSize: 2, pageNumber: pageNo, title: title },
        }
      );
      setProjectsList(response?.data?.data);
      const totalPages = response?.data?.totalNumberOfPages || 1;
      const pages = Array.from({ length: totalPages }, (_, i) => (i + 1).toString());
      setArrayOfPages(pages);
      
    } catch (error) {
      toast?.error("Error fetching data!");
      console.error(error);
    }
  };

  let deleteProject = async () => {
    try {
      await axiosInstance.delete(PROJECT_URL.DELETE_PROJECT(selectedId));
      toast?.success("Project deleted successfully!");
      getAllProjects(title, pageNo);
    } catch (error) {
      toast?.error(error?.response?.data?.message || "Error deleting project.");
      console.error(error);
    }
    handleClose();
  };
  const handlePageChange = (page: string) => {
    setSearchParams({ title, pageNumber: page });
  };
  useEffect(() => {
    getAllProjects(title, pageNo);
  }, [title, pageNo]);

  return (
    <>
      <div className="d-flex justify-content-between p-4 bg-white ">
        <h3>Projects</h3>
       
        <button className="btn-add" onClick={()=>{navigate("new-project")}}>+ Add New Project</button>
        
      </div>

      <div className="bg-white m-5">
        {/* Search Section */}
        <div className="row mb-4">
          <div className="col-md-4">
            <input
              type="text"
              placeholder="Search by title ..."
              className="form-control roundded-5"
              onChange={getTitleValue}
              value={titleValue}
            />
          </div>
        </div>

        {/* Projects Table */}
        <table className="table table-striped">
          <thead className="Tasks-header">
            <tr>
              <th scope="col">
                <div className="d-flex align-items-center ">
                  Title
                  <div className="d-flex flex-column ms-3 justify-content-center">
                    <i className="fa fa-chevron-up chevron"></i>
                    <i className="fa fa-chevron-down chevron"></i>
                  </div>
                </div>
              </th>
              <th scope="col">
                <div className="d-flex align-items-center ">
                  Status
                  <div className="d-flex flex-column ms-3 justify-content-center">
                    <i className="fa fa-chevron-up chevron"></i>
                    <i className="fa fa-chevron-down chevron"></i>
                  </div>
                </div>
              </th>
              <th scope="col">
                <div className="d-flex align-items-center ">
                  No. of tasks
                  <div className="d-flex flex-column ms-3 justify-content-center">
                    <i className="fa fa-chevron-up chevron"></i>
                    <i className="fa fa-chevron-down chevron"></i>
                  </div>
                </div>
              </th>
              <th scope="col">
                <div className="d-flex align-items-center"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {projectsList.map((project: ProjectData) => (
              <tr key={project.id}>
                <td className="p-3">{project.title}</td>
                <td className="p-3">{project.description}</td>
                <td className="p-3">{project.task.length}</td>
                <td className="cred-icons p-3">
                  <Dropdown>
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      className="Tasks-list-dropdown d-flex border-0 fs-4"
                    >
                      <i className="fa-solid justify-content-center align-items-center Tasks-list-icon-toggle fa-ellipsis-vertical"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item >
                        <button
                          className="Task-list-icon"
                          onClick={() => handleShow(project.id)}
                        >
                          <i className="fa-solid fa-trash Task-list-icon mx-3"></i>
                        </button>
                        <span>Delete</span>
                      </Dropdown.Item>
                      <Dropdown.Item >
                        <Link to={`${project.id}`} className="text-decoration-none text-black">
                        <i className="fa-regular fa-pen-to-square Task-list-icon mx-3"></i>
                        <span>Edit</span>
                        </Link>
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
            <Modal.Title>Delete Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <h5 className="my-3">
                Are you sure you want to delete this project?
              </h5>
              <p className="text-muted">This action cannot be undone.</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={deleteProject}>
              Delete Project
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
                  onClick={() => handlePageChange(page)}
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
