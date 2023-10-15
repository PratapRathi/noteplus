import React from 'react'
import '../css-component/AddNote.css'

const AddNoteModal = () => {
    return (
        <div className="col-md-12 " >
            <div className="collapse card card-block card-stretch ps-2 add-note-modal show" id="collapseMenu" >
                <div className="row card-body write-card container-fluid collapse-fluid">
                    <div className="col-md-12 col-lg-12 p-0">
                        <h3 className='add-note-heading'>Add Note</h3>
                        <hr />

                        <div class="row g-3 align-items-center mb-3">
                            <div class="col-auto">
                                <label for="inputPassword6" class="col-form-label">Title</label>
                            </div>
                            <div class="col-md-5">
                                <input type="text" id="inputPassword6" class="form-control" aria-describedby="passwordHelpInline" />
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>

                        <div class="mb-3">
                            <label for="language" className='me-4'>Tag:</label>
                            <select name="language" id="language">
                                <option value="javascript">JavaScript</option>
                                <option value="python">Python</option>
                                <option value="c++" disabled>C++</option>
                                <option value="java" selected>Java</option>
                            </select>
                        </div>



                        <div className="col-lg-12 p-0 d-flex justify-content-end">
                            <button className="btn btn-outline-dark" data-extra-toggle="toggle" data-extra-class-show=".show-note-button" data-extra-class-hide=".hide-note-button">Close</button>
                            <button className="btn btn-dark ms-3" data-extra-toggle="toggle" data-extra-class-show=".show-note-button" data-extra-class-hide=".hide-note-button">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default AddNoteModal
