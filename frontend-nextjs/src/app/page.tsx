'use client'
import { createTaskAsync, deleteTaskItemAsync, getStatus, getStatusTask, getTaskDetailsAsync, getTaskDetailstList, getTaskItemListAsync, getTaskItemtList, getTaskStatussAsync } from "@/redux-store/action-reducer/actionSlice";
import { useAppDispatch, useAppSelector } from "@/redux-store/hook";
import { AppDispatch } from "@/redux-store/store";
import { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import moment from 'moment';
import Link from "next/link";
import { showAlert } from "@/utils/alert/alert";
import { useRouter } from "next/navigation";
export default function Home() {
  const dispatch: AppDispatch = useAppDispatch();
  const taskItemList: any = useAppSelector(getTaskItemtList);
  const _listStatus: any[] = useAppSelector(getStatusTask);
  const taskDetails: any = useAppSelector(getTaskDetailstList);
  const status: any = useAppSelector(getStatus);


  const [taskItems, setTaskItems] = useState<any[]>([]);
  const [listStatus, setListStatus] = useState<any[]>([]);
  const [taskDetail, setTaskDetail] = useState<any>();
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [userName, setuserName] = useState("");
  const [userID, setuserID] = useState("");
  const [statusTask, setStatusTask] = useState("");
  const [createAt, setCreateAt] = useState("");
  const [statusID, setStatusID] = useState("");
  const [id, setId] = useState<number>();
  const [isAdd, setIsAdd] = useState(false)


  const [token, setToken] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const router = useRouter()
  useEffect(() => {
    const _token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (_token != null) {
      setToken(_token);
    }
    if (user != null) {
      setName(user);
    }
  }, []);

  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(getTaskItemListAsync());
    dispatch(getTaskStatussAsync());
  }, [dispatch]);

  const toggle = () => setModal(!modal);
  const openModal = (id: any) => {
    toggle();
    dispatch(getTaskDetailsAsync(id));
  }
  useEffect(() => {
    if (taskItemList
    ) {
      setTaskItems(taskItemList)
    }
    if (_listStatus
    ) {
      setListStatus(_listStatus)
    }
  }, [taskItemList, _listStatus]);
  useEffect(() => {
    if (taskDetails) {
      setDataForm(taskDetails);
    }

  }, [taskDetails]);

  const setDataForm = (item: any) => {

    if (item) {
      if (isAdd) {
        setId(0);
      } else {
        setTitle(item.title);
        setDetail(item.details)
        setuserName(item.fullName)
        setStatusTask(item.status_name)
        setuserID(item.userID);
        setId(item.id);
        setStatusID(item.status);
        setCreateAt(item.createAt)
      }
    }
  }


  const handleDelete = (id: any) => {
    dispatch(deleteTaskItemAsync(id));
    if (token === '') {
      showAlert('error', 'Đăng nhập để xoá');
      return;
    }

    showAlert('success', 'Xoá thành công')
    dispatch(getTaskItemListAsync());


  }
  const handleAddTask = async () => {
    const data = {
      id: id,
      title: title,
      detail: detail,
      userID: userID,
      status: statusID,

    }
    const res = await dispatch(createTaskAsync(data));

    if (status === 'idle') {
      dispatch(getTaskItemListAsync());
      toggle();
    }
  }
  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    router.push('page/login');
  }
  return (
    <>

      <div className="content" >

        <div className="row justify-content-center" >
          <div className="col-md-8">
            <div className="card">
              <div >
                <h1>Todo List</h1>
                <button className="btn btn-success btn-sm me-2" onClick={() => { openModal(""), setIsAdd(true) }}>
                  <i className="fas fa-pencil-alt"></i> Add Task
                </button>
              </div>
              <div className="card-body p-0">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {taskItems.length > 0 && taskItems.map((item, index) => (
                      <tr key={index}>
                        <td>{item.title}</td>
                        <td>{item.status_name}</td>
                        <td className="project-actions">
                          <div className="d-flex justify-content-around">
                            <button className="btn btn-success btn-sm me-2" onClick={() => { openModal(item.id); setIsAdd(false) }}>
                              <i className="fas fa-pencil-alt"></i> Edit
                            </button>
                            <button className="btn btn-danger btn-sm me-2" onClick={() => {
                              handleDelete(item.id)
                            }}>
                              <i className="fas fa-trash"></i> Delete
                            </button>
                            <button className="btn btn-info btn-sm me-2" onClick={() => { openModal(item.id); setIsAdd(false) }}>
                              <i className="fas fa-search"></i> View Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
            {token && name ?
              <>
                <h1>{name}</h1>
                <button className="btn btn-info btn-sm me-2" onClick={handleLogout}>
                  Đăng xuất
                </button>

              </> :
              <Link href={`page/login`}>Đăng nhập</Link>}

          </div>
        </div>
        <Modal isOpen={modal} toggle={openModal} >
          <ModalHeader toggle={openModal}>{"Task - Details"}</ModalHeader>
          <ModalBody>
            <form className="form-horizontal">
              <div className="form-group row">
                <label className="col-sm-4 col-form-label">Title: </label>
                <div className="col-sm-8">
                  <input className="form-control" id="title"
                    value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label">Details: </label>
                <div className="col-sm-8">
                  <input className="form-control" id="details"
                    value={detail} onChange={(e) => setDetail(e.target.value)} />
                </div>
              </div>

              {isAdd === false ?
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Details: </label>
                  <div className="col-sm-8">
                    <select
                      className="form-control"
                      id="dvt"
                      value={statusID}
                      onChange={(e) => {
                        setStatusID(e.target.value)
                      }}
                    >

                      <option value="2" key={id}>working</option>
                      <option value="1" key={id}>finish</option>
                      <option value="3" key={id}>plan</option>

                    </select>
                  </div>
                </div>
                : ""}


              {isAdd === false ? <div className="form-group row">
                <label className="col-sm-4 col-form-label">Member: </label>
                <div className="col-sm-8">
                  <input className="form-control" id="member"
                    value={userName} onChange={(e) => setuserName(e.target.value)} />
                </div>
              </div> : ""}

              {isAdd === false ? <div className="form-group row">
                <label className="col-sm-4 col-form-label">CreateAt: </label>
                <div className="col-sm-8">
                  <input className="form-control" id="createAt"
                    value={moment(createAt).format('DD-MM-YYYY')} onChange={(e) => setCreateAt(e.target.value)} />
                </div>
              </div> : ""}

            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => { handleAddTask() }} style={{ backgroundColor: "green" }} >
              Thêm
            </Button>
            <Button color="secondary" onClick={() => openModal("")} style={{ backgroundColor: "red" }} >
              Thoát
            </Button>

          </ModalFooter>
        </Modal >
      </div>

    </>
  );
}
