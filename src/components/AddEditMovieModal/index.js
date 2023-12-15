import React, { useCallback } from 'react';
import { useFormik } from 'formik';
import { FileInputField, InputField, InputGroupField } from '../MovieForm';
import { validationSchema } from '../FormValidation';
import { Modal } from 'reactstrap';

const AddEditMovieModal = ({ isModalOpen, onToggle, onSave, movie }) => {
    const formik = useFormik({
        initialValues: {
            title: movie ? movie?.title : '',
            rating: movie ? movie?.rating : '',
            releaseYear: movie ? movie?.releaseYear : '',
            image: movie ? movie?.image : '',
            votes: movie ? movie?.votes : '',
            durationHours: movie ? movie?.durationHours : '',
            durationMinutes: movie ? movie?.durationMinutes : '',
            id: movie ? movie.id : null,
        },
        validationSchema,
        onSubmit: useCallback((values, { resetForm }) => {
            onSave(values);
            onToggle();
            resetForm();
        }, [onToggle, onSave]),
        enableReinitialize: true,
    });

    const handleImageUpload = useCallback((e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                formik.setFieldValue('image', reader.result);
            };
            reader.readAsDataURL(file);
        }
    }, [formik]);

    const resetForm = useCallback(() => {
        formik.resetForm();
    }, [formik]);


    return (
        <>
            <Modal
                isOpen={isModalOpen}
                toggle={() => { onToggle(); resetForm() }}
            >
                <form onSubmit={formik.handleSubmit}>
                    <div className="modal-header py-2">
                        <h5 className="modal-title">{movie ? 'Edit Movie' : 'Add Movie'}</h5>
                        <button
                            type="button"
                            onClick={() => { onToggle(); resetForm() }}
                            className="btn-close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className='row'>
                            <InputField label="Movie Name" name="title" formik={formik} />
                            <InputField label="Release Year" name="releaseYear" formik={formik} />
                            <InputGroupField label="Duration" nameHours="durationHours" nameMinutes="durationMinutes" formik={formik} />
                            <div className='col-md-6'>
                                <InputField label="Ratings" name="rating" formik={formik} />
                            </div>
                            <div className='col-md-6'>
                                <InputField label="Votes" name="votes" formik={formik} />
                            </div>
                            <FileInputField label="Movie Poster" name="image" formik={formik} handleImageUpload={handleImageUpload} />
                        </div>
                    </div>
                    <div className="mt-0 pb-1  modal-footer">
                        <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => { onToggle(); resetForm() }}
                        >
                            Close
                        </button>
                        <button type="submit" className="btn btn-success btn-sm">
                            {movie ? 'Update' : 'Submit'}
                        </button>
                    </div>
                </form>

            </Modal>
        </>

    );
};

export default AddEditMovieModal;
