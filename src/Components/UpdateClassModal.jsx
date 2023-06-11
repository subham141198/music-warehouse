import React from 'react';
import { Button, Spinner } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useEffect } from 'react';
import { useForm } from "react-hook-form";

const UpdateClassModal = ({ show, onHide, singleClass, handleClassUpdate, updatingdata }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();


  useEffect(() => {
    if (singleClass) {
      setValue('className', singleClass.className);
      setValue('classPrice', singleClass.classPrice);
      setValue('classAvailableSeats', singleClass.classAvailableSeats);
      setValue('_id', singleClass._id);
    }
  }, [singleClass, setValue]);


  function onSubmit(data) {
    console.log(data)
    handleClassUpdate(data)
  }
  return (

    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          className="text-center w-100 m-auto"
          id="contained-modal-title-vcenter"
        >
          Update Toy
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          className="container"
          onSubmit={handleSubmit(onSubmit)}
        >
          {errors.exampleRequired && <span>This field is required</span>}
          <label>Class Image</label>
          <input
            className="text-input form-control"
            type="text"
            {...register("className")}
            placeholder="Class Name"
          />

          <input
            className="text-input d-none"
            {...register("_id")}
          />
           <label>Upload Image</label>
          <input
            className="text-input form-control"
            {...register("classImage")}
            type="file"

          />
          <label>Price</label>
          <input
            className="text-input form-control"
            type="number"
            placeholder="Price"
            {...register("classPrice")}

          />
          <label>Total Seats</label>
          <input
            className="text-input form-control"
            placeholder="Total Seats"
            {...register("classAvailableSeats")}

          />



          <Button className='outline-primary' value="Update" type="submit" >{updatingdata ? <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          /> :
            "Update"}</Button>
        </form>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>

  );
};

export default UpdateClassModal;